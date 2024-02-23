//Gets the today date in format 'YYYY-MM-DD'

export function getTodayDate () {
	return new Date().toISOString().split('T')[0];
}