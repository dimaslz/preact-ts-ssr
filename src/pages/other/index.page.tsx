import { Link } from "@/components";

export const documentProps = {
	section: "other",
};

export const Page = () => {
	return (
		<div class="flex h-full w-full flex-col items-center justify-center">
			<h1 class="text-4xl">other</h1>
			<div class="py-6">
				<Link href="/">go to home</Link>
			</div>
		</div>
	);
};
