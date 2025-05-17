
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Award, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Create Professional
                <span className="text-primary"> Resumes </span>
                That Get You Hired
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-xl">
                Build ATS-friendly resumes with our easy-to-use builder. Choose from multiple professional templates and get hired faster.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="text-base font-medium">
                  <Link to="/builder">
                    Create Your Resume
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base font-medium">
                  <Link to="/templates">
                    Browse Templates
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-tr from-blue-50 to-blue-100 rounded-lg p-4 rotate-3 transform">
                  <img 
                    src="https://placehold.co/600x800/e6effc/1a56db?text=Resume+Preview&font=montserrat" 
                    alt="Resume Example" 
                    className="rounded shadow-lg max-w-full h-auto -rotate-3 transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Our Resume Builder</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiple Templates</h3>
              <p className="text-gray-600">
                Choose from a variety of professionally designed templates that suit your industry and experience level.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ATS-Friendly</h3>
              <p className="text-gray-600">
                Ensure your resume passes through Applicant Tracking Systems with our optimized templates and formatting.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Results</h3>
              <p className="text-gray-600">
                Stand out from other applicants with a clean, modern design that highlights your skills and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Enter Your Details</h3>
              <p className="text-gray-600 text-sm">
                Fill in your personal information, experience, education, and skills.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Choose a Template</h3>
              <p className="text-gray-600 text-sm">
                Select from our professional resume templates.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Check ATS Compatibility</h3>
              <p className="text-gray-600 text-sm">
                Ensure your resume is optimized for Applicant Tracking Systems.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Download & Apply</h3>
              <p className="text-gray-600 text-sm">
                Get your professional resume in PDF format and start applying for jobs.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link to="/builder">
                Start Building Your Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
