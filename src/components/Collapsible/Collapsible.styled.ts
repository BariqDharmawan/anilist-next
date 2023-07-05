import styled from '@emotion/styled';

export const CollapseStyle = styled.details`
	summary {
		cursor: pointer;
		list-style-type: none;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;

export const CollapseDetail = styled.div`
	max-height: 0;
	transition: all 250ms;
	overflow: hidden;

	details[open] & {
		transition: all 250ms;
		max-height: none;
	}
`;
