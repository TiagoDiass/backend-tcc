import { multiplicar, somar } from 'testes';

describe('First test', () => {
  it('should pass', () => {
    expect(somar(5, 5)).toBe(10);
    expect(somar(6, 7)).toBe(13);
    expect(multiplicar(5, 5)).toBe(25);
  });
});
