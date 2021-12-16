import { useTheme, Box, Typography } from "@mui/material"

/**
 * Display the Team Logo and Website Title.
 */
export const Logo = () => {
	const theme = useTheme()

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				mb: 2,
			}}
		>
			<Box
				component={"img"}
				src={"/logo.svg"}
				alt={"Team Logo"}
				sx={{
					width: "128px",
					height: "140px",
					mr: 2,
				}}
			/>
			<div>
				<Typography
					sx={{
						mb: 1,
						fontFamily: "'Architects Daughter', cursive",
						color: theme.palette.getContrastText(theme.palette.background.default),
						fontSize: theme.typography.pxToRem(42),
					}}
				>
					Folly Times
				</Typography>
				<Typography sx={{ color: theme.palette.getContrastText(theme.palette.background.default) }}>2021 Xmaxx Big Competition!</Typography>
			</div>
		</Box>
	)
}
