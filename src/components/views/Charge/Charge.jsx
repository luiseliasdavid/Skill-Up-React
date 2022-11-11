import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
          setAmount('');
          dispatch(cleanStatusRequest());
      }   
     }, [ dispatch, request ])
     
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const OnTopup = (e) => {
    e.preventDefault();
    if (Number(amount) < 0) {
      toast('El monto debe ser mayor a $0');
      setAmount('');
      return;
    };
    dispatch(addMoneyToAccount( amount, data.id ));
    setLoading(true);
    setAmount('');
  };

  const money = (value) => {
    let moneyFormat = new Intl.NumberFormat('es-AR', { 
      style: 'currency',
      minimumFractionDigits: 2,
      currency: 'ARG' 
  })
  return String(moneyFormat.format(value)); 
  };

  return (
    <div>
      {
        loading ? <span className="spinner-border"></span> 
        : 
        <div>
          <span> Saldo en cuenta: </span>
          <h3>{ data !== {} ? `$${money(data.money)}` : ''}</h3>
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

            {/* Inhabilitar el botton de CARGAR si amount es '' */}
            <button type={'submit'}>CARGAR SALDO</button>
          </form>

        </div>
      }
    </div>
  )
}

export default Charge;