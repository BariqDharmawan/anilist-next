import { PropsWithChildren, ComponentProps } from 'react';
import { TabsItemStyle } from './Tabs.styled';

export default function TabsItem({
	children,
	...rest
}: PropsWithChildren<ComponentProps<'button'>>) {
	return <TabsItemStyle {...rest}>{children}</TabsItemStyle>;
}
