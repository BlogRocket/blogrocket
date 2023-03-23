import Navbar from "@/components/common/Navbar";
import Button from "@/components/ui/Button";

const LINKS = [
  { to: "docs", label: "Docs" },
  { to: "login", label: "Login" },
  { to: "register", label: "Get started" },
]

export function Landing() {
  return (
    <main>
      <Navbar links={LINKS} />
      <section className="my-8">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="bg-primary/5 w-full min-h-96 rounded-2xl px-4 py-12">
            <h1 className="text-5xl font-bold mx-auto text-center max-w-2xl">
              Build your blog even faster.
            </h1>
            <p className="text-lg text-neutral-500 mx-auto text-center max-w-2xl mt-4">
              You have other magic to create but you need to add a blog to your website first. We know you can do it yourself but you don't want to spend the time. You want to get back to the magic.
            </p>
            <div className="flex justify-center mt-8">
              <Button to="/login" variant="solid">Get Started</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}