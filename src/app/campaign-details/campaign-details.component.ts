import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from '../services/campaign.service';
import { UserService } from '../services/user.service';
import 'rxjs/add/operator/toPromise';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css'],
})
export class CampaignDetailsComponent implements OnInit {
  campaign: any = {};
  // CurrentCampaigntId: string;
  updatedCampaign: Object = {};
  errorMessage: string = '';
  isShowingForm: boolean = false;

  public title: String;
  public goal: String;
  public summary: String;


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

  showCampaignForm() {
    this.isShowingForm = true;
  } // close showCampaignForm()


editCampaign(campaignId, formData){
  console.log("campaignId", campaignId)
  console.log('whats this', formData.form.controls.formTitle.value)
  this.title = formData.form.controls.formTitle.value;
  this.goal = formData.form.controls.formGoal.value;
  this.summary = formData.form.controls.formSummary.value;
  this.sendUpdatedData(campaignId);

  // this.CampaignService.editOneCampaign(this.CurrentCampaigntId, this.campaign)
  // .toPromise()
  // .then((resultFromApi) => {
  //   this.campaign = resultFromApi;
  //   // clear error message
  //   this.errorMessage = "";
  //   // this.router.navigate(['/app/client/edit']);
  // })
  // .catch((err) => {
  //   const parsedError = err.json();
  //   this.errorMessage = parsedError.message + '';
  // });
}
sendUpdatedData(campaignId){
  this.updatedCampaign = {
    title: this.title,
    goal: this.goal,
    summary: this.summary
  }
  console.log('updatedCampaign', this.updatedCampaign)
  this.CampaignService.updateCampaign(campaignId, this.updatedCampaign)
  .then(() => {
    this.router.navigate([`campaign/${campaignId}`])
  } )
  .catch(() => {} )
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
