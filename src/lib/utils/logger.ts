export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
  userId?: string;
  sessionId?: string;
  data?: any;
  error?: Error;
}

class Logger {
  private logs: LogEntry[] = [];
  private currentLevel: LogLevel = LogLevel.INFO;
  private maxLogs: number = 1000;

  constructor() {
    // Charger la configuration depuis localStorage en développement
    if (typeof window !== 'undefined') {
      const savedLevel = localStorage.getItem('webshop_log_level');
      if (savedLevel) {
        this.currentLevel = parseInt(savedLevel) as LogLevel;
      }
    }
  }

  setLevel(level: LogLevel) {
    this.currentLevel = level;
    if (typeof window !== 'undefined') {
      localStorage.setItem('webshop_log_level', level.toString());
    }
  }

  getLevel(): LogLevel {
    return this.currentLevel;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.currentLevel;
  }

  private createEntry(level: LogLevel, message: string, context?: string, data?: any, error?: Error): LogEntry {
    return {
      level,
      message,
      timestamp: new Date(),
      context,
      data,
      error,
      sessionId: this.getSessionId(),
      userId: this.getUserId()
    };
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server';
    return sessionStorage.getItem('webshop_session') ||
           (sessionStorage.setItem('webshop_session', Date.now().toString()), sessionStorage.getItem('webshop_session')!);
  }

  private getUserId(): string {
    if (typeof window === 'undefined') return 'anonymous';
    const userData = localStorage.getItem('webshop_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        return user.id || 'anonymous';
      } catch {
        return 'anonymous';
      }
    }
    return 'anonymous';
  }

  private log(entry: LogEntry) {
    if (!this.shouldLog(entry.level)) return;

    // Ajouter aux logs internes
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Supprimer le plus ancien
    }

    // Formater le message pour la console
    const prefix = `[${entry.timestamp.toISOString()}] [${LogLevel[entry.level]}]`;
    const context = entry.context ? `[${entry.context}]` : '';
    const message = `${prefix} ${context} ${entry.message}`;

    // Logger selon le niveau
    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(message, entry.data);
        break;
      case LogLevel.INFO:
        console.info(message, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(message, entry.data);
        break;
      case LogLevel.ERROR:
        console.error(message, entry.error || entry.data);
        break;
      case LogLevel.FATAL:
        console.error(`🚨 FATAL: ${message}`, entry.error || entry.data);
        break;
    }

    // Envoyer les erreurs au service de monitoring (en production)
    if (entry.level >= LogLevel.ERROR && typeof window !== 'undefined') {
      this.reportError(entry);
    }
  }

  private async reportError(entry: LogEntry) {
    // Simulation d'envoi à un service de monitoring
    try {
      // En production, ceci enverrait à Sentry, LogRocket, etc.
      console.log('📊 Error reported to monitoring service:', entry);
    } catch (error) {
      console.error('Failed to report error:', error);
    }
  }

  // Méthodes publiques de logging
  debug(message: string, context?: string, data?: any) {
    this.log(this.createEntry(LogLevel.DEBUG, message, context, data));
  }

  info(message: string, context?: string, data?: any) {
    this.log(this.createEntry(LogLevel.INFO, message, context, data));
  }

  warn(message: string, context?: string, data?: any) {
    this.log(this.createEntry(LogLevel.WARN, message, context, data));
  }

  error(message: string, context?: string, error?: Error, data?: any) {
    this.log(this.createEntry(LogLevel.ERROR, message, context, data, error));
  }

  fatal(message: string, context?: string, error?: Error, data?: any) {
    this.log(this.createEntry(LogLevel.FATAL, message, context, data, error));
  }

  // Méthodes utilitaires
  getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level >= level);
    }
    return [...this.logs];
  }

  getRecentLogs(count: number = 50): LogEntry[] {
    return this.logs.slice(-count);
  }

  clearLogs() {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  // Performance logging
  time(label: string) {
    console.time(label);
    this.debug(`Started timing: ${label}`, 'performance');
  }

  timeEnd(label: string) {
    console.timeEnd(label);
    this.debug(`Ended timing: ${label}`, 'performance');
  }

  // User action logging
  logUserAction(action: string, details?: any) {
    this.info(`User action: ${action}`, 'user-action', details);
  }

  logPageView(page: string, referrer?: string) {
    this.info(`Page view: ${page}`, 'navigation', { referrer });
  }

  logErrorBoundary(error: Error, componentStack?: string) {
    this.error('Error boundary caught error', 'error-boundary', error, { componentStack });
  }
}

// Instance globale du logger
export const logger = new Logger();

// Fonctions utilitaires pour logging rapide
export const log = {
  debug: (message: string, context?: string, data?: any) => logger.debug(message, context, data),
  info: (message: string, context?: string, data?: any) => logger.info(message, context, data),
  warn: (message: string, context?: string, data?: any) => logger.warn(message, context, data),
  error: (message: string, context?: string, error?: Error, data?: any) => logger.error(message, context, error, data),
  fatal: (message: string, context?: string, error?: Error, data?: any) => logger.fatal(message, context, error, data),

  // Logging spécialisé
  userAction: (action: string, details?: any) => logger.logUserAction(action, details),
  pageView: (page: string, referrer?: string) => logger.logPageView(page, referrer),
  errorBoundary: (error: Error, componentStack?: string) => logger.logErrorBoundary(error, componentStack),

  // Performance
  time: (label: string) => logger.time(label),
  timeEnd: (label: string) => logger.timeEnd(label),

  // Configuration
  setLevel: (level: LogLevel) => logger.setLevel(level),
  getLevel: () => logger.getLevel()
};

// Configuration des niveaux de log par environnement
if (typeof window !== 'undefined') {
  const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
  if (isProduction) {
    logger.setLevel(LogLevel.WARN); // En production, seulement les avertissements et erreurs
  } else {
    logger.setLevel(LogLevel.DEBUG); // En développement, tous les logs
  }
}
