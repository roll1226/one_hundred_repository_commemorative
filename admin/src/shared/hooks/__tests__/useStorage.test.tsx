import { renderHook, act } from "@testing-library/react";
import { useLocalStorage, useSessionStorage } from "../useStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should use default value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should set and get value from localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("newValue"));
  });

  it("should remove value from localStorage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));

    act(() => {
      result.current[1]("newValue");
      result.current[2]();
    });

    expect(result.current[0]).toBeUndefined();
    expect(localStorage.getItem("key")).toBeNull();
  });
});

describe("useSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("should use default value when sessionStorage is empty", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));

    expect(result.current[0]).toBe("default");
  });

  it("should set and get value from sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(sessionStorage.getItem("key")).toBe(JSON.stringify("newValue"));
  });

  it("should remove value from sessionStorage", () => {
    const { result } = renderHook(() => useSessionStorage("key", "default"));

    act(() => {
      result.current[1]("newValue");
      result.current[2]();
    });

    expect(result.current[0]).toBeUndefined();
    expect(sessionStorage.getItem("key")).toBeNull();
  });
});
