#!/usr/bin/env node
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const workshopAppLocation = path.resolve(projectRoot, '..', 'packages', 'workshop-app')

const env = {
	...process.env,
	EPICSHOP_APP_LOCATION: workshopAppLocation,
	// In Codespaces, disable WebSocket revalidation since ports aren't properly
	// forwarded to the public URL. Set to 'false' to enable for local development.
	// EPICSHOP_DEPLOYED: process.env.CODESPACES === 'true' ? 'true' : process.env.EPICSHOP_DEPLOYED,
}

const child = spawn('npx', ['--prefix', './epicshop', 'epicshop', 'start'], {
	cwd: projectRoot,
	env,
	stdio: 'inherit',
})

process.on('SIGINT', () => {
	child.kill('SIGINT')
})

process.on('SIGTERM', () => {
	child.kill('SIGTERM')
})

child.on('exit', (code) => {
	process.exit(code)
})
