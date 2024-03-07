// https://www.i18next.com/overview/typescript#create-a-declaration-file

import {ResourceType} from './i18next';
import 'i18next';

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
    resources: ResourceType;
  }
}
