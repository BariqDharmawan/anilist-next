import { StickyBoxStyle } from './StickyBoxAction.styled';
import { PropsWithChildren, useState } from 'react';

const StickyBoxAction = ({
	children,
	id,
}: PropsWithChildren<{ id: string }>) => {
	return <StickyBoxStyle id={id}>{children}</StickyBoxStyle>;
};

export default StickyBoxAction;
