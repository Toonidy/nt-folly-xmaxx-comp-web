import { useTheme, Box, Typography } from "@mui/material"
import { NTCashIcon } from "../Icon/ntCash"
import NTGoldIcon from "../../assets/images/nt-gold-icon.png"

/**
 * Display the Prize Info and the link to Team Page.
 */
export const PrizeInfo = () => {
	const theme = useTheme()

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Box
				sx={{
					p: 2,
					borderRadius: 4,
					height: "100%",
					backgroundColor: "rgba(0, 0, 0, 0.2)",
					color: theme.palette.getContrastText(theme.palette.background.default),
				}}
			>
				<Typography variant={"body2"} sx={{ fontWeight: 600, letterSpacing: "1px", mb: 1 }}>
					Prizes Include
				</Typography>
				<ul>
					<Typography component={"li"} variant={"body2"} sx={{ letterSpacing: "1px" }}>
						<strong>2x</strong> - <Box component={"img"} src={NTGoldIcon} alt={"Nitro Type Gold Icon"} sx={{ width: "16px", height: "16px" }} />{" "}
						Nitro Type Gold <small>(non gold members)</small>
					</Typography>
					<Typography component={"li"} variant={"body2"} sx={{ letterSpacing: "1px" }}>
						<strong>1x</strong> - <NTCashIcon />
						{" 300 million"}
						<small>(gold members)</small>
					</Typography>
					<Typography component={"li"} variant={"body2"} sx={{ letterSpacing: "1px" }}>
						<strong>7x</strong> - <NTCashIcon />
						{" 15 million "}
						<small>(won daily)</small>
					</Typography>
				</ul>
				<Typography
					variant={"body2"}
					sx={{
						mt: 1,
						letterSpacing: "1px",
						fontSize: theme.typography.pxToRem(10),
					}}
				>
					See Rules below for more information.
				</Typography>
			</Box>
		</Box>
	)
}
