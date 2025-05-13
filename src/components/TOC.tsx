import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListIcon } from "lucide-react"
import { useStore } from "@/store"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes, ReactNode } from "react"

export const TOC = () => {
	const { toc, currentLocation, scrollTo, book } = useStore()

	console.log({ currentLocation, toc, book })

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<ListIcon className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="bg-card/50 backdrop-blur-md gap-0">
				<SheetHeader>
					<SheetTitle className="py-2">Table of Contents</SheetTitle>
				</SheetHeader>
				<div className="h-[90vh] relative">
					<ScrollArea className="p-4 pt-0 h-full">
						{toc.length ? (
							<ul className="space-y-2 mx-4">
								{toc.map((item, idx) => (
									<li key={`${item.href}-${idx}`}>
										<TOCItemButton
											href={item.href}
											currentLocation={currentLocation}
											onClick={() => scrollTo(item.href)}
										>
											{item.label}
										</TOCItemButton>

										{item.subitems && (
											<ul className="pl-4 space-y-1">
												{item.subitems.map((sub, subIdx) => (
													<li key={`${sub.href}-${subIdx}`}>
														<TOCItemButton
															href={sub.href}
															currentLocation={currentLocation}
															onClick={() => scrollTo(sub.href)}
														>
															{sub.label}
														</TOCItemButton>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						) : (
							<p className="italic text-muted-foreground">No table of contents available</p>
						)}
					</ScrollArea>
				</div>
			</SheetContent>
		</Sheet>
	)
}

interface TOCItemButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	href: string
	currentLocation: string | null
	onClick: () => void
	children: ReactNode
	className?: string
}

export const TOCItemButton = ({
	href,
	currentLocation,
	onClick,
	children,
	className,
	...props
}: TOCItemButtonProps) => {
	const isActive = href === currentLocation

	return (
		<Button
			variant="ghost"
			onClick={onClick}
			className={cn(
				"w-full relative text-left justify-start font-semibold",
				isActive ? "bg-primary/20 hover:!bg-primary/20 shadow" : "hover:!bg-primary/10",
				className
			)}
			{...props}
		>
			{isActive && <span className="h-5 w-1.5 bg-primary rounded-2xl absolute -left-2" />}
			{children}
		</Button>
	)
}
