import i18next from 'i18next';

export const removeHtmlTags = (text = '') => {
  const pattern = /<\/?[^>]+>/g;

  return text.replace(pattern, '');
};
export const removeBreakLines = (text = '') => {
  const pattern = /\r\n/g;

  return text.replace(pattern, '');
};

export const requireField = (field: string) => {
  return i18next.t('error.require', {field}) || '';
};
