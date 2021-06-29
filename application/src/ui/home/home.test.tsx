import {fireEvent, screen} from '@testing-library/react';
import { getPage } from 'next-page-tester';
import Link from 'next/link';

const mockEvent = jest.fn()
jest.mock('next/link')

describe('Home Integration Test', () => {
  it('should render correctly Home Page', async () => {
    // This mock is only example of the mock a React Component if you need.
    (Link as jest.Mock).mockImplementation( ({ href, children }) => (
      <a href={href} onClick={mockEvent}>{children}</a>
    ))
    const { render } = await getPage({ route: '/' });

    render();

    expect(screen.getByText('Stories')).toBeInTheDocument()

    const blogPostButton = screen.getByText('Estrutura de pastas para projetos NextJS')

    await fireEvent.click(blogPostButton)

    expect(mockEvent).toBeCalledTimes(1)
  })
})
