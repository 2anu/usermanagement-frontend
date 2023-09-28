import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders App component with initial state', () => {
  render(<App />);
  
  const appElement = screen.getByText('Users Grid CRUD');
  const addUserButton = screen.getByText('Add User');
  
  expect(appElement).toBeInTheDocument();
  expect(addUserButton).toBeInTheDocument();
});

test('opens UserForm when "Add User" button is clicked', () => {
  render(<App />);
  
  const addUserButton = screen.getByText('Add User');
  fireEvent.click(addUserButton);
  
  const userFormTitle = screen.getByText('Add User Form');
  expect(userFormTitle).toBeInTheDocument();
});

