export const titleCaseConverter = (str, isIdValue) => {
  if (isIdValue) return str;
  if (str.length === 2) return str.toUpperCase();
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
