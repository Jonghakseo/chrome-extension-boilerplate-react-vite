import { render, screen } from "@testing-library/react";
import App from "@pages/content/components/Demo/app";
import { i18n } from "@src/chrome/i18n";

describe("appTest", () => {
  test("render text", () => {
    // given
    const text = i18n("content_view");

    // when
    render(<App />);

    // then
    screen.getByText(text);
  });
});
