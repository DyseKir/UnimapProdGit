import React, { useRef, useState, useEffect } from "react";
import floor1 from "../../Sprite/Floor-1-icon.svg";
import floor2 from "../../Sprite/Floor-2-icon.svg";
import floor3 from "../../Sprite/Floor-3-icon.svg";
import { MAP_WIDTH, MAP_HEIGHT, VIEWPORT_PRESET_CONFIG, resolveViewportPreset } from "../../config/mapDimensions";

interface MapBackgroundProps {
  activeFloor?: number;
  onMapTransform?: (transform: { scale: number; x: number; y: number }) => void;
}

const floorImages = {
  1: floor1,
  2: floor2,
  3: floor3,
};

const getMinScale = (containerW: number, containerH: number) => {
  return Math.max(
    containerW / MAP_WIDTH,
    containerH / MAP_HEIGHT
  );
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

const MapBackground: React.FC<MapBackgroundProps> = ({ activeFloor = 1, onMapTransform }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState<{ x: number; y: number } | null>(null);
  const [minScale, setMinScale] = useState(1);
  const [maxScale, setMaxScale] = useState(VIEWPORT_PRESET_CONFIG.desktop.maxScale);
  const [lastTouchDistance, setLastTouchDistance] = useState<number | null>(null);

  const currentFloorImage = floorImages[activeFloor as keyof typeof floorImages] || floor1;

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

  // Update scaling presets on container size change
  useEffect(() => {
    const preset = resolveViewportPreset(containerSize.width);
    const { minScaleFactor, maxScale: presetMaxScale } = VIEWPORT_PRESET_CONFIG[preset];
    const computedMinScale = getMinScale(containerSize.width, containerSize.height) * minScaleFactor;

    const safeMinScale = clamp(computedMinScale, 0.2, presetMaxScale);
    setMinScale(safeMinScale);
    setMaxScale(presetMaxScale);
    setScale(safeMinScale);
    setPosition({
      x: (containerSize.width - MAP_WIDTH * safeMinScale) / 2,
      y: (containerSize.height - MAP_HEIGHT * safeMinScale) / 2,
    });
  }, [containerSize.width, containerSize.height]);

  // Notify parent of transform changes
  useEffect(() => {
    if (onMapTransform) {
      onMapTransform({ scale, x: position.x, y: position.y });
    }
  }, [scale, position.x, position.y, onMapTransform]);

  // Constrain pan position
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

  // Zoom handler (mouse wheel)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    let newScale = scale - e.deltaY * 0.001;
    newScale = clamp(newScale, minScale, maxScale);

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

  // Pan handlers (mouse)
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

  // Touch support for pan + pinch-zoom
  const getTouchDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.hypot(dx, dy);
  };

  const getTouchCenter = (touch1: Touch, touch2: Touch) => ({
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setDragging(true);
      setStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      setLastTouchDistance(null);
    } else if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setLastTouchDistance(distance);
      setDragging(false);
      setStart(null);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && dragging && start) {
      const touch = e.touches[0];
      const newX = touch.clientX - start.x;
      const newY = touch.clientY - start.y;
      const clamped = clampPosition(newX, newY, scale);
      setPosition(clamped);
      return;
    }

    if (e.touches.length === 2 && lastTouchDistance) {
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      if (distance === 0) return;

      const pinchRatio = distance / lastTouchDistance;
      let newScale = clamp(scale * pinchRatio, minScale, maxScale);

      const center = getTouchCenter(e.touches[0], e.touches[1]);
      const rect = containerRef.current?.getBoundingClientRect();
      const relativeX = (center.x - (rect?.left || 0) - position.x) / scale;
      const relativeY = (center.y - (rect?.top || 0) - position.y) / scale;

      const newX = center.x - (rect?.left || 0) - relativeX * newScale;
      const newY = center.y - (rect?.top || 0) - relativeY * newScale;
      const clamped = clampPosition(newX, newY, newScale);

      setScale(newScale);
      setPosition(clamped);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchEnd = () => {
    setDragging(false);
    setStart(null);
    setLastTouchDistance(null);
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
        touchAction: "none",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <img
        src={currentFloorImage}
        alt={`�?���?�'�� ���?�?��?�:�? ${activeFloor}`}
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
