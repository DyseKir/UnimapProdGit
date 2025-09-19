import React, { useEffect, useState } from 'react';
import type { PositionedElementConfig } from '../services/PositionedElementsService';
import roomHighlightService from '../services/RoomHighlightService';
import squaresConfig from '../config/positionedElements';

interface PositionedElementsRendererProps {
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  mapTransform?: {
    scale: number;
    x: number;
    y: number;
  };
}

export const PositionedElementsRenderer: React.FC<PositionedElementsRendererProps> = ({
  containerClassName = '',
  containerStyle = {},
  mapTransform = { scale: 1, x: 0, y: 0 }
}) => {
  const [elements, setElements] = useState<PositionedElementConfig[]>([]);
  const [hoveredElementId, setHoveredElementId] = useState<string | null>(null);
  const [highlightedRoomId, setHighlightedRoomId] = useState<string | null>(null);

  useEffect(() => {
    // Listen to room highlight events
    const handleHighlight = (event: { roomId: string | null; highlightColor: string }) => {
      setHighlightedRoomId(event.roomId);
    };

    const unsubscribe = roomHighlightService.onHighlight(handleHighlight);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Load squares from config and apply hover effects
    const squares = squaresConfig.map(squareConfig => {
      const isHighlighted = highlightedRoomId === squareConfig.id;
      const isHovered = hoveredElementId === squareConfig.id;
      const category = squareConfig.category;
      let resolvedImgSrc: string | undefined = squareConfig.imgSrc;
      if (!resolvedImgSrc) {
        if (category === 'toilet') {
          resolvedImgSrc = './src/Sprite/wc.png';
        } else if (category === 'stairs') {
          resolvedImgSrc = './src/Sprite/stair.png';
        } else if (category === 'buffet') {
          resolvedImgSrc = './src/Sprite/buffet.png';
        }
      }

   

      const content = (
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transform: `rotate(${squareConfig.rotation || 0}deg)`,
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: isHighlighted
              ? '#90EE90'
  : (squareConfig.color || '#BFF355'),
            border: `${squareConfig.borderWidth || 2}px solid ${isHighlighted ? '#32CD32' : (squareConfig.borderColor || '#A8D444')}`,
            borderRadius: `${squareConfig.borderRadius || 8}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHighlighted ? '#000' : (squareConfig.fontColor || '#ffffff'),
            fontSize: `${squareConfig.fontSize || 24}px`,
            fontWeight: 'bold',
            userSelect: 'none',
            transition: 'all 0.3s ease',
            opacity: isHovered ? 0.7 : 1,
            boxShadow: isHighlighted ? '0 0 20px rgba(144, 238, 144, 0.6)' : 'none'
          }}>
            {squareConfig.number}
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
  }, [hoveredElementId, highlightedRoomId]); // Re-render when hover or highlight state changes

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
        width: '3100px', // Match map width instead of 100vw
        height: '3300px', // Match map height instead of 100vh
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
              pointerEvents: 'auto', // Enable pointer events for hover
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
