import { PropsWithChildren, ComponentProps } from 'react';

import { TabsContainer } from './Tabs.styled';

const Tabs = ({
	children,
	...rest
}: PropsWithChildren<ComponentProps<'div'>>) => {
	return <TabsContainer {...rest}>{children}</TabsContainer>;
};

export default Tabs;
