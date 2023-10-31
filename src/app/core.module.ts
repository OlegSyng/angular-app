import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./shared/services/auth-interceptor.service";
import { RecipeService } from "./shared/services/recipe.service";
import { ShoppingListService } from "./shared/services/shopping-list.service";

@NgModule( {
    providers: [
        ShoppingListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
} )
export class CoreModule { }