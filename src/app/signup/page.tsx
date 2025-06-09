"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BiBuilding,
  BiDoorOpen,
  BiKey,
  BiMailSend,
  BiUserPlus,
} from "react-icons/bi";
import { redirect } from "next/navigation";
import { signUp } from "../actions/signUp";

interface SignUpFormFields {
  email: string;
  password: string;
  repeatPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  floor: string;
  door: string;
  postalCode: string;
  city: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({});

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    await signUp(data);

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    redirect("/");
  };

  return (
    <div className="w-full flex justify-center items-center h-full">
      <div className="w-2xl max-w-3xl p-8 gap-4 border border-zinc-700 bg-zinc-800 rounded">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mb-4"
        >
          <label className="flex gap-2 items-center">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">
            <BiBuilding /> Address
          </label>
          <input
            type="text"
            {...register("address")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">Floor</label>
          <input type="text" {...register("floor")} className="input-default" />

          <label className="flex gap-2 items-center">Door</label>
          <input type="text" {...register("door")} className="input-default" />

          <label className="flex gap-2 items-center">Postal Code</label>
          <input
            type="text"
            {...register("postalCode")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">City</label>
          <input type="text" {...register("city")} className="input-default" />

          <label className="flex gap-2 items-center">
            <BiMailSend /> E-Mail
          </label>
          <input
            type="email"
            {...register("email")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">
            <BiKey /> Password
          </label>
          <input
            type="password"
            {...register("password")}
            className="input-default"
          />

          <label className="flex gap-2 items-center">
            <BiKey /> Repeat password
          </label>
          <input
            type="password"
            {...register("repeatPassword")}
            className="input-default"
          />

          <button type="submit" className="btn-default" disabled={isSubmitting}>
            {!isSubmitting ? (
              <>
                <BiUserPlus /> Sign Up
              </>
            ) : (
              <>Signing Up</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
