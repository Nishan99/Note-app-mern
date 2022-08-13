
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import { Container } from '@mui/material';
import AddNote from './components/AddNote/AddNote';
import EditNote from './components/EditNote/EditNote';

function App() {
  
  return (
    <Container maxWidth="xl">
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddNote/>}/>
        <Route path='edit/:id' element={<EditNote/>}/>
      </Routes>
    </Router>
      </Container>
   
  );
}

export default App;
