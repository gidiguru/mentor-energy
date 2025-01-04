export const manifest = (() => {
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
		client: {"start":"_app/immutable/entry/start.7bWEEWkd.js","app":"_app/immutable/entry/app.B5-es7ud.js","imports":["_app/immutable/entry/start.7bWEEWkd.js","_app/immutable/chunks/entry.gI6Wngmu.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.DanwDDwR.js","_app/immutable/entry/app.B5-es7ud.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.SkWvRp4G.js","_app/immutable/chunks/index.GshdcV3z.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js')),
			__memo(() => import('./nodes/35.js')),
			__memo(() => import('./nodes/36.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/api/learning/complete-module",
				pattern: /^\/api\/learning\/complete-module\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/learning/complete-module/_server.ts.js'))
			},
			{
				id: "/auth",
				pattern: /^\/auth\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/auth/callback",
				pattern: /^\/auth\/callback\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/auth/complete-signup",
				pattern: /^\/auth\/complete-signup\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/auth/confirm",
				pattern: /^\/auth\/confirm\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/auth/confirm/_server.ts.js'))
			},
			{
				id: "/auth/error",
				pattern: /^\/auth\/error\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/auth/reset-password",
				pattern: /^\/auth\/reset-password\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: __memo(() => import('./entries/endpoints/auth/reset-password/_server.ts.js'))
			},
			{
				id: "/auth/signout",
				pattern: /^\/auth\/signout\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/auth/signout/_server.ts.js'))
			},
			{
				id: "/become-mentor",
				pattern: /^\/become-mentor\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/careers",
				pattern: /^\/careers\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/dashboard",
				pattern: /^\/dashboard\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/dashboard/learning",
				pattern: /^\/dashboard\/learning\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/dashboard/learning/modules",
				pattern: /^\/dashboard\/learning\/modules\/?$/,
				params: [],
				page: { layouts: [0,3,4,], errors: [1,,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/dashboard/learning/modules/[moduleId]",
				pattern: /^\/dashboard\/learning\/modules\/([^/]+?)\/?$/,
				params: [{"name":"moduleId","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,3,4,5,], errors: [1,,,,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/dashboard/profile",
				pattern: /^\/dashboard\/profile\/?$/,
				params: [],
				page: { layouts: [0,3,], errors: [1,,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/mentor-faq",
				pattern: /^\/mentor-faq\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/mentor-resources",
				pattern: /^\/mentor-resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/mentors",
				pattern: /^\/mentors\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/pricing",
				pattern: /^\/pricing\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/private",
				pattern: /^\/private\/?$/,
				params: [],
				page: { layouts: [0,6,], errors: [1,,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,7,], errors: [1,,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/resources",
				pattern: /^\/resources\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/supabase-test",
				pattern: /^\/supabase-test\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
