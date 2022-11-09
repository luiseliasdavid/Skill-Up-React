import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addMoneyToAccount, cleanStatusRequest, userData } from '../../../redux/actions';





const Charge = () => {

  let data = useSelector((state) => state.userData);
  let request = useSelector( (state) => state.statusRequest );

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const cargasaldo = () => {
    dispatch(addMoneyToAccount(500, data.account.id));
  };


  return (
    <div>
      <button onClick={cargasaldo}>CARGAR SALDO</button>
    </div>
  )
}

export default Charge;