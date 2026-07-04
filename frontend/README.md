
PS D:\cloudapp\cloudapp> git branch
* main
PS D:\cloudapp\cloudapp> git fetch origin
From https://github.com/srushtikhatale45-sketch/cloudapp
 * [new branch]      backend    -> origin/backend
 * [new branch]      frontend   -> origin/frontend
PS D:\cloudapp\cloudapp> git branch -a
* main
  remotes/origin/HEAD -> origin/main
  remotes/origin/backend
  remotes/origin/frontend
  remotes/origin/main

PS D:\cloudapp\cloudapp> git switch frontend        
branch 'frontend' set up to track 'origin/frontend'.
Switched to a new branch 'frontend'
PS D:\cloudapp\cloudapp> git branch -a              
* frontend
  main
  remotes/origin/HEAD -> origin/main
  remotes/origin/backend
  remotes/origin/frontend
  remotes/origin/main
PS D:\cloudapp\cloudapp> npm create vite@latest

> npx
> create-vite

│
◇  Project name:
│  frontend
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  JavaScript
│
◇  Which linter to use?
│  ESLint
│
◇  Install with npm and start now?
│  Yes
│
◇  Scaffolding project in D:\cloudapp\cloudapp\frontend...
│
◇  Installing dependencies with npm...

added 135 packages, and audited 136 packages in 23s

31 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
│
◇  Starting dev server...

> frontend@0.0.0 dev
> vite


  VITE v8.1.3  ready in 478 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

PS D:\cloudapp\cloudapp\frontend> npm install tailwindcss @tailwindcss/vite

Configure the Vite plugin
Add the @tailwindcss/vite plugin to your Vite configuration.

vite.config.ts

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
04
Import Tailwind CSS
Add an @import to your CSS file that imports Tailwind CSS.

CSS

@import "tailwindcss";







