import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { useState } from "react"
import { useTheme, Paper, Box, Typography } from "@mui/material"

dayjs.extend(advancedFormat)

/**
 * Displays the current in calendar style design.
 */
export const CalendarDate = () => {
	const theme = useTheme()
	const [date] = useState(dayjs())

	return (
		<Paper sx={{ borderRadius: "4px" }}>
			<Box
				sx={{
					py: 1,
					px: 2,
					color: theme.palette.common.white,
					backgroundColor: "#A00",
					backgroundImage: "linear-gradient(to bottom right, #D66 0%, #A00 100%)",
					borderTopLeftRadius: "4px",
					borderTopRightRadius: "4px",
					textTransform: "uppercase",
				}}
			>
				<Typography sx={{ fontWeight: 600, fontSize: theme.typography.pxToRem(18), textAlign: "center" }}>{date.format("MMMM")}</Typography>
			</Box>
			<Box
				sx={{
					py: 1,
					px: 2,
					textAlign: "center",
				}}
			>
				<Typography sx={{ fontSize: theme.typography.pxToRem(14) }}>{date.format("dddd")}</Typography>
				<Typography sx={{ fontSize: theme.typography.pxToRem(30), fontWeight: 600 }}>{date.format("Do")}</Typography>
				<Typography sx={{ fontSize: theme.typography.pxToRem(16), fontWeight: 600 }}>{date.format("YYYY")}</Typography>
			</Box>
		</Paper>
	)
}
