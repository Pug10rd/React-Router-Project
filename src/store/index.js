import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../store/slices/userSlice.js';
import movieReducer from '../store/slices/movieSlice.js';

// Функции загрузки и сохранения состояния
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn('Failed to load state from localStorage', e);
    return undefined;
  }
};

const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn('Failed to save state to localStorage', e);
  }
};

// Загружаем состояние перед созданием хранилища
const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    movie: movieReducer,
  },
  preloadedState, // Загружаем состояние при инициализации
});

// Сохраняем состояние при каждом изменении
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
