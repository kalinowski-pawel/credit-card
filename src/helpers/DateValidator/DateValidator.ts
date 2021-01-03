import { VALIDATION } from '../../constants/const';

export const dateValidator = (date: string): string => {
  const month = parseInt(date.slice(0, 2));
  const dateWithoutSeparator = date.replace(/\//g, '') as string;
  if (dateWithoutSeparator.length > 0 && !Number.isInteger(parseInt(dateWithoutSeparator))) {
    return VALIDATION.DATE_AS_NUMBER;
  }
  return month <= 0 || month > 12 ? VALIDATION.INCORRECT_DATE : '';
};
