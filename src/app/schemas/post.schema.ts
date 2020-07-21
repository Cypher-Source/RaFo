// Schema for Posts on Feed
export interface FeedPost {
  id: number;
  category: Array<String>;
  date: String;
  image: String;
  postedBy: String;
  text: String;
}

export interface FeedPostComments {
  id: number;
  commentedBy: String;
  date: String;
  text: String;
}
