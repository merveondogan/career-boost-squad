
import { useState } from "react";
import { User } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { Control } from "react-hook-form";
import { ProfileFormValues } from "./ProfileForm";

interface AvatarUploaderProps {
  control: Control<ProfileFormValues>;
  avatarUrl: string | null;
  setAvatarUrl: (url: string) => void;
}

export const AvatarUploader = ({ control, avatarUrl, setAvatarUrl }: AvatarUploaderProps) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={avatarUrl || ''} />
        <AvatarFallback className="bg-gray-100">
          <User className="h-8 w-8 text-gray-600" />
        </AvatarFallback>
      </Avatar>
      
      <FormField
        control={control}
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
  );
};
