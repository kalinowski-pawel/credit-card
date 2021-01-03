import { dateValidator } from './DateValidator';
import { VALIDATION } from '../../constants/const';

describe('test cases for expiration date helper', () => {
  it('should return information about incorrect date', () => {
    expect(dateValidator('34/23')).toEqual(VALIDATION.INCORRECT_DATE);
  });

  it('should return empty string when date is correct', () => {
    expect(dateValidator('12/22')).toEqual('');
    expect(dateValidator('01/22')).toEqual('');
  });
  it('should return information about incorrect date when month is not from  1 - 12 range', () => {
    expect(dateValidator('34/')).toEqual(VALIDATION.INCORRECT_DATE);
    expect(dateValidator('00/')).toEqual(VALIDATION.INCORRECT_DATE);
  });
});
