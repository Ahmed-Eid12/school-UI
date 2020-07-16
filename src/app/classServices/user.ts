export class User {
    id: number;
    code: number;
    userName: string;
    email: string;
    password: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: any;
    credentialsNonExpired: boolean;
    enabled: boolean;
    isAdmin: number;
}