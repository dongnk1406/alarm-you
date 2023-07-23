import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import store from './store';

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

/**
 * Use custom hook instead of plain useDispatch for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Use custom hook instead of plain useDispatch for better TypeScript support.
 * @see https://redux-toolkit.js.org/tutorials/typescript#define-typed-hooks
 */

export const useAppDispatch: () => AppDispatch = useDispatch;
