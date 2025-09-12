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
      console.log("Render widget conditions not met:", {
        hasTurnstile: !!window.turnstile,
        hasContainer: !!containerRef.current,
        hasWidgetId: !!widgetIdRef.current
      });
      return;
    }

    console.log("Rendering Turnstile widget with options:", {
      sitekey: options.sitekey,
      appearance: options.appearance || 'execute',
      execution: options.execution || 'execute'
    });

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: options.sitekey,
        theme: options.theme || 'auto',
        size: options.size || 'normal',
        action: options.action,
        appearance: options.appearance || 'always', // Show the widget
        execution: options.execution || 'render',
        retry: options.retry || 'auto',
        'retry-interval': options['retry-interval'],
        'refresh-expired': options['refresh-expired'] || 'auto',
        callback: (token: string) => {
          console.log("Turnstile callback fired with token:", token);
          options.onSuccess?.(token);
        },
        'error-callback': () => {
          console.log("Turnstile error callback fired");
          options.onError?.();
        },
        'expired-callback': () => {
          console.log("Turnstile expired callback fired");
          options.onExpired?.();
        },
        'after-interactive-callback': () => {
          console.log("Turnstile after-interactive callback fired");
          options.onLoad?.();
        },
      });
      
      widgetIdRef.current = widgetId;
      console.log("Turnstile widget rendered with ID:", widgetId);
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
    console.log("Execute called - checking conditions:", {
      hasTurnstile: !!window.turnstile,
      hasContainer: !!containerRef.current,
      widgetId: widgetIdRef.current
    });
    
    if (window.turnstile && containerRef.current) {
      console.log("Executing Turnstile widget");
      window.turnstile.execute(containerRef.current);
    } else {
      console.log("Cannot execute Turnstile - missing requirements");
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
      console.log("Initializing Turnstile...");
      try {
        await loadScript();
        console.log("Turnstile script loaded successfully");
        
        if (!mounted) {
          console.log("Component unmounted, aborting initialization");
          return;
        }

        // Don't use turnstile.ready() when dynamically loading the script
        // Add a small delay to ensure the API is completely initialized
        setTimeout(() => {
          if (mounted && window.turnstile && !isLoadedRef.current) {
            console.log("Rendering Turnstile widget after delay");
            renderWidget();
            isLoadedRef.current = true;
          } else {
            console.log("Skipping widget render:", {
              mounted,
              hasTurnstile: !!window.turnstile,
              isLoaded: isLoadedRef.current
            });
          }
        }, 100);
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