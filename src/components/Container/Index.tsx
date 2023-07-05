import { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { ContainerBase } from './Container.styled';

const Container = ({
	id = '',
	className = '',
	children,
	...props
}: PropsWithChildren<
	ComponentProps<'div'> & {
		id?: string;
		className?: string;
		children: ReactNode;
	}
>) => {
	return (
		<ContainerBase id={id} className={className} {...props}>
			{children}
		</ContainerBase>
	);
};

export default Container;
