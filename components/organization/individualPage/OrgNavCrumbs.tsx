import Link from "next/link";

export default function OrgNavCrumbs({
  org,
}: {
  org: { name?: string; title?: string };
}) {
  return (
    <nav>
      <ul className="flex gap-x-8 mx-auto custom-container max-w-6xl pt-6">
        <li className="flex gap-x-2 align-center flex-col sm:flex-row">
          <Link
            href="/organisations"
            className="font-semibold text-white underline hover:decoration-2 transiton"
            style={{ minWidth: "fit-content" }}
          >
            Organisations
          </Link>
          {org.name && org.title && (
            <div className="font-semibold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-white inline"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
              <span>{org.title}</span>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}
