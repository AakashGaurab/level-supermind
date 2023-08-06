import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Home from './pages/Home/Home';
import IndPost from './pages/ind_post/IndPost';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' Component={Home}/>
    <Route path="/login"  Component={Login} />
    <Route path="/signup"  Component={Signup}/>
    <Route path='/posts' Component={IndPost}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
