import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonPrimary } from "@lightbringer/components/Button";
import { EducationInput } from "@lightbringer/components/Forms/EducationInput";
import { ImageUpload } from "@lightbringer/components/Forms/ImageUpload";
import { SkillsInput } from "@lightbringer/components/Forms/SkillsInput";
import { TextAreaInput } from "@lightbringer/components/Forms/TextAreaInput";
import { TextInput } from "@lightbringer/components/Forms/TextInput";
import { WorkExperienceInput } from "@lightbringer/components/Forms/WorkExperienceInput";
import { Layout } from "@lightbringer/components/Layout";
import { CVSchema, CVSchemaType } from "@lightbringer/zod/CVSchema";
import axios from "axios";
import { Pen, Plus, Printer, RefreshCcw } from "lucide-react";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tag } from "react-tag-input";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string, [
        "common",
        "navigation",
        "new-cv"
      ]))
    }
  };
};

export default function NewCV() {
  const { t } = useTranslation(["common", "navigation", "new-cv"]);
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    register,
    reset,
    watch
  } = useForm<CVSchemaType>({
    defaultValues: {
      skills: [],
      education: []
    },
    resolver: zodResolver(CVSchema)
  });

  const [skills, setSkills] = useState<Tag[]>([]);
  const [curriculumHTML, setCurriculumHTML] = useState("");

  const submitCurriculum: SubmitHandler<CVSchemaType> = async (input) => {
    const { data } = await axios.post("/api/generate", input);
    setCurriculumHTML(data);
  };

  const resetGeneration = () => setCurriculumHTML("");

  const startAnew = () => {
    setSkills([]);
    reset();
    resetGeneration();
  };

  return (
    <Layout
      className="mx-auto w-full space-y-3 md:w-8/12"
      title={t("navigation:nav.new-cv")}
    >
      <p>New CV</p>

      {curriculumHTML.length > 0 ? (
        <div className="lg:w-8/10 w-full space-y-3">
          <div className="flex flex-wrap gap-1">
            <ButtonPrimary
              className="flex items-center justify-center gap-x-2"
              onClick={handleSubmit(submitCurriculum)}
            >
              <RefreshCcw />
              {t("new-cv:regenerate")}
            </ButtonPrimary>
            <ButtonPrimary
              className="flex items-center justify-center gap-x-2"
              onClick={resetGeneration}
            >
              <Printer />
              {t("new-cv:print")}
            </ButtonPrimary>
            <ButtonPrimary
              className="flex items-center justify-center gap-x-2"
              onClick={resetGeneration}
            >
              <Pen />
              {t("new-cv:edit")}
            </ButtonPrimary>
            <ButtonPrimary
              className="flex items-center justify-center gap-x-2"
              onClick={startAnew}
            >
              <Plus />
              {t("new-cv:start-anew")}
            </ButtonPrimary>
          </div>
          <div dangerouslySetInnerHTML={{ __html: curriculumHTML }} />
        </div>
      ) : (
        <form className="space-y-2" onSubmit={handleSubmit(submitCurriculum)}>
          <div className="md:flex md:gap-x-2">
            <ImageUpload
              currentImage={getValues("photo")}
              label={t("new-cv:fields.photo.title")}
              selectImage={t("new-cv:fields.photo.select-image")}
              uploadingImage={t("new-cv:fields.photo.uploading")}
              onChangePicture={setValue}
            />
            <div className="flex w-full flex-col">
              <TextInput
                autoComplete="off"
                label={t("new-cv:fields.name.title")}
                placeholder={t("new-cv:fields.name.eg")}
                error={errors.name}
                {...register("name")}
              />
              <TextInput
                autoComplete="off"
                error={errors.jobTitle}
                label={t("new-cv:fields.job-title.title")}
                placeholder={t("new-cv:fields.job-title.eg")}
                {...register("jobTitle")}
              />
              <TextInput
                autoComplete="off"
                error={errors.location}
                label={t("new-cv:fields.location.title")}
                placeholder={t("new-cv:fields.location.eg")}
                {...register("location")}
              />
            </div>
          </div>

          <SkillsInput
            eg={t("new-cv:fields.skills.eg")}
            help={t("new-cv:fields.skills.help")}
            title={t("new-cv:fields.skills.title")}
            getValues={getValues}
            setValue={setValue}
            setSkills={setSkills}
            skills={skills}
          />

          <TextAreaInput
            autoComplete="off"
            style={{
              resize: "none"
            }}
            error={errors.summary}
            label={t("new-cv:fields.summary.title")}
            placeholder={t("new-cv:fields.summary.eg")}
            {...register("summary")}
          />

          <div className="flex gap-x-2">
            <EducationInput
              education={watch("education")}
              setValue={setValue}
            />
            <WorkExperienceInput />
          </div>

          <ButtonPrimary type="submit" parentClassName="w-full">
            {t("new-cv:generate")}
          </ButtonPrimary>
        </form>
      )}
    </Layout>
  );
}
