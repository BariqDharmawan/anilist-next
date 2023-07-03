import styled from '@emotion/styled'

export const ButtonBaseStyled = styled.button`
	padding-inline: 1rem;
	background-color: #1e293b;
	color: white;
	height: 2.5rem;
	cursor: pointer;
	border: none;
	outline: none;
	text-transform: capitalize;
	border-radius: 8px;

	&:disabled {
		opacity: 0.5;
		cursor: auto;
	}
`
