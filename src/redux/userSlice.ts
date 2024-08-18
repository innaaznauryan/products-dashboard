import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        'auth': !!localStorage.getItem("auth")
    },
    reducers: {
        setAuth(state, { payload }) {
            state.auth = payload;
            if (payload) {
                localStorage.setItem('auth', 'true');
            } else {
                localStorage.removeItem('auth');
            }
        }
    }
})

export default userSlice.reducer;
export const { setAuth } = userSlice.actions;