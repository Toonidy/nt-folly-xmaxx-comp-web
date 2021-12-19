import Countdown from "react-countdown"
import { useTheme, Box, Typography } from "@mui/material"
import { MainCompetitionRange } from "../../constants/competitions"

/**
 * Display a Countdown and the Competition Date.
 */
export const CompetitionTimer = () => {
	const theme = useTheme()

	return (
		<Box
			component={"section"}
			sx={{
				p: 2,
				mb: 2,
				background: "#fd1a00",
				color: "#eee",
				boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
			}}
		>
			<Typography
				sx={{
					fontFamily: "Rajdhani, sans-serif",
					fontWeight: 500,
					fontSize: theme.typography.pxToRem(24),
					textAlign: "center",
					[theme.breakpoints.down(740)]: {
						fontSize: theme.typography.pxToRem(22),
					},
				}}
			>
				<Countdown
					date={MainCompetitionRange.to.getTime()}
					renderer={({ days, hours, minutes, seconds, completed }) => {
						if (completed) {
							return "This competition has ended! See the results above for the winners."
						}
						return (
							<>
								{`Competition ends in: `}
								<Box
									component={"strong"}
									sx={{
										[theme.breakpoints.down(740)]: {
											display: "block",
										},
									}}
								>
									{days} days, {hours} hours, {minutes} minutes and {seconds} seconds
								</Box>
							</>
						)
					}}
				/>
			</Typography>
		</Box>
	)
}
