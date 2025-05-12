import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ListIcon } from "lucide-react"
import { useStore } from "@/store"
import { cn } from "@/lib/utils"

export const TOC = () => {
	const { toc, currentLocation, scrollTo } = useStore()

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size={"icon"} variant={"ghost"}>
					<ListIcon className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="bg-card/50 backdrop-blur-md">
				<SheetHeader>
					<SheetTitle>Table of Contents</SheetTitle>

					<ScrollArea className="p-4 h-full">
						{toc.length ? (
							<ul className="space-y-2">
								{toc.map((item, idx) => (
									<li key={`${item.href}-${idx}`}>
										<Button
											variant="ghost"
											onClick={() => scrollTo(item.href)}
											className={cn(
												"w-full text-left justify-start font-semibold",
												item.href === currentLocation
													? "bg-primary/20 hover:!bg-primary/20 shadow"
													: "hover:!bg-primary/10"
											)}
										>
											{item.href === currentLocation && (
												<span className="h-5 w-1.5 bg-primary rounded-2xl absolute left-2" />
											)}
											{item.label}
										</Button>
										{item.subitems && (
											<ul className="pl-4 space-y-1">
												{item.subitems.map((sub, subIdx) => (
													<li key={`${sub.href}-${subIdx}`}>
														<Button
															variant={sub.href === currentLocation ? "secondary" : "ghost"}
															onClick={() => scrollTo(sub.href)}
															className="w-full text-left text-sm justify-start"
														>
															{sub.label}
														</Button>
													</li>
												))}
											</ul>
										)}
									</li>
								))}
							</ul>
						) : (
							<p className="italic text-gray-500 dark:text-gray-400">No table of contents available</p>
						)}
					</ScrollArea>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
