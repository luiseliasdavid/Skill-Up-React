import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  balance,
  cleanStatusRequest,
  sendMoneyToUser,
  userData,
} from '../../../redux/actions'

const Transfers = () => {
  let data = useSelector((state) => state.userData)
  let request = useSelector((state) => state.statusRequest)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [destinatary, setDestinatary] = useState({
    id: null,
    amountToSend: null,
    concept: null,
  })

  //parameters that use senMoneyToUser (7, 1,'pago de los botines', data.account.money, data.account.id, data.id )
  const setValues = (e) => {
    setDestinatary({
      ...destinatary,
      [e.target.name]: e.target.value,
    })
  }

  function SedMoneyToUser(e) {
    e.preventDefault()

    dispatch(
      sendMoneyToUser(
        destinatary.id,
        destinatary.amountToSend,
        destinatary.concept,
        data.account.money,
        data.account.id,
        data.id,
      ),
    ).then((res) => alert(res.status.message))
  }
  

  return (
    <div>
      <div className="container">
        <div className="row justify-content-md-center">
          <form onSubmit={(e) => SedMoneyToUser(e)} className="col-3">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Saldo Disponible
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  $
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre de usuario"
                  aria-label="Nombre de usuario"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Id del usuario
              </label>
              <input
                onChange={(e) => setValues(e)}
                name="id"
                type="number"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Monto a enviar
              </label>
              <input
                onChange={(e) => setValues(e)}
                name="amountToSend"
                type="number"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Concepto
              </label>
              <input
                onChange={(e) => setValues(e)}
                name="concept"
                type="text"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Transfers
