"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "../actions/register";

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const res = await register({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    ref.current?.reset();

    if (res?.error) {
      setError(res.error);
      return;
    }
    router.push("/login");
  };

  return (
    <section className="page">
      <form ref={ref} onSubmit={handleSubmit} className="card">
        <h4 className="text-neutral-50">Register</h4>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              name="name"
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              className="input"
            />
          </div>
        </div>

        {error && <div className="text-sm text-red-500">{error}</div>}

        <div className="w-full gap-4 flex flex-row items-start justify-end">
          <Link href="/login">
            <button className="button_outline">Login</button>
          </Link>
          <button type="submit" className="button_primary">
            Sign up
          </button>
        </div>
      </form>
    </section>
  );
}
