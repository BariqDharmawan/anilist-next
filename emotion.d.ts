import '@emotion/react'
import { OveridedTheme } from './src/theme'

declare module '@emotion/react' {
	export interface Theme extends OveridedTheme {}
}
