import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.jpeg"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <h1 className="mb-8 text-2xl font-medium">Ehsan Moodi</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>Senior front-end developer:</p>
        <ul>
          <li>Passionate about clean, accessible, and maintainable code</li>
          <li>
            Proficient in JavaScript, React.js, TypeScript, and modern
            frameworks
          </li>
          <li>Effective in collaborative, agile environments</li>
        </ul>
      </div>
    </section>
  );
}
