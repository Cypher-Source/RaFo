import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  FeedPost,
  FeedPostComments,
  LikeResponse,
  CommentResponse,
} from "src/app/schemas/post.schema";
import { AuthUtilsService } from "../AuthUtils/auth-utils.service";

@Injectable({
  providedIn: "root",
})
export class DbUtilsService {
  constructor(private db: AngularFirestore, private auth: AuthUtilsService) {}

  // get post comments data
  async getCommentData(
    postId: string
  ): Promise<Array<FeedPostComments> | null> {
    // returns a promise
    return new Promise(async (resolve, reject) => {
      try {
        let commentArray: Array<FeedPostComments> = [];

        // read data from db
        const commentsRef = this.db
          .collection("posts")
          .doc(postId)
          .collection("comments").ref;
        const commentsData = await commentsRef.get();

        // structure the data in the form of FeedPost Schema
        commentsData.forEach(async (element) => {
          let responseData = element.data();
          responseData["id"] = element.id;

          // read user data
          const userDetails = await this.auth.getUserDetails(
            responseData["commentedBy"]
          );

          responseData["userDetails"] = {
            name: userDetails["name"],
            profilePic: userDetails["profilePic"],
          };

          commentArray.push(<FeedPostComments>responseData);
        });

        resolve(commentArray);
      } catch (e) {
        reject(null);
      }
    });
  }

  // get user feed data
  async getUserFeed(
    userCategory: Array<String>
  ): Promise<Array<FeedPost> | null> {
    // returns a promise
    return new Promise(async (resolve, reject) => {
      try {
        let feedPostArray: Array<FeedPost> = [];

        // read data from db
        const postRef = this.db.collection("posts").ref;
        const data = await postRef
          .where("category", "array-contains-any", userCategory)
          .get();

        // structure the data in the form of FeedPost Schema
        data.forEach((resp) => {
          let responseData = resp.data();
          responseData["id"] = resp.id;
          responseData["liked"] = responseData["likes"].includes(
            "navayuvan_sb"
          );
          feedPostArray.push(<FeedPost>responseData);
        });

        resolve(feedPostArray);
      } catch (e) {
        console.log(e);

        reject(null);
      }
    });
  }

  // like a post
  async likeAPost(post: FeedPost, uid: string): Promise<LikeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!post.likes.includes(uid)) {
          post.likes.push(uid);

          await this.db
            .collection("posts")
            .doc(post.id)
            .update({ comments: post.likes });

          resolve({
            status: true,
            message: "Post liked successfully",
          });
        } else {
          resolve({
            status: false,
            message: "Post already liked by the user",
          });
        }
      } catch (e) {
        console.log(e);
        resolve({
          status: false,
          message: "Some error has occured, please try again!",
        });
      }
    });
  }

  // dislike a post
  async disLikeAPost(post: FeedPost, uid: string): Promise<LikeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        if (post.likes.includes(uid)) {
          let likes = post.likes;

          likes = likes.filter(function (item) {
            return item !== uid;
          });

          await this.db
            .collection("posts")
            .doc(post.id)
            .update({ comments: likes });

          resolve({
            status: true,
            message: "Post disliked successfully",
          });
        } else {
          resolve({
            status: false,
            message: "Post is not liked by the user",
          });
        }
      } catch (e) {
        console.log(e);
        resolve({
          status: false,
          message: "Some error has occured, please try again!",
        });
      }
    });
  }

  // comment in a post
  async commentInAPost(
    postId: string,
    comment: string
  ): Promise<CommentResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let d = new Date();
        let n = d.getTime();

        await this.db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .doc(String(n))
          .set({
            commentedBy: (await this.auth.getCurrentUser()).uid,
            date: this.getDate(),
            text: comment,
          });

        resolve({
          status: true,
          message: "Comment updated Successfully",
          comment: comment,
        });
      } catch (e) {
        resolve({
          status: false,
          message: e.message,
        });
      }
    });
  }

  // get current date in dd/mm/yyyy format
  private getDate = (): String => {
    let d = new Date();
    let n = d.getTime();
    let today: String;

    let dd = String(d.getDate()).padStart(2, "0");
    let mm = String(d.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = d.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;

    return today;
  };
}
