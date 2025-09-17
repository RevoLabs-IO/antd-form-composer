import React, { Component, ReactNode } from 'react';

/**
 * Props for the FormComposerErrorBoundary component.
 */
interface FormComposerErrorBoundaryProps {
  /** The children to render */
  children: ReactNode;
  /** Fallback component to render on error */
  fallback?: ReactNode;
  /** Callback when an error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * State for the FormComposerErrorBoundary component.
 */
interface FormComposerErrorBoundaryState {
  /** Whether an error has occurred */
  hasError: boolean;
  /** The error that occurred */
  error?: Error;
}

/**
 * Error boundary component for FormComposer components.
 * Catches errors in dynamic component rendering and provides fallback UI.
 */
export class FormComposerErrorBoundary extends Component<
  FormComposerErrorBoundaryProps,
  FormComposerErrorBoundaryState
> {
  constructor(props: FormComposerErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(
    error: Error,
  ): FormComposerErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      'FormComposer Error Boundary caught an error:',
      error,
      errorInfo,
    );
    this.props.onError?.(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div
            style={{
              color: 'red',
              padding: '8px',
              border: '1px solid red',
              borderRadius: '4px',
            }}
          >
            <strong>FormComposer Error:</strong> Something went wrong while
            rendering this form component.
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ marginTop: '8px' }}>
                <summary>Error Details</summary>
                <pre style={{ fontSize: '12px', marginTop: '4px' }}>
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component that wraps a component with an error boundary.
 *
 * @param WrappedComponent - The component to wrap
 * @param fallback - Optional fallback component
 * @param onError - Optional error callback
 * @returns The wrapped component with error boundary
 */
export function withFormComposerErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void,
) {
  const WithErrorBoundaryComponent = (props: P) => (
    <FormComposerErrorBoundary fallback={fallback} onError={onError}>
      <WrappedComponent {...props} />
    </FormComposerErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withFormComposerErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
}
