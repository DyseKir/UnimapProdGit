export interface RoomHighlightEvent {
  roomId: string | null;
  roomIds: string[];
  highlightColor: string;
}

type HighlightCallback = (event: RoomHighlightEvent) => void;

class RoomHighlightService {
  private highlightedRoomIds: string[] = [];
  private highlightColor: string = '#9BEF8B';
  private listeners: HighlightCallback[] = [];

  // Subscribe to highlight events
  onHighlight(callback: HighlightCallback) {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Emit highlight event to all listeners
  private emit(event: RoomHighlightEvent) {
    this.listeners.forEach(callback => callback(event));
  }

  // Highlight a specific room
  highlightRoom(roomId: string | null, options?: { color?: string }) {
    const roomIds = roomId ? [roomId] : [];
    this.highlightRooms(roomIds, options);
  }

  // Highlight multiple rooms with the same color
  highlightRooms(roomIds: string[], options?: { color?: string }) {
    const normalized = Array.from(
      new Set(roomIds.filter((roomId): roomId is string => Boolean(roomId)))
    );
    this.highlightedRoomIds = normalized;
    const color = options?.color ?? this.highlightColor;
    this.emit({
      roomId: normalized[0] ?? null,
      roomIds: normalized,
      highlightColor: color,
    });
  }

  // Get current highlighted room
  getHighlightedRoom() {
    return this.highlightedRoomIds[0] ?? null;
  }

  // Get current highlighted rooms
  getHighlightedRooms() {
    return [...this.highlightedRoomIds];
  }

  // Get highlight color
  getHighlightColor() {
    return this.highlightColor;
  }

  // Clear highlight
  clearHighlight() {
    this.highlightRooms([]);
  }

  // Set custom highlight color
  setHighlightColor(color: string) {
    this.highlightColor = color;
    if (this.highlightedRoomIds.length > 0) {
      this.emit({
        roomId: this.highlightedRoomIds[0] ?? null,
        roomIds: [...this.highlightedRoomIds],
        highlightColor: this.highlightColor,
      });
    }
  }
}

// Singleton instance
export const roomHighlightService = new RoomHighlightService();
export default roomHighlightService;
