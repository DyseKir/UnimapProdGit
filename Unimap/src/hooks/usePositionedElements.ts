import { useCallback } from 'react';
import { positionedElementsService, PositionedElementConfig } from '../services/PositionedElementsService';

export const usePositionedElements = () => {
  const addElement = useCallback((config: PositionedElementConfig) => {
    positionedElementsService.addElement(config);
  }, []);

  const removeElement = useCallback((id: string) => {
    positionedElementsService.removeElement(id);
  }, []);

  const updatePosition = useCallback((id: string, x: number, y: number) => {
    positionedElementsService.updatePosition(id, x, y);
  }, []);

  const setVisible = useCallback((id: string, visible: boolean) => {
    positionedElementsService.setVisible(id, visible);
  }, []);

  const getElement = useCallback((id: string) => {
    return positionedElementsService.getElement(id);
  }, []);

  const clearAll = useCallback(() => {
    positionedElementsService.clear();
  }, []);

  return {
    addElement,
    removeElement,
    updatePosition,
    setVisible,
    getElement,
    clearAll
  };
};
