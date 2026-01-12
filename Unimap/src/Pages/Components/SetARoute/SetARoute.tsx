import React, { useState } from 'react';
import './SetARoute.css';
import RouteInput from './RouteInput';
import RouteButton from './RouteButton';
import routeService from '../../../services/RouteService';
import roomHighlightService from '../../../services/RoomHighlightService';
import { getSquaresConfigForFloor, regularRooms } from '../../../config/positionedElements';

interface SetARouteProps {
  onRouteBuild?: (from: string, to: string) => void;
  activeFloor?: number;
  onFloorChange?: (floor: number) => void;
}

interface RouteInfo {
  fromId: string;
  toId: string;
  fromFloor: number;
  toFloor: number;
}

const ROUTE_HIGHLIGHT_COLOR = '#9BEF8B';

const SetARoute: React.FC<SetARouteProps> = ({ onRouteBuild, activeFloor, onFloorChange }) => {
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

  const getRoomInfo = (roomId: string) => regularRooms.find((room) => room.id === roomId);

  const handleRouteBuild = () => {
    console.log('Route build attempt:', { fromValue, toValue });

    if (fromValue && toValue && fromValue !== toValue) {
      const fromRoom = getRoomInfo(fromValue);
      const toRoom = getRoomInfo(toValue);

      if (!fromRoom || !toRoom) {
        console.warn('Route build: missing room info.');
        return;
      }

      const isSameFloor = fromRoom.floor === toRoom.floor;
      let route = null;

      console.log('Building route between:', fromValue, 'and', toValue);

      if (isSameFloor) {
        const floorRooms = getSquaresConfigForFloor(fromRoom.floor);
        console.log('Available rooms:', floorRooms.map(r => ({ id: r.id, number: r.number })));

        // Build route via service for same-floor navigation
        route = routeService.buildRoute(fromValue, toValue, floorRooms);

        if (route) {
          console.log('Route built:', route);
          console.log('All routes:', routeService.getRoutes());
        } else {
          console.warn('Route build failed.');
        }
      }

      setRouteInfo({
        fromId: fromValue,
        toId: toValue,
        fromFloor: fromRoom.floor,
        toFloor: toRoom.floor,
      });
      roomHighlightService.highlightRooms([fromValue, toValue], { color: ROUTE_HIGHLIGHT_COLOR });

      if (!isSameFloor && onFloorChange) {
        onFloorChange(fromRoom.floor);
      }

      if (onRouteBuild) {
        onRouteBuild(fromValue, toValue);
      }
    } else {
      console.log('Route input is invalid: select different rooms.');
    }
  };

  const handleClearRoutes = () => {
    console.log('Clearing routes.');
    routeService.clearRoutes();
    roomHighlightService.clearHighlight();
    setRouteInfo(null);
    setFromValue('');
    setToValue('');
  };

  const fromRoomInfo = routeInfo ? getRoomInfo(routeInfo.fromId) : null;
  const toRoomInfo = routeInfo ? getRoomInfo(routeInfo.toId) : null;
  const showCrossFloorHint =
    routeInfo && fromRoomInfo && toRoomInfo && routeInfo.fromFloor !== routeInfo.toFloor;
  const currentFloor = typeof activeFloor === 'number' ? activeFloor : routeInfo?.fromFloor;
  const isShowingDestination = showCrossFloorHint && currentFloor === routeInfo.toFloor;
  const currentRoom = showCrossFloorHint
    ? (isShowingDestination ? toRoomInfo : fromRoomInfo)
    : null;
  const nextRoom = showCrossFloorHint
    ? (isShowingDestination ? fromRoomInfo : toRoomInfo)
    : null;
  const nextFloor = showCrossFloorHint
    ? (isShowingDestination ? routeInfo.fromFloor : routeInfo.toFloor)
    : null;
  const actionLabel = isShowingDestination ? 'Щоб повернутися до' : 'Щоб побачити';

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
      {showCrossFloorHint && currentRoom && nextRoom && nextFloor !== null && (
        <div className="route-hint" role="status">
          <span className="route-hint__title">Маршрут між поверхами</span>
          <span className="route-hint__text">
            Показано: кабінет <strong>{currentRoom.number}</strong> ({currentRoom.floor} поверх). {actionLabel} кабінет{' '}
            <strong>{nextRoom.number}</strong>, натисніть <strong>{nextFloor}</strong> поверх.
          </span>
        </div>
      )}
    </div>
  );
};

export default SetARoute; 



