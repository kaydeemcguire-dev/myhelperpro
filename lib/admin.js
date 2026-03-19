export const ADMIN_IDS = [
  "a2e4c2d4-3829-4e4e-a0e6-c45da6beeb54"
];

export function isAdmin(user) {
  return !!user && ADMIN_IDS.includes(user.id);
}
