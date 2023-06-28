export const getSubstring = (str: string) => {
  if (str?.length > 14) {
    const first_part = str.substring(0, 10);
    const last_part = str.substring(str.length - 6);
    return first_part + '...' + last_part;
  } else {
    return str;
  }
};
