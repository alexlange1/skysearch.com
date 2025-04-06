
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  children: React.ReactNode;
  defaultTab?: "signin" | "signup";
}

const AuthDialog = ({ children, defaultTab = "signin" }: AuthDialogProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
  const { toast } = useToast();

  const signInForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSignIn = (data: any) => {
    // In a real app, this would authenticate with a backend
    console.log("Sign in data:", data);
    toast({
      title: "Sign in successful",
      description: "Welcome back!",
    });
    setOpen(false);
  };

  const onSignUp = (data: any) => {
    // In a real app, this would register with a backend
    console.log("Sign up data:", data);
    toast({
      title: "Account created",
      description: "Your account has been created successfully!",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === "signin" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "signin" 
              ? "Sign in to your account to continue" 
              : "Enter your details to create an account"
            }
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "signin" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="signin" className="mt-4">
            <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input 
                  id="signin-email" 
                  type="email" 
                  placeholder="email@example.com" 
                  {...signInForm.register("email", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="signin-password">Password</Label>
                  <a href="#" className="text-xs text-blue-500 hover:underline">Forgot password?</a>
                </div>
                <Input 
                  id="signin-password" 
                  type="password" 
                  {...signInForm.register("password", { required: true })}
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-4">
            <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input 
                  id="signup-name" 
                  placeholder="John Doe" 
                  {...signUpForm.register("name", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input 
                  id="signup-email" 
                  type="email" 
                  placeholder="email@example.com" 
                  {...signUpForm.register("email", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input 
                  id="signup-password" 
                  type="password" 
                  {...signUpForm.register("password", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                <Input 
                  id="signup-confirm-password" 
                  type="password" 
                  {...signUpForm.register("confirmPassword", { required: true })}
                />
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          By continuing, you agree to our <a href="#" className="underline text-blue-500">Terms of Service</a> and <a href="#" className="underline text-blue-500">Privacy Policy</a>.
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
