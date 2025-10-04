import { describe, expect, it } from 'vitest';
import { Banner } from './Banner';
import { render, screen } from '@testing-library/react';

describe('Banner', () => {
  it('should render the component', () => {
    render(<Banner name='Gabriel Pacheco' />);

    expect(screen.getByText('Hello, Gabriel Pacheco!')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Here you can see all your scheduled shifts, check for biddings opportunities and much more'
      )
    ).toBeInTheDocument();
  });
});
