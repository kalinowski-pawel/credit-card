import { VALIDATION } from '../../constants/const';

export const dateValidator = (date: string): string => {
  const month = parseInt(date.slice(0, 2));
  return month <= 0 || month > 12 ? VALIDATION.INCORRECT_DATE : '';
};
