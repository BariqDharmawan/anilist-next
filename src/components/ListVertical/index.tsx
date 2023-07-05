import type { CSSProperties, PropsWithChildren } from 'react';
import { ListVerticalStyle } from './ListVerticalStyle.styled';

const ListVertical = ({
	children,
	itemList,
	style,
}: PropsWithChildren<{ itemList?: string[]; style?: CSSProperties }>) => {
	return (
		<ListVerticalStyle style={style}>
			{itemList &&
				itemList.map((item, index) => (
					<li key={`item-${index}`}>{item}</li>
				))}
			{children}
		</ListVerticalStyle>
	);
};

export default ListVertical;
