import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class CampaignService {
  BASE_URL: string = 'http://localhost:3000';
  constructor(private http: Http) {}

  newCampaign(campaignTitle, campaignSummary, campaignGoal) {

      return this.http
        .post(
          environment.apiBase + '/api/campaign/create',

          // Form body information to send to the back end (req.body)
          {
            title: campaignTitle,
            summary: campaignSummary,
            goal: campaignGoal,

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



  editOneCampaign(id, componentInfo){
    return this.http.put(`${this.BASE_URL}/api/campaign/findOne/${id}`,
      {
        title: componentInfo.title,
        summary: componentInfo.summary,
        goal: componentInfo.goal
      },
      { withCredentials: true })
      .toPromise()
      .then( res => res.json())
}

//   editClient(id, componentInfo){
// return this.http
// .put(
//   `${environment.apiBase}/api/client/`+id,
//   {
//     clientFirstName: componentInfo.clientFirstName,
//     clientLastName: componentInfo.clientLastName,
//     clientUsername: componentInfo.clientUsername,
//     clientPrimaryPhone: componentInfo.clientPrimaryPhone,
//     clientStreet1: componentInfo.clientStreet1,
//     clientStreet2: componentInfo.clientStreet2,
//     clientCity: componentInfo.clientCity,
//     clientProvince: componentInfo.clientProvince,
//     clientZip: componentInfo.clientZip
//   },
//   // Send the cookies across domains
//   { withCredentials: true })
//   .map( res => res.json())
// }

  updateCampaign(campaignId, dataToSend) {
    console.log("dataToSend", dataToSend)
    return this.http.put(`${this.BASE_URL}/api/campaign/update/${campaignId}`, dataToSend)
      .toPromise()
      .then(apiResponse => apiResponse.json())

      // .map((res) => res.json());
  }

  deleteCampaign(id) {
    return this.http.delete(`${this.BASE_URL}/api/campaign/delete/${id}`)
      .map((res) => res.json());
  }
}
