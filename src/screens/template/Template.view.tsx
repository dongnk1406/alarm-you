import React from 'react';
import {View} from 'react-native';
import {styles} from './Template.style';
import {useTemplate} from './Template.hook';

const Template = props => {
  const {t} = useTemplate(props);

  return <View style={styles.container} />;
};

export {Template};
