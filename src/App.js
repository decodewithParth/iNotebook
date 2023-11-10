import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Home from './Components/Home';
import Alert from './Components/Alert';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
      <Navbar/>
      <Alert message="This is amazing"/>
      <div className="container">
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
        </Routes>
      </div>
      </BrowserRouter >
      </NoteState>
    </>
  );
}

export default App;
