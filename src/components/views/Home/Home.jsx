import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authUser } from "../../../redux/actions/authActions";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // if user was logged, dispatch auth action
        localStorage.getItem("token") && dispatch(authUser());
    }, []);
  return (
    <div>Home</div>
  )
}

export default Home;