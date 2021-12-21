import { useIsMobile } from "../../hooks/useIsMobile"
import { useTheme, Box, Typography } from "@mui/material"

/**
 * Display the Team Logo and Website Title.
 */
export const Logo = () => {
	const theme = useTheme()
	const { isMobile } = useIsMobile()

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
			}}
		>
			{isMobile && (
				<>
					<Box
						component={"img"}
						src={"/favicon-32x32.png"}
						alt={"Team Logo"}
						sx={{
							mr: 2,
							width: "32px",
							height: "32px",
						}}
					/>
					<div>
						<Typography
							sx={{
								fontFamily: "'Architects Daughter', cursive",
								fontSize: theme.typography.pxToRem(20),
								fontWeight: 600,
								color: theme.palette.getContrastText(theme.palette.background.default),
							}}
						>
							Folly Times
						</Typography>
						<Typography
							sx={{
								color: theme.palette.getContrastText(theme.palette.background.default),
								fontSize: theme.typography.pxToRem(12),
							}}
						>
							2021 Xmaxx Big Competition!
						</Typography>
					</div>
				</>
			)}
			{!isMobile && (
				<>
					<Box
						component={"img"}
						src={"/logo.svg"}
						alt={"Team Logo"}
						sx={{
							width: "128px",
							height: "140px",
							mr: 2,
							[theme.breakpoints.down(401)]: {
								width: "110px",
								height: "120px",
							},
						}}
					/>
					<div>
						<Typography
							sx={{
								mb: 1,
								fontFamily: "'Architects Daughter', cursive",
								fontWeight: 500,
								fontSize: theme.typography.pxToRem(42),
								color: theme.palette.getContrastText(theme.palette.background.default),
								[theme.breakpoints.down(451)]: {
									fontSize: theme.typography.pxToRem(36),
								},
								[theme.breakpoints.down(401)]: {
									fontSize: theme.typography.pxToRem(32),
								},
							}}
						>
							Folly Times
						</Typography>
						<Typography
							sx={{
								color: theme.palette.getContrastText(theme.palette.background.default),
								fontSize: theme.typography.pxToRem(16),
								[theme.breakpoints.down(451)]: {
									fontSize: theme.typography.pxToRem(14),
								},
								[theme.breakpoints.down(401)]: {
									fontSize: theme.typography.pxToRem(12),
								},
							}}
						>
							2021 Xmaxx Big Competition!
						</Typography>
					</div>
				</>
			)}
		</Box>
	)
}
