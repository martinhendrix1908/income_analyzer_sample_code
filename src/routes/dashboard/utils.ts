// Function to format session duration in HH:mm:ss format
export const formatSessionDuration = (seconds: any) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  const pad = (value: any) => (value < 10 ? `0${value}` : value);
  return `${pad(hours)}:${pad(minutes)}:${pad(remainingSeconds)}`;
};
