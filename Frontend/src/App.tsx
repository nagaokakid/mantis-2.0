import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from './pages/DashboardPage';
import { UserProvider } from './contexts/UserContext';
import NavBarLayout from './components/layout/NavBarLayout';
import ProjectsPage from './pages/ProjectsPage';
import { MenuItemProvider } from './contexts/MenuItemContext';
import TicketsPage from './pages/TicketsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';

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
              <Route path="projects/:projectId" element={<ProjectDetailsPage/>}/>
              <Route path="tickets" element={<TicketsPage/>}/>
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
