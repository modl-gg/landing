import React, { forwardRef, useImperativeHandle } from 'react';
import { useTurnstile } from '@/hooks/useTurnstile';

export interface TurnstileRef {
  reset: () => void;
  execute: () => void;
  getResponse: () => string | undefined;
  remove: () => void;
}

interface TurnstileProps {
  sitekey: string;
  onSuccess?: (token: string) => void;
  onError?: () => void;
  onExpired?: () => void;
  onLoad?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  action?: string;
  className?: string;
  invisible?: boolean; // For background/invisible mode
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
}

const Turnstile = forwardRef<TurnstileRef, TurnstileProps>(({
  sitekey,
  onSuccess,
  onError,
  onExpired,
  onLoad,
  theme = 'auto',
  size = 'normal',
  action,
  className = '',
  invisible = true, // Default to invisible/background mode
  retry = 'auto',
  'retry-interval': retryInterval,
  'refresh-expired': refreshExpired = 'auto',
}, ref) => {
  const {
    containerRef,
    reset,
    execute,
    getResponse,
    remove,
  } = useTurnstile({
    sitekey,
    onSuccess,
    onError,
    onExpired,
    onLoad,
    theme,
    size,
    action,
    appearance: 'always', // Always show the widget (but make it invisible with CSS)
    execution: 'render', // Render immediately
    retry,
    'retry-interval': retryInterval,
    'refresh-expired': refreshExpired,
  });

  useImperativeHandle(ref, () => ({
    reset,
    execute,
    getResponse,
    remove,
  }), [reset, execute, getResponse, remove]);

  return (
    <div 
      ref={containerRef} 
      className={`turnstile-container ${invisible ? 'invisible-turnstile' : ''} ${className}`}
      style={invisible ? { 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        opacity: 0,
        pointerEvents: 'none'
      } : undefined}
    />
  );
});

Turnstile.displayName = 'Turnstile';

export default Turnstile;