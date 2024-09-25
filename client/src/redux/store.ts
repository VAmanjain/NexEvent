import { configureStore } from '@reduxjs/toolkit';  
import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
    },
    // Middleware is automatically included, including thunk
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;