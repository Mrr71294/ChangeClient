import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { CampaignService } from '../services/campaign.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser: any = {};

  logoutError: string;

  campaignArray: any[] = [];
  campaignListError: string;

  isShowingForm: boolean = false;

  campaignTitle: string;
  campaignSummary: string;
  campaignGoal: string;

  myCoolUploader = new FileUploader({
    url: environment.apiBase + '/api/user/_:id',
    itemAlias: 'campaignPicture'
  });

  saveError: string;


  baseUrl = environment.apiBase;

  constructor(
    private userThang: UserService,
    private campaignThang: CampaignService,
    private routerThang: Router
  ) { }

  ngOnInit() {
    this.userThang.checklogin()
      .then((userFromApi) => {
          this.currentUser = userFromApi;
          // this.getThems();
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
  } // close ngOnInit()

  logMeOutPls() {
    this.userThang.logout()
      .then(() => {
          this.routerThang.navigate(['/home']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
      });
  } // close logMeOutPls()

  getCampaigns() {
    this.campaignThang.findAllCampaigns()
      .subscribe(
        (allTheCampaigns) => {
            this.campaignArray = allTheCampaigns;
        },
        () => {
            this.campaignListError = 'Sorry everybody. No campaigns today. 😱';
        }
      );
  } // close getCampaigns()

  showCampaignForm() {
    this.isShowingForm = true;
  } // close showCampaignForm()

  saveNewCampaign() {
    // if no picture, regular AJAX upload
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveCampaignNoPicture();
    }

    // else, upload pictures with uploader
    else {
      this.saveCampaignWithPicture();
    }
    this.routerThang.navigate(['/campaign']);
  } // close saveNew()

  private saveCampaignNoPicture() {
    this.campaignThang.newCampaign(this.campaignTitle, this.campaignSummary, this.campaignGoal)
      .then(
        (newCampaignFromApi) => {
            this.campaignArray.push(newCampaignFromApi);
            this.isShowingForm = false;
            this.campaignTitle = this.campaignTitle;
            this.campaignSummary = this.campaignSummary;
            this.campaignGoal = this.campaignGoal;
            this.saveError = "";
        },
        (err) => {
            this.saveError = 'Don\t be a dumb 🐫';
        }
      );
  } // close saveNoPicture

  private saveCampaignWithPicture() {
    this.myCoolUploader.onBuildItemForm = (item, form) => {
        form.append('campaignTitle', this.campaignTitle);
        form.append('campaignSummary', this.campaignSummary);
        form.append('campaignGoal', this.campaignGoal);
    };

    this.myCoolUploader.onSuccessItem = (item, response) => {
        console.log(item);
        const newCampaignFromApi = JSON.parse(response);
        this.campaignArray.push(newCampaignFromApi);
        this.isShowingForm = false;
        this.campaignTitle = this.campaignTitle;
        this.campaignSummary = this.campaignSummary;
        this.campaignGoal = this.campaignGoal;
        this.saveError = "";
    };

    this.myCoolUploader.onErrorItem = (item, response) => {
        console.log(item, response);
        this.saveError = 'Don\t be a dumb 🐫';
    };

    // this is the function that initiates the AJAX request
    this.myCoolUploader.uploadAll();
  } // close saveWithPicture
}
