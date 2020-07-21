import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { FeedPost, FeedPostComments } from "src/app/schemas/post.schema";
import { elementEventFullName } from "@angular/compiler/src/view_compiler/view_compiler";

@Injectable({
  providedIn: "root",
})
export class DbUtilsService {
  constructor(private db: AngularFirestore) {}

}
