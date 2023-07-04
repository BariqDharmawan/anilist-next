import styled from '@emotion/styled';
import Link from 'next/link';

export const NavbarLink = styled(Link)`
	font-size: 1.25rem;

	&.is-logo {
		margin-right: auto;
		font-family: 'Dancing Script', cursive;
		font-weight: bold;
		font-size: 2rem;
	}
`;

export const NavPrimary = styled.nav`
	height: 60px;

	.container {
		height: 100%;
		display: flex;
		gap: 1rem;
		align-items: center;
	}
`;
