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
import type { RootState } from "@/lib/redux/store"; // adjust path if needed

interface SignupResponse {
  message?: string;
  user?: string;
  [key: string]: any;
}

export default function Signup() {
  const router = useRouter();

  // ✅ Redux selector with proper typing
  const user = useSelector((store: RootState) => store.auth.user);

  // ✅ Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Signup mutation hook
  const [signup, { data , isLoading, isSuccess, error }] =
    useSignupMutation();

  // ✅ Push user to profile if already logged in
  useEffect(() => {
    if (user) {
      router.push("/profile");
    }
  }, [user, router]);

  // ✅ Submit handler
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signup(formData);
  };

  // ✅ Side effects for toast and redirect
  useEffect(() => {
    if (isSuccess && data) {
      toast.success((data as SignupResponse)?.message);
      router.push("/login");
    }
    if (error && "data" in error && (error as any)?.data?.message) {
      toast.error((error as any).data.message);
    }
  }, [isSuccess, error, data, router]);

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
                <Label htmlFor="fname">Full Name</Label>
                <Input
                  id="fname"
                  type="text"
                  placeholder="Alok Mishra"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
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
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="xyz123"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  required
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
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
