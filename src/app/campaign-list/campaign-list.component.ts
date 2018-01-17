import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CampaignService} from '../services/campaign.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
})
export class CampaignListComponent implements OnInit {
campaigns: any[] = [];
currentUser: any = {};

  constructor(
    private campaign: CampaignService,
    private userThang: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.campaign.findAllCampaigns()
    .subscribe((campaigns) => {
      this.campaigns = campaigns;
    });

    this.userThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
      })
      .catch(() => {
          this.router.navigate(['/']);
      });
  }

  logMeOutPls() {
    this.userThang.logout()
      .then(() => {
          this.router.navigate(['/home']);
      })
  } // close logMeOutPls()

}
