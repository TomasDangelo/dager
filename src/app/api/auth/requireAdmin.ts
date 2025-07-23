export function requireAdmin(user: {role: string} | null) {
    if (!user || user.role !== "admin") {
        throw new Error("Solo admin");
    }
}