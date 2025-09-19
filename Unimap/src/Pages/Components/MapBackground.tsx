import React, { useRef, useState, useEffect } from "react";
import plan1 from "../../Sprite/plan1poverhfull 1.svg";

const MAP_WIDTH = 3100; // Оригинальная ширина картинки
const MAP_HEIGHT = 3300; // Оригинальная высота картинки
const MAX_SCALE = 3;

interface MapBackgroundProps {
  onMapTransform?: (transform: { scale: number; x: number; y: number }) => void;
}

const getMinScale = (containerW: number, containerH: number) => {
  return Math.max(
    containerW / MAP_WIDTH,
    containerH / MAP_HEIGHT
  );
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const MapBackground: React.FC<MapBackgroundProps> = ({ onMapTransform }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [minScale, setMinScale] = useState(1);

  // Resize observer for container
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setContainerSize({ width, height });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Update minScale on container size change
  useEffect(() => {
    const minS = getMinScale(containerSize.width, containerSize.height);
    setMinScale(minS);
    // На старте устанавливаем масштаб так, чтобы карта помещалась во viewport
    setScale(minS);
    // Горизонтально центрируем, вертикально фиксируем нижний край по умолчанию
    setPosition({
      x: (containerSize.width - MAP_WIDTH * minS) / 2,
      y: containerSize.height - MAP_HEIGHT * minS,
    });
  }, [containerSize.width, containerSize.height]);

  // Notify parent of transform changes
  useEffect(() => {
    if (onMapTransform) {
      onMapTransform({ scale, x: position.x, y: position.y });
    }
  }, [scale, position.x, position.y, onMapTransform]);

  // Ограничение pan
  const clampPosition = (x: number, y: number, scaleVal: number) => {
    const mapW = MAP_WIDTH * scaleVal;
    const mapH = MAP_HEIGHT * scaleVal;
    const minX = Math.min(0, containerSize.width - mapW);
    const minY = Math.min(0, containerSize.height - mapH);
    const maxX = Math.max(0, containerSize.width - mapW);
    const maxY = Math.max(0, containerSize.height - mapH);
    return {
      x: clamp(x, minX, maxX),
      y: clamp(y, minY, maxY),
    };
  };

  // Zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.001;
    newScale = clamp(newScale, minScale, MAX_SCALE);
    // Zoom относительно центра курсора
    const rect = containerRef.current?.getBoundingClientRect();
    const mouseX = e.clientX - (rect?.left || 0);
    const mouseY = e.clientY - (rect?.top || 0);
    const relX = (mouseX - position.x) / scale;
    const relY = (mouseY - position.y) / scale;
    const newX = mouseX - relX * newScale;
    const newY = mouseY - relY * newScale;
    const clamped = clampPosition(newX, newY, newScale);
    setScale(newScale);
    setPosition(clamped);
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !start) return;
    const newX = e.clientX - start.x;
    const newY = e.clientY - start.y;
    const clamped = clampPosition(newX, newY, scale);
    setPosition(clamped);
  };
  const handleMouseUp = () => {
    setDragging(false);
    setStart(null);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
        background: "#222",
        cursor: dragging ? "grabbing" : "grab",
        zIndex: 0,
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <img
        src={plan1}
        alt="Карта"
        draggable={false}
        style={{
          width: MAP_WIDTH,
          height: MAP_HEIGHT,
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "top left",
          userSelect: "none",
          pointerEvents: "none",
          display: "block",
        }}
      />
    </div>
  );
};

export default MapBackground; 