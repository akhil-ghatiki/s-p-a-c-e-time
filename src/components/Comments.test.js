import React from 'react';
import {render} from '@testing-library/react';
import expect from 'expect';
import Comments from './Comments';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// test('renders rage text', () => {
//   const { getByText } = render(<App />);
//   const textElement = getByText(/Rage, rage against the dying of the light/i);
//   expect(textElement).toBeInTheDocument();
// });

describe('Comments', () => {
  it('should render correctly', () => {
    const comment = {};
    const component = render(<Comments commentData={comment}/>);
    expect(component).toMatchSnapshot();
  });
});