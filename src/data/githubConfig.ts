export const DEFAULT_GITHUB_URL = 'https://github.com';

export function getStoredGithubUrl(): string {
  try {
    return localStorage.getItem('wakebar_github_url') || DEFAULT_GITHUB_URL;
  } catch {
    return DEFAULT_GITHUB_URL;
  }
}

export function setStoredGithubUrl(url: string) {
  try {
    localStorage.setItem('wakebar_github_url', url);
  } catch {
    // Ignore storage errors
  }
}
