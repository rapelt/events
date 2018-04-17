import { LimitPipe } from './limit.pipe';

describe('LimitPipe', () => {
  it('create an instance', () => {
    const pipe = new LimitPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return null when no values', () => {
    const pipe = new LimitPipe();
    const slicedArray = pipe.transform(null, 5);
    expect(slicedArray).toBeNull();
  });

  it('should return an array of length 2', () => {
    const pipe = new LimitPipe();
    const slicedArray = pipe.transform([1, 2 ,3, 4], 2);
    expect(slicedArray).toEqual([1, 2]);
  });

  it('should return an empty array when invalid arguments', () => {
    const pipe = new LimitPipe();
    const slicedArray = pipe.transform([1, 2 ,3, 4], 'abc');
    expect(slicedArray).toEqual([]);
  });
});
