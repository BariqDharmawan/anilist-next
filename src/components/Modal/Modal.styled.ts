import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const blurEffect = keyframes`
	0% {
		backdrop-filter: blur(8px) opacity(0);
	} 
	40%{
		backdrop-filter: blur(8px) opacity(0.8);
	}
	100% {
		backdrop-filter: blur(4px) opacity(1);
	}
`;

export const ModalOverlay = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.5); /* Warna latar belakang overlay */
	z-index: ${props =>
		props.theme.zIndex
			.overlay}; /* Pastikan overlay tampil di atas elemen lain */
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${blurEffect} 300ms ease-in forwards;
	padding: 1rem;
`;
