import { useTheme, Box, Paper, Typography } from "@mui/material"
import { NTCashIcon } from "../Icon/ntCash"

/** Props for <PrizeItem>. */
interface Props {
	title: string
	value: string
	epicTier?: boolean
	isGold?: boolean
	isCompleted?: boolean
	isActive?: boolean
}

/**
 * Displays the prize item.
 */
export const PrizeItem = (props: Props) => {
	const theme = useTheme()
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "170px",
				backgroundColor: props.epicTier ? "#78371d" : "#143877",
				backgroundImage: props.epicTier ? "radial-gradient(#ea8d23, #78371d)" : "radial-gradient(#2cc0ff, #143877)",
			}}
		>
			<Typography
				sx={{
					py: 1,
					px: 2,
					borderBottomLeftRadius: "4px",
					borderBottomRightRadius: "4px",
					width: "100%",
					height: "40px",
					color: theme.palette.common.white,
					backgroundColor: "rgba(0,0,0,0.2)",
					fontWeight: 600,
					fontSize: theme.typography.pxToRem(18),
					textAlign: "center",
					textTransform: "uppercase",
				}}
			>
				{props.title}
			</Typography>

			<Box
				sx={{
					display: "flex",
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "stretch",
				}}
			>
				{!props.isGold && (
					<Box component={"img"} src={"/nt-cash-prize.png"} alt={"Nitro Type Cash"} sx={{ my: 2, width: "25%", objectFit: "contain" }} />
				)}
				{props.isGold && <Box component={"img"} src={"/nt-gold.svg"} alt={"Nitro Type Gold"} sx={{ my: 2, width: "25%", objectFit: "contain" }} />}
			</Box>

			<Typography
				sx={{
					py: 1,
					px: 2,
					borderBottomLeftRadius: "4px",
					borderBottomRightRadius: "4px",
					width: "100%",
					height: "40px",
					color: theme.palette.common.white,
					backgroundColor: "rgba(0,0,0,0.2)",
					fontWeight: 600,
					fontSize: theme.typography.pxToRem(14),
					textAlign: "center",
					textTransform: "uppercase",
				}}
			>
				{!props.isGold && (
					<>
						<NTCashIcon />{" "}
					</>
				)}
				{props.value}
			</Typography>
		</Paper>
	)
}
