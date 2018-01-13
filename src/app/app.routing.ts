import { Routes } from '@angular/router';

import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventListComponent } from './event-list/event-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'campaignList', component: CampaignListComponent },
    { path: 'campaign/:id', component: CampaignDetailsComponent },
    { path: 'eventList', component: EventListComponent },
    { path: 'event', component: EventDetailsComponent },
    { path: 'userList', component: UserListComponent },
    { path: 'user', component: UserDetailsComponent },
    { path: '', component: HomeComponent },
    { path: '**', redirectTo: '' }
];
