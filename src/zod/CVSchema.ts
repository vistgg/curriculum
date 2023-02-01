import { z } from "zod";

export const EducationSchema = z.object({
	degree: z.string(),
	institution: z.string(),
	start: z.string(),
	end: z.string()
});

export const WorkExperienceSchema = z.object({
	company: z.string(),
	jobTitle: z.string(),
	start: z.string(),
	end: z.string(),
	responsibilities: z.array(z.string())
});

export const CVSchema = z.object({
	name: z.string().min(1),
	photo: z.string().optional(),
	jobTitle: z.string().optional(),
	location: z.string().optional(),
	summary: z.string().min(25).max(512),
	skills: z.array(z.string()),
	additionalInformation: z.array(z.string()).optional(),
	education: z.array(EducationSchema),
	workExperience: z.array(WorkExperienceSchema)
});

export type CVSchemaType = z.infer<typeof CVSchema>;
export type EducationSchemaType = z.infer<typeof EducationSchema>;
export type WorkExperienceSchemaType = z.infer<typeof WorkExperienceSchema>;
