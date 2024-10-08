import * as LoginExceptions from '../exceptions/LoginExceptions'
import {Ajax} from './Ajax'
import * as DTO from '../data/DTO'
import bcrypt from 'bcryptjs'

// use localhost url if in dev mode OR use cloud url if in deployment mode
let API_URL = "";
if (import.meta.env.DEV)
{
    API_URL = import.meta.env.VITE_APP_LOCAL_API_URL;
}
else
{
    API_URL = import.meta.env.VITE_APP_API_URL;
}

// fixed salt value for hash
const SALT = import.meta.env.VITE_APP_FIXED_SALT || "";

export const LoginRequest = async (email: string, password: string): Promise<any> =>
{
    try
    {
        if (SALT === "")
        {
            throw new LoginExceptions.HashSaltException(); // throw exception if fixed salt value is not found in .env file
        }

        const inputPassHash = bcrypt.hashSync(password, SALT); // generate hash value from input password

        const url = API_URL + "api/login/";
        const data: DTO.UserLoginInfo = {
            Email: email,
            Password: inputPassHash
        }
        const response = await Ajax.post(url, data);

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`)
        }

        return response;
    }
    catch (error: any)
    {
        console.error("Login attempt unsuccessful.", error);
    }
}

export const RegisterRequest = async(firstName: string, lastName: string, email: string, password: string): Promise<any> =>
{
    try 
    {
        if (SALT === "")
            {
                throw new LoginExceptions.HashSaltException(); // throw exception if fixed salt value is not found in .env file
            }
    
        const inputPassHash = bcrypt.hashSync(password, SALT); // generate hash value from input password

        const newUser: DTO.UserRegisterInfo = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: inputPassHash
        }

        const url = API_URL + "api/register/"
        const response = await Ajax.post(url, newUser);

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`)
        }

        return response;
    } 
    catch (error: any) 
    {
        console.error("Register attempt unsuccessful.", error);
    }
}