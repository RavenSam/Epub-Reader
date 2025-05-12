import { useHotkeys } from "react-hotkeys-hook"
import { useStore } from "@/store"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useCallback } from "react"

export const Control = () => {
	const { book } = useStore()

	// Handlers that safely no-op if book is undefined
	const onPrev = useCallback(() => {
		book?.rendition.prev()
	}, [book])
	const onNext = useCallback(() => {
		book?.rendition.next()
	}, [book])

	// Always call these hooks in the same order…
	useHotkeys("arrowleft", onPrev, { enabled: !!book })
	useHotkeys("arrowright", onNext, { enabled: !!book })

	// …but bail out of rendering the buttons if there’s no book
	if (!book) return null

	return (
		<div>
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
