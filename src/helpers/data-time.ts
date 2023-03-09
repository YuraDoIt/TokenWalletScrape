export function dateTimeUnix(): number  {
  return Math.floor(+new Date() / 1000);
}