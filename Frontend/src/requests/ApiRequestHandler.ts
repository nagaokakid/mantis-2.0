import * as LoginExceptions from '../exceptions/LoginExceptions'
import {Ajax} from './Ajax'
import * as DTO from '../data/DTO'
import bcrypt from 'bcryptjs'

// url for api connection
const API_URL = import.meta.env.VITE_APP_API_URL;

// fixed salt value for hash
const SALT = import.meta.env.VITE_APP_FIXED_SALT || "";

export const LoginRequest = async (email: string, password: string) =>
{
    try
    {
        if (SALT === "")
        {
            throw new LoginExceptions.HashSaltException(); // throw exception if fixed salt value is not found in .env file
        }

        const inputPassHash = bcrypt.hashSync(password, SALT); // generate hash value from input password

        const url = API_URL + "login/";
        const data: DTO.UserLoginInfo = {
            Email: email,
            HashValue: inputPassHash
        }
        const response = await Ajax.post(url, data);

        return response;
    }
    catch (error: any)
    {
        throw new Error(`Login attempt unsuccessful. ${error.message}`);
    }



    


}