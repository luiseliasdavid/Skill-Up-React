import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { cleanStatusRequest, getAllUsersWithAccount, logout, userData } from "../../../redux/actions";



const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let request = useSelector ( (state) => state.statusRequest );
    let user = useSelector( (state) => state.userData)
    const [ loading, setLoading ] = useState(true);


    /* const token = localStorage.getItem("token");
    useEffect(() => {
        if ( token !== null ) {
            dispatch( userData() );
        } else {
            navigate('/login')
        }
    }, [dispatch, token, navigate ]) */

    const token = localStorage.getItem("token"); 
    /* useEffect(() => {
        if ( token !== null ) {
            navigate('/home')
        }
    }, [token, navigate ])     */
    useEffect(() => {
        if ( token === null ) navigate('/login');
    }, [ token, navigate ])
    
    
    useEffect(() => {
        dispatch(userData());
    }, [ dispatch ])
    
    
    useEffect(() => {
        if ( request.status === 200 ) {
            setLoading(false);
            dispatch(cleanStatusRequest());
        }
        if ( request.status === '0' ) return;
        if ( request.status !== 200 ) {
           /* alert(`Ha ocurrido un error, intenta más tarde`) */
           dispatch(cleanStatusRequest());
        }   
     }, [ dispatch, request ])  
     
    

     const getAccountListAndUserList = () => {
        dispatch(getAllUsersWithAccount());
     };

     const desloguearse = () => {
        dispatch(logout());
        navigate('/login')
     } 

    return (
        <div className="App-header">
            {
                loading ? <div>Loading...</div> : <div>{user.account.money ? user.account.money : ''}</div>
            }
            <img src={"./alkemy_logo.svg"} className="App-logo" alt="logo" />
            <p>Bienvenido a AlkyBank</p>
            <button onClick={getAccountListAndUserList}>
                LIST DE USER AND ACCOUNTS
            </button>
            <Link to={'/movements'}>llevar a movements</Link>
            <button onClick={desloguearse}>LOGOUT</button>
            <Link to={'/charge'}>Cargar saldo</Link>
        </div>
    );
};

export default Home;
