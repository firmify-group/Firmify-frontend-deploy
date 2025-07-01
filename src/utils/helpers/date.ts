export const formatToLocalTime = (utcTime: string | undefined): string => {
  if (!utcTime) return 'N/A';

  const [hour, minute] = utcTime.split(':');
  const now = new Date();
  const utcDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    parseInt(hour, 10),
    parseInt(minute, 10)
  ));

  return utcDate.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};