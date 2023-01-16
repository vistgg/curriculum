import { useTranslation } from "next-i18next";
import Head from "next/head";
import { DetailedHTMLProps, HTMLAttributes } from "react";

type LayoutProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
};

export function Layout({ children, title, ...rest }: Base<LayoutProps>) {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <div {...rest}>
      <Head>
        <title>{title + " - " + t("common:app-name")}</title>
      </Head>
      {children}
    </div>
  );
}
