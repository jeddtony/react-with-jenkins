import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react'
import SubmitButton from '../units/submitButton/SubmitButton';
import ThemeProvider from '../providers/ThemeProvider';
import {ApiProvider} from '../context/ApiContext';



test('Submit button triggers search', () => {
    const triggerSearch = jest.fn();

  const {getByTestId} = render(
        <ApiProvider>
        <ThemeProvider>
        <SubmitButton triggerSearch={triggerSearch} />
        </ThemeProvider>
    </ApiProvider>
    )
      fireEvent.click(getByTestId('button-login'));
    expect(triggerSearch).toHaveBeenCalledTimes(1);
});
