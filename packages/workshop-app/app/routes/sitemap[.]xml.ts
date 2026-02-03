import { generateSitemap } from '@nasa-gcn/remix-seo'
import type { ServerRouteManifest as RemixServerRouteManifest } from '@remix-run/server-runtime/dist/routes'
import { type ServerBuild, type LoaderFunctionArgs } from 'react-router'
import { getDomainUrl } from '#app/utils/misc.tsx'

export async function loader({ request, context }: LoaderFunctionArgs) {
	const serverBuild = (await context.serverBuild) as ServerBuild
	const routes = serverBuild.routes as unknown as RemixServerRouteManifest
	return generateSitemap(request, routes, {
		siteUrl: getDomainUrl(request),
		headers: {
			'Cache-Control': `public, max-age=${60 * 5}`,
		},
	})
}
