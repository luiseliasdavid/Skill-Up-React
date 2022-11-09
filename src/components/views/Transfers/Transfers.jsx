import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { balance, cleanStatusRequest, sendMoneyToUser, userData } from '../../../redux/actions';

const Transfers = () => {

  let data = useSelector((state) => state.userData);
  let request = useSelector( (state) => state.statusRequest );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(true);
  const [ alertState, setAlertState ] = useState(false);

  const token = localStorage.getItem("token");

    useEffect(() => {
        if ( token !== null ) {
            dispatch( userData() );
        } else {
            navigate('/login')
        }
    }, [dispatch, token, navigate ]) 
    


    useEffect(() => {
        if ( request.status === 200 && alertState === true ) {
          setLoading(false);
          alert('Envio realizado con éxito');
          /*  setAlert(true);   */
          dispatch(cleanStatusRequest());
        }
        if ( request.status === 200 ) {
          setLoading(false);
          dispatch(cleanStatusRequest());
        }
        if ( request.status === '0' ) return;
        if ( request.status !== 200 ) {
           alert(`error al buscar el balance`)
           dispatch(cleanStatusRequest());
        }   
     }, [ dispatch, request, alertState ])   


     const mandarDineroAmigo = () => {
      setLoading(true);
      dispatch(sendMoneyToUser(7, 100,'pago de los botines', 
               data.account.money, data.account.id, data.id ));
   }


  return (
    <div>
      <h1>Transfers</h1>
      {
        loading && <div>loading...</div> 
      } 
      <button onClick={mandarDineroAmigo}>ENVIAR DINERO</button>
    </div>
  )
}

export default Transfers