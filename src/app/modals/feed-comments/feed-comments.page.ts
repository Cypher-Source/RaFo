import { Component, OnInit, Input } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { DbUtilsService } from "src/app/services/DbUtils/db-utils.service";
import { FeedPostComments } from "src/app/schemas/post.schema";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";

@Component({
  selector: "app-feed-comments",
  templateUrl: "./feed-comments.page.html",
  styleUrls: ["./feed-comments.page.scss"],
})
export class FeedCommentsPage implements OnInit {
  @Input() postId: string;

  // array of comments data
  commentsData: Array<FeedPostComments>;

  // new comment text
  newComment: string = "";

  constructor(
    private modalController: ModalController,
    private dbUtils: DbUtilsService,
    private responseViews: ResponseViewService
  ) {}

  ngOnInit() {
    this.loadComments();
  }

  // load comments
  async loadComments() {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();

    try {
      this.commentsData = await this.dbUtils.getCommentData(this.postId);
      (await loading).dismiss();
    } catch (error) {
      this.responseViews.presentToast(
        "Some error has occured, please try again"
      );
      (await loading).dismiss();
    }
  }

  async commentAPost() {
    try {
      const result = await this.dbUtils.commentInAPost(
        this.postId,
        this.newComment
      );
      this.newComment = "";
      this.loadComments();
    } catch (error) {
      this.responseViews.presentToast("Failed to update the comment!");
    }
  }

  // close modal
  closeModal() {
    this.modalController.dismiss();
  }
}
