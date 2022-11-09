import {useEffect, useState} from "react";
import styles from "./Home.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {balance} from "../../../redux/actions";
import {userData} from "../../../redux/actions";

const Home = () => {
  const [value, setValue] = useState(0);
  const [hide, setHide] = useState(false);
  const [transactions, setTransactions] = useState([]);

  console.log(transactions);

  const handleHide = () => {
    setHide(!hide);
  };

  let data = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(balance(setValue(data.userData.balance?.totalBalance)));
  }, [dispatch, data.userData.balance?.totalBalance]);

  useEffect(() => {
    let user = dispatch(userData(data.userData.account));
    localStorage.setItem("userData", JSON.stringify(user));
  }, [dispatch]);

  useEffect(() => {
    dispatch(balance(setTransactions(data?.userData?.transactions?.topup)));
  }, [dispatch]);

  return (
    <div className={`container mt-5 ${styles.bgColor}`}>
      <div className="row vh-100">
        <div className="col-4 d-flex flex-column align-items-center justify-content-evenly ">
          <div className={`card w-75 ${styles.cardHeightLeft} `}>
            <p className="mt-2">Available money</p>
            <h2 className="mt-2">${hide ? value : "******"}</h2>
            <button className="btn btn-primary " onClick={handleHide}>
              {hide ? "hide" : "show"}
            </button>
          </div>
          <div className="card w-75 h-25"></div>

          <div className="card w-75 h-25"></div>

          <div
            className={`card w-75 ${styles.regret} d-flex justify-content-center margin-auto flex-row  align-items-center`}>
            <span className={`styles.`}>Regret button</span>
          </div>
        </div>
        <div className="col-8 text-center  d-flex justify-content-center align-items-center flex-column">
          <div className={`card w-75  ${styles.cardHeight}`}>
            <h5 className="bg-info ">Last movements</h5>
            {transactions.slice(0, 5).map((money) => (
              <div key={money.id} className="card-body position-relative ">
                <li
                  className={`list-group-item border border-black rounded ${styles.listCard}`}>
                  <p>${money.amount}</p>
                  <p>Concept: {money.concept}</p>
                  <p>Date: {money.date}</p>
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
