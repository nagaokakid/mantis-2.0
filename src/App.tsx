import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import RegisterPage from "./features/register/RegisterPage";
import HomeContent from './features/home/HomeContent';

function App() {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/home" element={<HomeContent/>} />
        </Routes>
      </Router>
  )
}

export default App
