// Schema for Posts on Feed
export interface FeedPost {
  id: string;
  category: Array<String>;
  date: String;
  image: String;
  postedBy: String;
  text: String;
  likes: Array<String>;
  liked: boolean;
}

export interface FeedPostComments {
  id: string;
  commentedBy: String;
  userDetails: {
    name: string;
    profilePic: string;
  };
  date: String;
  text: String;
}

export interface LikeResponse {
  status: boolean;
  message: string;
}

export interface CommentResponse {
  status: boolean;
  message: string;
  comment?: string;
}
