import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { useStore } from "@/store"
import { HomePage } from "@/pages/home"
import { ReaderPage } from "@/pages/reader"

export default function App() {
	const { book } = useStore()

	return (
		<ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
			<Router>
				<Routes>
					<Route path="/reader" element={book ? <ReaderPage /> : <Navigate to="/" />} />
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</Router>
		</ThemeProvider>
	)
}
