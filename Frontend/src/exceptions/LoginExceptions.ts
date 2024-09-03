// For when hash salt can't be found in .env
export class HashSaltException extends Error
{
    constructor()
    {
        const msg = "Fixed salt value used for hashing was NOT found in .env file and is therefore empty.";
        super(msg);
    }
}

// For when user gives incorrect email and/or password
export class FailedLoginException extends Error
{
    status: number = 401;
    constructor(msg: string)
    {
        super(`${msg}. Please try again.`);
    }
}