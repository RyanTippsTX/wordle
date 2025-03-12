/**
 * Formats a date string in the format YYYY-MM-DD to a human-readable date string. Does not use the browser's timezone.
 * @param dateString - The date string to format
 * @returns The formatted date string ✅ Output: "Jan 1, 2021"
 */
export function formatDate(dateString: string) {
  // Extract year, month, and day manually
  const [year, month, day] = dateString.split('-').map(Number);

  // Create a Date object using UTC mode (ensuring no time zone conversions)
  const date = new Date(Date.UTC(year, month - 1, day));

  // Format in UTC
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC', // Ensures no time zone influence
  }).format(date);
}

export function getTodaysDate() {
  /** YYYY-MM-DD in server's timezone */
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago', // Central Time (CST/CDT)
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  return today;
}

export function getTomorrowsDate() {
  /** YYYY-MM-DD in server's timezone */
  const tomorrow = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Chicago', // Central Time (CST/CDT)
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(Date.now() + 24 * 60 * 60 * 1000));

  return tomorrow;
}
