
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BecomeMentor = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    expertiseAreas: [] as string[],
    experience: "",
    bio: "",
    hourlyRate: "",
  });
  
  // Available expertise areas
  const expertiseOptions = [
    { id: "resume-review", label: "Resume Review" },
    { id: "interview-prep", label: "Interview Preparation" },
    { id: "career-advice", label: "Career Advice" },
    { id: "technical-skills", label: "Technical Skills" },
    { id: "application-strategy", label: "Application Strategy" },
    { id: "portfolio-review", label: "Portfolio Review" },
    { id: "networking", label: "Networking" },
    { id: "salary-negotiation", label: "Salary Negotiation" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleExpertiseChange = (id: string, checked: boolean) => {
    setFormData((prev) => {
      if (checked) {
        return { ...prev, expertiseAreas: [...prev.expertiseAreas, id] };
      } else {
        return { ...prev, expertiseAreas: prev.expertiseAreas.filter(area => area !== id) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You need to be logged in to become a mentor.",
      });
      navigate("/login");
      return;
    }
    
    if (formData.expertiseAreas.length === 0) {
      toast({
        variant: "destructive",
        title: "Areas of expertise required",
        description: "Please select at least one area of expertise.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Update user metadata to include mentor status
      const { error: userUpdateError } = await supabase.auth.updateUser({
        data: {
          user_type: "mentor",
          is_mentor: true
        }
      });

      if (userUpdateError) throw userUpdateError;
      
      // Create or update mentor profile in database
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          title: formData.position,
          bio: formData.bio,
          mentor_info: {
            company: formData.company,
            position: formData.position,
            expertise_areas: formData.expertiseAreas,
            experience: formData.experience,
            hourly_rate: formData.hourlyRate
          }
        });

      if (profileError) throw profileError;
      
      toast({
        title: "Application submitted successfully",
        description: "Your mentor profile has been created. You can now start accepting mentees.",
      });
      
      // Redirect to profile page
      navigate("/profile");
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error submitting application",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl">
          <Card>
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold">Become a Mentor</CardTitle>
              <CardDescription>
                Share your internship and career experience to help others succeed
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Current/Previous Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Google, Meta, etc."
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Position/Role</Label>
                    <Input
                      id="position"
                      name="position"
                      placeholder="Software Engineer Intern, Data Scientist, etc."
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expertiseAreas">Areas of Expertise</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {expertiseOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={option.id} 
                          checked={formData.expertiseAreas.includes(option.id)}
                          onCheckedChange={(checked) => 
                            handleExpertiseChange(option.id, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={option.id} 
                          className="cursor-pointer text-base font-normal"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Select all areas where you can provide mentorship</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level</Label>
                  <Select 
                    name="experience" 
                    value={formData.experience}
                    onValueChange={(value) => handleSelectChange("experience", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5+">5+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio / Introduction</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell students about yourself and how you can help them..."
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="h-32"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    min="0"
                    step="5"
                    placeholder="40"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    required
                  />
                  <p className="text-sm text-gray-500">Set your rate for 1-hour mentoring sessions</p>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </CardContent>
            
            <CardFooter className="flex flex-col items-center justify-center text-center">
              <p className="text-sm text-gray-500 mt-4">
                By becoming a mentor, you agree to our{" "}
                <a href="/terms" className="text-brand-primary hover:underline">
                  Mentor Terms of Service
                </a>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BecomeMentor;
