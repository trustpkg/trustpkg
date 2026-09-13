export function normalizedPackage(name: string): string {
    return name
    .replace(/%40/gi, "")
    .replace(/%2f/gi, "-")
    .replace(/%2e/gi, "-")
    .replace(/@/g, "")
    .replace(/[/.]/g, "-")
    .toLowerCase()
}