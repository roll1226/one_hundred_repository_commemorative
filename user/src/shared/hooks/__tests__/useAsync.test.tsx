import { act, renderHook } from "@testing-library/react";
import { useAsync } from "../useAsync";

describe("useAsync", () => {
  it("should return loading true while the async function is pending", async () => {
    const mockAsyncFunction = vi.fn().mockResolvedValue("Hello, World!");

    const { result } = renderHook(() => useAsync(mockAsyncFunction, []));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await mockAsyncFunction();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.value).toBe("Hello, World!");
    expect(result.current.error).toBeUndefined();
  });

  it("should handle async function errors correctly", async () => {
    const mockError = new Error("Something went wrong");
    const mockAsyncFunction = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(() => useAsync(mockAsyncFunction, []));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      try {
        await mockAsyncFunction();
      } catch { /* empty */ }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(mockError);
    expect(result.current.value).toBeUndefined();
  });
});
