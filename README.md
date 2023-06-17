<!-- If you wanna use translation without hook, please use i18next from './src/utils/i18next' -->

# My App

Welcome to My Mobile App!

This project is set up by following [the official guideline](https://reactnative.dev/docs/environment-setup).

## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Folder Structure Explanation](#folder-structure-explanation)
- [Local Development Information](#local-development-information)

## Tech Stack

- [React Native](reactnative.dev/docs/getting-started)
- [TypeScript](typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [React Navigation 6](reactnavigation.org/docs/getting-started/)
- [NativeWind](www.nativewind.dev/) (Tailwind CSS for React Native)
- [Moti](moti.fyi/) (Powered by React Native Reanimated 2)

## Setup

1. Clone the project:

```bash
git clone https://adamosystem.com/bio-kissed/app-client
```

2. Install dependencies

```bash
yarn install
```

3. Pod install for iOS

```bash
# Currently, macOS 12.5.1 is shipped with Ruby 2.6.8, which is not what is required by React Native.
# You should use a Ruby version manager like rbenv or RVM to install
# and use ruby version '2.7.6' before pod install.
# See more at https://reactnative.dev/docs/environment-setup#ruby
# Choose Development OS: macOS, Target OS: iOS

npx pod-install
```

4. Start Metro Bundler

```bash
yarn start
```

5. Open new terminals, build for iOS/Android

```bash
yarn ios
```

```bash
yarn android
```

# Folder Structure Explanation

- `app`: Main App Component.
- `assets`: Contain assets like images, icons.
- `components`: Components, can be used anywhere in the apps.
- `hooks`: Global hooks, can be used anywhere in the apps.
- `i18n`: All things related to Internationalization (i18n).
- `models`: Responses from server/API return data and request model from client.
- `navigators`: All the things related to navigation.
- `providers`: If anything/a library needs a provider, or logic needs React contexts wrappers, etc, they all will go here. Example: `GestureHandlerRootView` from `react-native-gesture-handler`, Redux store, etc.
- `screens`: Yeah, basically all screens of the app.
- `services`: All the external services, like mobile databases (AsyncStorage, MMKV), or Firebase, Notifications, etc.
- `theme`: Global theme object, can be used anywhere for styling.
- `utils`: Utilities and helper functions.

# Local Development Information

- Code Editor: VS Code
- Recommend Extensions: `Tailwind CSS IntelliSense`, `Prettier - Code formatter`, `ES7+ React/Redux/React-Native snippets`, `Color Highlight`, `Code Spell Checker`, `GitLens — Git supercharged`, `JavaScript (ES6) code snippets`, `JavaScript Booster`

- MacBook Mini M1 2020, Ram 8GB, SSD 256GB
- fonts setup // https://blog.logrocket.com/adding-custom-fonts-react-native/
