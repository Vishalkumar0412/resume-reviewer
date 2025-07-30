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
import { useLoginMutation } from "@/lib/redux/api/authApi"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function Login() {
  const router=useRouter()
   const { user } = useSelector((store: any) => store.auth);
   useEffect(()=>{
    if(user){
      router.push ('/profile')
    }
   },[user])

  const [formData,setFromData]=useState({
    email:"",
    password:""
  });

  const [login, {isLoading,error,isSuccess}]=useLoginMutation()

  const handleLogin=async(e:React.FormEvent)=>{
      e.preventDefault();
      const res= await login(formData) 
  }
  useEffect(()=>{
    if(isSuccess){
      router.push('/profile')
    }
  },[isSuccess])
  return (
    <div className="flex justify-center items-center h-[100vh] bg-gradient-to-r from-green-50 to-sky-100">
    <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href="/signup">
          <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
        <form onSubmit={handleLogin}>
      <CardContent>
          <div className="flex flex-col gap-6">
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
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
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
      <CardFooter className="flex-col gap-2 mt-3">
        <Button type="submit" className="w-full" >
          {
          isLoading ? <Loader2 className="h-2 w-2 animate-spin"/>: "Login"
         } 
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
