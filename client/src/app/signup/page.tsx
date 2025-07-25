"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function Login() {

  const [formData,setFromData]=useState({
    name:"",
    email:"",
    password:""
  });

  const handleSignup=async(e:React.FormEvent)=>{
      e.preventDefault();
      console.log(formData);
      

  }
  return (
    <div className="flex justify-center items-center h-[80vh] bg-gradient-to-r from-green-50 to-sky-100">
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Signup to create your account</CardTitle>
        <CardDescription>
          Smarter tools, just a signup away.
        </CardDescription>
        <CardAction>
          <Button variant="link">Login</Button>
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
                onChange={(e)=>setFromData({...formData,name:e.target.value})}
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
                onChange={(e)=>setFromData({...formData,email:e.target.value})}
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
              onChange={(e)=>setFromData({...formData,password:e.target.value})}
              value={formData.password}
              placeholder="xyz123"
              required 
              />
            </div>
          </div>
     
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-4">
        <Button type="submit" className="w-full" >
          Signup
        </Button>
        {/* <Button variant="outline" className="w-full">
          Login with Google
          </Button> */}
      </CardFooter>
          </form>
    </Card>
    </div>
  )
}
