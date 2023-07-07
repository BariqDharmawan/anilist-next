import { light } from '@/src/theme';
import styled from '@emotion/styled';
import { laptop } from '@/src/theme/mediaQuery';

export const StickyBoxStyle = styled.div`
	border: 1px solid ${light.color.gray300};
	padding: 1rem;
	border-radius: 10px;
	position: fixed;
	bottom: 10px;
	box-shadow: ${light.boxShadow.modal};
	background-color: white;
	width: 90%;
	left: 50%;
	transform: translateX(-50%);

	@media screen and (min-width: ${laptop}) {
		width: 50%;
		max-width: 400px;
	}
`;
