"use client";

import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, BriefcaseBusiness, MapPin, Send } from "lucide-react";
import { useCms } from "@/components/providers/cms-provider";
import { useLanguage } from "@/components/providers/language-provider";
import type { JobOpening } from "@/lib/cms";
import type { Locale, LocalizedString } from "@/lib/content";
import { cn } from "@/lib/utils";

function text(value: LocalizedString, locale: Locale) {
  return value[locale];
}

export function CareersPageContent() {
  const { locale, isRtl } = useLanguage();
  const { jobs } = useCms();
  const activeJobs = jobs.filter((job) => job.active);
  const [selectedJobId, setSelectedJobId] = useState(activeJobs[0]?.id ?? "");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const selectedJob = activeJobs.find((job) => job.id === selectedJobId) ?? activeJobs[0];

  async function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error ?? "Unable to submit application.");
      }

      event.currentTarget.reset();
      if (selectedJob) {
        setSelectedJobId(selectedJob.id);
      }
      setStatus("sent");
      setMessage(locale === "en" ? "Application submitted successfully." : "تم إرسال طلبك بنجاح.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit application.");
    }
  }

  return (
    <main className="bg-white">
      <section className="bg-mist pb-10 pt-28 sm:pb-16 sm:pt-44">
        <div className={cn("section-shell", isRtl && "text-right")}>
          <p className="soft-pill inline-flex">{locale === "en" ? "Careers" : "الوظائف"}</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_0.75fr] lg:items-end lg:gap-12">
            <h1 className="max-w-4xl text-4xl font-bold leading-tight text-primary sm:text-6xl">
              {locale === "en" ? "Join the DRC team." : "انضم إلى فريق عمل DRC"}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-ink/70 sm:text-xl sm:leading-9">
              {locale === "en"
                ? "Open roles are managed from the control panel and appear here automatically when they are active."
                : "تتم إدارة الوظائف من لوحة التحكم وتظهر هنا تلقائيا عند تفعيلها."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16 lg:py-20">
        <div className={cn("section-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12", isRtl && "text-right")}>
          <div>
            <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
              <BriefcaseBusiness className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                {locale === "en" ? "Available Jobs" : "الوظائف المتاحة"}
              </h2>
            </div>

            {activeJobs.length ? (
              <div className="divide-y divide-primary/10">
                {activeJobs.map((job) => (
                  <JobRow
                    key={job.id}
                    job={job}
                    locale={locale}
                    isRtl={isRtl}
                    selected={selectedJob?.id === job.id}
                    onSelect={() => setSelectedJobId(job.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-6 text-base leading-8 text-ink/65">
                {locale === "en"
                  ? "There are no active openings right now. Please check again soon."
                  : "لا توجد فرص عمل مفعلة حاليا. يرجى المتابعة لاحقا."}
              </p>
            )}
          </div>

          <div className="rounded-[28px] border border-primary/10 bg-mist p-4 sm:p-6 lg:sticky lg:top-28">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              {locale === "en" ? "Apply Now" : "قدّم الآن"}
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink/65 sm:text-base">
              {selectedJob
                ? text(selectedJob.title, locale)
                : locale === "en"
                  ? "Select an open role to apply."
                  : "اختر وظيفة متاحة للتقديم."}
            </p>

            <form className="mt-5 grid gap-3" onSubmit={submitApplication}>
              <input type="hidden" name="jobId" value={selectedJob?.id ?? ""} />
              <Field name="name" label={locale === "en" ? "Full name" : "الاسم الكامل"} required />
              <Field name="email" label={locale === "en" ? "Email" : "البريد الإلكتروني"} type="email" required />
              <Field name="phone" label={locale === "en" ? "Phone" : "الهاتف"} />
              <label className="grid gap-1.5 text-sm font-bold text-ink/70">
                {locale === "en" ? "Message" : "رسالة"}
                <textarea
                  name="message"
                  rows={4}
                  className="min-h-28 rounded-[18px] border border-primary/10 bg-white px-4 py-3 text-base font-semibold text-ink outline-none transition focus:border-primary"
                />
              </label>
              <label className="grid gap-1.5 text-sm font-bold text-ink/70">
                {locale === "en" ? "Resume or CV" : "السيرة الذاتية"}
                <input
                  name="resume"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp"
                  className="rounded-[18px] border border-primary/10 bg-white px-4 py-3 text-sm font-semibold text-ink file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-bold file:text-white"
                />
              </label>
              <button
                type="submit"
                disabled={!selectedJob || status === "submitting"}
                className={cn(
                  "focus-ring mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-[20px] bg-primary px-5 text-sm font-bold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:rounded-[24px] sm:text-base",
                  isRtl && "flex-row-reverse"
                )}
              >
                {status === "submitting" ? (locale === "en" ? "Sending..." : "جار الإرسال...") : locale === "en" ? "Submit Application" : "إرسال الطلب"}
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
              {message && (
                <p className={cn("text-sm font-bold", status === "error" ? "text-blush" : "text-leaf")}>{message}</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function JobRow({
  job,
  locale,
  isRtl,
  selected,
  onSelect
}: {
  job: JobOpening;
  locale: Locale;
  isRtl: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <article className="py-6">
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "focus-ring flex w-full items-start justify-between gap-5 rounded-[22px] p-3 text-left transition hover:bg-mist",
          selected && "bg-sky",
          isRtl && "flex-row-reverse text-right"
        )}
      >
        <span>
          <span className="text-2xl font-bold text-ink">{text(job.title, locale)}</span>
          <span className={cn("mt-3 flex flex-wrap items-center gap-2 text-sm font-bold text-ink/60", isRtl && "justify-end")}>
            <span>{text(job.department, locale)}</span>
            <span className="text-primary/30">/</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {text(job.location, locale)}
            </span>
            <span className="text-primary/30">/</span>
            <span>{text(job.type, locale)}</span>
          </span>
          <span className="mt-3 block max-w-2xl text-base leading-7 text-ink/65">{text(job.summary, locale)}</span>
          <span className="mt-4 block space-y-2 text-sm font-semibold leading-6 text-ink/65">
            {job.requirements.map((requirement) => (
              <span key={requirement.en} className="block">{text(requirement, locale)}</span>
            ))}
          </span>
        </span>
        <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-primary text-white">
          <ArrowIcon className="h-4 w-4" aria-hidden="true" />
        </span>
      </button>
    </article>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-bold text-ink/70">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-[18px] border border-primary/10 bg-white px-4 text-base font-semibold text-ink outline-none transition focus:border-primary"
      />
    </label>
  );
}
