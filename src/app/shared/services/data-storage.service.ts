import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { AuthService } from './auth.service';
import { RecipeService } from './recipe.service';

@Injectable( { providedIn: 'root' } )
export class DataStorageService
{
    constructor( private http: HttpClient, private recipes: RecipeService, private authService: AuthService ) { }

    storeRecipes()
    {
        const recipes = this.recipes.getRecipes();
        this.http
            .put(
                'https://angular-app-a6575-default-rtdb.firebaseio.com/recipes.json',
                recipes
            )
            .subscribe( ( response ) =>
            {
                console.log( response );
            } );
    }

    fetchRecipes()
    {
        return this.http
            .get<Recipe[]>(
                'https://angular-app-a6575-default-rtdb.firebaseio.com/recipes.json' )
            .pipe(
                map( ( recipes ) =>
                {
                    return recipes.map( ( recipe ) =>
                    {
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : [],
                        };
                    } );
                } ),
                tap( ( recipes ) =>
                {
                    this.recipes.setRecipes( recipes );
                } )
            );
    }
}
