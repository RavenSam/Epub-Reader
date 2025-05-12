import React, { useRef, ChangeEvent } from "react"
import { PlusIcon } from "lucide-react"

interface FileUploaderProps {
	onFileRead: (arrayBuffer: ArrayBuffer) => void
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileRead }) => {
	const inputRef = useRef<HTMLInputElement>(null)

	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return
		const reader = new FileReader()
		reader.onload = () => {
			onFileRead(reader.result as ArrayBuffer)
		}
		reader.readAsArrayBuffer(file)
		// reset value so same file can be re-uploaded if needed
		e.target.value = ""
	}

	return (
		<div className="grid pt-32 p-4 flex-1 w-full max-w-5xl mx-auto">
			<input ref={inputRef} type="file" accept=".epub" className="sr-only" onChange={handleChange} />
			<button
				className="w-40 aspect-[1/1.8] flex items-center justify-center border border-muted-foreground/50 rounded-md hover:border-primary hover:text-primary cursor-pointer"
				onClick={handleClick}
			>
				<PlusIcon className="size-6" />
				<span className="sr-only">Upload EPUB</span>
			</button>
		</div>
	)
}
