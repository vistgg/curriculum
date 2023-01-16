import { data } from "@lightbringer/components/Footer/data";
import { useTranslation } from "next-i18next";
import Link from "next/link";

export function Footer() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <footer className="body-font w-full bg-gray-100 text-gray-700">
      <div className="md:flex-no-wrap container mx-auto flex flex-col flex-wrap px-5 py-12 md:flex-row md:items-center lg:items-start">
        <div className="mx-auto w-64 shrink-0 text-center md:mx-0 md:text-left">
          <Link
            className="title-font flex items-center justify-center text-2xl font-medium text-gray-900 md:justify-start"
            href="/"
          >
            {t("common:app-name")}
          </Link>
          <p className="mt-2 text-sm text-gray-500">{t("common:app-call")}</p>
        </div>
        <div className="mt-10 -mb-10 flex grow flex-wrap text-center md:mt-0 md:pl-20 md:text-left">
          {data.map((col) => (
            <div className="w-full px-4 md:w-1/2 lg:w-1/3" key={col.title}>
              <h2 className="title-font mb-3 text-sm font-medium uppercase tracking-widest text-gray-900">
                {t(col.title)}
              </h2>
              <nav className="mb-10 list-none">
                {col.links.map((link) => (
                  <li className="mt-3" key={link.title}>
                    <Link
                      className="cursor-pointer text-gray-500 hover:text-gray-900"
                      href={link.href}
                    >
                      {t(link.title)}
                    </Link>
                  </li>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
