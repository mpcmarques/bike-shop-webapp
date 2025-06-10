"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiDoorOpen, BiKey, BiMailSend } from "react-icons/bi";
import { redirect } from "next/navigation";
import { signInFormData, signInSchema } from "../lib/validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/FormInput";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data,
  ) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    redirect("/");
  };

  return (
    <div className="w-full flex justify-center items-center pt-32">
      <div className="w-2xl max-w-3xl p-8 gap-4 border border-zinc-700 bg-zinc-800 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4"
        >
          <FormInputField
            label={
              <>
                <BiMailSend /> E-Mail
              </>
            }
            error={errors.email?.message}
            inputProps={{
              type: "email",
              ...register("email"),
            }}
          />

          <FormInputField
            label={
              <>
                <BiKey /> Password
              </>
            }
            error={errors.password?.message}
            inputProps={{
              type: "password",
              ...register("password"),
            }}
          />

          <button type="submit" className="btn-default" disabled={isSubmitting}>
            {!isSubmitting ? (
              <>
                <BiDoorOpen /> Sign In
              </>
            ) : (
              <>Loggin In</>
            )}
          </button>
        </form>

        <Link
          href="/signup"
          className="underline hover:text-cyan-500 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
