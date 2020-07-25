import { Component, OnInit } from "@angular/core";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { UserDetails } from "src/app/schemas/users.schema";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { CategoryPage } from "../category/category.page";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Crop, CropOptions } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page implements OnInit {
  profileNameEditStatus: boolean = false;

  // get user details
  userDetails: UserDetails = {
    name: "",
    category: [""],
    emailId: "",
    userId: "",
    profilePic: null,
  };

  // image picker options
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  constructor(
    private responseView: ResponseViewService,
    private authUtils: AuthUtilsService,
    private modalController: ModalController,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File
  ) {}

  ngOnInit() {
    // update user details
    this.updateUserDetails();
  }

  // open category modal page
  async openCategoryModal() {
    const modal = await this.modalController.create({
      component: CategoryPage,
      componentProps: {
        category: this.userDetails.category,
        fromPage: "profile",
      },
    });

    await modal.present();

    const data = await modal.onWillDismiss();

    this.updateUserDetails();
  }

  // update user details
  async updateUserDetails() {
    const loading = this.responseView.getLoadingScreen();
    (await loading).present();
    try {
      const currentUser = await this.authUtils.getCurrentUser();
      if (currentUser.status) {
        this.userDetails = await this.authUtils.getUserDetails(currentUser.uid);
        (await loading).dismiss();
      } else {
        this.responseView.presentToast("User not logged in");
        (await loading).dismiss();
      }
    } catch (e) {
      (await loading).dismiss();
      this.responseView.presentToast(
        "Some error has occured, please check your internet connection"
      );
    }
  }

  // profile name edit
  async editActionPerformed() {
    this.profileNameEditStatus = !this.profileNameEditStatus;
    const loading = this.responseView.getLoadingScreen();
    if (!this.profileNameEditStatus) {
      (await loading).present();
      try {
        const result = await this.authUtils.setUserName(this.userDetails.name);
        if (result.status) {
          (await loading).dismiss();
          this.responseView.presentToast("Profile name updated!");
        } else {
          (await loading).dismiss();
          this.responseView.presentToast("User not logged in");
        }
      } catch (error) {
        (await loading).dismiss();
        this.responseView.presentToast(
          "Some error has occured! Check your internet connection"
        );
      }
    }
  }

  async updateProfilePicture() {
    const loading = this.responseView.getLoadingScreen();
    (await loading).present();
    try {
      const result = await this.authUtils.setProfilePicture(
        this.userDetails.profilePic
      );

      if (result.status) {
        (await loading).dismiss();
        this.responseView.presentToast("Profile picture updated!");
      } else {
        (await loading).dismiss();
        this.responseView.presentToast("User not logged in");
      }
    } catch (error) {
      (await loading).dismiss();
      this.responseView.presentToast(
        "Some error has occured, please check your internet connection"
      );
    }
  }

  // pick an image either using camera or gallery
  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        // let base64Image = 'data:image/jpeg;base64,' + imageData;
        this.cropImage(imageData);
      },
      (err) => {
        // Handle error
      }
    );
  }

  // display the image selection action sheet
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: "Use Camera",
          handler: () => {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: "Cancel",
          role: "cancel",
        },
      ],
    });
    await actionSheet.present();
  }

  // crop an image
  cropImage(fileUrl) {
    const cropOptions: CropOptions = {
      quality: 50,
    };

    this.crop.crop(fileUrl, cropOptions).then(
      (newPath) => {
        this.showCroppedImage(newPath.split("?")[0]);
      },
      (error) => {
        alert("Error cropping image" + error);
      }
    );
  }

  // display or update the cropped image
  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split("/");
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(
      (base64) => {
        console.log(base64);
        this.userDetails.profilePic = base64;
        this.updateProfilePicture();
      },
      (error) => {
        alert("Error in showing image" + error);
      }
    );
  }
}
