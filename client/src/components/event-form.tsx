
import {
  CalendarIcon,
  ImageIcon,
  PencilIcon,
  Users as UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { EventsDto } from "../services/interfaces/EventInterface.type";
import { setAuthToken } from "../services/api/axiosInstance";
import store from "../redux/store";
import { getToken, getUser } from "../services/api/auth/AuthService";
import { createEvent } from "../services/api/EventService";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../redux/slices/authSlice";
import { getUserProfile } from "../services/api/UserProfile";

interface UserProfile {
  id: number;
  username: string;
}

export const EventForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userProfileData, setUserProfileData] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<EventsDto>({
    name: '',
    desc: '',
    image: '',
    hostName: 'Aman',
    type: 'public',
    status: 'coming',
    approval: false,
    limit: 10,
    cal_name: 'Personal calendar',
    startingTime: '',
    endingTime: '',
    addressLink: '',
    userProfileId: 1,
    calendarId: 1,
    hosts: [],
    guestIds: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await store.dispatch(getToken);
        setAuthToken(token);
        checkAuth();
        const user = await getUser();
        const profile = await getUserProfile(user?.id);
        setUserProfileData(profile);
        setFormData(prev => ({ ...prev, userProfileId: profile?.id }));
        const now = new Date();
        const startDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const startTime = now.toTimeString().split(' ')[0].slice(0, 5); // HH:MM
        const endDate = startDate; // Same as start date
        const endTime = new Date(now.getTime() + 60 * 60000).toTimeString().split(' ')[0].slice(0, 5); // HH:MM + 1 hour

        // Update formData with starting and ending times
        setFormData(prev => ({
          ...prev,
          startingTime: `${startDate}T${startTime}:00`,
          endingTime: `${endDate}T${endTime}:00`
        }));
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    const intervalId = setInterval(fetchUserData, 60000); // Fetch every minute

    return () => clearInterval(intervalId);
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        setImagePreview(reader.result as string);
        setFormData(prev => ({ ...prev, image: reader.result as string }));
        await uploadImageToCloudinary(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setFormData(prev => ({ ...prev, image: result.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateTimeChange = (dateType: "startingTime" | "endingTime", value: string) => {
    const [date, time] = value.split("T");
    const formattedDateTime = `${date}T${time}`;
    setFormData(prev => ({ ...prev, [dateType]: formattedDateTime }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, approval: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: EventsDto = await createEvent(formData);
      if (response) {
        navigate(`/event/${response.id}`, { replace: true });
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 p-6 mx-auto max-w-[1000px] text-white">
      <div className="w-full md:w-2/5 space-y-6">
        <div className="relative">
          <div className="aspect-[3/3] rounded-lg overflow-hidden border-white border-solid border">
            {imagePreview ? (
              <img src={imagePreview} alt="Event preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <label htmlFor="image-upload" className="absolute bottom-2 left-2 bg-white rounded-full p-2 cursor-pointer">
            <PencilIcon className="w-4 h-4 text-black" />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        {loading && <p>Uploading...</p>}
      </div>
      <div className="w-full md:w-2/3 space-y-6">
        <Input
          name="name"
          placeholder="Event Name"
          onChange={handleChange}
          className="h-12 focus-visible:border-none focus-visible:ring-0 text-4xl font-bold bg-transparent border-none focus:ring-0 placeholder-white"
        />
        <div className="grid gap-2 md:w-3/5 bg-white/10 rounded-[12px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-[6px] md:p-2">
          <div className="flex items-center justify-between font-medium">
            <Label htmlFor="start-date" className="text-sm md:text-xl">
              Start
            </Label>
            <div className="flex gap-[0.5px]">
              <Input
                type="date"
                name="startDate"
                id="start-date"
                onChange={(e) =>
                  handleDateTimeChange(
                    "startingTime",
                    `${e.target.value}T${formData.startingTime.split("T")[1] || "00:00"}`
                   )
                }
                value={formData.startingTime.split('T')[0]} // YYYY-MM-DD
  
                // readOnly
                className="cursor-pointer bg-white/10 rounded-l-[8px] rounded-r-none shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2"
              />
              <Input
                type="time"
                name="startTime"
                onChange={(e) =>
                  handleDateTimeChange(
                    "startingTime",
                    `${formData.startingTime.split("T")[0] || "2024-01-01"}T${e.target.value}`
                  )
                }
                value={formData.startingTime.split('T')[1]} 
                className="cursor-pointer bg-white/10 rounded-r-[8px] rounded-l-none shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2"
              />
            </div>
          </div>
          <div className="flex items-center justify-between font-medium">
            <Label htmlFor="end-date" className="text-sm md:text-xl">
              End
            </Label>
            <div className="flex gap-[0.5px]">
              <Input
                type="date"
                name="endDate"
                id="end-date"
                onChange={(e) =>
                  handleDateTimeChange(
                    "endingTime",
                    `${e.target.value}T${formData.endingTime.split("T")[1] || "00:00"}`
                  )
                }
                value={formData.endingTime.split('T')[0]} 
                className="cursor-pointer bg-white/10 rounded-l-[8px] rounded-r-none shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2"
              />
              <Input
                type="time"
                name="endTime"
                onChange={(e) =>
                  handleDateTimeChange(
                    "endingTime",
                    `${formData.endingTime.split("T")[0] || "2024-01-01"}T${e.target.value}`
                  )
                }
                value={formData.endingTime.split('T')[1]} 
                className="cursor-pointer bg-white/10 rounded-r-[8px] rounded-l-none shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2"
              />
            </div>
          </div>
        </div>
        <div>
          <Label htmlFor="location" className="mb-1">
            Add Event Location
          </Label>
          <Input
            name="addressLink"
            id="location"
            placeholder="🌐 Offline location link or virtual link"
            onChange={handleChange}
            className="cursor-pointer bg-white/10 rounded-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0"
          />
        </div>
        <Textarea
          name="desc"
          placeholder="📃 Event description"
          onChange={handleChange}
          className="cursor-pointer bg-white/10 rounded-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0"
        />
        <div className="space-y-[0.7px]">
          <h3 className="font-semibold mb-1">Event Options</h3>
          <div className="flex justify-between items-center cursor-pointer bg-white/10 rounded-t-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              <span>Require Approval</span>
            </div>
            <Switch
              checked={formData.approval}
              onCheckedChange={handleSwitchChange}
              id="approval"
            />
          </div>
          <div className="flex justify-between items-center cursor-pointer bg-white/10 rounded-b-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <span>Capacity</span>
            </div>
            <Input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              className="w-[100px] cursor-pointer bg-white/10 rounded-[8px] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5px] border border-white/10 p-2 placeholder:font-medium placeholder:text-white placeholder:text-sm focus-visible:ring-0"
            />
          </div>
        </div>
        <Button type="submit" className="w-full bg-white text-black">
          Create Event
        </Button>
      </div>
    </form>
  );
};
