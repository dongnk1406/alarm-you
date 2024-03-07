// https://www.makeareadme.com/

# My App

Welcome to My Mobile App!

## Requirements

Node 14 or greater is required. Development for iOS requires a Mac and Xcode 10 or up, and will target iOS 11 and up.

You also need to install the dependencies required by React Native.
Go to the [React Native environment setup](https://reactnative.dev/docs/environment-setup) , then select `React Native CLI Quickstart tab`. Follow instructions for your given `development OS` and `target OS`.

## Table of Contents

- [Quick start](#quick-start)

- [Tech Stack](#tech-stack)

- [Folder Structure Explanation](#folder-structure-explanation)

- [Git flow and rules](#git-flow-and-rules)

- [Coding style](#coding-style)

- [Local Development Information](#local-development-information)

- [Troubleshooting](#troubleshooting)

## Quick start

1. Clone the project:

```bash

git  clone  https://github.com/dongnk1406/alarm-you

```

2. Install dependencies

```bash

yarn  install

```

3. Pod install for iOS

```bash

# Currently, macOS 12.5.1 is shipped with Ruby 2.6.8, which is not what is required by React Native.

# You should use a Ruby version manager like rbenv or RVM to install

# and use ruby version '2.7.6' before pod install.

# See more at https://reactnative.dev/docs/environment-setup#ruby

# Choose Development OS: macOS, Target OS: iOS


npx  pod-install

```

4. Start Metro Bundler

```bash

yarn  start

```

5. Open new terminals, build for iOS/Android

```bash

yarn  ios

```

```bash

yarn  android

```

6. Debugger

We use Reactotron to check the debugger. If you want to use the Chrome debugger, please comment on Hermes and continue

## Tech Stack

- [React Native](reactnative.dev/docs/getting-started)

- [TypeScript](typescriptlang.org/docs/handbook/typescript-from-scratch.html)

- [React Navigation 6](reactnavigation.org/docs/getting-started/)

- [Moti](moti.fyi/) (Powered by React Native Reanimated 2)

- [Code push](https://learn.microsoft.com/en-us/appcenter/distribution/codepush/rn-get-started)(Add a dynamic update experience to your React Native app)

- [WatermelonDB](https://watermelondb.dev/docs)(A reactive database framework)

## Folder Structure Explanation

- `assets`: Contain assets like images, icons.

- `components`: Components, can be used anywhere in the apps.

- `container`: Yeah, basically all screens of the app.

- `hooks`: Global hooks, can be used anywhere in the apps.

- `database`: WatermelonDB (A reactive database framework). For view database using DB Browser fro SQLite, see [instruction](https://github.com/Nozbe/WatermelonDB/issues/105#issuecomment-453815987)

- `navigation`: All the things related to navigation.

- `providers`: If anything/a library needs a provider, or logic needs React contexts wrappers, etc, they all will go here. Example: `GestureHandlerRootView` from `react-native-gesture-handler`, Redux store, etc.

- `shared`: Share config and common interface, type or enum

- `services`: All the external services, like mobile databases (AsyncStorage, MMKV), or Firebase, Notifications, etc.

- `theme`: Global theme object, can be used anywhere for styling.

- `utils`: Utilities and helper functions.

## Git flow and rules

### Git flow

```bash
git switch feature/example-branch-name
git add .
git commit -m "Commit"
git switch develop
git pull origin develop
git switch feature/example-branch-name
git rebase develop
(resolve conflicts if have)
git push origin feature/example-branch-name
```

### Rules

- when create a PR, please follow this format:

```text
  [DRAFT/READY FOR REVIEW] [TICKET-NUM] [Feature/Fix]: short description
  For example
  [READY FOR REVIEW] TXS-488 Feature: dynamic pricing for delivery in ID
  READY FOR REVIEW means your branch is already tested properly by tester and PM and only then we will review the code
  Once reviewed, then we will change it to READY TO MERGE
```

- For the branch name, please follow this format

```text
  [feature/bugfix/refactor]/[TICKET-NUM]-[short description]
  For example: feature/TXS-488-dynamic-pricing
  Don’t copy & paste the ticket name in the short description
```

- For the commit name, please follow [conventionalcommits](https://www.conventionalcommits.org/en/v1.0.0/)

```text
  [feat/fix/refactor/chore]: [short description]
  For example: feat: dynamic pricing for delivery in ID
```

## Coding style

For the coding style, we high recommend follow Airbnb Style Guide

- [JavaScript](https://github.com/airbnb/javascript)
- [React](https://airbnb.io/javascript/react/)

## Local Development Information

- Code Editor: VS Code

- Recommend Extensions: `Prettier - Code formatter`, `ES7+ React/Redux/React-Native snippets`, `Color Highlight`, `Code Spell Checker`, `GitLens — Git supercharged`, `JavaScript (ES6) code snippets`, `JavaScript Booster`, `ESLint`

- MacBook Mini M1 2020, Ram 8GB, SSD 256GB

- fonts setup // https://blog.logrocket.com/adding-custom-fonts-react-native/

## Troubleshooting
