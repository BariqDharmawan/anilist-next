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
`;

export const CollectionTitle = styled.p`
	font-weight: 500;
	font-size: 1.2rem;
	line-height: 8px;
	text-transform: capitalize;
`;

export const ButtonActionWrapper = styled.div`
	display: flex;
	gap: 0.5rem;
	margin-block: 12px;
`;

export const CollectionCard = styled.div`
	position: relative;
	background-color: white;
	padding: 1.5rem;
	border-radius: ${props => props.theme.borderRadius.l};
	max-width: 700px;
	width: 100%;
	transition: height 300ms ease-in-out;
`;

export const IconCloseWrapper = styled.div`
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	top: 16px;
	right: 16px;
	border-radius: 50%;
	transition: background-color 150ms ease-in-out;
	padding: 8px;
	&:hover {
		background-color: rgba(170, 161, 161, 0.2);
	}
`;

export const CollectionSelectedList = styled.div`
	display: flex;
	gap: 8px;
	flex-direction: column;
`;

export const CollectionSelectedName = styled.span`
	font-weight: 500;
	font-size: 1rem;
	cursor: pointer;
`;
