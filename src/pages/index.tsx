import { Layout } from "@lightbringer/components/Layout";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "navigation"
      ]))
    }
  };
};

export default function Home() {
  const { t } = useTranslation(["common", "navigation"]);

  return (
    <Layout title={t("navigation:home")}>
      <h2>{t("common:app-name")}</h2>
    </Layout>
  );
}
