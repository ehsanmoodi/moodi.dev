import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects by Ehsan Moodi",
};

export default function Projects() {
  return (
    <section className="projects-c">
      <svg
        className="home-c-grain"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="grain-light">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.12 0" />
          </filter>
          <filter id="grain-dark">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" />
      </svg>

      <div className="projects-c-content">
        <header className="projects-c-header">
          <div className="projects-c-divider" aria-hidden="true" />
          <h1 className="projects-c-title">Projects</h1>
          <p className="projects-c-sub">
            A selection of products I&apos;ve built and shipped.
          </p>
        </header>

        <ul className="projects-c-list">
          {projects.map((project) => (
            <li key={project.url}>
              <Link
                href={project.url}
                className="projects-c-item"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="projects-c-item-title">{project.title}</span>
                {project.description ? (
                  <span className="projects-c-item-desc">
                    {project.description}
                  </span>
                ) : (
                  <span className="projects-c-item-desc projects-c-item-desc-empty">
                    —
                  </span>
                )}
                <svg
                  className="projects-c-item-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
