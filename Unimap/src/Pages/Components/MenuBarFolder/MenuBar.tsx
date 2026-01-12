import React, { useEffect, useState, useMemo } from "react";
import "./MenuBar.css";
import MenuArrowBtn from '../MenuArrowBtn/MenuArrowBtn';
import DoubleAltArrowLeft from '../../../Sprite/Double-Alt-Arrow-Left-Icon.svg';
import DoubleAltArrowRight from '../../../Sprite/Double-Alt-Arrow-Right-Icon.svg';
import logonobg from '../../../Sprite/UniMap-Logo.svg'
import FloorContainer from '../FloorContainer/FloorContainer';
import SetARoute from '../SetARoute/SetARoute';
import SettingsContainer from '../SettingsContainer/SettingsContainer';
import RegisterContainer from '../RegisterContainer/RegisterContainer';
import BuildingSelector from '../BuildingSelector/BuildingSelector';
import LupaIcon from '../../../Sprite/Loupe.svg';
import roomHighlightService from '../../../services/RoomHighlightService';
import { regularRooms } from '../../../config/positionedElements';

interface MenuBarProps {
  activeFloor?: number;
  onFloorChange?: (floor: number) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ activeFloor: propActiveFloor, onFloorChange }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isContentMounted, setIsContentMounted] = useState(true);
  const [internalActiveFloor, setInternalActiveFloor] = useState(1);
  
  // Use prop if provided, otherwise use internal state
  const activeFloor = propActiveFloor ?? internalActiveFloor;
  const handleFloorChange = (floor: number) => {
    if (onFloorChange) {
      onFloorChange(floor);
    } else {
      setInternalActiveFloor(floor);
    }
  };
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchSelectedRoomId, setSearchSelectedRoomId] = useState<string | null>(null);

  // Mock data for rooms - replace with actual data from your config
  const rooms = regularRooms;

  // Filter rooms based on search query
  const filteredRooms = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return rooms
      .filter(room =>
        room.number.toString().includes(searchQuery.trim()) ||
        room.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => a.number - b.number);
  }, [rooms, searchQuery]);

  const selectedSearchRoom = searchSelectedRoomId
    ? rooms.find(room => room.id === searchSelectedRoomId) ?? null
    : null;
  const showSearchHint = Boolean(selectedSearchRoom);
  const isSearchRoomOnActiveFloor = selectedSearchRoom?.floor === activeFloor;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchDropdownOpen(value.trim().length > 0);
    
    if (!value.trim()) {
      roomHighlightService.clearHighlight();
      setSearchSelectedRoomId(null);
      return;
    }

    if (searchSelectedRoomId) {
      const selectedRoom = rooms.find(room => room.id === searchSelectedRoomId);
      if (selectedRoom && selectedRoom.number.toString() !== value.trim()) {
        roomHighlightService.clearHighlight();
        setSearchSelectedRoomId(null);
      }
    }
  };

  const handleSearchSubmit = () => {
    if (filteredRooms.length > 0) {
      const firstRoom = filteredRooms[0];
      roomHighlightService.highlightRoom(firstRoom.id);
      setSearchQuery(firstRoom.number.toString());
      setSearchSelectedRoomId(firstRoom.id);
      setIsSearchDropdownOpen(false);
    } else {
      roomHighlightService.clearHighlight();
      setSearchSelectedRoomId(null);
    }
  };

  const handleRoomSelect = (room: typeof rooms[0]) => {
    roomHighlightService.highlightRoom(room.id);
    setSearchQuery(room.number.toString());
    setSearchSelectedRoomId(room.id);
    setIsSearchDropdownOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let className = "menu-bar";
  if (windowWidth < 720) {
    className += " menu-bar--phone";
  } else if (windowWidth < 1100) {
    className += " menu-bar--tablet";
  } else if (windowWidth < 1440) {
    className += " menu-bar--laptop";
  } else {
    className += " menu-bar--desktop";
  }
  if (isCollapsed) {
    className += " menu-bar--collapsed";
  }

  const handleCollapse = () => {
    // Immediately unmount content, then animate container to collapsed
    setIsContentMounted(false);
    setIsCollapsed(true);
  };

  const handleExpand = () => {
    // Animate container to expanded first, mount content after transition end
    setIsCollapsed(false);
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) return;
    // After expanding finished, mount content
    if (!isCollapsed && !isContentMounted) {
      setIsContentMounted(true);
    }
  };

  return (
    <aside className={className} aria-label="Sidebar navigation" onTransitionEnd={handleTransitionEnd}>
      <div className="menu-bar__collapsed" aria-hidden={!isCollapsed}>
        <MenuArrowBtn
          aria-label="Открыть меню"
          icon={<img src={DoubleAltArrowLeft} />}
          onClick={handleExpand}
        />
      </div>

      {isContentMounted && (
        <>
          <div className="menu-bar__content">
            <header className="HeaderContainer">
              <div className="LogoContainer">
                <img src={logonobg} alt="logo" className="LogoImg" />
                <h1 className="LogoText">UniMap</h1>
              </div>
              <MenuArrowBtn
                aria-label="Свернуть меню"
                icon={<img src={DoubleAltArrowRight} />}
                onClick={handleCollapse}
              />
            </header>

            <section className="menu-bar__section" aria-labelledby="search-heading">
              <h2 id="search-heading" className="visually-hidden">Пошук</h2>
              <div className="search-container">
                <label className="ui-input search-input">
                  <span className="visually-hidden">Пошук</span>
                  <span className="search-input__icon" aria-hidden="true">
                    <img 
                      src={LupaIcon} 
                      alt="" 
                      onClick={handleSearchSubmit}
                      style={{ cursor: 'pointer' }}
                    />
                  </span>
                  <input 
                    className="ui-input__field search-input__field" 
                    placeholder={'\u0417\u043d\u0430\u0439\u0442\u0438 \u043a\u0430\u0431\u0456\u043d\u0435\u0442'} 
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsSearchDropdownOpen(searchQuery.trim().length > 0)}
                  />
                </label>
                
                {/* Search Dropdown */}
                <div className={`search-dropdown ${isSearchDropdownOpen && filteredRooms.length > 0 ? 'show' : ''}`}>
                  {filteredRooms.map(room => (
                    <div
                      key={room.id}
                      className="search-dropdown-item"
                      onClick={() => handleRoomSelect(room)}
                    >
                      <span className="room-number">{room.number}</span>
                      <span className="room-id">{`\u041a\u0430\u0431\u0456\u043d\u0435\u0442 ${room.number}`}</span>
                      <span className="corridor">{`\u041a\u043e\u0440\u0438\u0434\u043e\u0440 ${room.corridor}`}</span>
                    </div>
                  ))}
                </div>
              </div>
              {showSearchHint && selectedSearchRoom && (
                <div className="route-hint search-hint" role="status">
                  <span className="route-hint__title">Пошук кабінету</span>
                  <span className="route-hint__text">
                    Кабінет <strong>{selectedSearchRoom.number}</strong> — {selectedSearchRoom.floor} поверх
                    {selectedSearchRoom.corridor ? `, коридор ${selectedSearchRoom.corridor}` : ''}.{' '}
                    {isSearchRoomOnActiveFloor
                      ? 'Показано на карті.'
                      : `Щоб побачити, натисніть ${selectedSearchRoom.floor} поверх.`}
                  </span>
                </div>
              )}
            </section>

            <section className="menu-bar__section" aria-labelledby="building-heading">
              <h2 id="building-heading" className="visually-hidden">Корпус</h2>
              <BuildingSelector />
            </section>

            <section className="menu-bar__section" aria-labelledby="floors-heading">
              <h2 id="floors-heading" className="visually-hidden">Поверх</h2>
              <FloorContainer
                activeFloor={activeFloor}
                onFloorChange={handleFloorChange}
              />
            </section>

            <section className="menu-bar__section" aria-labelledby="route-heading">
              <h2 id="route-heading" className="visually-hidden">Маршрут</h2>
              <SetARoute activeFloor={activeFloor} onFloorChange={handleFloorChange} />
            </section>

            <div className="Line"></div>

            <section className="menu-bar__section" aria-labelledby="settings-heading">
              <h2 id="settings-heading" className="visually-hidden">Настройки и ссылки</h2>
              <SettingsContainer />
            </section>
          </div>

          <footer className="menu-bar__footer">
            <RegisterContainer />
          </footer>
        </>
      )}
    </aside>
  )
}
export default MenuBar
