import React from "react";
import Button from "../../components/Button";
import { toast } from "sonner";
import { references, socials, work } from "./data";
import ReferenceSlider from "../../components/ReferenceSlider";

export default function Page() {
  const [formState, setFormState] = React.useState({
    name: "",
    email: "",
    message: "",
    submitting: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, submitting: true }));

    try {
      const response = await fetch("https://hook.eu2.make.com/brmy8lnvdj6oftqslkppnfqov05qu3a8", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormState({
          name: "",
          email: "",
          message: "",
          submitting: false,
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      setFormState((prev) => ({ ...prev, submitting: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen space-y-12 py-20">
      <section className="space-y-2 max-w-4xl mx-auto px-8 md:flex gap-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight mb-4">
            <span className="text-neutral-400 mr-1">Alicia.</span> An Amsterdam-based producer working in marketing
          </h1>
          <p className="leading-normal text-lg tracking-normal mb-8 text-neutral-400">
            I&apos;m helping brands to create content and work with them in an interdisciplinary manner to create a
            cohesive and engaging experience for the audience.
          </p>
        </div>
        <div className="flex md:flex-row flex-col-reverse items-start gap-2 md:justify-end">
          <Button
            onClick={() => {
              toast.success("Email copied to clipboard");
              navigator.clipboard.writeText("aliciagilca@gmail.com");
            }}
            variant="secondary"
            className="w-full md:w-auto"
          >
            Copy email
          </Button>
          <Button as="a" href="#contact" variant="primary" className="w-full md:w-auto">
            Contact me
          </Button>
        </div>
      </section>
      <section className="relative">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="w-full aspect-video bg-[url('/images/main.webp')] bg-cover bg-center" />
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10" />
      </section>
      <section className="space-y-2 mb-32">
        <h1 className="text-2xl font-semibold tracking-tight mb-8 max-w-4xl mx-auto px-8">References</h1>
        <div className="w-full">
          <ReferenceSlider references={references} />
        </div>
      </section>
      <section className="space-y-2 max-w-4xl mx-auto px-8 mb-32">
        <h1 className="text-2xl font-semibold tracking-tight mb-8">Experience</h1>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-12">
            {work.map((item) => (
              <div key={item.company}>
                <div className="flex gap-4 mb-2 md:flex-row flex-col">
                  <img
                    src={item.logo}
                    alt={item.company}
                    className="w-12 h-12 rounded-lg border border-white/10 mb-2"
                  />
                  <div className="flex flex-col gap-1 w-28">
                    <span className="font-medium">{item.company}</span>
                    <span className="text-sm text-neutral-500">
                      {item.startDate} - {item.endDate}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="space-y-2 max-w-4xl mx-auto px-8 mb-16" id="contact">
        <h1 className="text-2xl font-semibold tracking-tight mb-6">Get in touch</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-neutral-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/15 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors text-white"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-neutral-400">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/15 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors text-white"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-neutral-400">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded-lg bg-black resize-none border border-white/15 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 transition-colors text-white"
              placeholder="Why do you want to work with me?"
            />
          </div>
          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full md:w-auto halo-effect" disabled={formState.submitting}>
              {formState.submitting ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </section>
      <section className="space-y-2 max-w-4xl mx-auto px-8">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Or find me here</h2>
        <div className="flex flex-col gap-2">
          {socials.map((item) =>
            item.link ? (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-white/80 transition-colors self-start"
              >
                {item.name}
              </a>
            ) : (
              <span
                key={item.name}
                className="font-medium text-white self-start"
              >
                {item.name}
              </span>
            )
          )}
        </div>
      </section>
      <section className="space-y-2 max-w-4xl mx-auto px-8 mt-40 text-xs text-neutral-500">
        <p>Copyright {new Date().getFullYear()} Alicia Gilca</p>
      </section>
    </div>
  );
}
