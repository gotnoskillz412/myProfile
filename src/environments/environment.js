// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
"use strict";
exports.environment = {
    production: false,
    baseApi: 'http://localhost:3000',
    authApi: 'http://localhost:3000/accounts/:accountId',
    tokenKey: '2a51ab22-1e41-4d41-a8bf-5da5172d07e6'
};
