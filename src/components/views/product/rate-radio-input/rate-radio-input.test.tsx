import RateRadioInput from './rate-radio-input';
import { render, screen } from '@testing-library/react';

const mockData = {id: 'star-5', name: 'rate', value: 5, title: 'Отлично'};

const fakeRateRadioInput = (isLoading = false) => (
  <RateRadioInput data={mockData} isLoading={isLoading}/>
);

describe('Component: ReviewItem', () => {
  test('should render correctly', () => {
    render(fakeRateRadioInput());

    const radioInput = screen.getByRole('radio');
    expect(radioInput).toBeInTheDocument();
    expect(radioInput).not.toBeDisabled();
    expect(screen.getByTestId('rate-label')).toBeInTheDocument();
  });

  test('should be disabled when isLoading=true', () => {
    render(fakeRateRadioInput(true));

    expect(screen.getByRole('radio')).toBeDisabled();
  });
});
