"use client";

import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-auth";
import { type RegisterFormValues, registerFormSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function RegisterForm() {
  const registerMutation = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    const { confirmPassword: _confirmPassword, ...payload } = values;
    registerMutation.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          placeholder="Nama Lengkap"
          autoComplete="name"
          aria-invalid={!!errors.fullName}
          disabled={registerMutation.isPending}
          {...register("fullName")}
        />
        <FormError message={errors.fullName?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          disabled={registerMutation.isPending}
          {...register("email")}
        />
        <FormError message={errors.email?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="At least 8 characters"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          disabled={registerMutation.isPending}
          {...register("password")}
        />
        <FormError message={errors.password?.message} />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Repeat your password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          disabled={registerMutation.isPending}
          {...register("confirmPassword")}
        />
        <FormError message={errors.confirmPassword?.message} />
      </div>

      <Button type="submit" className="w-full" isLoading={registerMutation.isPending}>
        Create account
      </Button>

      <p className="text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
