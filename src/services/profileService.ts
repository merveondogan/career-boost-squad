
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";
import { ProfileFormValues } from "@/components/profile/ProfileForm";

export const uploadAvatar = async (file: File, userId: string): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}-${Date.now()}.${fileExt}`;
    
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

export const updateProfile = async (
  user: User,
  data: ProfileFormValues,
  avatarUrl: string | null,
  newAvatarUrl: string | null
): Promise<boolean> => {
  try {
    // Update auth metadata (built-in user fields)
    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: data.fullName }
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
        avatar_url: newAvatarUrl || avatarUrl, // Use new URL or keep existing one
        updated_at: new Date().toISOString()
      });

    if (upsertError) throw upsertError;

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated."
    });
    
    return true;
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Update failed",
      description: error.message || "Something went wrong. Please try again."
    });
    return false;
  }
};
