
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { User, Pen } from "lucide-react";

const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }).optional(),
  bio: z.string().max(300, { message: "Bio must be less than 300 characters" }).optional(),
  title: z.string().optional(),
  location: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true); // Start in edit mode for now
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

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

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
      // Update auth metadata (built-in user fields)
      const { error: updateError } = await supabase.auth.updateUser({
        data: { 
          full_name: data.fullName 
        }
      });

      if (updateError) throw updateError;

      // Update extended profile in custom table (if it exists)
      const { error: upsertError } = await supabase
        .from('profiles')
        .upsert({ 
          id: user.id,
          bio: data.bio,
          title: data.title,
          location: data.location,
          updated_at: new Date().toISOString() // Fix: Convert Date to ISO string
        });

      if (upsertError) throw upsertError;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
      
      // Toggle back to view mode after successful update
      setIsEditMode(false);
      navigate("/profile"); // This will refresh the page, showing the updated profile
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <div className="flex items-center mb-6">
              <div className="bg-gray-100 p-4 rounded-full">
                <User className="h-12 w-12 text-gray-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-medium">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0]}
                </h2>
                <p className="text-sm text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
