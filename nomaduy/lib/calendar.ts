export interface CalendarEvent {
  id: string
  title: string
  start: string
  location?: string
  htmlLink: string
}

export async function getUpcomingEvents(): Promise<CalendarEvent[]> {
  const calendarId = process.env.GCAL_CALENDAR_ID
  const apiKey = process.env.GCAL_API_KEY

  if (!calendarId || !apiKey) return []

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=3`

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return (data.items ?? []).map((item: any) => ({
      id: item.id,
      title: item.summary ?? 'Evento',
      start: item.start?.dateTime ?? item.start?.date ?? '',
      location: item.location,
      htmlLink: item.htmlLink,
    }))
  } catch {
    return []
  }
}

export function calendarPublicUrl(): string {
  const id = process.env.GCAL_CALENDAR_ID ?? ''
  return `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(id)}`
}
