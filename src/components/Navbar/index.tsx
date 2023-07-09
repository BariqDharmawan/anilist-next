import { NAVBAR_LINKS } from '@/src/constants';
import { NavPrimary, NavbarLink } from './Navbar.styled';
import Container from '../Container/Index';
import { useRouter } from 'next/router';

export default function Navbar() {
	const { pathname } = useRouter();

	return (
		<NavPrimary>
			<Container className='container'>
				<NavbarLink className='is-logo' href='/'>
					Logo
				</NavbarLink>
				{NAVBAR_LINKS.map(item => (
					<NavbarLink
						key={item.link}
						className={item.link === pathname ? 'active' : ''}
						href={item.link}>
						{item.title}
					</NavbarLink>
				))}
			</Container>
		</NavPrimary>
	);
}
