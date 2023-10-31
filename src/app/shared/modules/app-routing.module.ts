import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: 'recipes', loadChildren: () => import( '../../recipes/recipes.module' ).then( m => m.RecipesModule ) },

    // { path: 'auth', component: AuthComponent },
    // { path: 'shopping-list', component: ShoppingListComponent },
    // { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
    // { path: '**', redirectTo: '/recipes' },
];

@NgModule( {
    imports: [ RouterModule.forRoot( appRoutes ) ],
    exports: [ RouterModule ]
} )
export class AppRoutingModule { }
