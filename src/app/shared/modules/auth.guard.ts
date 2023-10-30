import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { map, take } from "rxjs";

import { AuthService } from "../services/auth.service";

export const authGuardFn: CanActivateFn = ( route, state ) =>
{
    const router = inject( Router );
    const authService = inject( AuthService );
    return authService.user.pipe(
        take( 1 ),
        map( ( user ) =>
        {
            const isAuth = !!user;
            if( isAuth )
            {
                return true;
            }
            return router.createUrlTree( [ '/auth' ] );
        } ) );
};