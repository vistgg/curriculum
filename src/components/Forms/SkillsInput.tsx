import { Dispatch, FC, SetStateAction } from "react";
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { Info } from "lucide-react";

import { CVSchemaType } from "@lightbringer/zod/CVSchema";

type SkillsInputProps = {
	title: string;
	help: string;
	eg: string;
	skills: Tag[];
	setSkills: Dispatch<SetStateAction<Tag[]>>;
	setValue: UseFormSetValue<CVSchemaType>;
	getValues: UseFormGetValues<CVSchemaType>;
};

const KeyCodes = {
	comma: 188,
	enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export const SkillsInput: FC<SkillsInputProps> = ({
	getValues,
	setSkills,
	setValue,
	skills,
	eg,
	help,
	title
}) => {
	const handleDelete = (i: number) => {
		setSkills(skills.filter((_, index) => index !== i));
		setValue(
			"skills",
			getValues("skills").filter((_, index) => index !== i)
		);
	};

	const handleAddition = (tag: Tag) => {
		setSkills([...skills, tag]);
		setValue("skills", [...getValues("skills"), tag.text]);
	};

	const handleInputBlur = (text: string) => {
		if (text) {
			const newTag: Tag = {
				id: text,
				text: text
			};

			handleAddition(newTag);
		}
	};

	const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
		const newTags = skills.slice();

		newTags.splice(currPos, 1);
		newTags.splice(newPos, 0, tag);

		const currentTags = getValues("skills");
		currentTags.splice(currPos, 1);
		currentTags.splice(newPos, 0, tag.text);

		setValue("skills", currentTags);

		// re-render
		setSkills(newTags);
	};

	return (
		<div className="flex flex-col gap-y-1">
			<label
				htmlFor="skillstags"
				className="block text-sm font-bold text-gray-700"
			>
				{title}
			</label>

			<span className="text-muted flex gap-x-1 text-xs italic">
				<Info size={16} />
				{help}
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
				handleInputBlur={handleInputBlur}
				autofocus={false}
				id="skillstags"
				name="skillstags"
				tags={skills}
				placeholder={eg}
				delimiters={delimiters}
				handleDelete={handleDelete}
				handleAddition={handleAddition}
				handleDrag={handleDrag}
				inputFieldPosition="top"
			/>
		</div>
	);
};
