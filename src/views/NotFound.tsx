import { Container, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container sx={{ padding: "2rem" }}>
            <Typography variant="h2" component="h2">404 Not Found</Typography>
            <Typography variant="body1" component="p" sx={{ padding: '30px', fontSize: '18px' }}>
                The requested page could not be found
            </Typography>
            <NavLink to='/' replace>Return to the homepage</NavLink>
        </Container>
    )
}

export default NotFound