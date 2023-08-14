export const removeHtmlTags = (text = '') => {
  const pattern = /<\/?[^>]+>/g;

  return text.replace(pattern, '');
};
export const removeBreakLines = (text = '') => {
  const pattern = /\r\n/g;

  return text.replace(pattern, '');
};
