import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Pen, Plus, Printer } from "lucide-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import nextBase64 from "next-base64";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { getGeneratedCV } from "@lightbringer/utils/getGeneratedCV";

interface CurriculumPageProps {
	curriculumHTML: string;
	dataString: string;
}

export const getServerSideProps: GetServerSideProps<
	CurriculumPageProps
> = async ({ query }) => {
	const input = JSON.parse(nextBase64.decode(query.data as string));

	const html = await getGeneratedCV(input, "default");

	return {
		props: {
			curriculumHTML: html,
			dataString: query.data as string
		}
	};
};

export default function Curriculum({
	curriculumHTML,
	dataString
}: CurriculumPageProps) {
	const router = useRouter();
	const curriculumRef = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({
		content: () => curriculumRef.current
	});

	const startAnew = () => {
		router.push("/");
	};

	const modify = () => {
		router.push(`/?data=${dataString}`);
	};

	return (
		<div className="lg:w-8/10 w-full space-y-3">
			<div className="flex flex-wrap gap-3">
				<ButtonPrimary
					className="flex items-center justify-center gap-x-2"
					onClick={handlePrint}
				>
					<Printer />
					Imprimir
				</ButtonPrimary>
				<ButtonPrimary
					className="flex items-center justify-center gap-x-2"
					onClick={modify}
				>
					<Pen />
					Editar
				</ButtonPrimary>
				<ButtonPrimary
					className="flex items-center justify-center gap-x-2"
					onClick={startAnew}
				>
					<Plus />
					Recomeçar
				</ButtonPrimary>
			</div>
			<div
				ref={curriculumRef}
				dangerouslySetInnerHTML={{ __html: curriculumHTML ?? "" }}
			/>
		</div>
	);
}
