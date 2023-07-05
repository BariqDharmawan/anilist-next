import type { ComponentProps, PropsWithChildren } from 'react';
import { ButtonBaseStyled, ButtonTransparent } from './Button.styled';

export default function Button({
	children,
	variant = 'transparent',
	...rest
}: PropsWithChildren<
	ComponentProps<'button'> & {
		variant?: 'transparent' | 'primary' | 'secondary';
	}
>) {
	switch (variant) {
		case 'transparent':
			return <ButtonTransparent {...rest}>{children}</ButtonTransparent>;

		case 'primary':
			return <ButtonBaseStyled {...rest}>{children}</ButtonBaseStyled>;

		case 'secondary':
			return <ButtonBaseStyled {...rest}>{children}</ButtonBaseStyled>;
	}
}
