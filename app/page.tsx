import Image from "next/image";

export default function Page() {
  return (
    <section className="minimal-home">
      <Image
        src="/profile.jpeg"
        alt="Ehsan Moodi"
        width={520}
        height={650}
        priority
        className="minimal-portrait"
      />
      <h1 className="minimal-tagline">
        Full-stack developer building thoughtful digital experiences.
      </h1>
      <p className="minimal-supporting-text">
        AI enthusiast using AI tools to move from idea to product faster.
      </p>
    </section>
  );
}
