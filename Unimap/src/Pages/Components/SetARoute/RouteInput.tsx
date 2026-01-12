import React, { useEffect, useRef, useState } from 'react';
import './RouteInput.css';
import Button from '../UI/Button';
import { regularRooms } from '../../../config/positionedElements';
import squaresConfig from '../../../config/positionedElements';

interface RouteInputProps {
  fromValue: string;
  toValue: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

const RouteInput: React.FC<RouteInputProps> = ({
  fromValue,
  toValue,
  onFromChange,
  onToChange,
}) => {
  const [isFromDropdownOpen, setIsFromDropdownOpen] = useState(false);
  const [isToDropdownOpen, setIsToDropdownOpen] = useState(false);
  const availableRooms = regularRooms;

  const fromListRef = useRef<HTMLUListElement>(null);
  const toListRef = useRef<HTMLUListElement>(null);
  const fromRootRef = useRef<HTMLDivElement>(null);
  const toRootRef = useRef<HTMLDivElement>(null);

  const handleFromSelect = (roomId: string) => {
    onFromChange(roomId);
    setIsFromDropdownOpen(false);
  };

  const handleToSelect = (roomId: string) => {
    onToChange(roomId);
    setIsToDropdownOpen(false);
  };

  const getCabinetDisplayName = (roomId: string) => {
    const room = availableRooms.find((r) => r.id === roomId);
    return room ? `Кабінет ${room.number}` : 'Оберіть кабінет';
  };

  const getCabinetDescription = (roomId: string): string => {
    const sq = squaresConfig.find((s) => s.id === roomId);
    if (!sq || !sq.text) return '';
    const t: any = sq.text;
    if (t.OnDefault && typeof t.OnDefault === 'object') {
      return t.OnDefault.Ukrainian || t.OnDefault.English || '';
    }
    if (typeof t === 'object') {
      return t.Ukrainian || t.English || '';
    }
    if (typeof t === 'string') return t;
    return '';
  };

  // Animate "from" dropdown height
  useEffect(() => {
    const el = fromListRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height') return;
      el.style.height = isFromDropdownOpen ? 'auto' : '0px';
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [isFromDropdownOpen]);

  useEffect(() => {
    const el = fromListRef.current;
    if (!el) return;
    if (isFromDropdownOpen) {
      el.style.height = '0px';
      const full = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.height = full + 'px';
      });
    } else {
      const full = el.scrollHeight;
      el.style.height = full + 'px';
      requestAnimationFrame(() => {
        el.style.height = '0px';
      });
    }
  }, [isFromDropdownOpen, availableRooms.length]);

  // Animate "to" dropdown height
  useEffect(() => {
    const el = toListRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height') return;
      el.style.height = isToDropdownOpen ? 'auto' : '0px';
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [isToDropdownOpen]);

  useEffect(() => {
    const el = toListRef.current;
    if (!el) return;
    if (isToDropdownOpen) {
      el.style.height = '0px';
      const full = el.scrollHeight;
      requestAnimationFrame(() => {
        el.style.height = full + 'px';
      });
    } else {
      const full = el.scrollHeight;
      el.style.height = full + 'px';
      requestAnimationFrame(() => {
        el.style.height = '0px';
      });
    }
  }, [isToDropdownOpen, availableRooms.length]);

  // Close lists on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!fromRootRef.current?.contains(e.target as Node)) {
        setIsFromDropdownOpen(false);
      }
      if (!toRootRef.current?.contains(e.target as Node)) {
        setIsToDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div className="RouteInput">
      <div
        ref={fromRootRef}
        className={`RouteSelector ${isFromDropdownOpen ? 'open' : ''}`}
      >
        <span className="RouteSelector-label">Звідки:</span>
        <Button
          className="ui-btn--block route-btn"
          variant="ghost"
          onClick={() => setIsFromDropdownOpen((v) => !v)}
          aria-expanded={isFromDropdownOpen}
          aria-haspopup="listbox"
        >
          {getCabinetDisplayName(fromValue)}
        </Button>
        <ul
          ref={fromListRef}
          className={`RouteSelector-list ${isFromDropdownOpen ? 'open' : ''}`}
          role="listbox"
        >
          {availableRooms.map((room) => (
            <li
              key={room.id}
              role="option"
              aria-selected={fromValue === room.id}
              className={`RouteSelector-item ${fromValue === room.id ? 'selected' : ''}`}
              onClick={() => handleFromSelect(room.id)}
            >
              {(() => {
                const d = getCabinetDescription(room.id);
                return d ? `Кабінет ${room.number} — ${d}` : `Кабінет ${room.number}`;
              })()}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={toRootRef}
        className={`RouteSelector ${isToDropdownOpen ? 'open' : ''}`}
      >
        <span className="RouteSelector-label">Куди:</span>
        <Button
          className="ui-btn--block route-btn"
          variant="ghost"
          onClick={() => setIsToDropdownOpen((v) => !v)}
          aria-expanded={isToDropdownOpen}
          aria-haspopup="listbox"
        >
          {getCabinetDisplayName(toValue)}
        </Button>
        <ul
          ref={toListRef}
          className={`RouteSelector-list ${isToDropdownOpen ? 'open' : ''}`}
          role="listbox"
        >
          {availableRooms.map((room) => (
            <li
              key={room.id}
              role="option"
              aria-selected={toValue === room.id}
              className={`RouteSelector-item ${toValue === room.id ? 'selected' : ''}`}
              onClick={() => handleToSelect(room.id)}
            >
              {(() => {
                const d = getCabinetDescription(room.id);
                return d ? `Кабінет ${room.number} — ${d}` : `Кабінет ${room.number}`;
              })()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteInput;
