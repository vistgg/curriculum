import { Dialog } from "@headlessui/react";
import {
  ButtonPrimary,
  ButtonUnderline
} from "@lightbringer/components/Button";
import { EducationElement } from "@lightbringer/components/Forms/EducationInput/Element";
import { CVSchemaType, EducationSchemaType } from "@lightbringer/zod/CVSchema";
import { useTranslation } from "next-i18next";
import { FC, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

type EducationInputProps = {
  education: EducationSchemaType[];
  setValue: UseFormSetValue<CVSchemaType>;
};

export const EducationInput: FC<EducationInputProps> = ({
  education,
  setValue
}) => {
  const { t } = useTranslation(["common", "new-cv"]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => setIsOpen((o) => !o);

  const addElement = () => {
    setValue("education", [
      ...education,
      {
        degree: "",
        end: new Date(1),
        fieldOfStudy: "",
        institution: "",
        start: new Date(1)
      }
    ]);
  };

  const editElement = (i: number, editedElement: EducationSchemaType) => {
    const newEducation = education.slice();
    newEducation[i] = editedElement;
    setValue("education", newEducation);
  };

  const deleteElement = (i: number) => {
    setValue(
      "education",
      education.filter((_, index) => index !== i)
    );
  };

  return (
    <>
      <ButtonPrimary
        type="button"
        parentClassName="w-full"
        onClick={toggleIsOpen}
      >
        {t("new-cv:fields.education.manage")}
      </ButtonPrimary>

      <Dialog open={isOpen} onClose={toggleIsOpen}>
        <Dialog.Backdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="h-5/6 w-full rounded bg-white p-2 md:w-8/12">
            <Dialog.Title className="text-xl font-semibold uppercase">
              {t("new-cv:fields.education.manage")}
            </Dialog.Title>
            <Dialog.Description className="mt-[-8px] text-sm font-thin">
              {t("new-cv:fields.education.description")}
            </Dialog.Description>
            <div className="flex flex-1 flex-col space-y-2">
              {education ? (
                <div className="h-full overflow-auto">
                  {education.map((element, index) => (
                    <EducationElement
                      del={deleteElement}
                      edit={editElement}
                      element={element}
                      index={index}
                      key={`${element.degree}`}
                    />
                  ))}
                </div>
              ) : (
                <h3 className="text-lg font-medium">
                  {t("new-cv:fields.education.no-entries")}
                </h3>
              )}
              <ButtonUnderline onClick={addElement}>
                {t("new-cv:fields.education.add")}
              </ButtonUnderline>
            </div>
            <ButtonPrimary parentClassName="w-full" onClick={toggleIsOpen}>
              {t("common:ok")}
            </ButtonPrimary>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};
