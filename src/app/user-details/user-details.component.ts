import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FileUploader } from 'ng2-file-upload';

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

  campaignName: string;
  campaignColor: string = "#ffffff";
  campaignHumps: number;

  saveError: string;

  // myCoolUploader = new FileUploader({
  //   url: environment.apiBase + '/api/campaigns',
  //   itemAlias: 'campaignPicture'
  // });

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
          this.getThemCamels();
      })
      .catch(() => {
          this.routerThang.navigate(['/']);
      });
  } // close ngOnInit()

  logMeOutPls() {
    this.userThang.logout()
      .then(() => {
          this.routerThang.navigate(['/']);
      })
      .catch(() => {
          this.logoutError = 'Log out went to 💩';
      });
  } // close logMeOutPls()

  getThemCamels() {
    this.campaignThang.allCamels()
      .subscribe(
        (allTheCamels) => {
            this.campaignArray = allTheCamels;
        },
        () => {
            this.campaignListError = 'Sorry everybody. No campaigns today. 😱';
        }
      );
  } // close getThemCamels()

  showCamelForm() {
    this.isShowingForm = true;
  } // close showCamelForm()

  saveNewCamel() {
    // if no picture, regular AJAX upload
    if (this.myCoolUploader.getNotUploadedItems().length === 0) {
      this.saveCamelNoPicture();
    }

    // else, upload pictures with uploader
    else {
      this.saveCamelWithPicture();
    }
  } // close saveNewCamel()

  private saveCamelNoPicture() {
    this.campaignThang.newCamel(this.campaignName, this.campaignColor, this.campaignHumps)
      .subscribe(
        (newCamelFromApi) => {
            this.campaignArray.push(newCamelFromApi);
            this.isShowingForm = false;
            this.campaignName = "";
            this.campaignColor = "#ffffff";
            this.campaignHumps = undefined;
            this.saveError = "";
        },
        (err) => {
            this.saveError = 'Don\t be a dumb 🐫';
        }
      );
  } // close saveCamelNoPicture

  private saveCamelWithPicture() {
    this.myCoolUploader.onBuildItemForm = (item, form) => {
        form.append('campaignName', this.campaignName);
        form.append('campaignColor', this.campaignColor);
        form.append('campaignHumps', this.campaignHumps);
    };

    this.myCoolUploader.onSuccessItem = (item, response) => {
        console.log(item);
        const newCamelFromApi = JSON.parse(response);
        this.campaignArray.push(newCamelFromApi);
        this.isShowingForm = false;
        this.campaignName = "";
        this.campaignColor = "#ffffff";
        this.campaignHumps = undefined;
        this.saveError = "";
    };

    this.myCoolUploader.onErrorItem = (item, response) => {
        console.log(item, response);
        this.saveError = 'Don\t be a dumb 🐫';
    };

    // this is the function that initiates the AJAX request
    this.myCoolUploader.uploadAll();
  } // close saveCamelWithPicture
}
