import dayjs from "dayjs"
import Snowfall from "react-snowfall"
import { useIsMobile } from "./hooks/useIsMobile"
import { useTheme, Box, Paper, Container, Typography, Link, Grid, Button } from "@mui/material"
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
	const { isMobile, mobileMediaQuery } = useIsMobile()
	return (
		<>
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
								[theme.breakpoints.down(415)]: {
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
									Collect <em>Folly Points</em> by winning 10 minute blitz! The following blitz challenges include:
								</Typography>
								<ul>
									<Typography component={"li"}>Most Races</Typography>
									<Typography component={"li"}>Top Speed (ordered by most races)</Typography>
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
									, the player with the most collected <em>Folly Points</em> within the day will win <NTCashIcon />
									{" 15 million!"}
								</Typography>
								<Typography gutterBottom>
									At the end of the competition, the players with the most collected <em>Folly Points</em> throughout the <em>week</em> will
									win the following:
								</Typography>
								<ul>
									<Typography component={"li"}>
										<strong>Non Gold members</strong> - Top 2 Racers will win Nitro Type Gold
									</Typography>
									<Typography component={"li"}>
										<strong>Already Gold members</strong> - Top Racer will win <NTCashIcon /> 125 million
									</Typography>
								</ul>
								<Typography gutterBottom>GLHF!</Typography>
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
										Don't have time to race? Just do <em>one</em> and try to win the <code>Speed</code> and <code>Accuracy</code> reward on
										any <em>blitz timeslot</em>.
									</Typography>
									<Typography component={"li"}>
										If you plan to a certain amount of races in one session, always do the last race on the next Blitz Time. That way you
										can enter <code>Speed</code> and <code>Accuracy</code> blitz.
									</Typography>
									<Typography component={"li"}>
										Blitzes technically starts and ends at every <code>X:X1</code>; the scheduled times displayed are for easy readings. For
										example: when doing <em>9:00 AM to 9:10 AM</em>, all scores are recorded if you race between <em>9:01 AM to 9:11 AM</em>{" "}
										instead.
									</Typography>
									<Typography component={"li"}>
										When you finish a race, don't wait for the <em>Result Screen</em>, refresh the webpage (<code>Ctrl+R</code> or{" "}
										<code>F5</code>) <small>(NOTE: You can use a Userscript to do this automatically)</small>
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
														<strong>React</strong>
													</Link>
													{" the engine behind many things for the below"}
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<Link href={"https://mui.com/"} color={"#ddd"} target={"_blank"} rel={"external noreferrer"}>
														<strong>MUI v5</strong>
													</Link>
													{" UI kit framework to layout this webpage"}
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<Link
														href={"https://www.npmjs.com/package/pure-react-carousel"}
														color={"#ddd"}
														target={"_blank"}
														rel={"external noreferrer"}
													>
														<strong>pure-react-carousel</strong>
													</Link>
													{" for the slider prize items"}
												</Typography>
												<Typography component={"li"} variant={"body2"} gutterBottom sx={{ fontWeight: 300 }}>
													<Link
														href={"https://www.npmjs.com/package/react-countdown"}
														color={"#ddd"}
														target={"_blank"}
														rel={"external noreferrer"}
													>
														<strong>react-countdown</strong>
													</Link>
													{" for the awesome end of competition countdown"}
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
			<Snowfall />
		</>
	)
}
