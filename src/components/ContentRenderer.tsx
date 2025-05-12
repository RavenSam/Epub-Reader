import { useEffect, useRef } from "react"
import { Rendition, Location } from "epubjs"
import { useStore } from "@/store"
import { useTheme } from "./theme-provider"

export const ContentRenderer = () => {
	const { book, readerSettings, setCurrentLocation } = useStore()
	const viewerRef = useRef<HTMLDivElement>(null)
	const renditionRef = useRef<Rendition | null>(null)
	const { theme } = useTheme()

	// 1. initialize rendition once
	useEffect(() => {
		if (!book || !viewerRef.current) return
		const rend = book.renderTo(viewerRef.current, {
			width: "100%",
			height: "100%",
			flow: "scrolled",
		})
		renditionRef.current = rend

		rend.themes.register("custom", {})
		rend.themes.select("custom")

		rend.on("relocated", (loc: Location) => setCurrentLocation(loc.start.href))
		rend.display()

		return () => rend.destroy()
	}, [book])

	useEffect(() => {
		const rend = renditionRef.current
		if (!rend) return

		const fg = getComputedStyle(document.documentElement).getPropertyValue("--background").trim()

		const customStyles = {
			body: { color: fg + " !important" },
		}

		rend.themes.register("custom", customStyles)
		rend.themes.select("custom")
	}, [theme])

	// 2. update theme whenever settings change
	useEffect(() => {
		const rend = renditionRef.current
		if (!rend) return

		const fg = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim()

		const customStyles = {
			"*": {
				"font-family": readerSettings.fontFamily,
			},

			body: {
				"font-size": `${readerSettings.fontSize}px !important`,
				"line-height": readerSettings.lineHeight.toString() + " !important",
				color: fg + " !important",
			},
		}

		rend.themes.register("custom", customStyles)
		rend.themes.select("custom")
	}, [readerSettings])

	return <div ref={viewerRef} className="flex-1 [&>div]:!overflow-x-hidden" />
}
