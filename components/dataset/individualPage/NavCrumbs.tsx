import Link from "next/link";

export default function DatasetNavCrumbs({
  org,
  dataset,
}: {
  org: { name?: string; title?: string };
  dataset: { name: string; title: string };
}) {
  return (
    <nav>
      <ul className="flex gap-x-8 pt-6 mx-auto custom-container max-w-6xl">
        <li className="flex gap-x-2 align-center flex-col sm:flex-row">
          <Link
            href="/search"
            className="font-semibold text-white underline hover:decoration-2 transition"
            style={{ minWidth: "fit-content" }}
          >

            Datasets
          </Link>
          <Link
            href={`/${org.name}`}
            passHref
            className="font-semibold text-white underline hover:decoration-2 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white mx-0 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {org.title || org.name}
          </Link>
          <span className="font-semibold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white mx-0 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
            {dataset.title || dataset.name}
          </span>
        </li>
      </ul>
    </nav>
  );
}
