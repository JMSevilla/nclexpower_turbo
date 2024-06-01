import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBox } from "./ErrorBox";

interface Props {
  children: ReactNode;
  errorMessage: string;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    /* data analytics logger */
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorBox customBackground="#FFFFFF" label={this.props.errorMessage} />
      );
    }

    return this.props.children;
  }
}
