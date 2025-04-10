import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container text-center p-4 bg-red-900 text-white rounded shadow">
          <h2 className="text-red-200 text-xl font-bold">Something went wrong!</h2>
          <p className="text-sm mt-2">Please refresh the page or try again later.</p>
          <button
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 mt-4 rounded"
            onClick={() => window.location.reload()}
          >
            Reload App
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
