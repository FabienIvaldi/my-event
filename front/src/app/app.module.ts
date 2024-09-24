import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { EvenementListComponent } from './pages/evenement-list/evenement-list.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { AppRoutingModule } from './app.routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
// import { LoginComponent } from '@pages/login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        AppComponent,
        RouterModule, HttpClientModule,
        FormsModule
        // Ajoutez ici les autres composants standalone
    ],
    providers: [],
    bootstrap: [AppComponent],
    declarations: [EventPageComponent]

})
export class AppModule { }
