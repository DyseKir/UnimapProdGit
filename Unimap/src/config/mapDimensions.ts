export const MAP_WIDTH = 3100;
export const MAP_HEIGHT = 3300;

export type ViewportPreset = 'desktop' | 'laptop' | 'tablet' | 'phone';

export const resolveViewportPreset = (width: number): ViewportPreset => {
  if (width >= 1440) return 'desktop';
  if (width >= 1100) return 'laptop';
  if (width >= 768) return 'tablet';
  return 'phone';
};

export const VIEWPORT_PRESET_CONFIG: Record<ViewportPreset, {
  minScaleFactor: number;
  maxScale: number;
  padding: number;
}> = {
  desktop: { minScaleFactor: 1, maxScale: 3,   padding: 0 },
  laptop:  { minScaleFactor: 1, maxScale: 3.5, padding: 0 },
  tablet:  { minScaleFactor: 1, maxScale: 4,   padding: 0 },
  phone:   { minScaleFactor: 1, maxScale: 5,   padding: 0 },
};
