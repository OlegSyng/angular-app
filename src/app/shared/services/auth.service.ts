import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";

import { Router } from "@angular/router";
import { User } from "../models/user.model";

interface ISignUpData
{
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface IAuthResponseData
{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable( { providedIn: 'root' } )
export class AuthService
{
    public user = new BehaviorSubject<User | null>( null );
    private tokenExpirationTimer: ReturnType<typeof setTimeout> | null = null;

    constructor( private http: HttpClient, private router: Router )
    {
    }

    public signup( email: string, password: string )
    {
        const signUpData: ISignUpData = { email, password, returnSecureToken: true };
        return this.http.post<IAuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey, signUpData ).pipe(
            catchError( this.handleError ),
            tap( ( responseData ) =>
            {
                this.handleAuthentication( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn );
            } )
        );
    }

    public login( email: string, password: string )
    {
        const loginData = { email, password, returnSecureToken: true };
        return this.http.post<IAuthResponseData>( 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey, loginData ).pipe(
            catchError( this.handleError ),
            tap( ( responseData ) =>
            {
                this.handleAuthentication( responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn );
            } )
        );
    }

    public logout()
    {
        this.user.next( null );
        this.router.navigate( [ '/auth' ] );
        localStorage.removeItem( 'userData' );
        if( this.tokenExpirationTimer )
        {
            clearTimeout( this.tokenExpirationTimer );
            this.tokenExpirationTimer = null;
        }
    }

    public autoLogin()
    {
        const userData = localStorage.getItem( 'userData' );
        if( !userData )
        {
            return;
        }
        const user: Record<'email' | 'id' | '_token' | '_tokenExpirationDate', string> = JSON.parse( userData );
        const loadedUser = new User( user.id, user.email, user._token, new Date( user._tokenExpirationDate ) );
        if( loadedUser.token )
        {
            const expirationDuration = new Date( user._tokenExpirationDate ).getTime() - new Date().getTime();
            this.user.next( loadedUser );
            this.autoLogout( expirationDuration );
        }
    }

    private autoLogout( expirationDuration: number )
    {
        this.tokenExpirationTimer = setTimeout( () =>
        {
            this.logout();
        }, expirationDuration );
    }

    private handleAuthentication( email: string, userId: string, token: string, expiresIn: number )
    {
        const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );
        const user = new User( userId, email, token, expirationDate );
        this.user.next( user );
        this.autoLogout( expiresIn * 1000 );
        localStorage.setItem( 'userData', JSON.stringify( user ) );
    }

    private handleError( errorResponse: HttpErrorResponse )
    {
        let errorMessage = 'An unknown error occurred!';
        if( !errorResponse.error || !errorResponse.error.error )
        {
            return throwError( () => new Error( errorMessage ) );
        }
        switch( errorResponse.error.error.message )
        {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct!';
                break;
        }
        return throwError( () => new Error( errorMessage ) );
    }
}