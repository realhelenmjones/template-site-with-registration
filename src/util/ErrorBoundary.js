import React from 'react'

import * as Sentry from '@sentry/browser';

function isDev() {
  return (process && process.env && process.env.NODE_ENV && process.env.NODE_ENV == 'development');
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { eventId: null, error:null, errorInfo:null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = !isDev() ? Sentry.captureException(error): 1;
      this.setState({ 
        eventId,
        error,
        errorInfo });
    });
  }

  render() {

    if (this.state.hasError) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p><button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button></p>
          {isDev() ?
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            : null}
        </div>
      );
    }


    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;