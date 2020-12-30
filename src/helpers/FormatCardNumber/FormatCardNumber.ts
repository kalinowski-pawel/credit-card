export const formatCardNumber = (number: string, gaps: Array<number>): string => {
  const value = number.replace(/\D+/g, '') as string;
  const chars = [...value] as Array<string>;
  let formattedNumber = '';
  chars.forEach((char, index) => {
    const nextIndex = index + 1;
    formattedNumber += gaps.includes(nextIndex) && chars.length > nextIndex ? `${char} ` : char;
  });

  return formattedNumber;
};
