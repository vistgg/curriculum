import { FC } from "react";
import { X } from "lucide-react";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { EducationSchemaType } from "@lightbringer/zod/CVSchema";

type EducationElementProps = {
	element: EducationSchemaType;
	index: number;
	del: (i: number) => void;
};

export const EducationElement: FC<EducationElementProps> = ({
	del,
	element,
	index
}) => {
	return (
		<div className="relative rounded-lg border-2 border-zinc-300 p-1">
			<button
				className="absolute right-2 top-2 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background"
				onClick={() => del(index)}
			>
				<X />
			</button>
			<h4 className="border-b border-b-primary-500/30 text-lg font-light">
				{element.degree}
			</h4>
			<p>
				<strong>{element.institution}</strong> | {element.start} - {element.end}
			</p>
		</div>
	);
};
