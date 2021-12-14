import Snowfall from "react-snowfall"
import { useTheme, Box, Paper, Container, Typography, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { Logo } from "./components/PageHeader/logo"
import { PrizeInfo } from "./components/PageHeader/prizeInfo"
import { NTCashIcon } from "./components/Icon/ntCash"

/**
 * Main App for the Folly Times Xmaxx Comp.
 */
export const App = () => {
	const theme = useTheme()
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				height: "100vh",
			}}
		>
			<Snowfall />

			<Container sx={{ position: "relative", mt: 4 }}>
				<Paper elevation={0} sx={{ borderRadius: 4 }}>
					{/* Header */}
					<Box
						component={"header"}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							backgroundColor: "#839E53",
							borderTopLeftRadius: "16px",
							borderTopRightRadius: "16px",
							p: 2,
						}}
					>
						<Logo />
						<PrizeInfo />
					</Box>

					{/* Body */}
					<main>
						<Box
							sx={{
								mb: 2,
								py: 4,
								px: 2,
								backgroundColor: theme.palette.grey[400],
								color: theme.palette.getContrastText(theme.palette.grey[400]),
								fontSize: theme.typography.pxToRem(24),
								fontWeight: 600,
								textAlign: "center",
							}}
						>
							Comp Page coming soon hehe...
						</Box>
						<Box component={"main"} sx={{ p: 2 }}>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<div>
									<Typography variant={"h2"} gutterBottom sx={{ fontFamily: "Rajdhani, sans-serif" }}>
										How to Win
									</Typography>
									<Typography gutterBottom>
										Win <em>Folly Points</em> by winning 10 minute blitz! The following blitz challenges include:
									</Typography>
									<ul>
										<Typography component={"li"}>Most Races</Typography>
										<Typography component={"li"}>Highest Speed (ordered by most races)</Typography>
										<Typography component={"li"}>Most Accurate (ordered by most races)</Typography>
										<Typography component={"li"}>
											Most Points earned on Nitro Type (ordered by most races){" "}
											<sup>
												<Link href={"#win-cite-1"}>[1]</Link>
											</sup>
										</Typography>
									</ul>
									<Typography gutterBottom>
										Every day at 9:30AM, the player wih most collected points within the day will win <NTCashIcon />
										{" 15 million!"}
									</Typography>
									<Typography gutterBottom>
										At the end of the competition, I'll announce the winners for the big prizes (listed above). GLHF!
									</Typography>
									<Typography variant={"h2"} gutterBottom sx={{ mt: 2, fontFamily: "Rajdhani, sans-serif" }}>
										Rules
									</Typography>
									<ol>
										<Typography component={"li"}>All prizes are given at the end of the competition</Typography>
										<Typography component={"li"}>Should you leave the team, you are disqualified and cannot enter again</Typography>
										<Typography component={"li"}>If you are kicked from the team, you are disqualified and cannot enter again</Typography>
										<Typography component={"li"}>
											In result of tie during the <em>10 minute blitz</em>, winners involved will claim the points
										</Typography>
										<Typography component={"li"}>
											If a tie has occurred in the any of the <em>Prizes</em>, the <em>captain</em> will review and reward the deserved
											winner.
										</Typography>
									</ol>
									<Typography id={"#win-site-1"} variant={"caption"}>
										1. Formula for Most Points earned on Nitro Type: <code>[Races] * ((100 + (WPM / 2)) * [Accuracy / 100])</code>
									</Typography>
								</div>
								<Box sx={{ ml: 2 }}>
									<Typography component={"h2"} variant={"h4"} gutterBottom sx={{ fontFamily: "Rajdhani, sans-serif" }}>
										Blitz Rewards
									</Typography>
									<TableContainer sx={{ border: `1px solid ${theme.palette.grey[200]}`, borderRadius: "4px", width: "300px" }}>
										<Table>
											<TableHead>
												<TableRow>
													<TableCell>Rank</TableCell>
													<TableCell>Points Rewarded</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												<TableRow>
													<TableCell>🥇 1st</TableCell>
													<TableCell>10 Points</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>🥈 2nd</TableCell>
													<TableCell>7 Points</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>🥉 3rd</TableCell>
													<TableCell>5 Points</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>🎖️ 4th</TableCell>
													<TableCell>3 Points</TableCell>
												</TableRow>
												<TableRow>
													<TableCell>🎖️ 4th</TableCell>
													<TableCell>1 Points</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableContainer>
								</Box>
							</Box>
						</Box>
					</main>
				</Paper>

				{/* Footer */}
				<Typography
					component={"footer"}
					variant={"body2"}
					sx={{
						position: "relative",
						mt: 4,
						color: theme.palette.getContrastText(theme.palette.background.default),
						textAlign: "center",
					}}
				>
					Copyright &copy; {new Date().getFullYear()} <Link href={"https://folly.team/"}>Folly Times</Link>
				</Typography>
			</Container>
		</Box>
	)
}
