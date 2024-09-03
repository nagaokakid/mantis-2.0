import { ChangeEvent, FormEvent, useState } from "react";
import LogoImage from "../../assets/mantis_logo.png"
import { Link } from "react-router-dom"
import { LoginRequest } from "../../requests/ApiRequestHandler"

const LoginPage = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await LoginRequest(email, password);
    console.log(response); // TBC: more logic needed here to handle login attempt...
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-400 via-emerald-700 to-green-400">
      <div className="flex flex-col items-center justify-center mb-4 mt-4">
        <img src={LogoImage} className="w-10 h-auto"></img>
        <h1 className="text-3xl text-white font-thin">MANTIS</h1>
      </div>

      <form onSubmit={handleSubmit} className=" bg-slate-200 rounded shadow px-20 py-4">
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