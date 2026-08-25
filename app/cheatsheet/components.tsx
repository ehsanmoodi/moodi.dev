"use client";

import { useEffect, useState } from "react";
import { highlight } from "sugar-high";

// Renders `code`-quoted spans inside table cell text as inline <code>.
function renderInline(text: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.startsWith("`") && part.endsWith("`") ? (
      <code key={i}>{part.slice(1, -1)}</code>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function KeyTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} scope="col">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>{renderInline(cell)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const html = highlight(code.trim());

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — ignore.
    }
  }

  return (
    <div className="group relative">
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
        className="print:hidden absolute top-2.5 right-2.5 rounded-md border border-neutral-300 bg-white/90 px-2 py-1 text-xs text-neutral-600 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-[#181818]/90 dark:text-neutral-400"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

export function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="!mt-3 text-sm text-neutral-500 dark:text-neutral-400">
      {children}
    </p>
  );
}

export function Heading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2 id={id}>
      <a href={`#${id}`} className="anchor" />
      {children}
    </h2>
  );
}

export type NavSection = { id: string; label: string };

export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const ids = sections.map(({ id }) => id);
    const offset = 88; // sticky nav height + breathing room
    let ticking = false;

    function updateActive() {
      ticking = false;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Cheat sheet sections"
      className="print:hidden sticky top-0 z-10 mb-8 overflow-x-auto rounded-lg border border-neutral-200 bg-white/95 py-2 backdrop-blur-sm dark:border-neutral-800 dark:bg-[#121212]/95"
    >
      <ul className="flex w-max gap-1 px-2 whitespace-nowrap">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className={`inline-block rounded-md px-2.5 py-1 text-sm no-underline transition-colors ${
                active === id
                  ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
                  : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
              }`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function BackToTop() {
  return (
    <p className="print:hidden mt-12 text-sm">
      <a href="#top">↑ Back to top</a>
    </p>
  );
}
