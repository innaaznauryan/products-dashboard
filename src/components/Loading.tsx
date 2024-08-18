import { CircularProgress } from '@mui/material';
import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <CircularProgress />
        <div>Loading...</div>
      </div>
    </div>
  );
};

export default Loading;