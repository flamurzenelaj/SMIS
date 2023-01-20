export const getUrlLastSegment = (url, separator = "/") => {
  return url.split(separator).pop();
};
