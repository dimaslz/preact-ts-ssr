import { render, screen } from "@testing-library/preact";

import { Page } from "./index.page";

describe("Pages - home", () => {
	test("read text", () => {
		render(<Page />);

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: "preact + ts + vite + tailwind",
			}),
		).toBeInTheDocument();
	});
});
