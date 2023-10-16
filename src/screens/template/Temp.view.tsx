import React from 'react';
import {View} from 'react-native';
import {styles} from './Temp.style';
import {useTemp} from './Temp.hook';

const Temp = () => {
  const {t} = useTemp();

  return <View style={styles.container} />;
};

export {Temp};
