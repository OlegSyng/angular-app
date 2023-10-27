import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface ISignUpData
{
    email: string;
    password: string;
    returnSecureToken: boolean;
}

interface IAuthResponseData
{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

@Injectable( { providedIn: 'root' } )
export class AuthService
{
    constructor( private http: HttpClient )
    {
    }

    public signup( email: string, password: string )
    {
        const signUpData: ISignUpData = { email, password, returnSecureToken: true };
        return this.http.post<IAuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCLKc8IUBt7OPGBNAAfr6bJXVtW8XB1LfE', signUpData );
    }
}