import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Instagram, Twitter, Linkedin, SquareArrowOutUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { getUserProfile, updateUserProfile } from "../services/api/UserProfile";
import { getToken, getUser } from "../services/api/auth/AuthService";
import { setAuthToken } from "../services/api/axiosInstance";
import { UserProfileInfo1 } from "../services/interfaces/UserProfileInfo.type";


const Setting: React.FC = () => {
  const { id } = useParams();
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [username, setUsername] = useState<string | null>(null);
  const [bio, setBio] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<number | null>(null);
  const [insta, setInsta] = useState<string | null>(null);
  const [twitter, setTwitter] = useState<string | null>(null);
  const [linkedIn, setLinkedIn] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);

        const user = await getUser();
        const data = await getUserProfile(id);
        setUsername(data.username);
        setBio(data.bio);
        setPhoneNo(data.phoneNo);
        setInsta(data.socialMedia?.insta || "");
        setTwitter(data.socialMedia?.twitter || "");
        setLinkedIn(data.socialMedia?.linkedIn || "");
        setProfileImage(data.image || "/placeholder.svg");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setProfileImage(reader.result as string);
        await uploadImageToCloudinary(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Upload successful! Image URL:", result.secure_url);
      setProfileImage(result.secure_url)
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    const userProfileData: UserProfileInfo1 = {
      id: Number(id),
      username: username || "",
      image: profileImage,
      bio,
      phoneNo: phoneNo || 0,
      socialMedia: {
        insta,
        twitter,
        linkedIn,
      },
    };

    console.log("UserProfile:", userProfileData);
    try {
      const updatedProfile = await updateUserProfile(id!, userProfileData);
      console.log("Profile updated successfully:", updatedProfile);
      navigator(`/setting/${id}`, {replace:true});
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 space-y-8 text-foreground">
      <div>
        <h1 className="text-3xl font-bold text-white">Your Profile</h1>
        <p className="text-muted-foreground text-white">
          Choose how you are displayed as a host or guest.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Your name"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="text-white"
            />
          </div>
          <div className="flex flex-col items-center">
            <Label className="text-white">Profile Picture</Label> <br />
            <Avatar className="w-24 h-24 cursor-pointer relative object-cover">
              <AvatarImage
                src={profileImage}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback>
                Image <SquareArrowOutUpRight />
              </AvatarFallback>

              <Input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-white"
                onChange={handleImageChange}
                accept="image/*"
              />
            </Avatar>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white" htmlFor="phone">
            Phone Number
          </Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground">
              +91
            </span>
            <Input
              type="tel"
              id="phone"
              className="rounded-l-none text-white"
              placeholder="Your number"
              value={phoneNo || ""}
              onChange={(e) => setPhoneNo(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white" htmlFor="bio">
            Bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Share a little about your background and interests."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="min-h-[100px] text-white"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-white">Social Links</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Instagram className="w-5 h-5 text-white" />
              <Input
                placeholder="instagram.com/username"
                value={insta || ""}
                onChange={(e) => setInsta(e.target.value)}
                className="text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Twitter className="w-5 h-5 text-white" />
              <Input
                placeholder="x.com/username"
                value={twitter || ""}
                onChange={(e) => setTwitter(e.target.value)}
                className="text-white"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Linkedin className="w-5 h-5 text-white" />
              <Input
                placeholder="linkedin.com/in/handle"
                value={linkedIn || ""}
                onChange={(e) => setLinkedIn(e.target.value)}
                className="text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleSaveChanges} className="w-full md:w-auto bg-white">
        <span className="text-black">Save Changes</span>
      </Button>
    </div>
  );
};

export default Setting;
