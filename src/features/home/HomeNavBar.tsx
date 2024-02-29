import LogoImage from "../../assets/mantis_logo.png"

const NavBar = () => {

  return (
    <div>

    <div className="navbar flex bg-green-600 w-full items-center justify-between h-fit">
      <div className="flex justify-start">
        <img src={LogoImage} className="w-10 h-auto" alt="Mantis Logo" />
        <a className="text-3xl text-white font-mono font-thin ml-2">MANTIS</a>
      </div>
      
        <div className="form-control">
          <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
        </div>
    </div>

    </div>
  )
}

export default NavBar