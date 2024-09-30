import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white ">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between py-6 h-[72px] sm:h-[108px] md:h-[139.6px] lg:h-[159.59px]"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-12">
          <span className="sr-only">Datopian</span>
          <Link href="/" className="max-w-[32.349vw]">
            <img
              src="/images/logos/site-logo.svg"
              width="352px"
              height="75px"
              alt="Portal"
            ></img>
          </Link>
          <div className="hidden lg:flex lg:gap-x-12">
            <li className="flex gap-x-8 align-center">
              <Link href="/search" className="font-semibold text-secondary my-auto">
                DATASETS
              </Link>
              <Link
                href="/organizations"
                className="font-semibold text-secondary my-auto"
              >
                ORGS
              </Link>
              <Link href="/groups" className="font-semibold text-secondary my-auto">
                GROUPS
              </Link>
              <Link href="/about" className="font-semibold text-secondary my-auto">
                ABOUT
              </Link>
            </li>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center p-2 text-accent border border-2 border-accent bg-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-accent px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">London Borough of Hounslow</span>
            <Link href="/" className="-m-1.5 p-1.5 sm:hidden">
              <img
                src="/images/logos/MainLogo.svg"

                height="60px"
                alt="Portal"
              ></img>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 flex flex-col">
                <Link
                  href="/search"
                  className="font-semibold text-white my-auto"
                >
                  DATASETS
                </Link>
                <Link
                  href="/organizations"
                  className="font-semibold text-white my-auto"
                >
                  ORGS
                </Link>
                <Link
                  href="/groups"
                  className="font-semibold text-white my-auto"
                >
                  GROUPS
                </Link>
                <Link
                  href="/about"
                  className="font-semibold text-white my-auto"
                >
                  ABOUT
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
