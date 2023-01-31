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
	const { handleSubmit, register } = useForm<EducationSchemaType>({
		resolver: zodResolver(EducationSchema)
	});

	const submitEducation: SubmitHandler<EducationSchemaType> = async (input) => {
		Promise.allSettled([addElement(input)]).then(() =>
			triggerRef.current?.click()
		);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger
				ref={triggerRef}
				className="flex gap-x-1 font-medium text-primary-700 hover:underline hover:decoration-primary-700 hover:underline-offset-2"
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
					<Dialog.Close className="absolute right-6 top-6 rounded-lg text-zinc-400 hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background">
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
							label="Grau"
							placeholder="ex.: Bacharelado em Engenharia Elétrica"
							{...register("degree")}
						/>
						<TextInput
							label="Instituição"
							placeholder="ex.: Instituto Federal do Rio de Janeiro, Escola Estadual..."
							{...register("institution")}
						/>

						<div className="flex gap-x-2">
							<TextInput
								label="Data de Início"
								placeholder="ex.: 2006, 21/03/2021"
								{...register("start")}
							/>
							<TextInput
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
