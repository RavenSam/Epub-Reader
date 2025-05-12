import { Button } from "@/components/ui/button"
import { Sun, Moon, Settings as SettingsIcon } from "lucide-react"
import { TOC } from "@/components/TOC"
import { useTheme } from "./theme-provider"
import { useStore } from "@/store"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { useEffect, useState } from "react"

export const Header = () => {
	const { book, toc, setSettingsOpen, currentLocation } = useStore()
	const { setTheme, theme } = useTheme()

	// Does not work with ref
	const [scrollContainer, setScrollContainer] = useState<{ current: HTMLElement | null } | null>(null)
	useEffect(() => {
		setScrollContainer({ current: document.querySelector<HTMLElement>(".epub-container") })
	}, [currentLocation])
	// @ts-ignore
	const { scrollY } = useScroll({ container: scrollContainer })

	const [hidden, setHidden] = useState(false)

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? latest

		if (latest > previous && latest > 150) {
			setHidden(true)
		} else {
			setHidden(false)
		}
	})

	return (
		<motion.header
			variants={{
				visible: { y: 0 },
				hidden: { y: "-100%" },
			}}
			animate={hidden ? "hidden" : "visible"}
			transition={{ duration: 0.35, ease: "easeInOut" }}
			className="flex items-center justify-between px-4 py-2 bg-background/50 backdrop-blur-md absolute top-0 left-0 right-4 z-10"
		>
			<div className="flex items-center space-x-4">
				{!!toc.length && <TOC />}
				<div>
					<h1 className="text-lg font-bold truncate max-w-xs">{book?.packaging?.metadata.title || "EPUB Reader"}</h1>
					{book?.packaging?.metadata.creator && (
						<p className="text-xs text-gray-600 dark:text-gray-400 truncate">{book.packaging.metadata.creator}</p>
					)}
				</div>
			</div>
			<div className="flex items-center space-x-2">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
					aria-label="Toggle theme"
				>
					{theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
				</Button>
				<Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} aria-label="Settings">
					<SettingsIcon className="size-5" />
				</Button>
			</div>
		</motion.header>
	)
}
