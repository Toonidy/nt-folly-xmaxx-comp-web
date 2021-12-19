import dayjs from "dayjs"
import { useCallback } from "react"
import { useTheme, Paper, Box, Typography, IconButton, Tooltip } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { CompetitionDates } from "../../constants/competitions"

/** Props for <CalendarDate>. */
interface Props {
	day: number
	onDayChange: (d: number) => void
}

/**
 * Displays the current in calendar style design.
 */
export const CalendarDate = (props: Props) => {
	const { day, onDayChange } = props

	const theme = useTheme()

	const prevDayClickHandler = useCallback(() => {
		onDayChange(Math.max(day - 1, 0))
	}, [day, onDayChange])
	const nextDayClickHandler = useCallback(() => {
		onDayChange(Math.min(day + 1, CompetitionDates.length - 1))
	}, [day, onDayChange])

	return (
		<>
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
					}}
				>
					<Typography sx={{ fontWeight: 600, textAlign: "center", textTransform: "uppercase" }}>Day</Typography>
				</Box>
				<Box
					sx={{
						py: 1,
						textAlign: "center",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton disabled={day === 0} onClick={prevDayClickHandler}>
							<Tooltip title={"Go to the previous day."}>
								<ChevronLeft />
							</Tooltip>
						</IconButton>
						<Typography sx={{ flexGrow: 1, fontSize: theme.typography.pxToRem(32), fontWeight: 600 }}>{day + 1}</Typography>
						<IconButton disabled={day === CompetitionDates.length - 1} onClick={nextDayClickHandler}>
							<Tooltip title={"Go to the next day."}>
								<ChevronRight />
							</Tooltip>
						</IconButton>
					</Box>
					<Typography variant={"body2"}>{dayjs(CompetitionDates[day].from).format("D MMM YYYY")}</Typography>
				</Box>
			</Paper>
		</>
	)
}
