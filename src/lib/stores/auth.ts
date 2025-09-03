import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Store d'authentification
function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  const { subscribe, set, update } = writable<AuthState>(initialState);

  // Charger l'utilisateur depuis localStorage au démarrage
  if (browser) {
    const savedUser = localStorage.getItem('webshop_user');
    const savedToken = localStorage.getItem('webshop_token');

    if (savedUser && savedToken) {
      try {
        const user = JSON.parse(savedUser);
        user.createdAt = new Date(user.createdAt);
        if (user.lastLogin) {
          user.lastLogin = new Date(user.lastLogin);
        }

        update(state => ({
          ...state,
          user,
          isAuthenticated: true
        }));
      } catch (error) {
        console.error('Error loading saved user:', error);
        localStorage.removeItem('webshop_user');
        localStorage.removeItem('webshop_token');
      }
    }
  }

  return {
    subscribe,

    // Connexion
    async login(email: string, password: string) {
      update(state => ({ ...state, isLoading: true, error: null }));

      try {
        // Simulation d'une API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Utilisateur de démonstration
        const demoUsers = [
          {
            id: '1',
            email: 'user@example.com',
            password: 'password123',
            firstName: 'John',
            lastName: 'Doe',
            role: 'user' as const,
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            createdAt: new Date('2023-01-15'),
            lastLogin: new Date()
          },
          {
            id: '2',
            email: 'admin@example.com',
            password: 'admin123',
            firstName: 'Admin',
            lastName: 'User',
            role: 'admin' as const,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            createdAt: new Date('2023-01-01'),
            lastLogin: new Date()
          }
        ];

        const user = demoUsers.find(u => u.email === email && u.password === password);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Créer un token factice
        const token = `token_${user.id}_${Date.now()}`;

        // Sauvegarder dans localStorage
        if (browser) {
          localStorage.setItem('webshop_user', JSON.stringify(user));
          localStorage.setItem('webshop_token', token);
        }

        update(state => ({
          ...state,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));

        return user;

      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Login failed'
        }));
        throw error;
      }
    },

    // Inscription
    async register(userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) {
      update(state => ({ ...state, isLoading: true, error: null }));

      try {
        // Validation
        if (userData.password !== userData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        if (userData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }

        // Simulation d'une API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Vérifier si l'utilisateur existe déjà
        const existingUsers = browser ? JSON.parse(localStorage.getItem('webshop_users') || '[]') : [];
        const userExists = existingUsers.find((u: any) => u.email === userData.email);

        if (userExists) {
          throw new Error('User with this email already exists');
        }

        // Créer le nouvel utilisateur
        const newUser: User = {
          id: Date.now().toString(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: 'user',
          createdAt: new Date(),
          lastLogin: new Date()
        };

        // Sauvegarder dans la liste des utilisateurs
        existingUsers.push({ ...newUser, password: userData.password });
        if (browser) {
          localStorage.setItem('webshop_users', JSON.stringify(existingUsers));
        }

        // Créer un token factice
        const token = `token_${newUser.id}_${Date.now()}`;

        // Sauvegarder la session
        if (browser) {
          localStorage.setItem('webshop_user', JSON.stringify(newUser));
          localStorage.setItem('webshop_token', token);
        }

        update(state => ({
          ...state,
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null
        }));

        return newUser;

      } catch (error) {
        update(state => ({
          ...state,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Registration failed'
        }));
        throw error;
      }
    },

    // Déconnexion
    logout() {
      if (browser) {
        localStorage.removeItem('webshop_user');
        localStorage.removeItem('webshop_token');
      }

      set(initialState);
    },

    // Mise à jour du profil utilisateur
    async updateProfile(updates: Partial<User>) {
      update(state => {
        if (!state.user) return state;

        const updatedUser = { ...state.user, ...updates };

        if (browser) {
          localStorage.setItem('webshop_user', JSON.stringify(updatedUser));
        }

        return {
          ...state,
          user: updatedUser
        };
      });
    },

    // Vérifier si l'utilisateur a un rôle spécifique
    hasRole(role: 'user' | 'admin') {
      let hasRole = false;
      update(state => {
        hasRole = state.user?.role === role;
        return state;
      });
      return hasRole;
    },

    // Effacer l'erreur
    clearError() {
      update(state => ({ ...state, error: null }));
    }
  };
}

export const auth = createAuthStore();

// Store dérivé pour vérifier si l'utilisateur est admin
export const isAdmin = writable(false);
auth.subscribe(state => {
  isAdmin.set(state.user?.role === 'admin');
});

// Store dérivé pour vérifier si l'utilisateur est connecté
export const isLoggedIn = writable(false);
auth.subscribe(state => {
  isLoggedIn.set(state.isAuthenticated);
});
