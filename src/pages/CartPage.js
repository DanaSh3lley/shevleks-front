import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Cart from "../components/Cart";

function CartPage({isAuthenticated}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) navigate("/unauthorized");
    }, [isAuthenticated]);

    return <Cart/>;
}

export default CartPage;
