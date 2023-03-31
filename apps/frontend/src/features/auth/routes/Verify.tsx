import Navbar from "@/components/common/Navbar";
import Button from "@/components/ui/Button";
import OTPInput from "@/components/ui/OtpInput";
import useForm from "@/hooks/useForm";
import { useRegister } from "@/lib/auth";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Verify() {
  const { values, onTextChange } = useForm({ code: "" })
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";
  const password = state?.password || "";
  const register = useRegister();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
    register.mutate({ email, password, code: values.code }, {
      onSuccess: () => navigate("/app")
    });
  };

  if (!email || !password) return (
    <main>
      <Navbar />
      <section className="mt-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="w-full min-h-96 rounded-2xl px-4 py-12">
            <form onSubmit={handleSubmit}>
              <h1 className="max-w-sm text-4xl font-bold mx-auto text-center">
                Verify your mail.
              </h1>
              <div className="max-w-sm mx-auto mt-8 flex flex-col gap-8">
                <p>Something went wrong. You probably got here by mistake. Please try again.</p>
                <div className="flex justify-center">
                  <NavLink to="/login" className="text-neutral-500">Login</NavLink>
                  {/* A vertical separator */}
                  <span className="mx-2">|</span>
                  <NavLink to="/register" className="text-neutral-500">Register</NavLink>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )

  return (
    <main>
      <Navbar />
      <section className="mt-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="w-full min-h-96 rounded-2xl px-4 py-12">
            <form onSubmit={handleSubmit}>
              <h1 className="max-w-sm text-4xl font-bold mx-auto text-center">
                Verify your mail.
              </h1>
              <div className="max-w-sm mx-auto mt-8 flex flex-col gap-8">
                <p>We've sent a mail to <span className="underline">{email}</span>. Please click the link in the mail to verify your account.</p>
                <OTPInput
                  length={4}
                  onChange={(text) => onTextChange(text, "code")}
                  inputClassName="bg-transparent border border-px"
                  className="self-center"
                />
                <div className="flex justify-center mt-8">
                  <Button variant="solid" className="w-full" type="submit" loading={register.isLoading}>Let's go</Button>
                </div>
              </div>
              <div className="max-w-sm mx-auto mt-8">
                {/* edit mail */}
                <NavLink to="/register" className="text-neutral-500 text-base underline font-medium">Go back and edit mail</NavLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}