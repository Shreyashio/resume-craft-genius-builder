
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon, Lock, Github } from "lucide-react";
import { toast } from "sonner";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const LoginModal = ({ open, onOpenChange, onSuccess }: LoginModalProps) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would authenticate with a backend
    // For now, we'll just simulate login success
    toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");
    
    onOpenChange(false);
    
    if (onSuccess) {
      onSuccess();
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would authenticate with Google
    toast.info("Google authentication in progress...");
    setTimeout(() => {
      toast.success("Logged in with Google!");
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  const handleGithubLogin = () => {
    // In a real app, this would authenticate with GitHub
    toast.info("GitHub authentication in progress...");
    setTimeout(() => {
      toast.success("Logged in with GitHub!");
      onOpenChange(false);
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md glass-card border-primary/10">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold gradient-text">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription>
            {isLogin 
              ? "Enter your credentials to access your account" 
              : "Create an account to save your resumes"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email-modal">Email</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="email-modal"
                type="email" 
                placeholder="you@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password-modal">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                id="password-modal"
                type="password" 
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full shine-effect hover-lift">
            {isLogin ? "Sign In" : "Create Account"}
          </Button>
          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleGoogleLogin} className="w-full flex items-center gap-2 hover-lift">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Google
            </Button>
            <Button variant="outline" onClick={handleGithubLogin} className="w-full flex items-center gap-2 hover-lift">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
          </div>
          
          <div className="text-center text-sm">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
