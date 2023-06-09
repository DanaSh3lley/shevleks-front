import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import CatalogPage from "./pages/CatalogPage";
import {getUserInfo} from "./actions/userActions";
import ProductPage from "./pages/ProductPage";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import MessagesPage from "./pages/MessagesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import AboutUsPage from "./pages/AboutUsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
    const isAuthenticated = !!Cookies.get("token");
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.user);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            dispatch(getUserInfo());
        }
    }, [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isAuthenticated={isAuthenticated}/>
                <Routes>
                    <Route
                        path="/login"
                        element={<LoginPage isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/signup"
                        element={<RegistrationPage isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/forgot"
                        element={<ForgotPasswordPage isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/reset/:resetToken"
                        element={<ResetPasswordPage isAuthenticated={isAuthenticated}/>}
                    />
                    <Route
                        path="/update"
                        element={<UpdateProfilePage isAuthenticated={isAuthenticated}/>}
                    />
                    <Route path="/about" element={<AboutUsPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/profile" element={<UserPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/payment" element={<PaymentPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/payment/success" element={<PaymentSuccessPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/payment/cancel" element={<PaymentCancelPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/catalog" element={<CatalogPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/favorites" element={<FavoritePage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/cart" element={<CartPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/messages" element={<MessagesPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/product/:productId" element={<ProductPage/>}/>
                    <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                    <Route path="/" element={<Landing/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
