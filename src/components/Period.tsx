import { z } from "zod"
import { zodMeteoItemPeriod } from "../utils"
import { Icon } from "./Icon"

interface PeriodProps {
	period: z.infer<typeof zodMeteoItemPeriod>
}

export const Period = (props: PeriodProps) => {
	return (
		<td className="px-4 py-2">
			<Icon
				weatherCode={props.period.weather}
				period={props.period.period}
				className="w-[40px]"
			/>
			<div className="text-center">{props.period.temp2m}°C</div>
		</td>
	)
}
