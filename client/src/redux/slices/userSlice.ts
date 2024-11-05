import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number | null;
    fullName: string | null;
    email: string | null;
}

// Set the initial state as an object that conforms to UserState
const initialState: UserState = {
    id: null,
    fullName: null,
    email: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            return action.payload; // Update state with the new user data
        },
        clearUser() {
            return initialState; // Reset to initial state
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;