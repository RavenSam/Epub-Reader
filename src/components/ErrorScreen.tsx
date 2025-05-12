import React from "react"

interface ErrorScreenProps {
	message: string
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => (
	<div className="flex items-center justify-center flex-1 text-red-600">
		<p>{message}</p>
	</div>
)
