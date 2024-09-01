declare module 'bcryptjs' {
    export function genSaltSync(rounds?: number): string;
    export function hashSync(data: string, salt: string | number): string;
    export function compareSync(data: string, encrypted: string): boolean;
    export function hash(data: string, salt: string | number, callback: (err: Error | null, hash: string) => void): void;
    export function compare(data: string, encrypted: string, callback: (err: Error | null, result: boolean) => void): void;
}