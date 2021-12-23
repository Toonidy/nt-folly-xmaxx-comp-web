import dayjs from "dayjs"
import { useState, useEffect } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import { useIsMobile } from "../../hooks/useIsMobile"
import {
	useTheme,
	useMediaQuery,
	Box,
	Grid,
	Paper,
	Typography,
	Link,
	Skeleton,
	Select,
	MenuItem,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Alert,
	Button,
} from "@mui/material"
import { AccessTime, EmojiEvents, EventNote, ShowChart } from "@mui/icons-material"
import { CalendarDate } from "./calendarDate"
import { CompCountdownChip, CompCountdownText } from "./compCountdown"
import { OverallLeaderboardDialog } from "./overallLeaderboardDialog"
import { BlitzScheduleDialog } from "./blitzScheduleDialog"
import { DailyLeaderboardDialog } from "./dailyLeaderboardDialog"
import { DailyStatsDialog } from "./dailyStatsDialog"
import { BlitzResultsDialog } from "./blitzResultsDialog"
import { CompetitionDates } from "../../constants/competitions"
import { Competition, MembershipType, UserStatus, LeaderboardEntry, CompetitionStatus } from "./types"
import { RANKS } from "./constants"

import NTGoldIcon from "../../assets/images/nt-gold-icon.png"

/** GQL query to get competition rewards between 2 dates. */
const COMPETITIONS = gql`
	query competitions($timeFrom: Time!, $timeTo: Time!) {
		competitions(timeRange: { timeFrom: $timeFrom, timeTo: $timeTo }) {
			id
			multiplier
			status
			startAt
			finishAt
			leaderboard {
				id
				speedRank
				speedScore
				speedReward
				accuracyRank
				accuracyScore
				accuracyReward
				grindRank
				grindScore
				grindReward
				pointRank
				pointScore
				pointReward
				user {
					id
					username
					displayName
					status
					membershipType
				}
			}
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

/**
 * Competition Result Section.
 */
export const CompetitionResult = () => {
	const theme = useTheme()
	const hideSideSection = !useMediaQuery(theme.breakpoints.up(690))
	const shrinkRightSection = !useMediaQuery(theme.breakpoints.up(550))
	const now = new Date()

	const { isMobile } = useIsMobile()

	const [showSchedule, setShowSchedule] = useState(false)
	const [showDailyLeaderboard, setShowDailyLeaderboard] = useState(false)
	const [showDailyStats, setShowDailyStats] = useState(false)
	const [showOverallLeaderboard, setShowOverallLeaderboard] = useState(false)
	const [showBlitzResults, setShowBlitzResults] = useState(false)
	const [day, setDay] = useState(() => {
		const result = CompetitionDates.findIndex((t) => t.from <= now && t.to > now)
		if (result === -1) {
			return 0
		}
		return result
	})

	const [loadCompetitions, { data, loading, error }] = useLazyQuery<{ competitions: Competition[] }>(COMPETITIONS)

	let currentComp = data?.competitions?.find((c) => new Date(c.startAt) <= now && new Date(c.finishAt) > now)
	if (!currentComp && data?.competitions && data.competitions.length > 0) {
		currentComp = data.competitions[0]
	}

	let leaderboard: LeaderboardEntry[] = []

	if (data?.competitions && data.competitions.length > 0) {
		data.competitions
			.filter((c) => new Date(c.finishAt) < now)
			.forEach((c) => {
				c.leaderboard
					.filter((r) => r.user.status !== UserStatus.DISQUALIFIED && r.accuracyReward + r.grindReward + r.speedReward + r.pointReward > 0)
					.forEach((r) => {
						for (let i = 0; i < leaderboard.length; i++) {
							if (leaderboard[i].username === r.user.username) {
								leaderboard[i].totalPoints += r.accuracyReward + r.grindReward + r.speedReward + r.pointReward
								return
							}
						}
						leaderboard = leaderboard.concat({
							username: r.user.username,
							displayName: r.user.displayName,
							membershipType: r.user.membershipType,
							totalPoints: r.accuracyReward + r.grindReward + r.speedReward + r.pointReward,
						})
					})
			})
	}

	leaderboard.sort((a, b) => {
		if (a.totalPoints === b.totalPoints) {
			return 0
		}
		return a.totalPoints > b.totalPoints ? -1 : 1
	})

	useEffect(() => {
		loadCompetitions({
			variables: {
				timeFrom: CompetitionDates[day].from,
				timeTo: CompetitionDates[day].to,
			},
		})

		// Add refresh comp reload option
		const now = new Date()
		if (CompetitionDates[day].to > now) {
			let t: NodeJS.Timeout

			const getReloadTimeout = () => {
				const now = new Date()
				const nextTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), Math.floor(now.getMinutes() / 10) * 10 + 11, 30, 0)
				return nextTime.getTime() - now.getTime()
			}

			const reloadStats = () => {
				// Check if we need to go to the next day instead
				const now = new Date()
				if (CompetitionDates[day + 1] && CompetitionDates[day + 1].from <= now && CompetitionDates[day + 1].to > now) {
					setDay((prev) => Math.min(CompetitionDates.length - 1, prev + 1))
					return
				}

				// Reload current comp
				loadCompetitions({
					variables: {
						timeFrom: CompetitionDates[day].from,
						timeTo: CompetitionDates[day].to,
					},
				})
				t = setTimeout(reloadStats, getReloadTimeout())
			}

			t = setTimeout(reloadStats, getReloadTimeout())
			return () => {
				clearTimeout(t)
			}
		}
	}, [day, loadCompetitions])

	return (
		<Box
			component={"section"}
			sx={{
				color: theme.palette.primary.contrastText,
				backgroundImage: "url(/comp-background.jpg)",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
				backgroundColor: "rgba(0,0,0,0.3)",
				boxShadow: "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
			}}
		>
			<Box
				sx={{
					display: !hideSideSection ? "flex" : undefined,
					justifyContent: hideSideSection ? "space-between" : undefined,
					p: 2,
				}}
			>
				{!hideSideSection && (
					<Box sx={{ display: "flex", flexDirection: "column", mr: 2 }}>
						<CalendarDate day={day} onDayChange={(d) => setDay(d)} />
						<Button
							type={"button"}
							variant={"contained"}
							color={"primary"}
							startIcon={<EventNote />}
							onClick={() => setShowSchedule(true)}
							sx={{ mt: 2 }}
						>
							Blitzes
						</Button>
						<Button
							type={"button"}
							variant={"contained"}
							color={"secondary"}
							startIcon={<EmojiEvents />}
							onClick={() => setShowOverallLeaderboard(true)}
							sx={{ mt: 1 }}
						>
							Leaderboard
						</Button>
					</Box>
				)}
				<Box
					sx={{
						flexGrow: hideSideSection ? undefined : 1,
						p: 2,
						borderRadius: theme.typography.pxToRem(8),
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Box sx={{ mr: 2 }}>
							<Typography
								component={"h2"}
								variant={"h3"}
								sx={{
									fontFamily: "Rajdhani,sans-serif",
									fontWeight: 600,
									letterSpacing: "1px",
								}}
							>
								Daily Leaderboard
							</Typography>
							{!hideSideSection && (
								<Typography
									sx={{
										mt: 0.5,
										fontSize: theme.typography.pxToRem(14),
										fontWeight: 300,
									}}
								>
									<em>{dayjs(CompetitionDates[day].from).format("DD MMM YYYY")}</em> to{" "}
									<em>{dayjs(CompetitionDates[day].to).format("DD MMM YYYY")}</em>
								</Typography>
							)}
							{hideSideSection && (
								<Select
									value={day}
									variant={"outlined"}
									size={"small"}
									onChange={(e) => {
										const val = typeof e.target.value === "string" ? parseInt(e.target.value, 10) : e.target.value
										if (!isNaN(val)) {
											setDay(val)
										}
									}}
									// input={<DaySelectInputBase />}
									sx={{
										mt: 1,
										backgroundColor: "rgba(200, 200, 200, 0.4)",
										color: "#eee",
										"& .MuiSvgIcon-root": {
											color: "#eee",
										},
										"& .MuiSelect-nativeInput": {
											borderColor: "#eee",
										},
										"& .MuiOutlinedInput-notchedOutline": {
											borderColor: "#eee",
										},
										// .css-1cub0o4-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline
										"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
											borderColor: "#fff",
										},
									}}
								>
									{CompetitionDates.map((c, i) => (
										<MenuItem key={`mobile-day-selector-${i}`} value={i}>
											<strong>Day {i + 1}</strong>&nbsp;-&nbsp;<em>{dayjs(CompetitionDates[i].from).format("DD MMM YYYY")}</em>
											{!isMobile && (
												<>
													&nbsp;to&nbsp;
													<em>{dayjs(CompetitionDates[i].to).format("DD MMM YYYY")}</em>
												</>
											)}
										</MenuItem>
									))}
								</Select>
							)}
							{shrinkRightSection && <CompCountdownText day={day} />}
						</Box>
						{!shrinkRightSection && <CompCountdownChip day={day} />}
					</Box>
					<Grid container spacing={2}>
						<Grid item lg={5.5} width={"100%"}>
							<TableContainer component={Paper}>
								<Table size={isMobile ? "small" : undefined}>
									<TableHead>
										<TableRow>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Rank</TableCell>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Member</TableCell>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee", textAlign: "right" }}>Folly Points</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{loading &&
											RANKS.map((r, i) => (
												<TableRow key={`current-blitz-info-lb-rank-loading-${i}`}>
													<TableCell>{r}</TableCell>
													<TableCell colSpan={2}>
														<Skeleton variant={"rectangular"} />
													</TableCell>
												</TableRow>
											))}
										{!loading && CompetitionDates[day].from > now && (
											<TableRow>
												<TableCell colSpan={3}>This competition has not started.</TableCell>
											</TableRow>
										)}
										{!loading && CompetitionDates[day].from <= now && leaderboard.length === 0 && (
											<TableRow>
												<TableCell colSpan={3}>No results yet wah...</TableCell>
											</TableRow>
										)}
										{!loading &&
											CompetitionDates[day].from <= now &&
											leaderboard.length > 0 &&
											RANKS.map((r, i) => {
												if (!leaderboard[i]) {
													return (
														<TableRow key={`current-blitz-info-lb-rank-${i}`}>
															<TableCell>{r}</TableCell>
															<TableCell colSpan={2}>
																<em>N/A</em>
															</TableCell>
														</TableRow>
													)
												}
												return (
													<TableRow key={`current-blitz-info-lb-rank-${i}`}>
														<TableCell>{r}</TableCell>
														<TableCell>
															<Link
																href={`https://www.nitrotype.com/racer/${leaderboard[i].username}`}
																target={"_blank"}
																rel={"external noreferrer"}
																color={"#222"}
															>
																{leaderboard[i].membershipType === MembershipType.GOLD && (
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
																<strong>{leaderboard[i].displayName}</strong>
															</Link>
														</TableCell>
														<TableCell sx={{ textAlign: "right" }}>{leaderboard[i].totalPoints}</TableCell>
													</TableRow>
												)
											})}
									</TableBody>
								</Table>
							</TableContainer>
							{error && <Alert severity={"error"}>Oh Folly, Stats Broken wah...</Alert>}
							{!loading && CompetitionDates[day].from <= now && leaderboard.length > 0 && (
								<Button
									type={"button"}
									variant={"contained"}
									color={"info"}
									startIcon={<EmojiEvents />}
									onClick={() => setShowDailyLeaderboard(true)}
									fullWidth
									sx={{ mt: 2 }}
								>
									View More
								</Button>
							)}
							{!loading &&
								data?.competitions.some((c) => [CompetitionStatus.FINISHED, CompetitionStatus.FAILED].includes(c.status)) &&
								CompetitionDates[day].from <= now && (
									<Button
										type={"button"}
										variant={"contained"}
										color={"info"}
										startIcon={<EmojiEvents />}
										onClick={() => setShowBlitzResults(true)}
										fullWidth
										sx={{ mt: 1 }}
									>
										View Blitz Results
									</Button>
								)}
							{!loading && CompetitionDates[day].from <= now && leaderboard.length > 0 && (
								<Button
									type={"button"}
									variant={"contained"}
									color={"info"}
									startIcon={<ShowChart />}
									onClick={() => setShowDailyStats(true)}
									fullWidth
									sx={{ mt: 1 }}
								>
									Daily Graph
								</Button>
							)}
							{hideSideSection && (
								<Button
									type={"button"}
									variant={"contained"}
									color={"info"}
									startIcon={<EmojiEvents />}
									onClick={() => setShowOverallLeaderboard(true)}
									fullWidth
									sx={{ mt: 1 }}
								>
									Main Leaderboard
								</Button>
							)}
						</Grid>
						<Grid item lg={6.5} width={"100%"}>
							<Box sx={{ borderRadius: "8px", border: `1px solid #eee`, backgroundColor: "rgba(60, 60, 60, 0.7)", p: 2 }}>
								<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
									<div>
										<Typography
											component={"h2"}
											variant={"h3"}
											gutterBottom
											sx={{
												fontFamily: "Rajdhani,sans-serif",
												fontWeight: 500,
												letterSpacing: "1px",
											}}
										>
											Blitz Rewards
											{shrinkRightSection && currentComp && (
												<span>
													&nbsp;(x{currentComp.multiplier}
													{currentComp.multiplier > 1 && " bonus"})
												</span>
											)}
										</Typography>
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<AccessTime sx={{ mr: "1ch", display: "inline-block" }} />
											<Typography sx={{ display: "flex", flexWrap: "wrap" }}>
												{!currentComp && <Skeleton variant={"rectangular"} sx={{ bgcolor: "grey.400" }} />}
												{currentComp && (
													<>
														<Box component={"span"} sx={{ mr: "1ch", fontWeight: 300 }}>{` ${dayjs(currentComp.startAt)
															.subtract(1, "m")
															.format("hh:mm A")} - ${dayjs(currentComp.finishAt).subtract(1, "m").format("hh:mm A")}`}</Box>
														<Box component={"small"} sx={{ fontWeight: 300 }}>
															({Intl.DateTimeFormat().resolvedOptions().timeZone})
														</Box>
													</>
												)}
											</Typography>
										</Box>
									</div>
									{!shrinkRightSection && (
										<div>
											<Box
												sx={{
													display: "flex",
													justifyContent: "center",
													alignItems: "center",
													width: "80px",
													height: "80px",
													textShadow: "2px 4px 3px rgba(0, 0, 0, 0.3)",
													backgroundImage: !loading && currentComp ? getMultiplierBackgroundColor(currentComp.multiplier) : "none",
													border: "2px solid yellow",
													borderRadius: "8px",
													fontFamily: "Rajdhani,sans-serif",
													fontSize: theme.typography.pxToRem(32),
													fontWeight: 800,
													color: "#fff",
												}}
											>
												{!loading && currentComp && `x${currentComp.multiplier}`}
												{loading && <CircularProgress sx={{ color: "grey.100" }} />}
											</Box>
										</div>
									)}
								</Box>
								<Typography component={"p"} variant={"caption"}>
									The following <em>Folly Points</em> given below:
								</Typography>
								<TableContainer
									component={Paper}
									sx={{
										border: `1px solid ${theme.palette.grey[200]}`,
										background: "transparent",
										borderRadius: "4px",
										"& .MuiTableCell-root": {
											color: "#fff",
										},
										"& .MuiTableRow-head  .MuiTableCell-root": {
											backgroundColor: "rgba(0, 0, 0, 0.8)",
										},
										"& .MuiTableBody-root .MuiTableRow-root:nth-of-type(odd) .MuiTableCell-root": {
											backgroundColor: "rgba(0, 0, 0, 0.25)",
										},
										"& .MuiTableBody-root .MuiTableRow-root:nth-of-type(even) .MuiTableCell-root": {
											backgroundColor: "transparent",
										},
									}}
								>
									<Table size={isMobile ? "small" : undefined}>
										<TableHead>
											<TableRow>
												<TableCell>Rank</TableCell>
												<TableCell>Races</TableCell>
												<TableCell>Accuracy</TableCell>
												<TableCell>Speed</TableCell>
												<TableCell>NT Points</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{RANKS.map((rank, i) => (
												<TableRow key={`current-blitz-info-rank-${i}`}>
													<TableCell>{rank}</TableCell>
													{loading && (
														<TableCell colSpan={4}>
															<Skeleton variant={"rectangular"} sx={{ bgcolor: "grey.400" }} />
														</TableCell>
													)}

													{!loading && currentComp?.grindRewards[i] && (
														<TableCell sx={{ fontWeight: 300 }}>
															{currentComp.multiplier * currentComp.grindRewards[i].points} points
														</TableCell>
													)}
													{!loading && !currentComp?.grindRewards[i] && <TableCell sx={{ fontWeight: 300 }}>???</TableCell>}

													{!loading && currentComp?.accuracyRewards[i] && (
														<TableCell sx={{ fontWeight: 300 }}>
															{currentComp.multiplier * currentComp.accuracyRewards[i].points} points
														</TableCell>
													)}
													{!loading && !currentComp?.accuracyRewards[i] && <TableCell sx={{ fontWeight: 300 }}>???</TableCell>}

													{!loading && currentComp?.speedRewards[i] && (
														<TableCell sx={{ fontWeight: 300 }}>
															{currentComp.multiplier * currentComp.speedRewards[i].points} points
														</TableCell>
													)}
													{!loading && !currentComp?.speedRewards[i] && <TableCell sx={{ fontWeight: 300 }}>???</TableCell>}

													{!loading && currentComp?.pointRewards[i] && (
														<TableCell sx={{ fontWeight: 300 }}>
															{currentComp.multiplier * currentComp.pointRewards[i].points} points
														</TableCell>
													)}
													{!loading && !currentComp?.pointRewards[i] && <TableCell sx={{ fontWeight: 300 }}>???</TableCell>}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							</Box>
							{hideSideSection && (
								<Button
									type={"button"}
									variant={"contained"}
									color={"info"}
									startIcon={<EventNote />}
									onClick={() => setShowSchedule(true)}
									fullWidth
									sx={{ mt: 1 }}
								>
									View Blitz Schedule
								</Button>
							)}
						</Grid>
					</Grid>
				</Box>
			</Box>
			<DailyLeaderboardDialog
				show={showDailyLeaderboard}
				startAt={CompetitionDates[day].from}
				finishAt={CompetitionDates[day].to}
				leaderboard={leaderboard}
				onClose={() => setShowDailyLeaderboard(false)}
			/>
			<DailyStatsDialog
				show={showDailyStats}
				startAt={CompetitionDates[day].from}
				finishAt={CompetitionDates[day].to}
				competitions={data?.competitions}
				onClose={() => setShowDailyStats(false)}
			/>
			<BlitzResultsDialog
				show={showBlitzResults}
				startAt={CompetitionDates[day].from}
				finishAt={CompetitionDates[day].to}
				competitions={data?.competitions}
				onClose={() => setShowBlitzResults(false)}
			/>
			<OverallLeaderboardDialog show={showOverallLeaderboard} onClose={() => setShowOverallLeaderboard(false)} />
			<BlitzScheduleDialog show={showSchedule} defaultDay={day} onClose={() => setShowSchedule(false)} />
		</Box>
	)
}

const getMultiplierBackgroundColor = (m: number) => {
	switch (m) {
		case 1:
			return "radial-gradient(#c5c5c5, #3a3a3a)"
		case 2:
			return "radial-gradient(#2cc0ff, #143877)"
		case 4:
			return "radial-gradient(#c359ff, #4c2483)"
		case 8:
			return "radial-gradient(#ea8d23, #78371d)"
	}
	return undefined
}
