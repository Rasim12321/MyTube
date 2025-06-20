export function getInitials(fullName: string): string {
  const [firstName, lastName] = fullName.split(' ')
  return firstName && lastName ? `${firstName?.[0]}${lastName?.[0]}`.toUpperCase() : '?'
}
