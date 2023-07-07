import { NAVBAR_LINKS } from '@/src/constants';
import { NavPrimary, NavbarLink } from './Navbar.styled';
import Container from '../Container/Index';

export default function Navbar() {
	return (
		<NavPrimary>
			<Container className='container'>
				<NavbarLink className='is-logo' href='/'>
					Logo
				</NavbarLink>
				{NAVBAR_LINKS.map(item => (
					<NavbarLink key={item.link} href={item.link}>
						{item.title}
					</NavbarLink>
				))}
			</Container>
		</NavPrimary>
	);
}
