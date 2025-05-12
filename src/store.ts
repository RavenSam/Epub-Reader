import { create } from "zustand"
import ePub, { Book } from "epubjs"
import { ReaderSettings } from "@/components/SettingsSidebar"

export interface TocItem {
	label: string
	href: string
	subitems?: TocItem[]
}

interface Store {
	// Book state
	book: Book | null
	setBook: (book: Book | null) => void
	toc: TocItem[]
	setToc: (toc: TocItem[]) => void
	currentLocation: string | null
	setCurrentLocation: (loc: string | null) => void
	error: string | null
	setError: (error: string | null) => void

	// Settings
	readerSettings: ReaderSettings
	updateSetting: <K extends keyof ReaderSettings>(key: K, value: ReaderSettings[K]) => void
	settingsOpen: boolean
	setSettingsOpen: (open: boolean) => void

	// Actions
	handleFileRead: (buffer: ArrayBuffer) => void
	scrollTo: (href: string) => void
}

export const useStore = create<Store>((set, get) => ({
	book: null,
	setBook: (book) => {
		set({ book, currentLocation: null })
		book?.loaded.navigation.then((nav) => get().setToc(nav.toc))
	},
	toc: [],
	setToc: (toc) => set({ toc }),
	currentLocation: null,
	setCurrentLocation: (currentLocation) => set({ currentLocation }),
	error: null,
	setError: (error) => set({ error }),

	readerSettings: {
		fontSize: 16,
		lineHeight: 1.6,
		fontFamily: "serif",
	},
	updateSetting: (key, value) =>
		set((state) => ({
			readerSettings: { ...state.readerSettings, [key]: value },
		})),
	settingsOpen: false,
	setSettingsOpen: (settingsOpen) => set({ settingsOpen }),

	handleFileRead: (buffer) => {
		try {
			const newBook = ePub(buffer)
			get().setBook(newBook)
		} catch {
			get().setError("Failed to load EPUB file.")
		}
	},
	scrollTo: (href) => {
		get().book?.rendition.display(href)
		get().setCurrentLocation(href)
	},
}))
