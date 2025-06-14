"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiDoorOpen, BiKey, BiMailSend } from "react-icons/bi";
import {
  signInFormData,
  signInSchema,
} from "../../lib/validation/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/FormInput";
import ErrorCard from "@/components/ErrorCard";
import { useRouter } from "next/navigation";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<signInFormData>({ resolver: zodResolver(signInSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<{ email: string; password: string }> = async (
    data,
  ) => {
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.replace("/");
    } catch (error) {
      setError("root", {
        message: error?.message || "An error occurred during sign in.",
      });
    }
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

        {errors.root && <ErrorCard error={errors?.root?.message} />}

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
