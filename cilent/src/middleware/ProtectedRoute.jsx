import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
    const user = useSelector((state) => state.user.data);

    // In a real app, you might check for a token in localStorage as well
    const token = localStorage.getItem('token');

    if (!token && !user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
