export interface UserLoginInfo
{
    Email: string,
    Password: string
}

export interface SuccessfulUserLoginInfo
{
    Id: string,
    FirstName: string,
    LastName: string,
    UserName: string,
    ProjectCount: number,
    TicketCount: number
}

export interface UserRegisterInfo
{
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string
}