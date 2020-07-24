import { Component, OnInit } from "@angular/core";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { Crop, CropOptions } from "@ionic-native/crop/ngx";
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  croppedImagepath = "";

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
    private file: File
  ) {}
  ngOnInit() {}

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
        this.croppedImagepath = base64;
      },
      (error) => {
        alert("Error in showing image" + error);
      }
    );
  }
}
