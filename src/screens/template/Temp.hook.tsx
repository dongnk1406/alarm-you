import {useTranslation} from 'react-i18next';

const useTemp = () => {
  const {t} = useTranslation();

  return {t};
};

export {useTemp};
