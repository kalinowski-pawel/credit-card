export const dateFormat = (dateString: string): string => {
  const value = dateString.replace(/\//g, '') as string;
  if (value.length > 2) {
    return `${value.slice(0, 2)}/${value.slice(2)}`;
  }
  return value;
};
