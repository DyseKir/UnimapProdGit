import React, { useEffect, useState, useMemo } from "react";
import "./MenuBar.css";
import MenuArrowBtn from '../MenuArrowBtn/MenuArrowBtn';
import DoubleAltArrowLeft from '../../../Sprite/Double Alt Arrow Left.svg';
import DoubleAltArrowRight from '../../../Sprite/Double Alt Arrow Right.svg';
import logonobg from '../../../Sprite/logonobg 1.svg'
import FloorContainer from '../FloorContainer/FloorContainer';
import SetARoute from '../SetARoute/SetARoute';
import SettingsContainer from '../SettingsContainer/SettingsContainer';
import RegisterContainer from '../RegisterContainer/RegisterContainer';
import BuildingSelector from '../BuildingSelector/BuildingSelector';
import LupaIcon from '../../../Sprite/Lupa.svg';
import roomHighlightService from '../../../services/RoomHighlightService';
import { regularRooms } from '../../../config/positionedElements';
const MenuBar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isContentMounted, setIsContentMounted] = useState(true);
  const [activeFloor, setActiveFloor] = useState(1);
  
  // Search functionality
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

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

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsSearchDropdownOpen(value.trim().length > 0);
    
    if (!value.trim()) {
      roomHighlightService.clearHighlight();
    }
  };

  const handleSearchSubmit = () => {
    if (filteredRooms.length > 0) {
      const firstRoom = filteredRooms[0];
      roomHighlightService.highlightRoom(firstRoom.id);
      setSearchQuery(firstRoom.number.toString());
      setIsSearchDropdownOpen(false);
    }
  };

  const handleRoomSelect = (room: typeof rooms[0]) => {
    roomHighlightService.highlightRoom(room.id);
    setSearchQuery(room.number.toString());
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
  if (windowWidth <= 900) {
    className += " menu-bar--mobile";
  } else if (windowWidth <= 1920) {
    className += " menu-bar--medium";
  } else {
    className += " menu-bar--large";
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
                    placeholder="Пошук" 
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
                      <span className="room-id">{room.id}</span>
                      <span className="corridor">Коридор {room.corridor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="menu-bar__section" aria-labelledby="building-heading">
              <h2 id="building-heading" className="visually-hidden">Корпус</h2>
              <BuildingSelector />
            </section>

            <section className="menu-bar__section" aria-labelledby="floors-heading">
              <h2 id="floors-heading" className="visually-hidden">Поверх</h2>
              <FloorContainer
                activeFloor={activeFloor}
                onFloorChange={setActiveFloor}
              />
            </section>

            <section className="menu-bar__section" aria-labelledby="route-heading">
              <h2 id="route-heading" className="visually-hidden">Маршрут</h2>
              <SetARoute />
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