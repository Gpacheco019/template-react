import { render, screen } from "@testing-library/react";
import { Providers } from ".";

describe('Providers', () => {
  it('should render the component', () => {
    render(<Providers><div>Test</div></Providers>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});