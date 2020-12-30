import { formatCardNumber } from './FormatCardNumber';

describe('test formatted card number', () => {
  let gaps: Array<number>;
  beforeAll(() => {
    gaps = [4, 8, 12, 16];
  });

  it('should return string separated with two spaces', () => {
    const number = '12345';

    const result = formatCardNumber(number, gaps);
    expect(result).toEqual('1234 5');
  });

  it('should return 16 chars string separated three spaces', () => {
    const number = '1234567890123456';

    const result = formatCardNumber(number, gaps);
    expect(result).toEqual('1234 5678 9012 3456');
  });
  it('should return two groups with 4 chars string with one space between', () => {
    const number = '12345678';

    const result = formatCardNumber(number, gaps);
    expect(result).toEqual('1234 5678');
  });
  it('should return string without spaces', () => {
    expect(formatCardNumber('1234', gaps)).toEqual('1234');
    expect(formatCardNumber('123', gaps)).toEqual('123');
  });
});
