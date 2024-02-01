import logo from './logo.svg';
import './App.css';
import Left from './Instagram';
import { Grid } from '@mui/material';
import MediaCard from './Profilecard';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profile from './Profile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      
      <Route path='/' element={<Home/>}>

      </Route>
      <Route path='/profile' element={<Profile/>}></Route>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
