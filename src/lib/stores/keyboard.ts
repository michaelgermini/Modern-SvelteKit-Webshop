import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  description: string;
  category: 'navigation' | 'actions' | 'search';
}

class KeyboardManager {
  private shortcuts: KeyboardShortcut[] = [];
  private isListening = false;

  constructor() {
    if (browser) {
      this.setupGlobalListener();
    }
  }

  private setupGlobalListener() {
    if (this.isListening) return;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    this.isListening = true;
  }

  private handleKeyDown(event: KeyboardEvent) {
    // Ignore if user is typing in an input field
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement ||
      (event.target as HTMLElement)?.contentEditable === 'true'
    ) {
      return;
    }

    const shortcut = this.shortcuts.find(s =>
      s.key.toLowerCase() === event.key.toLowerCase() &&
      !!s.ctrl === event.ctrlKey &&
      !!s.shift === event.shiftKey &&
      !!s.alt === event.altKey
    );

    if (shortcut) {
      event.preventDefault();
      shortcut.action();
    }
  }

  public register(shortcut: KeyboardShortcut) {
    // Remove existing shortcut with same key combination
    this.shortcuts = this.shortcuts.filter(s =>
      !(s.key === shortcut.key &&
        !!s.ctrl === !!shortcut.ctrl &&
        !!s.shift === !!shortcut.shift &&
        !!s.alt === !!shortcut.alt)
    );

    this.shortcuts.push(shortcut);
  }

  public unregister(key: string, ctrl?: boolean, shift?: boolean, alt?: boolean) {
    this.shortcuts = this.shortcuts.filter(s =>
      !(s.key === key &&
        !!s.ctrl === !!ctrl &&
        !!s.shift === !!shift &&
        !!s.alt === !!alt)
    );
  }

  public getShortcuts(category?: string) {
    if (category) {
      return this.shortcuts.filter(s => s.category === category);
    }
    return [...this.shortcuts];
  }

  public getShortcutString(shortcut: KeyboardShortcut): string {
    const parts = [];
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    parts.push(shortcut.key.toUpperCase());
    return parts.join('+');
  }
}

export const keyboardManager = new KeyboardManager();

// Store for keyboard shortcuts help
export const keyboardShortcuts = writable<KeyboardShortcut[]>([]);

// Initialize common shortcuts
if (browser) {
  // Navigation shortcuts
  keyboardManager.register({
    key: 'h',
    alt: true,
    action: () => goto('/'),
    description: 'Go to Home',
    category: 'navigation'
  });

  keyboardManager.register({
    key: 'p',
    alt: true,
    action: () => goto('/products'),
    description: 'Go to Products',
    category: 'navigation'
  });

  keyboardManager.register({
    key: 'c',
    alt: true,
    action: () => goto('/cart'),
    description: 'Go to Cart',
    category: 'navigation'
  });

  keyboardManager.register({
    key: 'f',
    alt: true,
    action: () => goto('/favorites'),
    description: 'Go to Favorites',
    category: 'navigation'
  });

  // Search shortcut
  keyboardManager.register({
    key: 'k',
    ctrl: true,
    action: () => {
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    },
    description: 'Focus search',
    category: 'search'
  });

  // Scroll shortcuts
  keyboardManager.register({
    key: 'ArrowUp',
    alt: true,
    action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
    description: 'Scroll to top',
    category: 'navigation'
  });

  keyboardManager.register({
    key: 'ArrowDown',
    alt: true,
    action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }),
    description: 'Scroll to bottom',
    category: 'navigation'
  });

  // Update the store
  keyboardShortcuts.set(keyboardManager.getShortcuts());
}
