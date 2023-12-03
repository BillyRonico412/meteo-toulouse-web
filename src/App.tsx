import to from "await-to-js"
import { useMemo } from "react"
import { useAsync } from "react-use"
import { Icon } from "./components/Icon"
import { Periods } from "./components/Periods"
import { getBgColorByPeriod, zodFetchResult } from "./utils"

export const App = () => {
	const stateFetch = useAsync(async () => {
		const [errFetchRes, fetchRes] = await to(
			fetch("https://meteo-toulouse-api.ronico-billy.fr/"),
		)
		if (errFetchRes) {
			console.error(errFetchRes)
			return
		}
		const [errFetchResJson, fetchResJson] = await to(fetchRes.json())
		if (errFetchResJson) {
			console.error(errFetchResJson)
			return
		}
		const fetchResJsonData = zodFetchResult.parse(fetchResJson)
		return fetchResJsonData
	}, [])

	const currentPeriod = useMemo(() => {
		const currentHour = new Date().getHours()
		return Math.floor(currentHour / 6)
	}, [])

	if (stateFetch.error) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				Error: {stateFetch.error.message}
			</div>
		)
	}
	if (stateFetch.loading) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				Loading...
			</div>
		)
	}
	if (!stateFetch.value) {
		return (
			<div className="w-screen h-screen flex justify-center items-center">
				Don't have value
			</div>
		)
	}

	return (
		<main
			className={`w-screen h-screen text-white ${getBgColorByPeriod(
				currentPeriod,
			)}`}
		>
			<div className="max-w-sm mx-auto h-full relative flex">
				<div className="w-full my-auto">
					<h1 className="text-center font-bold text-xl">Meteo Toulouse</h1>
					<div className="flex flex-col items-center">
						<Icon
							className="w-[100px]"
							weatherCode={stateFetch.value.hours.forecast[0].weather}
							period={currentPeriod}
						/>
						<p className="text-xl">
							{stateFetch.value.hours.forecast[0].temp2m} °C
						</p>
					</div>
					<table className="border-separate border-spacing-y-4 mx-auto">
						<thead>
							<tr>
								<th />
								<th>1h</th>
								<th>7h</th>
								<th>13h</th>
								<th>19h</th>
							</tr>
						</thead>
						<tbody>
							{stateFetch.value.periods.forecast
								.slice(1, 3)
								.map((periods, i) => (
									<Periods periods={periods} key={i} />
								))}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}
