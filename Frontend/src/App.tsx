import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import RegisterPage from "./features/register/RegisterPage";
import HomePage from './features/home/HomePage';
import Projects from './features/projects/Projects';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/projects" element={<Projects/>} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
