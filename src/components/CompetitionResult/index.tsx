import { useTheme, Box } from "@mui/material"
import { CalendarDate } from "./calendarDate"
import { DailyPrize } from "./dailyPrize"
import { TimelineCarousel } from "./timelineCarousel"

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
				backgroundColor: "rgba(0,0,0,0.3)",
				color: theme.palette.primary.contrastText,
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					py: 4,
					px: 2,
				}}
			>
				<Box sx={{ mr: 4 }}>
					<CalendarDate />
				</Box>
			</Box>
			<Box>
				<TimelineCarousel />
			</Box>
		</Box>
	)
}
