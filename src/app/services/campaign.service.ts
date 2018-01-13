import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class CampaignService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

  newCampaign(theFullName, theEmail, thePassword) {
      console.log(theFullName)

      return this.http
        .post(
          environment.apiBase + '/api/campaign/create',

          // Form body information to send to the back end (req.body)
          {
            title: theFullName,
            summary: theEmail,
            goal: thePassword,

          },

          // Send the cookies across domains
          { withCredentials: true }
        )


        // Convert from observable to promise
        .toPromise()

        // Parse the JSON
        .then(res => res.json());
      }

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
