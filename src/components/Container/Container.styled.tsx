import styled from '@emotion/styled';

export const ContainerBase = styled.div`
	width: 90%;
	max-width: ${props => props.theme.breakpoint.l};
	margin-left: auto;
	margin-right: auto;
	overflow: hidden;
	padding: 0.5rem 0;
`;
