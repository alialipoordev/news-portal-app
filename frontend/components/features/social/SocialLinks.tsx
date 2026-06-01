import React from "react";
import { SocialLink } from "@/types/type";
import { cn } from "@/utils/cn";

export interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
}

const PlatformIcon: React.FC<{ platform: SocialLink["platform"] }> = ({
  platform,
}) => {
  const cls = "w-3.5 h-3.5";
  switch (platform) {
    case "x":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.259 5.631ZM17.083 20.75h1.834L7.084 4.126H5.117Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case "youtube":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
          <polygon
            fill="white"
            points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "facebook":
      return (
        <svg
          className={cls}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
  }
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  className,
}) => (
  <div
    className={cn("flex items-center gap-2.5", className)}
    aria-label="Follow us on social media"
  >
    {links.map((link) => (
      <a
        key={link.platform}
        href={link.href}
        aria-label={link.label}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/40 hover:text-white/85 transition-colors duration-150"
      >
        <PlatformIcon platform={link.platform} />
      </a>
    ))}
  </div>
);
