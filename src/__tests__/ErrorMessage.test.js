import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react'
import ErrorMessage from '../units/error/ErrorMessage';
import ThemeProvider from '../providers/ThemeProvider';
import {ApiProvider} from '../context/ApiContext';

test('displays the error message', () => {
    const message = 'This is an error message';
    render(
        <ApiProvider>
        <ThemeProvider>
        <ErrorMessage message={message} />
        </ThemeProvider>
    </ApiProvider>
    )
    let messageContent = screen.getByText(message);
    expect(messageContent).toBeInTheDocument();
});
