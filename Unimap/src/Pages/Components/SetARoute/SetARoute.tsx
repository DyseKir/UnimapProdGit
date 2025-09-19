import React, { useState } from 'react';
import './SetARoute.css';
import RouteInput from './RouteInput';
import RouteButton from './RouteButton';
import routeService from '../../../services/RouteService';
import squaresConfig from '../../../config/positionedElements';

interface SetARouteProps {
  onRouteBuild?: (from: string, to: string) => void;
}

const SetARoute: React.FC<SetARouteProps> = ({ onRouteBuild }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');

  const handleRouteBuild = () => {
    console.log('Попытка построить маршрут:', { fromValue, toValue });
    
    if (fromValue && toValue && fromValue !== toValue) {
      console.log('Строим маршрут между:', fromValue, 'и', toValue);
      console.log('Доступные комнаты:', squaresConfig.map(r => ({ id: r.id, number: r.number })));
      
      // Строим маршрут через сервис
      const route = routeService.buildRoute(fromValue, toValue, squaresConfig);
      
      if (route) {
        console.log('Маршрут успешно построен:', route);
        console.log('Все маршруты:', routeService.getRoutes());
        
        // Вызываем callback если передан
        if (onRouteBuild) {
          onRouteBuild(fromValue, toValue);
        }
      } else {
        console.warn('Не удалось построить маршрут');
      }
    } else {
      console.log('Недостаточно данных для построения маршрута');
    }
  };

  const handleClearRoutes = () => {
    console.log('Очищаем все маршруты');
    routeService.clearRoutes();
    setFromValue('');
    setToValue('');
  };

  return (
    <div className="SetARoute">
      <span className="SetARoute-title">Прокласти маршрут:</span>
      <RouteInput 
        fromValue={fromValue}
        toValue={toValue}
        onFromChange={setFromValue}
        onToChange={setToValue}
      />
      <div className="route-controls">
        <RouteButton 
          onClick={handleRouteBuild}
          disabled={!fromValue || !toValue || fromValue === toValue}
        />
        <button 
          className="clear-routes-btn"
          onClick={handleClearRoutes}
          type="button"
        >
          Очистити
        </button>
      </div>
    </div>
  );
};

export default SetARoute; 