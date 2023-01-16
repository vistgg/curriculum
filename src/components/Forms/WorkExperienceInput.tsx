import { Dialog } from "@headlessui/react";
import { ButtonPrimary } from "@lightbringer/components/Button";
import { useTranslation } from "next-i18next";
import { FC, useState } from "react";

export const WorkExperienceInput: FC = () => {
  const { t } = useTranslation(["common", "new-cv"]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((o) => !o);

  return (
    <>
      <ButtonPrimary
        type="button"
        parentClassName="w-full"
        onClick={toggleIsOpen}
      >
        {t("new-cv:fields.work-experience.manage")}
      </ButtonPrimary>

      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full rounded bg-white p-2 md:w-8/12">
            <Dialog.Title className="font-xl font-medium uppercase">
              {t("new-cv:fields.work-experience.manage")}
            </Dialog.Title>
            <Dialog.Description className="mt-[-8px] text-sm font-thin">
              {t("new-cv:fields.work-experience.description")}
            </Dialog.Description>
            <ButtonPrimary parentClassName="w-full" onClick={toggleIsOpen}>
              {t("common:ok")}
            </ButtonPrimary>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
