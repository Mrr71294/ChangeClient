import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/Router';
import {CampaignService} from '../services/campaign.service';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css'],
  providers: [CampaignService]
})
export class CampaignListComponent implements OnInit {
campaigns;
  constructor(private campaign: CampaignService) { }

  ngOnInit() {
    this.campaign.findAllCampaigns()
    .subscribe((campaigns) => {
      this.campaigns = campaigns;
    });
  }
}
