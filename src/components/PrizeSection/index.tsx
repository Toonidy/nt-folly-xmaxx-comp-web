import { useState, useCallback } from "react"
import { CarouselProvider, Slider, Slide } from "pure-react-carousel"
import { useTheme, useMediaQuery, Box, Typography, IconButton, Tooltip } from "@mui/material"
import { ChevronLeft, ChevronRight } from "@mui/icons-material"
import { PrizeItem } from "./prizeItem"
import { CompetitionDates } from "../../constants/competitions"
import "pure-react-carousel/dist/react-carousel.es.css"

/**
 * Display a Carousel that displays all the prizes.
 */
export const PrizeSection = () => {
	const theme = useTheme()
	const showFiveSlides = useMediaQuery(theme.breakpoints.down(1100))
	const showFourSlides = useMediaQuery(theme.breakpoints.down(905))
	const showThreeSlides = useMediaQuery(theme.breakpoints.down(765))
	const showTwoSlides = useMediaQuery(theme.breakpoints.down(575))
	const showOneSlide = useMediaQuery(theme.breakpoints.down(405))

	let visibleSlides = 6
	if (showOneSlide) {
		visibleSlides = 1
	} else if (showTwoSlides) {
		visibleSlides = 2
	} else if (showThreeSlides) {
		visibleSlides = 3
	} else if (showFourSlides) {
		visibleSlides = 4
	} else if (showFiveSlides) {
		visibleSlides = 5
	}

	const [activeSlide, setActiveSlide] = useState(() => {
		const now = new Date()
		const result = CompetitionDates.findIndex((t) => t.from <= now && t.to > now)
		if (result === -1) {
			return CompetitionDates[0].from > now ? 0 : CompetitionDates.length
		}
		return Math.min(result, CompetitionDates.length + 3 - visibleSlides)
	})

	const prevDayClickHandler = useCallback(() => {
		setActiveSlide((prev) => Math.max(prev - 1, 0))
	}, [])
	const nextDayClickHandler = useCallback(() => {
		setActiveSlide((prev) => Math.min(prev + 1, CompetitionDates.length + 3 - visibleSlides))
	}, [visibleSlides])

	return (
		<Box
			component={"section"}
			sx={{
				p: 2,
				backgroundColor: "#202020",
				color: "#fff",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
				<Typography
					component={"h2"}
					variant={"h3"}
					sx={{
						fontFamily: "Rajdhani, sans-serif",
						fontWeight: 600,
						color: "#fff",
					}}
				>
					Prizes
				</Typography>
				<Box sx={{ color: "#fff" }}>
					<IconButton
						disabled={activeSlide === 0}
						color={"inherit"}
						onClick={prevDayClickHandler}
						sx={{
							"&.Mui-disabled": {
								color: "#888",
							},
						}}
					>
						<Tooltip title={"Scroll previous prize."}>
							<ChevronLeft />
						</Tooltip>
					</IconButton>
					<IconButton
						disabled={activeSlide === CompetitionDates.length + 3 - visibleSlides}
						color={"inherit"}
						onClick={nextDayClickHandler}
						sx={{
							"&.Mui-disabled": {
								color: "#888",
							},
						}}
					>
						<Tooltip title={"Scroll next prize."}>
							<ChevronRight />
						</Tooltip>
					</IconButton>
				</Box>
			</Box>

			<Box
				sx={{
					overflow: "hidden",
					"& .carousel__inner-slide": {
						px: 1,
					},
				}}
			>
				<CarouselProvider
					currentSlide={activeSlide}
					totalSlides={10}
					naturalSlideWidth={170}
					naturalSlideHeight={170}
					isIntrinsicHeight={true}
					visibleSlides={visibleSlides}
				>
					<Slider>
						<Slide index={0}>
							<PrizeItem title={"Day 1"} value={"15 Million"} />
						</Slide>
						<Slide index={1}>
							<PrizeItem title={"Day 2"} value={"15 Million"} />
						</Slide>
						<Slide index={2}>
							<PrizeItem title={"Day 3"} value={"15 Million"} />
						</Slide>
						<Slide index={3}>
							<PrizeItem title={"Day 4"} value={"15 Million"} />
						</Slide>
						<Slide index={4}>
							<PrizeItem title={"Day 5"} value={"15 Million"} />
						</Slide>
						<Slide index={5}>
							<PrizeItem title={"Day 6"} value={"15 Million"} />
						</Slide>
						<Slide index={6}>
							<PrizeItem title={"Day 7"} value={"15 Million"} />
						</Slide>
						<Slide index={7}>
							<PrizeItem title={"Main Prize"} value={"125 Million"} epicTier />
						</Slide>
						<Slide index={8}>
							<PrizeItem title={"Main Prize"} value={"Nitro Type Gold"} epicTier isGold />
						</Slide>
						<Slide index={9}>
							<PrizeItem title={"Main Prize"} value={"Nitro Type Gold"} epicTier isGold />
						</Slide>
					</Slider>
				</CarouselProvider>
			</Box>
		</Box>
	)
}
