const R = 6371
const degToKm = R * (Math.PI / 180)
const pixelToMeter = 30/2

function degreeToKm(deg: number): number {
	return deg*degToKm
}

export function latitudeToKm(deg: number): number {
	return degreeToKm(deg)
}

export function longitudeToKm(deg: number, lat: number): number {
	return degreeToKm(deg) * Math.cos(lat * (Math.PI / 180))
}

export function meterToPixel(meter: number): number {
	return meter * pixelToMeter
}
