/* eslint-disable no-var */
import { ReactNode } from "react";
import { PrismaClient } from "@prisma/client";
import { SupabaseClient } from "@supabase/supabase-js";

declare global {
	type Base<T = object> = {
		children?: ReactNode;
	} & T;

	var prisma: PrismaClient;
	var supabase: SupabaseClient;

	namespace NodeJS {
		interface ProcessEnv {
			NEXTAUTH_SECRET: string;
			EMAIL_SERVER_HOST: string;
			EMAIL_SERVER_PORT: number;
			EMAIL_SERVER_USER: string;
			EMAIL_SERVER_PASSWORD: string;
			EMAIL_FROM: string;
			GOOGLE_ID: string;
			GOOGLE_SECRET: string;
			SUPABASE_URL: string;
			SUPABASE_KEY: string;
			SUPABASE_BUCKET: string;
		}
	}
}
