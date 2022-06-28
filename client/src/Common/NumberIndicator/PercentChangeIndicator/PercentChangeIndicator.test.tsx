import { render } from '@testing-library/react';
import { PercentChangeIndicator } from '.';

describe('PercentChangeIndicator', () => {
  it('Correctly shows decreased value', async () => {
    const rendered = render(
      <PercentChangeIndicator
        currentValue={66}
        previousValue={99}
        desiredChange='decrease'
      />
    );
    expect((await rendered.findByTestId('value')).textContent).toEqual('33.3%');
    expect((await rendered.findByTestId('direction')).className).toContain(
      'caret-down'
    );
    expect((await rendered.findByTestId('direction')).style.color).toEqual(
      'green'
    );
  });
});

describe('PercentChangeIndicator', () => {
  it('Correctly shows increased value', async () => {
    const rendered = render(
      <PercentChangeIndicator
        currentValue={99}
        previousValue={33}
        desiredChange='decrease'
      />
    );
    expect((await rendered.findByTestId('value')).textContent).toEqual(
      '200.0%'
    );
    expect((await rendered.findByTestId('direction')).className).toContain(
      'caret-up'
    );
    expect((await rendered.findByTestId('direction')).style.color).toEqual(
      'red'
    );
  });
});
