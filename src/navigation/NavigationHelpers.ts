import {CommonActions, StackActions} from '@react-navigation/native';
import {navigationRef} from './AppNavigation';

export function setTopLevelNavigator(navigatorRef: any) {}

export function navigate(name: any, params?: any) {
  navigationRef.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

export const replace = (name: string, params?: any) => {
  if (navigationRef.current && navigationRef.isReady()) {
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
  if (navigationRef.current && navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    // navigationRef.current.navigate(name, params);
    // Keyboard.dismiss()
    navigationRef.current?.dispatch(StackActions.push(name, params));
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const popToTop = () => {
  if (navigationRef.current && navigationRef.isReady()) {
    // Perform navigation if the app has mounted
    // navigationRef.current.navigate(name, params);
    // Keyboard.dismiss()
    navigationRef.current?.dispatch(StackActions.popToTop());
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
};

export const NavigationHelpers = {
  navigate,
  setTopLevelNavigator,
  goBack,
  pop,
};
