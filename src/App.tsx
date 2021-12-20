import dayjs from "dayjs"
import Snowfall from "react-snowfall"
import { useTheme, useMediaQuery, Box, Paper, Container, Typography, Link, Grid, Button } from "@mui/material"
import { Logo } from "./components/PageHeader/logo"
import { NTCashIcon } from "./components/Icon/ntCash"
import { CompetitionResult } from "./components/CompetitionResult"
import { CompetitionTimer } from "./components/CompetitionTimer"
import { PrizeSection } from "./components/PrizeSection"
import { MainCompetitionRange } from "./constants/competitions"

/**
 * Main App for the Folly Times Xmaxx Comp.
 */
export const App = () => {
	const theme = useTheme()
	const mobileMediaQuery = theme.breakpoints.down(376)
	const isMobile = useMediaQuery(mobileMediaQuery)
	return (
		<>
			<Snowfall />
			<Box
				sx={{
					minHeight: "calc(100vh - 4rem)",
					[mobileMediaQuery]: {
						minHeight: "100vh",
					},
				}}
			>
				<Container
					disableGutters={isMobile}
					sx={{
						my: "2rem",
						[mobileMediaQuery]: {
							my: 0,
						},
					}}
				>
					<Paper elevation={0} sx={{ borderRadius: "16px" }}>
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
								[theme.breakpoints.down(376)]: {
									borderTopLeftRadius: "unset",
									borderTopRightRadius: "unset",
								},
							}}
						>
							<Logo />
						</Box>

						{/* Body */}
						<main>
							<CompetitionResult />
							<PrizeSection />
							<CompetitionTimer />

							{/* Comp Info Section */}
							<Box component={"section"} sx={{ p: 2 }}>
								<Typography variant={"h2"} gutterBottom sx={{ fontFamily: "Rajdhani, sans-serif", fontWeight: 600 }}>
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
									Every day at 9:30AM EST{" "}
									<small>
										({dayjs(new Date(MainCompetitionRange.from)).format("hh:mm A")} {Intl.DateTimeFormat().resolvedOptions().timeZone})
									</small>
									, the player wih most collected points within the day will win <NTCashIcon />
									{" 15 million!"}
								</Typography>
								<Typography gutterBottom>
									At the end of the competition, I'll announce the winners for the big prizes (listed above). GLHF!
								</Typography>
								<Typography variant={"h2"} gutterBottom sx={{ mt: 2, fontFamily: "Rajdhani, sans-serif", fontWeight: 600 }}>
									Rules
								</Typography>
								<ol>
									<Typography component={"li"}>All prizes are given at the end of the competition</Typography>
									<Typography component={"li"}>
										Should you leave the team during the competition period, you are disqualified and cannot enter again
									</Typography>
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
								<Typography variant={"h2"} gutterBottom sx={{ mt: 2, fontFamily: "Rajdhani, sans-serif", fontWeight: 600 }}>
									Tips
								</Typography>
								<ul>
									<Typography component={"li"}>
										View the Blitz Challenge Calendar and try to win <em>Bonus Points</em>
									</Typography>
									<Typography component={"li"}>
										Don't have time to race? Just do <em>one</em> and try to win the accuracy reward at any <em>blitz timeslot</em>.
									</Typography>
									<Typography component={"li"}>
										Blitzes technically starts and ends at every X:X1; the scheduled times displayed are for easy readings
									</Typography>
								</ul>
							</Box>

							{/* Credits Section */}
							<Box component={"section"} sx={{ p: 2, backgroundColor: "#3e6791" }}>
								<Typography
									variant={"h2"}
									sx={{
										fontFamily: "Rajdhani, sans-serif",
										fontWeight: 600,
										textAlign: "center",
										color: "#fff",
									}}
								>
									Thank You!
								</Typography>
								<Typography sx={{ color: "#ddd", textAlign: "center", fontWeight: 500, mb: 2 }}>For making this comp possible.</Typography>
								<Grid container spacing={2}>
									<Grid item md={4} width={"100%"}>
										<Paper elevation={0} sx={{ p: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#ddd", height: "100%" }}>
											<Typography
												variant={"h5"}
												component={"h3"}
												sx={{
													fontFamily: "Rajdhani, sans-serif",
													fontWeight: 600,
													mb: 2,
													color: "#eee",
													textTransform: "uppercase",
													textAlign: "center",
												}}
											>
												Nitro Type Community
											</Typography>
											<Typography variant={"body2"} sx={{ fontWeight: 300 }}>
												I would also like to thank the following:
											</Typography>
											<ul>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<strong>
														<Link
															href={"https://www.nitrotype.com/racer/agentgarbo"}
															color={"#ddd"}
															target={"_blank"}
															rel={"external noreferrer"}
														>
															agentgarbo
														</Link>
													</strong>{" "}
													for helping this team behind the scenes. The competition format would not had been thought of thanks to
													learning more about <em>Team Stats</em> refresh times.
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													{"Various donators including: "}
													<strong>
														<Link
															href={"https://www.nitrotype.com/racer/gorniak"}
															color={"#ddd"}
															target={"_blank"}
															rel={"external noreferrer"}
														>
															gorniak
														</Link>
													</strong>
													{" and "}
													<strong>
														<Link
															href={"https://www.nitrotype.com/racer/rookieofro"}
															color={"#ddd"}
															target={"_blank"}
															rel={"external noreferrer"}
														>
															Merry Christmas
														</Link>
													</strong>
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<strong>
														<Link
															href={"https://www.nitrotype.com/racer/margesimpson07"}
															color={"#ddd"}
															target={"_blank"}
															rel={"external noreferrer"}
														>
															ack!
														</Link>
													</strong>
													{" for helping keep this team active!"}
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													Our loyal members at <em>Folly Times</em>
												</Typography>
												<Typography component={"li"} variant={"body2"} sx={{ fontWeight: 300 }}>
													Mostly... <strong>Nitro Type</strong> for making a fun typing game experience!
												</Typography>
											</ul>
										</Paper>
									</Grid>
									<Grid item md={4} width={"100%"}>
										<Paper elevation={0} sx={{ p: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#ddd", height: "100%" }}>
											<Typography
												variant={"h5"}
												component={"h3"}
												sx={{
													fontFamily: "Rajdhani, sans-serif",
													fontWeight: 600,
													mb: 2,
													color: "#eee",
													textTransform: "uppercase",
													textAlign: "center",
												}}
											>
												Resources
											</Typography>
											<Typography variant={"body2"} sx={{ fontWeight: 300 }}>
												The following was used for this web page:
											</Typography>
											<ul>
												<Typography component={"li"} variant={"body2"} gutterBottom>
													<Link href={"https://reactjs.org/"} color={"#ddd"} target={"_blank"} rel={"external noreferrer"}>
														<strong>React JS</strong>
													</Link>{" "}
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom>
													<Link href={"https://mui.com/"} color={"#ddd"} target={"_blank"} rel={"external noreferrer"}>
														<strong>Material UI v5</strong>
													</Link>
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													{"The awesome "}
													<Link
														href={"https://www.npmjs.com/package/react-snowfall"}
														color={"#ddd"}
														target={"_blank"}
														rel={"external noreferrer"}
													>
														<strong>react-snowfall</strong>
													</Link>{" "}
													NPM package for ReactJS
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<Link
														href={"https://www.pexels.com/photo/close-up-of-christmas-decoration-hanging-on-tree-250177/"}
														color={"#ddd"}
														target={"_blank"}
														rel={"external noreferrer"}
													>
														Cool Christmas Tree Photo! by <strong>Gary Spears</strong> from <strong>Pexels</strong>
													</Link>
												</Typography>
											</ul>
										</Paper>
									</Grid>
									<Grid item md={4} width={"100%"}>
										<Paper elevation={0} sx={{ p: 2, backgroundColor: "rgba(0, 0, 0, 0.2)", color: "#ddd", height: "100%" }}>
											<Typography
												variant={"h5"}
												component={"h3"}
												sx={{
													fontFamily: "Rajdhani, sans-serif",
													fontWeight: 600,
													mb: 2,
													color: "#eee",
													textTransform: "uppercase",
													textAlign: "center",
												}}
											>
												And you, the Visitor!
											</Typography>
											<Typography variant={"body2"} sx={{ mb: 2, fontWeight: 300 }}>
												Want to join our <em>Fun</em> and <em>Rewarding</em> team with <em>Daily Competitions</em>? Visit our{" "}
												<strong>Nitro Type Team</strong> page!
											</Typography>
											<Typography variant={"body2"} sx={{ mb: 2, fontWeight: 300 }}>
												Join and Leave anytime! All I ask is for you to do at least <em>25 races</em> and have a <em>Folly Time</em>!
											</Typography>
											<Typography variant={"body2"} sx={{ textAlign: "right", mb: 2 }}>
												<Link href={"https://www.nitrotype.com/racer/follycakes"} target={"_blank"} color={"#ddd"}>
													- Silje P. Entidy
												</Link>
											</Typography>
											<Box sx={{ display: "flex" }}>
												<Button
													component={"a"}
													href={"https://www.nitrotype.com/team/FOLLY"}
													target={"_blank"}
													rel={"external noreferrer"}
													variant={"contained"}
													color={"error"}
													sx={{
														m: "0 auto",
														width: "50%",
														maxWidth: "200px",
													}}
												>
													Join Now!
												</Button>
											</Box>
										</Paper>
									</Grid>
								</Grid>
							</Box>
						</main>

						{/* Footer */}
						<Box
							component={"footer"}
							sx={{
								position: "relative",
								p: 2,
								borderBottomLeftRadius: "14px",
								borderBottomRightRadius: "14px",
								backgroundColor: theme.palette.grey[800],
								[mobileMediaQuery]: {
									borderBottomLeftRadius: "unset",
									borderBottomRightRadius: "unset",
								},
							}}
						>
							<Grid container component={"footer"} spacing={2}>
								<Grid item xs={12} sm={6}>
									<Typography
										variant={"body2"}
										sx={{
											position: "relative",
											color: theme.palette.getContrastText(theme.palette.background.default),
											[theme.breakpoints.down("sm")]: {
												textAlign: "center",
											},
										}}
									>
										Copyright &copy; {new Date().getFullYear()}{" "}
										<Link href={"https://folly.team/"} sx={{ fontWeight: 600, color: "#eee" }}>
											Folly Times
										</Link>
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
									<Link
										href={"https://www.nitrotype.com/"}
										underline={"none"}
										target={"_blank"}
										rel={"external noreferrer"}
										color={"#eee"}
										title={"Visit Nitro Type to Learn to Type and have Fun!"}
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "flex-end",
											[theme.breakpoints.down("sm")]: {
												justifyContent: "center",
												textAlign: "center",
											},
										}}
									>
										<img src={"/nt-16x16.png"} alt={"Nitro Type Logo"} />
										<Typography
											component={"span"}
											variant={"body2"}
											sx={{
												ml: "1ch",
												fontSize: theme.typography.pxToRem(12),
												color: "rgba(255, 255, 255, 0.7)",
											}}
										>
											Visit Nitro Type
										</Typography>
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Paper>
				</Container>
			</Box>
		</>
	)
}
