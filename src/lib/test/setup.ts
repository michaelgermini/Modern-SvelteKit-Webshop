import { beforeAll, afterAll, vi } from 'vitest';

// Mock de l'environnement SvelteKit
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock de sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock de fetch
global.fetch = vi.fn();

// Mock de l'API Performance
Object.defineProperty(window, 'performance', {
  value: {
    now: vi.fn(() => Date.now()),
    mark: vi.fn(),
    measure: vi.fn(),
    getEntriesByType: vi.fn(() => []),
    getEntriesByName: vi.fn(() => [])
  }
});

// Mock de l'API IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Mock de l'API ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}));

// Configuration globale pour les tests
beforeAll(() => {
  // Reset des mocks avant chaque test
  vi.clearAllMocks();

  // Configuration des mocks par défaut
  localStorageMock.getItem.mockReturnValue(null);
  sessionStorageMock.getItem.mockReturnValue(null);
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({})
  } as Response);
});

afterAll(() => {
  vi.clearAllTimers();
});

// Utilitaires de test globaux
global.testUtils = {
  // Créer un produit de test
  createMockProduct: (overrides = {}) => ({
    id: '1',
    slug: 'test-product',
    name: 'Test Product',
    description: 'Test description',
    price: 2999,
    currency: 'EUR',
    image: '/test.jpg',
    tags: ['test'],
    stock: 10,
    active: true,
    ...overrides
  }),

  // Créer un utilisateur de test
  createMockUser: (overrides = {}) => ({
    id: '1',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    role: 'user' as const,
    avatar: '/avatar.jpg',
    createdAt: new Date(),
    ...overrides
  }),

  // Simuler un clic
  click: (element: Element) => {
    const event = new MouseEvent('click', { bubbles: true });
    element.dispatchEvent(event);
  },

  // Attendre un tick Svelte
  tick: () => new Promise(resolve => setTimeout(resolve, 0)),

  // Nettoyer le DOM après les tests
  cleanup: () => {
    document.body.innerHTML = '';
  }
};
