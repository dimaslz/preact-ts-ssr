import { VNode } from "preact";

import { usePageContext } from "@/hooks/usePageContext";

type Props = {
	href: string;
	children: VNode | VNode[] | string;
	withBackground?: boolean;
	className?: string;
	rel?: string;
	target?: string;
	activeClassName?: string;
};

export const Link = (props: Props) => {
	const pageContext: any = usePageContext();

	const isActive = pageContext?.urlPathname === props.href;

	const className = [
		props.className,
		props.withBackground
			? isActive
				? "text-white bg-gray-900 dark:bg-gray-700"
				: "hover:bg-gray-900 dark:hover:bg-gray-700"
			: "text-blue-500 hover:text-blue-700 hover:underline",
		isActive && (props.activeClassName || "is-active"),
	]
		.filter(Boolean)
		.join(" ");

	return <a {...props} className={className} />;
};
