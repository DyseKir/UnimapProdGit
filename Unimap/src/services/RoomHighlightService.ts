export interface RoomHighlightEvent {
  roomId: string | null;
  highlightColor: string;
}

type HighlightCallback = (event: RoomHighlightEvent) => void;

class RoomHighlightService {
  private highlightedRoomId: string | null = null;
  private highlightColor: string = '#90EE90'; // Light green
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
  highlightRoom(roomId: string | null) {
    this.highlightedRoomId = roomId;
    this.emit({
      roomId: this.highlightedRoomId,
      highlightColor: this.highlightColor
    });
  }

  // Get current highlighted room
  getHighlightedRoom() {
    return this.highlightedRoomId;
  }

  // Get highlight color
  getHighlightColor() {
    return this.highlightColor;
  }

  // Clear highlight
  clearHighlight() {
    this.highlightRoom(null);
  }

  // Set custom highlight color
  setHighlightColor(color: string) {
    this.highlightColor = color;
    if (this.highlightedRoomId) {
      this.emit({
        roomId: this.highlightedRoomId,
        highlightColor: this.highlightColor
      });
    }
  }
}

// Singleton instance
export const roomHighlightService = new RoomHighlightService();
export default roomHighlightService;
