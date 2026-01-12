import MapBackground from "../Components/MapBackground";
import MenuBar from "../Components/MenuBarFolder/MenuBar";
import AppLayout from "../Layout/AppLayout";
import PositionedElementsRenderer from "../../components/PositionedElementsRenderer";
import BeaconRenderer from "../../components/BeaconRenderer";
import { useState, useCallback } from "react";

export default function MainPage() {
  const [mapTransform, setMapTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [activeFloor, setActiveFloor] = useState(1);

  const handleMapTransform = useCallback((transform: { scale: number; x: number; y: number }) => {
    setMapTransform(transform);
  }, []);

  return (
    <AppLayout>
      <MapBackground activeFloor={activeFloor} onMapTransform={handleMapTransform} />
      <PositionedElementsRenderer mapTransform={mapTransform} activeFloor={activeFloor} />
      <BeaconRenderer mapTransform={mapTransform} showBeacons={false} />
      <MenuBar activeFloor={activeFloor} onFloorChange={setActiveFloor} />
    </AppLayout>
  );
}
