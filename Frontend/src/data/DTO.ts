export interface UserLoginInfo
{
    Email: string,
    Password: string
}

export interface SuccessfulUserLoginInfo
{
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    projectCount: number,
    ticketCount: number
}

export interface UserRegisterInfo
{
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string
}