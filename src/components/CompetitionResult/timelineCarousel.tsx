import dayjs from "dayjs"
import AliceCarousel from "react-alice-carousel"
import { useState } from "react"
import { Box, IconButton, Typography, Tooltip } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { CompetitionTimes } from "../../constants/competitions"
import "react-alice-carousel/lib/alice-carousel.css"
import "./timelineCarousel.css"

/** Props for <TimelineSlideItem /> */
interface TimelineSlideItemProps {
	index: number
	from: Date
	to: Date
	active: boolean
	onClick: (index: number) => void
}

/**
 * Displays a single slide item representing the time.
 */
const TimelineSlideItem = (props: TimelineSlideItemProps) => {
	const { from, to } = props

	return (
		<Box
			onClick={() => props.onClick(props.index)}
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyItems: "center",
				alignItems: "center",
				backgroundColor: props.active ? "#204420" : "rgba(0, 0, 0, 0.8)",
				p: 2,
				mx: 1,
				color: "#eee",
				cursor: "pointer",
				textAlign: "center",
			}}
		>
			<Tooltip title={`Blitz Competition from ${dayjs(from).format("h:mm A")} to ${dayjs(to).format("h:mm A")}`}>
				<Typography sx={{ fontFamily: "Rajdhani, sans-serif", fontStyle: "italic", fontWeight: 600 }}>{dayjs(from).format("h:mm A")}</Typography>
			</Tooltip>
		</Box>
	)
}

/**
 * Displays the Competition Timeline.
 */
export const TimelineCarousel = () => {
	const [slide, setSlide] = useState(0)

	const slidePrevClickHandler = () => setSlide((prev) => prev - 1)
	const slideNextClickHandler = () => setSlide((prev) => prev + 1)
	const slideClickHandler = (i: number) => setSlide(i)
	const syncActiveIndex = ({ item }: { item: number }) => {
		console.log("Slide", item)
		setSlide(item)
	}

	return (
		<Box sx={{ display: "flex", color: "#fff" }}>
			<IconButton disabled={slide === 0} color={"inherit"} onClick={slidePrevClickHandler}>
				<Tooltip title={"Go to previous time."}>
					<ChevronLeft />
				</Tooltip>
			</IconButton>

			<Box sx={{ flexGrow: 1, overflow: "hidden" }}>
				<AliceCarousel
					items={CompetitionTimes.map((t, i) => (
						<TimelineSlideItem key={`timeline-slide-${i}`} {...t} index={i} active={i === slide} onClick={slideClickHandler} />
					))}
					activeIndex={0}
					responsive={{
						1024: { items: 8 },
					}}
					onSlideChange={syncActiveIndex}
					disableDotsControls
					disableButtonsControls
					mouseTracking
				/>
			</Box>
			<IconButton disabled={slide === CompetitionTimes.length - 1} color={"inherit"} onClick={slideNextClickHandler}>
				<Tooltip title={"Go to next time."}>
					<ChevronRight />
				</Tooltip>
			</IconButton>
		</Box>
	)
}
