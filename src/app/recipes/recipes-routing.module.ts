import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { authGuardFn } from "../shared/modules/auth.guard";
import { recipeResolver } from "../shared/services/recipe-resolver.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const routes: Routes = [
    {
        path: '',
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
];

@NgModule( {
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ],
} )
export class RecipesRoutingModule
{
}