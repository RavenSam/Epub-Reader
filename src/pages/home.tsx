import { FileUploader } from "@/components/FileUploader"
import { ErrorScreen } from "@/components/ErrorScreen"
import { useStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const HomePage = () => {
	const { handleFileRead, error, book } = useStore()
	const navigate = useNavigate()

	// If book is already loaded, redirect to reader page
	useEffect(() => {
		if (book) {
			navigate("/reader")
		}
	}, [book, navigate])

	return (
		<div className="flex flex-col h-screen">
			<div className="flex flex-col items-center justify-center flex-1">
				<h1 className="text-3xl font-bold mb-8">Epub Reader</h1>
				{error ? <ErrorScreen message={error} /> : <FileUploader onFileRead={handleFileRead} />}
			</div>
		</div>
	)
}
