import { z } from "zod";

export const EducationSchema = z.object({
	degree: z.string().min(1, "Você precisa informar o nome da capacitação"),
	institution: z
		.string()
		.min(1, "Você precisa informar em que instituição é/foi realizada."),
	start: z
		.string()
		.min(1, "Você precisa informar quando começou essa capacitação"),
	end: z.string().optional()
});

export const WorkExperienceSchema = z.object({
	company: z.string().min(1, "Você precisa informar o nome da empresa"),
	jobTitle: z.string().min(1, "Você precisa informar o cargo que ocupou/ocupa"),
	start: z
		.string()
		.min(1, "Você precisa informar quando começou no cargo nessa empresa."),
	end: z.string().optional(),
	responsibilities: z.array(z.string())
});

export const CVSchema = z.object({
	name: z.string().min(1, "Você precisa informar seu nome."),
	photo: z.string().optional(),
	jobTitle: z.string().optional(),
	location: z.string().optional(),
	summary: z
		.string()
		.min(25, "Fale um pouco sobre você.")
		.max(512, "Ok, entendemos que tem bastante coisa, um pouco menos."),
	skills: z.array(z.string()),
	additionalInformation: z.array(z.string()).optional(),
	education: z.array(EducationSchema),
	workExperience: z.array(WorkExperienceSchema)
});

export type CVSchemaType = z.infer<typeof CVSchema>;
export type EducationSchemaType = z.infer<typeof EducationSchema>;
export type WorkExperienceSchemaType = z.infer<typeof WorkExperienceSchema>;
