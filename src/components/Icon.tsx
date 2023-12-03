import { z } from "zod"
import {
	getIconByWeatherCode,
	textByCodeWeather,
	zodMeteoItemPeriod,
} from "../utils"

interface IconProps {
	weatherCode: number
	period: z.infer<typeof zodMeteoItemPeriod>["period"]
	className?: string
}

export const Icon = (props: IconProps) => {
	return (
		<img
			className={`scale-150 ${props.className}`}
			src={getIconByWeatherCode(props.weatherCode, props.period)}
			alt={textByCodeWeather[props.weatherCode]}
		/>
	)
}
