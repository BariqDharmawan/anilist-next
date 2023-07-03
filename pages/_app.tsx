import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import { ThemeProvider } from '@emotion/react'
import client from '../src/lib/apollo-client'
import GlobalStyle from '@/src/components/GlobalStyle'

import { light } from '@/src/theme'
import { Toaster } from 'react-hot-toast'
import Layout from '@/src/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<ThemeProvider theme={light}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<Toaster
					containerStyle={{
						zIndex: light.zIndex.toast,
					}}
				/>
				<GlobalStyle />
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default MyApp
