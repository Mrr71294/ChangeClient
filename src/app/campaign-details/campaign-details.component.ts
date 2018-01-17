import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from '../services/campaign.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent implements OnInit {
  campaign: any = {}

  constructor(
    private route: ActivatedRoute,
    private CampaignService: CampaignService,
    private router: Router,
    private userThang: UserService,

  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCampaignDetails(params['id']);
    });
  }

  getCampaignDetails(id) {
    this.CampaignService.findOneCampaign(id)
      .subscribe((campaign) => {
        this.campaign = campaign;
      });
  }
  deleteCampaign(){
    if (window.confirm('Are you sure?')){
      this.CampaignService.deleteCampaign(this.campaign._id)
      .subscribe(() => {
        this.router.navigate(['/user']);
      });
    }
  }

  logMeOutPls() {
    this.userThang.logout()
      .then(() => {
          this.router.navigate(['/home']);
      })
  } // close logMeOutPls()

}
