import { Dispatch, FC, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { Info } from "lucide-react";

import { WorkExperienceSchemaType } from "@lightbringer/zod/CVSchema";

interface WorkExperienceResponsibilitiesProps {
	responsibilities: Tag[];
	setResponsibilities: Dispatch<SetStateAction<Tag[]>>;
	setValue: UseFormSetValue<WorkExperienceSchemaType>;
	getValues: UseFormGetValues<WorkExperienceSchemaType>;
}

const KeyCodes = {
	comma: 188,
	enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const WorkExperienceResponsibilities: FC<
	WorkExperienceResponsibilitiesProps
> = ({ getValues, responsibilities, setResponsibilities, setValue }) => {
	const handleDelete = (i: number) => {
		setResponsibilities(responsibilities.filter((_, index) => index !== i));
		setValue(
			"responsibilities",
			getValues("responsibilities").filter((_, index) => index !== i)
		);
	};

	const handleAddition = (tag: Tag) => {
		setResponsibilities([...responsibilities, tag]);
		setValue("responsibilities", [...getValues("responsibilities"), tag.text]);
	};

	const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
		const newTags = responsibilities.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		const currentTags = getValues("responsibilities");
		currentTags.splice(currPos, 1);
		currentTags.splice(newPos, 0, tag.text);

		setValue("responsibilities", currentTags);

		// re-render
		setResponsibilities(newTags);
	};

	return (
		<div className="flex flex-col gap-y-1">
			<label
				htmlFor="skillstags"
				className="block text-sm font-bold text-gray-700"
			>
				Responsabilidades
			</label>

			<span className="text-muted flex gap-x-1 text-xs italic">
				<Info size={16} />
				Aperte &lsquo;Enter&rsquo; ou &lsquo;Vírgula (,)&rsquo; para cada
				habilidade que adicionar.
			</span>

			<ReactTags
				classNames={{
					tagInput: "w-full pb-2",
					tagInputField:
						"form-control w-full border-gray-300 rounded border border-solid bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-primary-600 focus:bg-white focus:text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary-600",
					tag: "bg-primary-700/75 px-3 py-1 text-center items-center justify-center mx-0.5 rounded text-primary-100",
					remove: "ml-2 text-xl text-gray-300 hover:text-gray-100",
					selected: "flex flex-wrap gap-y-1 w-full"
				}}
				autofocus={false}
				id="skillstags"
				name="skillstags"
				tags={responsibilities}
				placeholder="ex.: Gestão de Risco, Planejamento Estratégico"
				delimiters={delimiters}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				inputFieldPosition="top"
			/>
		</div>
	);
};
