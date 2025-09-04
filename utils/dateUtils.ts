/**
 * Format a deadline date to show days remaining
 * @param deadline - The deadline date
 * @returns Formatted string showing days left
 */
export const formatDeadline = (deadline: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(deadline.getTime() - now.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return `${diffDays}`;
};