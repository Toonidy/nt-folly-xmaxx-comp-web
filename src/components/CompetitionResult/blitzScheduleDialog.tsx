import dayjs from "dayjs"
import { useState, useEffect, useLayoutEffect, useRef } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import {
	Box,
	Alert,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Select,
	MenuItem,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Skeleton,
} from "@mui/material"
import { CompetitionDates, CompetitionTimes } from "../../constants/competitions"

/** GQL query to get competition rewards between 2 dates. */
const COMPETITIONS = gql`
	query competitions($timeFrom: Time!, $timeTo: Time!) {
		competitions(timeRange: { timeFrom: $timeFrom, timeTo: $timeTo }) {
			id
			multiplier
			startAt
			finishAt
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
	startAt: string
	finishAt: string
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

/** Props for <BlitzScheduleDialog>. */
interface BlitzScheduleDialogProps {
	show: boolean
	defaultDay: number
	onClose: () => void
}

/**
 * Displays the Scheduled Blitz Rewards.
 */
export const BlitzScheduleDialog = (props: BlitzScheduleDialogProps) => {
	const { show, defaultDay } = props

	const targetRowRef = useRef<HTMLTableRowElement>(null)
	const [day, setDay] = useState(defaultDay)
	const [loadCompetitions, { data, loading, error }] = useLazyQuery<{ competitions: Competition[] }>(COMPETITIONS)

	useEffect(() => {
		if (!show) {
			return
		}
		setDay(defaultDay)
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

	useEffect(() => {
		const now = new Date()
		if (!data || !targetRowRef.current || CompetitionDates[day].from > now || CompetitionDates[day].to < now) {
			return
		}
	}, [data, day])

	return (
		<Dialog open={show} onClose={props.onClose}>
			<DialogTitle>Blitz Schedule</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
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
						sx={{ mr: 1 }}
					>
						{CompetitionDates.map((t, i) => (
							<MenuItem key={`comp-day-select-${i}`} value={`${i}`}>
								{dayjs(t.from).format("DD MMM YYYY")}
							</MenuItem>
						))}
					</Select>
					<small>({Intl.DateTimeFormat().resolvedOptions().timeZone})</small>
				</Box>

				{error && <Alert severity={"error"}>Oh Folly, Silje broke stats wah...</Alert>}
				<Typography variant={"body2"} gutterBottom>
					Points are awarded for: <em>Most Races, Points, Highest Speed and Accuracy</em>.
				</Typography>
				<TableContainer
					component={Paper}
					elevation={0}
					sx={{
						border: `1px solid #aaa`,
						mt: 2,
						overflowY: "auto",
						maxHeight: "50vh",
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
					<Table stickyHeader>
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
								const now = new Date()
								const compData = data && data.competitions[i] ? data.competitions[i] : null
								let isScrollTarget = !!(
									data &&
									data.competitions[i + 1] &&
									new Date(data.competitions[i + 1].startAt) <= now &&
									new Date(data.competitions[i + 1].finishAt) > now
								) // 1 row before the current time (to deal with sticky headers)

								return (
									<ScheduleRow
										key={`blitz-schedule-time-${t.from.getTime()}`}
										time={t.from}
										loading={loading}
										compData={compData}
										scrollTo={isScrollTarget}
									/>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Typography variant={"caption"}>Scroll through the table to view all the times.</Typography>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} variant={"contained"} color={"primary"} onClick={props.onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

/** Props for <ScheduleRow>. */
interface ScheduleRowProps {
	loading: boolean
	time: Date
	scrollTo: boolean
	compData: Competition | null
}

/**
 * Displays a table row on a specific blitz time and auto scroll into view if current time.
 */
const ScheduleRow = (props: ScheduleRowProps) => {
	const { compData, scrollTo, time, loading } = props

	const targetRowRef = useRef<HTMLTableRowElement>(null)

	useLayoutEffect(() => {
		if (scrollTo) {
			targetRowRef.current?.scrollIntoView({ block: "start" })
		}
	}, [scrollTo])

	return (
		<TableRow ref={targetRowRef}>
			<TableCell>{dayjs(time).format("hh:mm A")}</TableCell>
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
					<TableCell>{compData.multiplier > 1 ? <strong>x{compData.multiplier}</strong> : `x${compData.multiplier}`}</TableCell>
					{compData.grindRewards.map((r) => (
						<TableCell key={`blitz-schedule-time-reward-${time.getTime()}-${r.rank}`}>
							{compData.multiplier > 1 ? <strong>{r.points * compData.multiplier}</strong> : r.points}
						</TableCell>
					))}
				</>
			)}
		</TableRow>
	)
}
