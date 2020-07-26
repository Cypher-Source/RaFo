import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SettingsPage } from "../settings/settings.page";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { DbUtilsService } from "src/app/services/DbUtils/db-utils.service";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { FeedPost } from "src/app/schemas/post.schema";
import * as moment from "moment";
import { FeedCommentsPage } from "src/app/modals/feed-comments/feed-comments.page";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {

  // feed post array
  feedPosts: Array<FeedPost>;

  constructor(
    private modalController: ModalController,
    private authUtils: AuthUtilsService,
    private dbUtils: DbUtilsService,
    private responseViews: ResponseViewService
  ) {
  }

  ngOnInit() {
    this.getUserFeed();
  }

  // fetch user feeds
  async getUserFeed(event?) {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();
    try {
      const currentUser = await this.authUtils.getCurrentUser();
      const currentUserCategory = await this.authUtils.getUserCategory(
        currentUser.uid
      );
      const feedPosts = await this.dbUtils.getUserFeed(currentUserCategory);

      this.feedPosts = feedPosts;
      try {
        event.target.complete();
      } catch (e) {}
      (await loading).dismiss();
    } catch (error) {
      (await loading).dismiss();
      try {
        event.target.complete();
      } catch (e) {}
      this.responseViews.presentToast(
        "Some error has occured! please try again"
      );
    }
  }

  // change the number format
  numberFormat(count) {
    if (count <= 999) {
      return count;
    } else if (count >= 1000 && count <= 999000) {
      return (count / 1000).toFixed() + "k";
    } else {
      return (count / 1000000).toFixed() + "M";
    }
  }

  // format date to text format
  formatDate(date) {
    const convertedDate = moment(date, "DD/MM/yyyy").format("DD MMM, yyyy");
    return convertedDate;
  }

  // open settings modal
  async openSettingModal() {
    const modal = await this.modalController.create({
      component: SettingsPage,
    });

    await modal.present();
  }

  // like action performed
  async updateLike(i: number) {
    this.feedPosts[i].liked = !this.feedPosts[i].liked;
    const uid = (await this.authUtils.getCurrentUser()).uid;
    try {
      this.feedPosts[i].likes = (
        await this.dbUtils.likeAPost(this.feedPosts[i])
      ).likes;
    } catch (error) {
      this.feedPosts[i].liked = !this.feedPosts[i].liked;
      this.responseViews.presentToast("Some error has occured!");
      console.log(error);
    }
  }

  // dislike action performed
  async updateDisLike(i: number) {
    this.feedPosts[i].liked = !this.feedPosts[i].liked;
    const uid = (await this.authUtils.getCurrentUser()).uid;
    try {
      this.feedPosts[i].likes = (
        await this.dbUtils.disLikeAPost(this.feedPosts[i])
      ).likes;
    } catch (error) {
      this.feedPosts[i].liked = !this.feedPosts[i].liked;
      this.responseViews.presentToast("Some error has occured!");
      console.log(error);
    }
  }

  // open the comments modal
  async openCommentsModal(id: string) {
    const modal = await this.modalController.create({
      component: FeedCommentsPage,
      componentProps: {
        postId: id,
      },
    });

    await modal.present();
  }
}
