import { useTheme, useMediaQuery } from "@mui/material"

/**
 * Hook to return whether using mobile width.
 */
export const useIsMobile = () => {
	const theme = useTheme()
	const mobileMediaQuery = theme.breakpoints.down(415)
	const isMobile = useMediaQuery(mobileMediaQuery)

	return {
		isMobile,
		mobileMediaQuery,
	}
}
