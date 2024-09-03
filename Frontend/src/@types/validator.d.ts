declare module 'validator' {
    export function isEmail(email: string): boolean;
    export function isLength(str: string, options: { min?: number; max?: number }): boolean;
}