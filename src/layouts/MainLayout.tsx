import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { setAuth } from '../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { UserAuth } from '../types/types';

const MainLayout = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: UserAuth) => state.user.auth);

    const handleSignOut = () => {
        dispatch(setAuth(false));
    }
    return (
        <>
            {auth && <Button
                sx={{ position: "absolute", top: "2rem", right: "2rem" }}
                onClick={handleSignOut}>
                Sign Out
            </Button>}
            <Suspense>
                <Outlet></Outlet>
            </Suspense>
        </>
    )
}

export default MainLayout