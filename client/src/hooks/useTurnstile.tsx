import { useEffect, useRef, useCallback } from 'react';

interface TurnstileOptions {
  sitekey: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  action?: string;
  cData?: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  'after-interactive-callback'?: () => void;
  'before-interactive-callback'?: () => void;
  'unsupported-callback'?: () => void;
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  language?: string;
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
}

declare global {
  interface Window {
    turnstile?: {
      ready: (callback: () => void) => void;
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
      execute: (container?: string | HTMLElement, options?: TurnstileOptions) => void;
      getResponse: (widgetId?: string) => string | undefined;
    };
  }
}

interface UseTurnstileOptions {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
  onLoad?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  action?: string;
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
}

export const useTurnstile = (options: UseTurnstileOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isLoadedRef = useRef(false);

  const loadScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // Check if script is already loaded
      if (window.turnstile) {
        resolve();
        return;
      }

      // Check if script is already in DOM
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com"]');
      if (existingScript) {
        // If script exists but turnstile is not available yet, wait for it
        if (window.turnstile) {
          resolve();
        } else {
          existingScript.addEventListener('load', () => {
            // Wait a bit for turnstile to be available
            const checkTurnstile = () => {
              if (window.turnstile) {
                resolve();
              } else {
                setTimeout(checkTurnstile, 50);
              }
            };
            checkTurnstile();
          });
          existingScript.addEventListener('error', reject);
        }
        return;
      }

      // Create and load script WITHOUT async/defer to avoid turnstile.ready() issues
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      // Remove async and defer to fix the turnstile.ready() issue
      // script.async = true;
      // script.defer = true;
      
      script.onload = () => {
        // Wait a bit for turnstile to be fully available
        const checkTurnstile = () => {
          if (window.turnstile) {
            resolve();
          } else {
            setTimeout(checkTurnstile, 50);
          }
        };
        checkTurnstile();
      };
      script.onerror = reject;
      
      document.head.appendChild(script);
    });
  }, []);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetIdRef.current) {
      return;
    }

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: options.sitekey,
        theme: options.theme || 'auto',
        size: options.size || 'normal',
        action: options.action,
        appearance: options.appearance || 'execute', // Use 'execute' for background/invisible mode
        execution: options.execution || 'execute',
        retry: options.retry || 'auto',
        'retry-interval': options['retry-interval'],
        'refresh-expired': options['refresh-expired'] || 'auto',
        callback: (token: string) => {
          options.onSuccess?.(token);
        },
        'error-callback': () => {
          options.onError?.();
        },
        'expired-callback': () => {
          options.onExpired?.();
        },
        'after-interactive-callback': () => {
          options.onLoad?.();
        },
      });
      
      widgetIdRef.current = widgetId;
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      options.onError?.();
    }
  }, [options]);

  const reset = useCallback(() => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  const execute = useCallback(() => {
    if (window.turnstile && containerRef.current) {
      window.turnstile.execute(containerRef.current);
    }
  }, []);

  const getResponse = useCallback(() => {
    if (window.turnstile && widgetIdRef.current) {
      return window.turnstile.getResponse(widgetIdRef.current);
    }
    return undefined;
  }, []);

  const remove = useCallback(() => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        await loadScript();
        
        if (!mounted) return;

        // At this point, window.turnstile should be available
        if (window.turnstile && window.turnstile.ready) {
          // Use turnstile.ready() to ensure everything is properly initialized
          window.turnstile.ready(() => {
            if (mounted && !isLoadedRef.current) {
              renderWidget();
              isLoadedRef.current = true;
            }
          });
        } else {
          // Fallback: directly render if ready function is not available
          if (mounted && !isLoadedRef.current) {
            renderWidget();
            isLoadedRef.current = true;
          }
        }
      } catch (error) {
        console.error('Failed to load Turnstile:', error);
        if (mounted) {
          options.onError?.();
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
      remove();
      isLoadedRef.current = false;
    };
  }, [options.sitekey, loadScript, renderWidget, remove, options.onError]);

  return {
    containerRef,
    reset,
    execute,
    getResponse,
    remove,
  };
};