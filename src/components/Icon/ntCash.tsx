import { Typography } from "@mui/material"

/**
 * Display the NT Cash Symbol.
 */
export const NTCashIcon = () => {
	return (
		<Typography
			component={"span"}
			sx={{
				display: "inline-block",
				fontFamily: "nitrocash, montserrat, sans-serif",
				textRendering: "optimizeLegibility",
				fontSize: "inherit",
			}}
		>
			$
		</Typography>
	)
}
