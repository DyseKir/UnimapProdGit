import React, { useState, useEffect } from 'react';
import type { BeaconPoint } from '../config/beaconPoints';
import beaconRouteService from '../services/BeaconRouteService';
import { MAP_HEIGHT, MAP_WIDTH } from '../config/mapDimensions';

interface BeaconRendererProps {
  mapTransform?: {
    scale: number;
    x: number;
    y: number;
  };
  showBeacons?: boolean;
}

export const BeaconRenderer: React.FC<BeaconRendererProps> = ({
  mapTransform = { scale: 1, x: 0, y: 0 },
  showBeacons = true
}) => {
  const [beacons, setBeacons] = useState<BeaconPoint[]>([]);
  const [hoveredBeaconId, setHoveredBeaconId] = useState<string | null>(null);

  useEffect(() => {
    // Получаем все маяки
    const allBeacons = beaconRouteService.getAllBeacons();
    setBeacons(allBeacons);
  }, []);

  if (!showBeacons || beacons.length === 0) {
    return null;
  }

  const getBeaconStyle = (beacon: BeaconPoint) => {
    const baseStyle = {
      position: 'absolute' as const,
      left: beacon.x - 4, // Центрируем маяк
      top: beacon.y - 4,
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: '2px solid #fff',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      zIndex: 20,
    };

    // Разные цвета для разных типов маяков
    let backgroundColor = '#666';
    let boxShadow = '0 0 4px rgba(0, 0, 0, 0.3)';

    switch (beacon.type) {
      case 'corridor':
        backgroundColor = '#4ECDC4';
        boxShadow = '0 0 8px rgba(78, 205, 196, 0.6)';
        break;
      case 'intersection':
        backgroundColor = '#FF6B6B';
        boxShadow = '0 0 8px rgba(255, 107, 107, 0.6)';
        break;
      case 'room_entrance':
        backgroundColor = '#45B7AA';
        boxShadow = '0 0 6px rgba(69, 183, 170, 0.5)';
        break;
      case 'landmark':
        backgroundColor = '#FFD93D';
        boxShadow = '0 0 8px rgba(255, 217, 61, 0.6)';
        break;
    }

    // Hover эффект
    if (hoveredBeaconId === beacon.id) {
      return {
        ...baseStyle,
        backgroundColor,
        boxShadow,
        transform: 'scale(1.5)',
        zIndex: 21,
      };
    }

    return {
      ...baseStyle,
      backgroundColor,
      boxShadow,
    };
  };

  const handleBeaconHover = (beaconId: string) => {
    setHoveredBeaconId(beaconId);
  };

  const handleBeaconLeave = () => {
    setHoveredBeaconId(null);
  };

  return (
    <div
      className="beacon-renderer-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: `${MAP_WIDTH}px`,
        height: `${MAP_HEIGHT}px`,
        pointerEvents: 'none',
        zIndex: 20,
        transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
        transformOrigin: '0 0',
      }}
    >
      {beacons.map(beacon => (
        <div
          key={beacon.id}
          className="beacon-point"
          style={getBeaconStyle(beacon)}
          onMouseEnter={() => handleBeaconHover(beacon.id)}
          onMouseLeave={handleBeaconLeave}
          title={`${beacon.name || beacon.id} (${beacon.type})`}
        />
      ))}

      {/* Подсказка при наведении */}
      {hoveredBeaconId && (
        <div
          className="beacon-tooltip"
          style={{
            position: 'absolute',
            left: beacons.find(b => b.id === hoveredBeaconId)?.x + 12,
            top: beacons.find(b => b.id === hoveredBeaconId)?.y - 20,
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
            zIndex: 22,
            pointerEvents: 'none',
          }}
        >
          {beacons.find(b => b.id === hoveredBeaconId)?.name || hoveredBeaconId}
        </div>
      )}
    </div>
  );
};

export default BeaconRenderer;
