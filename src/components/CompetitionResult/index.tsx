import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useTheme, Box, Paper, Typography, Chip, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { AccessTime, EmojiEvents } from "@mui/icons-material"
import { CalendarDate } from "./calendarDate"

dayjs.extend(relativeTime)

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
							Daily Leaderboard
						</Typography>
						<Chip
							variant={"filled"}
							color={"error"}
							label={"Ends in"}
							sx={{
								fontFamily: "Rajdhani,sans-serif",
								fontWeight: 500,
							}}
						/>
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
										<TableRow>
											<TableCell>🥇 1st</TableCell>
											<TableCell>Test Cakes</TableCell>
											<TableCell>10 Points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🥈 2nd</TableCell>
											<TableCell>Test Cakes</TableCell>
											<TableCell>7 Points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🥉 3rd</TableCell>
											<TableCell>Test Cakes</TableCell>
											<TableCell>5 Points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🎖️ 4th</TableCell>
											<TableCell>Test Cakes</TableCell>
											<TableCell>3 Points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🎖️ 5th</TableCell>
											<TableCell>Test Cakes</TableCell>
											<TableCell>1 Points</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
							<Button type={"button"} variant={"outlined"} color={"inherit"} startIcon={<EmojiEvents />} fullWidth sx={{ mt: 2 }}>
								View More
							</Button>
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
										<span>{` 10:00 AM - 10:10 AM`}</span>
									</Typography>
								</div>
								<div>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											width: "80px",
											height: "80px",
											textShadow: "2px 4px 3px rgba(0, 0, 0, 0.3)",
											backgroundImage: "radial-gradient(#fff92c, #584707)",
											border: "2px solid yellow",
											borderRadius: "8px",
											fontFamily: "Rajdhani,sans-serif",
											fontSize: theme.typography.pxToRem(32),
											fontWeight: 800,
											color: "#fff",
										}}
									>
										x4
									</Box>
								</div>
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
										<TableRow>
											<TableCell>🥇 1st</TableCell>
											<TableCell>10 points</TableCell>
											<TableCell>10 points</TableCell>
											<TableCell>10 points</TableCell>
											<TableCell>10 points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🥈 2nd</TableCell>
											<TableCell>7 points</TableCell>
											<TableCell>7 points</TableCell>
											<TableCell>7 points</TableCell>
											<TableCell>7 points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🥉 3rd</TableCell>
											<TableCell>5 points</TableCell>
											<TableCell>5 points</TableCell>
											<TableCell>5 points</TableCell>
											<TableCell>5 points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🎖️ 4th</TableCell>
											<TableCell>3 points</TableCell>
											<TableCell>3 points</TableCell>
											<TableCell>3 points</TableCell>
											<TableCell>3 points</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>🎖️ 4th</TableCell>
											<TableCell>1 points</TableCell>
											<TableCell>1 points</TableCell>
											<TableCell>1 points</TableCell>
											<TableCell>1 points</TableCell>
										</TableRow>
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
