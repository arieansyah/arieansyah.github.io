const monthFormat = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' })

const dayFormat = new Intl.DateTimeFormat('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

/** Post dates are stored as UTC (`2026-01-20` or a full ISO timestamp), so format them in UTC too. */
export function formatDay(value: string) {
  return dayFormat.format(new Date(value))
}

function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number)
  return new Date(year, month - 1, 1)
}

export function formatMonth(value: string | null) {
  return value ? monthFormat.format(parseMonth(value)) : 'Present'
}

/** Whole months between two YYYY-MM values, counting both ends (Jan–Apr = 4 mo). */
function monthsBetween(start: string, end: string | null) {
  const from = parseMonth(start)
  const to = end ? parseMonth(end) : new Date()
  return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1
}

export function formatDuration(start: string, end: string | null) {
  const total = monthsBetween(start, end)
  const years = Math.floor(total / 12)
  const months = total % 12
  const parts = []
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months) parts.push(`${months} mo${months > 1 ? 's' : ''}`)
  return parts.join(' ')
}

export function yearsSince(start: string) {
  return Math.floor(monthsBetween(start, null) / 12)
}
