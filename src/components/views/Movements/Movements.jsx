import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllMovements } from '../../../redux/actions';


const Movements = () => {


  const dispatch = useDispatch();


  const getMovements = (e) => {
    dispatch(getAllMovements(e.target.value))   
  }

  return (
    <div>
      <h1>Movements</h1>
      <button onClick={getMovements} value={1}>1</button>
      <button onClick={getMovements} value={2}>2</button>
      <button onClick={getMovements} value={3}>3</button>
      <button onClick={getMovements} value={4}>4</button>
    </div>
  )
}

export default Movements