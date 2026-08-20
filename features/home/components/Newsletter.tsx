"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/lib/validations/newsletter";
import { subscribeToNewsletter } from "@/services/newsletter.service";

export function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(values: NewsletterFormValues) {
    try {
      await subscribeToNewsletter(values);
      toast.success("You're subscribed! Check your inbox to confirm.");
      reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="container-page py-10 sm:py-14">
      <Reveal>
        <div className="relative overflow-hidden rounded-card-lg bg-gradient-to-br from-primary to-secondary p-8 text-center shadow-soft-xl sm:p-12">
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-12 -left-10 size-48 rounded-full bg-white/10 blur-2xl"
          />

          <span className="relative mx-auto flex size-12 items-center justify-center rounded-full bg-white/15">
            <Mail className="size-5 text-white" />
          </span>
          <h2 className="relative mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            Stay Updated
          </h2>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-white/85">
            Get the latest games, tools, and blog posts delivered to your inbox. No spam,
            unsubscribe anytime.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email..."
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "newsletter-email-error" : undefined}
                className="h-12 w-full rounded-card border-0 bg-white px-4 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-white"
                {...register("email")}
              />
              {errors.email && (
                <p id="newsletter-email-error" className="mt-1.5 text-xs text-white/95">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="!bg-ink text-white hover:!bg-ink/90"
            >
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : isSubmitSuccessful ? (
                <CheckCircle2 className="size-4" />
              ) : null}
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
