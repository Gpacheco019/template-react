import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render the button with text', () => {
    render(<Button>Clique aqui</Button>);
    
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn();
    
    render(
      <Button onClick={handleClick}>
        Clique aqui
      </Button>
    );
    
    const button = screen.getByText('Clique aqui');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should apply style variants', () => {
    const { rerender } = render(
      <Button variant="destructive">Botão Destructive</Button>
    );
    
    const button = screen.getByText('Botão Destructive');
    expect(button).toHaveClass('bg-destructive');
    
    rerender(<Button variant="outline">Botão Outline</Button>);
    const outlineButton = screen.getByText('Botão Outline');
    expect(outlineButton).toHaveClass('border');
  });

  it('should apply sizes', () => {
    const { rerender } = render(
      <Button size="sm">Botão Pequeno</Button>
    );
    
    const button = screen.getByText('Botão Pequeno');
    expect(button).toHaveClass('h-8');
    
    rerender(<Button size="lg">Botão Grande</Button>);
    const largeButton = screen.getByText('Botão Grande');
    expect(largeButton).toHaveClass('h-10');
  });

  it('should be disabled when disabled is true', () => {
    render(
      <Button disabled>
        Botão Desabilitado
      </Button>
    );
    
    const button = screen.getByText('Botão Desabilitado');
    expect(button).toBeDisabled();
  });
});
