import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","logos/mentorenergy_Black_Logo.svg","logos/mentorenergy_Black_Logo2.svg","logos/mentorenergy_Inverted_Color.svg","logos/mentorenergy_logos.afdesign","logos/mentorenergy_logos.png","logos/mentorenergy_logos2.afdesign","logos/mentorenergy_logos2_only.svg","logos/mentorenergy_logo_alone.png","logos/mentorenergy_logo_alone_black.png","logos/mentorenergy_logo_linkedin.svg","logos/mentorenergy_Logo_Symbol.svg","logos/mentorenergy_Logo_Symbol2.svg","logos/mentorenergy_Logo_Symbol2_dark.svg","logos/mentorenergy_Main_Logo.svg","logos/mentorenergy_Main_Logo2.svg","logos/mentorenergy_White_logo.svg"]),
	mimeTypes: {".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":"_app/immutable/entry/start.Dwa6ESj-.js","app":"_app/immutable/entry/app.Cka9YaKd.js","imports":["_app/immutable/entry/start.Dwa6ESj-.js","_app/immutable/chunks/entry.C2qMhEbX.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.BOZ2xkje.js","_app/immutable/entry/app.Cka9YaKd.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.DnE5Ux84.js","_app/immutable/chunks/index.DUhc_Oi1.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js')),
			__memo(() => import('../server/nodes/3.js')),
			__memo(() => import('../server/nodes/5.js')),
			__memo(() => import('../server/nodes/6.js')),
			__memo(() => import('../server/nodes/7.js')),
			__memo(() => import('../server/nodes/8.js')),
			__memo(() => import('../server/nodes/9.js')),
			__memo(() => import('../server/nodes/10.js')),
			__memo(() => import('../server/nodes/11.js')),
			__memo(() => import('../server/nodes/12.js')),
			__memo(() => import('../server/nodes/13.js')),
			__memo(() => import('../server/nodes/14.js')),
			__memo(() => import('../server/nodes/15.js')),
			__memo(() => import('../server/nodes/16.js')),
			__memo(() => import('../server/nodes/17.js')),
			__memo(() => import('../server/nodes/22.js')),
			__memo(() => import('../server/nodes/23.js')),
			__memo(() => import('../server/nodes/24.js')),
			__memo(() => import('../server/nodes/25.js')),
			__memo(() => import('../server/nodes/26.js')),
			__memo(() => import('../server/nodes/27.js')),
			__memo(() => import('../server/nodes/28.js')),
			__memo(() => import('../server/nodes/29.js')),
			__memo(() => import('../server/nodes/30.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/auth/complete-signup",
				pattern: /^\/auth\/complete-signup\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/auth/confirm",
				pattern: /^\/auth\/confirm\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/confirm/_server.ts.js'))
			},
			{
				id: "/auth/error",
				pattern: /^\/auth\/error\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: __memo(() => import('../server/entries/endpoints/auth/reset-password/_server.ts.js'))
			},
			{
				id: "/auth/signout",
				pattern: /^\/auth\/signout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../server/entries/endpoints/auth/signout/_server.ts.js'))
			},
			{
				id: "/become-mentor",
				pattern: /^\/become-mentor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/careers",
				pattern: /^\/careers\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/mentor-faq",
				pattern: /^\/mentor-faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/mentor-resources",
				pattern: /^\/mentor-resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/mentors",
				pattern: /^\/mentors\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/private",
				pattern: /^\/private\/?$/,
				params: [],
				page: { layouts: [0,4,], errors: [1,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,5,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/supabase-test",
				pattern: /^\/supabase-test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
