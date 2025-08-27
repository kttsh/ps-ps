/* ===== FILE: \ps-ps\.vscode\settings.json ===== */

{
	"editor.defaultFormatter": "biomejs.biome",
	"editor.formatOnSave": true
}



/* ===== FILE: \ps-ps\biome.json ===== */

{
	"$schema": "https://biomejs.dev/schemas/2.2.2/schema.json",
	"vcs": {
		"enabled": false,
		"clientKind": "git",
		"useIgnoreFile": false
	},
	"files": {
		"ignoreUnknown": false,
		"includes": ["**", "!**/src/routeTree.gen.ts", "!**/src/routes/__root.tsx"]
	},
	"formatter": {
		"enabled": true,
		"indentStyle": "tab"
	},
	"assist": { "actions": { "source": { "organizeImports": "on" } } },
	"linter": {
		"enabled": true,
		"rules": {
			"recommended": true,
			"a11y": {
				"useKeyWithClickEvents": "off"
			},
			"style": {
				"noParameterAssign": "error",
				"useAsConstAssertion": "error",
				"useDefaultParameterLast": "error",
				"useEnumInitializers": "error",
				"useSelfClosingElements": "error",
				"useSingleVarDeclarator": "error",
				"noUnusedTemplateLiteral": "error",
				"useNumberNamespace": "error",
				"noInferrableTypes": "error",
				"noUselessElse": "error"
			}
		}
	},
	"javascript": {
		"formatter": {
			"quoteStyle": "single"
		}
	}
}



/* ===== FILE: \ps-ps\components.json ===== */

{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}


/* ===== FILE: \ps-ps\package.json ===== */

{
	"name": "ps-ps",
	"private": true,
	"version": "0.0.0",
	"type": "module",
	"scripts": {
		"dev": "vite",
		"build": "tsc -b && vite build",
		"lint": "biome lint ./src",
		"lint:fix": "biome lint --write ./src",
		"format": "biome format --write ./src",
		"check": "biome check ./src",
		"check:fix": "biome check --write ./src",
		"preview": "vite preview"
	},
	"dependencies": {
		"@heroicons/react": "^2.2.0",
		"@radix-ui/react-checkbox": "^1.3.3",
		"@radix-ui/react-dialog": "^1.1.15",
		"@radix-ui/react-label": "^2.1.7",
		"@radix-ui/react-select": "^2.2.6",
		"@radix-ui/react-slot": "^1.2.3",
		"@tailwindcss/vite": "^4.1.12",
		"@tanstack/react-query": "^5.85.5",
		"@tanstack/react-router": "^1.131.28",
		"@tanstack/react-router-devtools": "^1.131.28",
		"@tanstack/react-table": "^8.21.3",
		"@tanstack/react-virtual": "^3.13.12",
		"class-variance-authority": "^0.7.1",
		"clsx": "^2.1.1",
		"framer-motion": "^12.23.12",
		"lucide-react": "^0.542.0",
		"react": "^19.1.1",
		"react-dom": "^19.1.1",
		"tailwind-merge": "^3.3.1",
		"tailwindcss": "^4.1.12",
		"zustand": "^5.0.8"
	},
	"devDependencies": {
		"@biomejs/biome": "2.2.2",
		"@tanstack/router-cli": "^1.131.28",
		"@tanstack/router-plugin": "^1.131.28",
		"@types/bun": "^1.2.21",
		"@types/node": "^24.3.0",
		"@types/react": "^19.1.11",
		"@types/react-dom": "^19.1.8",
		"@vitejs/plugin-react-swc": "^4.0.1",
		"@vitest/browser": "^3.2.4",
		"@vitest/coverage-v8": "^3.2.4",
		"globals": "^16.3.0",
		"playwright": "^1.55.0",
		"tw-animate-css": "^1.3.7",
		"typescript": "~5.9.2",
		"vite": "^7.1.3",
		"vitest": "^3.2.4"
	}
}



/* ===== FILE: \ps-ps\package-lock.json ===== */

{
	"name": "ps-ps",
	"version": "0.0.0",
	"lockfileVersion": 3,
	"requires": true,
	"packages": {
		"": {
			"name": "ps-ps",
			"version": "0.0.0",
			"dependencies": {
				"@heroicons/react": "^2.2.0",
				"@radix-ui/react-checkbox": "^1.3.2",
				"@radix-ui/react-dialog": "^1.1.14",
				"@radix-ui/react-label": "^2.1.7",
				"@radix-ui/react-select": "^2.2.5",
				"@radix-ui/react-slot": "^1.2.3",
				"@tailwindcss/vite": "^4.1.11",
				"@tanstack/react-query": "^5.83.0",
				"@tanstack/react-router": "^1.124.0",
				"@tanstack/react-router-devtools": "^1.124.0",
				"@tanstack/react-table": "^8.21.3",
				"@tanstack/react-virtual": "^3.13.12",
				"class-variance-authority": "^0.7.1",
				"clsx": "^2.1.1",
				"framer-motion": "^12.23.0",
				"lucide-react": "^0.525.0",
				"react": "^19.1.0",
				"react-dom": "^19.1.0",
				"tailwind-merge": "^3.3.1",
				"tailwindcss": "^4.1.11",
				"zustand": "^5.0.6"
			},
			"devDependencies": {
				"@biomejs/biome": "2.0.6",
				"@tanstack/router-cli": "^1.124.0",
				"@tanstack/router-plugin": "^1.124.0",
				"@types/bun": "^1.2.18",
				"@types/node": "^24.0.10",
				"@types/react": "^19.1.8",
				"@types/react-dom": "^19.1.6",
				"@vitejs/plugin-react-swc": "^3.10.2",
				"@vitest/browser": "^3.2.4",
				"@vitest/coverage-v8": "^3.2.4",
				"globals": "^16.3.0",
				"playwright": "^1.53.2",
				"tw-animate-css": "^1.3.5",
				"typescript": "~5.8.3",
				"vite": "^7.0.6",
				"vitest": "^3.2.4"
			}
		},
		"node_modules/@ampproject/remapping": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/@ampproject/remapping/-/remapping-2.3.0.tgz",
			"integrity": "sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==",
			"license": "Apache-2.0",
			"dependencies": {
				"@jridgewell/gen-mapping": "^0.3.5",
				"@jridgewell/trace-mapping": "^0.3.24"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@babel/code-frame": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.27.1.tgz",
			"integrity": "sha512-cjQ7ZlQ0Mv3b47hABuTevyTuYN4i+loJKGeV9flcCgIK37cCXRh+L1bd3iBHlynerhQ7BhCkn2BPbQUL+rGqFg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-validator-identifier": "^7.27.1",
				"js-tokens": "^4.0.0",
				"picocolors": "^1.1.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/compat-data": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.28.0.tgz",
			"integrity": "sha512-60X7qkglvrap8mn1lh2ebxXdZYtUcpd7gsmy9kLaBJ4i/WdY8PqTSdxyA8qraikqKQK5C1KRBKXqznrVapyNaw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/core": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/core/-/core-7.28.0.tgz",
			"integrity": "sha512-UlLAnTPrFdNGoFtbSXwcGFQBtQZJCNjaN6hQNP3UPvuNXT1i82N26KL3dZeIpNalWywr9IuQuncaAfUaS1g6sQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@ampproject/remapping": "^2.2.0",
				"@babel/code-frame": "^7.27.1",
				"@babel/generator": "^7.28.0",
				"@babel/helper-compilation-targets": "^7.27.2",
				"@babel/helper-module-transforms": "^7.27.3",
				"@babel/helpers": "^7.27.6",
				"@babel/parser": "^7.28.0",
				"@babel/template": "^7.27.2",
				"@babel/traverse": "^7.28.0",
				"@babel/types": "^7.28.0",
				"convert-source-map": "^2.0.0",
				"debug": "^4.1.0",
				"gensync": "^1.0.0-beta.2",
				"json5": "^2.2.3",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/babel"
			}
		},
		"node_modules/@babel/generator": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.28.0.tgz",
			"integrity": "sha512-lJjzvrbEeWrhB4P3QBsH7tey117PjLZnDbLiQEKjQ/fNJTjuq4HSqgFA+UNSwZT8D7dxxbnuSBMsa1lrWzKlQg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/parser": "^7.28.0",
				"@babel/types": "^7.28.0",
				"@jridgewell/gen-mapping": "^0.3.12",
				"@jridgewell/trace-mapping": "^0.3.28",
				"jsesc": "^3.0.2"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-annotate-as-pure": {
			"version": "7.27.3",
			"resolved": "https://registry.npmjs.org/@babel/helper-annotate-as-pure/-/helper-annotate-as-pure-7.27.3.tgz",
			"integrity": "sha512-fXSwMQqitTGeHLBC08Eq5yXz2m37E4pJX1qAU1+2cNedz/ifv/bVXft90VeSav5nFO61EcNgwr0aJxbyPaWBPg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.27.3"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-compilation-targets": {
			"version": "7.27.2",
			"resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.27.2.tgz",
			"integrity": "sha512-2+1thGUUWWjLTYTHZWK1n8Yga0ijBz1XAhUXcKy81rd5g6yh7hGqMp45v7cadSbEHc9G3OTv45SyneRN3ps4DQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/compat-data": "^7.27.2",
				"@babel/helper-validator-option": "^7.27.1",
				"browserslist": "^4.24.0",
				"lru-cache": "^5.1.1",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-create-class-features-plugin": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-create-class-features-plugin/-/helper-create-class-features-plugin-7.27.1.tgz",
			"integrity": "sha512-QwGAmuvM17btKU5VqXfb+Giw4JcN0hjuufz3DYnpeVDvZLAObloM77bhMXiqry3Iio+Ai4phVRDwl6WU10+r5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.1",
				"@babel/helper-member-expression-to-functions": "^7.27.1",
				"@babel/helper-optimise-call-expression": "^7.27.1",
				"@babel/helper-replace-supers": "^7.27.1",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
				"@babel/traverse": "^7.27.1",
				"semver": "^6.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-globals": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.28.0.tgz",
			"integrity": "sha512-+W6cISkXFa1jXsDEdYA8HeevQT/FULhxzR99pxphltZcVaugps53THCeiWA8SguxxpSp3gKPiuYfSWopkLQ4hw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-member-expression-to-functions": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-member-expression-to-functions/-/helper-member-expression-to-functions-7.27.1.tgz",
			"integrity": "sha512-E5chM8eWjTp/aNoVpcbfM7mLxu9XGLWYise2eBKGQomAk/Mb4XoxyqXTZbuTohbsl8EKqdlMhnDI2CCLfcs9wA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.27.1",
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-module-imports": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.27.1.tgz",
			"integrity": "sha512-0gSFWUPNXNopqtIPQvlD5WgXYI5GY2kP2cCvoT8kczjbfcfuIljTbcWrulD1CIPIX2gt1wghbDy08yE1p+/r3w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.27.1",
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-module-transforms": {
			"version": "7.27.3",
			"resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.27.3.tgz",
			"integrity": "sha512-dSOvYwvyLsWBeIRyOeHXp5vPj5l1I011r52FM1+r1jCERv+aFXYk4whgQccYEGYxK2H3ZAIA8nuPkQ0HaUo3qg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-imports": "^7.27.1",
				"@babel/helper-validator-identifier": "^7.27.1",
				"@babel/traverse": "^7.27.3"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-optimise-call-expression": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-optimise-call-expression/-/helper-optimise-call-expression-7.27.1.tgz",
			"integrity": "sha512-URMGH08NzYFhubNSGJrpUEphGKQwMQYBySzat5cAByY1/YgIRkULnIy3tAMeszlL/so2HbeilYloUmSpd7GdVw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-plugin-utils": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.27.1.tgz",
			"integrity": "sha512-1gn1Up5YXka3YYAHGKpbideQ5Yjf1tDa9qYcgysz+cNCXukyLl6DjPXhD3VRwSb8c0J9tA4b2+rHEZtc6R0tlw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-replace-supers": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-replace-supers/-/helper-replace-supers-7.27.1.tgz",
			"integrity": "sha512-7EHz6qDZc8RYS5ElPoShMheWvEgERonFCs7IAonWLLUTXW59DP14bCZt89/GKyreYn8g3S83m21FelHKbeDCKA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-member-expression-to-functions": "^7.27.1",
				"@babel/helper-optimise-call-expression": "^7.27.1",
				"@babel/traverse": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0"
			}
		},
		"node_modules/@babel/helper-skip-transparent-expression-wrappers": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-skip-transparent-expression-wrappers/-/helper-skip-transparent-expression-wrappers-7.27.1.tgz",
			"integrity": "sha512-Tub4ZKEXqbPjXgWLl2+3JpQAYBJ8+ikpQ2Ocj/q/r0LwE3UhENh7EUabyHjz2kCEsrRY83ew2DQdHluuiDQFzg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/traverse": "^7.27.1",
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-string-parser": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.27.1.tgz",
			"integrity": "sha512-qMlSxKbpRlAridDExk92nSobyDdpPijUq2DW6oDnUqd0iOGxmQjyqhMIihI9+zv4LPyZdRje2cavWPbCbWm3eA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-validator-identifier": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.27.1.tgz",
			"integrity": "sha512-D2hP9eA+Sqx1kBZgzxZh0y1trbuU+JoDkiEwqhQ36nodYqJwyEIhPSdMNd7lOm/4io72luTPWH20Yda0xOuUow==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helper-validator-option": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.27.1.tgz",
			"integrity": "sha512-YvjJow9FxbhFFKDSuFnVCe2WxXk1zWc22fFePVNEaWJEu8IrZVlda6N0uHwzZrUM1il7NC9Mlp4MaJYbYd9JSg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/helpers": {
			"version": "7.28.2",
			"resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.28.2.tgz",
			"integrity": "sha512-/V9771t+EgXz62aCcyofnQhGM8DQACbRhvzKFsXKC9QM+5MadF8ZmIm0crDMaz3+o0h0zXfJnd4EhbYbxsrcFw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/template": "^7.27.2",
				"@babel/types": "^7.28.2"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/parser": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.28.0.tgz",
			"integrity": "sha512-jVZGvOxOuNSsuQuLRTh13nU0AogFlw32w/MT+LV6D3sP5WdbW61E77RnkbaO2dUvmPAYrBDJXGn5gGS6tH4j8g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/types": "^7.28.0"
			},
			"bin": {
				"parser": "bin/babel-parser.js"
			},
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@babel/plugin-syntax-jsx": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-jsx/-/plugin-syntax-jsx-7.27.1.tgz",
			"integrity": "sha512-y8YTNIeKoyhGd9O0Jiyzyyqk8gdjnumGTQPsz0xOZOQ2RmkVJeZ1vmmfIvFEKqucBG6axJGBZDE/7iI5suUI/w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-syntax-typescript": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-syntax-typescript/-/plugin-syntax-typescript-7.27.1.tgz",
			"integrity": "sha512-xfYCBMxveHrRMnAWl1ZlPXOZjzkN82THFvLhQhFXFt81Z5HnN+EtUkZhv/zcKpmT3fzmWZB0ywiBrbC3vogbwQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-modules-commonjs": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-modules-commonjs/-/plugin-transform-modules-commonjs-7.27.1.tgz",
			"integrity": "sha512-OJguuwlTYlN0gBZFRPqwOGNWssZjfIUdS7HMYtN8c1KmwpwHFBwTeFZrg9XZa+DFTitWOW5iTAG7tyCUPsCCyw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-module-transforms": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/plugin-transform-typescript": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/plugin-transform-typescript/-/plugin-transform-typescript-7.28.0.tgz",
			"integrity": "sha512-4AEiDEBPIZvLQaWlc9liCavE0xRM0dNca41WtBeM3jgFptfUOSG9z0uteLhq6+3rq+WB6jIvUwKDTpXEHPJ2Vg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-annotate-as-pure": "^7.27.3",
				"@babel/helper-create-class-features-plugin": "^7.27.1",
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-skip-transparent-expression-wrappers": "^7.27.1",
				"@babel/plugin-syntax-typescript": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/preset-typescript": {
			"version": "7.27.1",
			"resolved": "https://registry.npmjs.org/@babel/preset-typescript/-/preset-typescript-7.27.1.tgz",
			"integrity": "sha512-l7WfQfX0WK4M0v2RudjuQK4u99BS6yLHYEmdtVPP7lKV013zr9DygFuWNlnbvQ9LR+LS0Egz/XAvGx5U9MX0fQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-plugin-utils": "^7.27.1",
				"@babel/helper-validator-option": "^7.27.1",
				"@babel/plugin-syntax-jsx": "^7.27.1",
				"@babel/plugin-transform-modules-commonjs": "^7.27.1",
				"@babel/plugin-transform-typescript": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			},
			"peerDependencies": {
				"@babel/core": "^7.0.0-0"
			}
		},
		"node_modules/@babel/runtime": {
			"version": "7.28.2",
			"resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.28.2.tgz",
			"integrity": "sha512-KHp2IflsnGywDjBWDkR9iEqiWSpc8GIi0lgTT3mOElT0PP1tG26P4tmFI2YvAdzgq9RGyoHZQEIEdZy6Ec5xCA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/template": {
			"version": "7.27.2",
			"resolved": "https://registry.npmjs.org/@babel/template/-/template-7.27.2.tgz",
			"integrity": "sha512-LPDZ85aEJyYSd18/DkjNh4/y1ntkE5KwUHWTiqgRxruuZL2F1yuHligVHLvcHY2vMHXttKFpJn6LwfI7cw7ODw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.27.1",
				"@babel/parser": "^7.27.2",
				"@babel/types": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/traverse": {
			"version": "7.28.0",
			"resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.28.0.tgz",
			"integrity": "sha512-mGe7UK5wWyh0bKRfupsUchrQGqvDbZDbKJw+kcRGSmdHVYrv+ltd0pnpDTVpiTqnaBru9iEvA8pz8W46v0Amwg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.27.1",
				"@babel/generator": "^7.28.0",
				"@babel/helper-globals": "^7.28.0",
				"@babel/parser": "^7.28.0",
				"@babel/template": "^7.27.2",
				"@babel/types": "^7.28.0",
				"debug": "^4.3.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@babel/types": {
			"version": "7.28.2",
			"resolved": "https://registry.npmjs.org/@babel/types/-/types-7.28.2.tgz",
			"integrity": "sha512-ruv7Ae4J5dUYULmeXw1gmb7rYRz57OWCPM57pHojnLq/3Z1CK2lNSLTCVjxVk1F/TZHwOZZrOWi0ur95BbLxNQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/helper-string-parser": "^7.27.1",
				"@babel/helper-validator-identifier": "^7.27.1"
			},
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/@bcoe/v8-coverage": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/@bcoe/v8-coverage/-/v8-coverage-1.0.2.tgz",
			"integrity": "sha512-6zABk/ECA/QYSCQ1NGiVwwbQerUCZ+TQbp64Q3AgmfNvurHH0j8TtXa1qbShXA6qqkpAj4V5W8pP6mLe1mcMqA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@biomejs/biome": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/biome/-/biome-2.0.6.tgz",
			"integrity": "sha512-RRP+9cdh5qwe2t0gORwXaa27oTOiQRQvrFf49x2PA1tnpsyU7FIHX4ZOFMtBC4QNtyWsN7Dqkf5EDbg4X+9iqA==",
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"bin": {
				"biome": "bin/biome"
			},
			"engines": {
				"node": ">=14.21.3"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/biome"
			},
			"optionalDependencies": {
				"@biomejs/cli-darwin-arm64": "2.0.6",
				"@biomejs/cli-darwin-x64": "2.0.6",
				"@biomejs/cli-linux-arm64": "2.0.6",
				"@biomejs/cli-linux-arm64-musl": "2.0.6",
				"@biomejs/cli-linux-x64": "2.0.6",
				"@biomejs/cli-linux-x64-musl": "2.0.6",
				"@biomejs/cli-win32-arm64": "2.0.6",
				"@biomejs/cli-win32-x64": "2.0.6"
			}
		},
		"node_modules/@biomejs/cli-darwin-arm64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-darwin-arm64/-/cli-darwin-arm64-2.0.6.tgz",
			"integrity": "sha512-AzdiNNjNzsE6LfqWyBvcL29uWoIuZUkndu+wwlXW13EKcBHbbKjNQEZIJKYDc6IL+p7bmWGx3v9ZtcRyIoIz5A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-darwin-x64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-darwin-x64/-/cli-darwin-x64-2.0.6.tgz",
			"integrity": "sha512-wJjjP4E7bO4WJmiQaLnsdXMa516dbtC6542qeRkyJg0MqMXP0fvs4gdsHhZ7p9XWTAmGIjZHFKXdsjBvKGIJJQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-linux-arm64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-linux-arm64/-/cli-linux-arm64-2.0.6.tgz",
			"integrity": "sha512-ZSVf6TYo5rNMUHIW1tww+rs/krol7U5A1Is/yzWyHVZguuB0lBnIodqyFuwCNqG9aJGyk7xIMS8HG0qGUPz0SA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-linux-arm64-musl": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-linux-arm64-musl/-/cli-linux-arm64-musl-2.0.6.tgz",
			"integrity": "sha512-CVPEMlin3bW49sBqLBg2x016Pws7eUXA27XYDFlEtponD0luYjg2zQaMJ2nOqlkKG9fqzzkamdYxHdMDc2gZFw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-linux-x64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-linux-x64/-/cli-linux-x64-2.0.6.tgz",
			"integrity": "sha512-geM1MkHTV1Kh2Cs/Xzot9BOF3WBacihw6bkEmxkz4nSga8B9/hWy5BDiOG3gHDGIBa8WxT0nzsJs2f/hPqQIQw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-linux-x64-musl": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-linux-x64-musl/-/cli-linux-x64-musl-2.0.6.tgz",
			"integrity": "sha512-mKHE/e954hR/hSnAcJSjkf4xGqZc/53Kh39HVW1EgO5iFi0JutTN07TSjEMg616julRtfSNJi0KNyxvc30Y4rQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-win32-arm64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-win32-arm64/-/cli-win32-arm64-2.0.6.tgz",
			"integrity": "sha512-290V4oSFoKaprKE1zkYVsDfAdn0An5DowZ+GIABgjoq1ndhvNxkJcpxPsiYtT7slbVe3xmlT0ncdfOsN7KruzA==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@biomejs/cli-win32-x64": {
			"version": "2.0.6",
			"resolved": "https://registry.npmjs.org/@biomejs/cli-win32-x64/-/cli-win32-x64-2.0.6.tgz",
			"integrity": "sha512-bfM1Bce0d69Ao7pjTjUS+AWSZ02+5UHdiAP85Th8e9yV5xzw6JrHXbL5YWlcEKQ84FIZMdDc7ncuti1wd2sdbw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "MIT OR Apache-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=14.21.3"
			}
		},
		"node_modules/@esbuild/aix-ppc64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.25.8.tgz",
			"integrity": "sha512-urAvrUedIqEiFR3FYSLTWQgLu5tb+m0qZw0NBEasUeo6wuqatkMDaRT+1uABiGXEu5vqgPd7FGE1BhsAIy9QVA==",
			"cpu": [
				"ppc64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"aix"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-arm": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.25.8.tgz",
			"integrity": "sha512-RONsAvGCz5oWyePVnLdZY/HHwA++nxYWIX1atInlaW6SEkwq6XkP3+cb825EUcRs5Vss/lGh/2YxAb5xqc07Uw==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.25.8.tgz",
			"integrity": "sha512-OD3p7LYzWpLhZEyATcTSJ67qB5D+20vbtr6vHlHWSQYhKtzUYrETuWThmzFpZtFsBIxRvhO07+UgVA9m0i/O1w==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/android-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.25.8.tgz",
			"integrity": "sha512-yJAVPklM5+4+9dTeKwHOaA+LQkmrKFX96BM0A/2zQrbS6ENCmxc4OVoBs5dPkCCak2roAD+jKCdnmOqKszPkjA==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/darwin-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.25.8.tgz",
			"integrity": "sha512-Jw0mxgIaYX6R8ODrdkLLPwBqHTtYHJSmzzd+QeytSugzQ0Vg4c5rDky5VgkoowbZQahCbsv1rT1KW72MPIkevw==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/darwin-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.25.8.tgz",
			"integrity": "sha512-Vh2gLxxHnuoQ+GjPNvDSDRpoBCUzY4Pu0kBqMBDlK4fuWbKgGtmDIeEC081xi26PPjn+1tct+Bh8FjyLlw1Zlg==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/freebsd-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.25.8.tgz",
			"integrity": "sha512-YPJ7hDQ9DnNe5vxOm6jaie9QsTwcKedPvizTVlqWG9GBSq+BuyWEDazlGaDTC5NGU4QJd666V0yqCBL2oWKPfA==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/freebsd-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.25.8.tgz",
			"integrity": "sha512-MmaEXxQRdXNFsRN/KcIimLnSJrk2r5H8v+WVafRWz5xdSVmWLoITZQXcgehI2ZE6gioE6HirAEToM/RvFBeuhw==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-arm": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.25.8.tgz",
			"integrity": "sha512-FuzEP9BixzZohl1kLf76KEVOsxtIBFwCaLupVuk4eFVnOZfU+Wsn+x5Ryam7nILV2pkq2TqQM9EZPsOBuMC+kg==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.25.8.tgz",
			"integrity": "sha512-WIgg00ARWv/uYLU7lsuDK00d/hHSfES5BzdWAdAig1ioV5kaFNrtK8EqGcUBJhYqotlUByUKz5Qo6u8tt7iD/w==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-ia32": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.25.8.tgz",
			"integrity": "sha512-A1D9YzRX1i+1AJZuFFUMP1E9fMaYY+GnSQil9Tlw05utlE86EKTUA7RjwHDkEitmLYiFsRd9HwKBPEftNdBfjg==",
			"cpu": [
				"ia32"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-loong64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.25.8.tgz",
			"integrity": "sha512-O7k1J/dwHkY1RMVvglFHl1HzutGEFFZ3kNiDMSOyUrB7WcoHGf96Sh+64nTRT26l3GMbCW01Ekh/ThKM5iI7hQ==",
			"cpu": [
				"loong64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-mips64el": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.25.8.tgz",
			"integrity": "sha512-uv+dqfRazte3BzfMp8PAQXmdGHQt2oC/y2ovwpTteqrMx2lwaksiFZ/bdkXJC19ttTvNXBuWH53zy/aTj1FgGw==",
			"cpu": [
				"mips64el"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-ppc64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.25.8.tgz",
			"integrity": "sha512-GyG0KcMi1GBavP5JgAkkstMGyMholMDybAf8wF5A70CALlDM2p/f7YFE7H92eDeH/VBtFJA5MT4nRPDGg4JuzQ==",
			"cpu": [
				"ppc64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-riscv64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.25.8.tgz",
			"integrity": "sha512-rAqDYFv3yzMrq7GIcen3XP7TUEG/4LK86LUPMIz6RT8A6pRIDn0sDcvjudVZBiiTcZCY9y2SgYX2lgK3AF+1eg==",
			"cpu": [
				"riscv64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-s390x": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.25.8.tgz",
			"integrity": "sha512-Xutvh6VjlbcHpsIIbwY8GVRbwoviWT19tFhgdA7DlenLGC/mbc3lBoVb7jxj9Z+eyGqvcnSyIltYUrkKzWqSvg==",
			"cpu": [
				"s390x"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/linux-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.25.8.tgz",
			"integrity": "sha512-ASFQhgY4ElXh3nDcOMTkQero4b1lgubskNlhIfJrsH5OKZXDpUAKBlNS0Kx81jwOBp+HCeZqmoJuihTv57/jvQ==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/netbsd-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.25.8.tgz",
			"integrity": "sha512-d1KfruIeohqAi6SA+gENMuObDbEjn22olAR7egqnkCD9DGBG0wsEARotkLgXDu6c4ncgWTZJtN5vcgxzWRMzcw==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"netbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/netbsd-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.25.8.tgz",
			"integrity": "sha512-nVDCkrvx2ua+XQNyfrujIG38+YGyuy2Ru9kKVNyh5jAys6n+l44tTtToqHjino2My8VAY6Lw9H7RI73XFi66Cg==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"netbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openbsd-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.25.8.tgz",
			"integrity": "sha512-j8HgrDuSJFAujkivSMSfPQSAa5Fxbvk4rgNAS5i3K+r8s1X0p1uOO2Hl2xNsGFppOeHOLAVgYwDVlmxhq5h+SQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"openbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openbsd-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.25.8.tgz",
			"integrity": "sha512-1h8MUAwa0VhNCDp6Af0HToI2TJFAn1uqT9Al6DJVzdIBAd21m/G0Yfc77KDM3uF3T/YaOgQq3qTJHPbTOInaIQ==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"openbsd"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/openharmony-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.25.8.tgz",
			"integrity": "sha512-r2nVa5SIK9tSWd0kJd9HCffnDHKchTGikb//9c7HX+r+wHYCpQrSgxhlY6KWV1nFo1l4KFbsMlHk+L6fekLsUg==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"openharmony"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/sunos-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.25.8.tgz",
			"integrity": "sha512-zUlaP2S12YhQ2UzUfcCuMDHQFJyKABkAjvO5YSndMiIkMimPmxA+BYSBikWgsRpvyxuRnow4nS5NPnf9fpv41w==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"sunos"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-arm64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.25.8.tgz",
			"integrity": "sha512-YEGFFWESlPva8hGL+zvj2z/SaK+pH0SwOM0Nc/d+rVnW7GSTFlLBGzZkuSU9kFIGIo8q9X3ucpZhu8PDN5A2sQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-ia32": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.25.8.tgz",
			"integrity": "sha512-hiGgGC6KZ5LZz58OL/+qVVoZiuZlUYlYHNAmczOm7bs2oE1XriPFi5ZHHrS8ACpV5EjySrnoCKmcbQMN+ojnHg==",
			"cpu": [
				"ia32"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@esbuild/win32-x64": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.25.8.tgz",
			"integrity": "sha512-cn3Yr7+OaaZq1c+2pe+8yxC8E144SReCQjN6/2ynubzYjvyqZjTXfQJpAcQpsdJq3My7XADANiYGHoFC69pLQw==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@floating-ui/core": {
			"version": "1.7.2",
			"resolved": "https://registry.npmjs.org/@floating-ui/core/-/core-1.7.2.tgz",
			"integrity": "sha512-wNB5ooIKHQc+Kui96jE/n69rHFWAVoxn5CAzL1Xdd8FG03cgY3MLO+GF9U3W737fYDSgPWA6MReKhBQBop6Pcw==",
			"license": "MIT",
			"dependencies": {
				"@floating-ui/utils": "^0.2.10"
			}
		},
		"node_modules/@floating-ui/dom": {
			"version": "1.7.2",
			"resolved": "https://registry.npmjs.org/@floating-ui/dom/-/dom-1.7.2.tgz",
			"integrity": "sha512-7cfaOQuCS27HD7DX+6ib2OrnW+b4ZBwDNnCcT0uTyidcmyWb03FnQqJybDBoCnpdxwBSfA94UAYlRCt7mV+TbA==",
			"license": "MIT",
			"dependencies": {
				"@floating-ui/core": "^1.7.2",
				"@floating-ui/utils": "^0.2.10"
			}
		},
		"node_modules/@floating-ui/react-dom": {
			"version": "2.1.4",
			"resolved": "https://registry.npmjs.org/@floating-ui/react-dom/-/react-dom-2.1.4.tgz",
			"integrity": "sha512-JbbpPhp38UmXDDAu60RJmbeme37Jbgsm7NrHGgzYYFKmblzRUh6Pa641dII6LsjwF4XlScDrde2UAzDo/b9KPw==",
			"license": "MIT",
			"dependencies": {
				"@floating-ui/dom": "^1.7.2"
			},
			"peerDependencies": {
				"react": ">=16.8.0",
				"react-dom": ">=16.8.0"
			}
		},
		"node_modules/@floating-ui/utils": {
			"version": "0.2.10",
			"resolved": "https://registry.npmjs.org/@floating-ui/utils/-/utils-0.2.10.tgz",
			"integrity": "sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==",
			"license": "MIT"
		},
		"node_modules/@heroicons/react": {
			"version": "2.2.0",
			"resolved": "https://registry.npmjs.org/@heroicons/react/-/react-2.2.0.tgz",
			"integrity": "sha512-LMcepvRaS9LYHJGsF0zzmgKCUim/X3N/DQKc4jepAXJ7l8QxJ1PmxJzqplF2Z3FE4PqBAIGyJAQ/w4B5dsqbtQ==",
			"license": "MIT",
			"peerDependencies": {
				"react": ">= 16 || ^19.0.0-rc"
			}
		},
		"node_modules/@isaacs/cliui": {
			"version": "8.0.2",
			"resolved": "https://registry.npmjs.org/@isaacs/cliui/-/cliui-8.0.2.tgz",
			"integrity": "sha512-O8jcjabXaleOG9DQ0+ARXWZBTfnP4WNAqzuiJK7ll44AmxGKv/J2M4TPjxjY3znBCfvBXFzucm1twdyFybFqEA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"string-width": "^5.1.2",
				"string-width-cjs": "npm:string-width@^4.2.0",
				"strip-ansi": "^7.0.1",
				"strip-ansi-cjs": "npm:strip-ansi@^6.0.1",
				"wrap-ansi": "^8.1.0",
				"wrap-ansi-cjs": "npm:wrap-ansi@^7.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/@isaacs/fs-minipass": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/@isaacs/fs-minipass/-/fs-minipass-4.0.1.tgz",
			"integrity": "sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==",
			"license": "ISC",
			"dependencies": {
				"minipass": "^7.0.4"
			},
			"engines": {
				"node": ">=18.0.0"
			}
		},
		"node_modules/@istanbuljs/schema": {
			"version": "0.1.3",
			"resolved": "https://registry.npmjs.org/@istanbuljs/schema/-/schema-0.1.3.tgz",
			"integrity": "sha512-ZXRY4jNvVgSVQ8DL3LTcakaAtXwTVUxE81hslsyD2AtoXW/wVob10HkOJ1X/pAlcI7D+2YoZKg5do8G/w6RYgA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/@jridgewell/gen-mapping": {
			"version": "0.3.12",
			"resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.12.tgz",
			"integrity": "sha512-OuLGC46TjB5BbN1dH8JULVVZY4WTdkF7tV9Ys6wLL1rubZnCMstOhNHueU5bLCrnRuDhKPDM4g6sw4Bel5Gzqg==",
			"license": "MIT",
			"dependencies": {
				"@jridgewell/sourcemap-codec": "^1.5.0",
				"@jridgewell/trace-mapping": "^0.3.24"
			}
		},
		"node_modules/@jridgewell/resolve-uri": {
			"version": "3.1.2",
			"resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
			"integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
			"license": "MIT",
			"engines": {
				"node": ">=6.0.0"
			}
		},
		"node_modules/@jridgewell/sourcemap-codec": {
			"version": "1.5.4",
			"resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.5.4.tgz",
			"integrity": "sha512-VT2+G1VQs/9oz078bLrYbecdZKs912zQlkelYpuf+SXF+QvZDYJlbx/LSx+meSAwdDFnF8FVXW92AVjjkVmgFw==",
			"license": "MIT"
		},
		"node_modules/@jridgewell/trace-mapping": {
			"version": "0.3.29",
			"resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.29.tgz",
			"integrity": "sha512-uw6guiW/gcAGPDhLmd77/6lW8QLeiV5RUTsAX46Db6oLhGaVj4lhnPwb184s1bkc8kdVg/+h988dro8GRDpmYQ==",
			"license": "MIT",
			"dependencies": {
				"@jridgewell/resolve-uri": "^3.1.0",
				"@jridgewell/sourcemap-codec": "^1.4.14"
			}
		},
		"node_modules/@pkgjs/parseargs": {
			"version": "0.11.0",
			"resolved": "https://registry.npmjs.org/@pkgjs/parseargs/-/parseargs-0.11.0.tgz",
			"integrity": "sha512-+1VkjdD0QBLPodGrJUeqarH8VAIvQODIbwh9XpP5Syisf7YoQgsJKPNFoqqLQlu+VQ/tVSshMR6loPMn8U+dPg==",
			"dev": true,
			"license": "MIT",
			"optional": true,
			"engines": {
				"node": ">=14"
			}
		},
		"node_modules/@polka/url": {
			"version": "1.0.0-next.29",
			"resolved": "https://registry.npmjs.org/@polka/url/-/url-1.0.0-next.29.tgz",
			"integrity": "sha512-wwQAWhWSuHaag8c4q/KN/vCoeOJYshAIvMQwD4GpSb3OiZklFfvAgmj0VCBBImRpuF/aFgIRzllXlVX93Jevww==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@radix-ui/number": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/number/-/number-1.1.1.tgz",
			"integrity": "sha512-MkKCwxlXTgz6CFoJx3pCwn07GKp36+aZyu/u2Ln2VrA5DcdyCZkASEDBTd8x5whTQQL5CiYf4prXKLcgQdv29g==",
			"license": "MIT"
		},
		"node_modules/@radix-ui/primitive": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/primitive/-/primitive-1.1.2.tgz",
			"integrity": "sha512-XnbHrrprsNqZKQhStrSwgRUQzoCI1glLzdw79xiZPoofhGICeZRSQ3dIxAKH1gb3OHfNf4d6f+vAv3kil2eggA==",
			"license": "MIT"
		},
		"node_modules/@radix-ui/react-arrow": {
			"version": "1.1.7",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-arrow/-/react-arrow-1.1.7.tgz",
			"integrity": "sha512-F+M1tLhO+mlQaOWspE8Wstg+z6PwxwRd8oQ8IXceWz92kfAmalTRf0EjrouQeo7QssEPfCn05B4Ihs1K9WQ/7w==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-primitive": "2.1.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-checkbox": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-checkbox/-/react-checkbox-1.3.2.tgz",
			"integrity": "sha512-yd+dI56KZqawxKZrJ31eENUwqc1QSqg4OZ15rybGjF2ZNwMO+wCyHzAVLRp9qoYJf7kYy0YpZ2b0JCzJ42HZpA==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/primitive": "1.1.2",
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-context": "1.1.2",
				"@radix-ui/react-presence": "1.1.4",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-use-controllable-state": "1.2.2",
				"@radix-ui/react-use-previous": "1.1.1",
				"@radix-ui/react-use-size": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-collection": {
			"version": "1.1.7",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-collection/-/react-collection-1.1.7.tgz",
			"integrity": "sha512-Fh9rGN0MoI4ZFUNyfFVNU4y9LUz93u9/0K+yLgA2bwRojxM8JU1DyvvMBabnZPBgMWREAJvU2jjVzq+LrFUglw==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-context": "1.1.2",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-slot": "1.2.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-compose-refs": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-compose-refs/-/react-compose-refs-1.1.2.tgz",
			"integrity": "sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-context": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-context/-/react-context-1.1.2.tgz",
			"integrity": "sha512-jCi/QKUM2r1Ju5a3J64TH2A5SpKAgh0LpknyqdQ4m6DCV0xJ2HG1xARRwNGPQfi1SLdLWZ1OJz6F4OMBBNiGJA==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-dialog": {
			"version": "1.1.14",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-dialog/-/react-dialog-1.1.14.tgz",
			"integrity": "sha512-+CpweKjqpzTmwRwcYECQcNYbI8V9VSQt0SNFKeEBLgfucbsLssU6Ppq7wUdNXEGb573bMjFhVjKVll8rmV6zMw==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/primitive": "1.1.2",
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-context": "1.1.2",
				"@radix-ui/react-dismissable-layer": "1.1.10",
				"@radix-ui/react-focus-guards": "1.1.2",
				"@radix-ui/react-focus-scope": "1.1.7",
				"@radix-ui/react-id": "1.1.1",
				"@radix-ui/react-portal": "1.1.9",
				"@radix-ui/react-presence": "1.1.4",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-slot": "1.2.3",
				"@radix-ui/react-use-controllable-state": "1.2.2",
				"aria-hidden": "^1.2.4",
				"react-remove-scroll": "^2.6.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-direction": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-direction/-/react-direction-1.1.1.tgz",
			"integrity": "sha512-1UEWRX6jnOA2y4H5WczZ44gOOjTEmlqv1uNW4GAJEO5+bauCBhv8snY65Iw5/VOS/ghKN9gr2KjnLKxrsvoMVw==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-dismissable-layer": {
			"version": "1.1.10",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-dismissable-layer/-/react-dismissable-layer-1.1.10.tgz",
			"integrity": "sha512-IM1zzRV4W3HtVgftdQiiOmA0AdJlCtMLe00FXaHwgt3rAnNsIyDqshvkIW3hj/iu5hu8ERP7KIYki6NkqDxAwQ==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/primitive": "1.1.2",
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-use-callback-ref": "1.1.1",
				"@radix-ui/react-use-escape-keydown": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-focus-guards": {
			"version": "1.1.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-focus-guards/-/react-focus-guards-1.1.2.tgz",
			"integrity": "sha512-fyjAACV62oPV925xFCrH8DR5xWhg9KYtJT4s3u54jxp+L/hbpTY2kIeEFFbFe+a/HCE94zGQMZLIpVTPVZDhaA==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-focus-scope": {
			"version": "1.1.7",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-focus-scope/-/react-focus-scope-1.1.7.tgz",
			"integrity": "sha512-t2ODlkXBQyn7jkl6TNaw/MtVEVvIGelJDCG41Okq/KwUsJBwQ4XVZsHAVUkK4mBv3ewiAS3PGuUWuY2BoK4ZUw==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-use-callback-ref": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-id": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-id/-/react-id-1.1.1.tgz",
			"integrity": "sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-label": {
			"version": "2.1.7",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-label/-/react-label-2.1.7.tgz",
			"integrity": "sha512-YT1GqPSL8kJn20djelMX7/cTRp/Y9w5IZHvfxQTVHrOqa2yMl7i/UfMqKRU5V7mEyKTrUVgJXhNQPVCG8PBLoQ==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-primitive": "2.1.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-popper": {
			"version": "1.2.7",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-popper/-/react-popper-1.2.7.tgz",
			"integrity": "sha512-IUFAccz1JyKcf/RjB552PlWwxjeCJB8/4KxT7EhBHOJM+mN7LdW+B3kacJXILm32xawcMMjb2i0cIZpo+f9kiQ==",
			"license": "MIT",
			"dependencies": {
				"@floating-ui/react-dom": "^2.0.0",
				"@radix-ui/react-arrow": "1.1.7",
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-context": "1.1.2",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-use-callback-ref": "1.1.1",
				"@radix-ui/react-use-layout-effect": "1.1.1",
				"@radix-ui/react-use-rect": "1.1.1",
				"@radix-ui/react-use-size": "1.1.1",
				"@radix-ui/rect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-portal": {
			"version": "1.1.9",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-portal/-/react-portal-1.1.9.tgz",
			"integrity": "sha512-bpIxvq03if6UNwXZ+HTK71JLh4APvnXntDc6XOX8UVq4XQOVl7lwok0AvIl+b8zgCw3fSaVTZMpAPPagXbKmHQ==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-presence": {
			"version": "1.1.4",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-presence/-/react-presence-1.1.4.tgz",
			"integrity": "sha512-ueDqRbdc4/bkaQT3GIpLQssRlFgWaL/U2z/S31qRwwLWoxHLgry3SIfCwhxeQNbirEUXFa+lq3RL3oBYXtcmIA==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-primitive": {
			"version": "2.1.3",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-primitive/-/react-primitive-2.1.3.tgz",
			"integrity": "sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-slot": "1.2.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-select": {
			"version": "2.2.5",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-select/-/react-select-2.2.5.tgz",
			"integrity": "sha512-HnMTdXEVuuyzx63ME0ut4+sEMYW6oouHWNGUZc7ddvUWIcfCva/AMoqEW/3wnEllriMWBa0RHspCYnfCWJQYmA==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/number": "1.1.1",
				"@radix-ui/primitive": "1.1.2",
				"@radix-ui/react-collection": "1.1.7",
				"@radix-ui/react-compose-refs": "1.1.2",
				"@radix-ui/react-context": "1.1.2",
				"@radix-ui/react-direction": "1.1.1",
				"@radix-ui/react-dismissable-layer": "1.1.10",
				"@radix-ui/react-focus-guards": "1.1.2",
				"@radix-ui/react-focus-scope": "1.1.7",
				"@radix-ui/react-id": "1.1.1",
				"@radix-ui/react-popper": "1.2.7",
				"@radix-ui/react-portal": "1.1.9",
				"@radix-ui/react-primitive": "2.1.3",
				"@radix-ui/react-slot": "1.2.3",
				"@radix-ui/react-use-callback-ref": "1.1.1",
				"@radix-ui/react-use-controllable-state": "1.2.2",
				"@radix-ui/react-use-layout-effect": "1.1.1",
				"@radix-ui/react-use-previous": "1.1.1",
				"@radix-ui/react-visually-hidden": "1.2.3",
				"aria-hidden": "^1.2.4",
				"react-remove-scroll": "^2.6.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-slot": {
			"version": "1.2.3",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-slot/-/react-slot-1.2.3.tgz",
			"integrity": "sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-compose-refs": "1.1.2"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-callback-ref": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-callback-ref/-/react-use-callback-ref-1.1.1.tgz",
			"integrity": "sha512-FkBMwD+qbGQeMu1cOHnuGB6x4yzPjho8ap5WtbEJ26umhgqVXbhekKUQO+hZEL1vU92a3wHwdp0HAcqAUF5iDg==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-controllable-state": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-controllable-state/-/react-use-controllable-state-1.2.2.tgz",
			"integrity": "sha512-BjasUjixPFdS+NKkypcyyN5Pmg83Olst0+c6vGov0diwTEo6mgdqVR6hxcEgFuh4QrAs7Rc+9KuGJ9TVCj0Zzg==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-use-effect-event": "0.0.2",
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-effect-event": {
			"version": "0.0.2",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-effect-event/-/react-use-effect-event-0.0.2.tgz",
			"integrity": "sha512-Qp8WbZOBe+blgpuUT+lw2xheLP8q0oatc9UpmiemEICxGvFLYmHm9QowVZGHtJlGbS6A6yJ3iViad/2cVjnOiA==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-escape-keydown": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-escape-keydown/-/react-use-escape-keydown-1.1.1.tgz",
			"integrity": "sha512-Il0+boE7w/XebUHyBjroE+DbByORGR9KKmITzbR7MyQ4akpORYP/ZmbhAr0DG7RmmBqoOnZdy2QlvajJ2QA59g==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-use-callback-ref": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-layout-effect": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-layout-effect/-/react-use-layout-effect-1.1.1.tgz",
			"integrity": "sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-previous": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-previous/-/react-use-previous-1.1.1.tgz",
			"integrity": "sha512-2dHfToCj/pzca2Ck724OZ5L0EVrr3eHRNsG/b3xQJLA2hZpVCS99bLAX+hm1IHXDEnzU6by5z/5MIY794/a8NQ==",
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-rect": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-rect/-/react-use-rect-1.1.1.tgz",
			"integrity": "sha512-QTYuDesS0VtuHNNvMh+CjlKJ4LJickCMUAqjlE3+j8w+RlRpwyX3apEQKGFzbZGdo7XNG1tXa+bQqIE7HIXT2w==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/rect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-use-size": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-use-size/-/react-use-size-1.1.1.tgz",
			"integrity": "sha512-ewrXRDTAqAXlkl6t/fkXWNAhFX9I+CkKlw6zjEwk86RSPKwZr3xpBRso655aqYafwtnbpHLj6toFzmd6xdVptQ==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-use-layout-effect": "1.1.1"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/react-visually-hidden": {
			"version": "1.2.3",
			"resolved": "https://registry.npmjs.org/@radix-ui/react-visually-hidden/-/react-visually-hidden-1.2.3.tgz",
			"integrity": "sha512-pzJq12tEaaIhqjbzpCuv/OypJY/BPavOofm+dbab+MHLajy277+1lLm6JFcGgF5eskJ6mquGirhXY2GD/8u8Ug==",
			"license": "MIT",
			"dependencies": {
				"@radix-ui/react-primitive": "2.1.3"
			},
			"peerDependencies": {
				"@types/react": "*",
				"@types/react-dom": "*",
				"react": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc",
				"react-dom": "^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"@types/react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/@radix-ui/rect": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/@radix-ui/rect/-/rect-1.1.1.tgz",
			"integrity": "sha512-HPwpGIzkl28mWyZqG52jiqDJ12waP11Pa1lGoiyUkIEuMLBP0oeK/C89esbXrxsky5we7dfd8U58nm0SgAWpVw==",
			"license": "MIT"
		},
		"node_modules/@rolldown/pluginutils": {
			"version": "1.0.0-beta.27",
			"resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-beta.27.tgz",
			"integrity": "sha512-+d0F4MKMCbeVUJwG96uQ4SgAznZNSq93I3V+9NHA4OpvqG8mRCpGdKmK8l/dl02h2CCDHwW2FqilnTyDcAnqjA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@rollup/rollup-android-arm-eabi": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.45.1.tgz",
			"integrity": "sha512-NEySIFvMY0ZQO+utJkgoMiCAjMrGvnbDLHvcmlA33UXJpYBCvlBEbMMtV837uCkS+plG2umfhn0T5mMAxGrlRA==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			]
		},
		"node_modules/@rollup/rollup-android-arm64": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.45.1.tgz",
			"integrity": "sha512-ujQ+sMXJkg4LRJaYreaVx7Z/VMgBBd89wGS4qMrdtfUFZ+TSY5Rs9asgjitLwzeIbhwdEhyj29zhst3L1lKsRQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			]
		},
		"node_modules/@rollup/rollup-darwin-arm64": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.45.1.tgz",
			"integrity": "sha512-FSncqHvqTm3lC6Y13xncsdOYfxGSLnP+73k815EfNmpewPs+EyM49haPS105Rh4aF5mJKywk9X0ogzLXZzN9lA==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rollup/rollup-darwin-x64": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.45.1.tgz",
			"integrity": "sha512-2/vVn/husP5XI7Fsf/RlhDaQJ7x9zjvC81anIVbr4b/f0xtSmXQTFcGIQ/B1cXIYM6h2nAhJkdMHTnD7OtQ9Og==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			]
		},
		"node_modules/@rollup/rollup-freebsd-arm64": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.45.1.tgz",
			"integrity": "sha512-4g1kaDxQItZsrkVTdYQ0bxu4ZIQ32cotoQbmsAnW1jAE4XCMbcBPDirX5fyUzdhVCKgPcrwWuucI8yrVRBw2+g==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			]
		},
		"node_modules/@rollup/rollup-freebsd-x64": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.45.1.tgz",
			"integrity": "sha512-L/6JsfiL74i3uK1Ti2ZFSNsp5NMiM4/kbbGEcOCps99aZx3g8SJMO1/9Y0n/qKlWZfn6sScf98lEOUe2mBvW9A==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			]
		},
		"node_modules/@rollup/rollup-linux-arm-gnueabihf": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.45.1.tgz",
			"integrity": "sha512-RkdOTu2jK7brlu+ZwjMIZfdV2sSYHK2qR08FUWcIoqJC2eywHbXr0L8T/pONFwkGukQqERDheaGTeedG+rra6Q==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm-musleabihf": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.45.1.tgz",
			"integrity": "sha512-3kJ8pgfBt6CIIr1o+HQA7OZ9mp/zDk3ctekGl9qn/pRBgrRgfwiffaUmqioUGN9hv0OHv2gxmvdKOkARCtRb8Q==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm64-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.45.1.tgz",
			"integrity": "sha512-k3dOKCfIVixWjG7OXTCOmDfJj3vbdhN0QYEqB+OuGArOChek22hn7Uy5A/gTDNAcCy5v2YcXRJ/Qcnm4/ma1xw==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-arm64-musl": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.45.1.tgz",
			"integrity": "sha512-PmI1vxQetnM58ZmDFl9/Uk2lpBBby6B6rF4muJc65uZbxCs0EA7hhKCk2PKlmZKuyVSHAyIw3+/SiuMLxKxWog==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-loongarch64-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loongarch64-gnu/-/rollup-linux-loongarch64-gnu-4.45.1.tgz",
			"integrity": "sha512-9UmI0VzGmNJ28ibHW2GpE2nF0PBQqsyiS4kcJ5vK+wuwGnV5RlqdczVocDSUfGX/Na7/XINRVoUgJyFIgipoRg==",
			"cpu": [
				"loong64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-powerpc64le-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-powerpc64le-gnu/-/rollup-linux-powerpc64le-gnu-4.45.1.tgz",
			"integrity": "sha512-7nR2KY8oEOUTD3pBAxIBBbZr0U7U+R9HDTPNy+5nVVHDXI4ikYniH1oxQz9VoB5PbBU1CZuDGHkLJkd3zLMWsg==",
			"cpu": [
				"ppc64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-riscv64-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.45.1.tgz",
			"integrity": "sha512-nlcl3jgUultKROfZijKjRQLUu9Ma0PeNv/VFHkZiKbXTBQXhpytS8CIj5/NfBeECZtY2FJQubm6ltIxm/ftxpw==",
			"cpu": [
				"riscv64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-riscv64-musl": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.45.1.tgz",
			"integrity": "sha512-HJV65KLS51rW0VY6rvZkiieiBnurSzpzore1bMKAhunQiECPuxsROvyeaot/tcK3A3aGnI+qTHqisrpSgQrpgA==",
			"cpu": [
				"riscv64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-s390x-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.45.1.tgz",
			"integrity": "sha512-NITBOCv3Qqc6hhwFt7jLV78VEO/il4YcBzoMGGNxznLgRQf43VQDae0aAzKiBeEPIxnDrACiMgbqjuihx08OOw==",
			"cpu": [
				"s390x"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-x64-gnu": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.45.1.tgz",
			"integrity": "sha512-+E/lYl6qu1zqgPEnTrs4WysQtvc/Sh4fC2nByfFExqgYrqkKWp1tWIbe+ELhixnenSpBbLXNi6vbEEJ8M7fiHw==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-linux-x64-musl": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.45.1.tgz",
			"integrity": "sha512-a6WIAp89p3kpNoYStITT9RbTbTnqarU7D8N8F2CV+4Cl9fwCOZraLVuVFvlpsW0SbIiYtEnhCZBPLoNdRkjQFw==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			]
		},
		"node_modules/@rollup/rollup-win32-arm64-msvc": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.45.1.tgz",
			"integrity": "sha512-T5Bi/NS3fQiJeYdGvRpTAP5P02kqSOpqiopwhj0uaXB6nzs5JVi2XMJb18JUSKhCOX8+UE1UKQufyD6Or48dJg==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rollup/rollup-win32-ia32-msvc": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.45.1.tgz",
			"integrity": "sha512-lxV2Pako3ujjuUe9jiU3/s7KSrDfH6IgTSQOnDWr9aJ92YsFd7EurmClK0ly/t8dzMkDtd04g60WX6yl0sGfdw==",
			"cpu": [
				"ia32"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@rollup/rollup-win32-x64-msvc": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.45.1.tgz",
			"integrity": "sha512-M/fKi4sasCdM8i0aWJjCSFm2qEnYRR8AMLG2kxp6wD13+tMGA4Z1tVAuHkNRjud5SW2EM3naLuK35w9twvf6aA==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			]
		},
		"node_modules/@swc/core": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core/-/core-1.13.2.tgz",
			"integrity": "sha512-YWqn+0IKXDhqVLKoac4v2tV6hJqB/wOh8/Br8zjqeqBkKa77Qb0Kw2i7LOFzjFNZbZaPH6AlMGlBwNrxaauaAg==",
			"dev": true,
			"hasInstallScript": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@swc/counter": "^0.1.3",
				"@swc/types": "^0.1.23"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/swc"
			},
			"optionalDependencies": {
				"@swc/core-darwin-arm64": "1.13.2",
				"@swc/core-darwin-x64": "1.13.2",
				"@swc/core-linux-arm-gnueabihf": "1.13.2",
				"@swc/core-linux-arm64-gnu": "1.13.2",
				"@swc/core-linux-arm64-musl": "1.13.2",
				"@swc/core-linux-x64-gnu": "1.13.2",
				"@swc/core-linux-x64-musl": "1.13.2",
				"@swc/core-win32-arm64-msvc": "1.13.2",
				"@swc/core-win32-ia32-msvc": "1.13.2",
				"@swc/core-win32-x64-msvc": "1.13.2"
			},
			"peerDependencies": {
				"@swc/helpers": ">=0.5.17"
			},
			"peerDependenciesMeta": {
				"@swc/helpers": {
					"optional": true
				}
			}
		},
		"node_modules/@swc/core-darwin-arm64": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-darwin-arm64/-/core-darwin-arm64-1.13.2.tgz",
			"integrity": "sha512-44p7ivuLSGFJ15Vly4ivLJjg3ARo4879LtEBAabcHhSZygpmkP8eyjyWxrH3OxkY1eRZSIJe8yRZPFw4kPXFPw==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-darwin-x64": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-darwin-x64/-/core-darwin-x64-1.13.2.tgz",
			"integrity": "sha512-Lb9EZi7X2XDAVmuUlBm2UvVAgSCbD3qKqDCxSI4jEOddzVOpNCnyZ/xEampdngUIyDDhhJLYU9duC+Mcsv5Y+A==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-linux-arm-gnueabihf": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-linux-arm-gnueabihf/-/core-linux-arm-gnueabihf-1.13.2.tgz",
			"integrity": "sha512-9TDe/92ee1x57x+0OqL1huG4BeljVx0nWW4QOOxp8CCK67Rpc/HHl2wciJ0Kl9Dxf2NvpNtkPvqj9+BUmM9WVA==",
			"cpu": [
				"arm"
			],
			"dev": true,
			"license": "Apache-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-linux-arm64-gnu": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-linux-arm64-gnu/-/core-linux-arm64-gnu-1.13.2.tgz",
			"integrity": "sha512-KJUSl56DBk7AWMAIEcU83zl5mg3vlQYhLELhjwRFkGFMvghQvdqQ3zFOYa4TexKA7noBZa3C8fb24rI5sw9Exg==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-linux-arm64-musl": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-linux-arm64-musl/-/core-linux-arm64-musl-1.13.2.tgz",
			"integrity": "sha512-teU27iG1oyWpNh9CzcGQ48ClDRt/RCem7mYO7ehd2FY102UeTws2+OzLESS1TS1tEZipq/5xwx3FzbVgiolCiQ==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-linux-x64-gnu": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-linux-x64-gnu/-/core-linux-x64-gnu-1.13.2.tgz",
			"integrity": "sha512-dRPsyPyqpLD0HMRCRpYALIh4kdOir8pPg4AhNQZLehKowigRd30RcLXGNVZcc31Ua8CiPI4QSgjOIxK+EQe4LQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-linux-x64-musl": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-linux-x64-musl/-/core-linux-x64-musl-1.13.2.tgz",
			"integrity": "sha512-CCxETW+KkYEQDqz1SYC15YIWYheqFC+PJVOW76Maa/8yu8Biw+HTAcblKf2isrlUtK8RvrQN94v3UXkC2NzCEw==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-win32-arm64-msvc": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-win32-arm64-msvc/-/core-win32-arm64-msvc-1.13.2.tgz",
			"integrity": "sha512-Wv/QTA6PjyRLlmKcN6AmSI4jwSMRl0VTLGs57PHTqYRwwfwd7y4s2fIPJVBNbAlXd795dOEP6d/bGSQSyhOX3A==",
			"cpu": [
				"arm64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-win32-ia32-msvc": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-win32-ia32-msvc/-/core-win32-ia32-msvc-1.13.2.tgz",
			"integrity": "sha512-PuCdtNynEkUNbUXX/wsyUC+t4mamIU5y00lT5vJcAvco3/r16Iaxl5UCzhXYaWZSNVZMzPp9qN8NlSL8M5pPxw==",
			"cpu": [
				"ia32"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/core-win32-x64-msvc": {
			"version": "1.13.2",
			"resolved": "https://registry.npmjs.org/@swc/core-win32-x64-msvc/-/core-win32-x64-msvc-1.13.2.tgz",
			"integrity": "sha512-qlmMkFZJus8cYuBURx1a3YAG2G7IW44i+FEYV5/32ylKkzGNAr9tDJSA53XNnNXkAB5EXSPsOz7bn5C3JlEtdQ==",
			"cpu": [
				"x64"
			],
			"dev": true,
			"license": "Apache-2.0 AND MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/@swc/counter": {
			"version": "0.1.3",
			"resolved": "https://registry.npmjs.org/@swc/counter/-/counter-0.1.3.tgz",
			"integrity": "sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==",
			"dev": true,
			"license": "Apache-2.0"
		},
		"node_modules/@swc/types": {
			"version": "0.1.23",
			"resolved": "https://registry.npmjs.org/@swc/types/-/types-0.1.23.tgz",
			"integrity": "sha512-u1iIVZV9Q0jxY+yM2vw/hZGDNudsN85bBpTqzAQ9rzkxW9D+e3aEM4Han+ow518gSewkXgjmEK0BD79ZcNVgPw==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"@swc/counter": "^0.1.3"
			}
		},
		"node_modules/@tailwindcss/node": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/node/-/node-4.1.11.tgz",
			"integrity": "sha512-yzhzuGRmv5QyU9qLNg4GTlYI6STedBWRE7NjxP45CsFYYq9taI0zJXZBMqIC/c8fViNLhmrbpSFS57EoxUmD6Q==",
			"license": "MIT",
			"dependencies": {
				"@ampproject/remapping": "^2.3.0",
				"enhanced-resolve": "^5.18.1",
				"jiti": "^2.4.2",
				"lightningcss": "1.30.1",
				"magic-string": "^0.30.17",
				"source-map-js": "^1.2.1",
				"tailwindcss": "4.1.11"
			}
		},
		"node_modules/@tailwindcss/oxide": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide/-/oxide-4.1.11.tgz",
			"integrity": "sha512-Q69XzrtAhuyfHo+5/HMgr1lAiPP/G40OMFAnws7xcFEYqcypZmdW8eGXaOUIeOl1dzPJBPENXgbjsOyhg2nkrg==",
			"hasInstallScript": true,
			"license": "MIT",
			"dependencies": {
				"detect-libc": "^2.0.4",
				"tar": "^7.4.3"
			},
			"engines": {
				"node": ">= 10"
			},
			"optionalDependencies": {
				"@tailwindcss/oxide-android-arm64": "4.1.11",
				"@tailwindcss/oxide-darwin-arm64": "4.1.11",
				"@tailwindcss/oxide-darwin-x64": "4.1.11",
				"@tailwindcss/oxide-freebsd-x64": "4.1.11",
				"@tailwindcss/oxide-linux-arm-gnueabihf": "4.1.11",
				"@tailwindcss/oxide-linux-arm64-gnu": "4.1.11",
				"@tailwindcss/oxide-linux-arm64-musl": "4.1.11",
				"@tailwindcss/oxide-linux-x64-gnu": "4.1.11",
				"@tailwindcss/oxide-linux-x64-musl": "4.1.11",
				"@tailwindcss/oxide-wasm32-wasi": "4.1.11",
				"@tailwindcss/oxide-win32-arm64-msvc": "4.1.11",
				"@tailwindcss/oxide-win32-x64-msvc": "4.1.11"
			}
		},
		"node_modules/@tailwindcss/oxide-android-arm64": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-android-arm64/-/oxide-android-arm64-4.1.11.tgz",
			"integrity": "sha512-3IfFuATVRUMZZprEIx9OGDjG3Ou3jG4xQzNTvjDoKmU9JdmoCohQJ83MYd0GPnQIu89YoJqvMM0G3uqLRFtetg==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"android"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-darwin-arm64": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-arm64/-/oxide-darwin-arm64-4.1.11.tgz",
			"integrity": "sha512-ESgStEOEsyg8J5YcMb1xl8WFOXfeBmrhAwGsFxxB2CxY9evy63+AtpbDLAyRkJnxLy2WsD1qF13E97uQyP1lfQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-darwin-x64": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-darwin-x64/-/oxide-darwin-x64-4.1.11.tgz",
			"integrity": "sha512-EgnK8kRchgmgzG6jE10UQNaH9Mwi2n+yw1jWmof9Vyg2lpKNX2ioe7CJdf9M5f8V9uaQxInenZkOxnTVL3fhAw==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-freebsd-x64": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-freebsd-x64/-/oxide-freebsd-x64-4.1.11.tgz",
			"integrity": "sha512-xdqKtbpHs7pQhIKmqVpxStnY1skuNh4CtbcyOHeX1YBE0hArj2romsFGb6yUmzkq/6M24nkxDqU8GYrKrz+UcA==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm-gnueabihf": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm-gnueabihf/-/oxide-linux-arm-gnueabihf-4.1.11.tgz",
			"integrity": "sha512-ryHQK2eyDYYMwB5wZL46uoxz2zzDZsFBwfjssgB7pzytAeCCa6glsiJGjhTEddq/4OsIjsLNMAiMlHNYnkEEeg==",
			"cpu": [
				"arm"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm64-gnu": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-gnu/-/oxide-linux-arm64-gnu-4.1.11.tgz",
			"integrity": "sha512-mYwqheq4BXF83j/w75ewkPJmPZIqqP1nhoghS9D57CLjsh3Nfq0m4ftTotRYtGnZd3eCztgbSPJ9QhfC91gDZQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-arm64-musl": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-arm64-musl/-/oxide-linux-arm64-musl-4.1.11.tgz",
			"integrity": "sha512-m/NVRFNGlEHJrNVk3O6I9ggVuNjXHIPoD6bqay/pubtYC9QIdAMpS+cswZQPBLvVvEF6GtSNONbDkZrjWZXYNQ==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-x64-gnu": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-gnu/-/oxide-linux-x64-gnu-4.1.11.tgz",
			"integrity": "sha512-YW6sblI7xukSD2TdbbaeQVDysIm/UPJtObHJHKxDEcW2exAtY47j52f8jZXkqE1krdnkhCMGqP3dbniu1Te2Fg==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-linux-x64-musl": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-linux-x64-musl/-/oxide-linux-x64-musl-4.1.11.tgz",
			"integrity": "sha512-e3C/RRhGunWYNC3aSF7exsQkdXzQ/M+aYuZHKnw4U7KQwTJotnWsGOIVih0s2qQzmEzOFIJ3+xt7iq67K/p56Q==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-wasm32-wasi": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-wasm32-wasi/-/oxide-wasm32-wasi-4.1.11.tgz",
			"integrity": "sha512-Xo1+/GU0JEN/C/dvcammKHzeM6NqKovG+6921MR6oadee5XPBaKOumrJCXvopJ/Qb5TH7LX/UAywbqrP4lax0g==",
			"bundleDependencies": [
				"@napi-rs/wasm-runtime",
				"@emnapi/core",
				"@emnapi/runtime",
				"@tybys/wasm-util",
				"@emnapi/wasi-threads",
				"tslib"
			],
			"cpu": [
				"wasm32"
			],
			"license": "MIT",
			"optional": true,
			"dependencies": {
				"@emnapi/core": "^1.4.3",
				"@emnapi/runtime": "^1.4.3",
				"@emnapi/wasi-threads": "^1.0.2",
				"@napi-rs/wasm-runtime": "^0.2.11",
				"@tybys/wasm-util": "^0.9.0",
				"tslib": "^2.8.0"
			},
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/@tailwindcss/oxide-win32-arm64-msvc": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-arm64-msvc/-/oxide-win32-arm64-msvc-4.1.11.tgz",
			"integrity": "sha512-UgKYx5PwEKrac3GPNPf6HVMNhUIGuUh4wlDFR2jYYdkX6pL/rn73zTq/4pzUm8fOjAn5L8zDeHp9iXmUGOXZ+w==",
			"cpu": [
				"arm64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/oxide-win32-x64-msvc": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/oxide-win32-x64-msvc/-/oxide-win32-x64-msvc-4.1.11.tgz",
			"integrity": "sha512-YfHoggn1j0LK7wR82TOucWc5LDCguHnoS879idHekmmiR7g9HUtMw9MI0NHatS28u/Xlkfi9w5RJWgz2Dl+5Qg==",
			"cpu": [
				"x64"
			],
			"license": "MIT",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 10"
			}
		},
		"node_modules/@tailwindcss/vite": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/@tailwindcss/vite/-/vite-4.1.11.tgz",
			"integrity": "sha512-RHYhrR3hku0MJFRV+fN2gNbDNEh3dwKvY8XJvTxCSXeMOsCRSr+uKvDWQcbizrHgjML6ZmTE5OwMrl5wKcujCw==",
			"license": "MIT",
			"dependencies": {
				"@tailwindcss/node": "4.1.11",
				"@tailwindcss/oxide": "4.1.11",
				"tailwindcss": "4.1.11"
			},
			"peerDependencies": {
				"vite": "^5.2.0 || ^6 || ^7"
			}
		},
		"node_modules/@tanstack/history": {
			"version": "1.129.7",
			"resolved": "https://registry.npmjs.org/@tanstack/history/-/history-1.129.7.tgz",
			"integrity": "sha512-I3YTkbe4RZQN54Qw4+IUhOjqG2DdbG2+EBWuQfew4MEk0eddLYAQVa50BZVww4/D2eh5I9vEk2Fd1Y0Wty7pug==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/query-core": {
			"version": "5.83.0",
			"resolved": "https://registry.npmjs.org/@tanstack/query-core/-/query-core-5.83.0.tgz",
			"integrity": "sha512-0M8dA+amXUkyz5cVUm/B+zSk3xkQAcuXuz5/Q/LveT4ots2rBpPTZOzd7yJa2Utsf8D2Upl5KyjhHRY+9lB/XA==",
			"license": "MIT",
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/react-query": {
			"version": "5.83.0",
			"resolved": "https://registry.npmjs.org/@tanstack/react-query/-/react-query-5.83.0.tgz",
			"integrity": "sha512-/XGYhZ3foc5H0VM2jLSD/NyBRIOK4q9kfeml4+0x2DlL6xVuAcVEW+hTlTapAmejObg0i3eNqhkr2dT+eciwoQ==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/query-core": "5.83.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"react": "^18 || ^19"
			}
		},
		"node_modules/@tanstack/react-router": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/react-router/-/react-router-1.129.8.tgz",
			"integrity": "sha512-d5mfM+67h3wq7aHkLjRKXD1ddbzx1YuxaEbNvW45jjZXMgaikZSVfJrZBiUWXE/nhV1sTdbMQ48JcPagvGPmYQ==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/history": "1.129.7",
				"@tanstack/react-store": "^0.7.0",
				"@tanstack/router-core": "1.129.8",
				"isbot": "^5.1.22",
				"tiny-invariant": "^1.3.3",
				"tiny-warning": "^1.0.3"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"react": ">=18.0.0 || >=19.0.0",
				"react-dom": ">=18.0.0 || >=19.0.0"
			}
		},
		"node_modules/@tanstack/react-router-devtools": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/react-router-devtools/-/react-router-devtools-1.129.8.tgz",
			"integrity": "sha512-+gVwYRLFAoQ+U4+UGX5/VgxspoJN4dm6/z4vYaZyrOUBVo+UjjH+bpvdz9ZrooBQ9EdkrkORPH8EfZp5qgi5Bg==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/router-devtools-core": "^1.129.8"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"@tanstack/react-router": "^1.129.8",
				"react": ">=18.0.0 || >=19.0.0",
				"react-dom": ">=18.0.0 || >=19.0.0"
			}
		},
		"node_modules/@tanstack/react-store": {
			"version": "0.7.3",
			"resolved": "https://registry.npmjs.org/@tanstack/react-store/-/react-store-0.7.3.tgz",
			"integrity": "sha512-3Dnqtbw9P2P0gw8uUM8WP2fFfg8XMDSZCTsywRPZe/XqqYW8PGkXKZTvP0AHkE4mpqP9Y43GpOg9vwO44azu6Q==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/store": "0.7.2",
				"use-sync-external-store": "^1.5.0"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
				"react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
			}
		},
		"node_modules/@tanstack/react-table": {
			"version": "8.21.3",
			"resolved": "https://registry.npmjs.org/@tanstack/react-table/-/react-table-8.21.3.tgz",
			"integrity": "sha512-5nNMTSETP4ykGegmVkhjcS8tTLW6Vl4axfEGQN3v0zdHYbK4UfoqfPChclTrJ4EoK9QynqAu9oUf8VEmrpZ5Ww==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/table-core": "8.21.3"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"react": ">=16.8",
				"react-dom": ">=16.8"
			}
		},
		"node_modules/@tanstack/react-virtual": {
			"version": "3.13.12",
			"resolved": "https://registry.npmjs.org/@tanstack/react-virtual/-/react-virtual-3.13.12.tgz",
			"integrity": "sha512-Gd13QdxPSukP8ZrkbgS2RwoZseTTbQPLnQEn7HY/rqtM+8Zt95f7xKC7N0EsKs7aoz0WzZ+fditZux+F8EzYxA==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/virtual-core": "3.13.12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",
				"react-dom": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
			}
		},
		"node_modules/@tanstack/router-cli": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/router-cli/-/router-cli-1.129.8.tgz",
			"integrity": "sha512-xxPBUxZ9kPBd3Mc8EDwHs47X+S5CMo0/hUwmyWZucHXBFCc07aMpz+iPkM6/rPDKHYWr3qF/LuaMjhZiM9Utpw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@tanstack/router-generator": "1.129.8",
				"chokidar": "^3.6.0",
				"yargs": "^17.7.2"
			},
			"bin": {
				"tsr": "bin/tsr.cjs"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/router-core": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/router-core/-/router-core-1.129.8.tgz",
			"integrity": "sha512-Izqf5q8TzJv0DJURynitJioPJT3dPAefrzHi2wlY/Q5+7nEG41SkjYMotTX2Q9i/Pjl91lW8gERCHpksszRdRw==",
			"license": "MIT",
			"dependencies": {
				"@tanstack/history": "1.129.7",
				"@tanstack/store": "^0.7.0",
				"cookie-es": "^1.2.2",
				"seroval": "^1.3.2",
				"seroval-plugins": "^1.3.2",
				"tiny-invariant": "^1.3.3",
				"tiny-warning": "^1.0.3"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/router-devtools-core": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/router-devtools-core/-/router-devtools-core-1.129.8.tgz",
			"integrity": "sha512-1yiAoWWYV3hWLXoHv92LMU67EjJpavoavo00EYzf7RLCy0TA/a+KyokZBS6PD38sITamHgVeY/jJBGD6hr47rQ==",
			"license": "MIT",
			"dependencies": {
				"clsx": "^2.1.1",
				"goober": "^2.1.16",
				"solid-js": "^1.9.5"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"@tanstack/router-core": "^1.129.8",
				"csstype": "^3.0.10",
				"solid-js": ">=1.9.5",
				"tiny-invariant": "^1.3.3"
			},
			"peerDependenciesMeta": {
				"csstype": {
					"optional": true
				}
			}
		},
		"node_modules/@tanstack/router-generator": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/router-generator/-/router-generator-1.129.8.tgz",
			"integrity": "sha512-i4QTtJeRq3jdRTuUXHKcmPNm6STS0jLJNTKEdeUCIzuVBiiP53oujMOd84e5ARP83k2IB2XcMHekTSzDlWD2fg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@tanstack/router-core": "^1.129.8",
				"@tanstack/router-utils": "1.129.7",
				"@tanstack/virtual-file-routes": "^1.129.7",
				"prettier": "^3.5.0",
				"recast": "^0.23.11",
				"source-map": "^0.7.4",
				"tsx": "^4.19.2",
				"zod": "^3.24.2"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/router-plugin": {
			"version": "1.129.8",
			"resolved": "https://registry.npmjs.org/@tanstack/router-plugin/-/router-plugin-1.129.8.tgz",
			"integrity": "sha512-DdO6el2slgBO2mIqIGdGyHCzsbQLsTNxsgbNz9ZY9y324iP4G+p3iEYopHWgzLKM2DKinMs9F7AxjLow4V3klQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "^7.27.7",
				"@babel/plugin-syntax-jsx": "^7.27.1",
				"@babel/plugin-syntax-typescript": "^7.27.1",
				"@babel/template": "^7.27.2",
				"@babel/traverse": "^7.27.7",
				"@babel/types": "^7.27.7",
				"@tanstack/router-core": "^1.129.8",
				"@tanstack/router-generator": "1.129.8",
				"@tanstack/router-utils": "1.129.7",
				"@tanstack/virtual-file-routes": "^1.129.7",
				"babel-dead-code-elimination": "^1.0.10",
				"chokidar": "^3.6.0",
				"unplugin": "^2.1.2",
				"zod": "^3.24.2"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			},
			"peerDependencies": {
				"@rsbuild/core": ">=1.0.2",
				"@tanstack/react-router": "^1.129.8",
				"vite": ">=5.0.0 || >=6.0.0",
				"vite-plugin-solid": "^2.11.2",
				"webpack": ">=5.92.0"
			},
			"peerDependenciesMeta": {
				"@rsbuild/core": {
					"optional": true
				},
				"@tanstack/react-router": {
					"optional": true
				},
				"vite": {
					"optional": true
				},
				"vite-plugin-solid": {
					"optional": true
				},
				"webpack": {
					"optional": true
				}
			}
		},
		"node_modules/@tanstack/router-utils": {
			"version": "1.129.7",
			"resolved": "https://registry.npmjs.org/@tanstack/router-utils/-/router-utils-1.129.7.tgz",
			"integrity": "sha512-I2OyQF5U6sxHJApXKCUmCncTHKcpj4681FwyxpYg5QYOatHcn/zVMl7Rj4h36fu8/Lo2ZRLxUMd5kmXgp5Pb/A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "^7.27.4",
				"@babel/generator": "^7.27.5",
				"@babel/parser": "^7.27.5",
				"@babel/preset-typescript": "^7.27.1",
				"ansis": "^4.1.0",
				"diff": "^8.0.2"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/store": {
			"version": "0.7.2",
			"resolved": "https://registry.npmjs.org/@tanstack/store/-/store-0.7.2.tgz",
			"integrity": "sha512-RP80Z30BYiPX2Pyo0Nyw4s1SJFH2jyM6f9i3HfX4pA+gm5jsnYryscdq2aIQLnL4TaGuQMO+zXmN9nh1Qck+Pg==",
			"license": "MIT",
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/table-core": {
			"version": "8.21.3",
			"resolved": "https://registry.npmjs.org/@tanstack/table-core/-/table-core-8.21.3.tgz",
			"integrity": "sha512-ldZXEhOBb8Is7xLs01fR3YEc3DERiz5silj8tnGkFZytt1abEvl/GhUmCE0PMLaMPTa3Jk4HbKmRlHmu+gCftg==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/virtual-core": {
			"version": "3.13.12",
			"resolved": "https://registry.npmjs.org/@tanstack/virtual-core/-/virtual-core-3.13.12.tgz",
			"integrity": "sha512-1YBOJfRHV4sXUmWsFSf5rQor4Ss82G8dQWLRbnk3GA4jeP8hQt1hxXh0tmflpC0dz3VgEv/1+qwPyLeWkQuPFA==",
			"license": "MIT",
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@tanstack/virtual-file-routes": {
			"version": "1.129.7",
			"resolved": "https://registry.npmjs.org/@tanstack/virtual-file-routes/-/virtual-file-routes-1.129.7.tgz",
			"integrity": "sha512-a+MxoAXG+Sq94Jp67OtveKOp2vQq75AWdVI8DRt6w19B0NEqpfm784FTLbVp/qdR1wmxCOmKAvElGSIiBOx5OQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/tannerlinsley"
			}
		},
		"node_modules/@testing-library/dom": {
			"version": "10.4.0",
			"resolved": "https://registry.npmjs.org/@testing-library/dom/-/dom-10.4.0.tgz",
			"integrity": "sha512-pemlzrSESWbdAloYml3bAJMEfNh1Z7EduzqPKprCH5S341frlpYnUEW0H72dLxa6IsYr+mPno20GiSm+h9dEdQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/code-frame": "^7.10.4",
				"@babel/runtime": "^7.12.5",
				"@types/aria-query": "^5.0.1",
				"aria-query": "5.3.0",
				"chalk": "^4.1.0",
				"dom-accessibility-api": "^0.5.9",
				"lz-string": "^1.5.0",
				"pretty-format": "^27.0.2"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/@testing-library/user-event": {
			"version": "14.6.1",
			"resolved": "https://registry.npmjs.org/@testing-library/user-event/-/user-event-14.6.1.tgz",
			"integrity": "sha512-vq7fv0rnt+QTXgPxr5Hjc210p6YKq2kmdziLgnsZGgLJ9e6VAShx1pACLuRjd/AS/sr7phAR58OIIpf0LlmQNw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12",
				"npm": ">=6"
			},
			"peerDependencies": {
				"@testing-library/dom": ">=7.21.4"
			}
		},
		"node_modules/@types/aria-query": {
			"version": "5.0.4",
			"resolved": "https://registry.npmjs.org/@types/aria-query/-/aria-query-5.0.4.tgz",
			"integrity": "sha512-rfT93uj5s0PRL7EzccGMs3brplhcrghnDoV26NqKhCAS1hVo+WdNsPvE/yb6ilfr5hi2MEk6d5EWJTKdxg8jVw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/bun": {
			"version": "1.2.19",
			"resolved": "https://registry.npmjs.org/@types/bun/-/bun-1.2.19.tgz",
			"integrity": "sha512-d9ZCmrH3CJ2uYKXQIUuZ/pUnTqIvLDS0SK7pFmbx8ma+ziH/FRMoAq5bYpRG7y+w1gl+HgyNZbtqgMq4W4e2Lg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"bun-types": "1.2.19"
			}
		},
		"node_modules/@types/chai": {
			"version": "5.2.2",
			"resolved": "https://registry.npmjs.org/@types/chai/-/chai-5.2.2.tgz",
			"integrity": "sha512-8kB30R7Hwqf40JPiKhVzodJs2Qc1ZJ5zuT3uzw5Hq/dhNCl3G3l83jfpdI1e20BP348+fV7VIL/+FxaXkqBmWg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/deep-eql": "*"
			}
		},
		"node_modules/@types/deep-eql": {
			"version": "4.0.2",
			"resolved": "https://registry.npmjs.org/@types/deep-eql/-/deep-eql-4.0.2.tgz",
			"integrity": "sha512-c9h9dVVMigMPc4bwTvC5dxqtqJZwQPePsWjPlpSOnojbor6pGqdk541lfA7AqFQr5pB1BRdq0juY9db81BwyFw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/@types/estree": {
			"version": "1.0.8",
			"resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.8.tgz",
			"integrity": "sha512-dWHzHa2WqEXI/O1E9OjrocMTKJl2mSrEolh1Iomrv6U+JuNwaHXsXx9bLu5gG7BUWFIN0skIQJQ/L1rIex4X6w==",
			"license": "MIT"
		},
		"node_modules/@types/node": {
			"version": "24.1.0",
			"resolved": "https://registry.npmjs.org/@types/node/-/node-24.1.0.tgz",
			"integrity": "sha512-ut5FthK5moxFKH2T1CUOC6ctR67rQRvvHdFLCD2Ql6KXmMuCrjsSsRI9UsLCm9M18BMwClv4pn327UvB7eeO1w==",
			"devOptional": true,
			"license": "MIT",
			"dependencies": {
				"undici-types": "~7.8.0"
			}
		},
		"node_modules/@types/react": {
			"version": "19.1.8",
			"resolved": "https://registry.npmjs.org/@types/react/-/react-19.1.8.tgz",
			"integrity": "sha512-AwAfQ2Wa5bCx9WP8nZL2uMZWod7J7/JSplxbTmBQ5ms6QpqNYm672H0Vu9ZVKVngQ+ii4R/byguVEUZQyeg44g==",
			"devOptional": true,
			"license": "MIT",
			"dependencies": {
				"csstype": "^3.0.2"
			}
		},
		"node_modules/@types/react-dom": {
			"version": "19.1.6",
			"resolved": "https://registry.npmjs.org/@types/react-dom/-/react-dom-19.1.6.tgz",
			"integrity": "sha512-4hOiT/dwO8Ko0gV1m/TJZYk3y0KBnY9vzDh7W+DH17b2HFSOGgdj33dhihPeuy3l0q23+4e+hoXHV6hCC4dCXw==",
			"devOptional": true,
			"license": "MIT",
			"peerDependencies": {
				"@types/react": "^19.0.0"
			}
		},
		"node_modules/@vitejs/plugin-react-swc": {
			"version": "3.11.0",
			"resolved": "https://registry.npmjs.org/@vitejs/plugin-react-swc/-/plugin-react-swc-3.11.0.tgz",
			"integrity": "sha512-YTJCGFdNMHCMfjODYtxRNVAYmTWQ1Lb8PulP/2/f/oEEtglw8oKxKIZmmRkyXrVrHfsKOaVkAc3NT9/dMutO5w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@rolldown/pluginutils": "1.0.0-beta.27",
				"@swc/core": "^1.12.11"
			},
			"peerDependencies": {
				"vite": "^4 || ^5 || ^6 || ^7"
			}
		},
		"node_modules/@vitest/browser": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/browser/-/browser-3.2.4.tgz",
			"integrity": "sha512-tJxiPrWmzH8a+w9nLKlQMzAKX/7VjFs50MWgcAj7p9XQ7AQ9/35fByFYptgPELyLw+0aixTnC4pUWV+APcZ/kw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@testing-library/dom": "^10.4.0",
				"@testing-library/user-event": "^14.6.1",
				"@vitest/mocker": "3.2.4",
				"@vitest/utils": "3.2.4",
				"magic-string": "^0.30.17",
				"sirv": "^3.0.1",
				"tinyrainbow": "^2.0.0",
				"ws": "^8.18.2"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"playwright": "*",
				"vitest": "3.2.4",
				"webdriverio": "^7.0.0 || ^8.0.0 || ^9.0.0"
			},
			"peerDependenciesMeta": {
				"playwright": {
					"optional": true
				},
				"safaridriver": {
					"optional": true
				},
				"webdriverio": {
					"optional": true
				}
			}
		},
		"node_modules/@vitest/coverage-v8": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/coverage-v8/-/coverage-v8-3.2.4.tgz",
			"integrity": "sha512-EyF9SXU6kS5Ku/U82E259WSnvg6c8KTjppUncuNdm5QHpe17mwREHnjDzozC8x9MZ0xfBUFSaLkRv4TMA75ALQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@ampproject/remapping": "^2.3.0",
				"@bcoe/v8-coverage": "^1.0.2",
				"ast-v8-to-istanbul": "^0.3.3",
				"debug": "^4.4.1",
				"istanbul-lib-coverage": "^3.2.2",
				"istanbul-lib-report": "^3.0.1",
				"istanbul-lib-source-maps": "^5.0.6",
				"istanbul-reports": "^3.1.7",
				"magic-string": "^0.30.17",
				"magicast": "^0.3.5",
				"std-env": "^3.9.0",
				"test-exclude": "^7.0.1",
				"tinyrainbow": "^2.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"@vitest/browser": "3.2.4",
				"vitest": "3.2.4"
			},
			"peerDependenciesMeta": {
				"@vitest/browser": {
					"optional": true
				}
			}
		},
		"node_modules/@vitest/expect": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/expect/-/expect-3.2.4.tgz",
			"integrity": "sha512-Io0yyORnB6sikFlt8QW5K7slY4OjqNX9jmJQ02QDda8lyM6B5oNgVWoSoKPac8/kgnCUzuHQKrSLtu/uOqqrig==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/chai": "^5.2.2",
				"@vitest/spy": "3.2.4",
				"@vitest/utils": "3.2.4",
				"chai": "^5.2.0",
				"tinyrainbow": "^2.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/mocker": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/mocker/-/mocker-3.2.4.tgz",
			"integrity": "sha512-46ryTE9RZO/rfDd7pEqFl7etuyzekzEhUbTW3BvmeO/BcCMEgq59BKhek3dXDWgAj4oMK6OZi+vRr1wPW6qjEQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/spy": "3.2.4",
				"estree-walker": "^3.0.3",
				"magic-string": "^0.30.17"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"msw": "^2.4.9",
				"vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
			},
			"peerDependenciesMeta": {
				"msw": {
					"optional": true
				},
				"vite": {
					"optional": true
				}
			}
		},
		"node_modules/@vitest/pretty-format": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/pretty-format/-/pretty-format-3.2.4.tgz",
			"integrity": "sha512-IVNZik8IVRJRTr9fxlitMKeJeXFFFN0JaB9PHPGQ8NKQbGpfjlTx9zO4RefN8gp7eqjNy8nyK3NZmBzOPeIxtA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tinyrainbow": "^2.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/runner": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/runner/-/runner-3.2.4.tgz",
			"integrity": "sha512-oukfKT9Mk41LreEW09vt45f8wx7DordoWUZMYdY/cyAk7w5TWkTRCNZYF7sX7n2wB7jyGAl74OxgwhPgKaqDMQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/utils": "3.2.4",
				"pathe": "^2.0.3",
				"strip-literal": "^3.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/snapshot": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/snapshot/-/snapshot-3.2.4.tgz",
			"integrity": "sha512-dEYtS7qQP2CjU27QBC5oUOxLE/v5eLkGqPE0ZKEIDGMs4vKWe7IjgLOeauHsR0D5YuuycGRO5oSRXnwnmA78fQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/pretty-format": "3.2.4",
				"magic-string": "^0.30.17",
				"pathe": "^2.0.3"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/spy": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/spy/-/spy-3.2.4.tgz",
			"integrity": "sha512-vAfasCOe6AIK70iP5UD11Ac4siNUNJ9i/9PZ3NKx07sG6sUxeag1LWdNrMWeKKYBLlzuK+Gn65Yd5nyL6ds+nw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tinyspy": "^4.0.3"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/@vitest/utils": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/@vitest/utils/-/utils-3.2.4.tgz",
			"integrity": "sha512-fB2V0JFrQSMsCo9HiSq3Ezpdv4iYaXRG1Sx8edX3MwxfyNn83mKiGzOcH+Fkxt4MHxr3y42fQi1oeAInqgX2QA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@vitest/pretty-format": "3.2.4",
				"loupe": "^3.1.4",
				"tinyrainbow": "^2.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/acorn": {
			"version": "8.15.0",
			"resolved": "https://registry.npmjs.org/acorn/-/acorn-8.15.0.tgz",
			"integrity": "sha512-NZyJarBfL7nWwIq+FDL6Zp/yHEhePMNnnJ0y3qfieCrmNvYct8uvtiV41UvlSe6apAfk0fY1FbWx+NwfmpvtTg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"acorn": "bin/acorn"
			},
			"engines": {
				"node": ">=0.4.0"
			}
		},
		"node_modules/ansi-regex": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
			"integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/ansi-styles": {
			"version": "4.3.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-4.3.0.tgz",
			"integrity": "sha512-zbB9rCJAT1rbjiVDb2hqKFHNYLxgtk8NURxZ3IZwD3F6NtxbXZQCnnSi1Lkx+IDohdPlFp222wVALIheZJQSEg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-convert": "^2.0.1"
			},
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/ansis": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/ansis/-/ansis-4.1.0.tgz",
			"integrity": "sha512-BGcItUBWSMRgOCe+SVZJ+S7yTRG0eGt9cXAHev72yuGcY23hnLA7Bky5L/xLyPINoSN95geovfBkqoTlNZYa7w==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=14"
			}
		},
		"node_modules/anymatch": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
			"integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"normalize-path": "^3.0.0",
				"picomatch": "^2.0.4"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/aria-hidden": {
			"version": "1.2.6",
			"resolved": "https://registry.npmjs.org/aria-hidden/-/aria-hidden-1.2.6.tgz",
			"integrity": "sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.0.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/aria-query": {
			"version": "5.3.0",
			"resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.0.tgz",
			"integrity": "sha512-b0P0sZPKtyu8HkeRAfCq0IfURZK+SuwMjY1UXGBU27wpAiTwQAIlq56IbIO+ytk/JjS1fMR14ee5WBBfKi5J6A==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"dequal": "^2.0.3"
			}
		},
		"node_modules/assertion-error": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz",
			"integrity": "sha512-Izi8RQcffqCeNVgFigKli1ssklIbpHnCYc6AknXGYoB6grJqyeby7jv12JUQgmTAnIDnbck1uxksT4dzN3PWBA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/ast-types": {
			"version": "0.16.1",
			"resolved": "https://registry.npmjs.org/ast-types/-/ast-types-0.16.1.tgz",
			"integrity": "sha512-6t10qk83GOG8p0vKmaCr8eiilZwO171AvbROMtvvNiwrTly62t+7XkA8RdIIVbpMhCASAsxgAzdRSwh6nw/5Dg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.0.1"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/ast-v8-to-istanbul": {
			"version": "0.3.3",
			"resolved": "https://registry.npmjs.org/ast-v8-to-istanbul/-/ast-v8-to-istanbul-0.3.3.tgz",
			"integrity": "sha512-MuXMrSLVVoA6sYN/6Hke18vMzrT4TZNbZIj/hvh0fnYFpO+/kFXcLIaiPwXXWaQUPg4yJD8fj+lfJ7/1EBconw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@jridgewell/trace-mapping": "^0.3.25",
				"estree-walker": "^3.0.3",
				"js-tokens": "^9.0.1"
			}
		},
		"node_modules/ast-v8-to-istanbul/node_modules/js-tokens": {
			"version": "9.0.1",
			"resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-9.0.1.tgz",
			"integrity": "sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/babel-dead-code-elimination": {
			"version": "1.0.10",
			"resolved": "https://registry.npmjs.org/babel-dead-code-elimination/-/babel-dead-code-elimination-1.0.10.tgz",
			"integrity": "sha512-DV5bdJZTzZ0zn0DC24v3jD7Mnidh6xhKa4GfKCbq3sfW8kaWhDdZjP3i81geA8T33tdYqWKw4D3fVv0CwEgKVA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/core": "^7.23.7",
				"@babel/parser": "^7.23.6",
				"@babel/traverse": "^7.23.7",
				"@babel/types": "^7.23.6"
			}
		},
		"node_modules/balanced-match": {
			"version": "1.0.2",
			"resolved": "https://registry.npmjs.org/balanced-match/-/balanced-match-1.0.2.tgz",
			"integrity": "sha512-3oSeUO0TMV67hN1AmbXsK4yaqU7tjiHlbxRDZOpH0KW9+CeX4bRAaX0Anxt0tx2MrpRpWwQaPwIlISEJhYU5Pw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/binary-extensions": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
			"integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/brace-expansion": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/brace-expansion/-/brace-expansion-2.0.2.tgz",
			"integrity": "sha512-Jt0vHyM+jmUBqojB7E1NIYadt0vI0Qxjxd2TErW94wDz+E2LAm5vKMXXwg6ZZBTHPuUlDgQHKXvjGBdfcF1ZDQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"balanced-match": "^1.0.0"
			}
		},
		"node_modules/braces": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
			"integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"fill-range": "^7.1.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/browserslist": {
			"version": "4.25.1",
			"resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.25.1.tgz",
			"integrity": "sha512-KGj0KoOMXLpSNkkEI6Z6mShmQy0bc1I+T7K9N81k4WWMrfz+6fQ6es80B/YLAeRoKvjYE1YSHHOW1qe9xIVzHw==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/browserslist"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"caniuse-lite": "^1.0.30001726",
				"electron-to-chromium": "^1.5.173",
				"node-releases": "^2.0.19",
				"update-browserslist-db": "^1.1.3"
			},
			"bin": {
				"browserslist": "cli.js"
			},
			"engines": {
				"node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
			}
		},
		"node_modules/bun-types": {
			"version": "1.2.19",
			"resolved": "https://registry.npmjs.org/bun-types/-/bun-types-1.2.19.tgz",
			"integrity": "sha512-uAOTaZSPuYsWIXRpj7o56Let0g/wjihKCkeRqUBhlLVM/Bt+Fj9xTo+LhC1OV1XDaGkz4hNC80et5xgy+9KTHQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/node": "*"
			},
			"peerDependencies": {
				"@types/react": "^19"
			}
		},
		"node_modules/cac": {
			"version": "6.7.14",
			"resolved": "https://registry.npmjs.org/cac/-/cac-6.7.14.tgz",
			"integrity": "sha512-b6Ilus+c3RrdDk+JhLKUAQfzzgLEPy6wcXqS7f/xe1EETvsDP6GORG7SFuOs6cID5YkqchW/LXZbX5bc8j7ZcQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/caniuse-lite": {
			"version": "1.0.30001727",
			"resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001727.tgz",
			"integrity": "sha512-pB68nIHmbN6L/4C6MH1DokyR3bYqFwjaSs/sWDHGj4CTcFtQUQMuJftVwWkXq7mNWOybD3KhUv3oWHoGxgP14Q==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/caniuse-lite"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "CC-BY-4.0"
		},
		"node_modules/chai": {
			"version": "5.2.1",
			"resolved": "https://registry.npmjs.org/chai/-/chai-5.2.1.tgz",
			"integrity": "sha512-5nFxhUrX0PqtyogoYOA8IPswy5sZFTOsBFl/9bNsmDLgsxYTzSZQJDPppDnZPTQbzSEm0hqGjWPzRemQCYbD6A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"assertion-error": "^2.0.1",
				"check-error": "^2.1.1",
				"deep-eql": "^5.0.1",
				"loupe": "^3.1.0",
				"pathval": "^2.0.0"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/chalk": {
			"version": "4.1.2",
			"resolved": "https://registry.npmjs.org/chalk/-/chalk-4.1.2.tgz",
			"integrity": "sha512-oKnbhFyRIXpUuez8iBMmyEa4nbj4IOQyuhc/wy9kY7/WVPcwIO9VA668Pu8RkO7+0G76SLROeyw9CpQ061i4mA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.1.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/chalk?sponsor=1"
			}
		},
		"node_modules/check-error": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/check-error/-/check-error-2.1.1.tgz",
			"integrity": "sha512-OAlb+T7V4Op9OwdkjmguYRqncdlx5JiofwOAUkmTF+jNdHwzTaTs4sRAGpzLF3oOz5xAyDGrPgeIDFQmDOTiJw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 16"
			}
		},
		"node_modules/chokidar": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
			"integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"anymatch": "~3.1.2",
				"braces": "~3.0.2",
				"glob-parent": "~5.1.2",
				"is-binary-path": "~2.1.0",
				"is-glob": "~4.0.1",
				"normalize-path": "~3.0.0",
				"readdirp": "~3.6.0"
			},
			"engines": {
				"node": ">= 8.10.0"
			},
			"funding": {
				"url": "https://paulmillr.com/funding/"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/chownr": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/chownr/-/chownr-3.0.0.tgz",
			"integrity": "sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==",
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/class-variance-authority": {
			"version": "0.7.1",
			"resolved": "https://registry.npmjs.org/class-variance-authority/-/class-variance-authority-0.7.1.tgz",
			"integrity": "sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==",
			"license": "Apache-2.0",
			"dependencies": {
				"clsx": "^2.1.1"
			},
			"funding": {
				"url": "https://polar.sh/cva"
			}
		},
		"node_modules/cliui": {
			"version": "8.0.1",
			"resolved": "https://registry.npmjs.org/cliui/-/cliui-8.0.1.tgz",
			"integrity": "sha512-BSeNnyus75C4//NQ9gQt1/csTXyo/8Sb+afLAkzAptFuMsod9HFokGNudZpi/oQV73hnVK+sR+5PVRMd+Dr7YQ==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"string-width": "^4.2.0",
				"strip-ansi": "^6.0.1",
				"wrap-ansi": "^7.0.0"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/cliui/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/cliui/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/cliui/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/cliui/node_modules/wrap-ansi": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
			"integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.0.0",
				"string-width": "^4.1.0",
				"strip-ansi": "^6.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/clsx": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/clsx/-/clsx-2.1.1.tgz",
			"integrity": "sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==",
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/color-convert": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/color-convert/-/color-convert-2.0.1.tgz",
			"integrity": "sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"color-name": "~1.1.4"
			},
			"engines": {
				"node": ">=7.0.0"
			}
		},
		"node_modules/color-name": {
			"version": "1.1.4",
			"resolved": "https://registry.npmjs.org/color-name/-/color-name-1.1.4.tgz",
			"integrity": "sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/convert-source-map": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
			"integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/cookie-es": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/cookie-es/-/cookie-es-1.2.2.tgz",
			"integrity": "sha512-+W7VmiVINB+ywl1HGXJXmrqkOhpKrIiVZV6tQuV54ZyQC7MMuBt81Vc336GMLoHBq5hV/F9eXgt5Mnx0Rha5Fg==",
			"license": "MIT"
		},
		"node_modules/cross-spawn": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/cross-spawn/-/cross-spawn-7.0.6.tgz",
			"integrity": "sha512-uV2QOWP2nWzsy2aMp8aRibhi9dlzF5Hgh5SHaB9OiTGEyDTiJJyx0uy51QXdyWbtAHNua4XJzUKca3OzKUd3vA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"path-key": "^3.1.0",
				"shebang-command": "^2.0.0",
				"which": "^2.0.1"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/csstype": {
			"version": "3.1.3",
			"resolved": "https://registry.npmjs.org/csstype/-/csstype-3.1.3.tgz",
			"integrity": "sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==",
			"license": "MIT"
		},
		"node_modules/debug": {
			"version": "4.4.1",
			"resolved": "https://registry.npmjs.org/debug/-/debug-4.4.1.tgz",
			"integrity": "sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ms": "^2.1.3"
			},
			"engines": {
				"node": ">=6.0"
			},
			"peerDependenciesMeta": {
				"supports-color": {
					"optional": true
				}
			}
		},
		"node_modules/deep-eql": {
			"version": "5.0.2",
			"resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
			"integrity": "sha512-h5k/5U50IJJFpzfL6nO9jaaumfjO/f2NjK/oYB2Djzm4p9L+3T9qWpZqZ2hAbLPuuYq9wrU08WQyBTL5GbPk5Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/dequal": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/dequal/-/dequal-2.0.3.tgz",
			"integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/detect-libc": {
			"version": "2.0.4",
			"resolved": "https://registry.npmjs.org/detect-libc/-/detect-libc-2.0.4.tgz",
			"integrity": "sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==",
			"license": "Apache-2.0",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/detect-node-es": {
			"version": "1.1.0",
			"resolved": "https://registry.npmjs.org/detect-node-es/-/detect-node-es-1.1.0.tgz",
			"integrity": "sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==",
			"license": "MIT"
		},
		"node_modules/diff": {
			"version": "8.0.2",
			"resolved": "https://registry.npmjs.org/diff/-/diff-8.0.2.tgz",
			"integrity": "sha512-sSuxWU5j5SR9QQji/o2qMvqRNYRDOcBTgsJ/DeCf4iSN4gW+gNMXM7wFIP+fdXZxoNiAnHUTGjCr+TSWXdRDKg==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.3.1"
			}
		},
		"node_modules/dom-accessibility-api": {
			"version": "0.5.16",
			"resolved": "https://registry.npmjs.org/dom-accessibility-api/-/dom-accessibility-api-0.5.16.tgz",
			"integrity": "sha512-X7BJ2yElsnOJ30pZF4uIIDfBEVgF4XEBxL9Bxhy6dnrm5hkzqmsWHGTiHqRiITNhMyFLyAiWndIJP7Z1NTteDg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/eastasianwidth": {
			"version": "0.2.0",
			"resolved": "https://registry.npmjs.org/eastasianwidth/-/eastasianwidth-0.2.0.tgz",
			"integrity": "sha512-I88TYZWc9XiYHRQ4/3c5rjjfgkjhLyW2luGIheGERbNQ6OY7yTybanSpDXZa8y7VUP9YmDcYa+eyq4ca7iLqWA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/electron-to-chromium": {
			"version": "1.5.190",
			"resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.190.tgz",
			"integrity": "sha512-k4McmnB2091YIsdCgkS0fMVMPOJgxl93ltFzaryXqwip1AaxeDqKCGLxkXODDA5Ab/D+tV5EL5+aTx76RvLRxw==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/emoji-regex": {
			"version": "9.2.2",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-9.2.2.tgz",
			"integrity": "sha512-L18DaJsXSUk2+42pv8mLs5jJT2hqFkFE4j21wOmgbUqsZ2hL72NsUU785g9RXgo3s0ZNgVl42TiHp3ZtOv/Vyg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/enhanced-resolve": {
			"version": "5.18.2",
			"resolved": "https://registry.npmjs.org/enhanced-resolve/-/enhanced-resolve-5.18.2.tgz",
			"integrity": "sha512-6Jw4sE1maoRJo3q8MsSIn2onJFbLTOjY9hlx4DZXmOKvLRd1Ok2kXmAGXaafL2+ijsJZ1ClYbl/pmqr9+k4iUQ==",
			"license": "MIT",
			"dependencies": {
				"graceful-fs": "^4.2.4",
				"tapable": "^2.2.0"
			},
			"engines": {
				"node": ">=10.13.0"
			}
		},
		"node_modules/es-module-lexer": {
			"version": "1.7.0",
			"resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.7.0.tgz",
			"integrity": "sha512-jEQoCwk8hyb2AZziIOLhDqpm5+2ww5uIE6lkO/6jcOCusfk6LhMHpXXfBLXTZ7Ydyt0j4VoUQv6uGNYbdW+kBA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/esbuild": {
			"version": "0.25.8",
			"resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.25.8.tgz",
			"integrity": "sha512-vVC0USHGtMi8+R4Kz8rt6JhEWLxsv9Rnu/lGYbPR8u47B+DCBksq9JarW0zOO7bs37hyOK1l2/oqtbciutL5+Q==",
			"hasInstallScript": true,
			"license": "MIT",
			"bin": {
				"esbuild": "bin/esbuild"
			},
			"engines": {
				"node": ">=18"
			},
			"optionalDependencies": {
				"@esbuild/aix-ppc64": "0.25.8",
				"@esbuild/android-arm": "0.25.8",
				"@esbuild/android-arm64": "0.25.8",
				"@esbuild/android-x64": "0.25.8",
				"@esbuild/darwin-arm64": "0.25.8",
				"@esbuild/darwin-x64": "0.25.8",
				"@esbuild/freebsd-arm64": "0.25.8",
				"@esbuild/freebsd-x64": "0.25.8",
				"@esbuild/linux-arm": "0.25.8",
				"@esbuild/linux-arm64": "0.25.8",
				"@esbuild/linux-ia32": "0.25.8",
				"@esbuild/linux-loong64": "0.25.8",
				"@esbuild/linux-mips64el": "0.25.8",
				"@esbuild/linux-ppc64": "0.25.8",
				"@esbuild/linux-riscv64": "0.25.8",
				"@esbuild/linux-s390x": "0.25.8",
				"@esbuild/linux-x64": "0.25.8",
				"@esbuild/netbsd-arm64": "0.25.8",
				"@esbuild/netbsd-x64": "0.25.8",
				"@esbuild/openbsd-arm64": "0.25.8",
				"@esbuild/openbsd-x64": "0.25.8",
				"@esbuild/openharmony-arm64": "0.25.8",
				"@esbuild/sunos-x64": "0.25.8",
				"@esbuild/win32-arm64": "0.25.8",
				"@esbuild/win32-ia32": "0.25.8",
				"@esbuild/win32-x64": "0.25.8"
			}
		},
		"node_modules/escalade": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
			"integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/esprima": {
			"version": "4.0.1",
			"resolved": "https://registry.npmjs.org/esprima/-/esprima-4.0.1.tgz",
			"integrity": "sha512-eGuFFw7Upda+g4p+QHvnW0RyTX/SVeJBDM/gCtMARO0cLuT2HcEKnTPvhjV6aGeqrCB/sbNop0Kszm0jsaWU4A==",
			"dev": true,
			"license": "BSD-2-Clause",
			"bin": {
				"esparse": "bin/esparse.js",
				"esvalidate": "bin/esvalidate.js"
			},
			"engines": {
				"node": ">=4"
			}
		},
		"node_modules/estree-walker": {
			"version": "3.0.3",
			"resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
			"integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/estree": "^1.0.0"
			}
		},
		"node_modules/expect-type": {
			"version": "1.2.2",
			"resolved": "https://registry.npmjs.org/expect-type/-/expect-type-1.2.2.tgz",
			"integrity": "sha512-JhFGDVJ7tmDJItKhYgJCGLOWjuK9vPxiXoUFLwLDc99NlmklilbiQJwoctZtt13+xMw91MCk/REan6MWHqDjyA==",
			"dev": true,
			"license": "Apache-2.0",
			"engines": {
				"node": ">=12.0.0"
			}
		},
		"node_modules/fill-range": {
			"version": "7.1.1",
			"resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
			"integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"to-regex-range": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/foreground-child": {
			"version": "3.3.1",
			"resolved": "https://registry.npmjs.org/foreground-child/-/foreground-child-3.3.1.tgz",
			"integrity": "sha512-gIXjKqtFuWEgzFRJA9WCQeSJLZDjgJUOMCMzxtvFq/37KojM1BFGufqsCy0r4qSQmYLsZYMeyRqzIWOMup03sw==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"cross-spawn": "^7.0.6",
				"signal-exit": "^4.0.1"
			},
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/framer-motion": {
			"version": "12.23.9",
			"resolved": "https://registry.npmjs.org/framer-motion/-/framer-motion-12.23.9.tgz",
			"integrity": "sha512-TqEHXj8LWfQSKqfdr5Y4mYltYLw96deu6/K9kGDd+ysqRJPNwF9nb5mZcrLmybHbU7gcJ+HQar41U3UTGanbbQ==",
			"license": "MIT",
			"dependencies": {
				"motion-dom": "^12.23.9",
				"motion-utils": "^12.23.6",
				"tslib": "^2.4.0"
			},
			"peerDependencies": {
				"@emotion/is-prop-valid": "*",
				"react": "^18.0.0 || ^19.0.0",
				"react-dom": "^18.0.0 || ^19.0.0"
			},
			"peerDependenciesMeta": {
				"@emotion/is-prop-valid": {
					"optional": true
				},
				"react": {
					"optional": true
				},
				"react-dom": {
					"optional": true
				}
			}
		},
		"node_modules/fsevents": {
			"version": "2.3.3",
			"resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
			"integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": "^8.16.0 || ^10.6.0 || >=11.0.0"
			}
		},
		"node_modules/gensync": {
			"version": "1.0.0-beta.2",
			"resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
			"integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6.9.0"
			}
		},
		"node_modules/get-caller-file": {
			"version": "2.0.5",
			"resolved": "https://registry.npmjs.org/get-caller-file/-/get-caller-file-2.0.5.tgz",
			"integrity": "sha512-DyFP3BM/3YHTQOCUL/w0OZHR0lpKeGrxotcHWcqNEdnltqFwXVfhEBQ94eIo34AfQpo0rGki4cyIiftY06h2Fg==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": "6.* || 8.* || >= 10.*"
			}
		},
		"node_modules/get-nonce": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/get-nonce/-/get-nonce-1.0.1.tgz",
			"integrity": "sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==",
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/get-tsconfig": {
			"version": "4.10.1",
			"resolved": "https://registry.npmjs.org/get-tsconfig/-/get-tsconfig-4.10.1.tgz",
			"integrity": "sha512-auHyJ4AgMz7vgS8Hp3N6HXSmlMdUyhSUrfBF16w153rxtLIEOE+HGqaBppczZvnHLqQJfiHotCYpNhl0lUROFQ==",
			"devOptional": true,
			"license": "MIT",
			"dependencies": {
				"resolve-pkg-maps": "^1.0.0"
			},
			"funding": {
				"url": "https://github.com/privatenumber/get-tsconfig?sponsor=1"
			}
		},
		"node_modules/glob": {
			"version": "10.4.5",
			"resolved": "https://registry.npmjs.org/glob/-/glob-10.4.5.tgz",
			"integrity": "sha512-7Bv8RF0k6xjo7d4A/PxYLbUCfb6c+Vpd2/mB2yRDlew7Jb5hEXiCD9ibfO7wpk8i4sevK6DFny9h7EYbM3/sHg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"foreground-child": "^3.1.0",
				"jackspeak": "^3.1.2",
				"minimatch": "^9.0.4",
				"minipass": "^7.1.2",
				"package-json-from-dist": "^1.0.0",
				"path-scurry": "^1.11.1"
			},
			"bin": {
				"glob": "dist/esm/bin.mjs"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/glob-parent": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
			"integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"is-glob": "^4.0.1"
			},
			"engines": {
				"node": ">= 6"
			}
		},
		"node_modules/globals": {
			"version": "16.3.0",
			"resolved": "https://registry.npmjs.org/globals/-/globals-16.3.0.tgz",
			"integrity": "sha512-bqWEnJ1Nt3neqx2q5SFfGS8r/ahumIakg3HcwtNlrVlwXIeNumWn/c7Pn/wKzGhf6SaW6H6uWXLqC30STCMchQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=18"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/goober": {
			"version": "2.1.16",
			"resolved": "https://registry.npmjs.org/goober/-/goober-2.1.16.tgz",
			"integrity": "sha512-erjk19y1U33+XAMe1VTvIONHYoSqE4iS7BYUZfHaqeohLmnC0FdxEh7rQU+6MZ4OajItzjZFSRtVANrQwNq6/g==",
			"license": "MIT",
			"peerDependencies": {
				"csstype": "^3.0.10"
			}
		},
		"node_modules/graceful-fs": {
			"version": "4.2.11",
			"resolved": "https://registry.npmjs.org/graceful-fs/-/graceful-fs-4.2.11.tgz",
			"integrity": "sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==",
			"license": "ISC"
		},
		"node_modules/has-flag": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/has-flag/-/has-flag-4.0.0.tgz",
			"integrity": "sha512-EykJT/Q1KjTWctppgIAgfSO0tKVuZUjhgMr17kqTumMl6Afv3EISleU7qZUzoXDFTAHTDC4NOoG/ZxU3EvlMPQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/html-escaper": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/html-escaper/-/html-escaper-2.0.2.tgz",
			"integrity": "sha512-H2iMtd0I4Mt5eYiapRdIDjp+XzelXQ0tFE4JS7YFwFevXXMmOp9myNrUvCg0D6ws8iqkRPBfKHgbwig1SmlLfg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/is-binary-path": {
			"version": "2.1.0",
			"resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
			"integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"binary-extensions": "^2.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/is-extglob": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
			"integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-fullwidth-code-point": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/is-fullwidth-code-point/-/is-fullwidth-code-point-3.0.0.tgz",
			"integrity": "sha512-zymm5+u+sCsSWyD9qNaejV3DFvhCKclKdizYaJUuHA83RLjb7nSuGnddCHGv0hk+KY7BMAlsWeK4Ueg6EV6XQg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/is-glob": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
			"integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-extglob": "^2.1.1"
			},
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/is-number": {
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
			"integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.12.0"
			}
		},
		"node_modules/isbot": {
			"version": "5.1.28",
			"resolved": "https://registry.npmjs.org/isbot/-/isbot-5.1.28.tgz",
			"integrity": "sha512-qrOp4g3xj8YNse4biorv6O5ZShwsJM0trsoda4y7j/Su7ZtTTfVXFzbKkpgcSoDrHS8FcTuUwcU04YimZlZOxw==",
			"license": "Unlicense",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/isexe": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/isexe/-/isexe-2.0.0.tgz",
			"integrity": "sha512-RHxMLp9lnKHGHRng9QFhRCMbYAcVpn69smSGcq3f36xjgVVWThj4qqLbTLlq7Ssj8B+fIQ1EuCEGI2lKsyQeIw==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/istanbul-lib-coverage": {
			"version": "3.2.2",
			"resolved": "https://registry.npmjs.org/istanbul-lib-coverage/-/istanbul-lib-coverage-3.2.2.tgz",
			"integrity": "sha512-O8dpsF+r0WV/8MNRKfnmrtCWhuKjxrq2w+jpzBL5UZKTi2LeVWnWOmWRxFlesJONmc+wLAGvKQZEOanko0LFTg==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/istanbul-lib-report": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/istanbul-lib-report/-/istanbul-lib-report-3.0.1.tgz",
			"integrity": "sha512-GCfE1mtsHGOELCU8e/Z7YWzpmybrx/+dSTfLrvY8qRmaY6zXTKWn6WQIjaAFw069icm6GVMNkgu0NzI4iPZUNw==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"istanbul-lib-coverage": "^3.0.0",
				"make-dir": "^4.0.0",
				"supports-color": "^7.1.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/istanbul-lib-source-maps": {
			"version": "5.0.6",
			"resolved": "https://registry.npmjs.org/istanbul-lib-source-maps/-/istanbul-lib-source-maps-5.0.6.tgz",
			"integrity": "sha512-yg2d+Em4KizZC5niWhQaIomgf5WlL4vOOjZ5xGCmF8SnPE/mDWWXgvRExdcpCgh9lLRRa1/fSYp2ymmbJ1pI+A==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"@jridgewell/trace-mapping": "^0.3.23",
				"debug": "^4.1.1",
				"istanbul-lib-coverage": "^3.0.0"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/istanbul-reports": {
			"version": "3.1.7",
			"resolved": "https://registry.npmjs.org/istanbul-reports/-/istanbul-reports-3.1.7.tgz",
			"integrity": "sha512-BewmUXImeuRk2YY0PVbxgKAysvhRPUQE0h5QRM++nVWyubKGV0l8qQ5op8+B2DOmwSe63Jivj0BjkPQVf8fP5g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"dependencies": {
				"html-escaper": "^2.0.0",
				"istanbul-lib-report": "^3.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/jackspeak": {
			"version": "3.4.3",
			"resolved": "https://registry.npmjs.org/jackspeak/-/jackspeak-3.4.3.tgz",
			"integrity": "sha512-OGlZQpz2yfahA/Rd1Y8Cd9SIEsqvXkLVoSw/cgwhnhFMDbsQFeZYoJJ7bIZBS9BcamUW96asq/npPWugM+RQBw==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"@isaacs/cliui": "^8.0.2"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			},
			"optionalDependencies": {
				"@pkgjs/parseargs": "^0.11.0"
			}
		},
		"node_modules/jiti": {
			"version": "2.5.1",
			"resolved": "https://registry.npmjs.org/jiti/-/jiti-2.5.1.tgz",
			"integrity": "sha512-twQoecYPiVA5K/h6SxtORw/Bs3ar+mLUtoPSc7iMXzQzK8d7eJ/R09wmTwAjiamETn1cXYPGfNnu7DMoHgu12w==",
			"license": "MIT",
			"bin": {
				"jiti": "lib/jiti-cli.mjs"
			}
		},
		"node_modules/js-tokens": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
			"integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/jsesc": {
			"version": "3.1.0",
			"resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
			"integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"jsesc": "bin/jsesc"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/json5": {
			"version": "2.2.3",
			"resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
			"integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"json5": "lib/cli.js"
			},
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/lightningcss": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss/-/lightningcss-1.30.1.tgz",
			"integrity": "sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==",
			"license": "MPL-2.0",
			"dependencies": {
				"detect-libc": "^2.0.3"
			},
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			},
			"optionalDependencies": {
				"lightningcss-darwin-arm64": "1.30.1",
				"lightningcss-darwin-x64": "1.30.1",
				"lightningcss-freebsd-x64": "1.30.1",
				"lightningcss-linux-arm-gnueabihf": "1.30.1",
				"lightningcss-linux-arm64-gnu": "1.30.1",
				"lightningcss-linux-arm64-musl": "1.30.1",
				"lightningcss-linux-x64-gnu": "1.30.1",
				"lightningcss-linux-x64-musl": "1.30.1",
				"lightningcss-win32-arm64-msvc": "1.30.1",
				"lightningcss-win32-x64-msvc": "1.30.1"
			}
		},
		"node_modules/lightningcss-darwin-arm64": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-darwin-arm64/-/lightningcss-darwin-arm64-1.30.1.tgz",
			"integrity": "sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==",
			"cpu": [
				"arm64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-darwin-x64": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-darwin-x64/-/lightningcss-darwin-x64-1.30.1.tgz",
			"integrity": "sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==",
			"cpu": [
				"x64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-freebsd-x64": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-freebsd-x64/-/lightningcss-freebsd-x64-1.30.1.tgz",
			"integrity": "sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==",
			"cpu": [
				"x64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"freebsd"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm-gnueabihf": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm-gnueabihf/-/lightningcss-linux-arm-gnueabihf-1.30.1.tgz",
			"integrity": "sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==",
			"cpu": [
				"arm"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm64-gnu": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-gnu/-/lightningcss-linux-arm64-gnu-1.30.1.tgz",
			"integrity": "sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==",
			"cpu": [
				"arm64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-arm64-musl": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-arm64-musl/-/lightningcss-linux-arm64-musl-1.30.1.tgz",
			"integrity": "sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==",
			"cpu": [
				"arm64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-x64-gnu": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-x64-gnu/-/lightningcss-linux-x64-gnu-1.30.1.tgz",
			"integrity": "sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==",
			"cpu": [
				"x64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-linux-x64-musl": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-linux-x64-musl/-/lightningcss-linux-x64-musl-1.30.1.tgz",
			"integrity": "sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==",
			"cpu": [
				"x64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"linux"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-win32-arm64-msvc": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-win32-arm64-msvc/-/lightningcss-win32-arm64-msvc-1.30.1.tgz",
			"integrity": "sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==",
			"cpu": [
				"arm64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/lightningcss-win32-x64-msvc": {
			"version": "1.30.1",
			"resolved": "https://registry.npmjs.org/lightningcss-win32-x64-msvc/-/lightningcss-win32-x64-msvc-1.30.1.tgz",
			"integrity": "sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==",
			"cpu": [
				"x64"
			],
			"license": "MPL-2.0",
			"optional": true,
			"os": [
				"win32"
			],
			"engines": {
				"node": ">= 12.0.0"
			},
			"funding": {
				"type": "opencollective",
				"url": "https://opencollective.com/parcel"
			}
		},
		"node_modules/loupe": {
			"version": "3.2.0",
			"resolved": "https://registry.npmjs.org/loupe/-/loupe-3.2.0.tgz",
			"integrity": "sha512-2NCfZcT5VGVNX9mSZIxLRkEAegDGBpuQZBy13desuHeVORmBDyAET4TkJr4SjqQy3A8JDofMN6LpkK8Xcm/dlw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/lru-cache": {
			"version": "5.1.1",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
			"integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"yallist": "^3.0.2"
			}
		},
		"node_modules/lucide-react": {
			"version": "0.525.0",
			"resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.525.0.tgz",
			"integrity": "sha512-Tm1txJ2OkymCGkvwoHt33Y2JpN5xucVq1slHcgE6Lk0WjDfjgKWor5CdVER8U6DvcfMwh4M8XxmpTiyzfmfDYQ==",
			"license": "ISC",
			"peerDependencies": {
				"react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0"
			}
		},
		"node_modules/lz-string": {
			"version": "1.5.0",
			"resolved": "https://registry.npmjs.org/lz-string/-/lz-string-1.5.0.tgz",
			"integrity": "sha512-h5bgJWpxJNswbU7qCrV0tIKQCaS3blPDrqKWx+QxzuzL1zGUzij9XCWLrSLsJPu5t+eWA/ycetzYAO5IOMcWAQ==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"lz-string": "bin/bin.js"
			}
		},
		"node_modules/magic-string": {
			"version": "0.30.17",
			"resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.17.tgz",
			"integrity": "sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==",
			"license": "MIT",
			"dependencies": {
				"@jridgewell/sourcemap-codec": "^1.5.0"
			}
		},
		"node_modules/magicast": {
			"version": "0.3.5",
			"resolved": "https://registry.npmjs.org/magicast/-/magicast-0.3.5.tgz",
			"integrity": "sha512-L0WhttDl+2BOsybvEOLK7fW3UA0OQ0IQ2d6Zl2x/a6vVRs3bAY0ECOSHHeL5jD+SbOpOCUEi0y1DgHEn9Qn1AQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@babel/parser": "^7.25.4",
				"@babel/types": "^7.25.4",
				"source-map-js": "^1.2.0"
			}
		},
		"node_modules/make-dir": {
			"version": "4.0.0",
			"resolved": "https://registry.npmjs.org/make-dir/-/make-dir-4.0.0.tgz",
			"integrity": "sha512-hXdUTZYIVOt1Ex//jAQi+wTZZpUpwBj/0QsOzqegb3rGMMeJiSEu5xLHnYfBrRV4RH2+OCSOO95Is/7x1WJ4bw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"semver": "^7.5.3"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/make-dir/node_modules/semver": {
			"version": "7.7.2",
			"resolved": "https://registry.npmjs.org/semver/-/semver-7.7.2.tgz",
			"integrity": "sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			},
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/minimatch": {
			"version": "9.0.5",
			"resolved": "https://registry.npmjs.org/minimatch/-/minimatch-9.0.5.tgz",
			"integrity": "sha512-G6T0ZX48xgozx7587koeX9Ys2NYy6Gmv//P89sEte9V9whIapMNF4idKxnW2QtCcLiTWlb/wfCabAtAFWhhBow==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"brace-expansion": "^2.0.1"
			},
			"engines": {
				"node": ">=16 || 14 >=14.17"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/minipass": {
			"version": "7.1.2",
			"resolved": "https://registry.npmjs.org/minipass/-/minipass-7.1.2.tgz",
			"integrity": "sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==",
			"license": "ISC",
			"engines": {
				"node": ">=16 || 14 >=14.17"
			}
		},
		"node_modules/minizlib": {
			"version": "3.0.2",
			"resolved": "https://registry.npmjs.org/minizlib/-/minizlib-3.0.2.tgz",
			"integrity": "sha512-oG62iEk+CYt5Xj2YqI5Xi9xWUeZhDI8jjQmC5oThVH5JGCTgIjr7ciJDzC7MBzYd//WvR1OTmP5Q38Q8ShQtVA==",
			"license": "MIT",
			"dependencies": {
				"minipass": "^7.1.2"
			},
			"engines": {
				"node": ">= 18"
			}
		},
		"node_modules/mkdirp": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/mkdirp/-/mkdirp-3.0.1.tgz",
			"integrity": "sha512-+NsyUUAZDmo6YVHzL/stxSu3t9YS1iljliy3BSDrXJ/dkn1KYdmtZODGGjLcc9XLgVVpH4KshHB8XmZgMhaBXg==",
			"license": "MIT",
			"bin": {
				"mkdirp": "dist/cjs/src/bin.js"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/motion-dom": {
			"version": "12.23.9",
			"resolved": "https://registry.npmjs.org/motion-dom/-/motion-dom-12.23.9.tgz",
			"integrity": "sha512-6Sv++iWS8XMFCgU1qwKj9l4xuC47Hp4+2jvPfyTXkqDg2tTzSgX6nWKD4kNFXk0k7llO59LZTPuJigza4A2K1A==",
			"license": "MIT",
			"dependencies": {
				"motion-utils": "^12.23.6"
			}
		},
		"node_modules/motion-utils": {
			"version": "12.23.6",
			"resolved": "https://registry.npmjs.org/motion-utils/-/motion-utils-12.23.6.tgz",
			"integrity": "sha512-eAWoPgr4eFEOFfg2WjIsMoqJTW6Z8MTUCgn/GZ3VRpClWBdnbjryiA3ZSNLyxCTmCQx4RmYX6jX1iWHbenUPNQ==",
			"license": "MIT"
		},
		"node_modules/mrmime": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/mrmime/-/mrmime-2.0.1.tgz",
			"integrity": "sha512-Y3wQdFg2Va6etvQ5I82yUhGdsKrcYox6p7FfL1LbK2J4V01F9TGlepTIhnK24t7koZibmg82KGglhA1XK5IsLQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/ms": {
			"version": "2.1.3",
			"resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
			"integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/nanoid": {
			"version": "3.3.11",
			"resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.11.tgz",
			"integrity": "sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==",
			"funding": [
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"bin": {
				"nanoid": "bin/nanoid.cjs"
			},
			"engines": {
				"node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
			}
		},
		"node_modules/node-releases": {
			"version": "2.0.19",
			"resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.19.tgz",
			"integrity": "sha512-xxOWJsBKtzAq7DY0J+DTzuz58K8e7sJbdgwkbMWQe8UYB6ekmsQ45q0M/tJDsGaZmbC+l7n57UV8Hl5tHxO9uw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/normalize-path": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
			"integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/package-json-from-dist": {
			"version": "1.0.1",
			"resolved": "https://registry.npmjs.org/package-json-from-dist/-/package-json-from-dist-1.0.1.tgz",
			"integrity": "sha512-UEZIS3/by4OC8vL3P2dTXRETpebLI2NiI5vIrjaD/5UtrkFX/tNbwjTSRAGC/+7CAo2pIcBaRgWmcBBHcsaCIw==",
			"dev": true,
			"license": "BlueOak-1.0.0"
		},
		"node_modules/path-key": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/path-key/-/path-key-3.1.1.tgz",
			"integrity": "sha512-ojmeN0qd+y0jszEtoY48r0Peq5dwMEkIlCOu6Q5f41lfkswXuKtYrhgoTpLnyIcHm24Uhqx+5Tqm2InSwLhE6Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/path-scurry": {
			"version": "1.11.1",
			"resolved": "https://registry.npmjs.org/path-scurry/-/path-scurry-1.11.1.tgz",
			"integrity": "sha512-Xa4Nw17FS9ApQFJ9umLiJS4orGjm7ZzwUrwamcGQuHSzDyth9boKDaycYdDcZDuqYATXw4HFXgaqWTctW/v1HA==",
			"dev": true,
			"license": "BlueOak-1.0.0",
			"dependencies": {
				"lru-cache": "^10.2.0",
				"minipass": "^5.0.0 || ^6.0.2 || ^7.0.0"
			},
			"engines": {
				"node": ">=16 || 14 >=14.18"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/path-scurry/node_modules/lru-cache": {
			"version": "10.4.3",
			"resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
			"integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/pathe": {
			"version": "2.0.3",
			"resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
			"integrity": "sha512-WUjGcAqP1gQacoQe+OBJsFA7Ld4DyXuUIjZ5cc75cLHvJ7dtNsTugphxIADwspS+AraAUePCKrSVtPLFj/F88w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/pathval": {
			"version": "2.0.1",
			"resolved": "https://registry.npmjs.org/pathval/-/pathval-2.0.1.tgz",
			"integrity": "sha512-//nshmD55c46FuFw26xV/xFAaB5HF9Xdap7HJBBnrKdAd6/GxDBaNA1870O79+9ueg61cZLSVc+OaFlfmObYVQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">= 14.16"
			}
		},
		"node_modules/picocolors": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
			"integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
			"license": "ISC"
		},
		"node_modules/picomatch": {
			"version": "2.3.1",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.1.tgz",
			"integrity": "sha512-JU3teHTNjmE2VCGFzuY8EXzCDVwEqB2a8fsIvwaStHhAWJEeVd1o1QD80CU6+ZdEXXSLbSsuLwJjkCBWqRQUVA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8.6"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/playwright": {
			"version": "1.54.1",
			"resolved": "https://registry.npmjs.org/playwright/-/playwright-1.54.1.tgz",
			"integrity": "sha512-peWpSwIBmSLi6aW2auvrUtf2DqY16YYcCMO8rTVx486jKmDTJg7UAhyrraP98GB8BoPURZP8+nxO7TSd4cPr5g==",
			"dev": true,
			"license": "Apache-2.0",
			"dependencies": {
				"playwright-core": "1.54.1"
			},
			"bin": {
				"playwright": "cli.js"
			},
			"engines": {
				"node": ">=18"
			},
			"optionalDependencies": {
				"fsevents": "2.3.2"
			}
		},
		"node_modules/playwright-core": {
			"version": "1.54.1",
			"resolved": "https://registry.npmjs.org/playwright-core/-/playwright-core-1.54.1.tgz",
			"integrity": "sha512-Nbjs2zjj0htNhzgiy5wu+3w09YetDx5pkrpI/kZotDlDUaYk0HVA5xrBVPdow4SAUIlhgKcJeJg4GRKW6xHusA==",
			"dev": true,
			"license": "Apache-2.0",
			"bin": {
				"playwright-core": "cli.js"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/playwright/node_modules/fsevents": {
			"version": "2.3.2",
			"resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.2.tgz",
			"integrity": "sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==",
			"dev": true,
			"hasInstallScript": true,
			"license": "MIT",
			"optional": true,
			"os": [
				"darwin"
			],
			"engines": {
				"node": "^8.16.0 || ^10.6.0 || >=11.0.0"
			}
		},
		"node_modules/postcss": {
			"version": "8.5.6",
			"resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.6.tgz",
			"integrity": "sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==",
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/postcss/"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/postcss"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"nanoid": "^3.3.11",
				"picocolors": "^1.1.1",
				"source-map-js": "^1.2.1"
			},
			"engines": {
				"node": "^10 || ^12 || >=14"
			}
		},
		"node_modules/prettier": {
			"version": "3.6.2",
			"resolved": "https://registry.npmjs.org/prettier/-/prettier-3.6.2.tgz",
			"integrity": "sha512-I7AIg5boAr5R0FFtJ6rCfD+LFsWHp81dolrFD8S79U9tb8Az2nGrJncnMSnys+bpQJfRUzqs9hnA81OAA3hCuQ==",
			"dev": true,
			"license": "MIT",
			"bin": {
				"prettier": "bin/prettier.cjs"
			},
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/prettier/prettier?sponsor=1"
			}
		},
		"node_modules/pretty-format": {
			"version": "27.5.1",
			"resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-27.5.1.tgz",
			"integrity": "sha512-Qb1gy5OrP5+zDf2Bvnzdl3jsTf1qXVMazbvCoKhtKqVs4/YK4ozX4gKQJJVyNe+cajNPn0KoC0MC3FUmaHWEmQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1",
				"ansi-styles": "^5.0.0",
				"react-is": "^17.0.1"
			},
			"engines": {
				"node": "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0"
			}
		},
		"node_modules/pretty-format/node_modules/ansi-styles": {
			"version": "5.2.0",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-5.2.0.tgz",
			"integrity": "sha512-Cxwpt2SfTzTtXcfOlzGEee8O+c+MmUgGrNiBcXnuWxuFJHe6a5Hz7qwhwe5OgaSYI0IJvkLqWX1ASG+cJOkEiA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/react": {
			"version": "19.1.0",
			"resolved": "https://registry.npmjs.org/react/-/react-19.1.0.tgz",
			"integrity": "sha512-FS+XFBNvn3GTAWq26joslQgWNoFu08F4kl0J4CgdNKADkdSGXQyTCnKteIAJy96Br6YbpEU1LSzV5dYtjMkMDg==",
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/react-dom": {
			"version": "19.1.0",
			"resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.1.0.tgz",
			"integrity": "sha512-Xs1hdnE+DyKgeHJeJznQmYMIBG3TKIHJJT95Q58nHLSrElKlGQqDTR2HQ9fx5CN/Gk6Vh/kupBTDLU11/nDk/g==",
			"license": "MIT",
			"dependencies": {
				"scheduler": "^0.26.0"
			},
			"peerDependencies": {
				"react": "^19.1.0"
			}
		},
		"node_modules/react-is": {
			"version": "17.0.2",
			"resolved": "https://registry.npmjs.org/react-is/-/react-is-17.0.2.tgz",
			"integrity": "sha512-w2GsyukL62IJnlaff/nRegPQR94C/XXamvMWmSHRJ4y7Ts/4ocGRmTHvOs8PSE6pB3dWOrD/nueuU5sduBsQ4w==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/react-remove-scroll": {
			"version": "2.7.1",
			"resolved": "https://registry.npmjs.org/react-remove-scroll/-/react-remove-scroll-2.7.1.tgz",
			"integrity": "sha512-HpMh8+oahmIdOuS5aFKKY6Pyog+FNaZV/XyJOq7b4YFwsFHe5yYfdbIalI4k3vU2nSDql7YskmUseHsRrJqIPA==",
			"license": "MIT",
			"dependencies": {
				"react-remove-scroll-bar": "^2.3.7",
				"react-style-singleton": "^2.2.3",
				"tslib": "^2.1.0",
				"use-callback-ref": "^1.3.3",
				"use-sidecar": "^1.1.3"
			},
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/react-remove-scroll-bar": {
			"version": "2.3.8",
			"resolved": "https://registry.npmjs.org/react-remove-scroll-bar/-/react-remove-scroll-bar-2.3.8.tgz",
			"integrity": "sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==",
			"license": "MIT",
			"dependencies": {
				"react-style-singleton": "^2.2.2",
				"tslib": "^2.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/react-style-singleton": {
			"version": "2.2.3",
			"resolved": "https://registry.npmjs.org/react-style-singleton/-/react-style-singleton-2.2.3.tgz",
			"integrity": "sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==",
			"license": "MIT",
			"dependencies": {
				"get-nonce": "^1.0.0",
				"tslib": "^2.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/readdirp": {
			"version": "3.6.0",
			"resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
			"integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"picomatch": "^2.2.1"
			},
			"engines": {
				"node": ">=8.10.0"
			}
		},
		"node_modules/recast": {
			"version": "0.23.11",
			"resolved": "https://registry.npmjs.org/recast/-/recast-0.23.11.tgz",
			"integrity": "sha512-YTUo+Flmw4ZXiWfQKGcwwc11KnoRAYgzAE2E7mXKCjSviTKShtxBsN6YUUBB2gtaBzKzeKunxhUwNHQuRryhWA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ast-types": "^0.16.1",
				"esprima": "~4.0.0",
				"source-map": "~0.6.1",
				"tiny-invariant": "^1.3.3",
				"tslib": "^2.0.1"
			},
			"engines": {
				"node": ">= 4"
			}
		},
		"node_modules/recast/node_modules/source-map": {
			"version": "0.6.1",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.6.1.tgz",
			"integrity": "sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/require-directory": {
			"version": "2.1.1",
			"resolved": "https://registry.npmjs.org/require-directory/-/require-directory-2.1.1.tgz",
			"integrity": "sha512-fGxEI7+wsG9xrvdjsrlmL22OMTTiHRwAMroiEeMgq8gzoLC/PQr7RsRDSTLUg/bZAZtF+TVIkHc6/4RIKrui+Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/resolve-pkg-maps": {
			"version": "1.0.0",
			"resolved": "https://registry.npmjs.org/resolve-pkg-maps/-/resolve-pkg-maps-1.0.0.tgz",
			"integrity": "sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==",
			"devOptional": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/privatenumber/resolve-pkg-maps?sponsor=1"
			}
		},
		"node_modules/rollup": {
			"version": "4.45.1",
			"resolved": "https://registry.npmjs.org/rollup/-/rollup-4.45.1.tgz",
			"integrity": "sha512-4iya7Jb76fVpQyLoiVpzUrsjQ12r3dM7fIVz+4NwoYvZOShknRmiv+iu9CClZml5ZLGb0XMcYLutK6w9tgxHDw==",
			"license": "MIT",
			"dependencies": {
				"@types/estree": "1.0.8"
			},
			"bin": {
				"rollup": "dist/bin/rollup"
			},
			"engines": {
				"node": ">=18.0.0",
				"npm": ">=8.0.0"
			},
			"optionalDependencies": {
				"@rollup/rollup-android-arm-eabi": "4.45.1",
				"@rollup/rollup-android-arm64": "4.45.1",
				"@rollup/rollup-darwin-arm64": "4.45.1",
				"@rollup/rollup-darwin-x64": "4.45.1",
				"@rollup/rollup-freebsd-arm64": "4.45.1",
				"@rollup/rollup-freebsd-x64": "4.45.1",
				"@rollup/rollup-linux-arm-gnueabihf": "4.45.1",
				"@rollup/rollup-linux-arm-musleabihf": "4.45.1",
				"@rollup/rollup-linux-arm64-gnu": "4.45.1",
				"@rollup/rollup-linux-arm64-musl": "4.45.1",
				"@rollup/rollup-linux-loongarch64-gnu": "4.45.1",
				"@rollup/rollup-linux-powerpc64le-gnu": "4.45.1",
				"@rollup/rollup-linux-riscv64-gnu": "4.45.1",
				"@rollup/rollup-linux-riscv64-musl": "4.45.1",
				"@rollup/rollup-linux-s390x-gnu": "4.45.1",
				"@rollup/rollup-linux-x64-gnu": "4.45.1",
				"@rollup/rollup-linux-x64-musl": "4.45.1",
				"@rollup/rollup-win32-arm64-msvc": "4.45.1",
				"@rollup/rollup-win32-ia32-msvc": "4.45.1",
				"@rollup/rollup-win32-x64-msvc": "4.45.1",
				"fsevents": "~2.3.2"
			}
		},
		"node_modules/scheduler": {
			"version": "0.26.0",
			"resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.26.0.tgz",
			"integrity": "sha512-NlHwttCI/l5gCPR3D1nNXtWABUmBwvZpEQiD4IXSbIDq8BzLIK/7Ir5gTFSGZDUu37K5cMNp0hFtzO38sC7gWA==",
			"license": "MIT"
		},
		"node_modules/semver": {
			"version": "6.3.1",
			"resolved": "https://registry.npmjs.org/semver/-/semver-6.3.1.tgz",
			"integrity": "sha512-BR7VvDCVHO+q2xBEWskxS6DJE1qRnb7DxzUrogb71CWoSficBxYsiAGd+Kl0mmq/MprG9yArRkyrQxTO6XjMzA==",
			"dev": true,
			"license": "ISC",
			"bin": {
				"semver": "bin/semver.js"
			}
		},
		"node_modules/seroval": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/seroval/-/seroval-1.3.2.tgz",
			"integrity": "sha512-RbcPH1n5cfwKrru7v7+zrZvjLurgHhGyso3HTyGtRivGWgYjbOmGuivCQaORNELjNONoK35nj28EoWul9sb1zQ==",
			"license": "MIT",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/seroval-plugins": {
			"version": "1.3.2",
			"resolved": "https://registry.npmjs.org/seroval-plugins/-/seroval-plugins-1.3.2.tgz",
			"integrity": "sha512-0QvCV2lM3aj/U3YozDiVwx9zpH0q8A60CTWIv4Jszj/givcudPb48B+rkU5D51NJ0pTpweGMttHjboPa9/zoIQ==",
			"license": "MIT",
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"seroval": "^1.0"
			}
		},
		"node_modules/shebang-command": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/shebang-command/-/shebang-command-2.0.0.tgz",
			"integrity": "sha512-kHxr2zZpYtdmrN1qDjrrX/Z1rR1kG8Dx+gkpK1G4eXmvXswmcE1hTWBWYUzlraYw1/yZp6YuDY77YtvbN0dmDA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"shebang-regex": "^3.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/shebang-regex": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/shebang-regex/-/shebang-regex-3.0.0.tgz",
			"integrity": "sha512-7++dFhtcx3353uBaq8DDR4NuxBetBzC7ZQOhmTQInHEd6bSrXdiEyzCvG07Z44UYdLShWUyXt5M/yhz8ekcb1A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/siginfo": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/siginfo/-/siginfo-2.0.0.tgz",
			"integrity": "sha512-ybx0WO1/8bSBLEWXZvEd7gMW3Sn3JFlW3TvX1nREbDLRNQNaeNN8WK0meBwPdAaOI7TtRRRJn/Es1zhrrCHu7g==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/signal-exit": {
			"version": "4.1.0",
			"resolved": "https://registry.npmjs.org/signal-exit/-/signal-exit-4.1.0.tgz",
			"integrity": "sha512-bzyZ1e88w9O1iNJbKnOlvYTrWPDl46O1bG0D3XInv+9tkPrxrN8jUUTiFlDkkmKWgn1M6CfIA13SuGqOa9Korw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=14"
			},
			"funding": {
				"url": "https://github.com/sponsors/isaacs"
			}
		},
		"node_modules/sirv": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/sirv/-/sirv-3.0.1.tgz",
			"integrity": "sha512-FoqMu0NCGBLCcAkS1qA+XJIQTR6/JHfQXl+uGteNCQ76T91DMUjPa9xfmeqMY3z80nLSg9yQmNjK0Px6RWsH/A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@polka/url": "^1.0.0-next.24",
				"mrmime": "^2.0.0",
				"totalist": "^3.0.0"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/solid-js": {
			"version": "1.9.7",
			"resolved": "https://registry.npmjs.org/solid-js/-/solid-js-1.9.7.tgz",
			"integrity": "sha512-/saTKi8iWEM233n5OSi1YHCCuh66ZIQ7aK2hsToPe4tqGm7qAejU1SwNuTPivbWAYq7SjuHVVYxxuZQNRbICiw==",
			"license": "MIT",
			"dependencies": {
				"csstype": "^3.1.0",
				"seroval": "~1.3.0",
				"seroval-plugins": "~1.3.0"
			}
		},
		"node_modules/source-map": {
			"version": "0.7.6",
			"resolved": "https://registry.npmjs.org/source-map/-/source-map-0.7.6.tgz",
			"integrity": "sha512-i5uvt8C3ikiWeNZSVZNWcfZPItFQOsYTUAOkcUPGd8DqDy1uOUikjt5dG+uRlwyvR108Fb9DOd4GvXfT0N2/uQ==",
			"dev": true,
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">= 12"
			}
		},
		"node_modules/source-map-js": {
			"version": "1.2.1",
			"resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.1.tgz",
			"integrity": "sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==",
			"license": "BSD-3-Clause",
			"engines": {
				"node": ">=0.10.0"
			}
		},
		"node_modules/stackback": {
			"version": "0.0.2",
			"resolved": "https://registry.npmjs.org/stackback/-/stackback-0.0.2.tgz",
			"integrity": "sha512-1XMJE5fQo1jGH6Y/7ebnwPOBEkIEnT4QF32d5R1+VXdXveM0IBMJt8zfaxX1P3QhVwrYe+576+jkANtSS2mBbw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/std-env": {
			"version": "3.9.0",
			"resolved": "https://registry.npmjs.org/std-env/-/std-env-3.9.0.tgz",
			"integrity": "sha512-UGvjygr6F6tpH7o2qyqR6QYpwraIjKSdtzyBdyytFOHmPZY917kwdwLG0RbOjWOnKmnm3PeHjaoLLMie7kPLQw==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/string-width": {
			"version": "5.1.2",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-5.1.2.tgz",
			"integrity": "sha512-HnLOCR3vjcY8beoNLtcjZ5/nxn2afmME6lhrDrebokqMap+XbeW8n9TXpPDOqdGK5qcI3oT0GKTW6wC7EMiVqA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"eastasianwidth": "^0.2.0",
				"emoji-regex": "^9.2.2",
				"strip-ansi": "^7.0.1"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/sindresorhus"
			}
		},
		"node_modules/string-width-cjs": {
			"name": "string-width",
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/string-width-cjs/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/string-width-cjs/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/strip-ansi": {
			"version": "7.1.0",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-7.1.0.tgz",
			"integrity": "sha512-iq6eVVI64nQQTRYq2KtEg2d2uU7LElhTJwsH4YzIHZshxlgZms/wIc4VoDQTlG/IvVIrBKG06CrZnp0qv7hkcQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^6.0.1"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/strip-ansi?sponsor=1"
			}
		},
		"node_modules/strip-ansi-cjs": {
			"name": "strip-ansi",
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/strip-ansi/node_modules/ansi-regex": {
			"version": "6.1.0",
			"resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-6.1.0.tgz",
			"integrity": "sha512-7HSX4QQb4CspciLpVFwyRe79O3xsIZDDLER21kERQ71oaPodF8jL725AgJMFAYbooIqolJoRLuM81SpeUkpkvA==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-regex?sponsor=1"
			}
		},
		"node_modules/strip-literal": {
			"version": "3.0.0",
			"resolved": "https://registry.npmjs.org/strip-literal/-/strip-literal-3.0.0.tgz",
			"integrity": "sha512-TcccoMhJOM3OebGhSBEmp3UZ2SfDMZUEBdRA/9ynfLi8yYajyWX3JiXArcJt4Umh4vISpspkQIY8ZZoCqjbviA==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"js-tokens": "^9.0.1"
			},
			"funding": {
				"url": "https://github.com/sponsors/antfu"
			}
		},
		"node_modules/strip-literal/node_modules/js-tokens": {
			"version": "9.0.1",
			"resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-9.0.1.tgz",
			"integrity": "sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/supports-color": {
			"version": "7.2.0",
			"resolved": "https://registry.npmjs.org/supports-color/-/supports-color-7.2.0.tgz",
			"integrity": "sha512-qpCAvRl9stuOHveKsn7HncJRvv501qIacKzQlO/+Lwxc9+0q2wLyv4Dfvt80/DPn2pqOBsJdDiogXGR9+OvwRw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"has-flag": "^4.0.0"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/tailwind-merge": {
			"version": "3.3.1",
			"resolved": "https://registry.npmjs.org/tailwind-merge/-/tailwind-merge-3.3.1.tgz",
			"integrity": "sha512-gBXpgUm/3rp1lMZZrM/w7D8GKqshif0zAymAhbCyIt8KMe+0v9DQ7cdYLR4FHH/cKpdTXb+A/tKKU3eolfsI+g==",
			"license": "MIT",
			"funding": {
				"type": "github",
				"url": "https://github.com/sponsors/dcastil"
			}
		},
		"node_modules/tailwindcss": {
			"version": "4.1.11",
			"resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-4.1.11.tgz",
			"integrity": "sha512-2E9TBm6MDD/xKYe+dvJZAmg3yxIEDNRc0jwlNyDg/4Fil2QcSLjFKGVff0lAf1jjeaArlG/M75Ey/EYr/OJtBA==",
			"license": "MIT"
		},
		"node_modules/tapable": {
			"version": "2.2.2",
			"resolved": "https://registry.npmjs.org/tapable/-/tapable-2.2.2.tgz",
			"integrity": "sha512-Re10+NauLTMCudc7T5WLFLAwDhQ0JWdrMK+9B2M8zR5hRExKmsRDCBA7/aV/pNJFltmBFO5BAMlQFi/vq3nKOg==",
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/tar": {
			"version": "7.4.3",
			"resolved": "https://registry.npmjs.org/tar/-/tar-7.4.3.tgz",
			"integrity": "sha512-5S7Va8hKfV7W5U6g3aYxXmlPoZVAwUMy9AOKyF2fVuZa2UD3qZjg578OrLRt8PcNN1PleVaL/5/yYATNL0ICUw==",
			"license": "ISC",
			"dependencies": {
				"@isaacs/fs-minipass": "^4.0.0",
				"chownr": "^3.0.0",
				"minipass": "^7.1.2",
				"minizlib": "^3.0.1",
				"mkdirp": "^3.0.1",
				"yallist": "^5.0.0"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/tar/node_modules/yallist": {
			"version": "5.0.0",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-5.0.0.tgz",
			"integrity": "sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==",
			"license": "BlueOak-1.0.0",
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/test-exclude": {
			"version": "7.0.1",
			"resolved": "https://registry.npmjs.org/test-exclude/-/test-exclude-7.0.1.tgz",
			"integrity": "sha512-pFYqmTw68LXVjeWJMST4+borgQP2AyMNbg1BpZh9LbyhUeNkeaPF9gzfPGUAnSMV3qPYdWUwDIjjCLiSDOl7vg==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"@istanbuljs/schema": "^0.1.2",
				"glob": "^10.4.1",
				"minimatch": "^9.0.4"
			},
			"engines": {
				"node": ">=18"
			}
		},
		"node_modules/tiny-invariant": {
			"version": "1.3.3",
			"resolved": "https://registry.npmjs.org/tiny-invariant/-/tiny-invariant-1.3.3.tgz",
			"integrity": "sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==",
			"license": "MIT"
		},
		"node_modules/tiny-warning": {
			"version": "1.0.3",
			"resolved": "https://registry.npmjs.org/tiny-warning/-/tiny-warning-1.0.3.tgz",
			"integrity": "sha512-lBN9zLN/oAf68o3zNXYrdCt1kP8WsiGW8Oo2ka41b2IM5JL/S1CTyX1rW0mb/zSuJun0ZUrDxx4sqvYS2FWzPA==",
			"license": "MIT"
		},
		"node_modules/tinybench": {
			"version": "2.9.0",
			"resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
			"integrity": "sha512-0+DUvqWMValLmha6lr4kD8iAMK1HzV0/aKnCtWb9v9641TnP/MFb7Pc2bxoxQjTXAErryXVgUOfv2YqNllqGeg==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/tinyexec": {
			"version": "0.3.2",
			"resolved": "https://registry.npmjs.org/tinyexec/-/tinyexec-0.3.2.tgz",
			"integrity": "sha512-KQQR9yN7R5+OSwaK0XQoj22pwHoTlgYqmUscPYoknOoWCWfj/5/ABTMRi69FrKU5ffPVh5QcFikpWJI/P1ocHA==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/tinyglobby": {
			"version": "0.2.14",
			"resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.14.tgz",
			"integrity": "sha512-tX5e7OM1HnYr2+a2C/4V0htOcSQcoSTH9KgJnVvNm5zm/cyEWKJ7j7YutsH9CxMdtOkkLFy2AHrMci9IM8IPZQ==",
			"license": "MIT",
			"dependencies": {
				"fdir": "^6.4.4",
				"picomatch": "^4.0.2"
			},
			"engines": {
				"node": ">=12.0.0"
			},
			"funding": {
				"url": "https://github.com/sponsors/SuperchupuDev"
			}
		},
		"node_modules/tinyglobby/node_modules/fdir": {
			"version": "6.4.6",
			"resolved": "https://registry.npmjs.org/fdir/-/fdir-6.4.6.tgz",
			"integrity": "sha512-hiFoqpyZcfNm1yc4u8oWCf9A2c4D3QjCrks3zmoVKVxpQRzmPNar1hUJcBG2RQHvEVGDN+Jm81ZheVLAQMK6+w==",
			"license": "MIT",
			"peerDependencies": {
				"picomatch": "^3 || ^4"
			},
			"peerDependenciesMeta": {
				"picomatch": {
					"optional": true
				}
			}
		},
		"node_modules/tinyglobby/node_modules/picomatch": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
			"integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/tinypool": {
			"version": "1.1.1",
			"resolved": "https://registry.npmjs.org/tinypool/-/tinypool-1.1.1.tgz",
			"integrity": "sha512-Zba82s87IFq9A9XmjiX5uZA/ARWDrB03OHlq+Vw1fSdt0I+4/Kutwy8BP4Y/y/aORMo61FQ0vIb5j44vSo5Pkg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": "^18.0.0 || >=20.0.0"
			}
		},
		"node_modules/tinyrainbow": {
			"version": "2.0.0",
			"resolved": "https://registry.npmjs.org/tinyrainbow/-/tinyrainbow-2.0.0.tgz",
			"integrity": "sha512-op4nsTR47R6p0vMUUoYl/a+ljLFVtlfaXkLQmqfLR1qHma1h/ysYk4hEXZ880bf2CYgTskvTa/e196Vd5dDQXw==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/tinyspy": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/tinyspy/-/tinyspy-4.0.3.tgz",
			"integrity": "sha512-t2T/WLB2WRgZ9EpE4jgPJ9w+i66UZfDc8wHh0xrwiRNN+UwH98GIJkTeZqX9rg0i0ptwzqW+uYeIF0T4F8LR7A==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=14.0.0"
			}
		},
		"node_modules/to-regex-range": {
			"version": "5.0.1",
			"resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
			"integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"is-number": "^7.0.0"
			},
			"engines": {
				"node": ">=8.0"
			}
		},
		"node_modules/totalist": {
			"version": "3.0.1",
			"resolved": "https://registry.npmjs.org/totalist/-/totalist-3.0.1.tgz",
			"integrity": "sha512-sf4i37nQ2LBx4m3wB74y+ubopq6W/dIzXg0FDGjsYnZHVa1Da8FH853wlL2gtUhg+xJXjfk3kUZS3BRoQeoQBQ==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=6"
			}
		},
		"node_modules/tslib": {
			"version": "2.8.1",
			"resolved": "https://registry.npmjs.org/tslib/-/tslib-2.8.1.tgz",
			"integrity": "sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==",
			"license": "0BSD"
		},
		"node_modules/tsx": {
			"version": "4.20.3",
			"resolved": "https://registry.npmjs.org/tsx/-/tsx-4.20.3.tgz",
			"integrity": "sha512-qjbnuR9Tr+FJOMBqJCW5ehvIo/buZq7vH7qD7JziU98h6l3qGy0a/yPFjwO+y0/T7GFpNgNAvEcPPVfyT8rrPQ==",
			"devOptional": true,
			"license": "MIT",
			"dependencies": {
				"esbuild": "~0.25.0",
				"get-tsconfig": "^4.7.5"
			},
			"bin": {
				"tsx": "dist/cli.mjs"
			},
			"engines": {
				"node": ">=18.0.0"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.3"
			}
		},
		"node_modules/tw-animate-css": {
			"version": "1.3.5",
			"resolved": "https://registry.npmjs.org/tw-animate-css/-/tw-animate-css-1.3.5.tgz",
			"integrity": "sha512-t3u+0YNoloIhj1mMXs779P6MO9q3p3mvGn4k1n3nJPqJw/glZcuijG2qTSN4z4mgNRfW5ZC3aXJFLwDtiipZXA==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/Wombosvideo"
			}
		},
		"node_modules/typescript": {
			"version": "5.8.3",
			"resolved": "https://registry.npmjs.org/typescript/-/typescript-5.8.3.tgz",
			"integrity": "sha512-p1diW6TqL9L07nNxvRMM7hMMw4c5XOo/1ibL4aAIGmSAt9slTE1Xgw5KWuof2uTOvCg9BY7ZRi+GaF+7sfgPeQ==",
			"dev": true,
			"license": "Apache-2.0",
			"bin": {
				"tsc": "bin/tsc",
				"tsserver": "bin/tsserver"
			},
			"engines": {
				"node": ">=14.17"
			}
		},
		"node_modules/undici-types": {
			"version": "7.8.0",
			"resolved": "https://registry.npmjs.org/undici-types/-/undici-types-7.8.0.tgz",
			"integrity": "sha512-9UJ2xGDvQ43tYyVMpuHlsgApydB8ZKfVYTsLDhXkFL/6gfkp+U8xTGdh8pMJv1SpZna0zxG1DwsKZsreLbXBxw==",
			"devOptional": true,
			"license": "MIT"
		},
		"node_modules/unplugin": {
			"version": "2.3.5",
			"resolved": "https://registry.npmjs.org/unplugin/-/unplugin-2.3.5.tgz",
			"integrity": "sha512-RyWSb5AHmGtjjNQ6gIlA67sHOsWpsbWpwDokLwTcejVdOjEkJZh7QKu14J00gDDVSh8kGH4KYC/TNBceXFZhtw==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"acorn": "^8.14.1",
				"picomatch": "^4.0.2",
				"webpack-virtual-modules": "^0.6.2"
			},
			"engines": {
				"node": ">=18.12.0"
			}
		},
		"node_modules/unplugin/node_modules/picomatch": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
			"integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/update-browserslist-db": {
			"version": "1.1.3",
			"resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.1.3.tgz",
			"integrity": "sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==",
			"dev": true,
			"funding": [
				{
					"type": "opencollective",
					"url": "https://opencollective.com/browserslist"
				},
				{
					"type": "tidelift",
					"url": "https://tidelift.com/funding/github/npm/browserslist"
				},
				{
					"type": "github",
					"url": "https://github.com/sponsors/ai"
				}
			],
			"license": "MIT",
			"dependencies": {
				"escalade": "^3.2.0",
				"picocolors": "^1.1.1"
			},
			"bin": {
				"update-browserslist-db": "cli.js"
			},
			"peerDependencies": {
				"browserslist": ">= 4.21.0"
			}
		},
		"node_modules/use-callback-ref": {
			"version": "1.3.3",
			"resolved": "https://registry.npmjs.org/use-callback-ref/-/use-callback-ref-1.3.3.tgz",
			"integrity": "sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==",
			"license": "MIT",
			"dependencies": {
				"tslib": "^2.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/use-sidecar": {
			"version": "1.1.3",
			"resolved": "https://registry.npmjs.org/use-sidecar/-/use-sidecar-1.1.3.tgz",
			"integrity": "sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==",
			"license": "MIT",
			"dependencies": {
				"detect-node-es": "^1.1.0",
				"tslib": "^2.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"peerDependencies": {
				"@types/react": "*",
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				}
			}
		},
		"node_modules/use-sync-external-store": {
			"version": "1.5.0",
			"resolved": "https://registry.npmjs.org/use-sync-external-store/-/use-sync-external-store-1.5.0.tgz",
			"integrity": "sha512-Rb46I4cGGVBmjamjphe8L/UnvJD+uPPtTkNvX5mZgqdbavhI4EbgIWJiIHXJ8bc/i9EQGPRh4DwEURJ552Do0A==",
			"license": "MIT",
			"peerDependencies": {
				"react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0"
			}
		},
		"node_modules/vite": {
			"version": "7.0.6",
			"resolved": "https://registry.npmjs.org/vite/-/vite-7.0.6.tgz",
			"integrity": "sha512-MHFiOENNBd+Bd9uvc8GEsIzdkn1JxMmEeYX35tI3fv0sJBUTfW5tQsoaOwuY4KhBI09A3dUJ/DXf2yxPVPUceg==",
			"license": "MIT",
			"dependencies": {
				"esbuild": "^0.25.0",
				"fdir": "^6.4.6",
				"picomatch": "^4.0.3",
				"postcss": "^8.5.6",
				"rollup": "^4.40.0",
				"tinyglobby": "^0.2.14"
			},
			"bin": {
				"vite": "bin/vite.js"
			},
			"engines": {
				"node": "^20.19.0 || >=22.12.0"
			},
			"funding": {
				"url": "https://github.com/vitejs/vite?sponsor=1"
			},
			"optionalDependencies": {
				"fsevents": "~2.3.3"
			},
			"peerDependencies": {
				"@types/node": "^20.19.0 || >=22.12.0",
				"jiti": ">=1.21.0",
				"less": "^4.0.0",
				"lightningcss": "^1.21.0",
				"sass": "^1.70.0",
				"sass-embedded": "^1.70.0",
				"stylus": ">=0.54.8",
				"sugarss": "^5.0.0",
				"terser": "^5.16.0",
				"tsx": "^4.8.1",
				"yaml": "^2.4.2"
			},
			"peerDependenciesMeta": {
				"@types/node": {
					"optional": true
				},
				"jiti": {
					"optional": true
				},
				"less": {
					"optional": true
				},
				"lightningcss": {
					"optional": true
				},
				"sass": {
					"optional": true
				},
				"sass-embedded": {
					"optional": true
				},
				"stylus": {
					"optional": true
				},
				"sugarss": {
					"optional": true
				},
				"terser": {
					"optional": true
				},
				"tsx": {
					"optional": true
				},
				"yaml": {
					"optional": true
				}
			}
		},
		"node_modules/vite-node": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/vite-node/-/vite-node-3.2.4.tgz",
			"integrity": "sha512-EbKSKh+bh1E1IFxeO0pg1n4dvoOTt0UDiXMd/qn++r98+jPO1xtJilvXldeuQ8giIB5IkpjCgMleHMNEsGH6pg==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cac": "^6.7.14",
				"debug": "^4.4.1",
				"es-module-lexer": "^1.7.0",
				"pathe": "^2.0.3",
				"vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
			},
			"bin": {
				"vite-node": "vite-node.mjs"
			},
			"engines": {
				"node": "^18.0.0 || ^20.0.0 || >=22.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			}
		},
		"node_modules/vite/node_modules/fdir": {
			"version": "6.4.6",
			"resolved": "https://registry.npmjs.org/fdir/-/fdir-6.4.6.tgz",
			"integrity": "sha512-hiFoqpyZcfNm1yc4u8oWCf9A2c4D3QjCrks3zmoVKVxpQRzmPNar1hUJcBG2RQHvEVGDN+Jm81ZheVLAQMK6+w==",
			"license": "MIT",
			"peerDependencies": {
				"picomatch": "^3 || ^4"
			},
			"peerDependenciesMeta": {
				"picomatch": {
					"optional": true
				}
			}
		},
		"node_modules/vite/node_modules/picomatch": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
			"integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/vitest": {
			"version": "3.2.4",
			"resolved": "https://registry.npmjs.org/vitest/-/vitest-3.2.4.tgz",
			"integrity": "sha512-LUCP5ev3GURDysTWiP47wRRUpLKMOfPh+yKTx3kVIEiu5KOMeqzpnYNsKyOoVrULivR8tLcks4+lga33Whn90A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"@types/chai": "^5.2.2",
				"@vitest/expect": "3.2.4",
				"@vitest/mocker": "3.2.4",
				"@vitest/pretty-format": "^3.2.4",
				"@vitest/runner": "3.2.4",
				"@vitest/snapshot": "3.2.4",
				"@vitest/spy": "3.2.4",
				"@vitest/utils": "3.2.4",
				"chai": "^5.2.0",
				"debug": "^4.4.1",
				"expect-type": "^1.2.1",
				"magic-string": "^0.30.17",
				"pathe": "^2.0.3",
				"picomatch": "^4.0.2",
				"std-env": "^3.9.0",
				"tinybench": "^2.9.0",
				"tinyexec": "^0.3.2",
				"tinyglobby": "^0.2.14",
				"tinypool": "^1.1.1",
				"tinyrainbow": "^2.0.0",
				"vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0",
				"vite-node": "3.2.4",
				"why-is-node-running": "^2.3.0"
			},
			"bin": {
				"vitest": "vitest.mjs"
			},
			"engines": {
				"node": "^18.0.0 || ^20.0.0 || >=22.0.0"
			},
			"funding": {
				"url": "https://opencollective.com/vitest"
			},
			"peerDependencies": {
				"@edge-runtime/vm": "*",
				"@types/debug": "^4.1.12",
				"@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
				"@vitest/browser": "3.2.4",
				"@vitest/ui": "3.2.4",
				"happy-dom": "*",
				"jsdom": "*"
			},
			"peerDependenciesMeta": {
				"@edge-runtime/vm": {
					"optional": true
				},
				"@types/debug": {
					"optional": true
				},
				"@types/node": {
					"optional": true
				},
				"@vitest/browser": {
					"optional": true
				},
				"@vitest/ui": {
					"optional": true
				},
				"happy-dom": {
					"optional": true
				},
				"jsdom": {
					"optional": true
				}
			}
		},
		"node_modules/vitest/node_modules/picomatch": {
			"version": "4.0.3",
			"resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.3.tgz",
			"integrity": "sha512-5gTmgEY/sqK6gFXLIsQNH19lWb4ebPDLA4SdLP7dsWkIXHWlG66oPuVvXSGFPppYZz8ZDZq0dYYrbHfBCVUb1Q==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/sponsors/jonschlinkert"
			}
		},
		"node_modules/webpack-virtual-modules": {
			"version": "0.6.2",
			"resolved": "https://registry.npmjs.org/webpack-virtual-modules/-/webpack-virtual-modules-0.6.2.tgz",
			"integrity": "sha512-66/V2i5hQanC51vBQKPH4aI8NMAcBW59FVBs+rC7eGHupMyfn34q7rZIE+ETlJ+XTevqfUhVVBgSUNSW2flEUQ==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/which": {
			"version": "2.0.2",
			"resolved": "https://registry.npmjs.org/which/-/which-2.0.2.tgz",
			"integrity": "sha512-BLI3Tl1TW3Pvl70l3yq3Y64i+awpwXqsGBYWkkqMtnbXgrMD+yj7rhW0kuEDxzJaYXGjEW5ogapKNMEKNMjibA==",
			"dev": true,
			"license": "ISC",
			"dependencies": {
				"isexe": "^2.0.0"
			},
			"bin": {
				"node-which": "bin/node-which"
			},
			"engines": {
				"node": ">= 8"
			}
		},
		"node_modules/why-is-node-running": {
			"version": "2.3.0",
			"resolved": "https://registry.npmjs.org/why-is-node-running/-/why-is-node-running-2.3.0.tgz",
			"integrity": "sha512-hUrmaWBdVDcxvYqnyh09zunKzROWjbZTiNy8dBEjkS7ehEDQibXJ7XvlmtbwuTclUiIyN+CyXQD4Vmko8fNm8w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"siginfo": "^2.0.0",
				"stackback": "0.0.2"
			},
			"bin": {
				"why-is-node-running": "cli.js"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi": {
			"version": "8.1.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-8.1.0.tgz",
			"integrity": "sha512-si7QWI6zUMq56bESFvagtmzMdGOtoxfR+Sez11Mobfc7tm+VkUckk9bW2UeffTGVUbOksxmSw0AA2gs8g71NCQ==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^6.1.0",
				"string-width": "^5.0.1",
				"strip-ansi": "^7.0.1"
			},
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/wrap-ansi-cjs": {
			"name": "wrap-ansi",
			"version": "7.0.0",
			"resolved": "https://registry.npmjs.org/wrap-ansi/-/wrap-ansi-7.0.0.tgz",
			"integrity": "sha512-YVGIj2kamLSTxw6NsZjoBxfSwsn0ycdesmc4p+Q21c5zPuZ1pl+NfxVdxPtdHvmNVOQ6XSYG4AUtyt/Fi7D16Q==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-styles": "^4.0.0",
				"string-width": "^4.1.0",
				"strip-ansi": "^6.0.0"
			},
			"engines": {
				"node": ">=10"
			},
			"funding": {
				"url": "https://github.com/chalk/wrap-ansi?sponsor=1"
			}
		},
		"node_modules/wrap-ansi-cjs/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/wrap-ansi-cjs/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi-cjs/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/wrap-ansi/node_modules/ansi-styles": {
			"version": "6.2.1",
			"resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-6.2.1.tgz",
			"integrity": "sha512-bN798gFfQX+viw3R7yrGWRqnrN2oRkEkUjjl4JNn4E8GxxbjtG3FbrEIIY3l8/hrwUwIeCZvi4QuOTP4MErVug==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=12"
			},
			"funding": {
				"url": "https://github.com/chalk/ansi-styles?sponsor=1"
			}
		},
		"node_modules/ws": {
			"version": "8.18.3",
			"resolved": "https://registry.npmjs.org/ws/-/ws-8.18.3.tgz",
			"integrity": "sha512-PEIGCY5tSlUt50cqyMXfCzX+oOPqN0vuGqWzbcJ2xvnkzkq46oOpz7dQaTDBdfICb4N14+GARUDw2XV2N4tvzg==",
			"dev": true,
			"license": "MIT",
			"engines": {
				"node": ">=10.0.0"
			},
			"peerDependencies": {
				"bufferutil": "^4.0.1",
				"utf-8-validate": ">=5.0.2"
			},
			"peerDependenciesMeta": {
				"bufferutil": {
					"optional": true
				},
				"utf-8-validate": {
					"optional": true
				}
			}
		},
		"node_modules/y18n": {
			"version": "5.0.8",
			"resolved": "https://registry.npmjs.org/y18n/-/y18n-5.0.8.tgz",
			"integrity": "sha512-0pfFzegeDWJHJIAmTLRP2DwHjdF5s7jo9tuztdQxAhINCdvS+3nGINqPd00AphqJR/0LhANUS6/+7SCb98YOfA==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=10"
			}
		},
		"node_modules/yallist": {
			"version": "3.1.1",
			"resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
			"integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
			"dev": true,
			"license": "ISC"
		},
		"node_modules/yargs": {
			"version": "17.7.2",
			"resolved": "https://registry.npmjs.org/yargs/-/yargs-17.7.2.tgz",
			"integrity": "sha512-7dSzzRQ++CKnNI/krKnYRV7JKKPUXMEh61soaHKg9mrWEhzFWhFnxPxGl+69cD1Ou63C13NUPCnmIcrvqCuM6w==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"cliui": "^8.0.1",
				"escalade": "^3.1.1",
				"get-caller-file": "^2.0.5",
				"require-directory": "^2.1.1",
				"string-width": "^4.2.3",
				"y18n": "^5.0.5",
				"yargs-parser": "^21.1.1"
			},
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/yargs-parser": {
			"version": "21.1.1",
			"resolved": "https://registry.npmjs.org/yargs-parser/-/yargs-parser-21.1.1.tgz",
			"integrity": "sha512-tVpsJW7DdjecAiFpbIB1e3qxIQsE6NoPc5/eTdrbbIC4h0LVsWhnoa3g+m2HclBIujHzsxZ4VJVA+GUuc2/LBw==",
			"dev": true,
			"license": "ISC",
			"engines": {
				"node": ">=12"
			}
		},
		"node_modules/yargs/node_modules/emoji-regex": {
			"version": "8.0.0",
			"resolved": "https://registry.npmjs.org/emoji-regex/-/emoji-regex-8.0.0.tgz",
			"integrity": "sha512-MSjYzcWNOA0ewAHpz0MxpYFvwg6yjy1NG3xteoqz644VCo/RPgnr1/GGt+ic3iJTzQ8Eu3TdM14SawnVUmGE6A==",
			"dev": true,
			"license": "MIT"
		},
		"node_modules/yargs/node_modules/string-width": {
			"version": "4.2.3",
			"resolved": "https://registry.npmjs.org/string-width/-/string-width-4.2.3.tgz",
			"integrity": "sha512-wKyQRQpjJ0sIp62ErSZdGsjMJWsap5oRNihHhu6G7JVO/9jIB6UyevL+tXuOqrng8j/cxKTWyWUwvSTriiZz/g==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"emoji-regex": "^8.0.0",
				"is-fullwidth-code-point": "^3.0.0",
				"strip-ansi": "^6.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/yargs/node_modules/strip-ansi": {
			"version": "6.0.1",
			"resolved": "https://registry.npmjs.org/strip-ansi/-/strip-ansi-6.0.1.tgz",
			"integrity": "sha512-Y38VPSHcqkFrCpFnQ9vuSXmquuv5oXOKpGeT6aGrr3o3Gc9AlVa6JBfUSOCnbxGGZF+/0ooI7KrPuUSztUdU5A==",
			"dev": true,
			"license": "MIT",
			"dependencies": {
				"ansi-regex": "^5.0.1"
			},
			"engines": {
				"node": ">=8"
			}
		},
		"node_modules/zod": {
			"version": "3.25.76",
			"resolved": "https://registry.npmjs.org/zod/-/zod-3.25.76.tgz",
			"integrity": "sha512-gzUt/qt81nXsFGKIFcC3YnfEAx5NkunCfnDlvuBSSFS02bcXu4Lmea0AFIUwbLWxWPx3d9p8S5QoaujKcNQxcQ==",
			"dev": true,
			"license": "MIT",
			"funding": {
				"url": "https://github.com/sponsors/colinhacks"
			}
		},
		"node_modules/zustand": {
			"version": "5.0.6",
			"resolved": "https://registry.npmjs.org/zustand/-/zustand-5.0.6.tgz",
			"integrity": "sha512-ihAqNeUVhe0MAD+X8M5UzqyZ9k3FFZLBTtqo6JLPwV53cbRB/mJwBI0PxcIgqhBBHlEs8G45OTDTMq3gNcLq3A==",
			"license": "MIT",
			"engines": {
				"node": ">=12.20.0"
			},
			"peerDependencies": {
				"@types/react": ">=18.0.0",
				"immer": ">=9.0.6",
				"react": ">=18.0.0",
				"use-sync-external-store": ">=1.2.0"
			},
			"peerDependenciesMeta": {
				"@types/react": {
					"optional": true
				},
				"immer": {
					"optional": true
				},
				"react": {
					"optional": true
				},
				"use-sync-external-store": {
					"optional": true
				}
			}
		}
	}
}



/* ===== FILE: \ps-ps\server.ts ===== */

const port = 8891;

Bun.serve({
	port,
	async fetch(req) {
		const url = new URL(req.url);
		let pathname = url.pathname;

		// ルートパスの場合はindex.htmlを返す
		if (pathname === '/') {
			pathname = '/index.html';
		}

		// ファイルパスを構築
		const filePath = `./dist${pathname}`;
		const file = Bun.file(filePath);

		// ファイルが存在するかチェック
		if (await file.exists()) {
			return new Response(file);
		}

		// SPAのフォールバック（存在しないパスはindex.htmlを返す）
		return new Response(Bun.file('./dist/index.html'));
	},
});

console.log(`Server running at http://localhost:${port}`);



/* ===== FILE: \ps-ps\src\components\EmptyState.tsx ===== */

import type { LucideIcon } from 'lucide-react';

/**
 * 空状態表示コンポーネント
 */
export const EmptyState = ({
	icon: Icon,
	label,
}: {
	icon: LucideIcon;
	label: string;
}) => {
	return (
		<div className="text-center text-gray-500">
			<Icon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
			<p>{label}</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\FilterButton.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { Eye, EyeClosed, Funnel, FunnelX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Props<T> {
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	showFilters: boolean;
	setPipAssignedFilters: React.Dispatch<React.SetStateAction<boolean>>;
	pipAssignedFilters: boolean;
	tableInstance: Table<T> | null;
}

/**
 * テーブルの各カラムのフィルタのUIを定義する汎用コンポーネント
 * setShowFilters: フィルタ表示切替のset関数
 * showFilters: フィルタの表示有無
 * tableInstance: TanStack Table のインスタンス
 */
export function FilterButton<T>({
	setShowFilters,
	showFilters,
	tableInstance,
	setPipAssignedFilters,
	pipAssignedFilters,
}: Props<T>) {
	// パスを元に、PIP管理画面に表示すべきではない項目を判断
	const { pathname } = window.location;
	const [isPipDisplay, setIsPipDisplay] = useState(true);
	useEffect(() => {
		setIsPipDisplay(!pathname.includes('pips'));
	}, [pathname]);

	return (
		<div className="flex items-center gap-2">
			<Funnel size={16} />
			<span>:</span>
			{/* 表示/非表示切り替えボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => setShowFilters((prev) => !prev)}
				className="text-gray-800 h-8 w-19 cursor-pointer"
			>
				{showFilters ? (
					<>
						<EyeClosed />
						<span>Hide</span>
					</>
				) : (
					<>
						<Eye />
						<span>Show</span>
					</>
				)}
			</Button>

			{/* PIP未割当フィルター切替ボタン */}
			{isPipDisplay && (
				<Button
					size="sm"
					variant="outline"
					onClick={() => setPipAssignedFilters((prev) => !prev)}
					className="text-gray-800 h-8 w-32 cursor-pointer"
				>
					{pipAssignedFilters ? (
						<>
							<EyeClosed className="mr-1" />
							<span>すべて表示</span>
						</>
					) : (
						<>
							<Eye className="mr-1" />
							<span>PIP未割当のみ</span>
						</>
					)}
				</Button>
			)}

			{/* フィルタークリアボタン */}
			<Button
				size="sm"
				variant="outline"
				onClick={() => tableInstance?.resetColumnFilters()}
				className="text-gray-800 cursor-pointer"
			>
				<FunnelX />
				Clear
			</Button>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\GenericEditableCell.tsx ===== */

import React, { useState } from 'react';

/**
 * セル描画ロジック（表示 or 編集 input を切り替え）
 * isEditing: 編集モードかどうか
 * value: セルに表示する値（任意の型）
 * isDirty: 変更済みのセルかどうか（ハイライト用）
 * onChange: 編集後の変更通知関数（オプション）
 */
export const GenericEditableCell = React.memo(
	({
		isEditing,
		value,
		isDirty,
		onChange,
		columType,
		// エラーメッセージ紐づけ
		//itemNo,
		//rowIndex,
	}: {
		isEditing: boolean;
		value: unknown;
		isDirty?: boolean;
		onChange?: (val: unknown) => void;
		columType?: string;
		itemNo?: string;
		rowIndex?: number;
	}) => {
		// 値が Date の場合は日付文字列に、それ以外はそのまま文字列化（null/undefined は空）
		const display =
			value instanceof Date ? value.toLocaleString() : String(value ?? '');

		const [isError] = useState(false);

		//useEffect(() => {
		// // 背景色: 赤のリセット
		// setIsError(false);
		// // 位置を特定するキー
		// const key = `${rowIndex}_${columType}`;
		// if (columType === 'coreItemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CoreItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'costElement' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「CostElement」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'ibsCode' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「IbsCode」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemName' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemName」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'itemNo' && value === '') {
		// 	setErrorMessage((prev: Record<string, string>) => ({
		// 		...prev,
		// 		[key as string]: `Item·No: ${itemNo}「ItemNo」の値が不正です: 値を入力してください。`,
		// 	}));
		// 	setIsError(true);
		// } else if (columType === 'qty') {
		// 	if (value === '') {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 値を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else if (!/^[1-9]\d*$/.test(value as string)) {
		// 		setErrorMessage((prev: Record<string, string>) => ({
		// 			...prev,
		// 			[key as string]: `Item·No: ${itemNo}「Qty」の値が不正です: 整数を入力してください。`,
		// 		}));
		// 		setIsError(true);
		// 	} else {
		// 		// 該当キーのエラーメッセージリセット
		// 		if (typeof itemNo !== 'undefined') {
		// 			setErrorMessage((prev: Record<string, string>) => {
		// 				const newErrors = { ...prev };
		// 				delete newErrors[key];
		// 				return newErrors;
		// 			});
		// 		}
		// 	}
		// } else {
		// 	// 該当キーのエラーメッセージリセット
		// 	if (typeof itemNo !== 'undefined') {
		// 		setErrorMessage((prev: Record<string, string>) => {
		// 			const newErrors = { ...prev };
		// 			delete newErrors[key];
		// 			return newErrors;
		// 		});
		// 	}
		// }
		//}, [value]);

		// isDirty が true のとき背景色でハイライト
		const dirtyClass = isError ? 'bg-red-100' : isDirty ? 'bg-yellow-100' : '';

		// PIP割当ステータス列の背景色
		const getBackgroundClass = (display: string) => {
			switch (display) {
				case '割当済':
					return 'bg-gray-200 text-gray-800';
				case '一部割当済':
					return 'bg-yellow-200 text-yellow-800';
				case '未割当':
					return 'bg-green-200 text-green-800';
				default:
					return 'bg-white text-black';
			}
		};

		// 編集モード中は input を表示
		return isEditing && columType !== 'pipCode' ? (
			<input
				className={`h-6 px-1 py-0 text-xs border-gray-300 border rounded w-full ${dirtyClass}`}
				value={display}
				onChange={(e) => onChange?.(e.target.value)}
			/>
		) : columType === 'pipCode' ? (
			//pip割当ステータスはスパンで表示
			<span
				className={`text-xs px-2 ${dirtyClass} ${getBackgroundClass(display)}`}
			>
				{display}
			</span>
		) : (
			// それ以外は文字列スパンで表示
			<span className={`text-xs px-2 ${dirtyClass}`}>{display}</span>
		);
	},
);



/* ===== FILE: \ps-ps\src\components\generic-table\GenericEditableTable.tsx ===== */

import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IndeterminateCheckbox } from '../ui/IndeterminateCheckbox';
import { GenericEditableCell } from './GenericEditableCell';
import { GenericTableFilter } from './GenericTableFilter';
import type { GenericEditableTableProps } from './types';
import { useGenericTable } from './useGenericTable';

/**
 * 編集・選択・フィルター対応＋仮想スクロール内包の汎用テーブル
 * 各Propsのコメントは上記のProps型定義参照
 */
export function GenericEditableTable<TData>(
	props: GenericEditableTableProps<TData>,
) {
	// Props の分割代入
	const {
		isEditing = false,
		showCheckbox = false,
		showFilters = true,
		renderCell,
		disableEditing = false,
		disableSelection = false,
		customFilterPlaceholders = {},
		numericFilterColumns = [],
		onRowClick,
		clickedRowId,
	} = props;

	// ========================================
	// カスタムフックでロジックを管理
	// ========================================

	/**
	 * useGenericTable フックを使用してテーブルのロジックを管理
	 *
	 * このフックは以下を提供：
	 * - テーブルインスタンス
	 * - 仮想スクロール設定
	 * - 行データとヘルパー関数
	 * - 状態管理
	 */
	const {
		table,
		scrollContainerRef,
		virtualItems,
		paddingTop,
		paddingBottom,
		rows,
		getRowId,
		getCellValue,
		isCellDirty,
		handleCellChange,
		allColumns,
	} = useGenericTable(props);

	// ========================================
	// レンダリング
	// ========================================

	return (
		<div className="bg-white rounded-lg border border-gray-300 h-full flex flex-col shadow-sm">
			<div ref={scrollContainerRef} className="overflow-auto rounded-lg">
				<table className="rounded-lg w-full">
					{/* 列ごとの幅指定 */}
					<colgroup>
						{!disableSelection && showCheckbox && <col style={{ width: 36 }} />}
						{allColumns.map((col) => (
							<col key={col.id} style={{ width: col.getSize() }} />
						))}
					</colgroup>

					{/* テーブルヘッダー + 列フィルター */}
					<thead className="sticky top-0 bg-gray-50 border-b">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{/* 左端：選択列（全選択チェックボックス） */}
								{!disableSelection && showCheckbox && (
									<th className="pl-4 py-2 text-left text-xs text-gray-800">
										<IndeterminateCheckbox
											checked={table.getIsAllRowsSelected()}
											indeterminate={table.getIsSomeRowsSelected()}
											onChange={table.getToggleAllRowsSelectedHandler()}
											className="bg-white"
										/>
									</th>
								)}

								{/* ヘッダー各列（ソート + フィルタ）*/}
								{hg.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left text-xs font-medium text-gray-700 tracking-wide cursor-pointer"
										onClick={header.column.getToggleSortingHandler()}
										style={{ width: header.getSize() ?? 150 }}
										title={
											header.column.getCanSort()
												? header.column.getNextSortingOrder() === 'asc'
													? '昇順ソート'
													: header.column.getNextSortingOrder() === 'desc'
														? '降順ソート'
														: 'ソート解除'
												: undefined
										}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() === 'asc' && (
											<ChevronUp className="w-4 h-4 inline ml-1" />
										)}
										{header.column.getIsSorted() === 'desc' && (
											<ChevronDown className="w-4 h-4 inline ml-1" />
										)}

										{/* フィルター入力欄 */}
										{header.column.getCanFilter() && showFilters && (
											<div className="pt-1">
												<GenericTableFilter
													column={header.column}
													customPlaceholders={customFilterPlaceholders}
													numericColumns={numericFilterColumns}
												/>
											</div>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* ボディ（仮想スクロール + セル描画） */}
					<tbody>
						{/* 上部パディング */}
						{paddingTop > 0 && (
							<tr style={{ height: `${paddingTop}px` }}>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
								/>
							</tr>
						)}

						{/* 実際のレンダリング対象行 */}
						{virtualItems.map((vi) => {
							const row = rows[vi.index];
							const rowId = getRowId(row.original);
							return (
								<tr
									key={row.id}
									className={cn(
										'border-b border-gray-100 transition-colors',
										clickedRowId === row.id
											? 'bg-yellow-100'
											: 'hover:bg-gray-50 bg-white',
									)}
									style={{ height: `${vi.size}px` }}
									onClick={() => {
										onRowClick?.(row.original, row.id);
									}}
								>
									{/* 選択列 */}
									{!disableSelection && showCheckbox && (
										<td
											className="pl-4 py-2 text-left text-xs text-gray-800"
											onClick={(e) => e.stopPropagation()}
										>
											<IndeterminateCheckbox
												checked={row.getIsSelected()}
												indeterminate={row.getIsSomeSelected()}
												onChange={row.getToggleSelectedHandler()}
												aria-label={`行 ${rowId} を選択`}
											/>
										</td>
									)}

									{/* データセル */}
									{row.getVisibleCells().map((cell) => {
										const colId = cell.column.id;
										const originalValue = row.getValue(colId);
										const value = getCellValue(rowId, colId, originalValue);
										const isDirty = isCellDirty(rowId, colId);

										const customClass = renderCell?.({
											row: row.original,
											columnId: colId,
											value,
										});

										return (
											<td
												key={cell.id}
												className={`px-2 py-1 align-top ${customClass ?? ''}`}
											>
												<GenericEditableCell
													isEditing={!disableEditing && isEditing}
													value={value}
													isDirty={isDirty}
													onChange={(newValue: string) =>
														handleCellChange(rowId, colId, newValue)
													}
													// カラム種類がPIPコードの場合はラベルとする
													columType={colId}
													itemNo={rowId}
													rowIndex={row.index}
												/>
											</td>
										);
									})}
								</tr>
							);
						})}

						{/* 下部パディング */}
						{paddingBottom > 0 && (
							<tr style={{ height: `${paddingBottom}px` }}>
								<td
									colSpan={
										allColumns.length +
										(!disableSelection && showCheckbox ? 1 : 0)
									}
								/>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\GenericReadonlyControl.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { FilterButton } from '../FilterButton';

/**
 * 読み取り専用テーブルの操作ボタン群を表示する汎用コンポーネント
 * title: テーブルの上部に表示するタイトル（任意）
 * data: テーブルに表示される元データの配列
 * isFilterActive: フィルター機能が有効かどうか（true の場合、フィルターボタンと件数表示を表示）
 * tableInstance: TanStack Table のインスタンス
 * filteredCount: フィルター適用後の表示件数（例：検索結果の件数）
 * showFilters: フィルター入力欄の表示状態（true で表示）
 * setShowFilters: フィルター表示状態を切り替えるための setter 関数
 */
export function GenericReadonlyControl<T>({
	title,
	data,
	isFilterActive,
	tableInstance,
	filteredCount,
	showFilters,
	setShowFilters,
}: {
	title?: string;
	data: T[];
	isFilterActive: boolean;
	tableInstance: Table<T> | null;
	filteredCount: number;
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className="flex-shrink-0">
			{/* タイトル */}
			{title && <h2 className="text-md text-gray-800">{title}</h2>}

			{/* ボタンエリア */}
			{isFilterActive && (
				<div className="flex items-end justify-between mt-2">
					{/* フィルタ */}
					<FilterButton
						setShowFilters={setShowFilters}
						showFilters={showFilters}
						tableInstance={tableInstance}
					/>

					{/* 件数表示（フィルター後 / 全体） */}
					<span className="text-sm text-gray-600">
						count: {filteredCount} / {data.length}
					</span>
				</div>
			)}
		</div>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\GenericTableFilter.tsx ===== */

import type { Column } from '@tanstack/react-table';
import { Input } from '../ui/input';

/**
 * 数値・文字列による列フィルター UI を提供する汎用コンポーネント
 * column: フィルターを適用する対象の列。TanStack Table の Column オブジェクト
 * customPlaceholders: 列ごとにカスタムプレースホルダーを指定するためのマッピング
 * numericColumns: 数値フィルターを適用する列IDの配列
 */
export function GenericTableFilter<T>({
	column,
	customPlaceholders = {},
	numericColumns = [],
}: {
	column: Column<T, unknown>; // 対象の列
	customPlaceholders?: Partial<Record<string, string>>;
	numericColumns?: string[];
}) {
	// 現在のフィルター値（string または number）
	const columnFilterValue = column.getFilterValue();
	// 列id
	const columnId = column.id;

	const currentFilter =
		typeof columnFilterValue === 'string' ||
		typeof columnFilterValue === 'number'
			? String(columnFilterValue)
			: '';

	// customPlaceholders に列IDが含まれていればその値を使用し、なければデフォルト文言を使用
	const placeholder = customPlaceholders[columnId] ?? `Filter ${columnId}...`;

	// この列が数値フィルター対象かどうかを判定
	const isNumeric = numericColumns.includes(columnId);

	return (
		<>
			{/* 文字列列の場合：通常の文字列検索フィルターを表示 */}
			{/* 数値の場合：カウンターを表示 */}
			<Input
				type={isNumeric ? 'number' : 'text'}
				className="h-6 text-xs px-1 rounded-sm bg-white placeholder:font-light"
				placeholder={placeholder}
				value={currentFilter}
				onClick={(e) => e.stopPropagation()}
				onChange={(e) => column.setFilterValue(e.target.value || undefined)}
				min={isNumeric ? 0 : undefined}
			/>
		</>
	);
}



/* ===== FILE: \ps-ps\src\components\generic-table\types.ts ===== */

import type { ColumnDef, Table } from '@tanstack/react-table';
import type React from 'react';

/**
 * GenericEditableTable コンポーネントのProps型定義
 *
 * 汎用的な編集可能テーブルを実現するための設定を定義します。
 * 行の一意識別、データの表示、編集、選択、フィルタリングなど
 * 多様な機能を制御するためのプロパティを含みます。
 *
 * @template TData - テーブルに表示するデータの型
 */
export type GenericEditableTableProps<TData> = {
	/**
	 * 各行の一意識別子となるフィールド名
	 *
	 * 例: 'id', 'itemNo', 'userId' など
	 */
	keyField: keyof TData;

	/**
	 * テーブルに表示するデータ配列
	 *
	 * 各要素は TData 型に準拠し、keyField で指定されたフィールドを
	 * 必ず含む必要がある。
	 */
	data: TData[];

	/**
	 * テーブルの列定義（TanStack Table の ColumnDef 型）
	 *
	 * 各列のヘッダー、アクセサー、セルの表示方法などを定義します。
	 * @see https://tanstack.com/table/latest/docs/api/core/column-def
	 */
	columns: ColumnDef<TData>[];

	/**
	 * 編集モードかどうか
	 *
	 * true の場合：
	 * - セルがクリック可能になり、入力フィールドが表示される
	 * - 変更は dirtyCells に一時保存される
	 * - disableEditing が true の場合は無視される
	 *
	 * @default false
	 */
	isEditing?: boolean;

	/**
	 * 行選択用のチェックボックス列を表示するかどうか
	 *
	 * true の場合：
	 * - 最左列にチェックボックスが表示される
	 * - ヘッダーには全選択チェックボックスが表示される
	 * - disableSelection が true の場合は無視される
	 *
	 * @default false
	 */
	showCheckbox?: boolean;

	/**
	 * 列ごとのフィルター入力欄を表示するかどうか
	 *
	 * true の場合：
	 * - 各列のヘッダー下部にフィルター入力欄が表示される
	 *
	 * @default true
	 */
	showFilters?: boolean;

	/**
	 * 編集されたセルの差分を保持するマッピング
	 *
	 * 構造: { [行ID]: { [列ID]: 新しい値 } }
	 */
	dirtyCells?: Record<string, Partial<Record<keyof TData, unknown>>>;

	/**
	 * dirtyCells を更新するための setter
	 *
	 * セルの編集時に自動的に呼び出され、変更内容を記録。
	 */
	setDirtyCells?: React.Dispatch<
		React.SetStateAction<Record<string, Partial<TData>>>
	>;

	/**
	 * 行ごとの選択状態
	 *
	 * 構造: { [行ID]: 選択されているか }
	 */
	rowSelection?: Record<string, boolean>;

	/**
	 * rowSelection を更新するための setter
	 *
	 * チェックボックスのクリック時に自動的に呼び出される。
	 */
	setRowSelection?: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>;

	/**
	 * 選択された行数が変化したときに通知するコールバック
	 *
	 * 親コンポーネントで選択数を表示したり、
	 * 一括操作ボタンの有効/無効を制御するのに使用する。
	 *
	 * @param count - 現在選択されている行数
	 */
	onSelectedRowCountChange?: (count: number) => void;

	/**
	 * フィルター適用後の行数が変化したときに通知するコールバック
	 *
	 * 検索結果の件数表示や、「該当なし」メッセージの表示制御に使用する。
	 *
	 * @param count - フィルター適用後の表示行数
	 */
	onFilteredCountChange?: (count: number) => void;

	/**
	 * セルごとにカスタムクラス名を返す関数
	 *
	 * 特定の条件に基づいてセルのスタイルを動的に変更する際に使用する。
	 *
	 * @param params - セルの情報
	 * @param params.row - 行データ
	 * @param params.columnId - 列ID
	 * @param params.value - セルの値
	 * @returns 適用するクラス名（undefined の場合は追加クラスなし）
	 */
	renderCell?: (params: {
		row: TData;
		columnId: string;
		value: unknown;
	}) => string | undefined;

	/**
	 * 編集を無効化するか
	 *
	 * true の場合：
	 * - isEditing の値に関わらず、すべてのセルが読み取り専用になる
	 *
	 * @default false
	 */
	disableEditing?: boolean;

	/**
	 * 行選択機能を無効化するか
	 *
	 * true の場合：
	 * - showCheckbox の値に関わらず、チェックボックス列が非表示になる
	 *
	 * @default false
	 */
	disableSelection?: boolean;

	/**
	 * 列ごとのフィルター入力欄のプレースホルダーをカスタマイズ
	 *
	 * キー: 列ID
	 * 値: プレースホルダーテキスト
	 */
	customFilterPlaceholders?: Partial<Record<string, string>>;

	/**
	 * 数値フィルターを適用する列IDの配列
	 *
	 * 文字列フィルターと区別。
	 * ここで指定された列は数値入力フィールドになり、数値比較により、フィルタリング。
	 *
	 * 例: ['qty', 'price', 'stock']
	 */
	numericFilterColumns?: string[];

	/**
	 * テーブルインスタンスが準備完了したときに親へ通知するコールバック
	 *
	 * @param tableInstance - TanStack Table のインスタンス
	 */
	onTableReady?: (tableInstance: Table<TData>) => void;

	/**
	 * 行クリック時の処理
	 *
	 * 行全体をクリック可能にし、詳細画面への遷移や
	 * 選択状態の切り替えなどを実装する際に使用。
	 *
	 * @param row - クリックされた行のデータ
	 * @param rowId - クリックされた行のID（keyField の値）
	 */
	onRowClick?: (row: TData, rowId: string | null) => void;

	/**
	 * 現在クリック（選択）されている行のID
	 */
	clickedRowId?: string | null;
};

/**
 * 仮想スクロール設定の型
 *
 * パフォーマンス最適化のための仮想スクロール機能の設定を定義
 */
export interface VirtualizerConfig {
	/** 1行の推定高さ（ピクセル） */
	estimateSize: number;
	/** 表示領域外に先読みする行数 */
	overscan: number;
}

/**
 * テーブルの内部状態を管理する型
 *
 * コンポーネント内部で使用する状態の型定義
 */
export interface TableInternalState {
	/** 現在のソート状態 */
	sorting: import('@tanstack/react-table').SortingState;
}



/* ===== FILE: \ps-ps\src\components\generic-table\useGenericTable.ts ===== */

import {
	// type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	// type Table,
	useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef, useState } from 'react';
import type { GenericEditableTableProps, VirtualizerConfig } from './types';

/**
 * 仮想スクロールのデフォルト設定
 */
const DEFAULT_VIRTUALIZER_CONFIG: VirtualizerConfig = {
	estimateSize: 40, // 標準的な行の高さ
	overscan: 10, // 前後10行を先読み
};

/**
 * GenericEditableTable のロジックを管理するカスタムフック
 *
 * @template TData - テーブルに表示するデータの型
 * @param props - GenericEditableTable と同じProps
 * @returns テーブル操作に必要な値とハンドラー
 */
export function useGenericTable<TData>(
	props: GenericEditableTableProps<TData>,
) {
	// Props の分割代入
	const {
		data,
		columns,
		rowSelection = {},
		setRowSelection,
		disableSelection = false,
		onSelectedRowCountChange,
		onFilteredCountChange,
		onTableReady,
	} = props;

	// ========================================
	// 内部状態の管理
	// ========================================

	/**
	 * ソート状態の管理
	 *
	 * 各列のソート方向（昇順/降順/なし）を保持。
	 */
	const [sorting, setSorting] = useState<SortingState>([]);

	// ========================================
	// テーブルインスタンスの作成
	// ========================================

	/**
	 * TanStack Table のインスタンスを作成
	 */
	const table = useReactTable({
		// 基本設定
		data, // 表示するデータ配列（TData[]）
		columns, // 列定義（ColumnDef<TData>[]）

		// 状態管理
		state: {
			rowSelection, // 行選択の状態（選択された行のIDを保持）
			sorting, // ソート状態（列ごとの昇順・降順など）
		},

		// コア機能
		getCoreRowModel: getCoreRowModel(), // フィルターやソート前の基本的な行モデルを取得
		getFilteredRowModel: getFilteredRowModel(), // フィルター適用後の行モデルを取得
		getSortedRowModel: getSortedRowModel(), // ソート適用後の行モデルを取得

		// イベントハンドラー
		onRowSelectionChange: setRowSelection, // 行選択状態が変更されたときに呼ばれるコールバック
		onSortingChange: setSorting, // ソート状態が変更されたときに呼ばれるコールバック

		// 機能の有効/無効
		enableRowSelection: !disableSelection, // 行選択を有効にするかどうか（チェックボックス列の表示制御）
		enableSorting: true, // ソート機能を有効にする（列ヘッダークリックで昇順・降順切り替え）
	});

	// ========================================
	// 副作用: 選択数・フィルター数の通知
	// ========================================

	// チェックボックスがtrueのレコード数
	const selectedRowCount = table.getSelectedRowModel().rows.length;
	// フィルタ後のレコード数
	const filteredRowCount = table.getFilteredRowModel().rows.length;

	const rows = table.getRowModel().rows;

	// ========================================
	// 仮想スクロールの設定
	// ========================================

	/**
	 * スクロールコンテナの参照
	 */
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	/**
	 * 仮想スクローラーの初期化
	 */
	const virtualizer = useVirtualizer({
		count: rows.length, // 全行数
		getScrollElement: () => scrollContainerRef.current, // スクロール要素
		estimateSize: () => DEFAULT_VIRTUALIZER_CONFIG.estimateSize, // 行の推定高さ
		overscan: DEFAULT_VIRTUALIZER_CONFIG.overscan, // 先読み行数
	});

	/**
	 * 現在表示すべき仮想アイテムとパディング
	 */

	// 現在表示すべき仮想アイテムを取得
	const virtualItems = virtualizer.getVirtualItems();

	// スクロール位置に応じたパディングを計算
	const paddingTop = virtualItems[0]?.start ?? 0;
	const paddingBottom =
		virtualizer.getTotalSize() -
		(virtualItems[virtualItems.length - 1]?.end ?? 0);

	// ========================================
	// 副作用: 外部への通知
	// ========================================

	/**
	 * 選択件数・フィルター件数を親コンポーネントに通知
	 */
	useEffect(() => {
		// 行選択が有効な場合のみ選択数を通知
		if (!disableSelection) {
			onSelectedRowCountChange?.(selectedRowCount);
		}
		// フィルター適用後の件数は常に通知
		onFilteredCountChange?.(filteredRowCount);
	}, [
		selectedRowCount,
		filteredRowCount,
		onSelectedRowCountChange,
		onFilteredCountChange,
		disableSelection,
	]);

	/**
	 * テーブルインスタンスを親コンポーネントに公開
	 */
	useEffect(() => {
		onTableReady?.(table);
	}, [table, onTableReady]);

	// ========================================
	// ユーティリティ関数
	// ========================================

	/**
	 * 行IDを取得するヘルパー関数
	 *
	 * keyField の値を文字列に変換して返却。
	 *
	 * @param rowData - 行データ
	 * @returns 行の一意識別子（文字列）
	 */
	const getRowId = (rowData: TData): string => {
		return String(rowData[props.keyField]);
	};

	/**
	 * セルの値を取得するヘルパー関数
	 *
	 * 編集された値（dirtyCells）があればそれを、なければ元の値を返却。
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @param originalValue - 元の値
	 * @returns 表示すべき値
	 */
	const getCellValue = (
		rowId: string,
		columnId: string,
		originalValue: unknown,
	): unknown => {
		const dirtyValue = props.dirtyCells?.[rowId]?.[columnId as keyof TData];
		return dirtyValue ?? originalValue;
	};

	/**
	 * セルの編集状態を判定するヘルパー関数
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @returns 編集済み（dirty）かどうか
	 */
	const isCellDirty = (rowId: string, columnId: string): boolean => {
		return props.dirtyCells?.[rowId]?.[columnId as keyof TData] !== undefined;
	};

	/**
	 * セル値変更ハンドラー
	 *
	 * セルの値が変更されたときに呼び出され、
	 * dirtyCells を更新。
	 *
	 * @param rowId - 行ID
	 * @param columnId - 列ID
	 * @param newValue - 新しい値
	 */
	const handleCellChange = (
		rowId: string,
		columnId: string,
		newValue: unknown,
	): void => {
		props.setDirtyCells?.((prev) => ({
			...prev,
			[rowId]: {
				...prev[rowId],
				[columnId]: newValue,
			},
		}));
	};

	// ========================================
	// 公開するAPI
	// ========================================

	return {
		// テーブルインスタンス
		table,

		// 仮想スクロール関連
		scrollContainerRef,
		virtualizer,
		virtualItems,
		paddingTop,
		paddingBottom,

		// 行データ
		rows,

		// 状態
		sorting,
		selectedRowCount,
		filteredRowCount,

		// ヘルパー関数
		getRowId,
		getCellValue,
		isCellDirty,
		handleCellChange,

		// 列情報
		allColumns: table.getAllLeafColumns(),
	};
}

/**
 * useGenericTable フックの戻り値の型
 *
 * 型推論を助けるための明示的な型定義
 */
export type UseGenericTableReturn<TData> = ReturnType<
	typeof useGenericTable<TData>
>;



/* ===== FILE: \ps-ps\src\components\index.ts ===== */

export { EmptyState } from './EmptyState';
export { FilterButton } from './FilterButton';
export { GenericEditableTable } from './generic-table/GenericEditableTable';
export { GenericReadonlyControl } from './generic-table/GenericReadonlyControl';
export { Message } from './Message';
export { Topbar } from './Topbar';



/* ===== FILE: \ps-ps\src\components\Message.tsx ===== */

/**
 * ヘッダーに表示するメッセージコンポーネント
 */
export const Message = () => {
	return (
		<div className="bg-white max-w-screen w-full z-40 shadow-sm h-8 mx-auto lg:px-8 flex items-center text-sm">
			<p className="text-gray-800">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				　利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\Pip-data-card\CardActionGroup.tsx ===== */

/**
 * CardActionGroup - 共通アクションボタングループコンポーネント
 *
 * PipDataCard 内で使用するアクションボタン群の共通実装。
 *
 * 主な機能:
 * - アクションボタンの統一レンダリング
 * - ローディング状態とスピナー表示
 * - 無効状態のスタイル管理
 * - バリエーション別スタイル適用（default/danger/ghost）
 */

import { clsx } from 'clsx';
import { memo, useId } from 'react';
import { twMerge } from 'tailwind-merge';
import type { CardAction } from '@/types/pipDataCard';
import { ACTION_STYLES, COMMON_CLASSES } from './constants';

interface CardActionGroupProps {
	/** アクション配列 */
	actions: CardAction[];
	/** 親クリックイベントの伝播を停止するかどうか */
	stopPropagation?: boolean;
	/** 追加クラス名 */
	className?: string;
}

/**
 * CardActionGroup コンポーネント
 *
 * @param actions - 表示するアクション配列
 * @param stopPropagation - クリック時の親要素への伝播を停止するか（デフォルト: false）
 * @param className - 追加の CSS クラス
 */
export const CardActionGroup = memo<CardActionGroupProps>(
	({ actions, stopPropagation = false, className }) => {
		// 安定したキー生成用の ID を取得
		const baseId = useId();

		// アクションが空の場合は何も表示しない
		if (actions.length === 0) return null;

		return (
			<div className={twMerge(clsx('flex items-center gap-1', className))}>
				{actions.map((action, index) => (
					<button
						key={`${baseId}-${action.id}-${index}`}
						type="button"
						onClick={(e) => {
							if (stopPropagation) {
								e.stopPropagation();
							}
							action.onClick();
						}}
						disabled={action.disabled || action.loading}
						title={action.tooltip}
						className={twMerge(
							clsx(
								COMMON_CLASSES.action,
								ACTION_STYLES[action.variant || 'default'],
								{
									'opacity-50 cursor-not-allowed': action.disabled,
								},
							),
						)}
					>
						{action.loading ? (
							<div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
						) : (
							action.icon
						)}
					</button>
				))}
			</div>
		);
	},
);

CardActionGroup.displayName = 'CardActionGroup';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\constants.tsx ===== */

/**
 * PipDataCard 定数定義
 * カラーバリエーションとスタイル設定を管理する
 */

import { Building2, Package, PackagePlus } from 'lucide-react';
import type { PipCardVariant } from '@/types/pipDataCard';

/**
 * バリアントスタイル定義
 */
export const VARIANT_STYLES: Record<
	PipCardVariant,
	{
		iconGradient: string;
		borderColor: string;
		backgroundColor: string;
		selectedColor: string;
		hoverColor: string;
	}
> = {
	item: {
		iconGradient: 'bg-gradient-to-br from-blue-500 to-blue-600',
		borderColor: 'border-blue-200',
		backgroundColor: 'bg-blue-50',
		selectedColor: 'ring-blue-500',
		hoverColor: 'hover:bg-blue-100',
	},
	vendor: {
		iconGradient: 'bg-gradient-to-br from-purple-500 to-pink-600',
		borderColor: 'border-purple-200',
		backgroundColor: 'bg-purple-50',
		selectedColor: 'ring-purple-500',
		hoverColor: 'hover:bg-purple-100',
	},
	generatedItem: {
		iconGradient: 'bg-gradient-to-br from-green-500 to-green-600',
		borderColor: 'border-green-200',
		backgroundColor: 'bg-green-50',
		selectedColor: 'ring-green-500',
		hoverColor: 'hover:bg-green-100',
	},
};

/**
 * バリアント別アイコン取得関数
 */
export const getVariantIcon = (variant: PipCardVariant) => {
	switch (variant) {
		case 'item':
			return <Package className="w-5 h-5 text-white" />;
		case 'vendor':
			return <Building2 className="w-5 h-5 text-white" />;
		case 'generatedItem':
			return <PackagePlus className="w-5 h-5 text-white" />;
		default:
			return <Package className="w-5 h-5 text-white" />;
	}
};

/**
 * サイズスタイル定義
 */
export const SIZE_STYLES = {
	compact: {
		card: 'p-3',
		header: 'text-sm',
		content: 'text-xs',
		icon: 'w-8 h-8',
	},
	default: {
		card: 'p-4',
		header: 'text-base',
		content: 'text-sm',
		icon: 'w-10 h-10',
	},
	comfortable: {
		card: 'p-6',
		header: 'text-lg',
		content: 'text-base',
		icon: 'w-12 h-12',
	},
} as const;

/**
 * アクションバリアントスタイル
 */
export const ACTION_STYLES = {
	default: 'hover:bg-gray-100 text-gray-600',
	danger: 'hover:bg-red-100 text-red-600',
	ghost: 'hover:bg-transparent text-gray-400',
} as const;

/**
 * 共通クラス定義
 */
export const COMMON_CLASSES = {
	card: 'rounded-lg border shadow-sm transition-all duration-200',
	cardHover: 'hover:shadow-md',
	header: 'flex items-center gap-3',
	content: 'border-t pt-4',
	item: 'flex items-center gap-3 p-2 rounded-md transition-colors',
	itemHover: 'hover:bg-gray-50',
	action: 'p-1 rounded transition-colors',
	emptyState: 'flex flex-col items-center justify-center py-8 text-center',
} as const;

/**
 * デフォルト値
 */
export const DEFAULTS = {
	variant: 'item' as PipCardVariant,
	size: 'default' as const,
	maxHeight: '16rem',
} as const;

/**
 * デフォルト空状態アイコン取得関数
 */
export const getDefaultEmptyIcon = () => (
	<Package size={48} className="text-gray-300" />
);



/* ===== FILE: \ps-ps\src\components\Pip-data-card\index.ts ===== */

/**
 * PipDataCard コンポーネント群のエクスポート
 */

// 型定義のエクスポート
export type {
	ActionVariant,
	BaseDisplayItem,
	CardAction,
	EmptyStateConfig,
	InlineEditConfig,
	ItemData,
	PipCardSize,
	PipCardVariant,
	PipData,
	PipDataCardContentProps,
	PipDataCardHeaderProps,
	PipDataCardItemProps,
	PipDataCardProps,
	SelectionActions,
	SelectionState,
	VendorData,
} from '@/types/pipDataCard';

// 内部コンポーネントのインポート
import { PipDataCardRoot } from './PipDataCard';
import { PipDataCardContent } from './PipDataCardContent';
import { PipDataCardHeader } from './PipDataCardHeader';
import { PipDataCardItem } from './PipDataCardItem';

/**
 * PipDataCard 複合コンポーネント
 */
export const PipDataCard = Object.assign(PipDataCardRoot, {
	/** ヘッダーコンポーネント - PIP情報とアクションを表示 */
	Header: PipDataCardHeader,
	/** コンテンツコンポーネント - アイテムリストと空状態を管理 */
	Content: PipDataCardContent,
	/** アイテムコンポーネント - 個別アイテムの表示とインタラクション */
	Item: PipDataCardItem,
});

// 定数とユーティリティ関数（カスタマイズ用）
export {
	ACTION_STYLES,
	COMMON_CLASSES,
	DEFAULTS,
	getDefaultEmptyIcon,
	getVariantIcon,
	SIZE_STYLES,
	VARIANT_STYLES,
} from './constants';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCard.tsx ===== */

/**
 * PipDataCard ルートコンポーネント
 *
 * PIP関連データ表示用のカードコンテナ
 * PipDataCard.Header, PipDataCard.Content, PipDataCard.Item として使用可能。
 *
 * 主な機能:
 * - カードの外観スタイル制御（variant: item/vendor/generatedItem）
 * - サイズ管理（size: compact/default/comfortable）
 */

import { clsx } from 'clsx';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardProps } from '@/types/pipDataCard';
import { COMMON_CLASSES, SIZE_STYLES, VARIANT_STYLES } from './constants';
import { PipDataCardProvider } from './PipDataCardContext';

/**
 * PipDataCardRoot コンポーネント
 *
 * カード全体のコンテナとして機能
 *
 * @param variant - カードの表示バリエーション（デフォルト: "item"）
 * @param size - カードのサイズ（デフォルト: "default"）
 * @param className - 追加の CSS クラス
 * @param children - 子要素（通常は Header, Content, Item の組み合わせ）
 * @param rest - HTML div 要素の標準属性
 */
export const PipDataCardRoot = memo<PipDataCardProps>(
	({ variant = 'item', size = 'default', className, children, ...rest }) => {
		// variant に応じたスタイル設定を取得
		const variantStyles = VARIANT_STYLES[variant];
		const sizeStyles = SIZE_STYLES[size];

		return (
			<PipDataCardProvider variant={variant} size={size}>
				<div
					className={twMerge(
						clsx(
							// 基本的なカードスタイル
							COMMON_CLASSES.card,
							COMMON_CLASSES.cardHover,
							// variant 固有のスタイル
							variantStyles.borderColor,
							variantStyles.backgroundColor,
							variantStyles.hoverColor,
							// サイズ固有のスタイル
							sizeStyles.card,
							// カスタムクラス
							className,
						),
					)}
					{...rest}
				>
					{children}
				</div>
			</PipDataCardProvider>
		);
	},
);

PipDataCardRoot.displayName = 'PipDataCardRoot';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardContent.tsx ===== */

/**
 * PipDataCardContent コンテンツ表示コンポーネント
 * アイテムリストの表示とスクロール制御を行うコンポーネントである
 */

import { clsx } from 'clsx';
import { memo, type ReactElement, useId, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import type {
	BaseDisplayItem,
	PipDataCardContentProps,
} from '@/types/pipDataCard';
import { COMMON_CLASSES, DEFAULTS } from './constants';

/**
 * PipDataCardContent コンポーネント
 * アイテムリストの表示とスクロール制御を行う
 */
export const PipDataCardContent = memo(
	<T extends BaseDisplayItem = BaseDisplayItem>({
		items,
		renderItem,
		emptyState,
		maxHeight = DEFAULTS.maxHeight,
		scrollable = true,
		keyExtractor,
	}: PipDataCardContentProps<T>) => {
		const baseId = useId();
		const hasItems = items.length > 0;

		// スクロール可能なコンテナのスタイル
		const scrollStyles = useMemo(() => {
			if (!scrollable) return '';

			const heightStyle =
				typeof maxHeight === 'number'
					? { maxHeight: `${maxHeight}px` }
					: { maxHeight };

			return twMerge(
				clsx('overflow-y-auto', {
					[`max-h-[${heightStyle.maxHeight}]`]: heightStyle.maxHeight,
				}),
			);
		}, [scrollable, maxHeight]);

		// 空状態の表示
		const renderEmptyState = () => (
			<div className={COMMON_CLASSES.emptyState}>
				{emptyState.icon && <div className="mb-3">{emptyState.icon}</div>}
				<h4 className="text-sm font-medium text-gray-900 mb-1">
					{emptyState.title}
				</h4>
				{emptyState.description && (
					<p className="text-xs text-gray-500 mb-4">{emptyState.description}</p>
				)}
				{emptyState.action && <div>{emptyState.action}</div>}
			</div>
		);

		// アイテムリストの表示
		const renderItemList = () => (
			<div className={twMerge(clsx('space-y-1', scrollStyles))}>
				{items.map((item, index) => {
					const key = keyExtractor
						? keyExtractor(item, index)
						: `${baseId}-${item.id}-${index}`;

					return <div key={key}>{renderItem(item, index)}</div>;
				})}
			</div>
		);

		return (
			<div className={COMMON_CLASSES.content}>
				{hasItems ? renderItemList() : renderEmptyState()}
			</div>
		);
	},
) as <T extends BaseDisplayItem = BaseDisplayItem>(
	props: PipDataCardContentProps<T>,
) => ReactElement;

Object.defineProperty(PipDataCardContent, 'displayName', {
	value: 'PipDataCardContent',
	configurable: true,
});



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardContext.tsx ===== */

/**
 * PipDataCardContext - コンテキスト管理
 * variant と size を子コンポーネント間で共有するためのコンテキストである
 */

import { createContext, type ReactNode, useContext } from 'react';
import type { PipCardSize, PipCardVariant } from '@/types/pipDataCard';

interface PipDataCardContextValue {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
}

const PipDataCardContext = createContext<PipDataCardContextValue | undefined>(
	undefined,
);

interface PipDataCardProviderProps {
	/** カラーバリエーション */
	variant: PipCardVariant;
	/** サイズ */
	size: PipCardSize;
	/** 子要素 */
	children: ReactNode;
}

/**
 * PipDataCardProvider コンポーネント
 * PipDataCard の variant と size を下位コンポーネントに提供する
 */
export const PipDataCardProvider = ({
	variant,
	size,
	children,
}: PipDataCardProviderProps) => {
	return (
		<PipDataCardContext.Provider value={{ variant, size }}>
			{children}
		</PipDataCardContext.Provider>
	);
};

/**
 * usePipDataCardContext フック
 * PipDataCard のコンテキストを取得する
 */
export const usePipDataCardContext = (): PipDataCardContextValue => {
	const context = useContext(PipDataCardContext);
	if (!context) {
		throw new Error(
			'usePipDataCardContext must be used within a PipDataCardProvider',
		);
	}
	return context;
};



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardHeader.tsx ===== */

/**
 * PipDataCardHeader - カードヘッダーコンポーネント
 *
 * PIP基本情報の表示とヘッダーレベルでのアクション管理を担当する。
 * Context から variant/size を自動取得する。
 *
 * 主な機能:
 * - PIP コードと表示名の表示
 * - バリエーション別アイコン表示（item/vendor/generatedItem）
 * - インライン編集機能（タイトルの直接編集）
 * - アクションボタン群の表示（CardActionGroup 使用）
 */

import { clsx } from 'clsx';
import { Edit3 } from 'lucide-react';
import { type KeyboardEvent, memo, useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardHeaderProps } from '@/types/pipDataCard';
import { CardActionGroup } from './CardActionGroup';
import {
	COMMON_CLASSES,
	getVariantIcon,
	SIZE_STYLES,
	VARIANT_STYLES,
} from './constants';
import { usePipDataCardContext } from './PipDataCardContext';

/**
 * PipDataCardHeader コンポーネント
 *
 * @param pipData - PIP基本データ（code, nickname, type）
 * @param actions - ヘッダーレベルのアクション配列
 * @param editable - インライン編集設定（編集可能性、バリデーション、コールバック）
 * @param metadata - 表示メタデータ（アイテム数、ベンダー数）
 */
export const PipDataCardHeader = memo<PipDataCardHeaderProps>(
	({ pipData, actions = [], editable, metadata }) => {
		// Context から variant と size を取得（親の PipDataCard から自動継承）
		const { variant, size } = usePipDataCardContext();
		const [isEditing, setIsEditing] = useState(false);
		const [editValue, setEditValue] = useState(pipData.nickname);

		const variantStyles = VARIANT_STYLES[variant];
		const sizeStyles = SIZE_STYLES[size];

		const handleEditStart = useCallback(() => {
			if (!editable?.enabled) return;
			setIsEditing(true);
			setEditValue(pipData.nickname);
		}, [editable?.enabled, pipData.nickname]);

		const handleEditSave = useCallback(() => {
			if (!editable?.enabled || !editValue.trim()) return;

			if (editable.validation && !editable.validation(editValue)) {
				setEditValue(pipData.nickname);
				setIsEditing(false);
				return;
			}

			editable.onTitleChange(editValue);
			setIsEditing(false);
		}, [editable, editValue, pipData.nickname]);

		const handleEditCancel = useCallback(() => {
			setEditValue(pipData.nickname);
			setIsEditing(false);
		}, [pipData.nickname]);

		const handleKeyDown = useCallback(
			(e: KeyboardEvent<HTMLInputElement>) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					handleEditSave();
				} else if (e.key === 'Escape') {
					e.preventDefault();
					handleEditCancel();
				}
			},
			[handleEditSave, handleEditCancel],
		);

		const renderTitle = () => {
			if (isEditing) {
				return (
					<input
						type="text"
						value={editValue}
						onChange={(e) => setEditValue(e.target.value)}
						onBlur={handleEditSave}
						onKeyDown={handleKeyDown}
						placeholder={editable?.placeholder}
						className={twMerge(
							clsx(
								sizeStyles.header,
								'font-medium bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 -ml-1',
							),
						)}
					/>
				);
			}

			return (
				<div className="flex items-center gap-2">
					<h3 className={twMerge(clsx(sizeStyles.header, 'font-medium'))}>
						{pipData.nickname}
					</h3>
					{editable?.enabled && (
						<button
							type="button"
							onClick={handleEditStart}
							className="p-1 rounded hover:bg-gray-100 transition-colors cursor-pointer"
							title="編集"
						>
							<Edit3 size={12} className="text-gray-400" />
						</button>
					)}
				</div>
			);
		};

		const renderMetadata = () => {
			if (!metadata) return null;

			const items = [];
			if (metadata.itemCount !== undefined) {
				items.push(`${metadata.itemCount}件`);
			}
			if (metadata.vendorCount !== undefined) {
				items.push(`${metadata.vendorCount}社`);
			}

			if (items.length === 0) return null;

			return (
				<span className={twMerge(clsx(sizeStyles.content, 'text-gray-500'))}>
					{items.join(' / ')}
				</span>
			);
		};

		return (
			<div className={twMerge(clsx(COMMON_CLASSES.header, sizeStyles.card))}>
				{/* アイコン */}
				<div
					className={twMerge(
						clsx(
							sizeStyles.icon,
							variantStyles.iconGradient,
							'rounded-lg flex items-center justify-center',
						),
					)}
				>
					{getVariantIcon(variant)}
				</div>

				{/* タイトル部分 */}
				<div className="flex-1 min-w-0">
					{renderTitle()}
					<div className="flex items-center gap-2">
						<span
							className={twMerge(
								clsx(sizeStyles.content, 'text-gray-500 font-mono'),
							)}
						>
							{pipData.code}
						</span>
						{renderMetadata()}
					</div>
				</div>

				{/* アクション */}
				<CardActionGroup actions={actions} className="ml-auto" />
			</div>
		);
	},
);

PipDataCardHeader.displayName = 'PipDataCardHeader';



/* ===== FILE: \ps-ps\src\components\Pip-data-card\PipDataCardItem.tsx ===== */

/**
 * PipDataCardItem 個別アイテム表示コンポーネント
 * カード内の個別アイテムの表示とアクション管理を行うコンポーネントである
 */

import { clsx } from 'clsx';
import { memo, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import type { PipDataCardItemProps } from '@/types/pipDataCard';
import { CardActionGroup } from './CardActionGroup';
import { COMMON_CLASSES } from './constants';

export const PipDataCardItem = memo<PipDataCardItemProps>(
	({
		children,
		prefix,
		actions = [],
		clickable = false,
		selected = false,
		onClick,
		className = '',
	}) => {
		/* ハンドラ */
		const handleClick = useCallback(() => {
			if (clickable && onClick) onClick();
		}, [clickable, onClick]);

		const handleKeyDown = useCallback(
			(e: React.KeyboardEvent) => {
				if (!clickable) return;
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onClick?.();
				}
			},
			[clickable, onClick],
		);

		/* スタイル */
		const baseClasses = twMerge(
			clsx(
				COMMON_CLASSES.item,
				clickable && `${COMMON_CLASSES.itemHover} cursor-pointer`,
				clickable && selected && 'bg-blue-50 ring-1 ring-blue-200',
				className,
			),
		);

		return (
			<div
				role="treeitem" /* ⬅️ インタラクティブなロール */
				aria-selected={selected} /* ⬅️ treeitem は対応アリ */
				tabIndex={clickable ? 0 : -1} /* キーボード操作可否を制御 */
				className={baseClasses}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
			>
				{/* プレフィックス（チェックボックスなど） */}
				{prefix && <div className="flex-shrink-0">{prefix}</div>}

				{/* メインコンテンツ */}
				<div className="flex-1 min-w-0">{children}</div>

				{/* アクションボタン群（内部に <button> 可） */}
				<CardActionGroup
					actions={actions}
					stopPropagation
					className="ml-auto"
				/>
			</div>
		);
	},
);

PipDataCardItem.displayName = 'PipDataCardItem';



/* ===== FILE: \ps-ps\src\components\Topbar.tsx ===== */

import { Link } from '@tanstack/react-router';
import { BellIcon, BookOpenText, CircleUserRound } from 'lucide-react';
import { AppLogo } from '@/features/pip-randing/components';
import type { TopbarProps } from '@/types/Topbar';

/**
 * P-Sys/MARUSEで共有するヘッダーのレイアウトを定義するコンポーネント
 */
export const Topbar: React.FC<TopbarProps> = () => {
	return (
		<div className="bg-indigo-900">
			<div className="max-w-screen mx-auto lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* 左側：ロゴ（P-Sys/MARUSEで切り替え） */}
					<div className="flex items-center">
						<Link to="/ps-ps/item-assignment">
							<AppLogo />
						</Link>
					</div>

					{/* 右側：メニューアイコンエリア */}
					<div className="flex items-center gap-6">
						{/* マニュアル */}
						<BookOpenText size={30} className="text-white" />
						{/* 通知 */}
						<button
							type="button"
							className="relative rounded p-1 hover:bg-indigo-400 cursor-pointer"
						>
							<BellIcon size={30} className="text-white" />
							<span className="absolute -right-0.5 -top-0.5 inline-flex h-2 w-2 rounded-full bg-red-500" />
						</button>
						{/* ユーザ情報 */}
						<CircleUserRound size={30} className="text-white" />
					</div>
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\components\ui\alert.tsx ===== */

import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const alertVariants = cva(
	'relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current',
	{
		variants: {
			variant: {
				default: 'bg-card text-card-foreground',
				destructive:
					'text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Alert({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(alertVariants({ variant }), className)}
			{...props}
		/>
	);
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(
				'col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight',
				className,
			)}
			{...props}
		/>
	);
}

function AlertDescription({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(
				'text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed',
				className,
			)}
			{...props}
		/>
	);
}

export { Alert, AlertTitle, AlertDescription };



/* ===== FILE: \ps-ps\src\components\ui\alertMessages.tsx ===== */

import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type AlertMessageProps = {
	messages: Record<string, string>;
};

export const AlertMessages: React.FC<AlertMessageProps> = ({ messages }) => {
	return (
		<Alert variant="destructive">
			<AlertCircleIcon />
			<AlertTitle />
			<AlertDescription>
				<ul className="list-disc pl-4 space-y-1">
					{Object.entries(messages).map(([_, value], index) => (
						<li key={index}>{value}</li>
					))}
				</ul>
			</AlertDescription>
		</Alert>
	);
};



/* ===== FILE: \ps-ps\src\components\ui\badge.tsx ===== */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
	{
		variants: {
			variant: {
				default:
					'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
				secondary:
					'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
				destructive:
					'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Badge({
	className,
	variant,
	asChild = false,
	...props
}: React.ComponentProps<'span'> &
	VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
	const Comp = asChild ? Slot : 'span';

	return (
		<Comp
			data-slot="badge"
			className={cn(badgeVariants({ variant }), className)}
			{...props}
		/>
	);
}

export { Badge, badgeVariants };



/* ===== FILE: \ps-ps\src\components\ui\button.tsx ===== */

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
				destructive:
					'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
				outline:
					'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
				secondary:
					'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-9 px-4 py-2 has-[>svg]:px-3',
				sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
				lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
				icon: 'size-9',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

function Button({
	className,
	variant,
	size,
	asChild = false,
	...props
}: React.ComponentProps<'button'> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : 'button';

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };



/* ===== FILE: \ps-ps\src\components\ui\card.tsx ===== */

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card"
			className={cn(
				'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
				className,
			)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				'@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
				className,
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn('leading-none font-semibold', className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
				className,
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn('px-6', className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
};



/* ===== FILE: \ps-ps\src\components\ui\checkbox.tsx ===== */

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Checkbox({
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox"
			className={cn(
				'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
				className,
			)}
			{...props}
		>
			<CheckboxPrimitive.Indicator
				data-slot="checkbox-indicator"
				className="flex items-center justify-center text-current transition-none"
			>
				<CheckIcon className="size-3.5" />
			</CheckboxPrimitive.Indicator>
		</CheckboxPrimitive.Root>
	);
}

export { Checkbox };



/* ===== FILE: \ps-ps\src\components\ui\IndeterminateCheckbox.tsx ===== */

import type React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

/**
 * 不確定状態をサポートするチェックボックスコンポーネント
 * checked: 通常のチェック状態（boolean）
 * indeterminate: 中間状態フラグ（true のとき indeterminate 表示にする）
 * onChange:チェック変更時に呼ばれるハンドラ
 * className: スタイルクラス（オプション）
 */
export function IndeterminateCheckbox({
	checked,
	indeterminate,
	onChange,
	className = '',
}: {
	checked: boolean;
	indeterminate?: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}) {
	return (
		<Checkbox
			// `checked` プロパティには true / false / 'indeterminate(中間状態)' のいずれかを渡せる
			checked={indeterminate ? 'indeterminate' : checked}
			onCheckedChange={(val) => {
				const syntheticEvent = {
					target: { checked: Boolean(val) },
				} as React.ChangeEvent<HTMLInputElement>;
				onChange(syntheticEvent);
			}}
			className={className}
		/>
	);
}



/* ===== FILE: \ps-ps\src\components\ui\input.tsx ===== */

import type * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
				'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
				className,
			)}
			{...props}
		/>
	);
}

export { Input };



/* ===== FILE: \ps-ps\src\components\ui\label.tsx ===== */

import * as LabelPrimitive from '@radix-ui/react-label';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Label({
	className,
	...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
	return (
		<LabelPrimitive.Root
			data-slot="label"
			className={cn(
				'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
				className,
			)}
			{...props}
		/>
	);
}

export { Label };



/* ===== FILE: \ps-ps\src\components\ui\select.tsx ===== */

import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Select({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
	return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
	return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
	...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
	return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
	className,
	size = 'default',
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
	size?: 'sm' | 'default';
}) {
	return (
		<SelectPrimitive.Trigger
			data-slot="select-trigger"
			data-size={size}
			className={cn(
				"border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
				className,
			)}
			{...props}
		>
			{children}
			<SelectPrimitive.Icon asChild>
				<ChevronDownIcon className="size-4 opacity-50" />
			</SelectPrimitive.Icon>
		</SelectPrimitive.Trigger>
	);
}

function SelectContent({
	className,
	children,
	position = 'popper',
	...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
	return (
		<SelectPrimitive.Portal>
			<SelectPrimitive.Content
				data-slot="select-content"
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
					position === 'popper' &&
						'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
					className,
				)}
				position={position}
				{...props}
			>
				<SelectScrollUpButton />
				<SelectPrimitive.Viewport
					className={cn(
						'p-1',
						position === 'popper' &&
							'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
					)}
				>
					{children}
				</SelectPrimitive.Viewport>
				<SelectScrollDownButton />
			</SelectPrimitive.Content>
		</SelectPrimitive.Portal>
	);
}

function SelectLabel({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
	return (
		<SelectPrimitive.Label
			data-slot="select-label"
			className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
			{...props}
		/>
	);
}

function SelectItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
	return (
		<SelectPrimitive.Item
			data-slot="select-item"
			className={cn(
				"focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
				className,
			)}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				<SelectPrimitive.ItemIndicator>
					<CheckIcon className="size-4" />
				</SelectPrimitive.ItemIndicator>
			</span>
			<SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
		</SelectPrimitive.Item>
	);
}

function SelectSeparator({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
	return (
		<SelectPrimitive.Separator
			data-slot="select-separator"
			className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
			{...props}
		/>
	);
}

function SelectScrollUpButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
	return (
		<SelectPrimitive.ScrollUpButton
			data-slot="select-scroll-up-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className,
			)}
			{...props}
		>
			<ChevronUpIcon className="size-4" />
		</SelectPrimitive.ScrollUpButton>
	);
}

function SelectScrollDownButton({
	className,
	...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
	return (
		<SelectPrimitive.ScrollDownButton
			data-slot="select-scroll-down-button"
			className={cn(
				'flex cursor-default items-center justify-center py-1',
				className,
			)}
			{...props}
		>
			<ChevronDownIcon className="size-4" />
		</SelectPrimitive.ScrollDownButton>
	);
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
};



/* ===== FILE: \ps-ps\src\components\ui\sheet.tsx ===== */

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Sheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
	return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Trigger>) {
	return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Close>) {
	return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({
	...props
}: React.ComponentProps<typeof SheetPrimitive.Portal>) {
	return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
	return (
		<SheetPrimitive.Overlay
			data-slot="sheet-overlay"
			className={cn(
				'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
				className,
			)}
			{...props}
		/>
	);
}

function SheetContent({
	className,
	children,
	side = 'right',
	...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
	side?: 'top' | 'right' | 'bottom' | 'left';
}) {
	return (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content
				data-slot="sheet-content"
				className={cn(
					'bg-background data-[state=open]:animate-in data-[state=closed]:animate-out fixed z-50 flex flex-col gap-4 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
					side === 'right' &&
						'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
					side === 'left' &&
						'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
					side === 'top' &&
						'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 h-auto border-b',
					side === 'bottom' &&
						'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 h-auto border-t',
					className,
				)}
				{...props}
			>
				{children}
				<SheetPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
					<XIcon className="size-4" />
					<span className="sr-only">Close</span>
				</SheetPrimitive.Close>
			</SheetPrimitive.Content>
		</SheetPortal>
	);
}

function SheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-header"
			className={cn('flex flex-col gap-1.5 p-4', className)}
			{...props}
		/>
	);
}

function SheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="sheet-footer"
			className={cn('mt-auto flex flex-col gap-2 p-4', className)}
			{...props}
		/>
	);
}

function SheetTitle({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Title>) {
	return (
		<SheetPrimitive.Title
			data-slot="sheet-title"
			className={cn('text-foreground font-semibold', className)}
			{...props}
		/>
	);
}

function SheetDescription({
	className,
	...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) {
	return (
		<SheetPrimitive.Description
			data-slot="sheet-description"
			className={cn('text-muted-foreground text-sm', className)}
			{...props}
		/>
	);
}

export {
	Sheet,
	SheetTrigger,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetFooter,
	SheetTitle,
	SheetDescription,
};



/* ===== FILE: \ps-ps\src\constants\messagesList.ts ===== */

const messagesList: Record<string, string> = {
	PIP_SUCCESS: 'PIP生成に成功しました',
	PIP_FAILURE: 'PIP生成に失敗しました',
	PIP_EDIT_SUCCESS: 'PIP編集保存に成功しました',
	PIP_EDIT_FAILURE: 'PIP編集保存に失敗しました',
	SEARCH_FAILURE: '検索に失敗しました',
	AIP_ASSIGNED: 'AIPに割当済みのPIPは削除できません。',
	PIP_DELETE: 'PIPを削除しました',
	SELECT_PROJECT: 'プロジェクトを選択してください',
	SELECT_FG: 'FunctionGroupを選択して下さい',
	ITEM_SUCCESS: '購入品の保存に成功しました',
	ITEM_FAILURE: '購入品の保存に失敗しました',
	AIP_SUCCESS: 'AIP生成に成功しました',
	AIP_FAILURE: 'AIP生成に失敗しました',
};

export default messagesList;



/* ===== FILE: \ps-ps\src\features\item-assignment\components\ItemAssignmentView.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { GenericEditableTable } from '@/components';
import { PipCardArea } from '@/features/item-assignment/components/PipCardArea';
import { ItemTableControls } from '@/features/item-management/components/ItemTableControls';
import { ITEM_FILTER_PLACEHOLDERS } from '@/features/item-management/constants/item-filter-placeholders';
import { getItemColumns } from '@/features/item-management/utils/getItemColumns';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import { SplashWrapper } from '@/features/pip-randing/components';
import { cn } from '@/lib/utils';
import { useAlertStore } from '@/stores/useAlartStore';
import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import { PSysContext } from '../../../routes/ps-ps/route';
import { useItems } from '../hooks/useItems';
// 購入品取得
import { getItemsForItemTable } from '../utils/getItemsForItemTable';

export const ItemAssignmentView: React.FC = () => {
	// コンテキストから値を取得: ItemAssignmentViewを呼び出す際のモード
	const { isItemAssignmentView } = useContext(PSysContext);
	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();

	// アラートの状態
	const { showAlert } = useAlertStore();

	// Display by Selectionの押下状態
	const { triggerState, resetSearchTrigger, triggerResearch } =
		useIsSearchTriggeredStore();

	// 購入品情取得
	const { refetch } = useItems(selectedJobNo, selectedFG?.fgCode);
	const [items, setItems] = useState<Item[]>([]);

	// 購入品取得処理
	useEffect(() => {
		if (triggerState === 'none') return;

		// Display by Selection押下状態をリセット
		resetSearchTrigger();

		const fetchItems = async () => {
			try {
				const result = await refetch(); // 明示的に再フェッチ
				const fetched = result.data;

				if (fetched) {
					// 異常処理: 検索結果が見つからない
					if (typeof fetched.responseJSON === 'string') {
						const parsed = JSON.parse(fetched.responseJSON);
						if (parsed.statusCode === '404') {
							showAlert(['SEARCH_FAILURE']);
							setItems([]);
							return;
						}
					}

					// 正常処理: 購入品取得
					setItems(getItemsForItemTable(fetched));
				}
			} catch (err) {
				console.error('Refetch error:', err);
				showAlert(['SEARCH_FAILURE']);
				setItems([]);
			}
		};

		fetchItems(); // 非同期関数を呼び出す
	}, [triggerState]);

	// チェック列の表示制御（編集モードでは非表示）
	const [showItemCheckbox, setShowItemCheckbox] = useState(false);
	// 編集モードの ON/OFF
	const [isEditingItem, setIsEditingItem] = useState(false);
	// 編集中の差分管理（id ごとの部分更新）
	const [itemDirty, setItemDirty] = useState<Record<string, Partial<Item>>>({});
	// 行の選択状態（割当対象）
	const [itemSelection, setItemSelection] = useState<Record<string, boolean>>(
		{},
	);
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 割当確定後のレコード一覧（チェック→割当ボタン押下で確定）
	const [committedItems, setCommittedItems] = useState<Item[]>([]);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// React Tableのインスタンス フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Item> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);

	// PIP生成モードの状態
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);
	// PIP管理画面から遷移した場合は、初期状態でPIP生成モード表示とする
	const setPipGenerationMode = usePipGenerationModeStore(
		(state) => state.setPipGenerationMode,
	);
	// PIP編集モードの場合は購入品を再検索する
	useEffect(() => {
		if (isItemAssignmentView === 'pipManagement') {
			setPipGenerationMode('generation');

			// 再検索の実施
			triggerResearch();
		}
	}, [isItemAssignmentView]);

	// PIP Nicknameの入力状態を管理
	const [pipNickName, setPipNickName] = useState('');

	// PIPカードエリアの各数量変更状態を管理
	const [selectedQtyMap, setSelectedQtyMap] = useState<Record<string, string>>(
		{},
	);

	/*
	 * 編集中にブラウザ(タブ)を閉じようとすると
	 * 閉じて問題ないかダイヤログで確認
	 */
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = '';
		};

		if (isEditingItem) {
			window.addEventListener('beforeunload', handleBeforeUnload);
		} else {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
		// 値が変更されたときに再実行
	}, [isEditingItem]);

	return (
		<SplashWrapper>
			{/* 購入品管理画面 */}
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				{/* タイトル・ボタン群 */}
				<ItemTableControls
					data={items}
					setData={setItems}
					isEditing={isEditingItem}
					setIsEditing={setIsEditingItem}
					dirtyCells={itemDirty}
					setDirtyCells={setItemDirty}
					rowSelection={itemSelection}
					setRowSelection={setItemSelection}
					showCheckbox={showItemCheckbox}
					setShowCheckbox={setShowItemCheckbox}
					selectedCount={selectedCount}
					setCommittedItems={setCommittedItems}
					committedItems={committedItems}
					tableInstance={tableInstance}
					showFilters={showFilters}
					setShowFilters={setShowFilters}
					// PIPカードエリア固有の値や更新値
					pipNickName={pipNickName}
					setPipNickName={setPipNickName}
					selectedQtyMap={selectedQtyMap}
					setSelectedQtyMap={setSelectedQtyMap}
				/>
				{/* 件数表示（フィルター後/全体） */}
				<span className="ml-auto text-sm text-gray-600">
					count: {filteredCount} / {items.length}
				</span>
				<div className="max-w-10xl mx-auto h-full flex gap-4">
					<div
						className={cn(
							'h-[80%]',
							pipGenerationMode !== 'display' ? 'w-1/2' : 'w-full',
						)}
					>
						{/* 購入品テーブル(汎用テーブルを使用、編集機能付き) */}
						<GenericEditableTable
							keyField="itemNo"
							data={items}
							columns={getItemColumns(pipGenerationMode)} // PIP生成モード時は一部列を非表示
							isEditing={isEditingItem}
							showCheckbox={!isEditingItem}
							showFilters={showFilters}
							dirtyCells={itemDirty}
							setDirtyCells={setItemDirty}
							rowSelection={itemSelection}
							setRowSelection={setItemSelection}
							onSelectedRowCountChange={setSelectedCount}
							onFilteredCountChange={setFilteredCount} // ✅ フィルター件数を受け取る
							renderCell={styleItemCell}
							customFilterPlaceholders={ITEM_FILTER_PLACEHOLDERS}
							numericFilterColumns={['qty']}
							onTableReady={setTableInstance} // table インスタンスを受け取りフィルター操作用に保存
						/>
					</div>
					{/* 一覧表示のみの場合以外は、右側にPIPカードエリアを表示 */}
					{pipGenerationMode !== 'display' && (
						<div className="w-1/2">
							<PipCardArea
								// 購入品管理画面 左側で選択された購入品
								committedItems={committedItems}
								setCommittedItems={setCommittedItems}
								setData={setItems}
								// PIPカードエリア固有の値や更新値
								pipNickName={pipNickName}
								setPipNickName={setPipNickName}
								selectedQtyMap={selectedQtyMap}
								setSelectedQtyMap={setSelectedQtyMap}
							/>
						</div>
					)}
				</div>
			</div>
		</SplashWrapper>
	);
};



/* ===== FILE: \ps-ps\src\features\item-assignment\components\PipCardArea.tsx ===== */

import { Plus, Trash2 } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { EmptyState } from '@/components';
import type { Item } from '@/types';
import { PSysContext } from '../../../routes/ps-ps/route';

/**
 * 購入品管理画面 PIPカードなしのアラート/PIPカード表示エリア
 * committedItems: 割当確定後のレコード一覧
 */
type PipCardAreaProps = {
	committedItems: Item[];
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>;
	setData: React.Dispatch<React.SetStateAction<Item[]>>;
	pipNickName: string;
	setPipNickName: React.Dispatch<React.SetStateAction<string>>;
	selectedQtyMap: Record<string, string>;
	setSelectedQtyMap: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>;
};

export const PipCardArea = ({
	committedItems, // PIPカードエリアに表示する購入品
	setCommittedItems, // PIPカードエリアに表示する購入品の更新関数
	setData, // 購入品の更新関数
	pipNickName, // 入力されたPIPニックネーム
	setPipNickName, // 入力されたPIPニックネームの更新関数
	selectedQtyMap, // セレクトボックス(数量)の入力状態
	setSelectedQtyMap, // セレクトボックス(数量)の入力状態の更新関数
}: PipCardAreaProps) => {
	// コンテキストから値を取得: サイドバーの表示状態, PIP管理画面で選択されたpipDataの対象
	const { isSidebar, selectedPipData } = useContext(PSysContext);

	// 画面表示用PIPコード
	const tempPipCode = isSidebar
		? `${committedItems[0]?.costElement.slice(-3)}_${committedItems[0]?.ibsCode}` // PIP生成時は仮採番(連番部分を除く)
		: `${selectedPipData.code}`; // PIP管理画面から遷移時は実際の値

	// 各行の削除処理
	const handleDelete = (targetItemIndex: number) => {
		// PIPカードエリア表示内容更新
		setCommittedItems((prevCommitted) => {
			const removedItem = prevCommitted[targetItemIndex];
			const updatedCommitted = prevCommitted.filter(
				(_, index) => index !== targetItemIndex,
			);

			// PIP編集時
			if (!removedItem.__restQtyUpdated && !isSidebar) {
				const matchedPipItem = selectedPipData.items.find(
					(i) => i.itemNo === removedItem.itemNo,
				);

				if (matchedPipItem) {
					removedItem.originalRestQty = removedItem.itemRestQty; // 元の値を保存
					removedItem.itemRestQty += matchedPipItem.qty;
					removedItem.__restQtyUpdated = true; // フラグを立てる
				}
			}

			// 購入品一覧エリア表示内容更新
			setData((prevData) => {
				if (!prevData.includes(removedItem)) {
					const newData = [...prevData, removedItem];
					// ソート処理
					newData.sort((a, b) => a.itemName.localeCompare(b.itemName));
					return newData;
				}
				return prevData;
			});

			// 保持値のリセット（対象の itemSurKey のみ）
			if (removedItem.itemSurKey) {
				setSelectedQtyMap((prev) => {
					const updated = { ...prev };
					delete updated[removedItem.itemSurKey];
					return updated;
				});
			}

			// 最後の1件を削除する際はニックネームをリセット
			if (prevCommitted.length === 1) {
				setPipNickName('');
			}

			return updatedCommitted;
		});
	};

	// 数量変更処理(数量セレクトボックスの値が変更されたとき)
	const handleQtyChange = (itemSurKey: string, newQty: string) => {
		setSelectedQtyMap((prev) => ({
			...prev,
			[itemSurKey]: newQty,
		}));
	};

	// セレクトボックスの初期値をuseStateで管理する
	useEffect(() => {
		if (!isSidebar && selectedPipData?.items) {
			committedItems.forEach((item) => {
				const initialQty =
					selectedPipData.items
						.find((i) => i.itemNo === item.itemNo)
						?.qty.toString() ?? '1';

				setSelectedQtyMap((prev) => {
					if (prev[item.itemSurKey]) return prev;
					return {
						...prev,
						[item.itemSurKey]: initialQty,
					};
				});
			});
		} else {
			committedItems.forEach((item) => {
				const initialQty = item.itemRestQty.toString();

				setSelectedQtyMap((prev) => {
					if (prev[item.itemSurKey]) return prev;
					return {
						...prev,
						[item.itemSurKey]: initialQty,
					};
				});
			});
		}
	}, [committedItems, isSidebar, selectedPipData]);

	return committedItems.length === 0 ? (
		// PIPカードなしのアラート
		<div className="pt-30">
			<EmptyState icon={Plus} label="アイテムを選択してPIPを生成してください" />
		</div>
	) : (
		// PIPカード表示エリア
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col h-[80%]">
			<div className="flex items-start gap-4">
				<div>
					<p className="text-sm font-medium">PIP</p>
					<p className="text-lg font-semibold px-2 py-1">{tempPipCode}</p>
				</div>
				<div className="flex flex-col gap-1">
					<p className="text-sm font-medium">Nickname</p>
					<input
						type="text"
						placeholder="input Nickname"
						value={pipNickName}
						onChange={(e) => setPipNickName(e.target.value)}
						className="h-8 w-64 text-xs px-2 rounded-sm bg-white border border-gray-300 placeholder:font-light"
					/>
				</div>
			</div>
			<table className="table-auto border-collapse w-full text-sm">
				<thead className="sticky top-0 bg-gray-50 border-b">
					<tr>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Item No.
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Item Name
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">Qty</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Cost Element
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800">
							Ibs Code
						</th>
						<th className="px-4 py-2 text-left text-xs text-gray-800" />
					</tr>
				</thead>
				<tbody>
					{committedItems.map((item, index) => (
						<tr key={index} className="border-b hover:bg-gray-50">
							<td className="px-4 py-2">{item.itemNo}</td>
							<td className="px-4 py-2">{item.itemName}</td>
							<td className="px-4 py-2">
								<select
									value={
										selectedQtyMap[item.itemSurKey] ??
										(isSidebar
											? item.itemRestQty.toString() // PIP作成画面:初期値は未割当数量
											: (selectedPipData.items
													.find((i) => i.itemNo === item.itemNo)
													?.qty.toString() ?? '1')) // PIP編集画面:初期値は画面で選択したPIP
									}
									className="border border-gray-300 rounded px-2 py-1"
									onChange={(e) =>
										handleQtyChange(item.itemSurKey, e.target.value)
									}
								>
									{Array.from(
										{
											length: isSidebar
												? item.itemRestQty // PIP作成画面:最大値は未割当数量
												: (selectedPipData.items.find(
														(i) => i.itemNo === item.itemNo,
													)?.qty ?? 0) +
													(item.originalRestQty ?? item.itemRestQty), // PIP編集画面:最大値は画面で選択したPIP + 未割当数量
										},
										(_, i) => i + 1,
									).map((num) => (
										<option key={num} value={num}>
											{num}
										</option>
									))}
								</select>
							</td>
							<td className="px-4 py-2">{item.costElement}</td>
							<td className="px-4 py-2">{item.ibsCode}</td>
							<td className="px-4 py-2 text-center">
								<button
									onClick={() => handleDelete(index)}
									className="text-red-500 hover:text-red-700"
									title="削除"
								>
									<Trash2 className="w-5 h-5 inline" />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\item-assignment\hooks\useItemListDelete.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
};

// 抽出する
function extractItems(
	deleteData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(deleteData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
		};
	});
}

export const useItemListDelete = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			deleteData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			deleteData: Record<string, Partial<Item>>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(deleteData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeleteItem',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								Item: item,
							}),
						}),
					},
				);

				// レスポンスの中身をチェックしてアラート表示
				const resultPreview = await response.json();
				if (
					resultPreview?.statusCode === '404' &&
					resultPreview?.statusMessage ===
						'PIPに割当済みの購入品は削除できません。'
				) {
					console.log('PIPに割当済みの購入品は削除できません。');
					throw new Error(resultPreview.statusMessage);
				}

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-assignment\hooks\useItemListSave.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemNo?: string;
	ItemCoreItemNo?: string;
	ItemName?: string;
	ItemQty?: number | string;
	Element?: string;
	ItemIBSCode?: string;
};

// 抽出する
function extractItems(
	updateData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(updateData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemNo: item.itemNo ?? '',
			CoreItemNo: item.coreItemNo ?? '',
			ItemName: item.itemName ?? '',
			ItemQty: item.qty ?? 0,
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

export const useItemListSave = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			updateData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			updateData: Record<string, Partial<Item>>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(updateData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/SaveItem',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								Item: item,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-assignment\hooks\useItems.ts ===== */

import { useQuery } from '@tanstack/react-query';

/**
 * APIで購入品リストを取得
 */
export const useItems = (jobNo: string, fgCode: string) => {
	return useQuery({
		queryKey: ['items', jobNo, fgCode],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetItemList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 400) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 404) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 500) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		//enabled: !!jobNo && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
		enabled: false, // enabledの条件はuseEffectの依存配列と同様: 初期フェッチを無効にする
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-assignment\hooks\usePipGenerate.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemQty?: number | string;
	Element?: string;
	IBSCode?: string;
};

// 抽出する
function extractItems(
	targetData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(targetData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemQty: item.qty ?? '',
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

// 購入品管理画面(PIP生成モード)で使用: PIPコードは仮の値を用いる
export const usePipGenerate = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetData,
			pipNickName,
			selectedQtyMap, // PIPカードエリア 数量テキストボックス操作差分
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetData: Record<string, Partial<Item>>;
			pipNickName: string;
			selectedQtyMap: Record<string, string>;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(targetData);

			// 1要素目の情報を取得
			let firstElement: string | undefined;
			let firstItemIBSCode: string | undefined;

			if (item.length > 0) {
				firstElement = item[0].Element;
				firstItemIBSCode = item[0].IBSCode;
			}

			// itemとして送る要素を抽出する
			const requestParamItem = item
				.filter(({ ItemSurKey }) => ItemSurKey !== undefined)
				.map(({ ItemSurKey }) => ({
					itemSurKey: Number(ItemSurKey),
					itemQty: Number(selectedQtyMap[String(ItemSurKey)] ?? '1'),
				}));

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GeneratePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: [
									{
										sourcePIPCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipCode: '', // 購入品管理画面(PIP生成モード)から呼び出す場合は空文字を指定
										pipNickName: pipNickName,
										element: firstElement,
										ibsCode: firstItemIBSCode,
										item: requestParamItem,
									},
								],
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\item-assignment\utils\getItemsForItemTable.ts ===== */

import type { Item } from '../../../types/common';

/**
 * ItemTableで使用するためのItem型に変換
 */
type JsonWithResponse = {
	responseJSON: string;
};
export const getItemsForItemTable = (json: JsonWithResponse): Item[] => {
	// responseJSONをパース
	const parsedResponse = JSON.parse(json.responseJSON);

	// itemフィールドをさらにパース
	const rawItems: Item[] = JSON.parse(parsedResponse.item);

	// Item型に変換
	return rawItems.map(
		(item: Item): Item => ({
			itemSurKey: Number(String(item.itemSurKey).trim()),
			jobNo: String(item.jobNo).trim(),
			fg: String(item.fgCode).trim(),
			itemNo: String(item.itemNo).trim(),
			coreItemNo: String(item.itemCoreNo).trim(),
			itemName: String(item.itemName).trim(),
			qty: Number(String(item.itemQty).trim()),
			itemRestQty: Number(String(item.itemRestQty).trim()), // PIP未割当数量
			itemSortKey: Number(String(item.itemSortKey).trim()),
			costElement: String(item.itemCostElement).trim(),
			ibsCode: String(item.itemIBSCode).trim(),
			pipCode: item.itemIsAssign,
			belongsToPip: '',
			pipItemIndex: '',
		}),
	);
};



/* ===== FILE: \ps-ps\src\features\item-management\components\ItemTableControls.tsx ===== */

import {
	ArrowLeft,
	ArrowRight,
	CircleChevronRight,
	Download,
	Edit,
	FileUp,
	Package,
	Save,
	Trash2,
	X,
} from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { FilterButton } from '@/components/FilterButton';
import { AlertMessages } from '@/components/ui/alertMessages';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/stores/useAlartStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Item } from '@/types';
import { usePipSaveOverwrite } from '../../../features/pip-management/hooks/usePipSaveOverwrite';
import { PSysContext } from '../../../routes/ps-ps/route';
import { useItemListDelete } from '../../item-assignment/hooks/useItemListDelete';
import { useItemListSave } from '../../item-assignment/hooks/useItemListSave';
import { usePipGenerate } from '../../item-assignment/hooks/usePipGenerate';
import type { ItemTableControlsProps } from './ItemTableControls.types'; // prop定義は外部ファイル

/**
 * 購入品テーブルを操作する汎用ボタン群コンポーネント
 * 編集、削除、割当（PIP登録）、フィルタ表示などの操作を提供する
 */
export function ItemTableControls({
	data, // 購入品データの配列
	setData, // データ更新関数（保存・削除時に使用）
	isEditing, // 編集モードかどうかのフラグ
	setIsEditing, // 編集モードの切り替え関数
	dirtyCells, // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells, // 差分の更新関数
	rowSelection, // 行の選択状態（itemNo: true/false）
	setRowSelection, // 選択状態の更新関数
	showCheckbox, // チェックボックス列の表示有無
	setShowCheckbox, // チェックボックス列の表示切り替え関数
	selectedCount, // 選択された行数
	setCommittedItems, // PIPに割り当てるアイテムの更新関数
	committedItems, // PIPに割り当てるアイテム
	tableInstance, // テーブルインスタンス（フィルタ操作に使用）
	showFilters, // フィルタ表示状態
	setShowFilters, // フィルタ表示状態の更新関数
	pipNickName, // PIPニックネームの入力値
	setPipNickName, // 入力されたPIPニックネームの更新関数
	selectedQtyMap, // PIPカードエリアでのセレクトボックス(数量)の入力状態
	setSelectedQtyMap, // PIPカードエリアでのセレクトボックス(数量)の入力状態更新
}: ItemTableControlsProps) {
	// 編集開始時に元データを保持（キャンセル時に復元するため）
	//const [originalData, setOriginalData] = useState<Item[] | null>(null);

	// 常に元の全体データを保持
	const [protectedItemData, setProtectedItemData] = useState<Item[] | null>(
		null,
	);

	// PIP生成モードの状態（display: 表示モード, generation: 生成モード）
	const pipGenerationMode = usePipGenerationModeStore(
		(state) => state.pipGenerationMode,
	);
	const setPipGenerationMode = usePipGenerationModeStore(
		(state) => state.setPipGenerationMode,
	);

	// すべてを表示/PIP未割当のみ 絞り込み状態を管理
	const [pipAssignedFilters, setPipAssignedFilters] = useState(false);

	// PIPに割り当てる処理：選択されたアイテムを committedItems に追加
	const handleAssign = () => {
		// チェックされた行のインデックス取得
		const selectedIndexes = Object.keys(rowSelection)
			.filter((index) => rowSelection[index])
			.map((index) => Number(index));

		// インデックスをitemSurKeyに変換
		const idsToAssign = new Set(
			selectedIndexes.map((i) => data[i]?.itemSurKey).filter(Boolean),
		);

		// PIPに割り当てる購入品の対象リストを作成
		const targetRows = data.filter((row) => idsToAssign.has(row.itemSurKey));
		setRowSelection({});

		// 購入品一覧エリア表示内容更新
		setData((prev) => prev.filter((row) => !idsToAssign.has(row.itemSurKey)));

		// PIPカードエリア表示内容更新（全体を itemNo でソート）
		setCommittedItems((prev) => {
			const updated = [...prev, ...targetRows];
			// itemNo が文字列の場合
			updated.sort((a, b) => a.itemNo.localeCompare(b.itemNo));
			return updated;
		});
	};

	// コンテキストから値を取得: サイドバー表示状態, PIP管理画面で選択されたpipDataの対象, ItemAssignmentViewを呼び出す際のモード
	const { isSidebar, selectedPipData } = useContext(PSysContext);
	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// 削除対象データ
	const [deleteTarget, setDeleteTarget] = useState<Item[] | null>(null);
	const [isDeleteMode, setIsDeleteMode] = useState(false);
	const { mutate: deleteMutate } = useItemListDelete();
	// 削除処理
	const handleDelete = () => {
		// // チェックされた行のインデックス取得
		// const selectedIndexes = Object.keys(rowSelection)
		// 	.filter((index) => rowSelection[index])
		// 	.map((index) => Number(index));
		// // インデックスをitemSurKeyに変換
		// const idsToDelete = new Set(
		// 	selectedIndexes
		// 		.map((i) => data[i]?.itemSurKey)
		// 		.filter(Boolean),
		// );
		// // 購入品一覧エリア表示内容更新
		// setData((prev) => prev.filter((row) => !idsToDelete.has(row.itemSurKey)));
		// // 削除対象リストを作成
		// const targetRows = data.filter((row) => idsToDelete.has(row.itemSurKey));
		// setDeleteTarget(targetRows);
		// // DeleteモードをONにする
		// setIsDeleteMode(true);
	};

	// DeleteモードONを検知し削除APIを呼び出す
	useEffect(() => {
		// Deleteモードでない場合は何もしない
		if (!isDeleteMode) return;

		// 購入品リスト削除API呼び出し
		deleteMutate({
			userId: 'PSYSP014',
			jobNo: selectedJobNo,
			fgCode: selectedFG?.fgCode,
			deleteData: deleteTarget,
		});

		// 保存処理後のリセット
		setRowSelection({});
		setDirtyCells({});
		setIsDeleteMode(false);
		setDeleteTarget(null);
	}, [isDeleteMode, deleteTarget, deleteMutate, selectedJobNo]);

	// 編集モード開始：元データを保存
	const startEditing = () => {
		// setOriginalData(data.map((row) => ({ ...row })));
		// setIsEditing(true);
		// // アラートメッセージを表示のみOFFにする
		// setIsAlert(false);
	};

	// 編集キャンセル：元データに戻す
	const cancelEditing = () => {
		// if (originalData !== null) {
		// 	setData(originalData.map((row) => ({ ...row })));
		// 	setDirtyCells({});
		// 	setOriginalData(null);
		// 	setIsEditing(false);
		// 	// アラートメッセージを表示のみOFFにする
		// 	setIsAlert(false);
		// }
	};

	// PIP未割当のみボタン、すべて表示ボタン
	useEffect(() => {
		if (pipAssignedFilters) {
			// PIP未割当のみ表示
			setProtectedItemData(data.map((row) => ({ ...row })));
			//setOriginalData(data.map((row) => ({ ...row })));
			setData(data.filter((row) => row.pipCode === '未割当'));
		} else {
			// すべて表示
			if (protectedItemData !== null) {
				setData(protectedItemData.map((row) => ({ ...row })));
			}
		}
	}, [pipAssignedFilters]);

	// 保存ボタン
	const { mutate: saveMutate } = useItemListSave();
	const [isSaveMode, setIsSaveMode] = useState(false);
	const handleItemListSave = async () => {
		setData((prev) =>
			prev.map((row) =>
				dirtyCells[row.itemNo] ? { ...row, ...dirtyCells[row.itemNo] } : row,
			),
		);
		// セーブモードをONにする
		setIsSaveMode(true);
	};

	// セーブモードONを検知し保存APIを呼び出す
	useEffect(() => {
		// セーブモードでない場合は何もしない
		if (!isSaveMode) return;

		// data が空や不正な場合は何もしない
		//if (!data || !validate()) {
		if (!data) {
			return;
		}

		// API呼び出し
		saveMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				updateData: data,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['ITEM_SUCCESS']);

					// 保存処理後のリセット
					setDirtyCells({});
					//setOriginalData(null);
					setIsEditing(false);
					setIsSaveMode(false);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['ITEM_FAILURE']);
				},
			},
		);
	}, [isSaveMode, data]);

	const { mutate: generatePipMutate } = usePipGenerate();
	// PIP生成ボタン
	const handlePipGenerate = () => {
		// API呼び出し
		generatePipMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetData: committedItems,
				pipNickName: pipNickName,
				selectedQtyMap: selectedQtyMap,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['PIP_SUCCESS']);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['PIP_FAILURE']);
				},
			},
		);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリアを空にする
		setCommittedItems([]);

		// 再検索せず、検索前の状態に戻す
		//triggerResearch();
		setData([]);
	};

	// PIP生成モード終了ボタン
	const handleCancelPipAssign = () => {
		setPipGenerationMode('display');
		setShowCheckbox((prev) => !prev);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリア表示内容リセット
		setCommittedItems([]);
		setSelectedQtyMap({});
		setPipNickName('');

		// 再検索せず、検索前の状態に戻す
		//triggerResearch();
		setData([]);
	};

	// 購入品管理画面(PIP編集モード): 初期状態でPIP割当済みとする
	// ロジック: サイドバー非表示状態 = PIP編集モード及びPIP複製モード
	const hasProcessed = useRef(false);
	useEffect(() => {
		if (!isSidebar && data.length > 0 && !hasProcessed.current) {
			// 選択したpipDataと一致する情報を再検索する
			const targetRowsIndex = Array.from(
				new Set(selectedPipData.items.map((item) => item.itemNo)),
			);

			// 下記2画面の差分データ
			const targetRows = data.filter((row) =>
				targetRowsIndex.includes(row.itemNo),
			);

			// pipカードエリアを更新
			setCommittedItems(targetRows);

			// 購入品管理画面を更新
			setData(data.filter((row) => !targetRowsIndex.includes(row.itemNo)));

			// ニックネームの初期値をセット
			setPipNickName(selectedPipData.nickname);

			// 処理済みフラグを立てループを終了させる
			hasProcessed.current = true;

			// PIP割当済は非表示とする
			if (pipGenerationMode === 'generation') {
				setProtectedItemData(data.map((row) => ({ ...row })));
				setData(data.filter((row) => row.pipCode !== '割当済'));
			}
		}
	}, [isSidebar, selectedPipData, data]);

	// 更新ボタン
	const { mutate: saveOverwrightPipMutate } = usePipSaveOverwrite();
	const handleUpdatePip = () => {
		// API呼び出し
		saveOverwrightPipMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetData: committedItems,
				pipNickName: pipNickName,
				selectedQtyMap: selectedQtyMap,
				targetPipCode: selectedPipData.code,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['PIP_EDIT_SUCCESS']);

					window.location.reload();
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['PIP_EDIT_FAILURE']);
				},
			},
		);

		// 購入品一覧エリア表示内容リセット
		setData((prevData) => [...prevData, ...committedItems]);

		// PIPカードエリアを空にする
		setCommittedItems([]);
	};

	// 戻るボタン
	const handleBack = () => {
		window.location.reload();
	};

	// PIP生成モードの場合、PIP割当済みの購入品は非表示にする
	useEffect(() => {
		if (pipGenerationMode === 'generation') {
			// 割当済みを非表示
			setProtectedItemData(data.map((row) => ({ ...row })));
			setData(data.filter((row) => row.pipCode !== '割当済'));
		}
	}, [pipGenerationMode]);

	// 初回だけ実行(データ保護)
	useEffect(() => {
		setProtectedItemData(data.map((row) => ({ ...row })));
	}, []);

	return (
		<div className="flex-shrink-0">
			{/* タイトルと編集モードバッジの表示エリア */}
			<div className="flex items-center gap-2">
				<h2 className="text-lg font-semibold text-gray-800">
					{isSidebar ? '購入品管理' : 'PIP編集'}
				</h2>
				{isEditing && (
					<div className="flex items-center gap-2">
						{/* 編集モードバッジ */}
						<span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
							Edit Mode
						</span>
						{/* 未保存の変更がある場合のバッジ */}
						{Object.keys(dirtyCells).length > 0 && (
							<span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
								Unsaved Changes
							</span>
						)}
					</div>
				)}
			</div>

			{/* ボタンエリア（フィルタ・操作ボタン） */}
			<div className="flex items-end justify-between mt-2">
				{/* 左側：フィルタ表示切り替えボタン */}
				{/*  すべて表示ボタン、PIP未割当のみボタン */}
				<FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					setPipAssignedFilters={setPipAssignedFilters}
					pipAssignedFilters={pipAssignedFilters}
					tableInstance={tableInstance}
				/>

				{/* 中央：PIP割当ボタン（生成モード時のみ表示） */}
				{pipGenerationMode !== 'display' && (
					<Button
						onClick={handleAssign}
						disabled={selectedCount === 0}
						className="flex items-center gap-2 cursor-pointer h-8"
						size="sm"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て
						<span>{selectedCount}件</span>
						<ArrowRight size={16} />
					</Button>
				)}

				{/* 右側：操作ボタン群 */}
				<div className="flex items-center gap-2">
					{false && isEditing ? (
						<>
							{/* 編集キャンセルボタン */}
							<Button
								size="sm"
								variant="outline"
								onClick={cancelEditing}
								className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
							>
								<X className="w-4 h-4" />
								Cancel
							</Button>

							{/* 編集保存ボタン（変更がある場合のみ有効） */}
							<Button
								size="sm"
								variant="outline"
								onClick={handleItemListSave}
								className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
								disabled={Object.keys(dirtyCells).length === 0}
							>
								<Save className="w-4 h-4" />
								Save Changes
							</Button>
						</>
					) : (
						<>
							{pipGenerationMode === 'display' && (
								<>
									{/* エクスポートボタン（現在は無効） */}
									{false && (
										<Button
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
											disabled={true}
										>
											<Download className="w-4 h-4" />
											Export
										</Button>
									)}

									{/* インポートボタン（現在は無効） */}
									{false && (
										<Button
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
											disabled={true}
										>
											<FileUp className="w-4 h-4" />
											Import Item list
										</Button>
									)}

									{/* 編集開始ボタン */}
									{false && (
										<Button
											size="sm"
											variant="outline"
											onClick={startEditing}
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										>
											<Edit className="w-4 h-4" />
											Edit
										</Button>
									)}

									{/* 削除ボタン（チェックボックスが非表示かつ編集モードでない場合） */}
									{false && !showCheckbox && !isEditing && (
										<Button
											disabled={selectedCount === 0}
											onClick={handleDelete}
											size="sm"
											variant="outline"
											className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
										>
											<Trash2 className="w-4 h-4" />
											Delete
										</Button>
									)}
								</>
							)}

							{/* PIP生成モード切り替えボタン */}
							{pipGenerationMode === 'display' && (
								<Button
									size="sm"
									variant="outline"
									disabled={selectedCount >= 1}
									onClick={() => {
										setShowCheckbox((prev) => !prev);
										setPipGenerationMode('generation');
									}}
									className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
								>
									<Package className="w-4 h-4" />
									Create PIP
								</Button>
							)}

							{/* PIP生成ボタン（DB登録用） */}
							{pipGenerationMode === 'generation' && isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handlePipGenerate}
									className="flex items-center gap-2 h-8 px-3 bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white cursor-pointer"
									disabled={committedItems.length === 0}
								>
									<Package className="w-4 h-4" />
									Create
								</Button>
							)}

							{/* PIP生成モード終了ボタン */}
							{pipGenerationMode !== 'display' && isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleCancelPipAssign}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<X className="w-4 h-4" />
									Close
								</Button>
							)}

							{/* 戻るボタン・更新ボタン: 購入品管理画面(PIP編集モード */}
							{pipGenerationMode !== 'display' && !isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleUpdatePip}
									className="flex items-center gap-2 h-8 px-3 border bg-blue-500 hover:bg-blue-500/80 text-white hover:text-white border-gray-300 cursor-pointer"
								>
									<Save className="w-4 h-4" />
									Update
								</Button>
							)}
							{pipGenerationMode !== 'display' && !isSidebar && (
								<Button
									size="sm"
									variant="outline"
									onClick={handleBack}
									className="flex items-center gap-2 h-8 px-3 border border-gray-300 cursor-pointer"
								>
									<ArrowLeft className="w-4 h-4" />
									Back
								</Button>
							)}
						</>
					)}
				</div>
			</div>
			{/* アラート表示エリア */}
			{isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)}
		</div>
	);
}



/* ===== FILE: \ps-ps\src\features\item-management\components\ItemTableControls.types.ts ===== */

import type { Table } from '@tanstack/react-table';
import type { Item } from '@/types';

// ItemTableControlsのprop定義を外部ファイル化
export interface ItemTableControlsProps {
	data: Item[]; // 購入品データの配列
	setData: React.Dispatch<React.SetStateAction<Item[]>>; // データ更新関数（保存・削除時に使用）
	isEditing: boolean; // 編集モードの切り替え関数
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>; // 編集モードの切り替え関数
	dirtyCells: Record<string, Partial<Item>>; // 編集されたセルの差分（itemNoごとの変更内容）
	setDirtyCells: React.Dispatch<
		React.SetStateAction<Record<string, Partial<Item>>>
	>; // 差分の更新関数
	rowSelection: Record<string, boolean>; // 行の選択状態（itemNo: true/false）
	setRowSelection: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>; // 選択状態の更新関数
	committedItems: Item[]; // PIPに割り当てるアイテム
	showCheckbox: boolean; // チェックボックス列の表示有無
	setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>; // チェックボックス列の表示切り替え関数
	selectedCount: number; // 選択された行数
	setCommittedItems: React.Dispatch<React.SetStateAction<Item[]>>; // PIPに割り当てるアイテムの更新関数
	tableInstance: Table<Item> | null; // テーブルインスタンス（フィルタ操作に使用）
	showFilters: boolean; // フィルタ表示状態
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>; // フィルタ表示状態の更新関数
	pipNickName: string; // PIPニックネームの入力値
	setPipNickName: React.Dispatch<React.SetStateAction<string>>; // 入力されたPIPニックネームの更新関数
	selectedQtyMap: Record<string, string>; // PIPカードエリアでのセレクトボックス(数量)の入力状態
	setSelectedQtyMap: React.Dispatch<
		React.SetStateAction<Record<string, string>>
	>; // PIPカードエリアでのセレクトボックス(数量)の入力状態更新
}



/* ===== FILE: \ps-ps\src\features\item-management\constants\item-filter-placeholders.ts ===== */

// フィルタのプレースホルダー定義（列ごとに設定）
export const ITEM_FILTER_PLACEHOLDERS = {
	coreItemNo: 'filter Core Item No.',
	itemNo: 'filter Item No.',
	itemName: 'filter Item Name',
	ibsCode: 'filter IBS Code',
	qty: 'filter Qty',
	costElement: 'filter Cost Element',
	pipCode: 'filter PIP Code',
};



/* ===== FILE: \ps-ps\src\features\item-management\utils\getItemColumns.ts ===== */

import type { ColumnDef } from '@tanstack/react-table';
import type { Item } from '@/types';

export type ColumnMode = 'display' | 'generation' | 'pipDetail' | 'edit';

// モードごとの非表示カラム定義
const hiddenColumnsByMode: Record<ColumnMode, string[]> = {
	display: ['itemRestQty'], // 通常モード
	generation: ['qty', 'pipCode', 'coreItemNo'], // PIP生成モード
	pipDetail: ['itemRestQty', 'pipCode', 'coreItemNo'], // PIP詳細表示モード
	edit: ['itemRestQty', 'pipCode', 'coreItemNo'], // 編集モード
};

// ベースカラム定義（全カラム）
const baseColumns: ColumnDef<Item>[] = [
	{
		id: 'itemNo',
		header: 'Item No.',
		accessorKey: 'itemNo',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
	{
		id: 'coreItemNo',
		header: 'Core Item No.',
		accessorKey: 'coreItemNo',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
	{
		id: 'itemName',
		header: 'Item Name',
		accessorKey: 'itemName',
		size: 200,
		minSize: 150,
		maxSize: 300,
	},
	{
		id: 'qty',
		header: 'Qty',
		accessorKey: 'qty',
		size: 80,
		minSize: 40,
		maxSize: 100,
	},
	{
		id: 'itemRestQty',
		header: '未割当Qty',
		accessorKey: 'itemRestQty',
		size: 80,
		minSize: 40,
		maxSize: 100,
	},
	{
		id: 'costElement',
		header: 'Cost Element',
		accessorKey: 'costElement',
		size: 120,
		minSize: 80,
		maxSize: 150,
	},
	{
		id: 'ibsCode',
		header: 'IBS Code',
		accessorKey: 'ibsCode',
		size: 100,
		minSize: 80,
		maxSize: 120,
	},
	{
		id: 'pipCode',
		header: 'PIP割り当てステータス',
		accessorKey: 'pipCode',
		size: 150,
		minSize: 80,
		maxSize: 200,
	},
];

// カラムフィルター関数
const filterColumns = (mode: ColumnMode): ColumnDef<Item>[] => {
	const hidden = hiddenColumnsByMode[mode] ?? [];
	return baseColumns.filter(
		(col) =>
			'accessorKey' in col &&
			typeof col.accessorKey === 'string' &&
			!hidden.includes(col.accessorKey),
	);
};

// 外部公開関数
export const getItemColumns = (columnMode: ColumnMode): ColumnDef<Item>[] => {
	return filterColumns(columnMode);
};



/* ===== FILE: \ps-ps\src\features\item-management\utils\styleItemCell.ts ===== */

import type { Item } from '@/types';

/**
 * 購入品テーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleItemCell = ({
	columnId,
	value,
}: {
	row: Item;
	columnId: string;
	value: unknown;
}): string | undefined => {
	// 数量（Qty）は右寄せ
	return columnId === 'qty' && typeof value === 'number'
		? 'text-right'
		: undefined;
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipDetail.tsx ===== */

import type { Table } from '@tanstack/react-table';
import { AlertCircle, Ship } from 'lucide-react';
import { useState } from 'react';
import { EmptyState, GenericEditableTable } from '@/components';
import { GenericReadonlyControl } from '@/components/generic-table/GenericReadonlyControl';
import { getItemColumns } from '@/features/item-management/utils/getItemColumns';
import { styleItemCell } from '@/features/item-management/utils/styleItemCell';
import type { Item, Pip, Vendor } from '@/types';
import { getVendorColumns } from '../utils/getVendorColumns';
import { styleVendorCell } from '../utils/styleVendorCell';

/**
 * PIP管理画面右側のPIP詳細エリアの表示切替とレイアウトを定義
 * pipDetail: PIPと紐づく購入品とベンダーのリスト
 */
export const PipDetail = ({ pipDetail }: { pipDetail: Pip }) => {
	// PIPテーブルで選択したPIPに紐づく購入品リスト
	const items = pipDetail.items;
	// PIPテーブルで選択したPIPに紐づくベンダーリスト
	const vendors = pipDetail.vendors;

	// フィルター後の件数を管理（現在フィルタ未使用）
	const [filteredItemCount, setFilteredItemCount] = useState(items.length); // 購入品
	const [filteredVendorCount, setFilteredVendorCount] = useState(
		vendors.length,
	); // ベンダー
	// フィルター入力欄の表示ON/OFF（現在フィルタボタン非表示）
	const [showItemFilters, setShowItemFilters] = useState(false); // 購入品
	const [showVendorFilters, setShowVendorFilters] = useState(false); // ベンダー
	// フィルタークリア用にTableインスタンスを保持（現在フィルタ未使用）
	const [itemTableInstance, setItemTableInstance] =
		useState<Table<Item> | null>(null); // 購入品
	const [vendorTableInstance, setVendorTableInstance] =
		useState<Table<Vendor> | null>(null); // ベンダー

	// PIP管理画面でPIPレコードが押下されたかで表示画面を切り替え
	return !pipDetail.code ? (
		<div className="pt-30">
			{/* PIP管理画面でPIPレコードが押下されていないときはアラート画面を表示 */}
			<EmptyState icon={Ship} label="クリックしたPIPの詳細情報を表示します" />
		</div>
	) : (
		// PIP管理画面でPIPレコードが押下されたときは紐づく購入品、ベンダーテーブルを表示
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[80%]">
			<div className="min-h-12">
				{/* PIP nickname */}
				<h2 className="text-2xl text-gray-800">{pipDetail.nickname}</h2>
				{/* PIP Code */}
				<h4 className="text-md text-gray-500">{pipDetail.code}</h4>
			</div>
			<div className="flex flex-col h-full mt-5 gap-10">
				<div className="h-[43%]">
					{/* タイトル・フィルタボタン */}
					<GenericReadonlyControl<Item>
						title="購入品"
						data={items}
						isFilterActive={false}
						tableInstance={itemTableInstance}
						filteredCount={filteredItemCount}
						showFilters={showItemFilters}
						setShowFilters={setShowItemFilters}
					/>
					<div className="mt-2 h-[95%]">
						{/* 購入品テーブル */}
						<GenericEditableTable<Item>
							keyField="itemNo"
							data={items}
							columns={getItemColumns('pipDetail')}
							disableEditing
							disableSelection
							showFilters={showItemFilters} // ✅ フィルター表示ON/OFF切り替え
							renderCell={styleItemCell}
							onFilteredCountChange={setFilteredItemCount} // ✅ フィルター後件数を受け取る
							onTableReady={setItemTableInstance} // ✅ table instance を取得してボタンから操作可能に
						/>
					</div>
				</div>

				<div className="h-[38%]">
					<GenericReadonlyControl<Vendor>
						title="ベンダー"
						data={vendors}
						isFilterActive={false}
						tableInstance={vendorTableInstance}
						filteredCount={filteredVendorCount}
						showFilters={showVendorFilters}
						setShowFilters={setShowVendorFilters}
					/>
					{vendors.length === 0 ? (
						<div className="pt-20">
							<EmptyState
								icon={AlertCircle}
								label="まだベンダーが割り当てられていません"
							/>
						</div>
					) : (
						<div className="mt-2 h-[95%]">
							{/* 購入品テーブル */}
							<GenericEditableTable<Vendor>
								keyField="id"
								data={vendors}
								columns={getVendorColumns()}
								disableEditing
								disableSelection
								showFilters={showVendorFilters} // ✅ フィルター表示ON/OFF切り替え
								renderCell={styleVendorCell}
								onFilteredCountChange={setFilteredVendorCount} // ✅ フィルター後件数を受け取る
								onTableReady={setVendorTableInstance} // ✅ table instance を取得してボタンから操作可能に
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipTable.tsx ===== */

import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type React from 'react';
import { useEffect, useState } from 'react';
import { GenericTableFilter } from '@/components/generic-table/GenericTableFilter';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { cn } from '@/lib/utils';
import type { Pip, PipData } from '@/types';
import { PIP_FILTER_PLACEHOLDERS } from '../constants/pip-filter-placeholders';
import { getPipColumns } from '../utils/getPipColumns';

interface PipTableProps {
	data: PipData; // 表示するPIPデータ
	showFilters: boolean; // フィルターUIを表示するかどうかのフラグ
	clickedPipCode: string | null; // 現在クリックされているPIPのコード（選択状態）
	setClickedPipCode: React.Dispatch<React.SetStateAction<string | null>>; // PIPコードの選択状態を更新する関数
	setPipDetail: React.Dispatch<React.SetStateAction<Pip>>; // 選択されたPIPの詳細情報を設定する関数
	onFilteredCountChange?: (count: number) => void; // フィルター適用後の件数を親コンポーネントに通知するコールバック
	onTableReady?: (tableInstance: ReturnType<typeof useReactTable<Pip>>) => void; // React Tableインスタンスを親コンポーネントに渡すためのコールバック
	rowSelection?: Record<string, boolean>; // 各行の選択状態（itemNoをキーにtrue/false）
	setRowSelection?: React.Dispatch<
		React.SetStateAction<Record<string, boolean>>
	>; // 選択状態を更新する関数
	onSelectedRowCountChange?: (count: number) => void; // 選択された行数を親コンポーネントに通知するコールバック
}

/**
 * PIPテーブルを定義するコンポーネント
 */
export const PipTable: React.FC<PipTableProps> = ({
	data,
	showFilters,
	clickedPipCode,
	setClickedPipCode,
	setPipDetail,
	onFilteredCountChange,
	onTableReady,
	rowSelection,
	setRowSelection,
	onSelectedRowCountChange,
}) => {
	// ソート状態の管理
	const [sorting, setSorting] = useState<SortingState>([]);

	// React Tableインスタンスの作成
	// コア機能、展開機能、フィルタ機能を有効化
	const table = useReactTable({
		data: data.pips,
		columns: getPipColumns(),
		state: {
			rowSelection,
			sorting,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		enableSorting: true,
		getSortedRowModel: getSortedRowModel(),
	});

	// チェックボックスがtrueのレコード数
	const selectedRowCount = table.getSelectedRowModel().rows.length;
	// フィルタ後のレコード数
	const filteredRowCount = table.getFilteredRowModel().rows.length;

	// 選択件数・フィルター件数を親に通知
	useEffect(() => {
		onSelectedRowCountChange?.(selectedRowCount);
		onFilteredCountChange?.(filteredRowCount);
	}, [
		selectedRowCount,
		filteredRowCount,
		onSelectedRowCountChange,
		onFilteredCountChange,
	]);

	// table インスタンスを親へ expose
	useEffect(() => {
		onTableReady?.(table);
	}, [table, onTableReady]);

	return (
		<div className="bg-white rounded-lg border border-gray-300 h-full flex flex-col shadow-sm">
			<div className="overflow-auto rounded-lg">
				<table className="rounded-lg w-full">
					{/* テーブルヘッダー + 列フィルター */}
					<thead className="sticky top-0 bg-gray-50 border-b">
						{table.getHeaderGroups().map((hg) => (
							<tr key={hg.id}>
								{/* 左端：選択列（全選択チェックボックス） */}
								<th className="pl-4 py-2 text-left text-xs text-gray-800">
									<IndeterminateCheckbox
										checked={table.getIsAllRowsSelected()}
										indeterminate={table.getIsSomeRowsSelected()}
										onChange={table.getToggleAllRowsSelectedHandler()}
										className="bg-white"
									/>
								</th>

								{/* ヘッダー各列（ソート + フィルタ）*/}
								{hg.headers.map((header) => (
									<th
										key={header.id}
										className="px-4 py-3 text-left text-xs font-medium text-gray-700 tracking-wide cursor-pointer"
										onClick={header.column.getToggleSortingHandler()}
										style={{ width: header.getSize() ?? 150 }}
										title={
											header.column.getCanSort()
												? header.column.getNextSortingOrder() === 'asc'
													? '昇順ソート'
													: header.column.getNextSortingOrder() === 'desc'
														? '降順ソート'
														: 'ソート解除'
												: undefined
										}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										{header.column.getIsSorted() === 'asc' && (
											<ChevronUp className="w-4 h-4 inline ml-1" />
										)}
										{header.column.getIsSorted() === 'desc' && (
											<ChevronDown className="w-4 h-4 inline ml-1" />
										)}
										{/* フィルター入力欄 */}
										{header.column.getCanFilter() && showFilters && (
											<button
												type="button"
												className="mt-1"
												onClick={(e) => e.stopPropagation()}
											>
												<GenericTableFilter
													column={header.column}
													customPlaceholders={PIP_FILTER_PLACEHOLDERS}
													numericColumns={[]}
												/>
											</button>
										)}
									</th>
								))}
							</tr>
						))}
					</thead>

					{/* テーブルボディ */}
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								onClick={() => {
									setClickedPipCode(row.id);
									setPipDetail(row.original);
								}}
								className={cn(
									'border-b border-gray-100 transition-colors cursor-pointer',
									clickedPipCode === row.id
										? 'bg-yellow-100'
										: 'hover:bg-gray-50 bg-white',
								)}
							>
								{/* 選択列 */}
								<td
									className="pl-4 py-2 text-left text-xs text-gray-800"
									onClick={(e) => e.stopPropagation()}
								>
									<IndeterminateCheckbox
										checked={row.getIsSelected()}
										indeterminate={row.getIsSomeSelected()}
										onChange={row.getToggleSelectedHandler()}
									/>
								</td>

								{/* データセル */}
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="px-4 py-3"
										style={{ width: cell.column.getSize() }}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-management\components\PipTableControls.tsx ===== */

import { useNavigate } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { Building2, Copy, Edit, Trash2 } from 'lucide-react';
import { FilterButton } from '@/components/FilterButton';
import { Button } from '@/components/ui/button';
import type { Pip } from '@/types';

interface Props {
	showFilters: boolean;
	setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
	tableInstance: Table<Pip> | null;
	selectedCount: number;
	setPipDeleteMode: React.Dispatch<React.SetStateAction<boolean>>; // 削除モード状態を更新する関数
	setPipEditMode: React.Dispatch<React.SetStateAction<boolean>>; // 編集モード状態を更新する関数
	pipEditMode: boolean; // 編集モード状態
}

/**
 * PIP管理テーブルの操作ボタン群を表示するコンポーネント
 * showFilters: フィルタ表示状態
 * setShowFilters: フィルタ表示状態の更新関数
 * tableInstance: テーブルインスタンス（フィルタ操作に使用）
 * selectedCount: 選択された行数
 */
export const PipTableControls: React.FC<Props> = ({
	showFilters,
	setShowFilters,
	tableInstance,
	selectedCount,
	setPipDeleteMode,
	setPipEditMode,
}) => {
	// ナビゲーション
	const navigate = useNavigate();

	//  AIP生成ページ（ベンダー割り当て）への遷移処理
	const handleAipGeneration = () => {
		if (!tableInstance) {
			alert('テーブルが初期化されていません');
			return;
		}

		const selectedRows = tableInstance.getSelectedRowModel().rows;
		if (selectedRows.length === 0) {
			alert('PIPを選択してください');
			return;
		}

		// 選択されたPIPデータを抽出
		const selectedPipData = selectedRows.map((row) => row.original);

		// ベンダー割り当てページに遷移（AIPモード）
		navigate({
			to: '/ps-ps/vendor-assignment',
			search: {
				mode: 'aip',
				selectedPips: JSON.stringify(selectedPipData),
			},
		});
	};

	// 削除ボタン: 削除モードとし、親コンポーネントに通知する
	const handleDelete = () => {
		setPipDeleteMode(true);
	};

	// 編集ボタン: 編集モードとし、親コンポーネントに通知する
	const handleEdit = () => {
		setPipEditMode(true);
	};

	return (
		<div className="flex-shrink-0">
			{/* タイトル */}
			<h2 className="text-lg font-semibold text-gray-800">PIP管理</h2>

			{/* ボタンエリア */}
			<div className="flex items-end justify-between mt-2">
				{/* 左側：フィルタ */}
				<FilterButton
					setShowFilters={setShowFilters}
					showFilters={showFilters}
					tableInstance={tableInstance}
				/>

				{/* 右側：操作ボタンエリア */}
				<div className="flex items-center gap-2">
					{/* AIP生成 */}
					<Button
						size="sm"
						variant="outline"
						onClick={handleAipGeneration}
						disabled={selectedCount !== 1}
						className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
					>
						<Building2 className="w-4 h-4" />
						Create AIP
					</Button>
					{/* 編集ボタン */}
					<Button
						size="sm"
						variant="outline"
						disabled={selectedCount !== 1}
						onClick={handleEdit}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Edit className="w-4 h-4" />
						Edit
					</Button>
					{/* 複製ボタン */}
					<Button
						size="sm"
						variant="outline"
						disabled={selectedCount !== 1}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Copy className="w-4 h-4" />
						Copy
					</Button>
					{/* 削除ボタン */}
					<Button
						size="sm"
						variant="outline"
						disabled={selectedCount === 0}
						onClick={handleDelete}
						className="flex items-center gap-2 h-8 px-3 bg-muted-indigo hover:bg-muted-indigo/80 text-white hover:text-white cursor-pointer"
					>
						<Trash2 className="w-4 h-4" />
						Delete
					</Button>
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-management\constants\pip-filter-placeholders.ts ===== */

// フィルタのプレースホルダー定義（列ごとに設定）
export const PIP_FILTER_PLACEHOLDERS = {
	code: 'filter PIP Code',
	nickname: 'filter PIP Nickname',
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePipListDelete.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { PipData } from '@/types';

type PipTableDefinition = {
	code?: number | string;
};

// 抽出する
function extractItems(
	deleteData: Record<string, Partial<PipData>>,
): PipTableDefinition[] {
	return Object.values(deleteData).map((pip) => {
		return {
			// sourcePIPCodeとして、codeを指定する(画面上のPIPコード)
			sourcePIPCode: pip.code ?? undefined,
		};
	});
}

export const usePipListDelete = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			deleteData,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			deleteData: Record<string, Partial<PipData>>;
		}) => {
			// 必要な要素のみを抽出する
			const pip = extractItems(deleteData);

			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/DeletePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: pip,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				const json = await response.json();
				return JSON.parse(json.responseJSON);
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePipListGet.ts ===== */

import { useQuery } from '@tanstack/react-query';

/**
 * APIを呼び出す
 */
export const usePipListGet = (jobNo: string, fgCode: string) => {
	return useQuery({
		queryKey: ['pip', jobNo, fgCode],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetPIPList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 400) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 404) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 500) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		// enabled: !!jobNo && !!fgCode, // jobNoとfgCodeが両方あるときだけ実行
		enabled: false, // enabledの条件はuseEffectの依存配列と同様: 初期フェッチを無効にする
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\hooks\usePipSaveOverwrite.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Item } from '../../../types/common';

type ItemTableDefinition = {
	ItemSurKey?: number | string;
	ItemQty?: number | string;
	Element?: string;
	IBSCode?: string;
};

// 抽出する
function extractItems(
	targetData: Record<string, Partial<Item>>,
): ItemTableDefinition[] {
	return Object.values(targetData).map((item) => {
		return {
			ItemSurKey: item.itemSurKey ?? undefined,
			ItemQty: item.qty ?? '',
			Element: item.costElement ?? '',
			IBSCode: item.ibsCode ?? '',
		};
	});
}

// 購入品管理画面(PIP編集モード)で使用: PIPコードは実際の値を用いる
export const usePipSaveOverwrite = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetData,
			pipNickName,
			selectedQtyMap, // PIPカードエリア 数量テキストボックス操作差分
			targetPipCode, // 選択されたpipDataのpipCode
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetData: Record<string, Partial<Item>>;
			pipNickName: string;
			selectedQtyMap: Record<string, string>;
			targetPipCode: string;
		}) => {
			// 必要な要素のみを抽出する
			const item = extractItems(targetData);

			// 1要素目の情報を取得
			let firstElement: string | undefined;
			let firstItemIBSCode: string | undefined;

			if (item.length > 0) {
				firstElement = item[0].Element;
				firstItemIBSCode = item[0].IBSCode;
			}
			// itemとして送る要素を抽出するitemQty
			const requestParamItem = item
				.filter(({ ItemSurKey }) => ItemSurKey !== undefined)
				.map(({ ItemSurKey, ItemQty }) => {
					const key = String(ItemSurKey);
					const qty = Object.hasOwn(selectedQtyMap, key)
						? Number(selectedQtyMap[key])
						: Number(ItemQty);
					return {
						itemSurKey: Number(ItemSurKey),
						itemQty: qty,
					};
				});
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GeneratePIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								pip: [
									{
										// 編集対象のpipを指定
										sourcePIPCode: targetPipCode,
										pipCode: targetPipCode,
										pipNickName: pipNickName,
										element: firstElement,
										ibsCode: firstItemIBSCode,
										item: requestParamItem,
									},
								],
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\getPipColumns.tsx ===== */

import type { ColumnDef } from '@tanstack/react-table';
import { Package } from 'lucide-react';
import type { Pip } from '@/types';

/**
 * PIPテーブルのカラム定義
 */
export const getPipColumns = () => {
	// ベースとなるカラム定義
	const base: ColumnDef<Pip>[] = [
		{
			id: 'code',
			header: 'PIP Code',
			accessorKey: 'code',
			size: 250,
			minSize: 80,
			maxSize: 250,
			cell: ({ getValue }) => {
				const value = getValue();
				return (
					<div className="flex items-center gap-2">
						<Package className="h-4 w-4 text-blue-600" />
						<span className="font-mono text-sm">{String(value)}</span>
					</div>
				);
			},
		},
		{
			id: 'nickname',
			header: 'PIP Nickname',
			accessorKey: 'nickname',
			size: 350,
			minSize: 150,
			maxSize: 350,
			cell: ({ getValue }) => {
				const value = getValue();
				return <span className="font-mono text-sm">{String(value)}</span>;
			},
		},
		{
			id: 'itemCount',
			header: 'Item Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.items.length}
				</span>
			),
		},
		{
			id: 'vendorCount',
			header: 'Vendor Count',
			size: 100,
			enableColumnFilter: false,
			cell: ({ row }) => (
				<span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
					{row.original.vendors.length}
				</span>
			),
		},
	];

	return base;
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\getPipData.ts ===== */

import type { Item, PipData, Vendor } from '../../../types/common';

/**
 * APIレスポンスを、PIPItem型に変換
 */
export const getPipData = (apiResponse: any): PipData => {
	let pipArray: any[] = [];

	try {
		// pip が JSON文字列の場合はパースする
		pipArray =
			typeof apiResponse.pip === 'string'
				? JSON.parse(apiResponse.pip)
				: apiResponse.pip;
	} catch (e) {
		console.error('PIPデータのパースに失敗しました:', e);
		return { pips: [] };
	}

	const pips = pipArray.map((pipEntry: any) => {
		let items: Item[] = [];
		let vendors: Vendor[] = [];

		try {
			const itemArray =
				typeof pipEntry.item === 'string'
					? JSON.parse(pipEntry.item)
					: pipEntry.item;

			items = (itemArray || []).map((item: any, index: number) => ({
				itemNo: item.pipItemNo || '',
				coreItemNo: item.pipCoreItemNo || '',
				itemName: item.pipItemName || '',
				qty: Number(item.pipItemQty) || 0,
				costElement: item.pipElement || '',
				ibsCode: item.pipIBSCode || '',
				pipCode: pipEntry.pipCode || '',
				jobNo: pipEntry.jobNo || '',
				fg: pipEntry.fgCode || '',
				belongsToPip: pipEntry.pipCode || '',
				pipItemIndex: index,
			}));
		} catch (e) {
			console.warn('item のパースに失敗:', e);
		}

		try {
			const aipArray =
				typeof pipEntry.aip === 'string'
					? JSON.parse(pipEntry.aip)
					: pipEntry.aip;

			vendors = (aipArray || []).map((vendor: any) => ({
				aipCode: vendor.aipCode || '',
				id: vendor.aipPsysVendorId || '',
				name: vendor.vendorName || '',
				code: vendor.vendorCode || '',
			}));
		} catch (e) {
			console.warn('aip のパースに失敗:', e);
		}

		return {
			code: pipEntry.pipCode || '',
			nickname: pipEntry.pipNickName || '',
			items,
			vendors,
		};
	});

	return { pips };
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\getVendorColumns.ts ===== */

import type { ColumnDef } from '@tanstack/react-table';
import type { Vendor } from '@/types';

/**
 * ベンダーテーブルのカラム定義
 */
export const getVendorColumns = (): ColumnDef<Vendor>[] => {
	// ベースとなるカラム定義（すべての列を表示）
	const base: ColumnDef<Vendor>[] = [
		{
			id: 'name',
			header: 'Vendor Name',
			accessorKey: 'name',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'code',
			header: 'Vendor Code',
			accessorKey: 'code',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
		{
			id: 'aipCode',
			header: 'AIP',
			accessorKey: 'aipCode',
			size: 150,
			minSize: 120,
			maxSize: 200,
		},
	];

	return base;
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\stylePipCell.ts ===== */

/**
 * PIPテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const stylePipCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	// Item Count, Vendor Countは右寄せ
	return (columnId === 'itemCount' || columnId === 'vendorCount') &&
		typeof value === 'number'
		? 'text-right'
		: undefined;
};



/* ===== FILE: \ps-ps\src\features\pip-management\utils\styleVendorCell.ts ===== */

/**
 * ベンダーテーブルのセル単位で条件に応じたスタイルクラスを返す関数
 * columnId: 現在の列id
 * value: セルの表示値
 */
export const styleVendorCell = ({
	columnId,
	value,
}: {
	columnId: string;
	value: unknown;
}): string | undefined => {
	return columnId === 'name' && typeof value === 'string'
		? '' // tailwind cssのコードを書くとセルにスタイルが当たる（例：bg-yellow-50）
		: undefined; // 条件に合わない場合はクラスなし
};



/* ===== FILE: \ps-ps\src\features\pip-randing\components\AppLogo.tsx ===== */

import { Database } from 'lucide-react'; // アイコンとして使用する Lucide の Database アイコンをインポート

interface AppLogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	subtitle?: string;
	className?: string;
}

/**
 * ロゴ表示用のコンポーネント
 * size: サイズ指定（デフォルトは 'md'）
 * subtitle: サブタイトル（未使用だが拡張可能）
 * className: 外部から渡される追加クラス
 */
export function AppLogo({ size = 'md', className = '' }: AppLogoProps) {
	// テキストサイズのクラス定義
	const textSizeClasses = {
		sm: 'text-xl',
		md: 'text-2xl',
		lg: 'text-5xl',
		xl: 'text-7xl',
	};

	// サブタイトルのサイズクラス定義
	const subtitleSizeClasses = {
		sm: 'text-xs',
		md: 'text-xs',
		lg: 'text-base',
		xl: 'text-lg',
	};

	// 外枠アイコンサイズ（背景ボックス）
	const iconSizes = {
		sm: 'w-6 h-6',
		md: 'w-10 h-10',
		lg: 'w-16 h-16',
		xl: 'w-24 h-24',
	};

	// 内部アイコンサイズ（Database アイコン）
	const iconInnerSizes = {
		sm: 'w-3 h-3',
		md: 'w-5 h-5',
		lg: 'w-8 h-8',
		xl: 'w-12 h-12',
	};

	// アイコンとテキストの間の余白
	const gapClasses = {
		sm: 'gap-2',
		md: 'gap-3',
		lg: 'gap-4',
		xl: 'gap-5',
	};

	return (
		// ロゴ全体のラッパー（アイコン＋テキスト）
		<div className={`flex items-center ${gapClasses[size]} ${className}`}>
			{/* アイコンの外枠（白枠＋角丸） */}
			<div
				className={`${iconSizes[size]} border-2 border-white rounded-lg flex items-center justify-center flex-shrink-0`}
			>
				{/* Lucide の Database アイコン */}
				<Database className={`text-white ${iconInnerSizes[size]}`} />
			</div>

			{/* テキスト部分（Ps-ps + サブタイトル） */}
			<div className="flex flex-col">
				{/* メインロゴテキスト */}
				<div
					className={`font-logo tracking-tight select-none ${textSizeClasses[size]} text-white leading-none`}
				>
					{/* ロゴの構成：P - sys */}
					<span className="inline-block">P</span>
					<span className="inline-block text-white font-normal">-</span>
					<span className="inline-block">sys</span>
				</div>

				{/* サブタイトル（固定文言） */}
				<div
					className={`${subtitleSizeClasses[size]} AppLogo text-white font-light tracking-wide mt-1`}
				>
					調達WBS管理システム
				</div>
			</div>
		</div>
	);
}



/* ===== FILE: \ps-ps\src\features\pip-randing\components\index.ts ===== */

export { AppLogo } from './AppLogo';
export { Sidebar } from './Sidebar';
export { SplashWrapper } from './SplashWrapper';



/* ===== FILE: \ps-ps\src\features\pip-randing\components\Sidebar.tsx ===== */

import { useEffect, useMemo, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAlertStore } from '@/stores/useAlartStore';
import { type FG, useFgsStore } from '@/stores/useFgsStore';
import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { useFunctionGroups } from '../hooks/useFunctionGroups';
import { SidebarNavigation } from './SidebarNavigation';

/**
 * サイドバーコンポーネントの定義
 */
export const Sidebar = () => {
	// プロジェクトの状態
	const { selectedProject } = useSelectedProjectStore();

	// FGリストの状態
	const { fgs, setFgs } = useFgsStore();

	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// 選択したJobNo、FG
	const { selectedJobNo, setSelectedJobNo } = useSelectedJobNoStore();
	const { selectedFG, setSelectedFG } = useSelectedFGStore();

	// FGセレクトボックスのOption
	const [fgOptions, setFgOptions] = useState<
		{ value: string; label: string }[]
	>([]);

	// FGをAPIで取得
	const { data: fgData } = useFunctionGroups();

	// FGリストをグローバルstateに設定、FGセレクトボックスのOption設定
	useEffect(() => {
		if (!fgData) return;
		const parsedResponse = JSON.parse(fgData.responseJSON);
		const fgList: FG[] = JSON.parse(parsedResponse.fg);
		setFgs(fgList);

		const options = fgList.map((fg) => ({
			value: fg.fgCode.trim(),
			label: fg.fgDescription.replace(/\s*:\s*/, ':'),
		}));
		setFgOptions(options);
	}, [fgData, setFgs]);

	// FGセレクトボックスonChangeイベント
	const handleFG = (value: string) => {
		const fg = fgs.find((f) => f.fgCode === value);
		if (fg) setSelectedFG(fg);
	};

	// JobNoの選択肢
	const selectJobNoOptions = useMemo(() => {
		return (
			selectedProject?.jobNos.map((jobNo) => ({
				value: jobNo,
				label: jobNo,
			})) ?? []
		);
	}, [selectedProject]);

	// JobNoの初期値を設定（プロジェクトが変わったとき）
	useEffect(() => {
		if (selectedProject?.jobNos.length) {
			setSelectedJobNo(selectedProject.jobNos[0]);
		}
	}, [selectedProject]);

	// JobNoセレクトボックスonChangeイベント
	const handleJobNo = (value: string) => {
		setSelectedJobNo(value);
	};

	// Display by Selectionの押下状態
	const { triggerSearch } = useIsSearchTriggeredStore();

	// Display by Selectionボタンclickイベント
	const handleDisplayBySelection = () => {
		if (selectedFG) {
			const fg = fgs.find((f) => f.fgCode === selectedFG.fgCode);
			if (fg) {
				setSelectedFG(fg);
				// Display by Selectionを押下状態にする
				triggerSearch();
			}
		}
	};

	// FG未選択時の通知
	useEffect(() => {
		if (!selectedFG) {
			showAlert(['SELECT_FG']);
		}
	}, [selectedFG]);

	return (
		<>
			<aside className="w-60 h-full shrink-0 bg-gradient-to-b from-orange-400 via-orange-400 to-orange-300">
				<div className="mt-4">
					{/* JOB NO.選択ボックス */}
					<div className="px-2">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							JOB NO.
						</h2>
						<Select value={selectedJobNo} onValueChange={handleJobNo}>
							<SelectTrigger className="mt-1 w-[100%] bg-white">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectJobNoOptions.length > 0 ? (
										selectJobNoOptions.map((jobNo) => (
											<SelectItem key={jobNo.value} value={jobNo.value}>
												{jobNo.label}
											</SelectItem>
										))
									) : (
										<SelectItem disabled value="none">
											Job No.がありません
										</SelectItem>
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					{/* FUNCTION GROUP選択ボックス */}
					<div className="px-2 mt-2">
						<h2 className="text-xs font-semibold tracking-wide text-white">
							FUNCTION GROUP
						</h2>
						<Select onValueChange={handleFG} value={selectedFG?.fgCode}>
							<SelectTrigger className="mt-1 w-[100%] bg-white">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{fgOptions.map((fg) => (
										<SelectItem key={fg.value} value={fg.value}>
											{fg.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>

						{/* 選択に基づいて表示するボタン */}
						<div className="mt-4">
							<Button
								className="w-[100%] cursor-pointer"
								disabled={!selectedFG}
								onClick={handleDisplayBySelection}
							>
								Display by Selection
							</Button>
						</div>
					</div>
				</div>

				{/* ナビゲーションメニューの表示 */}
				<SidebarNavigation />
			</aside>

			{/* アラートメッセージ */}
			{isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)}
		</>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-randing\components\SidebarNavigation.tsx ===== */

import { Link } from '@tanstack/react-router';
import { CalendarDays } from 'lucide-react';
import { NAV } from '../constants/navigation';

/**
 * サイドバーの画面遷移ナビゲーションタブ
 */
export const SidebarNavigation = () => {
	return (
		<nav className="mt-10">
			{NAV.map((group) => (
				<div key={group.id} className="space-y-2">
					{group.heading && (
						<h2 className="text-xs font-semibold tracking-wide text-white px-2">
							{group.heading}
						</h2>
					)}
					{group.items.map(({ id, label, to, icon }) => (
						<Link
							key={id}
							to={to}
							className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
							activeProps={{
								className:
									'bg-white !text-gray-800 font-medium pointer-events-none',
							}}
						>
							{icon}
							<span>{label}</span>
						</Link>
					))}
				</div>
			))}

			<div className="mt-10">
				<h2 className="text-xs font-semibold tracking-wide text-white p-2">
					LINKED SYSTEMS
				</h2>
				<Link
					key="msr"
					to="/msr"
					className="flex w-full items-center gap-4 px-4 py-4 text-white hover:bg-gray-600/20 text-lg"
					activeProps={{
						className:
							'bg-white !text-gray-800 font-medium pointer-events-none',
					}}
				>
					<CalendarDays />
					<span>MARUSE</span>
				</Link>
			</div>
		</nav>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-randing\components\SplashScreen.tsx ===== */

import { motion, type Variants } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * P-Sys遷移時のアニメーションを定義するコンポーネント
 * setForceSplashClose: アニメーションを強制終了するset関数
 * setShowedSplash: アニメーションが表示済みにするset関数
 */
export const SplashScreen = ({
	setForceSplashClose,
	setShowedSplash,
}: {
	setForceSplashClose: React.Dispatch<React.SetStateAction<boolean>>;
	setShowedSplash: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// タイトルに表示する文字列（タイプライター風に表示される）
	const [titleDisplayed, setTitleDisplayed] = useState('');
	// サブタイトルに表示する文字列（タイプライター風に表示される）
	const [subtitleDisplayed, setSubtitleDisplayed] = useState('');
	// タイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showTitleCursor, setShowTitleCursor] = useState(true);
	// サブタイトルのカーソルを表示するかどうか（点滅アニメーション用）
	const [showSubtitleCursor, setShowSubtitleCursor] = useState(false);
	// タイトルの表示が完了したかどうか（サブタイトル表示のトリガーに使用）
	const [titleComplete, setTitleComplete] = useState(false);

	const titleText = 'P-Sys';
	const subtitleText = '調達WBS管理システム';

	// タイトルのタイプライターエフェクト
	useEffect(() => {
		let titleIndex = 0;
		const titleTimer = setInterval(() => {
			if (titleIndex < titleText.length) {
				setTitleDisplayed(titleText.slice(0, titleIndex + 1));
				titleIndex++;
			} else {
				clearInterval(titleTimer);
				setTitleComplete(true);
				setShowTitleCursor(false);
				// 少し待ってからサブタイトル開始
				setTimeout(() => {
					setShowSubtitleCursor(true);
				}, 500);
			}
		}, 100); // 200ms間隔で1文字ずつ

		return () => clearInterval(titleTimer);
	}, []);

	// サブタイトルのタイプライターエフェクト
	useEffect(() => {
		if (!titleComplete) return;

		let subtitleIndex = 0;
		const subtitleTimer = setTimeout(() => {
			const interval = setInterval(() => {
				if (subtitleIndex < subtitleText.length) {
					setSubtitleDisplayed(subtitleText.slice(0, subtitleIndex + 1));
					subtitleIndex++;
				} else {
					clearInterval(interval);
					// タイピング完了後もカーソルを点滅させ続ける
				}
			}, 150); // 150ms間隔で1文字ずつ

			return () => clearInterval(interval);
		}, 500); // タイトル完了から500ms後に開始

		return () => clearTimeout(subtitleTimer);
	}, [titleComplete]);

	// カーソルの点滅アニメーション
	const cursorVariants: Variants = {
		visible: {
			opacity: [0, 1, 0],
			transition: {
				duration: 1,
				repeat: Number.POSITIVE_INFINITY,
				ease: 'linear',
			},
		},
	};

	// コンテナのアニメーション
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<>
			<div className="flex justify-end p-10">
				{/* 強制終了ボタン */}
				<button
					type="button"
					className="hover:bg-gray-200 rounded cursor-pointer"
					onClick={() => {
						sessionStorage.setItem('hasSeenSplash', 'true');
						setForceSplashClose(true);
						setShowedSplash(true);
					}}
				>
					<X />
				</button>
			</div>
			<div className="min-h-[60vh] flex items-center justify-center overflow-hidden">
				<motion.div
					className="text-center"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* タイトル */}
					<div className="font-logo text-6xl md:text-8xl font-bold text-gray-800 tracking-wide mb-8">
						<span className="font-logo">{titleDisplayed}</span>
						{showTitleCursor && (
							<motion.span
								className="inline-block ml-1 w-1 bg-gray-800"
								style={{ height: '1em' }}
								variants={cursorVariants}
								animate="visible"
							/>
						)}
					</div>

					{/* サブタイトル */}
					<div className="mt-8">
						<div className="font-logo text-2xl md:text-3xl font-medium text-gray-600 tracking-wider">
							<span>{subtitleDisplayed}</span>
							{showSubtitleCursor && (
								<motion.span
									className="inline-block ml-1 w-0.5 bg-gray-600"
									style={{ height: '1em' }}
									variants={cursorVariants}
									animate="visible"
								/>
							)}
						</div>
					</div>

					{/* 装飾線（サブタイトル完了後に表示） */}
					{subtitleDisplayed.length === subtitleText.length && (
						<motion.div
							className="mt-6"
							initial={{ opacity: 0, scaleX: 0 }}
							animate={{ opacity: 1, scaleX: 1 }}
							transition={{ delay: 0.5, duration: 0.8 }}
						>
							<div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-indigo-700 mx-auto rounded-full" />
						</motion.div>
					)}
				</motion.div>
			</div>
		</>
	);
};



/* ===== FILE: \ps-ps\src\features\pip-randing\components\SplashWrapper.tsx ===== */

import { useEffect, useState } from 'react';
import { SplashScreen } from './SplashScreen';

type SplashWrapperProps = {
	children: React.ReactNode;
};

/**
 * スプラッシュ画面の表示制御を行うラッパーコンポーネント
 * children: 子コンテンツ 現状item-assignment.tsxになる
 */
export const SplashWrapper: React.FC<SplashWrapperProps> = ({ children }) => {
	// アニメーション強制終了の制御
	const [forceSplashClose, setForceSplashClose] = useState(false);
	// スプラッシュ画面が表示済みかどうかの状態管理
	const [showedSplash, setShowedSplash] = useState(false);

	// 初回レンダリング時にスプラッシュ表示の有無を判定
	useEffect(() => {
		// sessionStorage に保存された表示履歴を取得
		const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

		if (hasSeenSplash || forceSplashClose) {
			// すでに表示済みなら即座にメインコンテンツを表示
			setShowedSplash(true);
		} else {
			// 初回表示の場合は 5.5 秒間アニメーション画面を表示
			const timer = setTimeout(() => {
				setShowedSplash(true);
				// 表示済みフラグを sessionStorage に保存
				sessionStorage.setItem('hasSeenSplash', 'true');
			}, 5500);
			// クリーンアップ
			return () => clearTimeout(timer);
		}
	}, [forceSplashClose]);

	// スプラッシュ画面が未表示なら SplashScreen を表示
	if (!showedSplash) {
		return (
			<SplashScreen
				setForceSplashClose={setForceSplashClose}
				setShowedSplash={setShowedSplash}
			/>
		);
	}

	// スプラッシュ表示後に子コンテンツを表示
	return <>{children}</>;
};



/* ===== FILE: \ps-ps\src\features\pip-randing\constants\navigation.tsx ===== */

import { Package, ShoppingCart } from 'lucide-react';

// ナビゲーションアイテムの型定義
type NavItem = {
	id: string;
	label: string;
	to: string;
	icon: React.ReactElement;
};

// ナビゲーショングループの型定義
type NavGroup = {
	id: string;
	heading?: string;
	items: NavItem[];
};

// P-Sysの共通パス定義
const pSysPath = '/ps-ps';

// ナビゲーションメニューの定義
export const NAV: NavGroup[] = [
	{
		id: 'psys',
		heading: 'MENU',
		items: [
			{
				id: 'items',
				label: '購入品管理',
				to: `${pSysPath}/item-assignment`,
				icon: <ShoppingCart className="h-5 w-5" />,
			},
			{
				id: 'pips',
				label: 'PIP管理',
				to: `${pSysPath}/pips`,
				icon: <Package className="h-5 w-5" />,
			},
		],
	},
];



/* ===== FILE: \ps-ps\src\features\pip-randing\hooks\useFunctionGroups.ts ===== */

import { useQuery } from '@tanstack/react-query';

/**
 * APIでFGリストを取得
 */
export const useFunctionGroups = () => {
	return useQuery({
		queryKey: ['fgs'],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetFg',
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 400) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 404) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				if (response.status === 500) {
					throw new Error(`HTTP status: ${response.status}`);
				}

				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\randing\components\Message.tsx ===== */

/**
 * ホーム画面のメッセージエリアを定義
 * @returns
 */
export const Message = () => {
	return (
		<div className="isolate rounded-xl bg-gray-200/30 shadow-lg ring-1 ring-black/5 h-60 w-120 p-5">
			<h4>message:</h4>
			<p className="mt-2 text-red-600">
				Cautions when using : Don't upload information on list-regulated
				products under export-related laws and US technical information
				<br />
				利用における注意事項 :
				輸法該当技術・米国技術に該当する情報は登録してはならない
			</p>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\randing\components\MotionButton.tsx ===== */

import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type MotionButtonProps = {
	link: string;
	icon: LucideIcon;
	title: string;
	text: string;
	disabled: boolean;
	onClick?: () => void;
};

/**
 * ホーム画面の各システムへの遷移ボタンのUIを定義
 * link: 遷移先のpath
 * icon: ボタン上部のアイコン
 * title: 遷移先のシステム名
 * text: 遷移先のシステムの概要
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
	link,
	icon: Icon,
	title,
	text,
	disabled, //ボタン制御
	onClick, // onclickイベント
}) => {
	return (
		<Link to={disabled ? '#' : link}>
			<motion.button
				className="isolate rounded-4xl bg-white shadow-lg ring-1 ring-black/10 w-60 h-90 p-8 hover:ring-orange-400 hover:ring-3"
				whileHover={{ y: -5 }}
				onClick={onClick}
			>
				<div className="flex flex-col items-center justify-start h-full">
					<div className="p-5">
						<Icon size={80} className="text-gray-800" />
					</div>
					<div className="border-2 w-full border-gray-800" />
					<h3 className="text-2xl mt-3 text-gray-800">{title}</h3>
					<p className="text-left mt-3 text-gray-800">{text}</p>
				</div>
			</motion.button>
		</Link>
	);
};



/* ===== FILE: \ps-ps\src\features\randing\mocks\projects.ts ===== */

/**
 * Projectデータ(初期開発では静的データ)
 */
export const projects = [
	{
		projectId: 'PJ00000001',
		projectNm: 'abcdプロジェクト',
		jobNo: '12334',
		jobOrderNo: '123450',
	},
	{
		projectId: 'PJ00000002',
		projectNm: 'xxxxx2',
		jobNo: 'xx12',
		jobOrderNo: '234560',
	},
	{
		projectId: 'PJ00000003',
		projectNm: 'porepore Project',
		jobNo: 'xx23',
		jobOrderNo: '234560',
	},
];



/* ===== FILE: \ps-ps\src\features\randing\utils\transformProjects.ts ===== */

type Project = {
	projectId: string;
	projectNm: string;
	jobNo: string;
	jobOrderNo: string;
};

type GroupedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

// APIから取得したプロジェクトリストを整形
export const transformProjects = (projects: Project[]): GroupedProject[] => {
	const map = new Map<string, GroupedProject>();

	projects.forEach((p) => {
		if (!map.has(p.projectId)) {
			map.set(p.projectId, {
				projectId: p.projectId,
				projectNm: p.projectNm,
				jobNos: [p.jobNo],
				jobOrderNos: [p.jobOrderNo],
			});
		} else {
			const existing = map.get(p.projectId)!;
			if (!existing.jobNos.includes(p.jobNo)) {
				existing.jobNos.push(p.jobNo);
			}
			if (!existing.jobOrderNos.includes(p.jobOrderNo)) {
				existing.jobOrderNos.push(p.jobOrderNo);
			}
		}
	});

	return Array.from(map.values());
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\PageHeader.tsx ===== */

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
	title: string;
	onBack: () => void;
	onCreateAip: () => void;
	selectedVendors: any[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
	title,
	onBack,
	onCreateAip,
	selectedVendors,
}) => (
	<div className="flex items-center gap-6 justify-between">
		{/* 左側：戻るボタンとタイトル */}
		<div className="flex items-center gap-4">
			<Button
				size="sm"
				variant="outline"
				onClick={onBack}
				className="text-gray-800"
			>
				<ArrowLeft className="w-4 h-4" />
				戻る
			</Button>
			<h2 className="text-lg font-semibold text-gray-800">{title}</h2>
		</div>

		{/* 右側：操作ボタンエリア */}
		<div className="flex items-end justify-between mt-2">
			<div className="flex items-center gap-2">
				{/* AIP生成 */}
				<Button
					size="sm"
					variant="outline"
					disabled={selectedVendors.length === 0}
					onClick={onCreateAip}
					className="flex items-center gap-2 h-8 px-3 bg-orange-500 hover:bg-orange-500/80 text-white hover:text-white cursor-pointer"
				>
					Create AIP
				</Button>
			</div>
		</div>
	</div>
);



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\PipCardGrid.tsx ===== */

import { AlertCircle, Package, Trash2 } from 'lucide-react';
import { PipDataCard } from '@/components/pip-data-card';
import type { Pip, Vendor } from '@/types';

interface PipDetailPanelProps {
	pips: Pip[];
	isAipMode: boolean;
	//onRemoveVendor: (pipCode: string, vendorId: string) => void;
	//onRemovePip: (pipCode: string) => void;
	selectedVendors: Vendor[];
	setSelectedVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	availableVendors: Vendor[];
	setAvailableVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

/**
 * PIPカードグリッドコンポーネント
 * 選択されたPIPとその配下のベンダー情報をカード形式で表示する
 *
 * @param pips - 表示するPIPの配列
 * @param isAipMode - AIPモード（ベンダー割り当て）かどうか
 * @param onRemoveVendor - ベンダー削除時のコールバック
 * @param onRemovePip - PIP削除時のコールバック
 * @param selectedVendors - 画面上で選択されたベンダー
 */

export const PipCardGrid: React.FC<PipDetailPanelProps> = ({
	pips,
	isAipMode,
	//onRemoveVendor,
	//onRemovePip,
	selectedVendors,
	setSelectedVendors,
	setAvailableVendors,
}) => {
	// 削除ボタン押下
	const handleDelete = (selectedVendor: Vendor) => {
		// 画面右側を更新
		setSelectedVendors((prev) =>
			prev.filter(
				(vendor) => vendor.aipPsysVendorId !== selectedVendor.aipPsysVendorId,
			),
		);

		// 画面左側を更新
		setAvailableVendors((prev) => [...prev, selectedVendor]);
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-300 flex flex-col py-4 px-8 h-[83%]">
			{/* How: h-[83%]は親コンポーネントの高さに対する相対値
		    Why not: 固定px値ではなく%を使用することで、異なる画面サイズでも適切に表示される */}
			<div className="h-full flex flex-col">
				<h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
					<Package size={20} />
					{/* How: pips.lengthが1より大きい場合のみ件数を表示し、
				    単数の場合はシンプルな表記にすることでUIをすっきりさせる */}
					{pips.length > 1
						? `選択されたPIP (${pips.length}件)`
						: '選択されたPIP'}
				</h2>

				{/* How: overflow-y-autoにより、PIPが多い場合でも
			    ヘッダーは固定したままコンテンツ部分のみスクロール可能 */}
				<div className="flex-1 space-y-4 overflow-y-auto">
					{pips.map((pip) => (
						<PipDataCard key={pip.code} variant="generatedItem" size="default">
							<PipDataCard.Header
								pipData={{
									code: pip.code,
									nickname: pip.nickname,
									type: 'pip',
								}}
								actions={[
									{
										id: 'remove',
										//icon: <Trash2 size={16} />,
										/* How: onRemovePipに直接pip.codeを渡すことで、
									   どのPIPを削除するかを親コンポーネントで特定可能 */
										//onClick: () => onRemovePip(pip.code),
										tooltip: 'PIPを削除',
										variant: 'danger',
									},
								]}
								metadata={{
									vendorCount: selectedVendors.length,
								}}
							/>
							{/* Why not: isAipModeでない場合（PIP表示モードなど）は
						    ベンダー情報を表示しない設計により、モードごとの表示を制御 */}
							{isAipMode && (
								<PipDataCard.Content
									items={selectedVendors.map((vendor) => ({
										...vendor,
										/* How: vendor.idをtoString()で文字列に変換
									   Why not: PipDataCardが文字列IDを期待するため、
									   数値や他の型のIDも安全に処理できるようにしている */
										id: vendor.aipPsysVendorId.toString(),
										displayName: vendor.vendorName,
										/* How: vendorIdを別途保持することで、
									   削除時に元のID型（string/number）を維持 */
										displayCode: vendor.vendorCode,
										vendorId: vendor.aipPsysVendorId,
									}))}
									renderItem={(vendor) => (
										<PipDataCard.Item
											actions={[
												{
													id: 'remove',
													icon: <Trash2 size={12} />,
													/* How: pip.codeとvendor.vendorIdの両方を渡すことで、
												   どのPIPのどのベンダーかを一意に特定可能 */
													onClick: () =>
														//onRemoveVendor(pip.code, vendor.vendorId),
														handleDelete(vendor),
													tooltip: 'ベンダーを削除',
													variant: 'danger',
												},
											]}
										>
											<div className="flex justify-between items-center">
												<span className="text-sm">{vendor.displayName}</span>
												<span className="text-sm ">{vendor.displayCode}</span>
											</div>
										</PipDataCard.Item>
									)}
									/* How: ベンダーが未割り当ての場合の空状態表示
								   Why not: 単に空白にするのではなく、明確な指示を表示することで
								   ユーザーが次に何をすべきかを理解しやすくする */
									emptyState={{
										icon: <AlertCircle size={48} className="text-gray-300" />,
										title: 'まだベンダーが割り当てられていません',
										description:
											'左のテーブルからベンダーを選択して割り当ててください',
									}}
								/>
							)}
						</PipDataCard>
					))}
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\components\VendorSelectionPanel.tsx ===== */

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { ArrowRight, CircleChevronRight, Search, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { IndeterminateCheckbox } from '@/components/ui/IndeterminateCheckbox';
import { Input } from '@/components/ui/input';
import type { Vendor } from '@/types';

interface VendorSelectionPanelProps {
	vendors: Vendor[];
	selectedVendorIds: string[];
	onSelectionChange: (ids: string[]) => void;
	onAssign: (vendors: Vendor[]) => void;
	setSelectedVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
	setAvailableVendors: React.Dispatch<React.SetStateAction<Vendor[]>>;
}

export const VendorSelectionPanel: React.FC<VendorSelectionPanelProps> = ({
	vendors,
	selectedVendorIds,
	onSelectionChange,
	onAssign,
	setSelectedVendors, // 画面上で選択されたベンダー
	setAvailableVendors, // 画面上で選択可能なベンダー
}) => {
	const [globalFilter, setGlobalFilter] = useState('');

	// How: ID配列をTanStack Tableのインデックスベース選択状態に変換
	// Why not: IDベースの管理ではなくインデックスベースを使う理由は、
	// TanStack Tableの内部実装に合わせることでパフォーマンスが向上するため
	const rowSelection = useMemo(() => {
		const selection: Record<string, boolean> = {};
		vendors.forEach((vendor, index) => {
			if (selectedVendorIds.includes(vendor.aipPsysVendorId)) {
				selection[index.toString()] = true;
			}
		});
		return selection;
	}, [vendors, selectedVendorIds]);

	const columns = useMemo<ColumnDef<Vendor>[]>(
		() => [
			{
				id: 'select',
				size: 40,
				header: ({ table }) => (
					<IndeterminateCheckbox
						checked={table.getIsAllPageRowsSelected()}
						indeterminate={table.getIsSomePageRowsSelected()}
						onChange={table.getToggleAllPageRowsSelectedHandler()}
					/>
				),
				cell: ({ row }) => (
					<IndeterminateCheckbox
						checked={row.getIsSelected()}
						onChange={row.getToggleSelectedHandler()}
					/>
				),
			},
			{
				accessorKey: 'vendorName',
				header: 'ベンダー名',
				cell: ({ row }) => (
					<span className="text-gray-900 text-sm">
						{row.original.vendorName}
					</span>
				),
			},
			{
				accessorKey: 'vendorCode',
				header: 'ベンダーコード',
				cell: ({ row }) => (
					<span className="text-gray-700 text-xs">
						{row.original.vendorCode}
					</span>
				),
			},
		],
		[],
	);

	const table = useReactTable({
		data: vendors,
		columns,
		state: { rowSelection, globalFilter },
		enableRowSelection: true,

		// How: TanStack Tableの選択状態更新をインターセプトし、
		// インデックスベースからIDベースに変換して親コンポーネントに通知
		onRowSelectionChange: (updater) => {
			const newSelection =
				typeof updater === 'function' ? updater(rowSelection) : updater;
			const selectedIds = Object.keys(newSelection)
				.filter((key) => newSelection[key])
				.map((index) => vendors[Number.parseInt(index)]?.aipPsysVendorId)
				.filter(Boolean);
			onSelectionChange(selectedIds);
		},
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		globalFilterFn: 'includesString',
	});

	const handleAssign = () => {
		// 選択されたベンダーの一覧
		const selectedVendors = vendors.filter((vendor) =>
			selectedVendorIds.includes(vendor.aipPsysVendorId),
		);

		// 画面右側を更新
		onAssign(selectedVendors);
		setSelectedVendors((prev) => [...prev, ...selectedVendors]);

		// 画面左側を更新
		setAvailableVendors((prev) =>
			prev.filter(
				(vendor) =>
					!selectedVendors.some(
						(selected) => selected.aipPsysVendorId === vendor.aipPsysVendorId,
					),
			),
		);

		// Why not: 割り当て後も選択状態を維持しない理由は、
		// 同じベンダーの重複割り当てを防ぐため
		onSelectionChange([]);
	};

	return (
		<div className="bg-white rounded-lg border border-gray-300 flex flex-col shadow-sm py-4 px-8 h-full">
			<div>
				<h2 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
					<Users size={20} />
					未割り当てベンダー
				</h2>
				<div className="flex gap-4 mb-4">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
						<Input
							placeholder="ベンダー名で検索..."
							value={globalFilter}
							onChange={(e) => setGlobalFilter(e.target.value)}
							className="pl-10 text-sm"
						/>
					</div>
					<Button
						onClick={handleAssign}
						disabled={selectedVendorIds.length === 0}
						className="flex items-center gap-2"
					>
						<CircleChevronRight size={16} />
						PIPに割り当て ({selectedVendorIds.length}件)
						<ArrowRight size={16} />
					</Button>
				</div>
			</div>

			<div className="text-sm text-gray-600 mb-2">
				{selectedVendorIds.length > 0
					? `${selectedVendorIds.length}件選択中`
					: `${vendors.length}件のベンダー`}
			</div>

			<div className="bg-white rounded-lg border border-gray-300 flex-1 overflow-auto">
				<table className="w-full">
					<thead className="bg-gray-50 sticky top-0">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
										style={{ width: header.getSize() }}
									>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody className="bg-white divide-y divide-gray-100">
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className={`hover:bg-gray-50 transition-colors cursor-pointer ${
									row.getIsSelected() ? 'bg-blue-50' : ''
								}`}
								// Why not: チェックボックスだけでなく行全体をクリック可能にする理由は、
								// ユーザビリティ向上のため（特にタッチデバイスでの操作性）
								onClick={() => row.toggleSelected()}
							>
								{row.getVisibleCells().map((cell) => (
									<td key={cell.id} className="px-3 py-2 text-sm">
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\hooks\useAipGenerate.ts ===== */

import { useMutation } from '@tanstack/react-query';
import type { Vendor } from '@/types';

export const useAipGenerate = () => {
	return useMutation({
		mutationFn: async ({
			userId,
			jobNo,
			fgCode,
			targetVendors,
			pipCode,
		}: {
			userId: string;
			jobNo: string;
			fgCode: string;
			targetVendors: Vendor[];
			pipCode: string;
		}) => {
			const targetAip = targetVendors.map((vendor) => ({
				pipCode,
				aipPsysVendorId: vendor.aipPsysVendorId,
			}));
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GenerateAIP',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								userId: userId,
								jobNo: jobNo,
								fgCode: fgCode.charAt(0),
								aip: targetAip,
							}),
						}),
					},
				);

				if (!response.ok) {
					console.log(response.status);
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\hooks\useVendorAssignment.ts ===== */

import { useCallback } from 'react';
import type { Vendor } from '@/types';
import type {
	UseVendorAssignmentProps,
	UseVendorAssignmentReturn,
} from '../types';

/**
 * ベンダー割り当て処理を管理するカスタムフック
 *
 * How: 選択された複数のPIPに対して、ベンダーの一括割り当て・削除・PIP自体の削除を行う
 * 状態管理は親コンポーネントに委譲し、このフックは更新ロジックのみを提供する
 */
export const useVendorAssignment = ({
	selectedPips,
	onPipsUpdate,
}: UseVendorAssignmentProps): UseVendorAssignmentReturn => {
	/**
	 * 選択されたベンダーをPIPに割り当てる
	 *
	 * How: 選択された全てのPIPに対して、同じベンダーセットを一括で追加する
	 * Why not: 重複チェックを行っていないのは、呼び出し元で既に割り当て済みベンダーを
	 *          除外したリストから選択しているため
	 */
	const assignVendors = useCallback(
		(vendors: Vendor[]) => {
			// How: Vendor型をVendor型に変換しているように見えるが、実際は
			// マスターデータのVendor型に、割り当て固有の情報（status, assignedDate）を追加している
			// Why not: 型名が同じなのは、importされているVendor型と
			//          このフック内で使用するVendor型が異なる定義のため（型の重複に注意）
			const newVendors: Vendor[] = vendors.map((vendor) => ({
				id: vendor.id,
				vendorNumber: vendor.vendorNumber,
				name: vendor.name,
				code: vendor.code,
				function: vendor.function,
				// How: 新規割り当て時は常に'active'ステータスで登録
				status: 'active' as const,
				// How: 割り当て日は現在日付のYYYY-MM-DD形式で記録
				assignedDate: new Date().toISOString().split('T')[0],
			}));

			// How: 全てのPIPに対して同じベンダーセットを追加する（一括割り当て）
			// Why not: map内でスプレッド演算子を使用しているため、
			//          各PIPの既存ベンダーリストは保持される
			const updatedPips = selectedPips.map((pip) => ({
				...pip,
				vendors: [...pip.vendors, ...newVendors],
			}));

			// How: 更新されたPIPリストを親コンポーネントに通知
			// Why not: 非同期処理やエラーハンドリングがないのは、
			//          このフックは純粋な状態更新ロジックのみを提供し、
			//          実際のAPI通信等は親コンポーネントの責務としているため
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * 特定のPIPから特定のベンダーを削除する
	 *
	 * How: pipCodeで対象PIPを特定し、そのPIPのvendorsリストから
	 *      vendorIdに一致するベンダーを除外する
	 */
	const removeVendor = useCallback(
		(pipCode: string, vendorId: string) => {
			const updatedPips = selectedPips.map((pip) =>
				// How: 対象PIPのみvendorsを更新し、他のPIPはそのまま返す
				pip.code === pipCode
					? {
							...pip,
							// How: filterでvendorIdが一致しないものだけを残す
							vendors: pip.vendors.filter((vendor) => vendor.id !== vendorId),
						}
					: pip,
			);

			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	/**
	 * PIPリストから特定のPIPを削除する
	 *
	 * How: pipCodeに一致するPIPを配列から完全に除外する
	 * Why not: 削除確認は呼び出し元で行うため、このメソッドは
	 *          確認なしで即座に削除を実行する
	 */

	const removePip = useCallback(
		(pipCode: string) => {
			const updatedPips = selectedPips.filter((pip) => pip.code !== pipCode);
			onPipsUpdate(updatedPips);
		},
		[selectedPips, onPipsUpdate],
	);

	return {
		assignVendors,
		removeVendor,
		removePip,
	};
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\hooks\useVendorList.ts ===== */

import { useQuery } from '@tanstack/react-query';

export const useVendorList = (fgCode: string) => {
	return useQuery({
		queryKey: ['vendorList', fgCode],
		queryFn: async () => {
			try {
				const response = await fetch(
					'http://testservb.xx.co.jp/GX_PSYS_TEST2/transactions/GetVendorList',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Cache-Control': 'no-cache',
						},
						cache: 'no-store',
						body: JSON.stringify({
							requestJSON: JSON.stringify({
								fgCode: fgCode.charAt(0),
							}),
						}),
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP status: ${response.status}`);
				}
				return await response.json();
			} catch (error) {
				console.error('Fetch error:', error);
				throw error;
			}
		},
		enabled: !!fgCode, // fgCodeがあるときだけ実行
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false,
	});
};



/* ===== FILE: \ps-ps\src\features\vendor-assignment\index.tsx ===== */

/**
 * Vendor Assignment Feature
 *
 * PIPに対するベンダー割り当て機能を提供
 * - 特定のPIPへのベンダー割り当て
 * - AIPモードでの複数PIP管理
 * - ItemTableからの連携
 */

export type { VendorAssignmentProps } from './types';
export { VendorAssignment } from './VendorAssignment';



/* ===== FILE: \ps-ps\src\features\vendor-assignment\types.ts ===== */

import type { Pip, Vendor } from '@/types';

/**
 * VendorAssignmentコンポーネントのProps
 */
export interface VendorAssignmentProps {
	/** 選択されたPIPリスト */
	selectedPips: Pip[];
	/** 割り当て可能なベンダーリスト */
	availableVendors: Vendor[];
	/** ベンダーリスト更新時のコールバック */
	setAvailableVendors: (vendors: Vendor[]) => void;
	/** AIPモードかどうか */
	isAipMode: boolean;
	/** PIPデータ更新時のコールバック */
	onPipsUpdate: (pips: Pip[]) => void;
	/** 戻るボタンクリック時のコールバック */
	onBack: () => void;
	/**Create PIPボタンクリック時のコールバック */
	onCreateAip: (selectedVendorIds: string[]) => void;
	/** 選択済みベンダーリスト */
	selectedVendors: Vendor[];
	setSelectedVendors: (vendors: Vendor[]) => void;
}

/**
 * useVendorAssignmentフックのProps
 */
export interface UseVendorAssignmentProps {
	selectedPips: Pip[];
	onPipsUpdate: (pips: Pip[]) => void;
}

/**
 * useVendorAssignmentフックの戻り値
 */
export interface UseVendorAssignmentReturn {
	/** ベンダーを割り当てる */
	assignVendors: (vendors: Vendor[]) => void;
	/** ベンダーを削除する */
	removeVendor: (pipCode: string, vendorId: string) => void;
	/** PIPを削除する */
	removePip: (pipCode: string) => void;
}



/* ===== FILE: \ps-ps\src\features\vendor-assignment\VendorAssignment.tsx ===== */

import { useState } from 'react';
import { PageHeader } from './components/PageHeader';
import { PipCardGrid } from './components/PipCardGrid';
import { VendorSelectionPanel } from './components/VendorSelectionPanel';
import { useVendorAssignment } from './hooks/useVendorAssignment';
import type { VendorAssignmentProps } from './types';

export const VendorAssignment: React.FC<VendorAssignmentProps> = ({
	selectedPips,
	availableVendors,
	setAvailableVendors,
	isAipMode,
	onPipsUpdate,
	onBack,
	onCreateAip,
	selectedVendors,
	setSelectedVendors,
}) => {
	// 選択されたベンダーのインデックス
	const [selectedVendorIds, setSelectedVendorIds] = useState<string[]>([]);

	const { assignVendors } = useVendorAssignment({
		selectedPips,
		onPipsUpdate,
	});

	return (
		<div className="h-screen bg-gray-100 p-6 overflow-hidden">
			<PageHeader
				title={isAipMode ? 'AIP生成' : 'PIPベンダー割り当て'}
				onBack={onBack}
				onCreateAip={onCreateAip}
				selectedVendors={selectedVendors}
			/>

			<div className="max-w-10xl mx-auto h-full flex gap-4 mt-6">
				<div className="h-[83%] w-1/2">
					<VendorSelectionPanel
						vendors={availableVendors}
						selectedVendorIds={selectedVendorIds}
						onSelectionChange={setSelectedVendorIds}
						onAssign={assignVendors}
						setSelectedVendors={setSelectedVendors} // 選択されたベンダー
						setAvailableVendors={setAvailableVendors} // 選択可能なベンダーの更新関数
					/>
				</div>

				<div className="w-1/2">
					<PipCardGrid
						pips={selectedPips}
						isAipMode={isAipMode}
						//onRemoveVendor={removeVendor}
						//onRemovePip={removePip}
						// 選択されたベンダー
						selectedVendors={selectedVendors}
						setSelectedVendors={setSelectedVendors}
						// 選択可能なベンダー
						availableVendors={availableVendors}
						setAvailableVendors={setAvailableVendors}
					/>
				</div>
			</div>
		</div>
	);
};



/* ===== FILE: \ps-ps\src\lib\utils.ts ===== */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}



/* ===== FILE: \ps-ps\src\main.tsx ===== */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import { routeTree } from './routeTree.gen';

// Routerの作成
const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
});

// 型安全のための登録
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

// React Queryのクライアント
const queryClient = new QueryClient();

// アプリのルート
const App = () => {
	return (
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</StrictMode>
	);
};

const rootElement = document.getElementById('root');
if (rootElement) {
	createRoot(rootElement).render(<App />);
} else {
	console.error('Root element not found');
}



/* ===== FILE: \ps-ps\src\mocks\costElementData.ts ===== */

/**
 * Cost Element マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	costElementMap,
	getCostElementName as getCostElementNameFromMaster,
} from './masterData';

export const costElementNames: Record<string, string> = Object.fromEntries(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetCostElementNameを使用してください */
export const getCostElementName = getCostElementNameFromMaster;



/* ===== FILE: \ps-ps\src\mocks\ibsCodeData.ts ===== */

/**
 * IBS Code マスターデータ
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
import {
	getIbsCodeName as getIbsCodeNameFromMaster,
	ibsCodeMap,
} from './masterData';

export const ibsCodeNames: Record<string, string> = Object.fromEntries(
	Array.from(ibsCodeMap.entries()).map(([code, option]) => [
		code,
		option.description || option.label,
	]),
);

/** @deprecated masterData.tsのgetIbsCodeNameを使用してください */
export const getIbsCodeName = getIbsCodeNameFromMaster;



/* ===== FILE: \ps-ps\src\mocks\masterData.ts ===== */

/**
 * 統一マスターデータ
 * 選択肢データとマッピングを一元管理
 */

import type { SelectOption } from '../types/common';

/**
 * 拡張SelectOption - 説明付き
 */
export interface MasterOption extends SelectOption {
	/** 詳細説明（日本語） */
	description?: string;
}

/**
 * Cost Element マスターデータ
 */
export const costElementMaster: MasterOption[] = [
	{ code: '6C11', label: '土質調査', description: '土質調査' },
	{
		code: '6H13',
		label: 'S&T 熱交換機 U字管式熱交',
		description: 'S&T 熱交換機 U字管式熱交',
	},
	{
		code: '6H31',
		label: 'プレート式熱交換器 プレート式熱交換器',
		description: 'プレート式熱交換器 プレート式熱交換器',
	},
	{
		code: '6H41',
		label: '廃熱ボイラー 水管式 廃熱ボイラー',
		description: '廃熱ボイラー 水管式 廃熱ボイラー',
	},
	{
		code: '6H42',
		label: '廃熱ボイラー 煙管式 廃熱ボイラー',
		description: '廃熱ボイラー 煙管式 廃熱ボイラー',
	},
	{ code: '6H43', label: '-', description: '-' },
	{ code: '6H44', label: '-', description: '-' },
	{ code: '6H53', label: '-', description: '-' },
	{
		code: '6H98',
		label: 'その他熱交換機_その他',
		description: 'その他熱交換機_その他',
	},
	{
		code: '6J11',
		label: 'プロジェクトマネジメント',
		description: 'プロジェクトマネジメント',
	},
	{
		code: '6J31',
		label: 'アドミニストレーション',
		description: 'アドミニストレーション',
	},
	{ code: '6K45', label: '-', description: '-' },
	{
		code: '6L31',
		label: 'ドームルーフタンク 完成品タンク',
		description: 'ドームルーフタンク 完成品タンク',
	},
	{
		code: '6L32',
		label: 'ドームルーフタンク ノックダウンタンク',
		description: 'ドームルーフタンク ノックダウンタンク',
	},
	{ code: '6L36', label: '-', description: '-' },
	{
		code: '6L42',
		label: 'フラットルーフ・タンク ノックダウンタンク',
		description: 'フラットルーフ・タンク ノックダウンタンク',
	},
	{
		code: '6L61',
		label: '二重殻タンク 完成品タンク',
		description: '二重殻タンク 完成品タンク',
	},
	{ code: '6V11', label: '塔', description: '塔' },
	{
		code: '6V13',
		label: '塔 トレイ･サポート',
		description: '塔 トレイ･サポート',
	},
	{ code: '6V31', label: '反応器 反応器', description: '反応器 反応器' },
	{ code: '6V45', label: '-', description: '-' },
	{ code: '6V46', label: '-', description: '-' },
	{ code: '6V62', label: '-', description: '-' },
	{
		code: '6V81',
		label: 'スクラバー スクラバー',
		description: 'スクラバー スクラバー',
	},
	{ code: '6V95', label: '-', description: '-' },

	{ code: '6F22', label: 'Equipment - Mechanical', description: '機械設備' },
	{ code: '6F23', label: 'Equipment - Electrical', description: '制御装置' },
	{ code: '6G11', label: 'Piping - Main Lines', description: 'ポンプ設備' },
	{ code: '6G12', label: 'Piping - Branch Lines', description: '制御システム' },
	{
		code: '7A01',
		label: 'Instrumentation - Control',
		description: 'センサー機器',
	},
	{
		code: '7A02',
		label: 'Instrumentation - Safety',
		description: 'フィルター設備',
	},
	{ code: '8B15', label: 'Structural - Steel', description: '電源装置' },
	{ code: '8B16', label: 'Structural - Concrete', description: '計測機器' },
	{ code: '9C33', label: 'Civil - Foundation', description: '冷却設備' },
	{ code: '9D44', label: 'Civil - Underground', description: '事務用品' },
	{ code: '5E11', label: 'Basic Components', description: '基本部品' },
	{ code: '5E12', label: 'Assembly Components', description: '組立部品' },
	{ code: '4D21', label: 'Auxiliary Equipment', description: '補助機器' },
	{ code: '4D22', label: 'Control Components', description: '制御部品' },
	{ code: '3C31', label: 'Electronic Parts', description: '電子部品' },
	{ code: '3C32', label: 'Mechanical Parts', description: '機械部品' },
	{ code: '12A1', label: 'Lubrication System', description: '潤滑装置' },
	{ code: '12B2', label: 'Wiring Equipment', description: '配線機器' },
];

/**
 * IBS Code マスターデータ
 */
export const ibsCodeMaster: MasterOption[] = [
	{ code: 'V11', label: 'Ammonia Converter', description: 'Ammonia Converter' },
	{
		code: 'V13',
		label: 'Secondary Reformer',
		description: 'Secondary Reformer',
	},
	{ code: 'V15', label: 'Reactor', description: 'Reactor' },
	{
		code: 'V21',
		label: 'CO2 Stripper / Absorber',
		description: 'CO2 Stripper / Absorber',
	},
	{ code: 'V22', label: 'General Tower', description: 'General Tower' },
	{ code: 'V32', label: 'HP Vessel', description: 'HP Vessel' },
	{ code: 'V33', label: 'General Vessel', description: 'General Vessel' },
	{
		code: 'V40',
		label: 'S&T Heat Exchanger',
		description: 'S&T Heat Exchanger',
	},
	{ code: 'V41', label: 'Waste Heat Boiler', description: 'Waste Heat Boiler' },
	{
		code: 'V42',
		label: 'HP & Cr-Mo Heat Exchanger',
		description: 'HP & Cr-Mo Heat Exchanger',
	},
	{
		code: 'V43',
		label: 'Syn Loop Heat Exchanger',
		description: 'Syn Loop Heat Exchanger',
	},
	{ code: 'V44', label: 'Urea Stripper', description: 'Urea Stripper' },
	{
		code: 'V46',
		label: 'Urea Grade S&T Heat Exchanger',
		description: 'Urea Grade S&T Heat Exchanger',
	},
	{
		code: 'V47',
		label: 'General S&T Heat Exchanger',
		description: 'General S&T Heat Exchanger',
	},
	{
		code: 'V51',
		label: 'Ammonia Storage Tank',
		description: 'Ammonia Storage Tank',
	},
	{ code: 'V61', label: 'Shop Tank', description: 'Shop Tank' },
	{ code: 'V80', label: 'Filter', description: 'Filter' },
	{ code: 'V81', label: 'Cartridge Filter', description: 'Cartridge Filter' },
	{
		code: 'V92',
		label: 'Plate Heat Exchanger',
		description: 'Plate Heat Exchanger',
	},
	{ code: 'V93', label: 'Heater & Chiller', description: 'Heater & Chiller' },
	{ code: 'VB1', label: 'Silencer', description: 'Silencer' },
	{ code: 'VC2', label: 'Steam Ejector', description: 'Steam Ejector' },
	{ code: 'VX1', label: 'Vacuum System', description: 'Vacuum System' },
	{
		code: 'VX2',
		label: 'Granulation Equipment',
		description: 'Granulation Equipment',
	},

	{ code: 'F11', label: 'Process Equipment - Primary', description: '制御弁' },
	{
		code: 'F12',
		label: 'Process Equipment - Secondary',
		description: '安全弁',
	},
	{ code: 'G21', label: 'Utility Systems - Power', description: '主ポンプ' },
	{ code: 'G22', label: 'Utility Systems - Water', description: '制御盤' },
	{ code: 'H31', label: 'Control Systems - DCS', description: '温度センサー' },
	{ code: 'H32', label: 'Control Systems - SIS', description: '圧力センサー' },
	{
		code: 'J41',
		label: 'Infrastructure - Buildings',
		description: '電源ユニット',
	},
	{ code: 'J42', label: 'Infrastructure - Roads', description: '計測ユニット' },
	{
		code: 'K51',
		label: 'Support Systems - Maintenance',
		description: '冷却ユニット',
	},
	{
		code: 'K52',
		label: 'Support Systems - Operations',
		description: '一般機器',
	},
	{ code: 'A12', label: 'Lubrication Systems', description: '潤滑システム' },
	{ code: 'B22', label: 'Foundation Components', description: '基礎部品' },
	{ code: 'C33', label: 'Assembly Parts', description: '組立品' },
	{ code: 'D44', label: 'Auxiliary Parts', description: '補助品' },
	{ code: 'E55', label: 'Control Parts', description: '制御品' },
	{ code: 'L66', label: 'Electronic Parts', description: '電子品' },
];

/**
 * Cost Element検索マップ（高速検索用）
 */
export const costElementMap = new Map(
	costElementMaster.map((option) => [option.code, option]),
);

/**
 * IBS Code検索マップ（高速検索用）
 */
export const ibsCodeMap = new Map(
	ibsCodeMaster.map((option) => [option.code, option]),
);

/**
 * Cost Element名称を取得
 */
export const getCostElementName = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.description || option?.label || `コスト${code}`;
};

/**
 * IBS Code名称を取得
 */
export const getIbsCodeName = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.description || option?.label || `部品${code}`;
};

/**
 * Cost Element英語ラベルを取得
 */
export const getCostElementLabel = (code: string): string => {
	const option = costElementMap.get(code);
	return option?.label || `Cost Element ${code}`;
};

/**
 * IBS Code英語ラベルを取得
 */
export const getIbsCodeLabel = (code: string): string => {
	const option = ibsCodeMap.get(code);
	return option?.label || `IBS Code ${code}`;
};

// SelectOption形式でのエクスポート（後方互換性用）
export const costElementOptions: SelectOption[] = costElementMaster.map(
	({ code, label }) => ({ code, label }),
);
export const ibsCodeOptions: SelectOption[] = ibsCodeMaster.map(
	({ code, label }) => ({ code, label }),
);



/* ===== FILE: \ps-ps\src\mocks\selectOptions.ts ===== */

/**
 * @deprecated masterData.tsを使用してください
 */

// masterData.tsからの再エクスポート（後方互換性のため）
export {
	costElementOptions,
	ibsCodeOptions,
} from './masterData';

// Map型の再エクスポート
import { costElementMap, ibsCodeMap } from './masterData';
export const costElementCodeMap = new Map(
	Array.from(costElementMap.entries()).map(([code, option]) => [
		code,
		option.label,
	]),
);
export { ibsCodeMap };



/* ===== FILE: \ps-ps\src\routes\__root.tsx ===== */

import { createRootRoute, Outlet } from '@tanstack/react-router';

/**
 * すべての画面のエントリーポイントとなる
 */
export const Route = createRootRoute({
	component: () => <Outlet />,
})



/* ===== FILE: \ps-ps\src\routes\home.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';
import { CalendarDays, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Topbar } from '@/components/Topbar';
import { AlertMessages } from '@/components/ui/alertMessages';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Message } from '@/features/randing/components/Message';
import { MotionButton } from '@/features/randing/components/MotionButton';
import { projects } from '@/features/randing/mocks/projects';
import { transformProjects } from '@/features/randing/utils/transformProjects';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';
import { resetGrobalState } from '@/utils/resetGrobalState';

/**
 * ホーム画面のルーティング
 * 背景のスタイルと各オブジェクトのレイアウトを定義する
 */
const RandingPage = () => {
	// アラートの状態
	const { setIsAlertVisible, isAlertVisible, alertMessages, showAlert } =
		useAlertStore();

	// ホーム画面に遷移時、localStorageを初期化
	useEffect(() => {
		resetGrobalState();

		// アラート非表示
		setIsAlertVisible(false);
	}, []);

	// プロジェクトの選択状態
	const { selectedProject, setSelectedProject } = useSelectedProjectStore();

	// プロジェクト整形
	const groupedProjects = useMemo(() => transformProjects(projects), []);

	// セレクト用オプション
	const selectOptions = useMemo(
		() =>
			groupedProjects.map((p) => ({
				value: p.projectId,
				label: p.projectNm,
			})),
		[groupedProjects],
	);

	// プロジェクト選択時に各情報をグローバルステートに設定
	const handleProjectSelect = (projectId: string) => {
		const project = groupedProjects.find((p) => p.projectId === projectId);
		if (project) {
			setSelectedProject({
				projectId: project.projectId,
				projectNm: project.projectNm,
				jobNos: project.jobNos,
				jobOrderNos: project.jobOrderNos,
			});
		}
	};

	const handleSearch = () => showAlert(['SELECT_PROJECT']);

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* ヘッダー */}
			<div className="absolute top-0 z-50 w-full">
				<Topbar />
			</div>
			{/* 背景レイヤー */}
			<div className="absolute inset-0 z-0">
				<div className="h-3/5 bg-white" />
				<div className="h-2/5 bg-gradient-to-b from-orange-300 to-orange-500" />
			</div>
			{/* メッセージ */}
			<div className="absolute top-30 right-30 z-20">
				<Message />
			</div>

			<div className="absolute z-10 inset-30">
				{/* PJセレクトボックス */}
				<div>
					<h3 className="text-4xl text-gray-800">Select a project</h3>
					<div className="mt-5">
						<Select onValueChange={handleProjectSelect}>
							<SelectTrigger className="w-[500px] isolate shadow-lg ring-1 ring-black/10 border-0">
								<SelectValue placeholder="プロジェクトを選択してください" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{selectOptions.map((opt) => (
										<SelectItem key={opt.value} value={opt.value}>
											{opt.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mt-6 space-y-2">
						<div>
							<span className="font-semibold">Order :</span>{' '}
							{selectedProject && selectedProject.jobOrderNos.join(', ')}
						</div>
						<div>
							<span className="font-semibold">Job No. :</span>{' '}
							{selectedProject && selectedProject.jobNos.join(', ')}
						</div>
					</div>
				</div>
				{/* ボタン */}
				<div className="z-10 flex justify-center gap-30 mt-20">
					{/* P-Sys */}
					<MotionButton
						link="/ps-ps/item-assignment"
						icon={ShoppingCart}
						title="購入品の登録"
						text="P-Sysで購入品の登録/編集/削除、PIP(仮引合Pkg)、PIPへのベンダーの割り当てを行います。"
						onClick={handleSearch}
						disabled={!selectedProject}
					/>
					{/* MARUSE */}
					<MotionButton
						link="/msr"
						icon={CalendarDays}
						title="調達管理"
						text="MARUSEで購入品の調達管理を行います。"
						disabled={true}
					/>
				</div>
				{/* アラート表示エリア */}
				{isAlertVisible && alertMessages && (
					<div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-10">
						<AlertMessages messages={alertMessages} />
					</div>
				)}
			</div>
		</div>
	);
};

export const Route = createFileRoute('/home')({
	component: RandingPage,
});



/* ===== FILE: \ps-ps\src\routes\msr\route.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';

/**
 * MARUSEシステムのルート定義
 * "/msr" パスに対応し、MARUSE関連の画面のエントリーポイントとなる
 */
export const Route = createFileRoute('/msr')({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/msr"!</div>;
}



/* ===== FILE: \ps-ps\src\routes\ps-ps\item-assignment.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';
import { ItemAssignmentView } from '../../features/item-assignment/components/ItemAssignmentView';

/**
 * 購入品管理画面のルーティング
 * 編集機能付きの購入品テーブル、PIPカードエリアのレイアウトを定義する
 */
export const Route = createFileRoute('/ps-ps/item-assignment')({
	component: () => <ItemAssignmentView />,
});



/* ===== FILE: \ps-ps\src\routes\ps-ps\pips.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { useContext, useEffect, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { PipDetail } from '@/features/pip-management/components/PipDetail';
import { PipTable } from '@/features/pip-management/components/PipTable';
import { useAlertStore } from '@/stores/useAlartStore';
import { useIsSearchTriggeredStore } from '@/stores/useIsSearchTriggeredStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, PipData } from '@/types';
import { ItemAssignmentView } from '../../features/item-assignment/components/ItemAssignmentView';
import { PipTableControls } from '../../features/pip-management/components/PipTableControls';
// PIP削除
import { usePipListDelete } from '../../features/pip-management/hooks/usePipListDelete';
import { usePipListGet } from '../../features/pip-management/hooks/usePipListGet';
// PIPデータ取得
import { getPipData } from '../../features/pip-management/utils/getPipData.ts';
import { PSysContext } from '../ps-ps/route';

/**
 * PIP管理画面のルーティング
 * PIPテーブル、PIP詳細エリアのレイアウトを定義する
 */
const Pips = () => {
	// 行の選択状態
	const [pipSelection, setPipSelection] = useState<Record<string, boolean>>({});
	// 現在チェックされている行数
	const [selectedCount, setSelectedCount] = useState(0);
	// 現在フィルターで表示されている件数
	const [filteredCount, setFilteredCount] = useState(0);
	// フィルタークリア用に保持
	const [tableInstance, setTableInstance] = useState<Table<Pip> | null>(null);
	// フィルタ表示状態
	const [showFilters, setShowFilters] = useState(true);
	// 詳細表示するPIP
	const [clickedPipCode, setClickedPipCode] = useState<string | null>(null);

	// コンテキストから値を取得: FunctionGroupの選択状態, サイドバーの表示状態, PIP管理画面で選択されたpipDataの対象, ItemAssignmentViewを呼び出す際のモード
	const { setIsSidebar, setSelectedPipData, setIsItemAssignmentView } =
		useContext(PSysContext);

	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();

	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// Display by Selectionの押下状態
	const { triggerState, resetSearchTrigger } = useIsSearchTriggeredStore();

	// PipDataのデフォルト値
	const emptyPipData: PipData = {
		pips: [
			{
				code: '',
				nickname: '',
				items: [
					{
						itemNo: '',
						coreItemNo: '',
						itemName: '',
						qty: 0,
						costElement: '',
						ibsCode: '',
						pipCode: '',
					},
				],
				vendors: [],
			},
		],
	};
	// pipDataの状態管理
	const [pipData, setPipData] = useState<PipData>(emptyPipData);

	// PIP詳細情報の状態管理
	const [pipDetail, setPipDetail] = useState<Pip>(emptyPipData.pips[0]);

	// PIPデータを事前取得
	const { refetch } = usePipListGet(selectedJobNo, selectedFG?.fgCode);

	// PIPリストを表示
	useEffect(() => {
		// Display by Selection押下時以外は何もしない
		if (triggerState === 'none') return;

		// Display by Selection押下状態をリセット
		resetSearchTrigger();

		const fetchAndProcessPipData = async () => {
			try {
				const result = await refetch(); // 明示的に再フェッチ
				const fetched = result.data;

				// 検索結果がない場合は空集合を指定する
				if (!fetched || !fetched.responseJSON) {
					setPipData(emptyPipData);
					return;
				}

				const parsed = JSON.parse(fetched.responseJSON);
				const processed = getPipData(parsed);
				setPipData(processed);
			} catch (e) {
				// 通知: 検索失敗
				setPipData(emptyPipData);
				showAlert(['SEARCH_FAILURE']);
			}
		};

		fetchAndProcessPipData();
	}, [triggerState]);

	// PIP削除モード
	const [pipDeleteMode, setPipDeleteMode] = useState(false);
	const { mutate: deleteMutate } = usePipListDelete();
	useEffect(() => {
		if (pipDeleteMode) {
			// チェックされた行のインデックス取得
			const selectedIndexes = Object.keys(pipSelection)
				.filter((index) => pipSelection[index])
				.map((index) => Number(index));

			// 削除対象に絞り込み
			const deleteTarget = pipData.pips.filter((_, index) =>
				selectedIndexes.includes(index),
			);

			// 削除モードを解除
			setPipDeleteMode(false);

			// 削除API呼び出し
			deleteMutate(
				{
					userId: 'PSYSP014',
					jobNo: selectedJobNo,
					fgCode: selectedFG?.fgCode,
					deleteData: deleteTarget,
				},
				{
					onSuccess: (data: any) => {
						if (
							data.statusCode === '404' &&
							data.statusMessage === 'AIPに割当済みのPIPは削除できません。'
						) {
							// 通知: 削除失敗
							showAlert(['AIP_ASSIGNED']);
						} else {
							// 通知: 削除成功
							showAlert(['PIP_DELETE']);

							// 再検索せず、検索前の状態に戻す
							//triggerResearch();
							setPipData(emptyPipData);

							// チェック状態をリセット
							setPipSelection({});
						}
					},
				},
			);

			// 詳細画面のリセット
			setPipDetail({
				code: '',
				nickname: '',
				items: [],
				vendors: [],
			});
		}
	}, [pipDeleteMode]);

	// PIP編集モード
	const [pipEditMode, setPipEditMode] = useState(false);
	useEffect(() => {
		if (pipEditMode) {
			// チェックされた行のインデックス取得
			const selectedIndexes = Object.keys(pipSelection)
				.filter((index) => pipSelection[index])
				.map((index) => Number(index));

			// 編集対象を1件のオブジェクトとして取得
			const editTarget = pipData.pips[selectedIndexes[0]];
			setSelectedPipData(editTarget);
		}
	}, [pipEditMode]);

	// 特定の条件下でサイドバーを非表示にする
	useEffect(() => {
		if (pipEditMode) {
			setIsSidebar(false);
			setIsItemAssignmentView('pipManagement');
		} else {
			setIsSidebar(true);
		}
	}, [pipEditMode]);

	return (
		// 編集モードではない場合
		!pipEditMode ? (
			<div className="h-screen bg-gray-100 p-6 overflow-hidden">
				{/* タイトル・ボタン群 */}
				<PipTableControls
					showFilters={showFilters}
					setShowFilters={setShowFilters}
					tableInstance={tableInstance}
					selectedCount={selectedCount}
					//  編集モード・削除モードへの切り替え
					setPipDeleteMode={setPipDeleteMode}
					setPipEditMode={setPipEditMode}
					pipEditMode={pipEditMode}
				/>
				{/* 件数表示（フィルター後/全体） */}
				<span className="ml-auto text-sm text-gray-600">
					count: {filteredCount} / {pipData.pips.length}
				</span>
				<div className="max-w-10xl mx-auto h-full flex gap-4">
					<div className="w-1/2 h-[80%]">
						{/* PIPテーブル */}
						{/* Item Count、Vendor Countの値、スタイルが表示できなかったので専用テーブル使用してます */}
						{/* Tanstack Virtualが原因っぽい */}
						<PipTable
							data={pipData}
							showFilters={showFilters}
							clickedPipCode={clickedPipCode}
							setClickedPipCode={setClickedPipCode}
							setPipDetail={setPipDetail}
							onFilteredCountChange={setFilteredCount}
							onTableReady={setTableInstance}
							rowSelection={pipSelection}
							setRowSelection={setPipSelection}
							onSelectedRowCountChange={setSelectedCount}
						/>
					</div>
					{/* PIP詳細表示エリア */}
					<div className="w-1/2">
						<PipDetail pipDetail={pipDetail} />
					</div>
					{/* アラート表示エリア */}
					{isAlertVisible && alertMessages && (
						<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
							<AlertMessages messages={alertMessages} />
						</div>
					)}
				</div>
			</div>
		) : (
			// 編集モードの場合: 購入品管理画面コンポーネントに選択されたpipDataを渡す
			<ItemAssignmentView />
		)
	);
};

export const Route = createFileRoute('/ps-ps/pips')({
	component: Pips,
});



/* ===== FILE: \ps-ps\src\routes\ps-ps\route.tsx ===== */

import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';
import type React from 'react';
import { createContext, useState } from 'react';
import { Message } from '@/components/Message';
import { Topbar } from '@/components/Topbar';
import type { PipData } from '@/types';
import { Sidebar } from '../../features/pip-randing/components';

/*コンテキスト管理
 *  //Display by Selection等の選択状態を各コンポーネントをまたがって管理する
 */
export type PSysContextType = {
	// Display by Selectionボタンの押下状態を管理
	isSearchTriggered: boolean;
	setIsSearchTriggered: React.Dispatch<React.SetStateAction<boolean>>;
	// サイドバーの表示状態を管理(PIP管理画面)
	isSidebar: boolean;
	setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
	// PIP管理画面で選択されたpipDataの対象を管理
	selectedPipData: PipData;
	setSelectedPipData: React.Dispatch<React.SetStateAction<PipData>>;
	// ItemAssignmentViewを呼び出す際のモードを管理
	isItemAssignmentView: string;
	setIsItemAssignmentView: React.Dispatch<React.SetStateAction<string>>;
};
export const PSysContext = createContext<PSysContextType>({
	// Display by Selectionボタンの押下状態を管理
	isSearchTriggered: false,
	setIsSearchTriggered: () => {},
	// サイドバーの表示状態を管理(PIP管理画面)
	isSidebar: true,
	setIsSidebar: () => {},
	// PIP管理画面で選択されたpipDataの対象を管理
	selectedPipData: {} as PipData, // 初期値として空オブジェクトを型アサーションで指定
	setSelectedPipData: () => {},
	// ItemAssignmentViewを呼び出す際のモードを管理
	isItemAssignmentView: '',
	setIsItemAssignmentView: () => {},
});

/**
 * P-Sysシステムのルート定義
 * "/ps-ps" パスに対応し、P-Sys関連の画面のエントリーポイントとなる
 * pathによってSidebarの表示を制御
 */
export const Route = createFileRoute('/ps-ps')({
	component: () => {
		// path取得
		const pathname = useLocation({
			select: (location) => location.pathname,
		});
		// "/ps-ps/"を除いたpathを取得
		const exceptPathName = pathname.replace('/ps-ps/', '');

		// Sidebar を表示するパス一覧
		const sidebarVisiblePaths = ['item-assignment', 'pips'];

		// 表示判定
		const showSidebar = sidebarVisiblePaths.includes(exceptPathName);

		// Display by Selectionボタンの押下状態を管理
		const [isSearchTriggered, setIsSearchTriggered] = useState(false);
		// サイドバーの表示状態を管理(PIP管理画面)
		const [isSidebar, setIsSidebar] = useState(true);
		// PIP管理画面で選択されたpipDataの対象を管理
		const [selectedPipData, setSelectedPipData] = useState({} as PipData);
		// ItemAssignmentViewを呼び出す際のモードを管理
		const [isItemAssignmentView, setIsItemAssignmentView] =
			useState('itemManagement');

		return (
			<div className="flex flex-col h-screen">
				{/* ヘッダー */}
				<div className="sticky top-0 z-50 shadow-sm">
					<Topbar />
					<Message />
				</div>
				<div className="flex flex-1">
					<PSysContext.Provider
						value={{
							isSearchTriggered,
							setIsSearchTriggered,
							isSidebar,
							setIsSidebar,
							selectedPipData,
							setSelectedPipData,
							isItemAssignmentView,
							setIsItemAssignmentView,
						}}
					>
						{/* サイドバー */}
						{showSidebar && isSidebar && <Sidebar />}
						{/* メインコンテンツ */}
						<main className="flex-1 overflow-auto">
							<Outlet />
						</main>
					</PSysContext.Provider>
				</div>
			</div>
		);
	},
});



/* ===== FILE: \ps-ps\src\routes\ps-ps\vendor-assignment.tsx ===== */

import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { AlertMessages } from '@/components/ui/alertMessages';
import { VendorAssignment } from '@/features/vendor-assignment';
import { useAlertStore } from '@/stores/useAlartStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import type { Pip, Vendor } from '@/types';
import { useAipGenerate } from '../../features/vendor-assignment/hooks/useAipGenerate';
import { useVendorList } from '../../features/vendor-assignment/hooks/useVendorList';

// Search Paramsの型定義
interface VendorAssignmentSearch {
	selectedPips: string;
	mode?: 'pip' | 'aip';
}

export const Route = createFileRoute('/ps-ps/vendor-assignment')({
	// Search Paramsのバリデーション
	validateSearch: (search: Record<string, unknown>): VendorAssignmentSearch => {
		return {
			selectedPips: search.selectedPips as string,
			mode: (search.mode as 'pip' | 'aip') || 'pip',
		};
	},

	// Loaderの依存関係を明示
	loaderDeps: ({ search }) => ({ search }),

	// データの事前取得
	loader: async ({ deps }) => {
		const { search } = deps;
		const selectedPips: Pip[] = JSON.parse(search.selectedPips);

		return {
			selectedPips,
			isAipMode: search.mode === 'aip',
			// searchも返す（後で使用するため）
			search,
		};
	},

	component: VendorAssignmentRoute,
});

function VendorAssignmentRoute() {
	const { selectedPips, isAipMode, search } = Route.useLoaderData();
	const navigate = Route.useNavigate();

	// 選択したJobNo、FG
	const { selectedJobNo } = useSelectedJobNoStore();
	const { selectedFG } = useSelectedFGStore();
	// ベンダーリストの取得
	const { data: fetchedItems } = useVendorList(selectedFG?.fgCode);
	// アラートの状態
	const { isAlertVisible, alertMessages, showAlert } = useAlertStore();

	// 画面右側: 選択されたベンダーの一覧を管理
	const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

	// 画面左側: 選択可能なベンダーの一覧を管理
	const [availableVendors, setAvailableVendors] = useState<Vendor[]>([]);
	const hasInitialized = useRef(false);
	useEffect(() => {
		// 初回のみ実行
		if (!hasInitialized.current && fetchedItems) {
			hasInitialized.current = true;

			// responseJSON をパース
			const parsed = JSON.parse(fetchedItems.responseJSON);

			// vendor をさらにパース（配列）
			const vendorList: Vendor[] = JSON.parse(parsed.vendor);

			// selectedPips に割り当て済みの vendor ID を抽出
			const assignedVendorIds = new Set(
				selectedPips.flatMap((pip) => pip.vendors.map((v) => v.code)),
			);

			// 割り当て済みの vendor を除外
			const filtered = vendorList.filter(
				(vendor) => !assignedVendorIds.has(vendor.vendorCode),
			);

			setAvailableVendors(filtered);

			// 割り当て済みベンダーがある場合(AIP編集) 画面右側を更新
			const assigned = vendorList.filter((vendor) =>
				assignedVendorIds.has(vendor.vendorCode),
			);
			if (assigned.length !== 0) {
				setSelectedVendors(assigned);
			}
		}
	}, [fetchedItems, selectedPips]);

	// AIP生成ハンドル
	const { mutate: aipGenerateMutate } = useAipGenerate();
	const handleAipCreate = () => {
		// AIP生成API呼び出し
		aipGenerateMutate(
			{
				userId: 'PSYSP014',
				jobNo: selectedJobNo,
				fgCode: selectedFG?.fgCode,
				targetVendors: selectedVendors,
				pipCode: selectedPips[0].code,
			},
			{
				onSuccess: () => {
					// 通知: 保存成功
					showAlert(['AIP_SUCCESS']);
				},
				onError: () => {
					// 通知: 保存失敗
					showAlert(['AIP_FAILURE']);
				},
			},
		);

		// PIP管理画面に戻る
		handleBack();
	};

	const handlePipsUpdate = (updatedPips: Pip[]) => {
		navigate({
			to: '.',
			search: {
				...search,
				selectedPips: JSON.stringify(updatedPips),
			},
			replace: true,
		});
	};

	const handleBack = () => {
		navigate({ to: '/ps-ps/pips' });
	};

	return (
		<>
			<VendorAssignment
				selectedPips={selectedPips}
				availableVendors={availableVendors}
				setAvailableVendors={setAvailableVendors}
				isAipMode={isAipMode}
				onPipsUpdate={handlePipsUpdate}
				onBack={handleBack}
				onCreateAip={handleAipCreate}
				selectedVendors={selectedVendors}
				setSelectedVendors={setSelectedVendors}
			/>
			{/* アラートメッセージ */}
			{isAlertVisible && alertMessages && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<AlertMessages messages={alertMessages} />
				</div>
			)}
		</>
	);
}



/* ===== FILE: \ps-ps\src\routeTree.gen.ts ===== */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { Route as rootRouteImport } from './routes/__root'
import { Route as HomeRouteImport } from './routes/home'
import { Route as PSysRouteRouteImport } from './routes/ps-ps/route'
import { Route as MsrRouteRouteImport } from './routes/msr/route'
import { Route as PSysVendorAssignmentRouteImport } from './routes/ps-ps/vendor-assignment'
import { Route as PSysPipsRouteImport } from './routes/ps-ps/pips'
import { Route as PSysItemAssignmentRouteImport } from './routes/ps-ps/item-assignment'

const HomeRoute = HomeRouteImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRouteImport,
} as any)
const PSysRouteRoute = PSysRouteRouteImport.update({
  id: '/ps-ps',
  path: '/ps-ps',
  getParentRoute: () => rootRouteImport,
} as any)
const MsrRouteRoute = MsrRouteRouteImport.update({
  id: '/msr',
  path: '/msr',
  getParentRoute: () => rootRouteImport,
} as any)
const PSysVendorAssignmentRoute = PSysVendorAssignmentRouteImport.update({
  id: '/vendor-assignment',
  path: '/vendor-assignment',
  getParentRoute: () => PSysRouteRoute,
} as any)
const PSysPipsRoute = PSysPipsRouteImport.update({
  id: '/pips',
  path: '/pips',
  getParentRoute: () => PSysRouteRoute,
} as any)
const PSysItemAssignmentRoute = PSysItemAssignmentRouteImport.update({
  id: '/item-assignment',
  path: '/item-assignment',
  getParentRoute: () => PSysRouteRoute,
} as any)

export interface FileRoutesByFullPath {
  '/msr': typeof MsrRouteRoute
  '/ps-ps': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/ps-ps/item-assignment': typeof PSysItemAssignmentRoute
  '/ps-ps/pips': typeof PSysPipsRoute
  '/ps-ps/vendor-assignment': typeof PSysVendorAssignmentRoute
}
export interface FileRoutesByTo {
  '/msr': typeof MsrRouteRoute
  '/ps-ps': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/ps-ps/item-assignment': typeof PSysItemAssignmentRoute
  '/ps-ps/pips': typeof PSysPipsRoute
  '/ps-ps/vendor-assignment': typeof PSysVendorAssignmentRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/msr': typeof MsrRouteRoute
  '/ps-ps': typeof PSysRouteRouteWithChildren
  '/home': typeof HomeRoute
  '/ps-ps/item-assignment': typeof PSysItemAssignmentRoute
  '/ps-ps/pips': typeof PSysPipsRoute
  '/ps-ps/vendor-assignment': typeof PSysVendorAssignmentRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/msr'
    | '/ps-ps'
    | '/home'
    | '/ps-ps/item-assignment'
    | '/ps-ps/pips'
    | '/ps-ps/vendor-assignment'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/msr'
    | '/ps-ps'
    | '/home'
    | '/ps-ps/item-assignment'
    | '/ps-ps/pips'
    | '/ps-ps/vendor-assignment'
  id:
    | '__root__'
    | '/msr'
    | '/ps-ps'
    | '/home'
    | '/ps-ps/item-assignment'
    | '/ps-ps/pips'
    | '/ps-ps/vendor-assignment'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  MsrRouteRoute: typeof MsrRouteRoute
  PSysRouteRoute: typeof PSysRouteRouteWithChildren
  HomeRoute: typeof HomeRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/ps-ps': {
      id: '/ps-ps'
      path: '/ps-ps'
      fullPath: '/ps-ps'
      preLoaderRoute: typeof PSysRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/msr': {
      id: '/msr'
      path: '/msr'
      fullPath: '/msr'
      preLoaderRoute: typeof MsrRouteRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/ps-ps/vendor-assignment': {
      id: '/ps-ps/vendor-assignment'
      path: '/vendor-assignment'
      fullPath: '/ps-ps/vendor-assignment'
      preLoaderRoute: typeof PSysVendorAssignmentRouteImport
      parentRoute: typeof PSysRouteRoute
    }
    '/ps-ps/pips': {
      id: '/ps-ps/pips'
      path: '/pips'
      fullPath: '/ps-ps/pips'
      preLoaderRoute: typeof PSysPipsRouteImport
      parentRoute: typeof PSysRouteRoute
    }
    '/ps-ps/item-assignment': {
      id: '/ps-ps/item-assignment'
      path: '/item-assignment'
      fullPath: '/ps-ps/item-assignment'
      preLoaderRoute: typeof PSysItemAssignmentRouteImport
      parentRoute: typeof PSysRouteRoute
    }
  }
}

interface PSysRouteRouteChildren {
  PSysItemAssignmentRoute: typeof PSysItemAssignmentRoute
  PSysPipsRoute: typeof PSysPipsRoute
  PSysVendorAssignmentRoute: typeof PSysVendorAssignmentRoute
}

const PSysRouteRouteChildren: PSysRouteRouteChildren = {
  PSysItemAssignmentRoute: PSysItemAssignmentRoute,
  PSysPipsRoute: PSysPipsRoute,
  PSysVendorAssignmentRoute: PSysVendorAssignmentRoute,
}

const PSysRouteRouteWithChildren = PSysRouteRoute._addFileChildren(
  PSysRouteRouteChildren,
)

const rootRouteChildren: RootRouteChildren = {
  MsrRouteRoute: MsrRouteRoute,
  PSysRouteRoute: PSysRouteRouteWithChildren,
  HomeRoute: HomeRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()



/* ===== FILE: \ps-ps\src\stores\useAlartStore.ts ===== */

import { create } from 'zustand';
import alertMessagesMap from '@/constants/messagesList';

/**
 * アラート表示の状態管理ストア
 * - isAlertVisible: 表示中かどうか
 * - setIsAlertVisible: 表示状態を任意に設定（true/false）
 * - alertMessages: 表示するメッセージ（複数対応）
 * - showAlert: メッセージを表示し、一定時間後に自動で非表示（メッセージが変わるたびにリセット）
 * - hideAlert: 手動で非表示にする
 */

type AlertState = {
	isAlertVisible: boolean;
	setIsAlertVisible: (visible: boolean) => void;
	alertMessages: Record<string, string>;
	showAlert: (ids: string[]) => void;
	hideAlert: () => void;
};

let alertTimer: ReturnType<typeof setTimeout> | null = null;

export const useAlertStore = create<AlertState>((set) => ({
	isAlertVisible: false,
	setIsAlertVisible: (visible) => set({ isAlertVisible: visible }),
	alertMessages: {},
	showAlert: (ids) => {
		// 前のタイマーをクリア
		if (alertTimer) {
			clearTimeout(alertTimer);
		}

		// 新しいメッセージを表示
		const messages: Record<string, string> = {};
		ids.forEach((id) => {
			if (alertMessagesMap[id]) {
				messages[id] = alertMessagesMap[id];
			}
		});

		set({ isAlertVisible: true, alertMessages: messages });

		// 新しいタイマーを設定
		alertTimer = setTimeout(() => {
			set({ isAlertVisible: false, alertMessages: {} });
			alertTimer = null;
		}, 5000);
	},
	hideAlert: () => {
		if (alertTimer) {
			clearTimeout(alertTimer);
			alertTimer = null;
		}
		set({ isAlertVisible: false, alertMessages: {} });
	},
}));



/* ===== FILE: \ps-ps\src\stores\useFgsStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// P-Sysで選択するFGの型
export type FG = {
	fgCode: string;
	fgDescription: string;
};

type StoreState = {
	fgs: FG[];
	setFgs: (fgs: FG[]) => void;
};

/**
 * P-SysでAPIから取得したFGマスタ一覧をglobal stateで管理
 */
export const useFgsStore = create<StoreState>()(
	persist(
		(set) => ({
			fgs: [],
			setFgs: (fgs) => set({ fgs }),
		}),
		{
			name: 'fgs-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useIsSearchTriggeredStore.ts ===== */

import { create } from 'zustand';

/**
 * Display by Selection ボタンの押下状態を管理するストア
 * - triggerState: 'none' | 'search' | 'research' のいずれか
 * - triggerSearch: 検索をトリガー（'search' に設定）
 * - triggerResearch: 再検索をトリガー（'research' に設定）
 * - resetSearchTrigger: 状態を 'none' に戻す（検索完了後など）
 */

type TriggerState = 'none' | 'search' | 'research';

type SearchTriggerStore = {
	triggerState: TriggerState;
	triggerSearch: () => void;
	triggerResearch: () => void;
	resetSearchTrigger: () => void;
};

export const useIsSearchTriggeredStore = create<SearchTriggerStore>((set) => ({
	triggerState: 'none',
	triggerSearch: () => set({ triggerState: 'search' }),
	triggerResearch: () => set({ triggerState: 'research' }),
	resetSearchTrigger: () => set({ triggerState: 'none' }),
}));



/* ===== FILE: \ps-ps\src\stores\usePipGenerationModeStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 購入品管理/PIP生成画面のモード
 * display: 購入品管理画面でテーブルのみ表示
 * generation: PIP生成モード
 * edit: PIP編集モード
 * copy: PIP複製モード
 */
type pipGenerationModeType = 'display' | 'generation' | 'edit' | 'copy';

type PipGenerationModeStore = {
	pipGenerationMode: pipGenerationModeType;
	setPipGenerationMode: (
		next:
			| pipGenerationModeType
			| ((current: pipGenerationModeType) => pipGenerationModeType),
	) => void;
};

/**
 * 購入品管理/PIP生成画面のモードのglobal state(デフォルトはdisplay)
 */
export const usePipGenerationModeStore = create<PipGenerationModeStore>()(
	persist(
		(set) => ({
			pipGenerationMode: 'display',
			setPipGenerationMode: (next) =>
				set((state) => ({
					pipGenerationMode:
						typeof next === 'function' ? next(state.pipGenerationMode) : next,
				})),
		}),
		{
			name: 'pipGenerationMode-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useSelectedFgStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FG } from './useFgsStore';

type StoreState = {
	selectedFG: FG | null;
	setSelectedFG: (fg: FG | null) => void;
};

/**
 * P-Sysサイドバーで選択したFGをglobal stateで管理
 */
export const useSelectedFGStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedFG: null,
			setSelectedFG: (fg) => set({ selectedFG: fg }),
		}),
		{
			name: 'selectedFG-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useSelectedJobNoStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type StoreState = {
	selectedJobNo: string;
	setSelectedJobNo: (selectedJobNo: string) => void;
};

/**
 * P-Sysサイドバーで選択したJob No.をglobal stateで管理
 */
export const useSelectedJobNoStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedJobNo: '',
			setSelectedJobNo: (selectedJobNo) => set({ selectedJobNo }),
		}),
		{
			name: 'selectedJobNo-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\stores\useSelectedProjectStore.ts ===== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 選択プロジェクト
type SelectedProject = {
	projectId: string;
	projectNm: string;
	jobNos: string[];
	jobOrderNos: string[];
};

type StoreState = {
	selectedProject: SelectedProject | null;
	setSelectedProject: (project: SelectedProject | null) => void;
};

/**
 * home画面で選択するプロジェクトの選択状態をglobal stateで管理
 */

export const useSelectedProjectStore = create<StoreState>()(
	persist(
		(set) => ({
			selectedProject: null,
			setSelectedProject: (selectedProject) => set({ selectedProject }),
		}),
		{
			name: 'selectedProject-storage', // 永続化(localStorage保存)
		},
	),
);



/* ===== FILE: \ps-ps\src\styles\index.css ===== */

@import url("https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Savate:ital,wght@1,700&display=swap");

@import "tailwindcss";
@import "tw-animate-css";

body {
	font-family: "Noto Sans JP", sans-serif;
	font-weight: 500;
	height: 100%;
	overflow: hidden;
}

@custom-variant dark (&:is(.dark *));

@theme inline {
	--font-logo: "Zen Maru Gothic", sans-serif;
	--radius-sm: calc(var(--radius) - 4px);
	--radius-md: calc(var(--radius) - 2px);
	--radius-lg: var(--radius);
	--radius-xl: calc(var(--radius) + 4px);
	--color-background: var(--background);
	--color-foreground: var(--foreground);
	--color-card: var(--card);
	--color-card-foreground: var(--card-foreground);
	--color-popover: var(--popover);
	--color-popover-foreground: var(--popover-foreground);
	--color-primary: var(--primary);
	--color-primary-foreground: var(--primary-foreground);
	--color-secondary: var(--secondary);
	--color-secondary-foreground: var(--secondary-foreground);
	--color-muted: var(--muted);
	--color-muted-foreground: var(--muted-foreground);
	--color-accent: var(--accent);
	--color-accent-foreground: var(--accent-foreground);
	--color-destructive: var(--destructive);
	--color-border: var(--border);
	--color-input: var(--input);
	--color-ring: var(--ring);
	--color-chart-1: var(--chart-1);
	--color-chart-2: var(--chart-2);
	--color-chart-3: var(--chart-3);
	--color-chart-4: var(--chart-4);
	--color-chart-5: var(--chart-5);
	--color-sidebar: var(--sidebar);
	--color-sidebar-foreground: var(--sidebar-foreground);
	--color-sidebar-primary: var(--sidebar-primary);
	--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
	--color-sidebar-accent: var(--sidebar-accent);
	--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
	--color-sidebar-border: var(--sidebar-border);
	--color-sidebar-ring: var(--sidebar-ring);
	--color-muted-indigo: #5452dc;
}

:root {
	--radius: 0.625rem;
	--background: oklch(1 0 0);
	--foreground: oklch(0.145 0 0);
	--card: oklch(1 0 0);
	--card-foreground: oklch(0.145 0 0);
	--popover: oklch(1 0 0);
	--popover-foreground: oklch(0.145 0 0);
	--primary: oklch(0.205 0 0);
	--primary-foreground: oklch(0.985 0 0);
	--secondary: oklch(0.97 0 0);
	--secondary-foreground: oklch(0.205 0 0);
	--muted: oklch(0.97 0 0);
	--muted-foreground: oklch(0.556 0 0);
	--accent: oklch(0.97 0 0);
	--accent-foreground: oklch(0.205 0 0);
	--destructive: oklch(0.577 0.245 27.325);
	--border: oklch(0.922 0 0);
	--input: oklch(0.922 0 0);
	--ring: oklch(0.708 0 0);
	--chart-1: oklch(0.646 0.222 41.116);
	--chart-2: oklch(0.6 0.118 184.704);
	--chart-3: oklch(0.398 0.07 227.392);
	--chart-4: oklch(0.828 0.189 84.429);
	--chart-5: oklch(0.769 0.188 70.08);
	--sidebar: oklch(0.985 0 0);
	--sidebar-foreground: oklch(0.145 0 0);
	--sidebar-primary: oklch(0.205 0 0);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.97 0 0);
	--sidebar-accent-foreground: oklch(0.205 0 0);
	--sidebar-border: oklch(0.922 0 0);
	--sidebar-ring: oklch(0.708 0 0);
}

.dark {
	--background: oklch(0.145 0 0);
	--foreground: oklch(0.985 0 0);
	--card: oklch(0.205 0 0);
	--card-foreground: oklch(0.985 0 0);
	--popover: oklch(0.205 0 0);
	--popover-foreground: oklch(0.985 0 0);
	--primary: oklch(0.922 0 0);
	--primary-foreground: oklch(0.205 0 0);
	--secondary: oklch(0.269 0 0);
	--secondary-foreground: oklch(0.985 0 0);
	--muted: oklch(0.269 0 0);
	--muted-foreground: oklch(0.708 0 0);
	--accent: oklch(0.269 0 0);
	--accent-foreground: oklch(0.985 0 0);
	--destructive: oklch(0.704 0.191 22.216);
	--border: oklch(1 0 0 / 10%);
	--input: oklch(1 0 0 / 15%);
	--ring: oklch(0.556 0 0);
	--chart-1: oklch(0.488 0.243 264.376);
	--chart-2: oklch(0.696 0.17 162.48);
	--chart-3: oklch(0.769 0.188 70.08);
	--chart-4: oklch(0.627 0.265 303.9);
	--chart-5: oklch(0.645 0.246 16.439);
	--sidebar: oklch(0.205 0 0);
	--sidebar-foreground: oklch(0.985 0 0);
	--sidebar-primary: oklch(0.488 0.243 264.376);
	--sidebar-primary-foreground: oklch(0.985 0 0);
	--sidebar-accent: oklch(0.269 0 0);
	--sidebar-accent-foreground: oklch(0.985 0 0);
	--sidebar-border: oklch(1 0 0 / 10%);
	--sidebar-ring: oklch(0.556 0 0);
}

@layer base {
	* {
		@apply border-border outline-ring/50;
	}
	body {
		@apply bg-background text-foreground;
	}
}



/* ===== FILE: \ps-ps\src\types\common.ts ===== */

/**
 * 共通型定義
 * ItemTable、VendorAssignment、PipTableで共有される型定義
 */

/**
 * テーブルカラム定義のジェネリック型
 * @template T - データの型
 */
export interface TableColumn<T = Record<string, unknown>> {
	/** カラムID */
	id: string;
	/** カラムヘッダー名 */
	header: string;
	/** データアクセサーキー */
	accessorKey: keyof T;
	/** カラム幅 */
	size?: number;
	/** 最小幅 */
	minSize?: number;
	/** 最大幅 */
	maxSize?: number;
}

/**
 * 選択変更ハンドラーの型
 * @template T - 選択アイテムのID型（通常はnumberまたはstring）
 */
export type SelectionChangeHandler<T = number> = (selectedIds: T[]) => void;

/**
 * 削除ハンドラーの型
 */
export type RemovalHandler = (itemId: string, subItemId: number) => void;

/**
 * チェックボックスのProps
 */
export interface CheckboxProps {
	/** チェック状態 */
	checked?: boolean;
	/** 不確定状態 */
	indeterminate?: boolean;
	/** 変更時のコールバック */
	onChange?: (checked: boolean) => void;
	/** 無効状態 */
	disabled?: boolean;
	/** アクセシビリティラベル */
	'aria-label'?: string;
}

/**
 * 統一アイテムデータ
 * Item, PIPItem, Itemを統合した型
 */
export interface Item {
	// /** アイテム内部キー */
	itemSurKey?: number;
	/** Job番号 */
	jobNo?: string;
	// /** Function Groupコード */
	fg?: string;
	/** アイテム番号 */
	itemNo: string;
	/** コアアイテム番号 */
	coreItemNo: string;
	/** アイテム名 */
	itemName: string;
	/** 数量 */
	qty: number;
	/** PIP未割当数量 */
	itemRestQty: number;
	// /** ソートキー */
	itemSortKey?: number;
	/** Cost Element */
	costElement: string;
	/** IBS Code */
	ibsCode: string;
	/** PIPコード（実際に割り当てられた場合） */
	pipCode?: string;
	/** 所属PIP */
	belongsToPip?: string;
	/** PIP内アイテムインデックス */
	pipItemIndex?: number;
}

/**
 * 統一ベンダーデータ
 */
export interface Vendor {
	/** ベンダーID */
	id: string;
	/** ベンダー番号 */
	vendorNumber?: number;
	/** ベンダー名 */
	name: string;
	/** ベンダーコード */
	code: string;
	/** 機能分類 */
	function?: string;
	/** 備考 */
	notes?: string;
}

/**
 * 統一PIPデータ
 * Pip, PIPを統合した型
 */
export interface Pip {
	/** PIPコード */
	code: string;
	/** ニックネーム */
	nickname: string;
	/** 配下アイテムリスト */
	items: Item[];
	/** 配下ベンダーリスト */
	vendors: Vendor[];
}

/**
 * 統一PIPデータコンテナ
 */
export interface PipData {
	/** PIPリスト */
	pips: Pip[];
}

/**
 * テーブル行データ（階層構造用）
 */
export interface TableRow {
	/** 行ID */
	id: string;
	/** 行タイプ */
	type: 'pip' | 'item' | 'vendor';
	/** PIPデータ（PIP行の場合） */
	pip?: Pip;
	/** アイテムデータ（アイテム行の場合） */
	item?: Item;
	/** ベンダーデータ（ベンダー行の場合） */
	vendor?: Vendor;
	/** 親PIPコード */
	pipCode?: string;
	/** 親行ID */
	parentId?: string;
}

/**
 * 選択オプションの基本インターフェース
 */
export interface SelectOption {
	code: string;
	label: string;
}



/* ===== FILE: \ps-ps\src\types\index.ts ===== */

export * from './common';



/* ===== FILE: \ps-ps\src\types\pipDataCard.ts ===== */

/**
 * PipDataCard 型定義
 */

import type { ReactNode } from 'react';

/**
 * PIP基本情報
 */
export interface PipData {
	/** PIPコード */
	code: string;
	/** 表示名 */
	nickname: string;
	/** PIPタイプ */
	type?: 'pip' | 'generated';
}

/**
 * 表示アイテムのベース型
 */
export interface BaseDisplayItem {
	/** 一意識別子 */
	id: string;
	/** 表示名 */
	displayName: string;
}

/**
 * PipItemCard用データ
 */
export interface ItemData extends BaseDisplayItem {
	/** アイテム番号 */
	itemNo: string;
	/** アイテム名 */
	itemName: string;
	/** コスト要素 */
	costElement: string;
	/** IBSコード */
	ibsCode: string;
	/** 数量 */
	qty?: number;
}

/**
 * PipVendorCard用データ
 */
export interface VendorData extends BaseDisplayItem {
	/** ベンダー番号 */
	vendorNumber: number;
	/** ベンダー名 */
	name: string;
}

/**
 * カラーバリエーション
 */
export type PipCardVariant = 'item' | 'vendor' | 'generatedItem';

/**
 * サイズバリエーション
 */
export type PipCardSize = 'compact' | 'default' | 'comfortable';

/**
 * アクションバリアント
 */
export type ActionVariant = 'default' | 'danger' | 'ghost';

/**
 * カードアクション設定
 */
export interface CardAction {
	/** アクションID */
	id: string;
	/** アイコン */
	icon: ReactNode;
	/** ツールチップ */
	tooltip?: string;
	/** 無効状態 */
	disabled?: boolean;
	/** ローディング状態 */
	loading?: boolean;
	/** クリックハンドラ */
	onClick: () => void;
	/** バリアント */
	variant?: ActionVariant;
}

/**
 * 空状態設定
 */
export interface EmptyStateConfig {
	/** アイコン */
	icon?: ReactNode;
	/** タイトル */
	title: string;
	/** 説明文 */
	description?: string;
	/** アクション */
	action?: ReactNode;
}

/**
 * インライン編集設定
 */
export interface InlineEditConfig {
	/** 編集可能フラグ */
	enabled: boolean;
	/** 変更時コールバック */
	onTitleChange: (newTitle: string) => void;
	/** プレースホルダー */
	placeholder?: string;
	/** バリデーション関数 */
	validation?: (value: string) => boolean;
}

/**
 * PipDataCard Props
 */
export interface PipDataCardProps extends React.HTMLAttributes<HTMLDivElement> {
	/** カラーバリエーション */
	variant?: PipCardVariant;
	/** サイズ */
	size?: PipCardSize;
	/** 子要素 */
	children: ReactNode;
}

/**
 * PipDataCardHeader Props
 */
export interface PipDataCardHeaderProps {
	/** PIPデータ */
	pipData: PipData;
	/** ヘッダーアクション */
	actions?: CardAction[];
	/** インライン編集設定 */
	editable?: InlineEditConfig;
	/** メタデータ表示 */
	metadata?: {
		itemCount?: number;
		vendorCount?: number;
	};
}

/**
 * PipDataCardContent Props
 */
export interface PipDataCardContentProps<
	T extends BaseDisplayItem = BaseDisplayItem,
> {
	/** アイテムリスト */
	items: T[];
	/** アイテムレンダラー */
	renderItem: (item: T, index: number) => ReactNode;
	/** 空状態設定 */
	emptyState: EmptyStateConfig;
	/** 最大高さ */
	maxHeight?: string | number;
	/** スクロール可能フラグ */
	scrollable?: boolean;
	/** キー抽出関数 */
	keyExtractor?: (item: T, index: number) => string;
}

/**
 * PipDataCardItem Props
 */
export interface PipDataCardItemProps {
	/** 子要素 */
	children: ReactNode;
	/** プレフィックス要素（チェックボックスなど） */
	prefix?: ReactNode;
	/** アクション */
	actions?: CardAction[];
	/** クリック可能フラグ */
	clickable?: boolean;
	/** 選択状態 */
	selected?: boolean;
	/** クリックハンドラ */
	onClick?: () => void;
	/** 追加クラス名 */
	className?: string;
}
/**
 * 選択管理状態
 */
export interface SelectionState {
	/** 選択されたアイテムID */
	selectedIds: Set<string>;
	/** 全選択状態 */
	isAllSelected: boolean;
	/** 部分選択状態 */
	isPartiallySelected: boolean;
	/** 選択数 */
	selectedCount: number;
}

/**
 * 選択管理アクション
 */
export interface SelectionActions {
	/** アイテムを選択/選択解除 */
	toggleItem: (id: string) => void;
	/** 全選択 */
	selectAll: () => void;
	/** 全解除 */
	clearSelection: () => void;
	/** 選択状態をリセット */
	reset: () => void;
}



/* ===== FILE: \ps-ps\src\types\Topbar.ts ===== */

export interface SearchBarProps {
	onSearch?: (query: string) => void;
	placeholder?: string;
	className?: string;
}

export interface NotificationBellProps {
	count?: number;
	onClick?: () => void;
	className?: string;
}

export interface UserProfileProps {
	user?: {
		name: string;
		avatar?: string;
	};
	onClick?: () => void;
	className?: string;
}

export interface TopbarProps {
	onSearch?: (query: string) => void;
	notificationCount?: number;
	user?: {
		name: string;
		avatar?: string;
	};
	onNotificationClick?: () => void;
	onUserClick?: () => void;
}



/* ===== FILE: \ps-ps\src\utils\resetGrobalState.ts ===== */

import { useFgsStore } from '@/stores/useFgsStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';

/**
 * global stateを初期化
 */
export const resetGrobalState = () => {
	localStorage.removeItem('selectedProject-storage');
	localStorage.removeItem('selectedJobNo-storage');
	localStorage.removeItem('selectedFG-storage');
	localStorage.removeItem('fgs-storage');
	localStorage.removeItem('pipGenerationMode-storage');

	useSelectedProjectStore.getState().setSelectedProject(null);
	useSelectedJobNoStore.getState().setSelectedJobNo('');
	useSelectedFGStore.getState().setSelectedFG(null);
	useFgsStore.getState().setFgs([]);
	usePipGenerationModeStore.getState().setPipGenerationMode('display');
};



/* ===== FILE: \ps-ps\src\utils\tableUtils.ts ===== */

/**
 * テーブル関連の共通ユーティリティ関数
 */

/**
 * 汎用フィルタ型
 */
export interface GenericFilter<TValue = string> {
	columnId: string;
	value: TValue;
	operator?:
		| 'equals'
		| 'contains'
		| 'startsWith'
		| 'endsWith'
		| 'greaterThan'
		| 'lessThan';
}

/**
 * 汎用ソート型
 */
export interface GenericSort {
	columnId: string;
	direction: 'asc' | 'desc';
}

/**
 * 汎用検索関数
 * 指定されたフィールドで検索を行う
 */
export const genericSearch = <T>(
	items: T[],
	searchTerm: string,
	searchFields: (keyof T)[],
): T[] => {
	if (!searchTerm) return items;

	const lowerSearchTerm = searchTerm.toLowerCase();
	return items.filter((item) =>
		searchFields.some((field) => {
			const value = item[field];
			return String(value).toLowerCase().includes(lowerSearchTerm);
		}),
	);
};

/**
 * 汎用フィルタ関数
 * 複数のフィルタ条件を適用
 */
export const applyFilters = <T>(items: T[], filters: GenericFilter[]): T[] => {
	return items.filter((item) =>
		filters.every((filter) => {
			const value = item[filter.columnId as keyof T];
			return applyFilterCondition(value, filter);
		}),
	);
};

/**
 * 単一フィルタ条件の適用
 */
const applyFilterCondition = <TValue>(
	value: TValue,
	filter: GenericFilter,
): boolean => {
	const stringValue = String(value || '');
	const filterValue = String(filter.value || '');

	switch (filter.operator || 'contains') {
		case 'equals':
			return stringValue === filterValue;
		case 'contains':
			return stringValue.toLowerCase().includes(filterValue.toLowerCase());
		case 'startsWith':
			return stringValue.toLowerCase().startsWith(filterValue.toLowerCase());
		case 'endsWith':
			return stringValue.toLowerCase().endsWith(filterValue.toLowerCase());
		case 'greaterThan':
			return Number(value) > Number(filter.value);
		case 'lessThan':
			return Number(value) < Number(filter.value);
		default:
			return true;
	}
};

/**
 * 汎用ソート関数
 */
export const applySorting = <T>(items: T[], sorts: GenericSort[]): T[] => {
	if (sorts.length === 0) return items;

	return [...items].sort((a, b) => {
		for (const sort of sorts) {
			const aValue = a[sort.columnId as keyof T];
			const bValue = b[sort.columnId as keyof T];

			const comparison = compareValues(aValue, bValue);
			if (comparison !== 0) {
				return sort.direction === 'asc' ? comparison : -comparison;
			}
		}
		return 0;
	});
};

/**
 * 値の比較関数
 */
const compareValues = (a: unknown, b: unknown): number => {
	// null/undefined の処理
	if (a == null && b == null) return 0;
	if (a == null) return -1;
	if (b == null) return 1;

	// 数値の比較
	if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	}

	// 文字列の比較
	return String(a).localeCompare(String(b));
};

/**
 * ページネーション関数
 */
export const applyPagination = <T>(
	items: T[],
	page: number,
	pageSize: number,
): {
	items: T[];
	totalItems: number;
	totalPages: number;
	currentPage: number;
} => {
	const totalItems = items.length;
	const totalPages = Math.ceil(totalItems / pageSize);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;

	return {
		items: items.slice(startIndex, endIndex),
		totalItems,
		totalPages,
		currentPage,
	};
};

/**
 * 階層データの展開状態管理
 */
export interface ExpandedState {
	[key: string]: boolean;
}

/**
 * 階層データのフィルタリング（展開状態を考慮）
 */
export const filterHierarchicalData = <
	T extends { id: string; parentId?: string },
>(
	items: T[],
	expandedState: ExpandedState,
	filters: GenericFilter[] = [],
): T[] => {
	// フィルタを適用
	const filteredItems = applyFilters(items, filters);

	// 展開状態を考慮して表示項目を決定
	return filteredItems.filter((item) => {
		// 親アイテムの場合は常に表示
		if (!item.parentId) return true;

		// 子アイテムの場合は親が展開されている場合のみ表示
		return expandedState[item.parentId];
	});
};

/**
 * 選択状態の管理ヘルパー
 */
export class SelectionManager<TId = string | number> {
	private selection = new Set<TId>();

	constructor(initialSelection: TId[] = []) {
		this.selection = new Set(initialSelection);
	}

	select(id: TId): void {
		this.selection.add(id);
	}

	deselect(id: TId): void {
		this.selection.delete(id);
	}

	toggle(id: TId): void {
		if (this.selection.has(id)) {
			this.deselect(id);
		} else {
			this.select(id);
		}
	}

	selectAll(ids: TId[]): void {
		for (const id of ids) {
			this.selection.add(id);
		}
	}

	clearAll(): void {
		this.selection.clear();
	}

	isSelected(id: TId): boolean {
		return this.selection.has(id);
	}

	getSelected(): TId[] {
		return Array.from(this.selection);
	}

	getCount(): number {
		return this.selection.size;
	}

	isEmpty(): boolean {
		return this.selection.size === 0;
	}
}

/**
 * カラム幅の自動調整
 */
export const calculateColumnWidths = <T>(
	data: T[],
	columns: Array<{ id: string; header: string; accessor: keyof T }>,
	minWidth = 100,
	maxWidth = 300,
): Record<string, number> => {
	const widths: Record<string, number> = {};

	for (const column of columns) {
		// ヘッダーテキストの幅を基準値として使用
		const headerWidth = column.header.length * 8 + 20; // 文字数 × 8px + パディング

		// データ内容の最大幅を計算
		const maxDataWidth = data.reduce((max, item) => {
			const value = String(item[column.accessor] || '');
			const width = value.length * 7; // データの文字数 × 7px
			return Math.max(max, width);
		}, 0);

		// 最終的な幅を決定（最小幅・最大幅を考慮）
		const calculatedWidth = Math.max(headerWidth, maxDataWidth + 40); // パディング追加
		widths[column.id] = Math.max(minWidth, Math.min(maxWidth, calculatedWidth));
	}

	return widths;
};



/* ===== FILE: \ps-ps\tsconfig.app.json ===== */

{
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		},

		"tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"verbatimModuleSyntax": true,
		"moduleDetection": "force",
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"erasableSyntaxOnly": true,
		"noFallthroughCasesInSwitch": true,
		"noUncheckedSideEffectImports": true
	},
	"include": ["src"]
}



/* ===== FILE: \ps-ps\tsconfig.json ===== */

{
	"files": [],
	"references": [
		{ "path": "./tsconfig.app.json" },
		{ "path": "./tsconfig.node.json" }
	],
	"compilerOptions": {
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
		// "types": ["@storybook/react"]
	}
}



/* ===== FILE: \ps-ps\tsconfig.node.json ===== */

{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}



/* ===== FILE: \ps-ps\vite.config.ts ===== */

import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
	server: {
		// bun run dev時にサーバ外からアクセス可能にする
		host: true,
		// bun run devしたらhomeが開くように
		open: '/home',
	},
	plugins: [
		tanstackRouter({ target: 'react', autoCodeSplitting: true }),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});



/* ===== FILE: \ps-ps\vitest.workspace.ts ===== */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineWorkspace } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
  'vite.config.ts',
  {
    extends: 'vite.config.ts',
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, '.storybook') }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        provider: 'playwright',
        instances: [{ browser: 'chromium' }]
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);