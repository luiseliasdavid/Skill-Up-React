import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanStatusRequest, getAllUsersWithAccount, userData } from "../../../redux/actions";



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let request = useSelector ( (state) => state.statusRequest );

    const token = localStorage.getItem("token");
    useEffect(() => {
        if ( token !== null ) {
            dispatch( userData() );
        } else {
            navigate('/login')
        }
    }, [dispatch, token, navigate ])
    
    useEffect(() => {
        if ( request.status === 200 ) {
            dispatch(cleanStatusRequest());
        }
        if ( request.status === '0' ) return;
        if ( request.status !== 200 ) {
           alert(`Ha ocurrido un error, intenta más tarde`)
           dispatch(cleanStatusRequest());
        }   
     }, [ dispatch, request ])  
     
    

     const getAccountListAndUserList = () => {
        dispatch(getAllUsersWithAccount());
     };

    return (
        <div className="App-header">
            <img src={"./alkemy_logo.svg"} className="App-logo" alt="logo" />
            <p>Bienvenido a AlkyBank</p>
            <button onClick={getAccountListAndUserList}>
                LIST DE USER AND ACCOUNTS
            </button>
        </div>
    );
};

export default Home;
