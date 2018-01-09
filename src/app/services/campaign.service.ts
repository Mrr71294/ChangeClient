import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CampaignService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

  findAllCampaigns() {
    return this.http.get(`${this.BASE_URL}/api/campaign/findAll`)
      .map((res) => res.json());
  }

  findOneCampaign(id) {
    return this.http.get(`${this.BASE_URL}/api/campaign/findOne/${id}`)
      .map((res) => res.json());
  }

  updateCampaign(campaign) {
    return this.http.put(`${this.BASE_URL}/api/campaign/update/${campaign.id}`, campaign)
      .map((res) => res.json());
  }

  deleteCampaign(id) {
    return this.http.delete(`${this.BASE_URL}/api/campaign/delete/${id}`)
      .map((res) => res.json());
  }
}
