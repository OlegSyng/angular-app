import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component( {
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [ './header.component.css' ],
} )
export class HeaderComponent implements OnInit, OnDestroy
{
    public isAuthenticated: boolean = false;
    private userSubscribtion: Subscription = new Subscription();

    constructor( private dataStorageService: DataStorageService, private authService: AuthService ) { }

    ngOnInit(): void
    {
        this.userSubscribtion = this.authService.user.subscribe( user =>
        {
            this.isAuthenticated = !!user;
        } );
    }

    onSaveData()
    {
        this.dataStorageService.storeRecipes();
    }

    onFetchData()
    {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout()
    {
        this.authService.logout();
    }

    ngOnDestroy(): void
    {
        this.userSubscribtion.unsubscribe();
    }
}
