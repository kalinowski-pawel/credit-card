import { dateFormat } from './DateFormat';

describe('test formatted date string', () => {
  it('should return string separated with /', () => {
    const dateString = '1234';
    expect(dateFormat(dateString)).toEqual('12/34');
  });

  it('should return only months value without separator', () => {
    const dateString = '12/';
    expect(dateFormat(dateString)).toEqual('12');
  });
  it('should return month separated from year', () => {
    const dateString = '12/3';
    expect(dateFormat(dateString)).toEqual('12/3');
  });
});
