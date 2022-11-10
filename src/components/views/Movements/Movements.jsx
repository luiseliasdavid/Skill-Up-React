import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { cleanStatusRequest, getAllMovements } from '../../../redux/actions';


const Movements = () => {


  let request = useSelector( (state) => state.statusRequest );
  let user = useSelector( (state) => state.movements)
  const [ loading, setLoading ] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMovements(1))  
  }, [dispatch])
  

  useEffect(() => {
    if ( request.status === 200 ) {
        setLoading(false);
        dispatch(cleanStatusRequest());
    }
    if ( request.status === '0' ) return;
    if ( request.status !== 200 ) {
       alert(`Ha ocurrido un error, intenta más tarde`)
       dispatch(cleanStatusRequest());
    }   
 }, [ dispatch, request ])  


  const getMovements = (e) => {
    dispatch(getAllMovements(e.target.value))
    setLoading(true);   
  }

  return (
    <div>
      <h1>Movements</h1>
      <button onClick={getMovements} value={1}>1</button>
      <button onClick={getMovements} value={2}>2</button>
      <button onClick={getMovements} value={3}>3</button>
      <button onClick={getMovements} value={4}>4</button>
      {
        loading ? <div>Loading...</div> : <div>{JSON.stringify(user.data[0])}</div>
      }
      <Link to={'/home'}>Ir al home</Link>
    </div>
  )
}

export default Movements