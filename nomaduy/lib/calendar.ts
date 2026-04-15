// Google Calendar — using public API key (no OAuth needed for public calendars)
// Docs: https://developers.google.com/calendar/api/v3/reference/events/list

// export async function getUpcomingEvents() {
//   const url = `https://www.googleapis.com/calendar/v3/calendars/${process.env.GCAL_CALENDAR_ID}/events?key=${process.env.GCAL_API_KEY}&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}&maxResults=10`
//   const res = await fetch(url, { next: { revalidate: 3600 } })
//   return res.json()
// }
