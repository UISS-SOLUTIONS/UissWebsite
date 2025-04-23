"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import UissLogo from "@/public/logoUISS.png";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast.loading("Logging in...")
    const loginPromise = signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    const response = await loginPromise;
    toast.dismiss();

    if (response?.error) {
      switch (response.error) {
        case "CredentialsSignin":
          toast.error("Invalid email or password");
          setError("Invalid email or password");
          break;
        case "Configuration":
          toast.error("Internal server error occurred");
          setError("Internal server error occurred");
          break;
        default:
          toast.error("Something went wrong. Please try again.");
          setError("Something went wrong. Please try again.");
      }
    } else {
      toast.success("Login successful!");
      window.location.href = "/AdminPanel";
    }
  };

  return (
    <div className="w-full h-screen relative flex items-center justify-center">
      <div className="w-full h-full absolute top-0">
        <img
          src="https://img.freepik.com/free-photo/study-group-african-people_23-2149156431.jpg?t=st=1745401943~exp=1745405543~hmac=e4b69db0e83d5a3808d41ea6d08eb1891a1dcf1f4f7707c1af7b605c89a4b30b&w=826"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="bg-black/80 w-full h-full absolute top-0" />
      </div>
      <div className="z-10 bg-slate-200 flex flex-col items-center justify-center gap-5 py-5 w-[30%] rounded-lg">
        <Image src={UissLogo} height={80} width={85} alt="Uiss Logo" />
        <div className="flex flex-col items-center justify-center font-semibold italic text-black/80 text-lg">
          <h1>Great systems are built with quiet precision.</h1>
          <h2>Continue the mission.</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-5 w-full pb-5"
        >
          <div className="flex flex-col gap-2 w-[90%]">
            <label htmlFor="email" className="text-xl font-bold">
              E-mail
            </label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-2 w-[90%]">
            <label htmlFor="password" className="text-xl font-bold">
              Password
            </label>
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 text-lg focus:outline-none bg-transparent border-black/20 border-[1px] rounded-lg"
              type="password"
              placeholder="Password"
            />
          </div>
          {error && (
            <div className="flex flex-col gap-2 w-[90%]">
              <span className="text-xl font-bold text-red-600">{error}</span>
            </div>
          )}
          <button
            type="submit"
            className="bg-ternary font-bold text-xl w-[90%] rounded-lg py-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
