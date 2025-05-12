import { useStore } from "@/store"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const Control = () => {
	const { book } = useStore()

	if (!book) return null

	const onPrev = () => book?.rendition.prev()
	const onNext = () => book?.rendition.next()

	return (
		<div className="">
			<button
				onClick={onPrev}
				aria-label="Previous"
				className="absolute left-0 inset-y-0 p-4 flex items-center justify-center cursor-pointer group"
			>
				<ArrowLeft className="size-5 translate-x-2.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
			</button>

			<button
				onClick={onNext}
				aria-label="Next"
				className="absolute right-4 inset-y-0 p-4 flex items-center justify-center cursor-pointer group"
			>
				<ArrowRight className="size-5 -translate-x-2.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition" />
			</button>
		</div>
	)
}
