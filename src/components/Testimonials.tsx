
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Updated testimonials with new people and stories
const testimonials = [
  {
    id: 1,
    content: "The technical mock interviews were incredibly helpful. My mentor provided detailed feedback that helped me improve my algorithm problem-solving skills. I ended up receiving an offer from my dream tech company!",
    author: "Marcus Johnson",
    role: "Computer Engineering Student",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 2,
    content: "Having a mentor who had recently interned at the same company was invaluable. They guided me through the entire application process and helped me prepare for all the interview rounds. I couldn't have done it without them!",
    author: "Leila Patel",
    role: "Information Systems Student",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
  },
  {
    id: 3,
    content: "My mentor helped me completely transform my resume and portfolio. Their insights into what recruiters look for in the design industry made all the difference. I secured three internship offers in one week!",
    author: "Tyler Washington",
    role: "UI/UX Design Student",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our platform has helped students land their dream internships
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <svg className="h-8 w-8 text-brand-primary opacity-50 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-600 mb-6">{testimonial.content}</p>
                </div>
                <div className="flex items-center mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
