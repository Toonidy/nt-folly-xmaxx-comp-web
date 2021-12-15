import { useTheme, Box, Paper, Typography } from "@mui/material"
import { NTCashIcon } from "../Icon/ntCash"

/**
 * Displays the current daily prize.
 */
export const DailyPrize = () => {
	const theme = useTheme()
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundImage: "radial-gradient(#2cc0ff, #143877)",
			}}
		>
			<Box
				sx={{
					py: 1,
					px: 2,
					color: theme.palette.common.white,
					backgroundColor: "rgba(0,0,0,0.2)",
					borderTopLeftRadius: "4px",
					borderTopRightRadius: "4px",
					textTransform: "uppercase",
				}}
			>
				<Typography sx={{ fontWeight: 600, fontSize: theme.typography.pxToRem(18), textAlign: "center" }}>Daily Prize</Typography>
			</Box>
			<Box component={"img"} src={"/nt-cash-prize.png"} alt={"Nitro Type Cash"} sx={{ my: 2, height: "64px" }} />
			<Typography
				sx={{
					py: 1,
					px: 2,
					borderBottomLeftRadius: "4px",
					borderBottomRightRadius: "4px",
					width: "100%",
					color: theme.palette.common.white,
					backgroundColor: "rgba(0,0,0,0.2)",
					fontWeight: 600,
					fontSize: theme.typography.pxToRem(14),
					textAlign: "center",
					textTransform: "uppercase",
				}}
			>
				<NTCashIcon /> 15 Million
			</Typography>
		</Paper>
	)
}
