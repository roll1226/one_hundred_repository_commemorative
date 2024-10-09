import { renderHook, waitFor } from "@testing-library/react";
import { useFetch } from "../useFetch";

describe("useFetch", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches data successfully", async () => {
    const mockData = { message: "Success" };
    window.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/data")
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.value).toEqual(mockData);
    expect(result.current.error).toBeUndefined();
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("https://api.example.com/data", {
      headers: { "Content-Type": "application/json" },
    });
  });

  it("handles fetch error correctly", async () => {
    const mockError = { error: "Something went wrong" };
    window.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue(mockError),
    });

    const { result } = renderHook(() =>
      useFetch("https://api.example.com/error")
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.value).toBeUndefined();
    expect(result.current.error).toEqual(mockError);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith("https://api.example.com/error", {
      headers: { "Content-Type": "application/json" },
    });
  });
});
