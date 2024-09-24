import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { EvenementListComponent } from './pages/evenement-list/evenement-list.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { ProfileComponent } from '@pages/profile/profile.component';
import { CallbackComponent } from '@pages/callback/callback.component';

export const routes: Routes = [
    { path: 'home', component: EvenementListComponent },
    { path: 'home/:slug', component: EventPageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'callback', component: CallbackComponent },
    { path: '**', redirectTo: 'home' },
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
