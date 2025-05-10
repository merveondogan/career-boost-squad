
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MentorForm } from "./MentorForm";

export function MentorFormPage() {
  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold">Become a Mentor</CardTitle>
        <CardDescription>
          Share your internship and career experience to help others succeed
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <MentorForm />
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
  );
}
