import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FeedPost, FeedPostComments } from "src/app/schemas/post.schema";
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";

@Injectable({
  providedIn: "root",
})
export class DbUtilsService {
  constructor(private db: AngularFirestore) {}
  
  // get post comments data
  readCommentData(postId: string): Promise<Array<FeedPostComments> | null> {
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
        commentsData.forEach((element) => {
          let responseData = element.data();
          responseData["id"] = Number(element.id);
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
          responseData["id"] = Number(resp.id);
          feedPostArray.push(<FeedPost>responseData);
        });

        resolve(feedPostArray);
      } catch (e) {
        reject(null);
      }
    });
  }
}
