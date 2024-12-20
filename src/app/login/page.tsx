"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      return router.push("/");
    }
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <form className="card" onSubmit={handleSubmit}>
        <h3 className="text-neutral-50">Login to your account</h3>
        <div className="flex flex-col gap-4">
          <div className="gap-1 flex flex-col">
            <label>Email</label>
            <input placeholder="Email" name="email" type="email" />
          </div>
          <div className="gap-1 flex flex-col">
            <label>Password</label>
            <input placeholder="********" name="password" type="password" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="w-full gap-4 flex flex-col justify-between">
            <button className="button_primary">Login </button>
            <Link href={"/register"}>
              <button className="button_outline">Create a account</button>
            </Link>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            {/* <button className="button_link">Login as a guest</button> */}
            {error && <div className="text-neutral-50 text-sm">{error}</div>}
          </div>
        </div>
      </form>
    </section>
  );
}
