import { ProductTypePipe } from './product-type.pipe';

describe('ProductTypePipe', () => {
  const pipe = new ProductTypePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return readable product types', () => {
    expect(pipe.transform('HARD_DISK')).toBe('Hard disk');
    expect(pipe.transform('KEYBOARD')).toBe('Keyboard');
  });

  it('should return null if there is no input', () => {
    expect(pipe.transform(null)).toBe(null);
  });
});
