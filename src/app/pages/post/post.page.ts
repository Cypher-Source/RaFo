import { Component, OnInit } from "@angular/core";
import {
  ModalController,
  ActionSheetController,
  ToastController,
} from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Crop, CropOptions } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";
import { PhotoPage } from "../photo/photo.page";
import { Post } from "src/app/schemas/post.schema";
import { DbUtilsService } from "src/app/services/DbUtils/db-utils.service";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  // post details
  postDetails: Post;

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50,
  };

  textAreaRows: number = 18;

  customAlertOptions: any = {
    cssClass: "my-alert",
    header: "Category",
    // translucent: true
  };
  constructor(
    private modalController: ModalController,
    private camera: Camera,
    private crop: Crop,
    public actionSheetController: ActionSheetController,
    private file: File,
    private dbUtils: DbUtilsService,
    private toastController: ToastController
  ) {}
  ngOnInit() {
    // initialising the post details
    this.postDetails = {
      category: [""],
      text: "",
      image: null,
    };
  }

  // dismiss the modal view
  closeModal() {
    this.modalController.dismiss();
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
        this.presentPhotoModal(base64);
      },
      (error) => {
        alert("Error in showing image" + error);
      }
    );
  }

  // present and handle the photo modal
  async presentPhotoModal(base64: string) {
    const modal = await this.modalController.create({
      component: PhotoPage,
      componentProps: {
        image: base64,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data.status) {
      this.postDetails.image = data.image;
    }
  }

  // post the content
  async postTheContent() {
    if (this.postDetails.category[0] !== "" || this.postDetails.text !== "") {
      try {
        const result = await this.dbUtils.postAContent(this.postDetails);
        if (result.status) {
          this.presentToast("Post updated!");
          this.modalController.dismiss();
        } else {
          this.presentToast("User not logged in");
        }
      } catch (error) {
        this.presentToast(
          "Some error has been occured, please check your internet connection"
        );
      }
    } else {
      this.presentToast("Oops! Post content or category may be empty!");
    }
  }

  // show toast message
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
    });
    toast.present();
  }
}
