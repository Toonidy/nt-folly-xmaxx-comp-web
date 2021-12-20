import dayjs from "dayjs"
import { useState, useEffect, useMemo } from "react"
import {
	styled,
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
	Link,
	Paper,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material"
import { Competition, CompetitionStatus, CompetitionUser, MembershipType } from "./types"
import { RANKS } from "./constants"

import NTGoldIcon from "../../assets/images/nt-gold-icon.png"

/** Props for <BlitzResultsDialog>. */
interface Props {
	show: boolean
	startAt: Date
	finishAt: Date
	competitions?: Competition[]
	onClose: () => void
}

/**
 * Displays the blitz results on a specific day.
 */
export const BlitzResultsDialog = (props: Props) => {
	const { show, competitions, startAt, finishAt, onClose } = props
	const data = useMemo(() => competitions?.filter((c) => c.leaderboard.length > 0 || c.status === CompetitionStatus.FAILED), [competitions])

	const [selectedIndex, setSelectedIndex] = useState(0)

	useEffect(() => {
		if (show && data && data.length > 0) {
			console.log("Bird up")
			setSelectedIndex(data.length - 1)
		}
	}, [show, data])

	if (!data) {
		return null
	}
	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle>
				Blitz Results
				<Typography variant={"body2"}>
					{dayjs(startAt).format("DD MMM YYYY hh:mm A")} to {dayjs(finishAt).format("DD MMM YYYY hh:mm A")}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<Typography sx={{ mr: 1 }}>Time:</Typography>
					<Select
						value={`${selectedIndex}`}
						size={"small"}
						onChange={(e) => {
							const index = parseInt(e.target.value, 10)
							if (!isNaN(index)) {
								console.log(e.target.value)
								setSelectedIndex(index)
							}
						}}
						sx={{ mr: 1 }}
					>
						{data.map((c, i) => (
							<MenuItem key={`comp-day-select-${i}`} value={`${i}`}>
								{dayjs(new Date(c.startAt)).format("hh:mm A")} to {dayjs(new Date(c.finishAt)).format("hh:mm A")}
							</MenuItem>
						))}
					</Select>
					<small>({Intl.DateTimeFormat().resolvedOptions().timeZone})</small>
				</Box>

				{data[selectedIndex].status === CompetitionStatus.FAILED && (
					<Alert severity={"error"}>An error occurred when collecting stats. The "would be" results have been added onto the next blitz time.</Alert>
				)}
				{data[selectedIndex].status === CompetitionStatus.FINISHED && <ResultTable leaderboard={data[selectedIndex].leaderboard} />}
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} color={"primary"} variant={"contained"} onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}

/** Leaderboard Table Record Data. */
export interface BlitzEntry {
	username: string
	displayName: string
	membershipType: MembershipType
	rank: number
	score: string
	reward: number
}

/** Sort Blitz Entry with highest rank first. */
const sortBlitzEntryByRankHandler = (a: BlitzEntry, b: BlitzEntry) => {
	if (a.rank === b.rank) {
		return 0
	}
	return a.rank > b.rank ? 1 : -1
}

/** Table Header Cell. */
const TableHeaderCell = styled(TableCell)(() => ({
	backgroundColor: "#697f42",
	color: "#eee",
}))

/**
 * Display the Results for a particular time.
 */
const ResultTable = (props: { leaderboard: CompetitionUser[] }) => {
	const { leaderboard } = props

	const grindLeaderboard: BlitzEntry[] = leaderboard
		.filter((l) => l.grindReward > 0)
		.map((l) => ({
			username: l.user.username,
			displayName: l.user.displayName || l.user.username,
			membershipType: l.user.membershipType,
			rank: l.grindRank,
			score: `${l.grindScore}`,
			reward: l.grindReward,
		}))
	const pointLeaderboard: BlitzEntry[] = leaderboard
		.filter((l) => l.pointReward > 0)
		.map((l) => ({
			username: l.user.username,
			displayName: l.user.displayName || l.user.username,
			membershipType: l.user.membershipType,
			rank: l.pointRank,
			score: `${l.pointScore}`,
			reward: l.pointReward,
		}))
	const speedLeaderboard: BlitzEntry[] = leaderboard
		.filter((l) => l.speedReward > 0)
		.map((l) => ({
			username: l.user.username,
			displayName: l.user.displayName || l.user.username,
			membershipType: l.user.membershipType,
			rank: l.speedRank,
			score: `${l.speedScore.toFixed(2)} WPM`,
			reward: l.speedReward,
		}))
	const accuracyLeaderboard: BlitzEntry[] = leaderboard
		.filter((l) => l.speedReward > 0)
		.map((l) => ({
			username: l.user.username,
			displayName: l.user.displayName || l.user.username,
			membershipType: l.user.membershipType,
			rank: l.accuracyRank,
			score: `${l.accuracyScore.toFixed(2)}%`,
			reward: l.accuracyReward,
		}))

	grindLeaderboard.sort(sortBlitzEntryByRankHandler)
	pointLeaderboard.sort(sortBlitzEntryByRankHandler)
	speedLeaderboard.sort(sortBlitzEntryByRankHandler)
	accuracyLeaderboard.sort(sortBlitzEntryByRankHandler)

	return (
		<>
			<Box sx={{ mb: 2 }}>
				<ResultTableItem title={"Most Races"} scoreType={"Races"} data={grindLeaderboard} />
			</Box>
			<Box sx={{ mb: 2 }}>
				<ResultTableItem title={"Most Points"} scoreType={"Points"} data={pointLeaderboard} />
			</Box>
			<Box sx={{ mb: 2 }}>
				<ResultTableItem title={"Top Speed"} scoreType={"Speed"} data={speedLeaderboard} />
			</Box>
			<ResultTableItem title={"Most Accurate"} scoreType={"Accuracy"} data={accuracyLeaderboard} />
		</>
	)
}

/** Props for <ResultTableItem>. */
interface ResultTableItemProps {
	title: string
	scoreType: string
	data: BlitzEntry[]
}

/**
 * Displays the result table for a specific category.
 */
const ResultTableItem = (props: ResultTableItemProps) => {
	const { title, scoreType, data } = props
	return (
		<>
			<Typography component={"h3"} variant={"h5"} gutterBottom>
				{title}
			</Typography>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell>Rank</TableHeaderCell>
							<TableHeaderCell>Member</TableHeaderCell>
							<TableHeaderCell align={"right"}>{scoreType}</TableHeaderCell>
							<TableHeaderCell align={"right"}>Reward</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((r, i) => (
							<TableRow key={`blitz-lb-grind-${i}`}>
								<TableCell>{RANKS[r.rank - 1] || "???"}</TableCell>
								<TableCell>
									<Link href={`https://www.nitrotype.com/racer/${r.username}`} target={"_blank"} rel={"external noreferrer"} color={"#222"}>
										{r.membershipType === MembershipType.GOLD && (
											<>
												<Box component={"img"} src={NTGoldIcon} alt={"Nitro Type Gold Icon"} sx={{ width: "24px", height: "18px" }} />
												&nbsp;
											</>
										)}
										<strong>{r.displayName}</strong>
									</Link>
								</TableCell>
								<TableCell align={"right"}>{r.score}</TableCell>
								<TableCell align={"right"}>{r.reward}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}
