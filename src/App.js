import './App.min.css';
import Layout from './components/Layout/Layout';
import { Estado } from './redux/reducers/Estado';

function App() {   
     
    return (
        <div className="App">
            <Layout />
            <Estado/>
        </div>
    );
}

export default App;
