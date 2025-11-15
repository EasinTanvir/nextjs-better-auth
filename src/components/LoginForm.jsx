"use client";
import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (res) => {
    const { email, password } = res;

    const { data, error } = await authClient.signIn.email(
      {
        email,

        password,

        callbackURL: "/profile",

        rememberMe: true,
      },
      {
        onError: (ctx) => {
          // Handle the error
          if (ctx.error.status === 403) {
            toast.error("Please verify your email address");
            return;
          }
          //you can also show the original error message
          toast.error(ctx.error.message);
          console.log("err", ctx);
        },
      }
    );
    console.log("data", data);
    console.log("error", error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          })}
          className="w-full border px-3 py-2 rounded"
          placeholder="example@gmail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full border px-3 py-2 rounded"
          placeholder="********"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded mt-2 hover:bg-blue-700 duration-200"
      >
        Login
      </button>
    </form>
  );
}
