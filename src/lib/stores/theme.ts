import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark' | 'auto';

function getSystemTheme(): 'light' | 'dark' {
  if (!browser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  if (!browser) return 'auto';
  const stored = localStorage.getItem('theme') as Theme;
  return stored || 'auto';
}

function setThemeClass(theme: 'light' | 'dark') {
  if (!browser) return;

  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

function applyTheme(theme: Theme) {
  if (!browser) return;

  const actualTheme = theme === 'auto' ? getSystemTheme() : theme;
  setThemeClass(actualTheme);
  localStorage.setItem('theme', theme);
}

const initialTheme = getStoredTheme();
const initialActualTheme = initialTheme === 'auto' ? getSystemTheme() : initialTheme;

export const theme = writable<Theme>(initialTheme);
export const actualTheme = writable<'light' | 'dark'>(initialActualTheme);

// Apply initial theme
if (browser) {
  setThemeClass(initialActualTheme);

  // Listen for system theme changes
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (initialTheme === 'auto') {
      const newTheme = e.matches ? 'dark' : 'light';
      setThemeClass(newTheme);
      actualTheme.set(newTheme);
    }
  });
}

// Subscribe to theme changes
theme.subscribe((newTheme) => {
  applyTheme(newTheme);
  const actual = newTheme === 'auto' ? getSystemTheme() : newTheme;
  actualTheme.set(actual);
});

// Theme utilities
export function toggleTheme() {
  theme.update(current => {
    if (current === 'light') return 'dark';
    if (current === 'dark') return 'auto';
    return 'light';
  });
}

export function setTheme(newTheme: Theme) {
  theme.set(newTheme);
}
