import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AlertComponent } from "./components/alert/alert.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";
import { DropdownDirective } from "./directives/dropdown.directive";

@NgModule( {
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [ AlertComponent, LoadingSpinnerComponent, DropdownDirective, CommonModule ],
    providers: [],
} )
export class SharedModule { }