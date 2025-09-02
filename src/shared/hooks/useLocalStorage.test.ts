import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('should return the initial value when there is no value in localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    
    expect(result.current[0]).toBe('default-value');
  });

  it('should return the value of localStorage when it exists', () => {
    localStorageMock.getItem.mockReturnValue('"stored-value"');
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update the value and save to localStorage', () => {
    localStorageMock.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'default-value'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', '"new-value"');
  });
});
