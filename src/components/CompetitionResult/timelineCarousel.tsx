import dayjs from "dayjs"
import { useState, useEffect, useContext } from "react"
import { useTheme, Box, Typography, IconButton } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { CarouselProvider, CarouselContext, Slider, Slide } from "pure-react-carousel"
import { DateRange } from "../../constants/competitions"
import "pure-react-carousel/dist/react-carousel.es.css"

/** Props for <TimelineSlideItem /> */
interface TimelineSlideItemProps {
	index: number
	from: Date
	to: Date
	currentTime: Date
}

/**
 * Displays a single slide item representing the time.
 */
const TimelineSlideItem = (props: TimelineSlideItemProps) => {
	const { from, to, currentTime } = props

	let backgroundColor = "rgba(0, 0, 0, 0.9)"
	let color = "rgba(255, 255, 255, 0.9)"
	if (currentTime >= from && currentTime < to) {
		backgroundColor = "rgba(200, 200, 200, 0.9)"
		color = "rgba(0, 0, 0, 0.9)"
	} else if (currentTime > to) {
		backgroundColor = "rgba(0, 128, 32, 0.9)"
	}

	return (
		<Slide index={props.index}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyItems: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
					mx: "auto",
					backgroundColor,
					color,
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
 * Previous Slider Button.
 */
export const PrevButton = () => {
	const carouselContext = useContext(CarouselContext)
	const theme = useTheme()
	const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)

	useEffect(() => {
		const onChange = () => {
			setCurrentSlide(carouselContext.state.currentSlide)
		}
		carouselContext.subscribe(onChange)
		return () => carouselContext.unsubscribe(onChange)
	}, [carouselContext])

	const clickButtonHandler = () => {
		carouselContext.setStoreState({
			currentSlide: Math.max(carouselContext.state.currentSlide - 1, 0),
		})
	}

	return (
		<IconButton
			type={"button"}
			disabled={currentSlide === 0}
			onClick={clickButtonHandler}
			sx={{
				position: "absolute",
				left: theme.spacing(1),
				backgroundColor: "rgba(255, 0, 0, 0.8)",
				color: "inherit",
			}}
		>
			<ChevronLeft />
		</IconButton>
	)
}

/**
 * Next Slider Button.
 */
export const NextButton = () => {
	const carouselContext = useContext(CarouselContext)
	const theme = useTheme()
	const [currentSlide, setCurrentSlide] = useState(carouselContext.state.currentSlide)

	useEffect(() => {
		const onChange = () => {
			setCurrentSlide(carouselContext.state.currentSlide)
		}
		carouselContext.subscribe(onChange)
		return () => carouselContext.unsubscribe(onChange)
	}, [carouselContext])

	const clickButtonHandler = () => {
		carouselContext.setStoreState({
			currentSlide: Math.min(carouselContext.state.currentSlide + 1, carouselContext.state.totalSlides),
		})
	}

	return (
		<IconButton
			type={"button"}
			disabled={currentSlide === carouselContext.state.totalSlides - carouselContext.state.visibleSlides}
			onClick={clickButtonHandler}
			sx={{
				position: "absolute",
				right: theme.spacing(1),
				backgroundColor: "rgba(255, 0, 0, 0.8)",
				color: "inherit",
			}}
		>
			<ChevronRight />
		</IconButton>
	)
}

/** Props for <TimelineCarousel> */
interface TimelineCarouselProps {
	currentTime: Date
	competitionTimes: DateRange[]
}

/**
 * Displays the Competition Timeline.
 */
export const TimelineCarousel = (props: TimelineCarouselProps) => {
	const { currentTime, competitionTimes } = props
	return (
		<Box
			sx={{
				color: "#fff",
				"& .carousel": {
					position: "relative",
				},
				"& .carousel__slider--horizontal": {
					marginLeft: "50px",
					marginRight: "50px",
				},
				"& .carousel__inner-slide": {
					paddingLeft: "10px",
					paddingRight: "10px",
				},
			}}
		>
			<CarouselProvider
				naturalSlideWidth={120}
				naturalSlideHeight={48}
				currentSlide={competitionTimes.findIndex((t) => currentTime < t.to)}
				totalSlides={competitionTimes.length}
				visibleSlides={8}
			>
				<PrevButton />
				<NextButton />
				<Slider>
					{competitionTimes.map((t, i) => (
						<TimelineSlideItem key={`timeline-slide-${i}`} {...t} index={i} currentTime={currentTime} />
					))}
				</Slider>
			</CarouselProvider>
		</Box>
	)
}
