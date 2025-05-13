import { ContentRenderer } from "@/components/ContentRenderer"
import { Control } from "@/components/Control"
import { Header } from "@/components/Header"
import { SettingsSidebar } from "@/components/SettingsSidebar"
import { useStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function ReaderPage() {
	const { book } = useStore()
	const navigate = useNavigate()

	useEffect(() => {
		if (!book) {
			navigate("/")
		}
	}, [book, navigate])

	return (
		<div className="flex flex-col h-screen">
			<Header key={book?.packaging?.metadata.identifier} />
			<div className="flex flex-1 overflow-hidden">
				<ContentRenderer />
			</div>
			<Control />
			<SettingsSidebar />
		</div>
	)
}
