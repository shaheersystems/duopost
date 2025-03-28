import { useState } from "react";
import "./App.css";
import { tryCatch } from "./lib/try-catch";
import { useRegistrationMutation } from "./queries/auth/mutations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import useAuthStore from "./store/auth";
import { toast, Toaster } from "sonner";

// Define Zod schema for validation
const registrationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

function App() {
  const registerMutation = useRegistrationMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const authStore = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (formData: RegistrationFormValues) => {
    const { data, error } = await tryCatch(
      registerMutation.mutateAsync(formData)
    );
    if (error) {
      setErrorMessage(error.message);
      return;
    }
    authStore.login(data.token);
    toast.success(data.message);
    reset();
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {errorMessage && (
        <div className="p-4 rounded-md bg-red-200 text-red-500">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <Button type="submit">Sign Up</Button>
      </form>

      <Toaster />
    </div>
  );
}

export default App;
