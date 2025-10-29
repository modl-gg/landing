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
  
  // Store callbacks in refs to avoid re-renders
  const onSuccessRef = useRef(options.onSuccess);
  const onErrorRef = useRef(options.onError);
  const onExpiredRef = useRef(options.onExpired);
  const onLoadRef = useRef(options.onLoad);
  
  // Update refs when callbacks change
  useEffect(() => {
    onSuccessRef.current = options.onSuccess;
    onErrorRef.current = options.onError;
    onExpiredRef.current = options.onExpired;
    onLoadRef.current = options.onLoad;
  });

  const loadScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      // Check if script is already loaded and Turnstile API is available
      if (window.turnstile && typeof window.turnstile.render === 'function') {
        resolve();
        return;
      }

      // Check if script is already in DOM
      const existingScript = document.querySelector('script[src*="challenges.cloudflare.com"]');
      if (existingScript) {
        // If script exists but turnstile is not fully available yet, wait for it
        const waitForTurnstile = () => {
          if (window.turnstile && typeof window.turnstile.render === 'function') {
            resolve();
          } else {
            setTimeout(waitForTurnstile, 100);
          }
        };
        
        if (window.turnstile && typeof window.turnstile.render === 'function') {
          resolve();
        } else {
          existingScript.addEventListener('load', waitForTurnstile);
          existingScript.addEventListener('error', reject);
        }
        return;
      }

      // Create and load script WITHOUT async/defer 
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      // Explicitly avoid async/defer as recommended by CloudFlare for dynamic loading
      
      script.onload = () => {
        // Wait for turnstile to be fully available with proper API methods
        const waitForTurnstile = () => {
          if (window.turnstile && typeof window.turnstile.render === 'function') {
            resolve();
          } else {
            setTimeout(waitForTurnstile, 100);
          }
        };
        waitForTurnstile();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Turnstile script'));
      };
      
      document.head.appendChild(script);
    });
  }, []);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current || widgetIdRef.current) {
      return;
    }

    try {
      console.log('Rendering Turnstile widget with sitekey:', options.sitekey?.substring(0, 20) + '...');
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: options.sitekey,
        theme: options.theme || 'auto',
        size: options.size || 'normal',
        action: options.action,
        appearance: options.appearance || 'always',
        execution: options.execution || 'render',
        retry: options.retry || 'auto',
        'retry-interval': options['retry-interval'],
        'refresh-expired': options['refresh-expired'] || 'auto',
        callback: (token: string) => {
          console.log('Turnstile callback triggered with token:', token?.substring(0, 20) + '...');
          onSuccessRef.current?.(token);
        },
        'error-callback': () => {
          console.error('Turnstile error callback triggered');
          onErrorRef.current?.();
        },
        'expired-callback': () => {
          console.log('Turnstile expired callback triggered');
          onExpiredRef.current?.();
        },
        'after-interactive-callback': () => {
          console.log('Turnstile after-interactive callback triggered');
          onLoadRef.current?.();
        },
      });
      
      console.log('Turnstile widget rendered with ID:', widgetId);
      widgetIdRef.current = widgetId;
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      onErrorRef.current?.();
    }
  }, [options.sitekey, options.theme, options.size, options.action, options.appearance, options.execution, options.retry, options['retry-interval'], options['refresh-expired']]);

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

        // Don't use turnstile.ready() when dynamically loading the script
        // Add a small delay to ensure the API is completely initialized
        setTimeout(() => {
          if (mounted && window.turnstile && !isLoadedRef.current) {
            renderWidget();
            isLoadedRef.current = true;
          }
        }, 100);
      } catch (error) {
        console.error('Failed to load Turnstile:', error);
        if (mounted) {
          onErrorRef.current?.();
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
      remove();
      isLoadedRef.current = false;
    };
  }, [options.sitekey, loadScript, renderWidget, remove]);

  return {
    containerRef,
    reset,
    execute,
    getResponse,
    remove,
  };
};