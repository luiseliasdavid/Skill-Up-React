import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.min.css';
import Layout from './components/Layout/Layout';
import { getUserAccount } from './redux/actions/accountActions';

import { authUser, logout } from './redux/actions/authActions';
import toast from './utils/toast';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // if user was logged, dispatch auth action
        if (localStorage.getItem("token")) {
            dispatch(authUser()).then((res) => {
                // if there's any problem with the token, force a logout.
                const { error } = res;
                if (!error) {
                    toast(`¡Bienvenido ${res?.first_name}!`, "success");
                } else {
                    dispatch(logout());
                }
            });
            dispatch(getUserAccount());
        }
    }, []);

    return (
        <div className="App">
            <Layout />
        </div>
    );
}

export default App;
