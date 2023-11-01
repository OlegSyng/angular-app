import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './shared/modules/app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule( {
    declarations: [ AppComponent, HeaderComponent, ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        SharedModule,
        CoreModule
    ],
    bootstrap: [ AppComponent ],
} )
export class AppModule { }
