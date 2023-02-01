import { FC } from "react";
import { X } from "lucide-react";

import { WorkExperienceSchemaType } from "@lightbringer/zod/CVSchema";

type WorkExperienceElementProps = {
	element: WorkExperienceSchemaType;
	index: number;
	del: (i: number) => void;
};

export const WorkExperienceElement: FC<WorkExperienceElementProps> = ({
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
				{element.company}
			</h4>
			<p>
				<strong>{element.jobTitle}</strong> | {element.start} - {element.end}
			</p>
			<p>
				{element.responsibilities.map((r) => (
					<span
						className="before:content-['·_'] after:content-['_·'] first:before:content-[''] last:after:content-['']"
						key={r}
					>
						{r}
					</span>
				))}
			</p>
		</div>
	);
};
