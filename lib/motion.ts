export function getMotionDurationSeconds(value: string) {
  const time = value.trim();
  const duration = Number.parseFloat(time);

  // CSS optimization can turn a millisecond token into an equivalent seconds value.
  return time.endsWith("ms") ? duration / 1000 : duration;
}
