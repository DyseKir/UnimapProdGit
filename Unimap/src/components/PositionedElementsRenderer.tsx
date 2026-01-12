import React, { useEffect, useMemo, useState } from 'react';
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

const PRIMARY_COLOR = '#39A39B';
const PRIMARY_BORDER_COLOR = '#2d8a84';
const DEFAULT_HIGHLIGHT_COLOR = '#9BEF8B';

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

type ExtendedText = {
  OnDefault?: { Ukrainian: string; English: string };
  OnHover?: { Ukrainian: string; English: string; Time?: { Ukrainian: string; English: string } } | string;
  Ukrainian?: string;
  English?: string;
};

interface PreparedRoom extends PositionedElementConfig {
  resolvedImgSrc?: string;
  defaultText?: string | number;
  hoverText?: string;
  hasHoverText: boolean;
  baseStyle: React.CSSProperties;
  baseCardStyle: React.CSSProperties;
  contentStyle: React.CSSProperties;
}

const resolveRoomText = (
  squareConfig: PositionedElementConfig,
  language: Language
): { defaultText?: string | number; hoverText?: string } => {
  let defaultText: string | number | undefined = squareConfig.number;
  let hoverText: string | undefined;

  if (squareConfig.text) {
    const textExtended = squareConfig.text as ExtendedText;

    if (textExtended.OnDefault || (textExtended.OnHover && typeof textExtended.OnHover === 'object')) {
      if (textExtended.OnDefault) {
        defaultText = language === 'English'
          ? (textExtended.OnDefault.English || textExtended.OnDefault.Ukrainian || '')
          : (textExtended.OnDefault.Ukrainian || textExtended.OnDefault.English || '');
      }

      if (textExtended.OnHover && typeof textExtended.OnHover === 'object') {
        const hoverTextBase = language === 'English'
          ? (textExtended.OnHover.English || textExtended.OnHover.Ukrainian || '')
          : (textExtended.OnHover.Ukrainian || textExtended.OnHover.English || '');
        const timeText = textExtended.OnHover.Time
          ? (language === 'English' ? textExtended.OnHover.Time.English : textExtended.OnHover.Time.Ukrainian)
          : '';
        const combined = timeText ? `${hoverTextBase}\n${timeText}` : hoverTextBase;
        hoverText = combined.trim() ? combined : undefined;
      }
    } else {
      const t: any = squareConfig.text as any;
      const baseText = language === 'English'
        ? (t.English || t.Ukrainian || '')
        : (t.Ukrainian || t.English || '');
      defaultText = baseText;

      if (typeof t.OnHover === 'string' && t.OnHover.trim()) {
        hoverText = t.OnHover;
      }
    }
  }

  if (typeof defaultText === 'string' && defaultText.trim() === '') {
    defaultText = squareConfig.number;
  }

  if (typeof defaultText === 'undefined') {
    defaultText = squareConfig.number;
  }

  return { defaultText, hoverText };
};

const getSizingText = (
  defaultText: string | number | undefined,
  hoverText?: string
): string | number => {
  const defaultValue = defaultText ?? '';
  const hoverValue = hoverText ?? '';
  const defaultLength = defaultValue.toString().length;
  const hoverLength = hoverValue.toString().length;

  if (hoverLength > defaultLength) {
    return hoverValue;
  }

  return defaultValue;
};

const resolveImgSrc = (squareConfig: PositionedElementConfig): string | undefined => {
  if (squareConfig.imgSrc) {
    return squareConfig.imgSrc;
  }

  if (squareConfig.category === 'toilet') {
    return './src/Sprite/WC-icon.svg';
  }

  if (squareConfig.category === 'stairs') {
    return './src/Sprite/Stairs-icon.svg';
  }

  if (squareConfig.category === 'buffet') {
    return './src/Sprite/Buffet-icon.svg';
  }

  return undefined;
};

interface RoomElementProps {
  room: PreparedRoom;
  isHighlighted: boolean;
  highlightVars: React.CSSProperties;
  highlightColor: string;
}

const RoomElement = React.memo(
  ({ room, isHighlighted, highlightVars, highlightColor }: RoomElementProps) => {
    const rootClassName = [
      'positioned-element',
      room.className,
      room.hasHoverText ? 'positioned-element--has-hover-text' : ''
    ].filter(Boolean).join(' ');

    const cardClassName = `positioned-element__card${isHighlighted ? ' positioned-element__card--highlighted' : ''}`;
    const cardStyle = isHighlighted
      ? {
          ...room.baseCardStyle,
          ...highlightVars,
          background: highlightColor,
          border: `${room.borderWidth || 2}px solid var(--room-highlight-border)`,
          color: '#0F3A36',
        }
      : room.baseCardStyle;

    const showDefaultText = room.defaultText !== undefined && room.defaultText !== null;

    return (
      <div
        className={rootClassName}
        style={room.baseStyle}
        onClick={room.onClick}
        onMouseEnter={room.onHover}
      >
        <div style={room.contentStyle}>
          <div style={cardStyle} className={cardClassName}>
            {showDefaultText && (
              <span className="positioned-element__text positioned-element__text--default">
                {room.defaultText}
              </span>
            )}
            {room.hasHoverText && (
              <span className="positioned-element__text positioned-element__text--hover">
                {room.hoverText}
              </span>
            )}
          </div>
          {room.resolvedImgSrc && (
            <img
              src={room.resolvedImgSrc}
              alt={room.id}
              className="positioned-element__img"
            />
          )}
        </div>
      </div>
    );
  },
  (prev, next) => {
    if (prev.room !== next.room) {
      return false;
    }

    if (prev.isHighlighted !== next.isHighlighted) {
      return false;
    }

    if (prev.isHighlighted && prev.highlightColor !== next.highlightColor) {
      return false;
    }

    return true;
  }
);

export const PositionedElementsRenderer: React.FC<PositionedElementsRendererProps> = ({
  containerClassName = '',
  containerStyle = {},
  mapTransform = { scale: 1, x: 0, y: 0 },
  language = 'Ukrainian',
  activeFloor = 1,
}) => {
  const [highlightedRoomIds, setHighlightedRoomIds] = useState<string[]>([]);
  const [currentHighlightColor, setCurrentHighlightColor] = useState<string>(DEFAULT_HIGHLIGHT_COLOR);

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

  const highlightColor = currentHighlightColor || DEFAULT_HIGHLIGHT_COLOR;
  const highlightVars = useMemo(() => buildHighlightVars(highlightColor), [highlightColor]);
  const highlightedRoomIdsSet = useMemo(() => new Set(highlightedRoomIds), [highlightedRoomIds]);

  const preparedRooms = useMemo<PreparedRoom[]>(() => {
    const floorRooms = getSquaresConfigForFloor(activeFloor);
    return floorRooms.map(squareConfig => {
      const resolvedImgSrc = resolveImgSrc(squareConfig);
      const { defaultText, hoverText } = resolveRoomText(squareConfig, language);
      const sizingText = getSizingText(defaultText, hoverText);
      const adaptiveFontSize = calculateResponsiveFontSize(
        sizingText,
        squareConfig.width,
        squareConfig.height,
        squareConfig.fontSize || 24
      );
      const hasHoverText = Boolean(hoverText && hoverText.trim());

      const baseStyle: React.CSSProperties = {
        position: 'absolute',
        left: squareConfig.x,
        top: squareConfig.y,
        width: squareConfig.width,
        height: squareConfig.height,
        zIndex: squareConfig.zIndex || 1,
        cursor: squareConfig.onClick ? 'pointer' : 'default',
        pointerEvents: 'auto',
        ...squareConfig.style
      };

      const baseCardStyle: React.CSSProperties = {
        background: squareConfig.color || PRIMARY_COLOR,
        border: `${squareConfig.borderWidth || 2}px solid ${squareConfig.borderColor || PRIMARY_BORDER_COLOR}`,
        borderRadius: `${squareConfig.borderRadius || 8}px`,
        color: squareConfig.fontColor || '#ffffff',
        fontSize: `${adaptiveFontSize}px`,
      };

      const contentStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: `rotate(${squareConfig.rotation || 0}deg)`,
      };

      return {
        ...squareConfig,
        resolvedImgSrc,
        defaultText,
        hoverText,
        hasHoverText,
        baseStyle,
        baseCardStyle,
        contentStyle,
      };
    });
  }, [activeFloor, language]);

  const renderedRooms = useMemo(
    () =>
      preparedRooms
        .filter(element => element.visible !== false)
        .map(element => (
          <RoomElement
            key={element.id}
            room={element}
            isHighlighted={highlightedRoomIdsSet.has(element.id)}
            highlightColor={highlightColor}
            highlightVars={highlightVars}
          />
        )),
    [preparedRooms, highlightedRoomIdsSet, highlightColor, highlightVars]
  );

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
        transform: `translate3d(${mapTransform.x}px, ${mapTransform.y}px, 0) scale(${mapTransform.scale})`,
        transformOrigin: '0 0',
        willChange: 'transform',
        ...containerStyle
      }}
    >
      {renderedRooms}
    </div>
  );
};

export default PositionedElementsRenderer;
