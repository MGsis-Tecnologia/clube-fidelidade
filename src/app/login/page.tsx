"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/layout/logo";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { useAuthStore } from "@/store/auth.store";
import { useT } from "@/hooks/use-t";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = useT();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "helena@auroraboutique.com.br",
      password: "atelier2026",
      remember: true,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 750));
    login(data.email);
    toast.success(t("login.toast-title"), {
      description: t("login.toast-desc"),
    });
    router.push("/dashboard");
  };

  return (
    <main className="relative grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Left — editorial hero */}
      <section className="relative hidden overflow-hidden bg-[hsl(158_50%_12%)] text-emerald-foreground lg:flex lg:flex-col">
        <div className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay bg-grain" />
        <div
          className="pointer-events-none absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle_at_center,hsl(35_70%_55%/0.5),transparent_60%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,hsl(152_55%_55%/0.35),transparent_65%)]"
          aria-hidden
        />

        <div className="relative z-10 flex items-center justify-between px-10 py-8">
          <Logo className="[&_span:first-child]:bg-[hsl(35_70%_55%)] [&_span:first-child]:text-[hsl(158_50%_12%)] [&_div_span]:text-emerald-foreground [&_div_a]:text-[hsl(35_50%_70%)] [&_div_a]:hover:text-[hsl(35_60%_85%)]" />
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[hsl(35_60%_85%)]">
            {t("login.hero-tag")}
          </div>
        </div>

        <div className="relative z-10 mt-auto px-10 pb-16">
          <p className="eyebrow text-[hsl(35_50%_80%)] before:bg-[hsl(35_50%_80%)]">
            {t("login.eyebrow")}
          </p>
          <h1 className="mt-6 max-w-xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance text-emerald-foreground">
            {t("login.hero-heading")}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-[hsl(35_30%_85%)] text-pretty">
            {t("login.hero-desc")}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-emerald-foreground/15 pt-8">
            <div>
              <p className="font-display text-3xl font-medium tracking-tight">
                +84%
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[hsl(35_30%_80%)]">
                {t("login.stat1-label")}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-medium tracking-tight">
                12 min
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[hsl(35_30%_80%)]">
                {t("login.stat2-label")}
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-medium tracking-tight">
                1.4M
              </p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-[hsl(35_30%_80%)]">
                {t("login.stat3-label")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Right — login form */}
      <section className="relative flex items-center justify-center px-6 py-12 sm:px-12 dark:bg-[hsl(160_14%_9%)]">
        <div
          className="absolute inset-x-0 top-0 -z-0 h-72 bg-radial-emerald"
          aria-hidden
        />
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>

          <div className="mb-10 flex items-start justify-between">
            <div>
              <p className="eyebrow">{t("login.form-eyebrow")}</p>
              <h2 className="mt-3 font-display text-4xl font-medium tracking-tight text-balance">
                {t("login.form-heading")}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("login.form-desc")}
              </p>
            </div>
            <div className="ml-4 mt-1 shrink-0 lg:hidden">
              <LanguageSwitcher />
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="email">{t("login.email-label")}</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t("login.email-placeholder")}
                {...register("email")}
              />
              {errors.email ? (
                <p className="text-xs text-rose-500">{errors.email.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Label htmlFor="password">{t("login.password-label")}</Label>
                <button
                  type="button"
                  className="text-xs font-medium text-emerald underline-offset-4 hover:underline"
                  onClick={() =>
                    toast.info(t("login.forgot-toast"), {
                      description: t("login.forgot-toast-desc"),
                    })
                  }
                >
                  {t("login.forgot-password")}
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pr-10"
                  {...register("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password ? (
                <p className="text-xs text-rose-500">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <Checkbox defaultChecked {...register("remember")} />
              {t("login.remember")}
            </label>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="w-full"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {t("login.submit")}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-10 text-xs text-muted-foreground">
            {t("login.terms-prefix")}{" "}
            <a
              className="underline-offset-4 hover:text-foreground hover:underline"
              href="#"
            >
              {t("login.terms-link")}
            </a>{" "}
            {t("login.terms-and")}{" "}
            <a
              className="underline-offset-4 hover:text-foreground hover:underline"
              href="#"
            >
              {t("login.privacy-link")}
            </a>{" "}
            {t("login.terms-suffix")}
          </div>
        </div>
      </section>
    </main>
  );
}
