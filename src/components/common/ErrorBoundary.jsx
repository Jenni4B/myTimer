import { Component } from "react";

class ErrorBoundary extends Component { 

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidMount() {
    try {
      // Simulate a loading error
      setTimeout(() => {
        if (!this.props.children) {
          throw new Error("Failed to load UI");
        }
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      this.setState({ hasError: true });
      console.error("Caught by ErrorBoundary:", error);
    }
  }


  componentDidCatch(error, errorInfo) {
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container text-center p-4">
          <h2 className="text-red-500 text-xl font-bold">Something went wrong!</h2>
          <p>Please refresh the page or try again later.</p>
          <button
            className="bg-red-500 text-white p-2 mt-2 rounded"
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