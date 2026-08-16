"use client";

import { createContext, useContext, type ReactNode } from "react";
import { defaultCmsContent, type CmsContent } from "@/lib/cms";

const CmsContext = createContext<CmsContent>(defaultCmsContent);

export function CmsProvider({
  content,
  children
}: {
  content: CmsContent;
  children: ReactNode;
}) {
  return <CmsContext.Provider value={content}>{children}</CmsContext.Provider>;
}

export function useCms() {
  return useContext(CmsContext);
}
