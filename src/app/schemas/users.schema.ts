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
