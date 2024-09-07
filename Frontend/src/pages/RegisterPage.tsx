import { ChangeEvent, FormEvent, useState } from "react";
import LogoImage from "../assets/mantis_logo.png"
import { Link } from "react-router-dom"
import validator from "validator"
import { RegisterRequest } from "../requests/ApiRequestHandler";

const RegisterPage = () => {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isNewEmail, setIsNewEmail] = useState(true);
  const [isStatusOk, setIsStatusOk] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // form field value change logic
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => 
  {
    const {name, value} = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  // form submission logic
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => 
  {
    event.preventDefault();

    // reset state variables before checking form fields
    setPasswordsMatch(true);
    setIsValidEmail(true);
    setIsNewEmail(true);
    setIsStatusOk(true);

    // state used to disable button submit and key down to prevent duplicate user creation
    setIsRegistering(true);

    // check if passwords match and email is valid
    switch (true)
    {
      case (formData.password !== formData.confirmPassword): // passwords have to match
        setPasswordsMatch(false);
        setIsRegistering(false);
        return;
      case (!validator.isEmail(formData.email)): // email must be valid format
        setIsValidEmail(false);
        setIsRegistering(false);
        return;
    }

    // now check if email is already taken
    const response = await RegisterRequest(formData.firstName, formData.lastName, formData.email, formData.password);

    if (response.status === 400)
    {
      setIsNewEmail(false); // email already exists in db; can't register user
      setIsRegistering(false);
      console.error(`Message: ${response.text()}`)
      return;
    }
    else if (!response.ok)
    {
      setIsStatusOk(false); // server responded with different error; can't register user
      setIsRegistering(false);
      console.error(`Message: ${response.text()}`)
      return;
    }

    // point of successful registration
    setIsRegistering(false);
    setShowSuccessModal(true);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) =>
  {
    if (isRegistering && event.key === 'Enter')
    {
      event.preventDefault();
    }
  }

  const closeSuccessModal = () =>
  {
    setShowSuccessModal(false);
  }

  const closeErrorModal = () =>
  {
    setIsStatusOk(true);
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-400 via-emerald-700 to-green-400">
      
      {/* Registration in process dialog */}
      {isRegistering && (<div className="modal modal-open">
        <div className="modal-box">
          <form method="dialog"/>
          <h3 className="font-bold text-lg">Please wait</h3>
          <p className="py-4">Creating your account now...</p>
        </div>
      </div>)}

      {/* Registration success dialog */}
      {showSuccessModal && (<div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Registration successful!</h3>
          <p className="pt-4">Please login with your newly registered account.</p>
          <div className="modal-action">
            <form method="dialog">
              <button onClick={closeSuccessModal} className="bg-green-600 hover:bg-green-500 text-white text-md text-center w-1/8 py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                <Link to="/login">Go to Login</Link>
              </button>
            </form>
          </div>
        </div>
      </div>)}

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

      {/* Logo */}
      <div className="flex flex-col items-center justify-center mb-4 mt-4">
        <img src={LogoImage} className="w-10 h-auto"></img>
        <h1 className="text-3xl text-white font-thin">MANTIS</h1>
      </div>

      {/* Registration form */}
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className=" bg-slate-200 rounded shadow px-20 py-4">
        <div className="mb-8">
          <h1 className="block text-center text-2xl">Register</h1>
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='firstName'>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="John"
            className="input-md input-bordered w-full text-md" />
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='lastName'>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Doe"
            className="input-md input-bordered w-full text-md" />
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='email'>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="example@gmail.com"
            className="input-md input-bordered w-full text-md" />
          {!isValidEmail && (
              <div>
                <p className="text-red-600">Invalid email address</p>
              </div>
            )}
          {!isNewEmail && (
            <div>
              <p className="text-red-600">Email is already registered as a user</p>
            </div>
          )}
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='password'>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-md input-bordered w-full text-md" />
        </div>
        <div className="mb-8">
          <label className="block text-left text-grey text-md pl-1 mb-2" htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="input-md input-bordered w-full text-md" />
            {!passwordsMatch && (
              <div>
                <p className="text-red-600">Passwords do not match</p>
              </div>
            )}
        </div>
        <div className="flex items-center justify-center">
          <button type="submit" disabled={isRegistering} className="bg-green-600 hover:bg-green-500 text-white text-xl text-center 
          w-2/3 py-4 px-6 rounded focus:outline-none focus:shadow-outline">
            SIGN UP
          </button>
        </div>
        <div className="flex items-center justify-center text-md text-grey mt-6 mb-1">
          <p>Already have an account? <Link to="/login" className="text-blue-700 hover:underline">Login here.</Link> </p>
        </div>
      </form>

    </div>
  )
}

export default RegisterPage