
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Nav />
          <Routes>
            
            <Route element = {<PrivateComponent/>}>
            <Route path="/" element= {<h1> Product Listing Component</h1>} />
            <Route path="/add" element= {<h1> Product add Component</h1>} />
            <Route path="/update" element= {<h1> Product update Component</h1>} />
            <Route path="/logout" element= {<h1> Product logout Component</h1>}/>
            <Route path="/profile" element= {<h1> profile Component</h1>}/>
            </Route>
          
            <Route path="/signup" element= {<SignUp/> }/>
            <Route path="/login" element= {<Login/> }/>
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
