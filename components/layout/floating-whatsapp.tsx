"use client";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { socialLinks } from "@/lib/content";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

const whatsappLink = socialLinks.find((item) => item.icon === "whatsapp")?.href ?? "https://wa.me/963989133533";

export function FloatingWhatsApp() {
  const { isRtl } = useLanguage();

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact DRC Group on WhatsApp"
      className={cn(
        "focus-ring fixed bottom-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-pop transition hover:-translate-y-1 hover:bg-[#1fb85a] sm:bottom-6 sm:h-16 sm:w-16",
        isRtl ? "left-4 sm:left-6" : "right-4 sm:right-6"
      )}
    >
      <WhatsAppIcon className="h-8 w-8 sm:h-9 sm:w-9" />
    </a>
  );
}
