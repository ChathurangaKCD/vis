import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/core";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle mr={2}>Something went wrong.</AlertTitle>
          <AlertDescription>Please refresh page.</AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}
