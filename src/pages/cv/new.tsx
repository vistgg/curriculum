import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Tag } from "react-tag-input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pen, Plus, Printer, RefreshCcw } from "lucide-react";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { EducationInput } from "@lightbringer/components/Forms/EducationInput";
import { ImageUpload } from "@lightbringer/components/Forms/ImageUpload";
import { SkillsInput } from "@lightbringer/components/Forms/SkillsInput";
import { TextAreaInput } from "@lightbringer/components/Forms/TextAreaInput";
import { TextInput } from "@lightbringer/components/Forms/TextInput";
import { Layout } from "@lightbringer/components/Layout";
import { CVSchema, CVSchemaType } from "@lightbringer/zod/CVSchema";

export default function NewCV() {
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
			title="Novo CV"
		>
			{curriculumHTML.length > 0 ? (
				<div className="lg:w-8/10 w-full space-y-3">
					<div className="flex flex-wrap gap-1">
						<ButtonPrimary
							className="flex items-center justify-center gap-x-2"
							onClick={handleSubmit(submitCurriculum)}
						>
							<RefreshCcw />
							Gerar Novamente
						</ButtonPrimary>
						<ButtonPrimary
							className="flex items-center justify-center gap-x-2"
							onClick={resetGeneration}
						>
							<Printer />
							Imprimir
						</ButtonPrimary>
						<ButtonPrimary
							className="flex items-center justify-center gap-x-2"
							onClick={resetGeneration}
						>
							<Pen />
							Editar
						</ButtonPrimary>
						<ButtonPrimary
							className="flex items-center justify-center gap-x-2"
							onClick={startAnew}
						>
							<Plus />
							Começar novamente
						</ButtonPrimary>
					</div>
					<div dangerouslySetInnerHTML={{ __html: curriculumHTML }} />
				</div>
			) : (
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
						<div className="flex w-full flex-col">
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
						help="Aperte 'Enter' ou 'Vírgula (,)' para cada habilidade de adicionar."
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

					<div className="flex gap-x-2">
						<EducationInput
							education={watch("education")}
							setValue={setValue}
						/>
					</div>

					<ButtonPrimary
						type="submit"
						className="w-full"
					>
						Gerar
					</ButtonPrimary>
				</form>
			)}
		</Layout>
	);
}
