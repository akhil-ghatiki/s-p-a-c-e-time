import React from 'react';
import {render} from '@testing-library/react';
import expect from 'expect';
import {shallow} from 'enzyme';
import App from './App';
import ReactMarkdown from 'react-markdown'
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

// test('renders rage text', () => {
//   const { getByText } = render(<App />);
//   const textElement = getByText(/Rage, rage against the dying of the light/i);
//   expect(textElement).toBeInTheDocument();
// });

describe('App', () => {
  it('should render correctly', () => {
    const component = render(<App/>);
    expect(component).toMatchSnapshot();
  });

});
