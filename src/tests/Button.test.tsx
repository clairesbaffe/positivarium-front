import React from "react";
import { useRouter } from "next/navigation";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/components/Button";
import { CheckIcon } from "lucide-react";

// useRouter mock, simulates a router during tests
// all imports from next/navigation in this test are intercepted by this mock
// they are replaced by the mock
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// describes groups all tests for a same component
describe("Button component", () => {
  // Test 1 : verifies if button renders correctly in document and with correct title
  // button is searched by title, so if title is wrong, then button is not found and test fails
  it("renders with title, colors and icon", () => {
    // Renders button in a test DOM
    render(
      <Button
        title="Click me"
        background="bg-blue-500"
        textColor="text-white"
        icon={<CheckIcon data-testid="icon" />}
      />,
    );

    // Find button by its title
    const button = screen.getByText("Click me");

    // Checks if it is in the document
    expect(button).toBeInTheDocument();

    // Check if colors were applied correctly
    expect(button).toHaveClass("bg-blue-500");
    expect(button).toHaveClass("text-white");

    // Find icon by testid
    // data-testid is reserved for tests, so it is not confused with id used by navigator (CSS styles, anchors, etc)
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  // Test 2 : verifies that onClick works correctly
  it("calls onClick when clicked and no href is provided", () => {
    // onClick mock
    // it receives call and notifies it, but actually does nothing else
    // onClick mock is accepted by TypeScript even though it is not the same type,
    //   because onClick mock is of type jest.Mock<any, any, any>, which is very generic (like any)
    //   So TS accepts it
    //   And it is ok to use a any here since it is only a test (not the actual app that requires strict type)
    const onClick = jest.fn();
    render(
      <Button
        title="Click me"
        background="bg-blue-500"
        textColor="text-white"
        icon={null}
        onClick={onClick}
      />,
    );

    // Simulates a click on button
    fireEvent.click(screen.getByRole("button"));

    // Checks if mocked onClick was called correctly
    expect(onClick).toHaveBeenCalled();
  });

  // Test 3 : verifies that navigation works correctly
  it("navigates to href when clicked", () => {
    // mock push function from object returned from useRouter()
    // const router = useRouter(), router: { push, etc }
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <Button
        title="Go to page"
        background="bg-green-500"
        textColor="text-white"
        icon={null}
        href="/page"
      />,
    );

    fireEvent.click(screen.getByRole("button"));
    // Ckecks if push mock function was called with correct parameter
    expect(push).toHaveBeenCalledWith("/page");
  });

  // Test 4 : verifies that nothing happens when button is disabled, even though it has a onClick parameter
  it("does nothing when disabled", () => {
    const onClick = jest.fn();
    render(
      <Button
        title="Disabled"
        background="bg-gray-500"
        textColor="text-foreground"
        icon={null}
        onClick={onClick}
        disabled
        disabledReason="Disabled for testing"
      />,
    );

    // Find button by ARIA role (Accessible Rich Internet Applications)
    // An ARIA role describes the functionnality of an element for assitance technologies
    // Works like a user using a screen reader
    // getByRole fails if multiple buttons, else use getAllByRole
    const button = screen.getByRole("button");

    // Check if button is disabled
    expect(button).toBeDisabled();
    // Simulates click on button
    fireEvent.click(button);
    // Check if onClick mock has NOT been called
    expect(onClick).not.toHaveBeenCalled();
    // Check disable title
    expect(button).toHaveAttribute("title", "Disabled for testing");
  });

  // Test 5
  it("applies correct style according to priority, inverted textColor and minWidth", () => {
    render(
      <>
        <Button
          title="Click me"
          background="bg-blue-500"
          textColor="text-foreground-inverted"
          icon={null}
          priority="high"
        />
        <Button
          title="Click me"
          background="bg-blue-500"
          textColor="text-foreground-inverted"
          icon={null}
          priority="medium"
          minWidth
        />
        <Button
          title="Click me"
          background="bg-blue-500"
          textColor="text-foreground-inverted"
          icon={null}
          priority="low"
        />
      </>,
    );

    const buttons = screen.getAllByRole("button");

    // Check if each button has expected classes
    expect(buttons[0]).toHaveClass(
      "bg-opacity-100 py-2.5 px-4 h-min rounded-md font-semibold text-foreground-inverted",
    ); // high priority, text color does not change
    expect(buttons[1]).toHaveClass(
      "bg-transparent border border-2 py-2 px-4 h-min rounded-md font-semibold text-foreground w-min",
    ); // medium priority with minWidth, text color changes to text-foreground
    expect(buttons[2]).toHaveClass("bg-transparent text-foreground"); // low priority, text color changes to text-foreground
  });
});

// npm test returns code coverage
// % Stmts : Statements executed by tests
// % Branch : conditions covered (if, else, switch)
// % Funcs : functions called
// % Lines : code lines executed
// Uncovered Line #s : code lines that were not tested

// code lines not covered can be seen in file /coverage/lcov-report/index.html

// 100% is not necessarily the end goal
