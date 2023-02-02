import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";

import { ButtonPrimary } from "@lightbringer/components/Button";
import { TextInput } from "@lightbringer/components/Forms/TextInput";
import {
	EducationSchema,
	EducationSchemaType
} from "@lightbringer/zod/CVSchema";

interface AddEducationProps {
	addElement: (element: EducationSchemaType) => void;
}

export function AddEducation({ addElement }: AddEducationProps) {
	const triggerRef = useRef<HTMLButtonElement>(null);
	const {
		handleSubmit,
		formState: { errors },
		reset,
		register
	} = useForm<EducationSchemaType>({
		resolver: zodResolver(EducationSchema)
	});

	const submitEducation: SubmitHandler<EducationSchemaType> = async (input) => {
		Promise.allSettled([
			addElement({
				...input,
				end: input.end && input.end.length > 0 ? input.end : "atual"
			})
		]).then(() => {
			reset();
			triggerRef.current?.click();
		});
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger
				ref={triggerRef}
				className="mt-6 flex w-fit gap-x-1 rounded-lg font-medium text-primary-700 focus:outline-none focus:outline-offset-2 focus:outline-primary-700"
				type="button"
			>
				<Plus
					className="text-violet-500"
					size={20}
				/>
				Nova Capacitação
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/80" />
				<Dialog.Content className="absolute top-1/2 left-1/2 flex w-full max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-background p-6">
					<Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-600 focus:outline-none focus:outline-offset-2 focus:outline-primary-700">
						<X
							size={24}
							aria-label="Fechar"
						/>
					</Dialog.Close>
					<Dialog.Title className="text-3xl font-extrabold leading-tight">
						Nova Capacitação
					</Dialog.Title>
					<form className="flex flex-col gap-y-2">
						<TextInput
							error={errors.degree}
							label="Nome*"
							placeholder="ex.: Bacharelado em Engenharia Elétrica"
							{...register("degree")}
						/>
						<TextInput
							error={errors.institution}
							label="Instituição*"
							placeholder="ex.: Instituto Federal do Rio de Janeiro, Escola Estadual..."
							{...register("institution")}
						/>

						<div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-2">
							<TextInput
								error={errors.start}
								label="Data de Início*"
								placeholder="ex.: 2006, 21/03/2021"
								{...register("start")}
							/>
							<TextInput
								error={errors.end}
								label="Data de Conclusão"
								placeholder="ex.: 2024, 01/03/2026, atual"
								{...register("end")}
							/>
						</div>
						<ButtonPrimary
							type="button"
							className="mt-2"
							onClick={handleSubmit(submitEducation)}
						>
							Adicionar
						</ButtonPrimary>
					</form>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
