import { light } from '@/src/theme';
import { StickyBoxStyle } from './StickyBoxAction.styled';
import { ComponentProps, PropsWithChildren } from 'react';

const StickyBoxAction = ({
	children,
	id,
}: PropsWithChildren<{ id: string }>) => {
	return <StickyBoxStyle id={id}>{children}</StickyBoxStyle>;
};

export default StickyBoxAction;
