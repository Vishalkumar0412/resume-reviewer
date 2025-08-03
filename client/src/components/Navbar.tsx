"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSelector } from "react-redux";
import {
  Files,
  LayoutDashboard,
  LogOut,
  Proportions,
  User,
} from "lucide-react";
import useIsClient from "@/hooks/useIsClient";
import { useLogoutMutation } from "@/lib/redux/api/authApi";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/redux/store";
import Image from "next/image";
import { toast } from "sonner";

const Navbar = () => {
  const isClient = useIsClient();
  const router = useRouter();
  const { user }: any = useSelector((store: RootState) => store.auth);
  const [logout, { data, error, isSuccess ,isLoading}] = useLogoutMutation();
  
  useEffect(() => {
    if(isLoading) toast.loading("logging out....")
    if(isSuccess && data) toast.success(data?.message ||"Logout successfull" )
    if(error) toast.error(error?.data.message || "logout failed")
      
    }, [isSuccess, error ,data, isLoading]);
  if (!isClient) return null;
    
  return (
    <header className="h-16 fixed w-full z-1 top-0 left-0 bg-white shadow-md flex items-center px-6 py-2 justify-between">
      <Link href="/">
        <div>
          <Image src="/logo.png" alt="" width={120} height={40} />
        </div>
      </Link>
      <div className="flex gap-1 mr-12 md:mr-6">
        {user ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="bg-blue-500 text-white rounded-full p-2  gap-2 outline-0  flex  justify-between items-center">
                  <User />{" "}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>{user?.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/profile">
                  {" "}
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>{" "}
                </Link>
                <Link href="/uploads">
                  {" "}
                  <DropdownMenuItem>
                    <Files /> Uploads
                  </DropdownMenuItem>
                </Link>
                <Link href="/reports">
                  {" "}
                  <DropdownMenuItem>
                    <Proportions /> Reports
                  </DropdownMenuItem>
                </Link>
                {user?.role == "ADMIN" && (
                  <Link href="/dashboard">
                    {" "}
                    <DropdownMenuItem>
                      <LayoutDashboard /> Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem
                  onClick={() => {
                    logout({});
                    router.push("/");
                  }}
                >
                  <LogOut /> Logout{" "}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <div>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </div>
            <div>
              <Link href="/signup">
                <Button>Signup</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
