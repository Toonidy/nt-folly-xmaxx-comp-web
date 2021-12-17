import dayjs from "dayjs"
import React, { useState, useEffect, useCallback } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import {
	useTheme,
	Paper,
	Box,
	Typography,
	IconButton,
	Button,
	Tooltip,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Select,
	MenuItem,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Skeleton,
} from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { CompetitionDates, CompetitionTimes } from "../../constants/competitions"
import { SelectInputProps } from "@mui/material/Select/SelectInput"

/** GQL query to get competition rewards between 2 dates. */
const COMPETITIONS = gql`
	query competitions($timeFrom: Time!, $timeTo: Time!) {
		competitions(timeRange: { timeFrom: $timeFrom, timeTo: $timeTo }) {
			id
			multiplier
			grindRewards {
				rank
				points
			}
			pointRewards {
				rank
				points
			}
			speedRewards {
				rank
				points
			}
			accuracyRewards {
				rank
				points
			}
		}
	}
`

/** Competition Rewards gql object. */
interface Competition {
	id: string
	multiplier: number
	grindRewards: CompetitionPrize[]
	pointRewards: CompetitionPrize[]
	speedRewards: CompetitionPrize[]
	accuracyRewards: CompetitionPrize[]
}

/** Competition Prize gql object. */
interface CompetitionPrize {
	rank: number
	points: number
}

/**
 * Displays the current in calendar style design.
 */
export const CalendarDate = () => {
	const theme = useTheme()
	const [day, setDay] = useState(0)
	const [showSchedule, setShowSchedule] = useState(false)

	const prevDayClickHandler = useCallback(() => setDay((prev) => Math.max(prev - 1, 0)), [])
	const nextDayClickHandler = useCallback(() => setDay((prev) => Math.min(prev + 1, CompetitionDates.length - 1)), [])

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
							<Tooltip title={"Go to the previous day."}>
								<ChevronRight />
							</Tooltip>
						</IconButton>
					</Box>
					<Typography variant={"body2"}>{dayjs(CompetitionDates[day].from).format("D MMM YYYY")}</Typography>
				</Box>
			</Paper>
			<Button type={"button"} variant={"contained"} color={"primary"} onClick={() => setShowSchedule(true)} sx={{ mt: 2 }}>
				View Blitzes
			</Button>

			<BlitzScheduleDialog show={showSchedule} defaultDay={day} onClose={() => setShowSchedule(false)} />
		</>
	)
}

/** Props for <BlitzScheduleDialog>. */
interface BlitzScheduleDialogProps {
	show: boolean
	defaultDay: number
	onClose: () => void
}

/**
 * Displays the Scheduled Blitz Rewards.
 */
const BlitzScheduleDialog = (props: BlitzScheduleDialogProps) => {
	const { show, defaultDay } = props

	const [day, setDay] = useState(defaultDay)
	const [loadCompetitions, { data, loading, error }] = useLazyQuery<{ competitions: Competition[] }>(COMPETITIONS)

	useEffect(() => {
		if (!show) {
			return
		}
		setDay(defaultDay)
		return () => {
			setDay(defaultDay)
		}
	}, [show, defaultDay])

	useEffect(() => {
		if (!show) {
			return
		}
		loadCompetitions({
			variables: {
				timeFrom: CompetitionDates[day].from,
				timeTo: CompetitionDates[day].to,
			},
		})
	}, [show, day, loadCompetitions])

	return (
		<Dialog open={show} onClose={props.onClose}>
			<DialogTitle>Blitz Schedule</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography sx={{ mr: 1 }}>Day: </Typography>
					<Select
						value={`${day}`}
						size={"small"}
						onChange={(e) => {
							const day = parseInt(e.target.value)
							if (!isNaN(day)) {
								setDay(day)
							}
						}}
					>
						{CompetitionDates.map((t, i) => (
							<MenuItem key={`comp-day-select-${i}`} value={`${i}`}>
								{dayjs(t.from).format("DD MMM YYYY")}
							</MenuItem>
						))}
					</Select>
				</Box>

				{error && <Alert severity={"error"}>Oh Folly, Silje broke stats wah...</Alert>}
				<TableContainer
					sx={{
						maxHeight: "600px",
						overflowY: "auto",
						borderRadius: "8px",
						mt: 2,
						"& .MuiTableCell-root": {
							textAlign: "center",
						},
						"& .MuiTableRow-head  .MuiTableCell-root": {
							backgroundColor: "#697F42",
							color: "#eee",
						},
						"& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd) .MuiTableCell-root": {
							backgroundColor: "#eee",
						},
						"& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even) .MuiTableCell-root": {
							backgroundColor: "#fff",
						},
					}}
				>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Time</TableCell>
								<TableCell>Multiplier</TableCell>
								<TableCell>1st</TableCell>
								<TableCell>2nd</TableCell>
								<TableCell>3rd</TableCell>
								<TableCell>4th</TableCell>
								<TableCell>5th</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{CompetitionTimes.map((t, i) => {
								const compData = data && data.competitions[i] ? data.competitions[i] : null
								return (
									<TableRow key={`blitz-schedule-time-${t.from.getTime()}`}>
										<TableCell>{dayjs(t.from).format("hh:mm A")}</TableCell>
										{loading && (
											<TableCell colSpan={6}>
												<Skeleton variant={"rectangular"} />
											</TableCell>
										)}
										{!loading && !compData && (
											<>
												<TableCell>?</TableCell>
												<TableCell>?</TableCell>
												<TableCell>?</TableCell>
												<TableCell>?</TableCell>
												<TableCell>?</TableCell>
												<TableCell>?</TableCell>
											</>
										)}
										{!loading && compData && (
											<>
												<TableCell>
													{compData.multiplier > 1 ? <strong>x{compData.multiplier}</strong> : `x${compData.multiplier}`}
												</TableCell>
												{compData.grindRewards.map((r) => (
													<TableCell key={`blitz-schedule-time-reward-${t.from.getTime()}-${r.rank}`}>
														{compData.multiplier > 1 ? <strong>{r.points * compData.multiplier}</strong> : r.points}
													</TableCell>
												))}
											</>
										)}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} variant={"contained"} color={"primary"} onClick={props.onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}
