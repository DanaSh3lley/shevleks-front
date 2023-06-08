import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Header from "./components/Header";
import Cookies from "js-cookie"
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import CatalogPage from "./pages/CatalogPage";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getUserInfo} from "./actions/userActions";
import ProductPage from "./pages/ProductPage";
import FavoritePage from "./pages/FavoritePage";
import CartPage from "./pages/CartPage";
import MessagesPage from "./pages/MessagesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import UserPage from "./pages/UserPage";
import AboutUsPAge from "./pages/AboutUsPage";
import AboutUsPage from "./pages/AboutUsPage";
import PaymentPage from "./pages/PaymentPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";

function App() {
    const isAuthenticated = !!Cookies.get('token')
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.user);

    useEffect(() => {
        if (!loading && isAuthenticated) {
            dispatch(getUserInfo())
        }
    }, [dispatch]);

    return (
        <div className="App">
            <BrowserRouter>
                <Header isAuthenticated={isAuthenticated}/>
                <Routes>
                    <Route path="/login" element={<LoginPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/signup" element={<RegistrationPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/forgot" element={<ForgotPasswordPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/reset/:resetToken" element={<ResetPasswordPage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/update" element={<UpdateProfilePage isAuthenticated={isAuthenticated}/>}/>
                    <Route path="/about" element={<AboutUsPage />}/>
                    <Route path="/profile" element={<UserPage/>}/>
                    <Route path="/payment" element={<PaymentPage/>}/>
                    <Route path="/payment/success" element={<PaymentSuccessPage/>} />
                    <Route path="/payment/cancel" element={<PaymentCancelPage/>} />
                    <Route path="/catalog" element={<CatalogPage/>}/>
                    <Route path="/favorites" element={<FavoritePage/>}/>
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/messages" element={<MessagesPage/>}/>
                    <Route path="/product/:productId" element={<ProductPage/>}/>
                    <Route path="/" element={<Landing/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
