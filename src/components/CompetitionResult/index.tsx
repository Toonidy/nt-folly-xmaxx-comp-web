import { useTheme, Box } from "@mui/material"
import { CalendarDate } from "./calendarDate"
import { DailyPrize } from "./dailyPrize"

/**
 * Competition Result Section.
 */
export const CompetitionResult = () => {
	const theme = useTheme()
	return (
		<Box
			component={"section"}
			sx={{
				mb: 2,
				backgroundImage: "url(/comp-background.jpg)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				color: theme.palette.primary.contrastText,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					py: 4,
					px: 2,
					height: "400px",
					backgroundColor: "rgba(0,0,0,0.3)",
				}}
			>
				<Box sx={{ mr: 4 }}>
					<CalendarDate />
					<Box sx={{ mt: 2 }}>
						<DailyPrize />
					</Box>
				</Box>
				<Box sx={{ flexGrow: 1 }}>Test Cakes LOL</Box>
			</Box>
		</Box>
	)
}
