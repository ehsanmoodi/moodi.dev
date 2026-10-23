import Image from "next/image";

export default function Page() {
  return (
    <section className="home-c">
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

      <div className="home-c-content">
        <main className="home-c-main">
          <h1 className="home-c-name">
            <span>Ehsan</span>
            <Image
              src="/portrait-name.jpg"
              alt="Portrait of Ehsan Steven Moodi"
              width={156}
              height={108}
              priority
              className="home-c-portrait"
            />
            <em>Steven</em>
            <span>Moodi</span>
          </h1>

          <div className="home-c-divider" />

          <h2 className="home-c-headline">
            I build web and mobile products,{" "}
            <em>from first idea to production.</em>
          </h2>

          <p className="home-c-support">
            Full-stack engineer working with <strong>React</strong>,{" "}
            <strong>Next.js</strong>, <strong>Laravel</strong> and{" "}
            <strong>Flutter</strong>. AI tools help me get from idea to product
            faster.
          </p>
        </main>
      </div>
    </section>
  );
}
