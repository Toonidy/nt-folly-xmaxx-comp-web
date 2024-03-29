import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState, useEffect } from "react"
import { Chip, Typography } from "@mui/material"
import { CompetitionDates, DateRange } from "../../constants/competitions"

dayjs.extend(relativeTime)

/** Props for <CompCountdownChip>. */
interface Props {
	day: number
}

/**
 * Displays Comp Countdown chip.
 */
export const CompCountdownChip = (props: Props) => {
	const { day } = props
	const comp = CompetitionDates[day]
	const [status, setStatus] = useState(generateCompCountdownStatus(comp))

	useEffect(() => {
		const now = new Date()
		if (!comp) {
			return
		}
		setStatus(generateCompCountdownStatus(comp))
		if (now > comp.to) {
			return
		}
		const t = setInterval(() => setStatus(generateCompCountdownStatus(comp)), 6000)
		return () => clearTimeout(t)
	}, [comp])

	if (!comp) {
		return null
	}
	return (
		<Chip
			variant={"filled"}
			color={"error"}
			label={status}
			sx={{
				fontFamily: "Rajdhani,sans-serif",
				fontWeight: 800,
			}}
		/>
	)
}

/**
 * Displays Comp Countdown text.
 */
export const CompCountdownText = (props: Props) => {
	const { day } = props
	const comp = CompetitionDates[day]
	const [status, setStatus] = useState(generateCompCountdownStatus(comp))

	useEffect(() => {
		const now = new Date()
		if (!comp) {
			return
		}
		setStatus(generateCompCountdownStatus(comp))
		if (now > comp.to) {
			return
		}
		const t = setInterval(() => setStatus(generateCompCountdownStatus(comp)), 6000)
		return () => clearTimeout(t)
	}, [comp])

	if (!comp) {
		return null
	}
	return (
		<Typography component={"p"} variant={"caption"} color={"grey.300"} sx={{ mt: 1 }}>
			{status} ({dayjs(comp.to).format("DD MMM YYYY hh:mm A")})
		</Typography>
	)
}

/**

/**
 * Generates Comp Countdown status text.
 */
const generateCompCountdownStatus = (comp: DateRange) => {
	const now = new Date()
	if (now < comp.from) {
		return `Starts ${dayjs(comp.from).fromNow()}`
	} else if (now < comp.to) {
		return `Ends ${dayjs(comp.to).fromNow()}`
	}
	return "Ended"
}
