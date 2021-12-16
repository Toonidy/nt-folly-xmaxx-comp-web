import dayjs from "dayjs"
import { useState } from "react"
import { Box, Typography, Tooltip } from "@mui/material"
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel"
import { CompetitionTimes } from "../../constants/competitions"
import "pure-react-carousel/dist/react-carousel.es.css"
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
		<Slide index={props.index}>
			<Box
				onClick={() => props.onClick(props.index)}
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyItems: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
					mx: "auto",
					backgroundColor: props.active ? "#204420" : "rgba(0, 0, 0, 0.8)",
					color: "#eee",
					cursor: "pointer",
					textAlign: "center",
				}}
			>
				<Typography sx={{ fontFamily: "Rajdhani, sans-serif", fontStyle: "italic", fontWeight: 600, margin: "auto" }}>
					{dayjs(from).format("h:mm A")}
				</Typography>
			</Box>
		</Slide>
	)
}

/**
 * Displays the Competition Timeline.
 */
export const TimelineCarousel = () => {
	return (
		<Box sx={{ color: "#fff" }}>
			<CarouselProvider naturalSlideWidth={120} naturalSlideHeight={80} totalSlides={CompetitionTimes.length} visibleSlides={8}>
				<Slider>
					{CompetitionTimes.map((t, i) => (
						<TimelineSlideItem key={`timeline-slide-${i}`} {...t} index={i} active={false} onClick={() => {}} />
					))}
				</Slider>
				<ButtonBack>Back</ButtonBack>
				<ButtonNext>Next</ButtonNext>
			</CarouselProvider>
		</Box>
	)
}
