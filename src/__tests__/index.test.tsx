import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const img = screen.getByRole('img', {name: /Next\.js Logo/i,})
    const heading = screen.getByRole('heading', {name: /Docs ->/i,})

    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  })
})