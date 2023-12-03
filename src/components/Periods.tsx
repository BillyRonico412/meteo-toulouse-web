import { z } from "zod"
import { zodMeteoItemPeriod } from "../utils"
import { Period } from "./Period"
import { useMemo } from "react"
import dayjs from "dayjs"

interface PeriodsProps {
	periods: z.infer<typeof zodMeteoItemPeriod>[]
}

export const Periods = (props: PeriodsProps) => {
	const date = useMemo(() => dayjs(props.periods[0].datetime), [props.periods])
	return (
		<tr>
			<td className="pr-2">
				<div className="text-center font-medium">{date.format("D MMM")}</div>
			</td>
			{props.periods.map((period, index) => (
				<Period key={index} period={period} />
			))}
		</tr>
	)
}
