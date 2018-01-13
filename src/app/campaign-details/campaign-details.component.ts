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
  phone: any;

  constructor(
    private route: ActivatedRoute,
    private CampaignService: CampaignService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCampaignDetails(params['id']);
    });
  }

  getCampaignDetails(id) {
    this.CampaignService.findOneCampaign(id)
      .subscribe((phone) => {
        this.phone = phone;
      });
  }
  deletePhone(){
    if (window.confirm('Are you sure?')){
      this.CampaignService.deleteCampaign(this.phone._id)
      .subscribe(() => {
        this.router.navigate(['/user']);
      });
    }
  }
}
