
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { AvatarUploader } from "./AvatarUploader";
import { ProfileFormFields } from "./ProfileFormFields";
import { uploadAvatar, updateProfile } from "@/services/profileService";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  bio: z.string().max(300, { message: "Bio must be less than 300 characters" }).optional(),
  title: z.string().optional(),
  location: z.string().optional(),
  avatar: z
    .instanceof(FileList)
    .optional()
    .refine((files) => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB`,
    })
    .refine(
      (files) => !files || files.length === 0 || ALLOWED_FILE_TYPES.includes(files[0].type),
      {
        message: "Only .jpg, .jpeg, .png and .gif formats are supported",
      }
    ),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: User;
  onSuccess?: () => void;
}

export const ProfileForm = ({ user, onSuccess }: ProfileFormProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      bio: "",
      title: "",
      location: "",
    },
  });

  // Load user data
  useEffect(() => {
    if (user) {
      form.setValue("fullName", user.user_metadata?.full_name || "");
      
      // Try to get additional profile data if it exists
      const fetchUserProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            return;
          }

          if (data) {
            form.setValue("bio", data.bio || "");
            form.setValue("title", data.title || "");
            form.setValue("location", data.location || "");
            
            if (data.avatar_url) {
              setAvatarUrl(data.avatar_url);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [user, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      let newAvatarUrl = null;
      
      // Upload avatar if provided
      if (data.avatar && data.avatar.length > 0) {
        newAvatarUrl = await uploadAvatar(data.avatar[0], user.id);
      }

      // Update profile using the service
      const success = await updateProfile(user, data, avatarUrl, newAvatarUrl);
      
      if (success && onSuccess) {
        onSuccess();
      } else if (success) {
        navigate("/profile");
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <AvatarUploader 
          control={form.control}
          avatarUrl={avatarUrl}
          setAvatarUrl={setAvatarUrl}
        />
        
        <ProfileFormFields control={form.control} />
        
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
