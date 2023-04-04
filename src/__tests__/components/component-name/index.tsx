import { render, screen } from '@testing-library/react'
import ComponentName from '@/components/component-name'
import '@testing-library/jest-dom'

describe(`ComponentName`, () => {
  it(`Renders component`, () => {
    render(<ComponentName />);

    expect(screen.getByRole('heading', {name: /Component content/i}))
  })
})