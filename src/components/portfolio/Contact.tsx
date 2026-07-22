import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "./SectionHeading";
import TrueFocus from "@/components/reactbits/TrueFocus";

const schema = z.object({
  name: z.string().trim().min(2, "Name too short").max(80),
  email: z.string().trim().email("Invalid email").max(200),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(10, "Tell me a bit more").max(2000),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);

    try {
      console.log("SERVICE:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
      console.log("TEMPLATE:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
      console.log("PUBLIC:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          time: new Date().toLocaleString(),
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent — I'll be in touch within 24 hours.");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-white/5 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10">
        <SectionHeading number="07" eyebrow="Contact" title="Let's talk." />
        <div className="mt-8" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}>
          <TrueFocus
            sentence="Build Bold Brands"
            borderColor="oklch(0.68 0.24 35)"
            glowColor="oklch(0.68 0.24 35 / 0.6)"
            blurAmount={4}
            animationDuration={0.6}
            pauseBetweenAnimations={1.2}
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-8">
            <p className="max-w-md text-lg text-muted-foreground">
              I take on a handful of projects each quarter. Tell me what you're
              working on and I'll come back with a call time.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                  <Mail className="h-4 w-4 text-ember" />
                </span>
                <a href="mailto:swayamsankar898@gmail.com" className="story-link">
                  swayamsankar898@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03]">
                  <MapPin className="h-4 w-4 text-ember" />
                </span>
                <span>Jajpur Town, Odisha</span>
              </li>
            </ul>
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <p className="font-mono text-xs tracking-widest text-muted-foreground">
                CURRENTLY
              </p>
              <p className="mt-2 flex items-center gap-2 text-lg text-white">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ember" />
                </span>
                Ready for the Next Big Thing
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" error={errors.name?.message}>
                <input
                  {...register("name")}
                  className="input"
                  placeholder="Your name"
                  autoComplete="name"
                />
              </Field>
              <Field label="Email" error={errors.email?.message}>
                <input
                  {...register("email")}
                  className="input"
                  placeholder="you@company.com"
                  autoComplete="email"
                  type="email"
                />
              </Field>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Subject" error={errors.subject?.message}>
                <input {...register("subject")} className="input" placeholder="Landing page redesign" />
              </Field>
            </div>
            <div className="mt-4">
              <Field label="Message" error={errors.message?.message}>
                <textarea
                  {...register("message")}
                  rows={5}
                  className="input resize-none"
                  placeholder="What are you building?"
                />
              </Field>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send message <Send className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          color: white;
          outline: none;
          transition: border-color .2s, background .2s;
        }
        .input::placeholder { color: rgba(255,255,255,0.35); }
        .input:focus { border-color: var(--ember); background: rgba(255,255,255,0.05); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] tracking-widest text-muted-foreground uppercase">
        {label}
      </span>
      {children}
      {error ? <span className="mt-1 block text-xs text-destructive">{error}</span> : null}
    </label>
  );
}
