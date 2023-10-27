import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

@Component( {
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.css' ]
} )
export class AuthComponent
{
    public isLoginMode: boolean = true;
    public isLoading: boolean = false;
    public error: string | null = null;

    constructor( private authService: AuthService )
    {
    }

    onSwitchMode()
    {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit( form: NgForm )
    {
        if( !form.valid ) return;
        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;
        if( this.isLoginMode )
        {
            // ...
        } else
        {
            this.authService.signup( email, password ).subscribe( ( responseData ) =>
            {
                console.log( responseData );
                this.isLoading = false;
            }, ( error ) =>
            {
                console.log( error );
                this.isLoading = false;

            } );
        }

        form.reset();
    }
}

// Success
// label  class="block mb-2 text-sm font-semibold text-green-700 dark:text-green-500"
// input class="bg-green-50 border border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
// helperText class="text-sm text-green-700 dark:text-green-400"

// Error
// label class="block mb-2 text-sm font-semibold text-red-700 dark:text-red-500"
// input class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
// helperText class="text-sm text-red-700 dark:text-red-400"