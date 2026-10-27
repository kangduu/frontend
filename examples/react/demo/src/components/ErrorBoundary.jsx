import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null,
    };
  }
  // static getDerivedStateFromError(error) {
  //   return { error: true };
  // }
  componentDidCatch(error, errorInfo) {
    // TODO log record
    this.setState({
      error,
      errorInfo,
    });
  }
  render() {
    if (this.state.error) {
      return (
        <>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: "pre-wrap", listStyle: "none" }}>
            <span style={{ color: "red" }}>{this.state.error.toString()}</span>
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
