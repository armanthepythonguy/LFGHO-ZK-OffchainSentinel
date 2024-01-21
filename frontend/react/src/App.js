import logo from './logo.svg';
import './App.css';
import Navigation from './components/navigation';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Pay from './pages/pay';

function App() {
  return (
     <div className="App">
      <Routes>
    <Route path="/" element={ <Home  />} />
    <Route path="/pay" element={ <Pay  />} />
 </Routes>
    </div>
  );
}

export default App;
