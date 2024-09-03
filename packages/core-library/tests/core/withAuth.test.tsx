import React from 'react';
import { screen, waitFor, render } from "../common";
import withAuth from '../../core/utils/withAuth';
import { useValidateToken } from '../../hooks';
import { useRouter } from 'next/router';

jest.mock("../../config", () => ({
    config: { value: jest.fn() }
}));

jest.mock("next/router", () => ({
    useRouter: jest.fn(),
}));

jest.mock('../../hooks', () => ({
    useValidateToken: jest.fn(),
}));

const MockComponent: React.FC = () => <div data-testid="mockpage">Protected page</div>;
const WrappedComponent = withAuth(MockComponent);

describe("withAuth HOC", () => {
    const mockRouter = {
        push: jest.fn(),
        replace: jest.fn(),
        asPath: "/",
        events: {
            on: jest.fn(),
            off: jest.fn(),
        },
    };

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue(mockRouter);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should render the mockpage", async () => {
        (useValidateToken as jest.Mock).mockReturnValue({
            tokenValidated: true,
            loading: false,
        });

        render(<WrappedComponent />)
        expect(screen.getByTestId("mockpage")).toBeInTheDocument()
    })

    it("renders nothing while loading", () => {
        (useValidateToken as jest.Mock).mockReturnValue({
            tokenValidated: false,
            loading: true,
        });
        render(<WrappedComponent />);
        expect(screen.queryByText("Protected Component")).not.toBeInTheDocument();
        expect(mockRouter.replace).not.toHaveBeenCalled();
    });

    it("redirects authenticated users from /404 to /hub", () => {
        (useValidateToken as jest.Mock).mockReturnValue({
            tokenValidated: true,
            loading: false,
        });
        render(<WrappedComponent />);
        expect(mockRouter.replace).toHaveBeenCalledWith("/hub");
        expect(screen.queryByText("Protected Component")).not.toBeInTheDocument();
    });
});
