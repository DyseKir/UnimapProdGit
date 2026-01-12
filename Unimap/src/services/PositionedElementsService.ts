export interface PositionedElementConfig {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number; // rotation in degrees
  color?: string; // background color
  borderColor?: string; // border color
  borderWidth?: number; // border width in px
  borderRadius?: number; // border radius in px
  number?: number; // square number for display
  fontSize?: number; // font size for number
  fontColor?: string; // font color for number
  // If provided, the element should render an image sprite instead of a colored box
  imgSrc?: string; // path to sprite (e.g., './src/Sprite/stair.png')
  category?: 'regular' | 'toilet' | 'stairs' | 'buffet';
  text?: {
    Ukrainian?: string;
    English?: string;
    OnHover?: string;
  };
  content?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  onClick?: () => void;
  onHover?: () => void;
  visible?: boolean;
  corridor?: number; // corridor number for grouping
  corridorEntrySide?: 'top' | 'bottom' | 'left' | 'right';
  floor?: number; // floor number to support multi-level maps
}

export class PositionedElementsService {
  private elements: Map<string, PositionedElementConfig> = new Map();
  private listeners: Set<(elements: PositionedElementConfig[]) => void> = new Set();

  // Add or update an element
  addElement(config: PositionedElementConfig): void {
    this.elements.set(config.id, config);
    this.notifyListeners();
  }

  // Remove an element
  removeElement(id: string): void {
    this.elements.delete(id);
    this.notifyListeners();
  }

  // Get all elements
  getElements(): PositionedElementConfig[] {
    return Array.from(this.elements.values());
  }

  // Get element by id
  getElement(id: string): PositionedElementConfig | undefined {
    return this.elements.get(id);
  }

  // Update element position
  updatePosition(id: string, x: number, y: number): void {
    const element = this.elements.get(id);
    if (element) {
      element.x = x;
      element.y = y;
      this.notifyListeners();
    }
  }

  // Update element visibility
  setVisible(id: string, visible: boolean): void {
    const element = this.elements.get(id);
    if (element) {
      element.visible = visible;
      this.notifyListeners();
    }
  }

  // Subscribe to changes
  subscribe(listener: (elements: PositionedElementConfig[]) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Notify all listeners
  private notifyListeners(): void {
    const elements = this.getElements();
    this.listeners.forEach(listener => listener(elements));
  }

  // Clear all elements
  clear(): void {
    this.elements.clear();
    this.notifyListeners();
  }
}

// Singleton instance
export const positionedElementsService = new PositionedElementsService();
