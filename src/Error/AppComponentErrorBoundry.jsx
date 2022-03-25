import React from "react";

import ErrorMessage from "./ErrorMessage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  static getDerivedStateFromError(error) {
    // Update state to render the fallback UI
    return { error: true, errorMessage: error.toString() };
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <section id="configuration">
          <div className="row">
            <div className="col-12">
              <div className="card p-xl-4 p-2">
                <ErrorMessage>
                  <details style={{ whiteSpace: "pre-wrap" }}>
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo.componentStack}
                  </details>
                </ErrorMessage>
              </div>
            </div>
          </div>
        </section>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
