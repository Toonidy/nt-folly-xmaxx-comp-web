interface DateRange {
	from: Date
	to: Date
}

/** Date Range for the Big Prize Competition.  */
export const MainCompetitionRange: DateRange = {
	from: new Date("2021-12-18T22:30:00.000+08:00"),
	to: new Date("2021-10-25T22:30:00.000+08:00"),
}

/** Date Ranges for the 7 Day Competitions.  */
export const CompetitionDates: DateRange[] = [
	{
		from: new Date("2021-12-18T22:30:00.000+08:00"),
		to: new Date("2021-10-19T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-19T22:30:00.000+08:00"),
		to: new Date("2021-10-20T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-20T22:30:00.000+08:00"),
		to: new Date("2021-10-21T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-21T22:30:00.000+08:00"),
		to: new Date("2021-10-22T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-22T22:30:00.000+08:00"),
		to: new Date("2021-10-23T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-23T22:30:00.000+08:00"),
		to: new Date("2021-10-24T22:30:00.000+08:00"),
	},
	{
		from: new Date("2021-12-24T22:30:00.000+08:00"),
		to: new Date("2021-10-25T22:30:00.000+08:00"),
	},
]
