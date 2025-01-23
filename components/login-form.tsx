'use client'

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface ApiResponse {
  success: boolean;
  message?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  token?: string;
  refreshToken?: string;
}


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter(); // Use useRouter

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("Login form submitted");
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://myclan.co.in/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await response.json();


      if (response.status == 200) {
        console.log("Login response:", data);


        console.log("Login response:", data);
        Cookies.set("userId", String(data.user?.id), { expires: 7 });
        Cookies.set("userName", data.user?.name || "", { expires: 7 });
        Cookies.set("userEmail", data.user?.email || "", { expires: 7 });
        Cookies.set("token", data.token || "", { expires: 7 });
        Cookies.set("refreshToken", data.refreshToken || "", { expires: 7 });

        console.log("Login successful:", data.user);

        router.push("/dashboard");
      } else {
        setError(data.message || "An unknown error occurred.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </Button>
              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
