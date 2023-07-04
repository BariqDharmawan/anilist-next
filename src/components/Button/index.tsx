import React from 'react';
import type { PropsWithChildren, ComponentProps } from 'react';
import { ButtonBaseStyled } from './Button.styled';

export default function Button({
	children,
	...rest
}: PropsWithChildren<ComponentProps<'button'>>) {
	//   Put Logic here

	return <ButtonBaseStyled {...rest}>{children}</ButtonBaseStyled>;
}
