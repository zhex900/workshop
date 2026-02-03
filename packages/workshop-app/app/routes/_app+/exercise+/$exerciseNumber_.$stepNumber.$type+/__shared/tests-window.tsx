export function TestsWindow({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-full w-full flex-col justify-between">
			<div className="flex min-h-0 flex-1 grow items-stretch justify-center overflow-hidden">
				{children}
			</div>
		</div>
	)
}
