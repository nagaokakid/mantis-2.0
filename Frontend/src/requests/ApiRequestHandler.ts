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

        const url = API_URL + "api/register/";
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

export const CreateProjectRequest = async(newProjectInfo: DTO.CreateProjectInfo) =>
{
    try 
    {
        const url = API_URL + "api/project/";
        const response = await Ajax.post(url, newProjectInfo)

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`)
        }

        return response;
    } 
    catch (error: any) 
    {
        console.error("Create project attempt unsuccessful.", error);
    }
}

export const CreateTicketRequest = async(newTicketInfo: DTO.CreateTicketInfo) =>
    {
        try 
        {
            const url = API_URL + "api/ticket/";
            const response = await Ajax.post(url, newTicketInfo)
    
            if (!response.ok)
            {
                console.error(`Server responded with HTTP error: ${response.status}`)
            }
    
            return response;
        } 
        catch (error: any) 
        {
            console.error("Create ticket attempt unsuccessful.", error);
        }
    }

export const GetAllUserProjectsRequest = async(userId: string) =>
    {
        try 
        {
            const url = API_URL + "api/userproject/" + userId;
            const response = await Ajax.get(url)
    
            if (!response.ok)
            {
                console.error(`Server responded with HTTP error: ${response.status}`)
            }
    
            return response;
        } 
        catch (error: any) 
        {
            console.error("Get all user projects attempt unsuccessful.", error);
        }
    }

export const GetAllUserTicketsRequest = async (userId: string) =>
{
    try 
    {
        const url = API_URL + "api/userticket/" + userId;
        const response = await Ajax.get(url);

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`);
        }

        return response;

    } 
    catch (error: any) 
    {
        console.error("Get all user tickets attempt unsuccessful.", error);
    }
}

export const GetProjectRequest = async (projectId: string) => {
    try 
    {
        const url = API_URL + "api/project/" + projectId;
        const response = await Ajax.get(url);

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`);
        }

        return response;

    } 
    catch (error: any) 
    {
        console.error("Get project attempt unsuccessful.", error);
    }
}

export const GetUserBasicInfoRequest = async (userId: string) => {
    try 
    {
        const url = API_URL + "api/user/basic/" + userId;
        const response = await Ajax.get(url);

        if (!response.ok)
        {
            console.error(`Server responded with HTTP error: ${response.status}`);
        }

        return response;

    } 
    catch (error: any) 
    {
        console.error("Get basic user info attempt unsuccessful.", error);
    }
}