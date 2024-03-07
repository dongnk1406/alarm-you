import {useTranslation} from 'react-i18next';

const useTemplate = props => {
  const {t} = useTranslation();

  return {t};
};

export {useTemplate};
