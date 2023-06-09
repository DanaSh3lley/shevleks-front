import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Messages from "../components/Messages";

function MessagesPage({isAuthenticated}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/unauthorized");
  }, [isAuthenticated]);
  return <Messages />;
}

export default MessagesPage;
