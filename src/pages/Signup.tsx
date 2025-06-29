
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [userType, setUserType] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if the URL contains a type parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type');
    if (typeParam === 'mentor') {
      setUserType('mentor');
    }
  }, [location]);
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get the current origin for proper redirect URLs
      const origin = window.location.origin;
      
      // Sign up with Supabase auth with email verification
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            user_type: userType,
            is_mentor: userType === 'mentor'
          },
          emailRedirectTo: `${origin}/login` // Redirect to login after verification
        }
      });
      
      if (error) throw error;
      
      setVerificationSent(true);
      
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {verificationSent ? (
            <Card>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                <CardDescription>
                  We've sent you a verification link to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>Please check your inbox and click the verification link to complete your signup.</p>
                <p className="text-sm text-muted-foreground">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button 
                    onClick={() => setVerificationSent(false)}
                    className="text-brand-primary hover:underline"
                  >
                    try again
                  </button>
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                >
                  Back to Login
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                <CardDescription>
                  Enter your details to create a new account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <form onSubmit={handleSignup}>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="********"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>I am signing up as a:</Label>
                        <RadioGroup defaultValue="student" value={userType} onValueChange={setUserType}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="student" id="student" />
                            <Label htmlFor="student" className="cursor-pointer">Student looking for mentorship</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mentor" id="mentor" />
                            <Label htmlFor="mentor" className="cursor-pointer">Mentor offering guidance</Label>
                          </div>
                        </RadioGroup>
                        
                        {userType === 'mentor' && (
                          <div className="mt-2 text-sm text-muted-foreground rounded-md border p-3 bg-muted/50">
                            <p>As a mentor, you'll need to complete your profile with your experience and expertise after signing up.</p>
                          </div>
                        )}
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Create account"}
                      </Button>
                    </div>
                  </form>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">
                      Google
                    </Button>
                    <Button variant="outline" type="button">
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-center gap-2">
                <div className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-brand-primary hover:underline">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
