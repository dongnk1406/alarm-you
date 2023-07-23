import {CommonActions, StackActions} from '@react-navigation/native';
import {navigationRef} from './Navigation';

export function setTopLevelNavigator(navigatorRef: any) {}

export function navigate(routeName: any, params?: any) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name: routeName,
      params,
    }),
  );
}

export const replace = (name: string, params?: any) => {
  if (navigationRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    // navigationRef.current.navigate(name, params);
    // Keyboard.dismiss()
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export function goBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export function pop(value: any) {
  navigationRef.dispatch(StackActions.pop(value));
}

export const push = (name: string, params?: any) => {
  if (navigationRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    // navigationRef.current.navigate(name, params);
    // Keyboard.dismiss()
    navigationRef.current?.dispatch(StackActions.push(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const NavigationUtils = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
};
