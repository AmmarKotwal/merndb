import logo from './logo.svg';
import './App.css';
import Register from './Components/Register';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowData from './Components/ShowData';



function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element= {<Register />} />
        <Route path="/show" element= {<ShowData />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
