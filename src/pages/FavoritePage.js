import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Favorite from "../components/Favorite";

function FavoritePage({isAuthenticated}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/unauthorized");
  }, [isAuthenticated]);
  return <Favorite />;
}

export default FavoritePage;
