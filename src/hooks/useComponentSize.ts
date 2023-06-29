import {useCallback, useState} from 'react';
import {IComponentSize} from 'src/shared/interfaces';

const useComponentSize = () => {
  const [size, setSize] = useState<IComponentSize>({
    width: null,
    height: null,
  });

  const onLayout = useCallback(
    (event: {nativeEvent: {layout: {width: any; height: any}}}) => {
      const {width, height} = event.nativeEvent.layout;
      setSize({width, height});
    },
    [],
  );

  return [size, onLayout];
};

export default useComponentSize;
