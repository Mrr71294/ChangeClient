import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/Router';
import { CampaignService } from '../services/campaign.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent implements OnInit {

  currentCampaign: any = {};
  currentUser: any = {};

  constructor(
    private campaignThang: CampaignService,
    private userThang: UserService,
    private routerThang: Router,
    private route: ActivatedRoute
  ) { }

    ngOnInit() {
      // this.route.params.subscribe((params) => {
      //   this.showCampaign(params['id']);
      // });

  } // close ngOnInit()

  showCampaign(id) {
    // if(this.route.params._value.id === undefined){
    this.campaignThang.findOneCampaign(id)
      .subscribe((campaignFromApi) => {
          this.currentCampaign = campaignFromApi
          })


    this.userThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi
          })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
}
}
