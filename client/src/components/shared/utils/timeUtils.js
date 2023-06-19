export function getTimeString(timeObject) {
  const { seconds, nanoseconds } = timeObject;
  const date = new Date(seconds * 1000 + Math.round(nanoseconds / 1e6));

  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Pad the hours and minutes with leading zeros if needed
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

export function getTimeFromISOString(dateISOString) {
  const date = new Date(dateISOString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return (hours + ':' + minutes);
}

export function convertToHHmm(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleTimeString(undefined, options);
}


export function convertToDayMonth(date) {
  const options = {
    day: '2-digit',
    month: 'short',
  };
  return date.toLocaleDateString('en-US', options);
}

