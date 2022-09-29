import { render, screen } from '@testing-library/react';
import { NoPosts } from '.';

describe('<NoPosts />', () => {
  it('should render the text', () => {
    expect(screen.queryByText(/não existem posts/i)).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<NoPosts />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
