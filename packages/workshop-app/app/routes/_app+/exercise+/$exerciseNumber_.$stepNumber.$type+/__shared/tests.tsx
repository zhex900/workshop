import { type ProblemApp } from '@epic-web/workshop-utils/apps.server'
import { Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Icon } from '#app/components/icons'
import { InBrowserTestRunner } from '#app/components/in-browser-test-runner'
import { SimpleTooltip } from '#app/components/ui/tooltip.tsx'
import { TestOutput } from '#app/routes/test'
import { TestsWindow } from './tests-window'

export function Tests({
	appInfo: problemAppInfo,
}: {
	appInfo: Pick<ProblemApp, 'name' | 'test'> | null
}) {
	console.log('problemAppInfo', problemAppInfo)

	return (
		<TestsWindow>
			<ErrorBoundary
				fallbackRender={() => (
					<div className="w-full p-12">
						<div className="flex w-full flex-col gap-4 text-center">
							<p className="text-2xl font-bold">Error</p>
							<p className="text-lg">
								There was an error loading the user access.
							</p>
						</div>
					</div>
				)}
			>
				<Suspense
					fallback={
						<div className="flex items-center justify-center p-8">
							<SimpleTooltip content="Loading user access">
								<Icon name="Refresh" className="animate-spin" />
							</SimpleTooltip>
						</div>
					}
				>
					<TestUI problemAppInfo={problemAppInfo} />
				</Suspense>
			</ErrorBoundary>
		</TestsWindow>
	)
}

export function TestUI({
	problemAppInfo,
}: {
	problemAppInfo: Pick<ProblemApp, 'name' | 'test'> | null
}) {
	console.log('ProblemApp', problemAppInfo)
	const [inBrowserTestKey, setInBrowserTestKey] = useState(0)

	// if (!userHasAccess) {
	// 	return (
	// 		<div className="w-full p-12">
	// 			<div className="flex w-full flex-col gap-4 text-center">
	// 				<p className="text-2xl font-bold">Access Denied</p>
	// 				<p className="text-lg">
	// 					You must login or register for the workshop to view and run the
	// 					tests.
	// 				</p>
	// 			</div>
	// 			<div className="h-16" />
	// 			<p className="pb-4">
	// 				Check out this video to see how the test tab works.
	// 			</p>
	// 			<DeferredEpicVideo url="https://www.epicweb.dev/tips/epic-workshop-test-tab-demo" />
	// 		</div>
	// 	)
	// }

	if (!problemAppInfo) {
		return (
			<div className="flex h-full items-center justify-center text-lg">
				<p>No tests here 😢 Sorry.</p>
			</div>
		)
	}

	if (problemAppInfo.test.type === 'script') {
		return <TestOutput name={problemAppInfo.name} />
	}

	if (problemAppInfo.test.type === 'browser') {
		const { pathname } = problemAppInfo.test

		return (
			<div
				className="flex h-full min-h-0 w-full grow flex-col overflow-y-auto"
				key={inBrowserTestKey}
			>
				{problemAppInfo.test.testFiles.map((testFile) => (
					<div key={testFile}>
						<InBrowserTestRunner pathname={pathname} testFile={testFile} />
					</div>
				))}
				<div className="px-3 py-[21px]">
					<button
						onClick={() => setInBrowserTestKey((c) => c + 1)}
						className="flex items-center gap-2 font-mono text-sm leading-none uppercase"
					>
						<Icon name="Refresh" aria-hidden /> Rerun All Tests
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-full items-center justify-center text-lg">
			<p>No tests here 😢 Sorry.</p>
		</div>
	)
}
