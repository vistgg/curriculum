import { z } from "zod";

export const EducationSchema = z.object({
	degree: z.string(),
	institution: z.string(),
	start: z.string(),
	end: z.string()
});

export const CVSchema = z.object({
	name: z.string().min(1),
	photo: z.string().optional(),
	jobTitle: z.string().optional(),
	location: z.string().optional(),
	summary: z.string().min(25).max(512),
	skills: z.array(z.string()),
	additionalInformation: z.array(z.string()).optional(),
	education: z.array(EducationSchema)
});

export type CVSchemaType = z.infer<typeof CVSchema>;
export type EducationSchemaType = z.infer<typeof EducationSchema>;
