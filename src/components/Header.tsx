import { Button } from "@/components/ui/button"
import { Sun, Moon, Settings as SettingsIcon } from "lucide-react"
import { TOC } from "@/components/TOC"
import { useTheme } from "./theme-provider"
import { useStore } from "@/store"

const Header = () => {
	const { book, toc, setSettingsOpen } = useStore()

	const { setTheme, theme } = useTheme()

	return (
		<header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
			<div className="flex items-center space-x-4">
				{!!toc.length && <TOC />}
				<div>
					<h1 className="text-xl font-bold truncate max-w-xs">{book?.packaging?.metadata.title || "EPUB Reader"}</h1>
					{book?.packaging?.metadata.creator && (
						<p className="text-sm text-gray-600 dark:text-gray-400 truncate">{book.packaging.metadata.creator}</p>
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
					{theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
				</Button>
				<Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)} aria-label="Settings">
					<SettingsIcon className="size-4" />
				</Button>
			</div>
		</header>
	)
}

export default Header
