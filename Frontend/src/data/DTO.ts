import IProject from './Project'
import ITicket from './Ticket'

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
    ticketCount: number,
    completedProjectCount: number,
    completedTicketCount: number
}

export interface UserBasicInfo 
{
    id: string,
    firstName: string,
    lastName: string,
    userName: string,
    projectCount: number,
    ticketCount: number,
    completedProjectCount: number,
    completedTicketCount: number
}

export interface UserRegisterInfo
{
    FirstName: string,
    LastName: string,
    Email: string,
    Password: string
}

export interface CreateProjectInfo
{
    UserId: string | undefined,
    Project: IProject
}

export interface CreateTicketInfo
{
    UserId: string | undefined,
    Ticket: ITicket
}