import {fireEvent, screen} from '@testing-library/react';
import { getPage } from 'next-page-tester';

describe('Home Integration Test', () => {
  it('should render correctly Home Page', async () => {
    const { render } = await getPage({ route: '/blog/estrutura-de-pastas-para-projetos-nextjs' });

    render();

    expect(screen.getByText('Estrutura de pastas para projetos NextJS')).toBeInTheDocument()
  })
})
