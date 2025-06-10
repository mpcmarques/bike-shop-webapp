"use client";

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
import { signUpFormData, signUpSchema } from "../lib/validation/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputField from "@/components/FormInput";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signUpFormData> = async (data) => {
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
          <FormInputField
            label={<>First Name</>}
            error={errors.firstName?.message}
            inputProps={{
              type: "text",
              ...register("firstName"),
            }}
          />

          <FormInputField
            label={<>Last Name</>}
            error={errors.lastName?.message}
            inputProps={{
              type: "text",
              ...register("lastName"),
            }}
          />

          <FormInputField
            label={
              <>
                <BiBuilding /> Address
              </>
            }
            error={errors.address?.message}
            inputProps={{
              type: "text",
              ...register("address"),
            }}
          />

          <FormInputField
            label={<>Floor</>}
            error={errors.floor?.message}
            inputProps={{
              type: "text",
              ...register("floor"),
            }}
          />

          <FormInputField
            label={<>Door</>}
            error={errors.door?.message}
            inputProps={{
              type: "text",
              ...register("door"),
            }}
          />

          <FormInputField
            label={<>Postal Code</>}
            error={errors.postalCode?.message}
            inputProps={{
              type: "text",
              ...register("postalCode"),
            }}
          />

          <FormInputField
            label={<>City</>}
            error={errors.city?.message}
            inputProps={{
              type: "text",
              ...register("city"),
            }}
          />

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

          <FormInputField
            label={
              <>
                <BiKey /> Confirm password
              </>
            }
            error={errors.confirmPassword?.message}
            inputProps={{
              type: "password",
              ...register("confirmPassword"),
            }}
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
