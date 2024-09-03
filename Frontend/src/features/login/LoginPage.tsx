import { ChangeEvent, FormEvent, useState } from "react"
import LogoImage from "../../assets/mantis_logo.png"
import { Link } from "react-router-dom"
import { LoginRequest } from "../../requests/ApiRequestHandler"
import { useUserContext } from "../../contexts/UserContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isValidCredentials, setIsValidCredentials] = useState(true);
  const [isStatusOk, setIsStatusOk] = useState(true);
  const {setUser} = useUserContext();

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // reset state variables
    setIsValidCredentials(true);
    setIsStatusOk(true);

    // send login request to server
    const response = await LoginRequest(email, password);

    // email and/or password is incorrect
    if (response.status === 401)
    {
      setIsValidCredentials(false);
      console.error(`Message: ${response.text()}`);
      return;
    }
    else if (!response.ok)
    {
      setIsStatusOk(false);
      console.error(`Message: ${response.text()}`);
      return;
    }

    // login is successful at this point...
    const userData = response.json();
    setUser(userData);
    navigate("/home");
  }

  const closeErrorModal = () =>
  {
    setIsStatusOk(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-400 via-emerald-700 to-green-400">
      
      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-4 mt-4">
        <img src={LogoImage} className="w-10 h-auto"></img>
        <h1 className="text-3xl text-white font-thin">MANTIS</h1>
      </div>

      {/* Server response error dialog */}
      {!isStatusOk && (<div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Oops...something went wrong!</h3>
          <p className="pt-4">Please try again.</p>
          <div className="modal-action"> 
            <form method="dialog">
              <button onClick={closeErrorModal} className="btn bg-green-600 hover:bg-green-500 text-white text-md">Close</button>
            </form>
          </div>
        </div>
      </div>)}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className=" bg-slate-200 rounded shadow px-20 py-4 max-w-md w-full">
        <div className="mb-8">
          <h1 className="block text-center text-2xl">Login</h1>
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='email'>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter your email here..."
            className="input-md input-bordered w-full text-md" />
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='username'>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder="Enter your password here..."
            className="input-md input-bordered w-full text-md" />
        </div>
        {!isValidCredentials && (<div className="max-w-full flex-shrink-0">
          <p className="text-red-600 mb-8 text-center">Incorrect email and/or password</p>
        </div>)}
        <div className="flex items-center justify-center">
          <button className="bg-green-600 hover:bg-green-500 text-white text-xl text-center w-2/3 py-4 px-6 rounded focus:outline-none focus:shadow-outline">
            LOGIN
          </button>
        </div>
        <div className="flex items-center justify-center text-md text-grey mt-6 mb-1">
          <p>Don't have an account? <Link to="/register" className="text-blue-700 hover:underline">Register here.</Link> </p>
        </div>
      </form>

    </div>
  )
}

export default LoginPage