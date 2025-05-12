// SettingsSidebar.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useStore } from "@/store"

// Define Settings type to fix TypeScript error
export type ReaderSettings = {
	fontSize: number
	lineHeight: number
	fontFamily: string
	contentWidth: number
}

const FONTS = [
	{ label: "Serif", value: "serif" },
	{ label: "Sans Serif", value: "sans-serif" },
	{ label: "Monospace", value: "monospace" },
]

export const SettingsSidebar = () => {
	const { settingsOpen, setSettingsOpen, readerSettings, updateSetting } = useStore()

	return (
		<Dialog open={settingsOpen} onOpenChange={(open) => !open && setSettingsOpen(false)}>
			<DialogContent className="sm:max-w-[380px] md:max-w-xl bg-card/50 backdrop-blur-md">
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle className="text-xl">Reader Settings</DialogTitle>
				</DialogHeader>

				<hr className="mb-2" />

				<div className="space-y-6 py-2">
					{/* Font Family */}
					<div className="space-y-2">
						<Label htmlFor="font-family">Font Family</Label>
						<Select value={readerSettings.fontFamily} onValueChange={(value) => updateSetting("fontFamily", value)}>
							<SelectTrigger id="font-family" className="w-full">
								<SelectValue placeholder="Select a font" />
							</SelectTrigger>
							<SelectContent>
								{FONTS.map((font) => (
									<SelectItem key={font.value} value={font.value}>
										<span style={{ fontFamily: font.value }}>{font.label}</span>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Font Size */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="font-size">Font Size</Label>
							<span className="text-sm text-muted-foreground">{readerSettings.fontSize}px</span>
						</div>
						<Slider
							id="font-size"
							min={12}
							max={36}
							step={1}
							value={[readerSettings.fontSize]}
							onValueChange={(values) => updateSetting("fontSize", values[0])}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>12px</span>
							<span>36px</span>
						</div>
					</div>

					{/* Line Height */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="line-height">Line Height</Label>
							<span className="text-sm text-muted-foreground">{readerSettings.lineHeight.toFixed(1)}</span>
						</div>
						<Slider
							id="line-height"
							min={1.0}
							max={2.0}
							step={0.1}
							value={[readerSettings.lineHeight]}
							onValueChange={(values) => updateSetting("lineHeight", values[0])}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>1.0</span>
							<span>2.0</span>
						</div>
					</div>

					{/* Content Width */}
					<div className="space-y-2">
						<div className="flex items-center justify-between">
							<Label htmlFor="content-width">Content Width</Label>
							<span className="text-sm text-muted-foreground">{readerSettings.contentWidth}px</span>
						</div>
						<Slider
							id="content-width"
							min={450}
							max={1524}
							step={1}
							value={[readerSettings.contentWidth]}
							onValueChange={(values) => updateSetting("contentWidth", values[0])}
							className="w-full"
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>320px</span>
							<span>1024px</span>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}
