/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth_helpers from "../auth/helpers.js";
import type * as auth from "../auth.js";
import type * as bookings_mutations from "../bookings/mutations.js";
import type * as bookings_queries from "../bookings/queries.js";
import type * as hotels_mutations from "../hotels/mutations.js";
import type * as hotels_queries from "../hotels/queries.js";
import type * as http from "../http.js";
import type * as users_queries from "../users/queries.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  "auth/helpers": typeof auth_helpers;
  auth: typeof auth;
  "bookings/mutations": typeof bookings_mutations;
  "bookings/queries": typeof bookings_queries;
  "hotels/mutations": typeof hotels_mutations;
  "hotels/queries": typeof hotels_queries;
  http: typeof http;
  "users/queries": typeof users_queries;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
