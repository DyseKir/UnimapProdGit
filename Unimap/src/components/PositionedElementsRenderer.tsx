import React, { useEffect, useState } from 'react';
import type { PositionedElementConfig } from '../services/PositionedElementsService';
import roomHighlightService from '../services/RoomHighlightService';
import { getSquaresConfigForFloor } from '../config/positionedElements';
import { MAP_HEIGHT, MAP_WIDTH } from '../config/mapDimensions';
import './PositionedElementsRenderer.css';

interface PositionedElementsRendererProps {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  mapTransform?: {
    scale: number;
    x: number;
    y: number;
  };
  language?: Language;
  activeFloor?: number;
}

type Language = 'Ukrainian' | 'English';

const calculateResponsiveFontSize = (
  text: string | number | undefined,
  width?: number,
  height?: number,
  baseSize: number = 24
): number => {
  const minSize = 8;
  const content = (text ?? '').toString();
  const lines = content.split('\n').filter(line => line.length > 0);
  const lineCount = lines.length || 1;
  const longestLineLength = lines.reduce((max, line) => Math.max(max, line.length), content.length) || 1;
  const paddedWidth = Math.max((width ?? 0) - 8, 20);
  const paddedHeight = Math.max((height ?? 0) - 8, 20);

  // Estimate character width (~0.55em) and line height (~1.2em) to derive safe sizes
  const widthBasedSize = paddedWidth / (longestLineLength * 0.55);
  const heightBasedSize = paddedHeight / (lineCount * 1.2);
  const calculatedSize = Math.min(baseSize, widthBasedSize, heightBasedSize);

  if (Number.isNaN(calculatedSize) || !Number.isFinite(calculatedSize)) {
    return baseSize;
  }

  return Math.max(minSize, Math.floor(calculatedSize));
};

const parseColorToRgb = (color: string): { r: number; g: number; b: number } | null => {
  const trimmed = color.trim();
  const rgbMatch = trimmed.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  const rgbaMatch = trimmed.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(?:0|1|0?\.\d+)\s*\)$/i
  );
  if (rgbaMatch) {
    return {
      r: Number(rgbaMatch[1]),
      g: Number(rgbaMatch[2]),
      b: Number(rgbaMatch[3]),
    };
  }

  const hexMatch = trimmed.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hexMatch) {
    let hex = hexMatch[1];
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  return null;
};

const buildHighlightVars = (color: string): React.CSSProperties => {
  const rgb = parseColorToRgb(color);
  if (!rgb) {
    return {
      '--room-highlight-color': color,
      '--room-highlight-border': color,
      '--room-highlight-border-strong': color,
      '--room-highlight-glow': color,
      '--room-highlight-glow-soft': color,
    } as React.CSSProperties;
  }

  return {
    '--room-highlight-color': `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    '--room-highlight-border': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.75)`,
    '--room-highlight-border-strong': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
    '--room-highlight-glow': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.45)`,
    '--room-highlight-glow-soft': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
  } as React.CSSProperties;
};

export const PositionedElementsRenderer: React.FC<PositionedElementsRendererProps> = ({
  containerClassName = '',
  containerStyle = {},
  mapTransform = { scale: 1, x: 0, y: 0 },
  language = 'Ukrainian',
  activeFloor = 1,
}) => {
  const [elements, setElements] = useState<PositionedElementConfig[]>([]);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [highlightedRoomIds, setHighlightedRoomIds] = useState<string[]>([]);
  const [currentHighlightColor, setCurrentHighlightColor] = useState<string>('#9BEF8B');

  useEffect(() => {
    const handleHighlight = (event: { roomId: string | null; roomIds?: string[]; highlightColor: string }) => {
      const nextRoomIds = event.roomIds?.length
        ? event.roomIds
        : (event.roomId ? [event.roomId] : []);
      setHighlightedRoomIds(nextRoomIds);
      if (event.highlightColor) {
        setCurrentHighlightColor(event.highlightColor);
      }
    };
    const unsubscribe = roomHighlightService.onHighlight(handleHighlight);
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const primaryColor = '#39A39B';
    const primaryBorderColor = '#2d8a84';
    const highlightColor = currentHighlightColor || '#9BEF8B';
    const highlightVars = buildHighlightVars(highlightColor);

    const squares = getSquaresConfigForFloor(activeFloor).map(squareConfig => {
      const isHighlighted = highlightedRoomIds.includes(squareConfig.id);
      const isHovered = hoveredElementId === squareConfig.id;
      const category = squareConfig.category;
      let resolvedImgSrc: string | undefined = squareConfig.imgSrc;
      if (!resolvedImgSrc) {
        if (category === 'toilet') {
          resolvedImgSrc = './src/Sprite/WC-icon.svg';
        } else if (category === 'stairs') {
          resolvedImgSrc = './src/Sprite/Stairs-icon.svg';
        } else if (category === 'buffet') {
          resolvedImgSrc = './src/Sprite/Buffet-icon.svg';
        }
      }

      let displayText: string | number | undefined = squareConfig.number;
      if (squareConfig.text) {
        type ExtendedText = {
          OnDefault?: { Ukrainian: string; English: string };
          OnHover?: { Ukrainian: string; English: string; Time?: { Ukrainian: string; English: string } } | string;
          Ukrainian?: string;
          English?: string;
        };
        const textExtended = squareConfig.text as ExtendedText;

        if (textExtended.OnDefault || (textExtended.OnHover && typeof textExtended.OnHover === 'object')) {
          if (isHovered && textExtended.OnHover && typeof textExtended.OnHover === 'object') {
            const hoverText = language === 'English'
              ? (textExtended.OnHover.English || textExtended.OnHover.Ukrainian || '')
              : (textExtended.OnHover.Ukrainian || textExtended.OnHover.English || '');
            const timeText = textExtended.OnHover.Time
              ? (language === 'English' ? textExtended.OnHover.Time.English : textExtended.OnHover.Time.Ukrainian)
              : '';
            displayText = timeText ? `${hoverText}\n${timeText}` : hoverText;
          } else if (textExtended.OnDefault) {
            displayText = language === 'English'
              ? (textExtended.OnDefault.English || textExtended.OnDefault.Ukrainian || '')
              : (textExtended.OnDefault.Ukrainian || textExtended.OnDefault.English || '');
          }
        } else {
          const t: any = squareConfig.text as any;
          if (isHovered && t.OnHover && typeof t.OnHover === 'string') {
            displayText = t.OnHover;
          } else {
            displayText = language === 'English'
              ? (t.English || t.Ukrainian || '')
              : (t.Ukrainian || t.English || '');
          }
        }
      }

      if ((typeof displayText === 'string' && displayText.trim() === '') || typeof displayText === 'undefined') {
        displayText = squareConfig.number;
      }

      const adaptiveFontSize = calculateResponsiveFontSize(
        displayText,
        squareConfig.width,
        squareConfig.height,
        squareConfig.fontSize || 24
      );

      const cardClassName = `positioned-element__card${isHighlighted ? ' positioned-element__card--highlighted' : ''}`;
      const content = (
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `rotate(${squareConfig.rotation || 0}deg)`,
        }}>
          <div style={{
            ...((isHighlighted ? highlightVars : {}) as React.CSSProperties),
            position: 'absolute',
            inset: 0,
            background: isHighlighted
              ? highlightColor
              : (squareConfig.color || primaryColor),
            border: `${squareConfig.borderWidth || 2}px solid ${
              isHighlighted ? 'var(--room-highlight-border)' : (squareConfig.borderColor || primaryBorderColor)
            }`,
            borderRadius: `${squareConfig.borderRadius || 8}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHighlighted ? '#0F3A36' : (squareConfig.fontColor || '#ffffff'),
            fontSize: `${adaptiveFontSize}px`,
            fontWeight: 'bold',
            userSelect: 'none',
            transition: 'opacity 0.2s ease, color 0.2s ease, background 0.2s ease',
            opacity: isHovered ? 0.7 : 1,
            whiteSpace: 'pre-line',
            textAlign: 'center',
            lineHeight: '1.2',
            overflowWrap: 'anywhere',
            padding: '4px'
          }} className={cardClassName}>
            {displayText}
          </div>
          {resolvedImgSrc && (
            <img
              src={resolvedImgSrc}
              alt={squareConfig.id}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '70%',
                height: '70%',
                objectFit: 'contain',
                transition: 'opacity 0.2s ease',
                opacity: isHovered ? 0.9 : 1,
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      );

      return {
        ...squareConfig,
        content
      };
    });

    setElements(squares);
  }, [hoveredElementId, highlightedRoomIds, language, activeFloor, currentHighlightColor]);

  const handleElementClick = (element: PositionedElementConfig) => {
    if (element.onClick) {
      element.onClick();
    }
  };

  const handleElementHover = (element: PositionedElementConfig) => {
    setHoveredElementId(element.id);
    if (element.onHover) {
      element.onHover();
    }
  };

  const handleElementLeave = () => {
    setHoveredElementId(null);
  };

  return (
    <div 
      className={`positioned-elements-container ${containerClassName}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${MAP_WIDTH}px`,
        height: `${MAP_HEIGHT}px`,
        pointerEvents: 'none',
        zIndex: 10,
        transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
        transformOrigin: '0 0',
        ...containerStyle
      }}
    >
      {elements
        .filter(element => element.visible !== false)
        .map(element => (
          <div
            key={element.id}
            className={`positioned-element ${element.className || ''}`}
            style={{
              position: 'absolute',
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              zIndex: element.zIndex || 1,
              cursor: element.onClick ? 'pointer' : 'default',
              pointerEvents: 'auto',
              ...element.style
            }}
            onClick={() => handleElementClick(element)}
            onMouseEnter={() => handleElementHover(element)}
            onMouseLeave={handleElementLeave}
          >
            {element.content}
          </div>
        ))}
    </div>
  );
};

export default PositionedElementsRenderer;
