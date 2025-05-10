
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as UserIcon, Upload } from "lucide-react";

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

  const uploadAvatar = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Avatar upload failed",
        description: error.message || "Failed to upload avatar"
      });
      return null;
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;
    
    setIsUpdating(true);
    
    try {
      let avatarUrl = null;
      
      // Upload avatar if provided
      if (data.avatar && data.avatar.length > 0) {
        avatarUrl = await uploadAvatar(data.avatar[0]);
      }

      // Update auth metadata (built-in user fields)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: data.fullName 
        }
      });

      if (updateError) throw updateError;

      // Update extended profile in custom table
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          bio: data.bio,
          title: data.title,
          location: data.location,
          avatar_url: avatarUrl || undefined,
          updated_at: new Date().toISOString()
        });

      if (upsertError) throw upsertError;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      
      // Redirect to profile page after successful update
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/profile");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatarUrl || ''} />
            <AvatarFallback className="bg-gray-100">
              <UserIcon className="h-8 w-8 text-gray-600" />
            </AvatarFallback>
          </Avatar>
          
          <FormField
            control={form.control}
            name="avatar"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <FormLabel className="cursor-pointer inline-flex items-center px-3 py-2 bg-gray-100 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Image
                  <FormControl>
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        onChange(e.target.files);
                        // Preview uploaded image
                        if (e.target.files && e.target.files.length > 0) {
                          setAvatarUrl(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                      {...rest}
                    />
                  </FormControl>
                </FormLabel>
                <FormDescription>
                  Upload a profile picture (max 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Software Developer, Student, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tell us a little about yourself" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                You can write up to 300 characters about yourself.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
