import React, { useEffect, useRef, useState } from 'react';
import './BuildingSelector.css';
import Button from '../UI/Button';
import HomeIcon from '../../../Sprite/Home-Icon.svg';
import ArrowIcon from '../../../Sprite/Drop-down-arrow-Icon.svg';
import { buildings as defaultBuildings, type BuildingOption } from '../../../config/buildings';

interface BuildingSelectorProps {
  value?: string | null;
  onChange?: (buildingId: string | null) => void;
  options?: BuildingOption[];
}

const BuildingSelector: React.FC<BuildingSelectorProps> = ({ value = null, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(value);
  const listRef = useRef<HTMLUListElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedOptions = options && options.length > 0 ? options : defaultBuildings;

  useEffect(() => { setSelectedId(value ?? null); }, [value]);

  const selected = mergedOptions.find(o => o.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setOpen(false);
    onChange?.(id);
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'height') return;
      if (open) {
        el.style.height = 'auto';
      } else {
        el.style.height = '0px';
      }
    };
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (open) {
      el.style.height = '0px';
      const full = el.scrollHeight;
      requestAnimationFrame(() => { el.style.height = full + 'px'; });
    } else {
      const full = el.scrollHeight;
      el.style.height = full + 'px';
      requestAnimationFrame(() => { el.style.height = '0px'; });
    }
  }, [open, mergedOptions.length]);

  // close on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  return (
    <div ref={rootRef} className={`BuildingSelector ${open ? 'open' : ''}`}>
      <span className="BuildingSelector-label">Корпус:</span>
      <Button
        className="ui-btn--block building-btn"
        variant="ghost"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        leftIcon={<img src={HomeIcon} alt="home" style={{ width: 18, height: 18 }} />}
        rightIcon={<img src={ArrowIcon} alt="open" style={{ width: 18, height: 18 }} />}
      >
        {selected ? selected.label : 'Обрати корпус'}
      </Button>
      <ul
        ref={listRef}
        className={`BuildingSelector-list ${open ? 'open' : ''}`}
        role="listbox"
      >
        {mergedOptions.map(opt => (
          <li
            key={opt.id}
            role="option"
            aria-selected={selectedId === opt.id}
            className={`BuildingSelector-item ${selectedId === opt.id ? 'selected' : ''}`}
            onClick={() => handleSelect(opt.id)}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuildingSelector;


