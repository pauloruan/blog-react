import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (_req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
          url: 'img1.jpg',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
          url: 'img1.jpg',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
          url: 'img3.jpg',
        },
        {
          userId: 4,
          id: 4,
          title: 'title4',
          body: 'body4',
          url: 'img4.jpg',
        },
        {
          userId: 5,
          id: 5,
          title: 'title5',
          body: 'body5',
          url: 'img5.jpg',
        },
        {
          userId: 6,
          id: 6,
          title: 'title6',
          body: 'body6',
          url: 'img6.jpg',
        },
        {
          userId: 7,
          id: 7,
          title: 'title7',
          body: 'body7',
          url: 'img7.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText(/Não existem posts./i);

    expect.assertions(3);
    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(6);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText(/Não existem posts./i);

    expect.assertions(19);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title5' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title6' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title7' })).not.toBeInTheDocument();

    userEvent.type(search, 'title1');
    expect(screen.getByRole('heading', { name: 'Search value: title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title3' })).not.toBeInTheDocument();

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: 'title1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title5' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'title6' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'title7' })).not.toBeInTheDocument();
    userEvent.type(search, 'post does not exist');

    expect(screen.getByText(/Não existem posts./i)).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText(/Não existem posts./i);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: 'title7' })).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});
