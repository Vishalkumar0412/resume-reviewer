"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const 
  return (
    <header className="h-16 fixed w-full z-1 top-0 left-0 bg-white shadow-md flex items-center px-6 py-2 justify-between">
      <Link href="/">
        <div>
          <img src="./logo.png" alt="" className="h-14" />
        </div>
      </Link>
      <div className="flex gap-1">
       {
        user ? <></>:<>
        
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
      </div></div>
        </>
       }
    </header>
  );
};

export default Navbar;
