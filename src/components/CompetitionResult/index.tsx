import { useTheme, Box } from "@mui/material"

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
				color: theme.palette.primary.contrastText,
				fontSize: theme.typography.pxToRem(24),
				fontWeight: 600,
				textAlign: "center",
			}}
		>
			<Box
				sx={{
					py: 4,
					px: 2,
					height: "400px",
					backgroundColor: "rgba(0,0,0,0.3)",
				}}
			>
				Comp Page coming soon hehe...
			</Box>
		</Box>
	)
}
