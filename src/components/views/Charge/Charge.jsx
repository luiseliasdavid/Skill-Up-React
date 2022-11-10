import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addMoneyToAccount, cleanStatusRequest, userDataData } from '../../../redux/actions';
import toast from '../../../utils/toast';


const Charge = () => {

  let data = useSelector((state) => state.userAccount);
  let request = useSelector( (state) => state.statusRequest );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ loading, setLoading ] = useState(true);
  const [ amount, setAmount ] = useState('');
 
  useEffect(() => {
    if ( localStorage.getItem("token") === null ) navigate('/login');
  }, [ navigate, dispatch ])
  

  useEffect(() => {
    dispatch(userDataData()); 
  }, [ dispatch, data.money ])

   /*  useEffect(() => {
        if ( token !== null ) {
            dispatch( userData() );
        } else {
            navigate('/login')
        }
    }, [dispatch, token, navigate ]) */
    
    useEffect(() => {
      if ( request.status === 201 ) {
        setLoading(false);
        dispatch(cleanStatusRequest());
        return;
      } 
      if ( request.status === 200 ) {
        toast('Recarga realizada con éxito'); 

        dispatch(cleanStatusRequest());
        return;
      }
      if ( request.status === '0' ) return;
      if ( request.status !== 200 ) {
          toast('Lo sentimos, ha ocurrido un error. Intenta de nuevo')
          setLoading(false); 
          dispatch(cleanStatusRequest());
      }   
     }, [ dispatch, request ])
     
  const handleChange = (e) => {
    setAmount(e.target.value);
  }   

  const OnTopup = (e) => {
    e.preventDefault();
    if (amount < 0) {
      toast('El monto debe ser mayor a $0');
      return;
    }  //agregar mensaje 'el monto tiene que ser mayor a '0''.
    dispatch(addMoneyToAccount( amount, data.id ));
    setLoading(true);
    setAmount('');
  };

  return (
    <div>
      {
        loading ? <span className="spinner-border"></span> 
        : 
        <div>
          <span> Saldo en cuenta: </span>
          <h3>{ data !== {} ? `$${data.money}` : ''}</h3>
          <h1>TOPUP</h1>
          <form onSubmit={OnTopup}>
            <label>AR $</label>
            <input 
              type="number" 
              name={'amount'} 
              value={amount} 
              onChange={handleChange} 
              placeholder='Ingresa un monto...'
            />
            <button type={'submit'}>CARGAR SALDO</button>
          </form>
          <div>
            <Link to={'/home'}>ir al home</Link>
          </div>
        </div>
      }
    </div>
  )
}

export default Charge;