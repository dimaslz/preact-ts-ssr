import { ContainerNode, hydrate } from "preact";

import { PageContextProvider } from "@/hooks/usePageContext";
import MainLayout from "@/layouts/main-layout.layout";

export const render = async (pageContext: any) => {
	const { Page, pageProps } = pageContext;
	const body = document.querySelector("body") as ContainerNode;

	hydrate(
		<PageContextProvider pageContext={pageContext}>
			<MainLayout>
				<Page {...pageProps} />
			</MainLayout>
		</PageContextProvider>,
		body,
	);
};
