export interface UserStatus {
  status: boolean;
  uid: string;
  message?: string;
}

export interface UserDetails {
  category?: Array<String>;
  emailId: string;
  name: string;
  profilePic?: string | null;
  userId?: String;
  password?: string;
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

export interface Category {
  isSelected: boolean;
  image: string;
  name: string;
}

export interface LogoutStatus {
  status: boolean;
  message: string;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export interface ChangePasswordStatus {
  status: boolean;
  message?: string;
}
