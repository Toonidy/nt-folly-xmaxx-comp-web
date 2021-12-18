import dayjs from "dayjs"

export interface DateRange {
	from: Date
	to: Date
}

/** Date Range for the Big Prize Competition.  */
export const MainCompetitionRange: DateRange = {
	from: new Date("2021-12-18T22:30:00.000+08:00"),
	to: new Date("2021-10-25T22:30:00.000+08:00"),
}

/** Date Ranges for the 7 Day Competitions.  */
export const CompetitionDates: DateRange[] =
	process.env.NODE_ENV === "production"
		? [
				{
					from: new Date("2021-12-18T22:30:00.000+08:00"),
					to: new Date("2021-12-19T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-19T22:30:00.000+08:00"),
					to: new Date("2021-12-20T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-20T22:30:00.000+08:00"),
					to: new Date("2021-12-21T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-21T22:30:00.000+08:00"),
					to: new Date("2021-12-22T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-22T22:30:00.000+08:00"),
					to: new Date("2021-12-23T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-23T22:30:00.000+08:00"),
					to: new Date("2021-12-24T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-24T22:30:00.000+08:00"),
					to: new Date("2021-12-25T22:30:00.000+08:00"),
				},
		  ]
		: [
				{
					from: new Date("2021-12-14T22:30:00.000+08:00"),
					to: new Date("2021-12-15T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-16T22:30:00.000+08:00"),
					to: new Date("2021-12-17T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-17T22:30:00.000+08:00"),
					to: new Date("2021-12-18T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-18T22:30:00.000+08:00"),
					to: new Date("2021-12-19T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-19T22:30:00.000+08:00"),
					to: new Date("2021-12-20T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-20T22:30:00.000+08:00"),
					to: new Date("2021-12-21T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-21T22:30:00.000+08:00"),
					to: new Date("2021-12-22T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-22T22:30:00.000+08:00"),
					to: new Date("2021-12-23T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-23T22:30:00.000+08:00"),
					to: new Date("2021-12-24T22:30:00.000+08:00"),
				},
				{
					from: new Date("2021-12-24T22:30:00.000+08:00"),
					to: new Date("2021-12-25T22:30:00.000+08:00"),
				},
		  ]

/** List of competition times. */
export const CompetitionTimes: DateRange[] = Array.from(Array(144).keys()).map((_, i) => {
	const from = dayjs(MainCompetitionRange.from)
			.add(i * 10, "m")
			.toDate(),
		to = dayjs(MainCompetitionRange.from)
			.add((i + 1) * 10, "m")
			.toDate()
	return {
		from,
		to,
	}
})
