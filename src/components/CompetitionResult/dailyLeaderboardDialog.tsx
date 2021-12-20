import dayjs from "dayjs"
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Typography,
	Box,
	Paper,
	Button,
	Link,
} from "@mui/material"
import { getRankText } from "../../utils/text"
import { MembershipType, LeaderboardEntry } from "./types"

import NTGoldIcon from "../../assets/images/nt-gold-icon.png"

/** Props for <DailyLeaderboardDialog>. */
interface DailyLeaderboardDialogProps {
	show: boolean
	startAt: Date
	finishAt: Date
	leaderboard: LeaderboardEntry[]
	onClose: () => void
}

/**
 * Displays a Dialog containing the full leaderboard for the day.
 */
export const DailyLeaderboardDialog = (props: DailyLeaderboardDialogProps) => {
	const { show, startAt, finishAt, leaderboard, onClose } = props
	return (
		<Dialog open={show} maxWidth={"md"} fullWidth onClose={onClose}>
			<DialogTitle>
				Daily Leaderboard
				<Typography variant={"body2"}>
					{dayjs(startAt).format("DD MMM YYYY hh:mm A")} to {dayjs(finishAt).format("DD MMM YYYY hh:mm A")}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<TableContainer component={Paper} elevation={0} sx={{ maxHeight: "60vh", overflowY: "scroll" }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Rank</TableCell>
								<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Member</TableCell>
								<TableCell sx={{ backgroundColor: "#697F42", color: "#eee", textAlign: "right" }}>Folly Points</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{leaderboard.map((r, i) => {
								return (
									<TableRow key={`dialog-lb-rank-${i}`}>
										<TableCell>{getRankText(i + 1)}</TableCell>
										<TableCell>
											<Link
												href={`https://www.nitrotype.com/racer/${r.username}`}
												target={"_blank"}
												rel={"external noreferrer"}
												color={"#222"}
											>
												{r.membershipType === MembershipType.GOLD && (
													<>
														<Box
															component={"img"}
															src={NTGoldIcon}
															alt={"Nitro Type Gold Icon"}
															sx={{ width: "24px", height: "18px" }}
														/>
														&nbsp;
													</>
												)}
												<strong>{r.displayName}</strong>
											</Link>
										</TableCell>
										<TableCell sx={{ textAlign: "right" }}>{r.totalPoints}</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<Typography variant={"caption"}>Scroll through the table to view all the participants.</Typography>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} color={"primary"} variant={"contained"} onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}
