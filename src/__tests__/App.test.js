
import App from '../App';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import ThemeProvider from '../providers/ThemeProvider';
import {ApiProvider} from '../context/ApiContext';

test('renders input field', () => {
  render(
    <ApiProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ApiProvider>);
  const inputElement = screen.getByTestId("input-login");
  expect(inputElement).toBeInTheDocument();
});

test('renders button field', () => {
  render(
    <ApiProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </ApiProvider>);
  const buttonElement = screen.getByTestId("button-login");
  expect(buttonElement).toBeInTheDocument();
});

test('Can fetch data', () => {

});
