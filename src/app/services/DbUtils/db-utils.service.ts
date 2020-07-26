import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  FeedPost,
  FeedPostComments,
  LikeResponse,
  CommentResponse,
  PostStatus,
  Post,
} from "src/app/schemas/post.schema";
import { AuthUtilsService } from "../AuthUtils/auth-utils.service";
import { UserStatus } from "src/app/schemas/users.schema";

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
        data.forEach(async (resp) => {
          let responseData = resp.data();
          responseData["id"] = resp.id;
          responseData["liked"] = responseData["likes"].includes(
            (await this.auth.getCurrentUser()).uid
          );
          const userDetails = await this.auth.getUserDetails(
            responseData["postedBy"]
          );

          responseData["userDetails"] = {
            name: userDetails["name"],
            profilePic: userDetails["profilePic"],
          };

          responseData["comments"] = await this.getCommentData(
            responseData["id"]
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
  async likeAPost(post: FeedPost): Promise<LikeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uid = (await this.auth.getCurrentUser()).uid;

        if (!post.likes.includes(uid)) {
          post.likes.push(uid);

          await this.db
            .collection("posts")
            .doc(post.id)
            .update({ likes: post.likes });

          resolve({
            status: true,
            message: "Post liked successfully",
            likes: post.likes,
          });
        } else {
          reject({
            status: false,
            message: "Post already liked by the user",
          });
        }
      } catch (e) {
        console.log(e);
        reject({
          status: false,
          message: "Some error has occured, please try again!",
        });
      }
    });
  }

  // dislike a post
  async disLikeAPost(post: FeedPost): Promise<LikeResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uid = (await this.auth.getCurrentUser()).uid;
        if (post.likes.includes(uid)) {
          let likes = post.likes;

          likes = likes.filter(function (item) {
            return item !== uid;
          });

          await this.db
            .collection("posts")
            .doc(post.id)
            .update({ likes: likes });

          resolve({
            status: true,
            message: "Post disliked successfully",
            likes: likes,
          });
        } else {
          reject({
            status: false,
            message: "Post is not liked by the user",
          });
        }
      } catch (e) {
        console.log(e);
        reject({
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
        const uid = (await this.auth.getCurrentUser()).uid;
        await this.db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .doc(this.getTime())
          .set({
            commentedBy: uid,
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

  // get user posts
  async getUserPosts(uid: string): Promise<Array<FeedPost>> {
    return new Promise(async (resolve, reject) => {
      try {
        let feedPostArray: Array<FeedPost> = [];

        // read data from db
        const postRef = this.db.collection("posts").ref;
        const data = await postRef.where("postedBy", "==", uid).get();

        // structure the data in the form of FeedPost Schema
        data.forEach(async (resp) => {
          let responseData = resp.data();
          responseData["id"] = resp.id;
          responseData["liked"] = responseData["likes"].includes(uid);

          const userDetails = await this.auth.getUserDetails(
            responseData["postedBy"]
          );

          responseData["userDetails"] = {
            name: userDetails["name"],
            profilePic: userDetails["profilePic"],
          };

          responseData["comments"] = await this.getCommentData(
            responseData["id"]
          );

          feedPostArray.push(<FeedPost>responseData);
        });

        resolve(feedPostArray);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  // post a content
  async postAContent(post: Post): Promise<PostStatus> {
    return new Promise(async (resolve, reject) => {
      try {
        const currentUser: UserStatus = await this.auth.getCurrentUser();

        if (currentUser.status) {
          post["postedBy"] = currentUser.uid;
          post["date"] = this.getDate();
          post["likes"] = [];

          await this.db.collection("posts").doc(this.getTime()).set(post);

          resolve({
            status: true,
            post: post,
            message: "Post updated successfully",
          });
        } else {
          resolve({
            status: false,
            post: null,
            message: "User not logged in",
          });
        }
      } catch (e) {
        console.log(e);
        reject({
          status: false,
          post: null,
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

  // get the current time snapshot
  private getTime = (): string => {
    let d = new Date();
    let n = d.getTime();

    return String(n);
  };
}
