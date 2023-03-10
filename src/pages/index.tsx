import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tag } from "react-tag-input";
import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { EducationInput } from "@lightbringer/components/Forms/EducationInput";
import { ImageUpload } from "@lightbringer/components/Forms/ImageUpload";
import { SkillsInput } from "@lightbringer/components/Forms/SkillsInput";
import { TextAreaInput } from "@lightbringer/components/Forms/TextAreaInput";
import { TextInput } from "@lightbringer/components/Forms/TextInput";
import { WorkExperienceInput } from "@lightbringer/components/Forms/WorkExperienceInput";
import { Layout } from "@lightbringer/components/Layout";
import { CVSchema, CVSchemaType } from "@lightbringer/zod/CVSchema";

export default function NewCV() {
	const router = useRouter();
	const {
		formState: { errors },
		getValues,
		handleSubmit,
		setValue,
		register,
		watch
	} = useForm<CVSchemaType>({
		defaultValues: router.query.data
			? JSON.parse(nextBase64.decode(router.query.data as string))
			: {
					skills: [],
					education: [],
					workExperience: []
			  },
		resolver: zodResolver(CVSchema)
	});

	const [skills, setSkills] = useState<Tag[]>([]);

	const submitCurriculum: SubmitHandler<CVSchemaType> = async (input) => {
		router.push(`/curriculum?data=${nextBase64.encode(JSON.stringify(input))}`);
	};

	return (
		<Layout
			className="mx-auto w-full space-y-3 md:w-8/12"
			title="Faça seu Curriculum Vitae Fácil"
		>
			<Head>
				<link
					rel="canonical"
					href="https://cv.vist.gg/"
				/>
				<title>Faça seu curriculum - CV Fácil</title>
			</Head>
			<h2 className="-mb-4 text-center text-3xl font-bold">
				Curriculum Vitae Fácil
			</h2>
			<p className="text-center text-sm text-zinc-600">
				O jeito mais fácil de montar seu curriculum na internet.
			</p>
			<ul className="list-inside list-disc">
				<li className="list-none text-sm uppercase text-zinc-800">Atenção</li>
				<li className="text-xs text-zinc-500">
					Campos com <strong>*</strong> são obrigatórios
				</li>
				<li className="text-xs text-zinc-500">
					Nenhum dado é salvo em nossos servidores.
				</li>
				<li className="text-xs text-zinc-500">
					Em breve: personalização do modelo de currículum
				</li>
			</ul>
			<form
				className="space-y-2"
				onSubmit={handleSubmit(submitCurriculum)}
			>
				<div className="md:flex md:gap-x-2">
					<ImageUpload
						currentImage={getValues("photo")}
						label="Sua Foto"
						selectImage="Selecionar Imagem"
						uploadingImage="Fazendo upload"
						onChangePicture={setValue}
					/>
					<div className="flex w-full flex-col space-y-2 lg:justify-between lg:space-y-0">
						<TextInput
							autoComplete="off"
							label="Nome*"
							placeholder="ex.: João Carlos da Silva e Santos"
							error={errors.name}
							{...register("name")}
						/>
						<TextInput
							autoComplete="off"
							error={errors.jobTitle}
							label="Cargo Atual"
							placeholder="ex.: Engenheiro Chefe"
							{...register("jobTitle")}
						/>
						<TextInput
							autoComplete="off"
							error={errors.location}
							label="Localização"
							placeholder="ex.: São Paulo, SP, Brasil"
							{...register("location")}
						/>
					</div>
				</div>

				<SkillsInput
					eg="ex.: React, AutoCAD, Photoshop"
					help="Aperte 'Enter' ou 'Vírgula (,)' para cada habilidade que adicionar."
					title="Habilidades*"
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
					label="Um pouco sobre você*"
					placeholder="Uma descrição do que você já fez, como é, como pretende evoluir..."
					{...register("summary")}
				/>

				<div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2">
					<EducationInput
						education={watch("education")}
						setValue={setValue}
					/>
					<WorkExperienceInput
						setValue={setValue}
						workExperience={watch("workExperience")}
					/>
				</div>

				<ButtonPrimary
					type="submit"
					className="w-full"
				>
					Gerar
				</ButtonPrimary>
			</form>
		</Layout>
	);
}
