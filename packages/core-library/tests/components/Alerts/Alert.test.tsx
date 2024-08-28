import React from 'react';
import { render, screen } from "../../common";
import { Alert } from '../../../components';

jest.mock("../../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe('Alert Component', () => {
  it('renders alert with expiring status', () => {
    render(
      <Alert
        severity="warning"
        title="Subscription is expiring soon"
        remainingMonths={1}
        remainingDays={5}
        validUntil="2024-12-31"
        isExpired={false}
      />
    );

    expect(screen.getByText('Subscription is expiring soon')).toBeInTheDocument();
    expect(screen.getByText('Valid Until: 2024-12-31')).toBeInTheDocument();
    expect(screen.getByText('1 month,')).toBeInTheDocument();
    expect(screen.getByText('5 days left')).toBeInTheDocument();
  });

  it('renders alert with expired status', () => {
    render(
      <Alert
        severity="error"
        title="Subscription Expired"
        validUntil="2024-01-01"
        isExpired={true}
      />
    );

    expect(screen.getByText('Subscription Expired')).toBeInTheDocument();
    expect(screen.getByText('Expired on: 2024-01-01')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /purchase another product/i })).toBeInTheDocument();
  });

  it('renders alert without expiration details when not expiring or expired', () => {
    render(
      <Alert
        severity="info"
        title="Subscription Information"
        validUntil="2024-12-31"
        isExpired={false}
      />
    );

    expect(screen.getByText('Subscription Information')).toBeInTheDocument();
    expect(screen.queryByText('Valid Until: 2024-12-31')).not.toBeInTheDocument();
    expect(screen.queryByText('Expired on: 2024-12-31')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /purchase another product/i })).not.toBeInTheDocument();
  });

  it('does not render Months if remainingMonths is zero', () => {
    render(
      <Alert
        severity="info"
        title="Subscription Warning"
        remainingMonths={0}
        remainingDays={4}
        validUntil="2024-12-31"
        isExpired={false}
      />
    );

    expect(screen.getByText('Subscription Warning')).toBeInTheDocument();
    expect(screen.getByText('Valid Until: 2024-12-31')).toBeInTheDocument();
    expect(screen.queryByText('0 month')).not.toBeInTheDocument();
  });
});
