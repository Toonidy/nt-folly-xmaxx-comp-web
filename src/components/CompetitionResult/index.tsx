import dayjs from "dayjs"
import { useState, useEffect } from "react"
import { gql, useLazyQuery } from "@apollo/client"
import { useTheme, Box, Paper, Typography, Link, Skeleton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { AccessTime } from "@mui/icons-material"
import { CalendarDate } from "./calendarDate"
import { CompCountdownChip } from "./compCountdownChip"
import { CompetitionDates } from "../../constants/competitions"

/** Ranks List for iterating purposes. */
const RANKS = ["🥇 1st", "🥈 2nd", "🥉 3rd", "🎖️ 4th", "🎖️ 5th"]

/** GQL query to get competition rewards between 2 dates. */
const COMPETITIONS = gql`
	query competitions($timeFrom: Time!, $timeTo: Time!) {
		competitions(timeRange: { timeFrom: $timeFrom, timeTo: $timeTo }) {
			id
			multiplier
			startAt
			finishAt
			leaderboard {
				id
				speedReward
				accuracyReward
				grindReward
				pointReward
				user {
					id
					username
					displayName
					status
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

/** Competition Rewards gql object. */
interface Competition {
	id: string
	multiplier: number
	startAt: Date
	finishAt: Date
	leaderboard: CompetitionUser[]
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

/** User Status values. */
enum UserStatus {
	NEW = "NEW",
	ACTIVE = "ACTIVE",
	DISQUALIFIED = "DISQUALIFIED",
}

/** Competition User gql obj. */
interface CompetitionUser {
	id: string
	speedReward: number
	accuracyReward: number
	grindReward: number
	pointReward: number
	user: {
		username: string
		displayName: string
		status: UserStatus
	}
}

/** Leaderboard Table Record Data. */
interface LeaderboardEntry {
	username: string
	displayName: string
	totalPoints: number
}

/**
 * Competition Result Section.
 */
export const CompetitionResult = () => {
	const theme = useTheme()
	const now = new Date()
	const [day, setDay] = useState(() => {
		const result = CompetitionDates.findIndex((t) => t.from <= now && t.to > now)
		if (result === -1) {
			return 0
		}
		return result
	})

	const [loadCompetitions, { data, loading }] = useLazyQuery<{ competitions: Competition[] }>(COMPETITIONS)

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
					.filter((r) => r.accuracyReward + r.grindReward + r.speedReward + r.pointReward > 0)
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
	}, [day, loadCompetitions])

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
					<CalendarDate onDayChange={(d) => setDay(d)} />
				</Box>
				<Box
					sx={{
						flexGrow: 1,
						p: 2,
						borderRadius: theme.typography.pxToRem(8),
						backgroundColor: "rgba(0, 0, 0, 0.7)",
					}}
				>
					<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
						<Typography
							component={"h2"}
							variant={"h3"}
							sx={{
								fontFamily: "Rajdhani,sans-serif",
								fontWeight: 500,
								fontStyle: "italic",
								letterSpacing: "1px",
							}}
						>
							Daily Leaderboard - {dayjs(CompetitionDates[day].from).format("DD MMM YYYY")} to{" "}
							{dayjs(CompetitionDates[day].to).format("DD MMM YYYY")}
						</Typography>
						<CompCountdownChip day={day} />
					</Box>

					<Box sx={{ display: "flex" }}>
						<Box sx={{ mr: 2, maxWidth: "400px" }}>
							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Rank</TableCell>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Member</TableCell>
											<TableCell sx={{ backgroundColor: "#697F42", color: "#eee" }}>Folly Points</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{loading && (
											<TableRow>
												<TableCell colSpan={3}>Loading...</TableCell>
											</TableRow>
										)}
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
																<strong>{leaderboard[i].displayName}</strong>
															</Link>
														</TableCell>
														<TableCell>{leaderboard[i].totalPoints} Points</TableCell>
													</TableRow>
												)
											})}
									</TableBody>
								</Table>
							</TableContainer>
							{/* <Button type={"button"} variant={"outlined"} color={"inherit"} startIcon={<EmojiEvents />} fullWidth sx={{ mt: 2 }}>
								View More
							</Button> */}
						</Box>
						<Box sx={{ flexGrow: 1, borderRadius: "8px", border: `1px solid #eee`, backgroundColor: "rgba(60, 60, 60, 0.7)", p: 2 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
								<div>
									<Typography
										component={"h2"}
										variant={"h3"}
										gutterBottom
										sx={{
											fontFamily: "Rajdhani,sans-serif",
											fontWeight: 500,
											fontStyle: "italic",
											letterSpacing: "1px",
										}}
									>
										Blitz Rewards
									</Typography>
									<Typography sx={{ display: "flex" }}>
										<AccessTime sx={{ mr: "1ch" }} />
										{currentComp && (
											<span>{` ${dayjs(currentComp.startAt).subtract(1, "m").format("hh:mm A")} - ${dayjs(currentComp.finishAt)
												.subtract(1, "m")
												.format("hh:mm A")}`}</span>
										)}
									</Typography>
								</div>
								{currentComp && (
									<div>
										<Box
											sx={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
												width: "80px",
												height: "80px",
												textShadow: "2px 4px 3px rgba(0, 0, 0, 0.3)",
												backgroundImage: getMultiplierBackgroundColor(currentComp.multiplier),
												border: "2px solid yellow",
												borderRadius: "8px",
												fontFamily: "Rajdhani,sans-serif",
												fontSize: theme.typography.pxToRem(32),
												fontWeight: 800,
												color: "#fff",
											}}
										>
											x{currentComp.multiplier}
										</Box>
									</div>
								)}
							</Box>
							<TableContainer
								sx={{
									border: `1px solid ${theme.palette.grey[200]}`,
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
								<Table>
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
														<Skeleton variant={"rectangular"} />
													</TableCell>
												)}

												{!loading && currentComp?.grindRewards[i] && (
													<TableCell>{currentComp.multiplier * currentComp.grindRewards[i].points} points</TableCell>
												)}
												{!loading && !currentComp?.grindRewards[i] && <TableCell>???</TableCell>}

												{!loading && currentComp?.accuracyRewards[i] && (
													<TableCell>{currentComp.multiplier * currentComp.accuracyRewards[i].points} points</TableCell>
												)}
												{!loading && !currentComp?.accuracyRewards[i] && <TableCell>???</TableCell>}

												{!loading && currentComp?.speedRewards[i] && (
													<TableCell>{currentComp.multiplier * currentComp.speedRewards[i].points} points</TableCell>
												)}
												{!loading && !currentComp?.speedRewards[i] && <TableCell>???</TableCell>}

												{!loading && currentComp?.pointRewards[i] && (
													<TableCell>{currentComp.multiplier * currentComp.pointRewards[i].points} points</TableCell>
												)}
												{!loading && !currentComp?.pointRewards[i] && <TableCell>???</TableCell>}
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

const getMultiplierBackgroundColor = (m: number) => {
	switch (m) {
		case 1:
			return "radial-gradient(#6abb1e, #175117)"
		case 2:
			return "radial-gradient(#2cc0ff, #143877)"
		case 4:
			return "radial-gradient(#c359ff, #4c2483)"
		case 8:
			return "radial-gradient(#ea8d23, #78371d)"
	}
	return undefined
}
