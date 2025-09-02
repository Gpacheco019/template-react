import { cn } from './utils';

describe('cn utility function', () => {
  it('should combine CSS classes correctly', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should filter falsy values', () => {
    const result = cn('class1', false, null, undefined, 'class2', '');
    expect(result).toBe('class1 class2');
  });

  it('should handle arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3', ['class4', 'class5']);
    expect(result).toBe('class1 class2 class3 class4 class5');
  });

  it('should handle conditional objects', () => {
    const result = cn('base-class', {
      'conditional-class': true,
      'hidden-class': false,
    });
    expect(result).toBe('base-class conditional-class');
  });

  it('should return empty string for empty values', () => {
    const result = cn();
    expect(result).toBe('');
  });
});
