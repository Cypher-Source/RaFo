export interface UserStatus {
  status: boolean;
  uid: string;
  message?: string;
}

export interface UserDetails {
  category: Array<String>;
  emailId: String;
  name: String;
  profilePic: String | null;
  userId: String;
}

export interface UserCategoryStatus {
  status: boolean;
  category: Array<String>;
  message?: string;
}

export interface UserNameStatus {
  status: boolean;
  userName: string;
  message?: string;
}

export interface ProfilePictureStatus {
  status: boolean;
  profilePic: string;
  message?: string;
}
