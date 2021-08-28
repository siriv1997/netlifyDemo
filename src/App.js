import logo from './logo.svg';
import './App.css';
import AddUser from './components/create/create';
import Userdaata from './components/read/read';

function App() {
  return (
    <div className="App">
        <AddUser ></AddUser>
        <Userdaata />
    </div>
  );
}

export default App;
