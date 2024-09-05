import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import RegisterPage from "./features/register/RegisterPage";
import DashboardPage from './features/dashboard/DashboardPage';
import { UserProvider } from './contexts/UserContext';
import NavBarLayout from './components/layout/NavBarLayout';
import ProjectsPage from './features/projects/ProjectsPage';
import { MenuItemProvider } from './contexts/MenuItemContext';

function App() {
  return (
    <UserProvider>
      <MenuItemProvider>
      <Router>
        <Routes>
          {/* Before user login */}
          <Route path="/" element={<LoginPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          
          
            {/* After user login; home subroutes*/}
            <Route path="/home" element={<NavBarLayout/>}>
              <Route index element={<DashboardPage/>}/>
              <Route path="dashboard" element={<DashboardPage/>}/>
              <Route path="projects" element={<ProjectsPage/>}/>
              <Route path="tickets"/>
              <Route path="schedule"/>
              <Route path="profile"/>
              <Route path="settings"/>
            </Route>

        </Routes>
      </Router>
      </MenuItemProvider>
    </UserProvider>
  )
}

export default App
