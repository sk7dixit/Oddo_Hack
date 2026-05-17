/**
 * Derives initials from a full name for premium traveler identity visualization.
 * Logic:
 * 1. Split name by spaces.
 * 2. Take first letter of first part and second part (if exists).
 * 3. Uppercase and limit to 2 characters.
 */
export const getInitials = (name: string): string => {
  if (!name) return '??';
  
  const parts = name.trim().split(/\s+/);
  
  if (parts.length === 0) return '??';
  
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};
