import { render, screen } from '@testing-library/react'
import If from '@/components/conditionals/if'
import '@testing-library/jest-dom'

describe(`If()`, () => {
  it(`renders because condition true`, () => {
    render(<If condition={true}><h1>true</h1></If>)
    expect(screen.getByRole(`heading`, {name: /true/i})).toBeInTheDocument();
  })

  it(`does not render because condition false`, () => {
    render(<If condition={false}><h1>true</h1></If>)
    expect(screen.queryByRole(`heading`, {name: /true/i})).not.toBeInTheDocument();
  })

  it(`renders otherwise`, () => {
    render(<If condition={false} otherwise={<h1>otherwise</h1>}><h1>true</h1></If>)
    expect(screen.queryByRole(`heading`, {name: /otherwise/i})).toBeInTheDocument();
    expect(screen.queryByRole(`heading`, {name: /true/i})).not.toBeInTheDocument();
  })
})