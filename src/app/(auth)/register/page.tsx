import { RegisterForm } from "@/components/features/auth/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <Card className="border-white/10 bg-white shadow-2xl shadow-black/20">
      <CardHeader className="p-6 pb-4 sm:p-8 sm:pb-5">
        <p className="mb-3 text-sm font-semibold tracking-wide text-blue-600">TASKFLOW</p>
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Get started with TaskFlow.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
