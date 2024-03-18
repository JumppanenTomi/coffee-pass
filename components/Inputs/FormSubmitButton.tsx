"use client";

import {useFormStatus} from "react-dom";
import {type ComponentProps} from "react";

type Props = ComponentProps<"button"> & {
	pendingText?: string;
};

export function FormSubmitButton({children, pendingText, ...props}: Props) {
	const {pending, action} = useFormStatus();

	const isPending = pending && action === props.formAction;

	return (
		<button {...props} className={'btn-primary w-full'} type="submit" aria-disabled={pending}>
			{isPending ? pendingText : children}
		</button>
	);
}
