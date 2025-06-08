"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({});

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data,
  ) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <div className="bg-green-500 w-full p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">Sign In</button>
      </form>

      <Link href="/signup">Sign Up</Link>
    </div>
  );
};

export default Login;
