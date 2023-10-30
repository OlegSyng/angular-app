import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from 'src/app/auth/auth.component';
import { RecipeDetailComponent } from 'src/app/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from 'src/app/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from 'src/app/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from 'src/app/recipes/recipes.component';
import { ShoppingListComponent } from 'src/app/shopping-list/shopping-list.component';

import { recipeResolver } from '../services/recipe-resolver.service';
import { authGuardFn } from './auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [ authGuardFn ],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            {
                path: ':id',
                component: RecipeDetailComponent,
                resolve: [ recipeResolver ],
            },
            {
                path: ':id/edit',
                component: RecipeEditComponent,
                resolve: [ recipeResolver ],
            },
        ],
    },
    { path: 'shopping-list', component: ShoppingListComponent },
    // { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    // { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: '/recipes' },
];

@NgModule( {
    declarations: [],
    imports: [ RouterModule.forRoot( appRoutes ) ],
    exports: [ RouterModule ],
    providers: [],
} )
export class AppRoutingModule { }
