import dayjs from "dayjs"
import { useIsMobile } from "../../hooks/useIsMobile"
import { ResponsiveContainer, LineChart, XAxis, YAxis, Line } from "recharts"
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Skeleton } from "@mui/material"
import { Competition } from "./types"

/** Chart Data for Graph. */
interface TotalRaceChartData {
	time: string
	users: Record<string, number>
}

/** Props for <DailyStatDialog>. */
interface Props {
	show: boolean
	startAt: Date
	finishAt: Date
	competitions?: Competition[]
	onClose: () => void
}

/**
 * Displays a Dialog window containing Daily Comp stats.
 */
export const DailyStatsDialog = (props: Props) => {
	const { show, competitions, startAt, finishAt, onClose } = props

	const { isMobile } = useIsMobile()

	const loading = !competitions
	let users: string[] = []
	let data: TotalRaceChartData[] = []

	let chartData: TotalRaceChartData | null = null
	competitions?.forEach((c, i) => {
		if (!chartData)
			chartData = {
				time: dayjs(new Date(c.startAt)).subtract(1, "m").format("hh:mm A"),
				users: {},
			}
		c.leaderboard.forEach((l) => {
			if (!chartData) {
				return
			}
			if (!users.includes(l.user.username)) {
				users = users.concat(l.user.username)
			}
			if (l.grindScore > 0) {
				chartData.users[l.user.username] = l.grindScore
			}
		})
		if (i !== 0 && i % 6 === 0) {
			data = data.concat(chartData)
			chartData = null
		}
	})
	if (chartData) {
		data = data.concat(chartData)
	}
	data = data.map((c) => {
		users.forEach((username) => {
			if (!c.users[username]) {
				c.users[username] = 0
			}
		})
		return c
	})

	return (
		<Dialog open={show} maxWidth={"lg"} fullWidth fullScreen={isMobile} onClose={onClose}>
			<DialogTitle>
				Blitz Results
				<Typography variant={"body2"}>
					{dayjs(startAt).format("DD MMM YYYY hh:mm A")} to {dayjs(finishAt).format("DD MMM YYYY hh:mm A")}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<Typography component={"h3"} variant={"h5"} gutterBottom>
					Daily Races
				</Typography>
				{loading && <Skeleton variant={"rectangular"} height={300} />}
				{data && (
					<ResponsiveContainer width={"100%"} height={300}>
						<LineChart width={500} height={300} data={data}>
							<XAxis dataKey={"time"} label={"Time"} />
							<YAxis label={"Races"} />
							{users.map((username) => (
								<Line key={`graph-races-${username}`} dataKey={`users.${username}`} />
							))}
						</LineChart>
					</ResponsiveContainer>
				)}
			</DialogContent>
			<DialogActions sx={{ justifyContent: "flex-end" }}>
				<Button type={"button"} color={"primary"} variant={"contained"} onClick={onClose}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	)
}
