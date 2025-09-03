// Performance monitoring utilities

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  context?: string;
}

export interface PageLoadMetrics {
  domContentLoaded: number;
  loadComplete: number;
  firstPaint?: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private observers: PerformanceObserver[] = [];
  private isEnabled = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined') return;

    // Activer le monitoring si en développement ou explicitement demandé
    this.isEnabled = window.location.hostname === 'localhost' ||
                    window.location.search.includes('performance=true');

    if (!this.isEnabled) return;

    this.setupObservers();
    this.trackPageLoad();
  }

  private setupObservers() {
    // Observer pour les mesures de performance web vitals
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          this.recordMetric('LCP', lastEntry.startTime, 'web-vitals');
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (e) {
        console.warn('LCP observer not supported');
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            this.recordMetric('FID', entry.processingStart - entry.startTime, 'web-vitals');
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (e) {
        console.warn('FID observer not supported');
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          this.recordMetric('CLS', clsValue, 'web-vitals');
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        console.warn('CLS observer not supported');
      }
    }
  }

  private trackPageLoad() {
    // Mesurer le temps de chargement de la page
    window.addEventListener('DOMContentLoaded', () => {
      this.recordMetric('DOM_Content_Loaded',
        performance.now(), 'page-load');
    });

    window.addEventListener('load', () => {
      this.recordMetric('Page_Load_Complete',
        performance.now(), 'page-load');

      // Mesurer les métriques de navigation
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          this.recordMetric('DNS_Lookup', navigation.domainLookupEnd - navigation.domainLookupStart, 'navigation');
          this.recordMetric('TCP_Connect', navigation.connectEnd - navigation.connectStart, 'navigation');
          this.recordMetric('Server_Response', navigation.responseEnd - navigation.requestStart, 'navigation');
          this.recordMetric('Page_Parse', navigation.domContentLoadedEventEnd - navigation.responseEnd, 'navigation');
        }
      }
    });
  }

  recordMetric(name: string, value: number, context?: string) {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value: Math.round(value * 100) / 100, // Arrondir à 2 décimales
      timestamp: Date.now(),
      context
    };

    this.metrics.push(metric);

    // Garder seulement les 1000 dernières métriques
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }

    // Logger la métrique
    console.log(`📊 [Performance] ${name}: ${value}ms`, context ? `(${context})` : '');
  }

  // Mesure personnalisée
  startTiming(name: string, context?: string) {
    if (!this.isEnabled) return;

    const startTime = performance.now();
    const endTiming = () => {
      const duration = performance.now() - startTime;
      this.recordMetric(name, duration, context);
    };

    return endTiming;
  }

  // Mesure des interactions utilisateur
  trackUserInteraction(element: string, action: string) {
    if (!this.isEnabled) return;

    this.recordMetric(`User_${action}_${element}`, performance.now(), 'user-interaction');
  }

  // Mesure des erreurs JavaScript
  trackJSError(error: Error, context?: string) {
    this.recordMetric('JavaScript_Error', performance.now(), `error-${context || 'unknown'}`);
  }

  // Récupérer les métriques
  getMetrics(context?: string): PerformanceMetric[] {
    if (context) {
      return this.metrics.filter(m => m.context === context);
    }
    return [...this.metrics];
  }

  getAverageMetric(name: string): number {
    const metrics = this.metrics.filter(m => m.name === name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, m) => acc + m.value, 0);
    return sum / metrics.length;
  }

  // Exporter les métriques
  exportMetrics(): string {
    return JSON.stringify({
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      metrics: this.metrics
    }, null, 2);
  }

  // Nettoyer
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics = [];
  }
}

// Instance globale
export const performanceMonitor = new PerformanceMonitor();

// Fonctions utilitaires
export const perf = {
  start: (name: string, context?: string) => performanceMonitor.startTiming(name, context),
  track: (element: string, action: string) => performanceMonitor.trackUserInteraction(element, action),
  error: (error: Error, context?: string) => performanceMonitor.trackJSError(error, context),
  getMetrics: (context?: string) => performanceMonitor.getMetrics(context),
  getAverage: (name: string) => performanceMonitor.getAverageMetric(name),
  export: () => performanceMonitor.exportMetrics()
};

// Hook Svelte pour mesurer les performances des composants
export function usePerformanceTracking(componentName: string) {
  const endTiming = performanceMonitor.startTiming(`${componentName}_render`, 'component');

  return {
    endTiming,
    trackInteraction: (action: string) => {
      performanceMonitor.trackUserInteraction(componentName, action);
    }
  };
}

// Fonction pour mesurer les performances des fonctions
export function measurePerformance<T>(
  fn: () => T,
  name: string,
  context?: string
): T {
  const endTiming = performanceMonitor.startTiming(name, context);
  try {
    const result = fn();
    endTiming();
    return result;
  } catch (error) {
    endTiming();
    throw error;
  }
}
