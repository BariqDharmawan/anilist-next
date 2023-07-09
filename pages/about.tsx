import { useState, useEffect } from 'react';

import Container from '@/src/components/Container/Index';
import ReactMarkdown from 'react-markdown';
import getReadme from '@/src/lib/getReadme';
import { Global, css } from '@emotion/react';
import { light } from '@/src/theme';

const GlobalMarkdownStyle = () => {
	return (
		<Global
			styles={css`
				h1,
				h2 {
					margin-bottom: 1rem !important;
				}
				ul {
					padding-left: 1rem !important;
					list-style-type: circle !important;
				}

				li a {
					color: ${light.color.b500};
				}

				ul + * {
					margin-top: 1rem !important;
				}
			`}
		/>
	);
};

const AboutPage = () => {
	const [markdownContent, setMarkdownContent] = useState('');

	useEffect(() => {
		getReadme().then(readme => setMarkdownContent(readme));
	}, []);

	return (
		<>
			<Container>
				<ReactMarkdown>{markdownContent}</ReactMarkdown>
			</Container>

			<GlobalMarkdownStyle />
		</>
	);
};

export default AboutPage;
