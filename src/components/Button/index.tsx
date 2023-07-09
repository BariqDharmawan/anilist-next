import type { ComponentProps, PropsWithChildren } from 'react';
import {
	ButtonBaseStyled,
	ButtonIcon,
	ButtonOutlineDanger,
	ButtonOutlinePrimary,
	ButtonOutlineSecondary,
	ButtonTransparent,
} from './Button.styled';

export default function Button({
	children,
	variant = 'transparent',
	...rest
}: PropsWithChildren<
	ComponentProps<'button'> & {
		variant?:
			| 'transparent'
			| 'primary'
			| 'secondary'
			| 'icon'
			| 'outline-secondary'
			| 'outline-primary'
			| 'outline-danger';
	}
>) {
	switch (variant) {
		case 'icon':
			return <ButtonIcon {...rest}>{children}</ButtonIcon>;

		case 'transparent':
			return <ButtonTransparent {...rest}>{children}</ButtonTransparent>;

		case 'primary':
			return <ButtonBaseStyled {...rest}>{children}</ButtonBaseStyled>;

		case 'secondary':
			return <ButtonBaseStyled {...rest}>{children}</ButtonBaseStyled>;

		case 'outline-primary':
			return (
				<ButtonOutlinePrimary {...rest}>
					{children}
				</ButtonOutlinePrimary>
			);

		case 'outline-danger':
			return (
				<ButtonOutlineDanger {...rest}>{children}</ButtonOutlineDanger>
			);
	}
}
