import { fireEvent, render } from "@testing-library/react";
import { useRef } from "react";
import { useClickOutside } from "../useClickOutside";

describe("useClickOutside", () => {
  it("should call the callback when clicking outside the element", () => {
    const callback = vi.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, callback);
      return <div ref={ref}>Inside</div>;
    };

    render(<TestComponent />);

    // Simulate a click outside the component
    fireEvent.click(document.body);

    expect(callback).toHaveBeenCalled();
  });

  it("should not call the callback when clicking inside the element", () => {
    const callback = vi.fn();

    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useClickOutside(ref, callback);
      return <div ref={ref}>Inside</div>;
    };

    const { getByText } = render(<TestComponent />);

    // Simulate a click inside the component
    fireEvent.click(getByText("Inside"));

    expect(callback).not.toHaveBeenCalled();
  });
});
