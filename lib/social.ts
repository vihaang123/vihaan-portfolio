import { isFilled, links } from "@/lib/content";

export interface SocialItem {
  label: string;
  /** Raw value from content.ts (empty until you fill it in). */
  value: string;
  /** Resolved link, or null while the value is empty. */
  href: string | null;
  external: boolean;
}

/** Turns the raw values in content.ts into ready-to-render links. */
export function getSocialItems(): SocialItem[] {
  return [
    {
      label: "Email",
      value: links.email,
      href: isFilled(links.email) ? `mailto:${links.email}` : null,
      external: false,
    },
    {
      label: "LinkedIn",
      value: links.linkedin,
      href: isFilled(links.linkedin) ? links.linkedin : null,
      external: true,
    },
    {
      label: "GitHub",
      value: links.github,
      href: isFilled(links.github) ? links.github : null,
      external: true,
    },
    {
      label: "X",
      value: links.x,
      href: isFilled(links.x) ? links.x : null,
      external: true,
    },
  ];
}
