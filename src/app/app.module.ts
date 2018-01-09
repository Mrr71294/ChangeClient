import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { routes } from './app.routing';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { CampaignService } from'./services/campaign.service';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventService } from'./services/event.service';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserService } from'./services/user.service';
import { HomeComponent } from './home/home.component';
import { HomeService } from'./services/home.service';


@NgModule({
  declarations: [
    AppComponent,
    CampaignListComponent,
    CampaignDetailsComponent,
    EventListComponent,
    EventDetailsComponent,
    UserListComponent,
    UserDetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CampaignService],
  bootstrap: [AppComponent]
})
export class AppModule { }
