import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../../actions/userActions";

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = !!Cookies.get('token');
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.user);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            dispatch(getUserInfo());
        }
    }, [dispatch, isAuthenticated, loading]);

    if (loading) {
        return <div>Loading...</div>;
    } else
        return (
            isAuthenticated ? (
                <Component {...rest} />
            ) : (
                <Navigate to="/unauthorized"/>
            )
        );
};

export default PrivateRoute;
