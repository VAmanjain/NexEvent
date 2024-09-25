export interface socialMediaDto {
  insta: string | null;
  twitter: string | null;
  linkedIn: string | null;
}

export interface UserProfileInfo1 {
  id: number;
  username: string | null;
  image: string;
  bio: string;
  phoneNo: number;
  socialMedia: socialMediaDto | null;
}
