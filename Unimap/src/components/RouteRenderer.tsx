import React, { useEffect, useState } from 'react';
import type { Route } from '../services/RouteService';
import routeService from '../services/RouteService';

interface RouteRendererProps {
  mapTransform?: {
    scale: number;
    x: number;
    y: number;
  };
}

export const RouteRenderer: React.FC<RouteRendererProps> = ({
  mapTransform = { scale: 1, x: 0, y: 0 }
}) => {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    console.log('RouteRenderer: Подписываюсь на изменения маршрутов');
    
    // Подписываемся на изменения маршрутов
    const unsubscribe = routeService.onRoutesChange((newRoutes) => {
      console.log('RouteRenderer: Получил новые маршруты:', newRoutes);
      setRoutes(newRoutes);
    });
    
    // Получаем текущие маршруты
    const currentRoutes = routeService.getRoutes();
    console.log('RouteRenderer: Текущие маршруты:', currentRoutes);
    setRoutes(currentRoutes);
    
    return unsubscribe;
  }, []);

  console.log('RouteRenderer: Рендеринг с маршрутами:', routes);

  if (routes.length === 0) {
    console.log('RouteRenderer: Нет маршрутов для отображения');
    return null;
  }

  return (
    <div
      className="route-renderer-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '3100px',
        height: '3300px',
        pointerEvents: 'none',
        zIndex: 15, // Выше комнат
        transform: `translate(${mapTransform.x}px, ${mapTransform.y}px) scale(${mapTransform.scale})`,
        transformOrigin: '0 0',
      }}
    >
      {routes.map(route => (
        <svg
          key={route.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          {/* Определения для стрелок */}
          <defs>
            <marker
              id={`arrowhead-${route.id}`}
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#FF6B6B"
              />
            </marker>
          </defs>

          {/* Если есть маршрут через маяки, рисуем его */}
          {route.beaconRoute ? (
            // Маршрут через маяки - множественные сегменты
            route.beaconRoute.path.slice(1).map((beacon, index) => {
              const prevBeacon = route.beaconRoute!.path[index];
              return (
                <line
                  key={`${route.id}-${index}`}
                  x1={prevBeacon.x}
                  y1={prevBeacon.y}
                  x2={beacon.x}
                  y2={beacon.y}
                  stroke="#FF6B6B"
                  strokeWidth="3"
                  strokeDasharray="10,5"
                  markerEnd={index === route.beaconRoute!.path.length - 2 ? `url(#arrowhead-${route.id})` : 'none'}
                />
              );
            })
          ) : (
            // Fallback - прямая линия между комнатами
            <line
              x1={route.line.from.x}
              y1={route.line.from.y}
              x2={route.line.to.x}
              y2={route.line.to.y}
              stroke="#FF6B6B"
              strokeWidth="3"
              strokeDasharray={route.line.type === 'dashed' ? '10,5' : 'none'}
              markerEnd={`url(#arrowhead-${route.id})`}
            />
          )}
        </svg>
      ))}
    </div>
  );
};

export default RouteRenderer;
