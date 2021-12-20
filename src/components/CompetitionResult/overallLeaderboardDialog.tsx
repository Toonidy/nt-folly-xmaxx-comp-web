import dayjs from "dayjs"
import { useEffect } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
	Button,
	Alert,
	Paper,
	Skeleton,
	Link,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from "@mui/material"
import { getRankText } from "../../utils/text"
import { CompetitionDates, MainCompetitionRange } from "../../constants/competitions"
import NTGoldIcon from "../../assets/images/nt-gold-icon.png"

/** GQL query to fetch all comp users. */
const USERS = gql`
	query users {
		users {
			id
			username
			displayName
			status
			membershipType
			totalPoints
		}
	}
`

/** GQL object containing user data. */
interface User {
	id: string
	username: string
	displayName: string
	totalPoints: number
	status: UserStatus
	membershipType: MembershipType
}

/** GQL Enum for user statuses. */
enum MembershipType {
	BASIC = "BASIC",
	GOLD = "GOLD",
}

/** GQL Enum for user statuses. */
enum UserStatus {
	NEW = "NEW",
	ACTIVE = "ACTIVE",
	DISQUALIFIED = "DISQUALIFIED",
}

/** Props for <OverallLeaderboardDialog> */
interface Props {
	show: boolean
	onClose: () => void
}

/**
 * Displays the overall leaderboard.
 */
export const OverallLeaderboardDialog = (props: Props) => {
	const { show, onClose } = props

	const now = new Date()
	const compStarted = now >= CompetitionDates[0].from
	const [loadLeaderboard, { data, loading, error }] = useLazyQuery<{ users: User[] }>(USERS)

	useEffect(() => {
		const now = new Date()
		if (!show || now < CompetitionDates[0].from) {
			return
		}
		loadLeaderboard()
	}, [show, loadLeaderboard])

	const leaderboard = data?.users.filter((u) => u.status !== UserStatus.DISQUALIFIED && u.totalPoints > 0) || []
	leaderboard.sort((a, b) => {
		if (a.totalPoints === b.totalPoints) {
			return 0
		}
		return a.totalPoints > b.totalPoints ? -1 : 1
	})

	return (
		<Dialog open={show} onClose={onClose}>
			<DialogTitle>
				Xmaxx 2021 Leaderboard
				<Typography variant={"body2"}>
					{dayjs(MainCompetitionRange.from).format("DD MMM YYYY hh:mm A")} to {dayjs(MainCompetitionRange.to).format("DD MMM YYYY hh:mm A")}
				</Typography>
			</DialogTitle>
			<DialogContent>
				{error && <Alert severity={"error"}>Oh Folly, stats broken... wah.</Alert>}
				{!error && (
					<TableContainer component={Paper} elevation={0} sx={{ maxHeight: "60vh", overflowY: "scroll" }}>
						<Table stickyHeader>
							<TableHead>
								<TableRow>
									<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Rank</TableCell>
									<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Member</TableCell>
									<TableCell sx={{ backgroundColor: "#697F42", color: "#eee", textAlign: "right" }}>Folly Points</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loading &&
									Array.from(Array(50)).map((_, i) => (
										<TableRow key={`overall-lb-loading-${i}`}>
											<TableCell colSpan={3}>
												<Skeleton variant={"rectangular"} />
											</TableCell>
										</TableRow>
									))}
								{!loading && !compStarted && <TableCell colSpan={3}>The Main Competition hasn't started.</TableCell>}
								{!loading && compStarted && leaderboard.length === 0 && <TableCell colSpan={3}>No results yet wah...</TableCell>}
								{!loading &&
									compStarted &&
									leaderboard.map((u, i) => (
										<TableRow key={`overall-lb-loading-${i}`}>
											<TableCell>{getRankText(i + 1)}</TableCell>
											<TableCell>
												<Link
													href={`https://www.nitrotype.com/racer/${u.username}`}
													target={"_blank"}
													rel={"external noreferrer"}
													color={"#222"}
												>
													{u.membershipType === MembershipType.GOLD && (
														<Box
															component={"img"}
															src={NTGoldIcon}
															alt={"Nitro Type Gold Icon"}
															sx={{ width: "24px", height: "18px" }}
														/>
													)}
													<strong>&nbsp;{u.displayName}</strong>
												</Link>
											</TableCell>
											<TableCell sx={{ textAlign: "right" }}>{u.totalPoints}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} variant={"contained"} color={"primary"} onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}
