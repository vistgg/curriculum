import { FC, useRef } from "react";
import { UseFormSetValue } from "react-hook-form";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, GraduationCap, X } from "lucide-react";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { AddEducation } from "@lightbringer/components/Forms/EducationInput/Add";
import { EducationElement } from "@lightbringer/components/Forms/EducationInput/Element";
import { CVSchemaType, EducationSchemaType } from "@lightbringer/zod/CVSchema";

type EducationInputProps = {
	education: EducationSchemaType[];
	setValue: UseFormSetValue<CVSchemaType>;
};

export const EducationInput: FC<EducationInputProps> = ({
	education,
	setValue
}) => {
	const triggerRef = useRef<HTMLButtonElement>(null);

	const addElement = (element: EducationSchemaType) => {
		setValue("education", [...education, element]);
	};

	const deleteElement = (i: number) => {
		setValue(
			"education",
			education.filter((_, index) => index !== i)
		);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger
				ref={triggerRef}
				className="flex w-full items-center gap-3 rounded-lg border border-primary-600 px-6 py-4 font-semibold text-primary-800 transition-colors hover:border-primary-700 hover:bg-primary-100 hover:text-primary-900 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-offset-2 focus:ring-offset-background"
				type="button"
			>
				<GraduationCap
					className="text-violet-500"
					size={20}
				/>
				Capacitações
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
				<Dialog.Content className="absolute top-1/2 left-1/2 flex h-[75%] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-background p-6">
					<Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-600 focus:outline-none focus:outline-offset-2 focus:outline-primary-700">
						<X
							size={24}
							aria-label="Fechar"
						/>
					</Dialog.Close>
					<Dialog.Title className="text-3xl font-extrabold leading-tight">
						Minhas Capacitações
					</Dialog.Title>
					<Dialog.Description>
						O que você cursou, seja bacharelado, licenciatura, o que for.
					</Dialog.Description>

					<AddEducation addElement={addElement} />
					<div className="mt-2 flex flex-1 flex-col space-y-0.5 overflow-auto">
						{education.length > 0 ? (
							education.map((element, index) => (
								<EducationElement
									del={deleteElement}
									element={element}
									index={index}
									key={`${element.degree}`}
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
