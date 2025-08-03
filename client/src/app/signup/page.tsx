"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignupMutation } from "@/lib/redux/api/authApi";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

export default function Login() {
  const { user } = useSelector((store: any) => store.auth);

  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user]);

  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const [signup, {data, isLoading, isSuccess ,error}] = useSignupMutation();
  console.log(isSuccess,error);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signup(formData);
  };
  useEffect(() => {
    if (isSuccess && data) {

      toast.success(data?.message);
      router.push("/login");
    }
    if(error){
      toast.error(error?.data?.message)
    }

  }, [isSuccess,error,data]);
  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-r from-green-50 to-sky-100">
      <Card className="w-full max-w-sm h-fit">
        <CardHeader>
          <CardTitle>Signup to create your account</CardTitle>
          <CardDescription>Smarter tools, just a signup away.</CardDescription>
          <CardAction>
            <Link href="/login">
              <Button variant="link">Login</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSignup}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="Alok Mishra"
                  onChange={(e) =>
                    setFromData({ ...formData, name: e.target.value })
                  }
                  value={formData.name}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) =>
                    setFromData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setFromData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  placeholder="xyz123"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-2 w-2 animate-spin" />
              ) : (
                "Signup"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
