import Navbar from "@/components/common/Navbar";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Not yet implemented.");
    navigate("/app");
  };

  return (
    <main>
      <Navbar />
      <section className="mt-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="w-full min-h-96 rounded-2xl px-4 py-12">
            <form onSubmit={handleSubmit}>
              <h1 className="max-w-sm text-4xl font-bold mx-auto text-center">
                Login.
              </h1>
              <div className="max-w-sm mx-auto mt-8 flex flex-col gap-8">
                <Input type="email" placeholder="rocker@mail.com" label="Email" value={email} onChange={setEmail} />
                <Input type="password" placeholder="••••••••" label="Password" value={password} onChange={setPassword} />
                <div className="flex justify-center mt-8">
                  <Button type="submit" variant="solid" className="w-full">Let's go</Button>
                </div>
                <div className="flex justify-center">
                  <NavLink to="/register" className="text-black-500">Register</NavLink>
                  {/* A vertical separator */}
                  <span className="mx-2">|</span>
                  <NavLink to="/forgot-password" className="text-black-500">Forgot password</NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}