import React, { Component, ReactNode } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../theme";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.emoji}>😵</Text>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            We're sorry for the inconvenience. Please try again.
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={styles.errorDetails}>
              {this.state.error.toString()}
            </Text>
          )}
          <TouchableOpacity
            style={styles.retryButton}
            onPress={this.handleRetry}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.background,
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize["2xl"],
    fontWeight: "700" as const,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    textAlign: "center",
    lineHeight: Typography.lineHeight.relaxed * Typography.fontSize.base,
    marginBottom: Spacing.xl,
  },
  errorDetails: {
    fontSize: Typography.fontSize.sm,
    color: Colors.error,
    textAlign: "center",
    marginBottom: Spacing.lg,
    fontFamily: "monospace",
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 25,
  },
  retryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: "600" as const,
  },
});

export default ErrorBoundary;
