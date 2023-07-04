import { CardSM, CardXL } from './CardStyled';
import { ReactNode } from 'react';

type CardPadding = 's' | 'xl';

export default function Card({
	padding = 'xl',
	children,
}: {
	padding: CardPadding;
	children: ReactNode;
}) {
	if (padding === 'xl') {
		return <CardXL>{children}</CardXL>;
	}
	if (padding === 's') {
		return <CardSM>{children}</CardSM>;
	}
}
