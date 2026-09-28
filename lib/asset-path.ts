// GitHub project Pages uses a subdirectory; root-hosted builds keep an empty prefix.
export function assetPath(path: string): string {
  return path.startsWith('/') && !path.startsWith('//')
    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`
    : path;
}
