"use client";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm mx-auto bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>

      {/* Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="w-full border px-3 py-2 rounded"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

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
            minLength: { value: 6, message: "Min length is 6 characters" },
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
        Register
      </button>
    </form>
  );
}
