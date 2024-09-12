import NavBar from '../ui/NavBar'
import {Outlet} from 'react-router-dom'

const NavBarLayout = () => {

  return (
    
    <div className="flex flex-col min-w-full max-w-{100%}">
        <div className="sticky top-0 left-0 z-50 min-w-fit">
            <NavBar/>
        </div>
        <main className="w-full break-words p-8">
            <Outlet/>
        </main>
    </div>
    
  )
}

export default NavBarLayout