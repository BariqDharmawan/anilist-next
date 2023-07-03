import styled from '@emotion/styled'

export const CardStyled = styled.div`
	box-shadow: ${props => props.theme.boxShadow.card};
	padding: ${props => props.theme.space.xl};
	border-radius: ${props => props.theme.borderRadius.m};
`
