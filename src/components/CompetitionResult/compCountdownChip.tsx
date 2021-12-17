import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useState, useEffect } from "react"
import { Chip } from "@mui/material"
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
	const comp = CompetitionDates[props.day]
	const [status, setStatus] = useState(generateCompCountdownStatus(comp))

	useEffect(() => {
		const now = new Date()
		if (!comp || now > comp.to) {
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
				fontWeight: 500,
			}}
		/>
	)
}

/**
 * Generates Comp Countdown status text.
 */
const generateCompCountdownStatus = (comp: DateRange) => {
	const now = new Date()
	if (now < comp.from) {
		return `Starts in ${dayjs(comp.from).fromNow()}`
	} else if (now < comp.to) {
		return `Ends in ${dayjs(comp.to).fromNow()}`
	}
	return "Ended"
}
