import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserStatus, UserDetails } from "src/app/schemas/users.schema";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthUtilsService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  // to check if any user logged in
  async getCurrentUser(): Promise<UserStatus> {
    return new Promise(async (resolve, reject) => {
      let user;
      this.auth.onAuthStateChanged(function (currentUser) {
        if (currentUser) {
          user = currentUser;
          resolve(
            user.uid
              ? { status: true, uid: user.uid }
              : { status: false, uid: user.uid }
          );
        } else {
          // No user is signed in.
          reject({ status: true, uid: null });
        }
      });
    });
  }

  // login an user
  async loginUser(email: string, password: string): Promise<UserStatus> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.auth.signInWithEmailAndPassword(
          email,
          password
        );

        resolve({
          uid: user.user.uid,
          status: true,
          message: "User Logged in Sucessfully",
        });
      } catch (e) {
        reject({
          uid: null,
          status: false,
          message: e.message,
        });
      }
    });
  }

  // get user category
  async getUserCategory(uid: string): Promise<Array<String>> {
    return new Promise(async (resolve, reject) => {
      try {
        // user Node Ref
        const userRef = this.db.collection("users").doc(uid).ref;

        // get user data
        const data = await userRef.get();

        // extract category from the object
        const userCategory = data.data().category;

        resolve(userCategory);
      } catch (e) {
        reject(e.message);
      }
    });
  }

  // get user details by uid
  async getUserDetails(uid: string): Promise<UserDetails> {
    return new Promise(async (resolve, reject) => {
      try {
        const userRef = this.db.collection("users").doc(uid).ref;
        const userData = (await userRef.get()).data();
        resolve(<UserDetails>userData);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  // set preferred category for current user
  async setCurrentUserCategory(newCategory: Array<String>): Promise<Object> {
    return new Promise(async (resolve, reject) => {
      try {
        // get the current user
        const currentUser: UserStatus = await this.getCurrentUser();

        if (currentUser.status) {
          // update the category
          await this.db
            .collection("users")
            .doc(currentUser.uid)
            .update({ category: newCategory });

          resolve({
            status: true,
            category: newCategory,
            message: "Category updated successfully",
          });
        } else {
          resolve({
            status: false,
            category: null,
            message: "User not signed in",
          });
        }
      } catch (e) {
        console.log(e);
        resolve({
          status: false,
          category: null,
          message: "Category update failed",
        });
      }
    });
  }
}
