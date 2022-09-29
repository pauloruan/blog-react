import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BtnMorePosts } from '.';

describe('<BtnMorePosts />', () => {
  it('should render the button with the text', () => {
    const fn = jest.fn();
    render(<BtnMorePosts text="Load more posts" onClick={fn} />);

    expect.assertions(2);

    const button = screen.getByRole('button', { text: /load more posts/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('class', 'btn-more-posts');
  });

  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<BtnMorePosts text="Load more posts" onClick={fn} />);
    const button = screen.getByRole('button', { text: /load more posts/i });
    userEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<BtnMorePosts text="Load more posts" onClick={fn} disabled={true} />);
    const button = screen.getByRole('button', { text: /load more posts/i });
    expect(button).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    const fn = jest.fn();
    render(<BtnMorePosts text="Load more posts" onClick={fn} disabled={false} />);
    const button = screen.getByRole('button', { text: /load more posts/i });
    expect(button).toBeEnabled();
  });
});
