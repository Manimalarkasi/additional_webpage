
// import './App.css';
// import Navbar from './component/Navbar';
import Loginats from './component/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registerats from './component/Register';
import Home from './component/Homee';
import Board from './component/Board';





function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      {/* <Loginats /> */}
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
      <Route path='/' element={<Loginats />} />
        <Route path='/login' element={<Loginats />} />
        <Route  path='/register' element={<Registerats />}/>
        <Route path='/home' element={<Home />} />
        <Route path='/dash' element={<Board />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
