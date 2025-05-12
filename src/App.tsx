import { ContentRenderer } from "@/components/ContentRenderer"
import { ErrorScreen } from "@/components/ErrorScreen"
import { FileUploader } from "@/components/FileUploader"
import { Control } from "@/components/Control"
import { Header } from "@/components/Header"
import { SettingsSidebar } from "@/components/SettingsSidebar"
import { useStore } from "@/store"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
	const { book, error, handleFileRead } = useStore()

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="flex flex-col h-screen">
				<Header key={book?.packaging?.metadata.identifier} />
				<div className="flex flex-1 overflow-hidden">
					{book ? (
						<ContentRenderer />
					) : error ? (
						<ErrorScreen message={error} />
					) : (
						<FileUploader onFileRead={handleFileRead} />
					)}
				</div>
				<Control />
				<SettingsSidebar />
			</div>
		</ThemeProvider>
	)
}
