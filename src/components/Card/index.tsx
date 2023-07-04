import { CardBase, CardBodySM, CardBodyXL, CardCover } from './CardStyled';
import { ReactNode } from 'react';

type CardPadding = 's' | 'xl';

export default function Card({
	padding = 'xl',
	children,
	cover,
}: {
	padding: CardPadding;
	children: ReactNode;
	cover?: ReactNode;
}) {
	let cardBody: ReactNode;

	if (padding === 'xl') {
		cardBody = <CardBodyXL>{children}</CardBodyXL>;
	}
	if (padding === 's') {
		cardBody = <CardBodySM>{children}</CardBodySM>;
	}

	return (
		<CardBase>
			{cover && <CardCover>{cover}</CardCover>}
			{cardBody}
		</CardBase>
	);
}
