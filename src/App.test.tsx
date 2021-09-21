import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

describe("Plan UI", () => {
  it("renders card", () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(getByText("ค้นหาแบบแผนที่ใช่สำหรับคุณ")).toBeInTheDocument();
  });
});
