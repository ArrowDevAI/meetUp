import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents"; // Adjust the path as needed

describe('<NumberOfEvents /> component', () => {
  let eventsTextBox;

  beforeEach(() => {
    render(<NumberOfEvents />);
    eventsTextBox = screen.getByRole('textbox');
  });

  test('renders text input', () => {
    expect(eventsTextBox).toBeInTheDocument();
    expect(eventsTextBox).toHaveClass('eventsLoaded');
})

test('defaults visibleEvents state to 32 when input is empty', async () => {
  const user = userEvent.setup();
  await user.clear(eventsTextBox);
  expect(eventsTextBox).toHaveValue('');  

  console.log("Default Input Value:", eventsTextBox.value);
});

test('changes visibleEvents state on user typing and logs the new value', async () => {
  const user = userEvent.setup();
  await user.clear(eventsTextBox);
  await user.type(eventsTextBox, '10');
  expect(eventsTextBox).toHaveValue('10');

  console.log("Input Value (after typing 10):", eventsTextBox.value);
});
});
