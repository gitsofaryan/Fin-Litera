import * as React from "react"

// import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
// import { ModeToggle } from "@/components/mode-toggle"

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href="https://finlitera.com"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Finlitera
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/finlitera"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-right">
          © {new Date().getFullYear()} Finlitera. All rights reserved.
        </p>
      </div>
    </footer>
  );
}