import { FC, useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, Plus, X } from "lucide-react";

import {
	ButtonPrimary,
	ButtonPrimaryOutline
} from "@lightbringer/components/Button";
import { AddWorkExperience } from "@lightbringer/components/Forms/WorkExperienceInput/Add";
import { WorkExperienceElement } from "@lightbringer/components/Forms/WorkExperienceInput/Element";
import {
	CVSchemaType,
	WorkExperienceSchemaType
} from "@lightbringer/zod/CVSchema";

type WorkExperienceInputProps = {
	workExperience: WorkExperienceSchemaType[];
	setValue: UseFormSetValue<CVSchemaType>;
};

export const WorkExperienceInput: FC<WorkExperienceInputProps> = ({
	workExperience,
	setValue
}) => {
	const triggerRef = useRef<HTMLButtonElement>(null);

	const addElement = (element: WorkExperienceSchemaType) => {
		setValue("workExperience", [...workExperience, element]);
	};

	const deleteElement = (i: number) => {
		setValue(
			"workExperience",
			workExperience.filter((_, index) => index !== i)
		);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger
				className="flex w-full items-center gap-3 rounded-lg border border-primary-600 px-6 py-4 font-semibold text-primary-800 transition-colors hover:border-primary-700 hover:bg-primary-100 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-background"
				ref={triggerRef}
				type="button"
			>
				<Plus
					className="text-violet-500"
					size={20}
				/>
				Gerenciar Experiências de Trabalho
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
				<Dialog.Content className="absolute top-1/2 left-1/2 flex h-[75%] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-background p-6">
					<Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">
						<X
							size={24}
							aria-label="Fechar"
						/>
					</Dialog.Close>
					<Dialog.Title className="text-3xl font-extrabold leading-tight">
						Minhas Experiências de Trabalho
					</Dialog.Title>
					<Dialog.Description>
						Onde você trabalhou, com que cargo e quais responsabilidades.
					</Dialog.Description>

					<AddWorkExperience addElement={addElement} />
					<div className="flex flex-1 flex-col space-y-0.5 overflow-auto">
						{workExperience.length > 0 ? (
							workExperience.map((element, index) => (
								<WorkExperienceElement
									del={deleteElement}
									element={element}
									index={index}
									key={`${element.company}-${element.jobTitle}`}
								/>
							))
						) : (
							<h3 className="text-lg font-medium">
								Você ainda não adicionou uma capacitação.
							</h3>
						)}
					</div>
					<ButtonPrimary
						className="w-full"
						onClick={() => triggerRef.current?.click()}
					>
						<Check />
						Pronto
					</ButtonPrimary>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
