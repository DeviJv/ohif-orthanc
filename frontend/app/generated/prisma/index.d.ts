
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Role
 * 
 */
export type Role = $Result.DefaultSelection<Prisma.$RolePayload>
/**
 * Model Permission
 * 
 */
export type Permission = $Result.DefaultSelection<Prisma.$PermissionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>
/**
 * Model AppConfig
 * 
 */
export type AppConfig = $Result.DefaultSelection<Prisma.$AppConfigPayload>
/**
 * Model AiResult
 * 
 */
export type AiResult = $Result.DefaultSelection<Prisma.$AiResultPayload>
/**
 * Model SatuSehatIntegration
 * 
 */
export type SatuSehatIntegration = $Result.DefaultSelection<Prisma.$SatuSehatIntegrationPayload>
/**
 * Model SatuSehatWebhookLog
 * 
 */
export type SatuSehatWebhookLog = $Result.DefaultSelection<Prisma.$SatuSehatWebhookLogPayload>
/**
 * Model SatuSehatSetting
 * 
 */
export type SatuSehatSetting = $Result.DefaultSelection<Prisma.$SatuSehatSettingPayload>
/**
 * Model SatuSehatResourceLog
 * 
 */
export type SatuSehatResourceLog = $Result.DefaultSelection<Prisma.$SatuSehatResourceLogPayload>
/**
 * Model ModalityConnection
 * 
 */
export type ModalityConnection = $Result.DefaultSelection<Prisma.$ModalityConnectionPayload>
/**
 * Model RadiologyReport
 * 
 */
export type RadiologyReport = $Result.DefaultSelection<Prisma.$RadiologyReportPayload>
/**
 * Model SatuSehatBulkSyncTask
 * 
 */
export type SatuSehatBulkSyncTask = $Result.DefaultSelection<Prisma.$SatuSehatBulkSyncTaskPayload>
/**
 * Model ReportExportTask
 * 
 */
export type ReportExportTask = $Result.DefaultSelection<Prisma.$ReportExportTaskPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.role`: Exposes CRUD operations for the **Role** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.role.findMany()
    * ```
    */
  get role(): Prisma.RoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permission.findMany()
    * ```
    */
  get permission(): Prisma.PermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appConfig`: Exposes CRUD operations for the **AppConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigs
    * const appConfigs = await prisma.appConfig.findMany()
    * ```
    */
  get appConfig(): Prisma.AppConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.aiResult`: Exposes CRUD operations for the **AiResult** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiResults
    * const aiResults = await prisma.aiResult.findMany()
    * ```
    */
  get aiResult(): Prisma.AiResultDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.satuSehatIntegration`: Exposes CRUD operations for the **SatuSehatIntegration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SatuSehatIntegrations
    * const satuSehatIntegrations = await prisma.satuSehatIntegration.findMany()
    * ```
    */
  get satuSehatIntegration(): Prisma.SatuSehatIntegrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.satuSehatWebhookLog`: Exposes CRUD operations for the **SatuSehatWebhookLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SatuSehatWebhookLogs
    * const satuSehatWebhookLogs = await prisma.satuSehatWebhookLog.findMany()
    * ```
    */
  get satuSehatWebhookLog(): Prisma.SatuSehatWebhookLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.satuSehatSetting`: Exposes CRUD operations for the **SatuSehatSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SatuSehatSettings
    * const satuSehatSettings = await prisma.satuSehatSetting.findMany()
    * ```
    */
  get satuSehatSetting(): Prisma.SatuSehatSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.satuSehatResourceLog`: Exposes CRUD operations for the **SatuSehatResourceLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SatuSehatResourceLogs
    * const satuSehatResourceLogs = await prisma.satuSehatResourceLog.findMany()
    * ```
    */
  get satuSehatResourceLog(): Prisma.SatuSehatResourceLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.modalityConnection`: Exposes CRUD operations for the **ModalityConnection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ModalityConnections
    * const modalityConnections = await prisma.modalityConnection.findMany()
    * ```
    */
  get modalityConnection(): Prisma.ModalityConnectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.radiologyReport`: Exposes CRUD operations for the **RadiologyReport** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RadiologyReports
    * const radiologyReports = await prisma.radiologyReport.findMany()
    * ```
    */
  get radiologyReport(): Prisma.RadiologyReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.satuSehatBulkSyncTask`: Exposes CRUD operations for the **SatuSehatBulkSyncTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SatuSehatBulkSyncTasks
    * const satuSehatBulkSyncTasks = await prisma.satuSehatBulkSyncTask.findMany()
    * ```
    */
  get satuSehatBulkSyncTask(): Prisma.SatuSehatBulkSyncTaskDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reportExportTask`: Exposes CRUD operations for the **ReportExportTask** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportExportTasks
    * const reportExportTasks = await prisma.reportExportTask.findMany()
    * ```
    */
  get reportExportTask(): Prisma.ReportExportTaskDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Role: 'Role',
    Permission: 'Permission',
    Account: 'Account',
    Session: 'Session',
    VerificationToken: 'VerificationToken',
    AppConfig: 'AppConfig',
    AiResult: 'AiResult',
    SatuSehatIntegration: 'SatuSehatIntegration',
    SatuSehatWebhookLog: 'SatuSehatWebhookLog',
    SatuSehatSetting: 'SatuSehatSetting',
    SatuSehatResourceLog: 'SatuSehatResourceLog',
    ModalityConnection: 'ModalityConnection',
    RadiologyReport: 'RadiologyReport',
    SatuSehatBulkSyncTask: 'SatuSehatBulkSyncTask',
    ReportExportTask: 'ReportExportTask'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "role" | "permission" | "account" | "session" | "verificationToken" | "appConfig" | "aiResult" | "satuSehatIntegration" | "satuSehatWebhookLog" | "satuSehatSetting" | "satuSehatResourceLog" | "modalityConnection" | "radiologyReport" | "satuSehatBulkSyncTask" | "reportExportTask"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Role: {
        payload: Prisma.$RolePayload<ExtArgs>
        fields: Prisma.RoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findFirst: {
            args: Prisma.RoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          findMany: {
            args: Prisma.RoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          create: {
            args: Prisma.RoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          createMany: {
            args: Prisma.RoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          delete: {
            args: Prisma.RoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          update: {
            args: Prisma.RoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          deleteMany: {
            args: Prisma.RoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>[]
          }
          upsert: {
            args: Prisma.RoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RolePayload>
          }
          aggregate: {
            args: Prisma.RoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRole>
          }
          groupBy: {
            args: Prisma.RoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoleCountArgs<ExtArgs>
            result: $Utils.Optional<RoleCountAggregateOutputType> | number
          }
        }
      }
      Permission: {
        payload: Prisma.$PermissionPayload<ExtArgs>
        fields: Prisma.PermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findFirst: {
            args: Prisma.PermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          findMany: {
            args: Prisma.PermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          create: {
            args: Prisma.PermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          createMany: {
            args: Prisma.PermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          delete: {
            args: Prisma.PermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          update: {
            args: Prisma.PermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          deleteMany: {
            args: Prisma.PermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>[]
          }
          upsert: {
            args: Prisma.PermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionPayload>
          }
          aggregate: {
            args: Prisma.PermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermission>
          }
          groupBy: {
            args: Prisma.PermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
      AppConfig: {
        payload: Prisma.$AppConfigPayload<ExtArgs>
        fields: Prisma.AppConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findFirst: {
            args: Prisma.AppConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findMany: {
            args: Prisma.AppConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          create: {
            args: Prisma.AppConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          createMany: {
            args: Prisma.AppConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          delete: {
            args: Prisma.AppConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          update: {
            args: Prisma.AppConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          deleteMany: {
            args: Prisma.AppConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          upsert: {
            args: Prisma.AppConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfig>
          }
          groupBy: {
            args: Prisma.AppConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigCountAggregateOutputType> | number
          }
        }
      }
      AiResult: {
        payload: Prisma.$AiResultPayload<ExtArgs>
        fields: Prisma.AiResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          findFirst: {
            args: Prisma.AiResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          findMany: {
            args: Prisma.AiResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>[]
          }
          create: {
            args: Prisma.AiResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          createMany: {
            args: Prisma.AiResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiResultCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>[]
          }
          delete: {
            args: Prisma.AiResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          update: {
            args: Prisma.AiResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          deleteMany: {
            args: Prisma.AiResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AiResultUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>[]
          }
          upsert: {
            args: Prisma.AiResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiResultPayload>
          }
          aggregate: {
            args: Prisma.AiResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiResult>
          }
          groupBy: {
            args: Prisma.AiResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiResultCountArgs<ExtArgs>
            result: $Utils.Optional<AiResultCountAggregateOutputType> | number
          }
        }
      }
      SatuSehatIntegration: {
        payload: Prisma.$SatuSehatIntegrationPayload<ExtArgs>
        fields: Prisma.SatuSehatIntegrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SatuSehatIntegrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SatuSehatIntegrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          findFirst: {
            args: Prisma.SatuSehatIntegrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SatuSehatIntegrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          findMany: {
            args: Prisma.SatuSehatIntegrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>[]
          }
          create: {
            args: Prisma.SatuSehatIntegrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          createMany: {
            args: Prisma.SatuSehatIntegrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SatuSehatIntegrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>[]
          }
          delete: {
            args: Prisma.SatuSehatIntegrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          update: {
            args: Prisma.SatuSehatIntegrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          deleteMany: {
            args: Prisma.SatuSehatIntegrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SatuSehatIntegrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SatuSehatIntegrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>[]
          }
          upsert: {
            args: Prisma.SatuSehatIntegrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatIntegrationPayload>
          }
          aggregate: {
            args: Prisma.SatuSehatIntegrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSatuSehatIntegration>
          }
          groupBy: {
            args: Prisma.SatuSehatIntegrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatIntegrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.SatuSehatIntegrationCountArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatIntegrationCountAggregateOutputType> | number
          }
        }
      }
      SatuSehatWebhookLog: {
        payload: Prisma.$SatuSehatWebhookLogPayload<ExtArgs>
        fields: Prisma.SatuSehatWebhookLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SatuSehatWebhookLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SatuSehatWebhookLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          findFirst: {
            args: Prisma.SatuSehatWebhookLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SatuSehatWebhookLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          findMany: {
            args: Prisma.SatuSehatWebhookLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>[]
          }
          create: {
            args: Prisma.SatuSehatWebhookLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          createMany: {
            args: Prisma.SatuSehatWebhookLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SatuSehatWebhookLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>[]
          }
          delete: {
            args: Prisma.SatuSehatWebhookLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          update: {
            args: Prisma.SatuSehatWebhookLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          deleteMany: {
            args: Prisma.SatuSehatWebhookLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SatuSehatWebhookLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SatuSehatWebhookLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>[]
          }
          upsert: {
            args: Prisma.SatuSehatWebhookLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatWebhookLogPayload>
          }
          aggregate: {
            args: Prisma.SatuSehatWebhookLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSatuSehatWebhookLog>
          }
          groupBy: {
            args: Prisma.SatuSehatWebhookLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatWebhookLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SatuSehatWebhookLogCountArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatWebhookLogCountAggregateOutputType> | number
          }
        }
      }
      SatuSehatSetting: {
        payload: Prisma.$SatuSehatSettingPayload<ExtArgs>
        fields: Prisma.SatuSehatSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SatuSehatSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SatuSehatSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          findFirst: {
            args: Prisma.SatuSehatSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SatuSehatSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          findMany: {
            args: Prisma.SatuSehatSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>[]
          }
          create: {
            args: Prisma.SatuSehatSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          createMany: {
            args: Prisma.SatuSehatSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SatuSehatSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>[]
          }
          delete: {
            args: Prisma.SatuSehatSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          update: {
            args: Prisma.SatuSehatSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          deleteMany: {
            args: Prisma.SatuSehatSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SatuSehatSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SatuSehatSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>[]
          }
          upsert: {
            args: Prisma.SatuSehatSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatSettingPayload>
          }
          aggregate: {
            args: Prisma.SatuSehatSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSatuSehatSetting>
          }
          groupBy: {
            args: Prisma.SatuSehatSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SatuSehatSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatSettingCountAggregateOutputType> | number
          }
        }
      }
      SatuSehatResourceLog: {
        payload: Prisma.$SatuSehatResourceLogPayload<ExtArgs>
        fields: Prisma.SatuSehatResourceLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SatuSehatResourceLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SatuSehatResourceLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          findFirst: {
            args: Prisma.SatuSehatResourceLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SatuSehatResourceLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          findMany: {
            args: Prisma.SatuSehatResourceLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>[]
          }
          create: {
            args: Prisma.SatuSehatResourceLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          createMany: {
            args: Prisma.SatuSehatResourceLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SatuSehatResourceLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>[]
          }
          delete: {
            args: Prisma.SatuSehatResourceLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          update: {
            args: Prisma.SatuSehatResourceLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          deleteMany: {
            args: Prisma.SatuSehatResourceLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SatuSehatResourceLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SatuSehatResourceLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>[]
          }
          upsert: {
            args: Prisma.SatuSehatResourceLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatResourceLogPayload>
          }
          aggregate: {
            args: Prisma.SatuSehatResourceLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSatuSehatResourceLog>
          }
          groupBy: {
            args: Prisma.SatuSehatResourceLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatResourceLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.SatuSehatResourceLogCountArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatResourceLogCountAggregateOutputType> | number
          }
        }
      }
      ModalityConnection: {
        payload: Prisma.$ModalityConnectionPayload<ExtArgs>
        fields: Prisma.ModalityConnectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModalityConnectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModalityConnectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          findFirst: {
            args: Prisma.ModalityConnectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModalityConnectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          findMany: {
            args: Prisma.ModalityConnectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>[]
          }
          create: {
            args: Prisma.ModalityConnectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          createMany: {
            args: Prisma.ModalityConnectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ModalityConnectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>[]
          }
          delete: {
            args: Prisma.ModalityConnectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          update: {
            args: Prisma.ModalityConnectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          deleteMany: {
            args: Prisma.ModalityConnectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ModalityConnectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ModalityConnectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>[]
          }
          upsert: {
            args: Prisma.ModalityConnectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ModalityConnectionPayload>
          }
          aggregate: {
            args: Prisma.ModalityConnectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateModalityConnection>
          }
          groupBy: {
            args: Prisma.ModalityConnectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ModalityConnectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModalityConnectionCountArgs<ExtArgs>
            result: $Utils.Optional<ModalityConnectionCountAggregateOutputType> | number
          }
        }
      }
      RadiologyReport: {
        payload: Prisma.$RadiologyReportPayload<ExtArgs>
        fields: Prisma.RadiologyReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RadiologyReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RadiologyReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          findFirst: {
            args: Prisma.RadiologyReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RadiologyReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          findMany: {
            args: Prisma.RadiologyReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>[]
          }
          create: {
            args: Prisma.RadiologyReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          createMany: {
            args: Prisma.RadiologyReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RadiologyReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>[]
          }
          delete: {
            args: Prisma.RadiologyReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          update: {
            args: Prisma.RadiologyReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          deleteMany: {
            args: Prisma.RadiologyReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RadiologyReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RadiologyReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>[]
          }
          upsert: {
            args: Prisma.RadiologyReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RadiologyReportPayload>
          }
          aggregate: {
            args: Prisma.RadiologyReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRadiologyReport>
          }
          groupBy: {
            args: Prisma.RadiologyReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<RadiologyReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.RadiologyReportCountArgs<ExtArgs>
            result: $Utils.Optional<RadiologyReportCountAggregateOutputType> | number
          }
        }
      }
      SatuSehatBulkSyncTask: {
        payload: Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>
        fields: Prisma.SatuSehatBulkSyncTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SatuSehatBulkSyncTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SatuSehatBulkSyncTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          findFirst: {
            args: Prisma.SatuSehatBulkSyncTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SatuSehatBulkSyncTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          findMany: {
            args: Prisma.SatuSehatBulkSyncTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>[]
          }
          create: {
            args: Prisma.SatuSehatBulkSyncTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          createMany: {
            args: Prisma.SatuSehatBulkSyncTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SatuSehatBulkSyncTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>[]
          }
          delete: {
            args: Prisma.SatuSehatBulkSyncTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          update: {
            args: Prisma.SatuSehatBulkSyncTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          deleteMany: {
            args: Prisma.SatuSehatBulkSyncTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SatuSehatBulkSyncTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SatuSehatBulkSyncTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>[]
          }
          upsert: {
            args: Prisma.SatuSehatBulkSyncTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SatuSehatBulkSyncTaskPayload>
          }
          aggregate: {
            args: Prisma.SatuSehatBulkSyncTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSatuSehatBulkSyncTask>
          }
          groupBy: {
            args: Prisma.SatuSehatBulkSyncTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatBulkSyncTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.SatuSehatBulkSyncTaskCountArgs<ExtArgs>
            result: $Utils.Optional<SatuSehatBulkSyncTaskCountAggregateOutputType> | number
          }
        }
      }
      ReportExportTask: {
        payload: Prisma.$ReportExportTaskPayload<ExtArgs>
        fields: Prisma.ReportExportTaskFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportExportTaskFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportExportTaskFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          findFirst: {
            args: Prisma.ReportExportTaskFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportExportTaskFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          findMany: {
            args: Prisma.ReportExportTaskFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>[]
          }
          create: {
            args: Prisma.ReportExportTaskCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          createMany: {
            args: Prisma.ReportExportTaskCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportExportTaskCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>[]
          }
          delete: {
            args: Prisma.ReportExportTaskDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          update: {
            args: Prisma.ReportExportTaskUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          deleteMany: {
            args: Prisma.ReportExportTaskDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportExportTaskUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportExportTaskUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>[]
          }
          upsert: {
            args: Prisma.ReportExportTaskUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportExportTaskPayload>
          }
          aggregate: {
            args: Prisma.ReportExportTaskAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReportExportTask>
          }
          groupBy: {
            args: Prisma.ReportExportTaskGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportExportTaskGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportExportTaskCountArgs<ExtArgs>
            result: $Utils.Optional<ReportExportTaskCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    role?: RoleOmit
    permission?: PermissionOmit
    account?: AccountOmit
    session?: SessionOmit
    verificationToken?: VerificationTokenOmit
    appConfig?: AppConfigOmit
    aiResult?: AiResultOmit
    satuSehatIntegration?: SatuSehatIntegrationOmit
    satuSehatWebhookLog?: SatuSehatWebhookLogOmit
    satuSehatSetting?: SatuSehatSettingOmit
    satuSehatResourceLog?: SatuSehatResourceLogOmit
    modalityConnection?: ModalityConnectionOmit
    radiologyReport?: RadiologyReportOmit
    satuSehatBulkSyncTask?: SatuSehatBulkSyncTaskOmit
    reportExportTask?: ReportExportTaskOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    reports: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RadiologyReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type RoleCountOutputType
   */

  export type RoleCountOutputType = {
    users: number
    permissions: number
  }

  export type RoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | RoleCountOutputTypeCountUsersArgs
    permissions?: boolean | RoleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoleCountOutputType
     */
    select?: RoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * RoleCountOutputType without action
   */
  export type RoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
  }


  /**
   * Count Type PermissionCountOutputType
   */

  export type PermissionCountOutputType = {
    roles: number
  }

  export type PermissionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | PermissionCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes
  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionCountOutputType
     */
    select?: PermissionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionCountOutputType without action
   */
  export type PermissionCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    signature: string | null
    createdAt: Date | null
    updatedAt: Date | null
    roleId: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    signature: string | null
    createdAt: Date | null
    updatedAt: Date | null
    roleId: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    emailVerified: number
    image: number
    signature: number
    createdAt: number
    updatedAt: number
    roleId: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
    roleId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
    roleId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    emailVerified?: true
    image?: true
    signature?: true
    createdAt?: true
    updatedAt?: true
    roleId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    signature: string | null
    createdAt: Date
    updatedAt: Date
    roleId: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roleId?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    role?: boolean | User$roleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roleId?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roleId?: boolean
    role?: boolean | User$roleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    emailVerified?: boolean
    image?: boolean
    signature?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roleId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "emailVerified" | "image" | "signature" | "createdAt" | "updatedAt" | "roleId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    role?: boolean | User$roleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    role?: boolean | User$roleArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      reports: Prisma.$RadiologyReportPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      role: Prisma.$RolePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      password: string | null
      emailVerified: Date | null
      image: string | null
      signature: string | null
      createdAt: Date
      updatedAt: Date
      roleId: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    role<T extends User$roleArgs<ExtArgs> = {}>(args?: Subset<T, User$roleArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly image: FieldRef<"User", 'String'>
    readonly signature: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly roleId: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    where?: RadiologyReportWhereInput
    orderBy?: RadiologyReportOrderByWithRelationInput | RadiologyReportOrderByWithRelationInput[]
    cursor?: RadiologyReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RadiologyReportScalarFieldEnum | RadiologyReportScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.role
   */
  export type User$roleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Role
   */

  export type AggregateRole = {
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  export type RoleMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoleCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoleMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoleCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Role to aggregate.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoleMaxAggregateInputType
  }

  export type GetRoleAggregateType<T extends RoleAggregateArgs> = {
        [P in keyof T & keyof AggregateRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRole[P]>
      : GetScalarType<T[P], AggregateRole[P]>
  }




  export type RoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithAggregationInput | RoleOrderByWithAggregationInput[]
    by: RoleScalarFieldEnum[] | RoleScalarFieldEnum
    having?: RoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoleCountAggregateInputType | true
    _min?: RoleMinAggregateInputType
    _max?: RoleMaxAggregateInputType
  }

  export type RoleGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: RoleCountAggregateOutputType | null
    _min: RoleMinAggregateOutputType | null
    _max: RoleMaxAggregateOutputType | null
  }

  type GetRoleGroupByPayload<T extends RoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoleGroupByOutputType[P]>
            : GetScalarType<T[P], RoleGroupByOutputType[P]>
        }
      >
    >


  export type RoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["role"]>

  export type RoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["role"]>

  export type RoleSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["role"]>
  export type RoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Role$usersArgs<ExtArgs>
    permissions?: boolean | Role$permissionsArgs<ExtArgs>
    _count?: boolean | RoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Role"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      permissions: Prisma.$PermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["role"]>
    composites: {}
  }

  type RoleGetPayload<S extends boolean | null | undefined | RoleDefaultArgs> = $Result.GetResult<Prisma.$RolePayload, S>

  type RoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoleCountAggregateInputType | true
    }

  export interface RoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Role'], meta: { name: 'Role' } }
    /**
     * Find zero or one Role that matches the filter.
     * @param {RoleFindUniqueArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoleFindUniqueArgs>(args: SelectSubset<T, RoleFindUniqueArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Role that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoleFindUniqueOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoleFindUniqueOrThrowArgs>(args: SelectSubset<T, RoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoleFindFirstArgs>(args?: SelectSubset<T, RoleFindFirstArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Role that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindFirstOrThrowArgs} args - Arguments to find a Role
     * @example
     * // Get one Role
     * const role = await prisma.role.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoleFindFirstOrThrowArgs>(args?: SelectSubset<T, RoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.role.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.role.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roleWithIdOnly = await prisma.role.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoleFindManyArgs>(args?: SelectSubset<T, RoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Role.
     * @param {RoleCreateArgs} args - Arguments to create a Role.
     * @example
     * // Create one Role
     * const Role = await prisma.role.create({
     *   data: {
     *     // ... data to create a Role
     *   }
     * })
     * 
     */
    create<T extends RoleCreateArgs>(args: SelectSubset<T, RoleCreateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Roles.
     * @param {RoleCreateManyArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoleCreateManyArgs>(args?: SelectSubset<T, RoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Roles and returns the data saved in the database.
     * @param {RoleCreateManyAndReturnArgs} args - Arguments to create many Roles.
     * @example
     * // Create many Roles
     * const role = await prisma.role.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoleCreateManyAndReturnArgs>(args?: SelectSubset<T, RoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Role.
     * @param {RoleDeleteArgs} args - Arguments to delete one Role.
     * @example
     * // Delete one Role
     * const Role = await prisma.role.delete({
     *   where: {
     *     // ... filter to delete one Role
     *   }
     * })
     * 
     */
    delete<T extends RoleDeleteArgs>(args: SelectSubset<T, RoleDeleteArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Role.
     * @param {RoleUpdateArgs} args - Arguments to update one Role.
     * @example
     * // Update one Role
     * const role = await prisma.role.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoleUpdateArgs>(args: SelectSubset<T, RoleUpdateArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Roles.
     * @param {RoleDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.role.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoleDeleteManyArgs>(args?: SelectSubset<T, RoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoleUpdateManyArgs>(args: SelectSubset<T, RoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles and returns the data updated in the database.
     * @param {RoleUpdateManyAndReturnArgs} args - Arguments to update many Roles.
     * @example
     * // Update many Roles
     * const role = await prisma.role.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Roles and only return the `id`
     * const roleWithIdOnly = await prisma.role.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoleUpdateManyAndReturnArgs>(args: SelectSubset<T, RoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Role.
     * @param {RoleUpsertArgs} args - Arguments to update or create a Role.
     * @example
     * // Update or create a Role
     * const role = await prisma.role.upsert({
     *   create: {
     *     // ... data to create a Role
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Role we want to update
     *   }
     * })
     */
    upsert<T extends RoleUpsertArgs>(args: SelectSubset<T, RoleUpsertArgs<ExtArgs>>): Prisma__RoleClient<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.role.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RoleCountArgs>(
      args?: Subset<T, RoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoleAggregateArgs>(args: Subset<T, RoleAggregateArgs>): Prisma.PrismaPromise<GetRoleAggregateType<T>>

    /**
     * Group by Role.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoleGroupByArgs['orderBy'] }
        : { orderBy?: RoleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Role model
   */
  readonly fields: RoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Role.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Role$usersArgs<ExtArgs> = {}>(args?: Subset<T, Role$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends Role$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Role$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Role model
   */
  interface RoleFieldRefs {
    readonly id: FieldRef<"Role", 'String'>
    readonly name: FieldRef<"Role", 'String'>
    readonly createdAt: FieldRef<"Role", 'DateTime'>
    readonly updatedAt: FieldRef<"Role", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Role findUnique
   */
  export type RoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findUniqueOrThrow
   */
  export type RoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role findFirst
   */
  export type RoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findFirstOrThrow
   */
  export type RoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Role to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role findMany
   */
  export type RoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Role create
   */
  export type RoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to create a Role.
     */
    data: XOR<RoleCreateInput, RoleUncheckedCreateInput>
  }

  /**
   * Role createMany
   */
  export type RoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role createManyAndReturn
   */
  export type RoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to create many Roles.
     */
    data: RoleCreateManyInput | RoleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Role update
   */
  export type RoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The data needed to update a Role.
     */
    data: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
    /**
     * Choose, which Role to update.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role updateMany
   */
  export type RoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role updateManyAndReturn
   */
  export type RoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * The data used to update Roles.
     */
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to update.
     */
    limit?: number
  }

  /**
   * Role upsert
   */
  export type RoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * The filter to search for the Role to update in case it exists.
     */
    where: RoleWhereUniqueInput
    /**
     * In case the Role found by the `where` argument doesn't exist, create a new Role with this data.
     */
    create: XOR<RoleCreateInput, RoleUncheckedCreateInput>
    /**
     * In case the Role was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoleUpdateInput, RoleUncheckedUpdateInput>
  }

  /**
   * Role delete
   */
  export type RoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    /**
     * Filter which Role to delete.
     */
    where: RoleWhereUniqueInput
  }

  /**
   * Role deleteMany
   */
  export type RoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RoleWhereInput
    /**
     * Limit how many Roles to delete.
     */
    limit?: number
  }

  /**
   * Role.users
   */
  export type Role$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Role.permissions
   */
  export type Role$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    cursor?: PermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Role without action
   */
  export type RoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
  }


  /**
   * Model Permission
   */

  export type AggregatePermission = {
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  export type PermissionMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PermissionCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PermissionMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PermissionCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permission to aggregate.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionMaxAggregateInputType
  }

  export type GetPermissionAggregateType<T extends PermissionAggregateArgs> = {
        [P in keyof T & keyof AggregatePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermission[P]>
      : GetScalarType<T[P], AggregatePermission[P]>
  }




  export type PermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionWhereInput
    orderBy?: PermissionOrderByWithAggregationInput | PermissionOrderByWithAggregationInput[]
    by: PermissionScalarFieldEnum[] | PermissionScalarFieldEnum
    having?: PermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionCountAggregateInputType | true
    _min?: PermissionMinAggregateInputType
    _max?: PermissionMaxAggregateInputType
  }

  export type PermissionGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: PermissionCountAggregateOutputType | null
    _min: PermissionMinAggregateOutputType | null
    _max: PermissionMaxAggregateOutputType | null
  }

  type GetPermissionGroupByPayload<T extends PermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionGroupByOutputType[P]>
        }
      >
    >


  export type PermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["permission"]>

  export type PermissionSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["permission"]>
  export type PermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    roles?: boolean | Permission$rolesArgs<ExtArgs>
    _count?: boolean | PermissionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permission"
    objects: {
      roles: Prisma.$RolePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["permission"]>
    composites: {}
  }

  type PermissionGetPayload<S extends boolean | null | undefined | PermissionDefaultArgs> = $Result.GetResult<Prisma.$PermissionPayload, S>

  type PermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionCountAggregateInputType | true
    }

  export interface PermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permission'], meta: { name: 'Permission' } }
    /**
     * Find zero or one Permission that matches the filter.
     * @param {PermissionFindUniqueArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionFindUniqueArgs>(args: SelectSubset<T, PermissionFindUniqueArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Permission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionFindUniqueOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionFindFirstArgs>(args?: SelectSubset<T, PermissionFindFirstArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Permission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindFirstOrThrowArgs} args - Arguments to find a Permission
     * @example
     * // Get one Permission
     * const permission = await prisma.permission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permission.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionWithIdOnly = await prisma.permission.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionFindManyArgs>(args?: SelectSubset<T, PermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Permission.
     * @param {PermissionCreateArgs} args - Arguments to create a Permission.
     * @example
     * // Create one Permission
     * const Permission = await prisma.permission.create({
     *   data: {
     *     // ... data to create a Permission
     *   }
     * })
     * 
     */
    create<T extends PermissionCreateArgs>(args: SelectSubset<T, PermissionCreateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Permissions.
     * @param {PermissionCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionCreateManyArgs>(args?: SelectSubset<T, PermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permission = await prisma.permission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Permission.
     * @param {PermissionDeleteArgs} args - Arguments to delete one Permission.
     * @example
     * // Delete one Permission
     * const Permission = await prisma.permission.delete({
     *   where: {
     *     // ... filter to delete one Permission
     *   }
     * })
     * 
     */
    delete<T extends PermissionDeleteArgs>(args: SelectSubset<T, PermissionDeleteArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Permission.
     * @param {PermissionUpdateArgs} args - Arguments to update one Permission.
     * @example
     * // Update one Permission
     * const permission = await prisma.permission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionUpdateArgs>(args: SelectSubset<T, PermissionUpdateArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionDeleteManyArgs>(args?: SelectSubset<T, PermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionUpdateManyArgs>(args: SelectSubset<T, PermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions and returns the data updated in the database.
     * @param {PermissionUpdateManyAndReturnArgs} args - Arguments to update many Permissions.
     * @example
     * // Update many Permissions
     * const permission = await prisma.permission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Permissions and only return the `id`
     * const permissionWithIdOnly = await prisma.permission.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Permission.
     * @param {PermissionUpsertArgs} args - Arguments to update or create a Permission.
     * @example
     * // Update or create a Permission
     * const permission = await prisma.permission.upsert({
     *   create: {
     *     // ... data to create a Permission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permission we want to update
     *   }
     * })
     */
    upsert<T extends PermissionUpsertArgs>(args: SelectSubset<T, PermissionUpsertArgs<ExtArgs>>): Prisma__PermissionClient<$Result.GetResult<Prisma.$PermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permission.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionCountArgs>(
      args?: Subset<T, PermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionAggregateArgs>(args: Subset<T, PermissionAggregateArgs>): Prisma.PrismaPromise<GetPermissionAggregateType<T>>

    /**
     * Group by Permission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionGroupByArgs['orderBy'] }
        : { orderBy?: PermissionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permission model
   */
  readonly fields: PermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    roles<T extends Permission$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Permission$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permission model
   */
  interface PermissionFieldRefs {
    readonly id: FieldRef<"Permission", 'String'>
    readonly name: FieldRef<"Permission", 'String'>
    readonly createdAt: FieldRef<"Permission", 'DateTime'>
    readonly updatedAt: FieldRef<"Permission", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Permission findUnique
   */
  export type PermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findUniqueOrThrow
   */
  export type PermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission findFirst
   */
  export type PermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findFirstOrThrow
   */
  export type PermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permission to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission findMany
   */
  export type PermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionOrderByWithRelationInput | PermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    distinct?: PermissionScalarFieldEnum | PermissionScalarFieldEnum[]
  }

  /**
   * Permission create
   */
  export type PermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a Permission.
     */
    data: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
  }

  /**
   * Permission createMany
   */
  export type PermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission createManyAndReturn
   */
  export type PermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionCreateManyInput | PermissionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permission update
   */
  export type PermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a Permission.
     */
    data: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
    /**
     * Choose, which Permission to update.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission updateMany
   */
  export type PermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission updateManyAndReturn
   */
  export type PermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to update.
     */
    limit?: number
  }

  /**
   * Permission upsert
   */
  export type PermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the Permission to update in case it exists.
     */
    where: PermissionWhereUniqueInput
    /**
     * In case the Permission found by the `where` argument doesn't exist, create a new Permission with this data.
     */
    create: XOR<PermissionCreateInput, PermissionUncheckedCreateInput>
    /**
     * In case the Permission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionUpdateInput, PermissionUncheckedUpdateInput>
  }

  /**
   * Permission delete
   */
  export type PermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
    /**
     * Filter which Permission to delete.
     */
    where: PermissionWhereUniqueInput
  }

  /**
   * Permission deleteMany
   */
  export type PermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionWhereInput
    /**
     * Limit how many Permissions to delete.
     */
    limit?: number
  }

  /**
   * Permission.roles
   */
  export type Permission$rolesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Role
     */
    select?: RoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Role
     */
    omit?: RoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoleInclude<ExtArgs> | null
    where?: RoleWhereInput
    orderBy?: RoleOrderByWithRelationInput | RoleOrderByWithRelationInput[]
    cursor?: RoleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoleScalarFieldEnum | RoleScalarFieldEnum[]
  }

  /**
   * Permission without action
   */
  export type PermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permission
     */
    select?: PermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Permission
     */
    omit?: PermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Model AppConfig
   */

  export type AggregateAppConfig = {
    _count: AppConfigCountAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  export type AppConfigMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppConfigMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppConfigCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type AppConfigMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppConfigMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppConfigCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type AppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfig to aggregate.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppConfigs
    **/
    _count?: true | AppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigMaxAggregateInputType
  }

  export type GetAppConfigAggregateType<T extends AppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfig[P]>
      : GetScalarType<T[P], AggregateAppConfig[P]>
  }




  export type AppConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppConfigWhereInput
    orderBy?: AppConfigOrderByWithAggregationInput | AppConfigOrderByWithAggregationInput[]
    by: AppConfigScalarFieldEnum[] | AppConfigScalarFieldEnum
    having?: AppConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigCountAggregateInputType | true
    _min?: AppConfigMinAggregateInputType
    _max?: AppConfigMaxAggregateInputType
  }

  export type AppConfigGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: AppConfigCountAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  type GetAppConfigGroupByPayload<T extends AppConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
        }
      >
    >


  export type AppConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type AppConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "value" | "updatedAt", ExtArgs["result"]["appConfig"]>

  export type $AppConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["appConfig"]>
    composites: {}
  }

  type AppConfigGetPayload<S extends boolean | null | undefined | AppConfigDefaultArgs> = $Result.GetResult<Prisma.$AppConfigPayload, S>

  type AppConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppConfigCountAggregateInputType | true
    }

  export interface AppConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppConfig'], meta: { name: 'AppConfig' } }
    /**
     * Find zero or one AppConfig that matches the filter.
     * @param {AppConfigFindUniqueArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppConfigFindUniqueArgs>(args: SelectSubset<T, AppConfigFindUniqueArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AppConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppConfigFindUniqueOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AppConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppConfigFindFirstArgs>(args?: SelectSubset<T, AppConfigFindFirstArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AppConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigs
     * const appConfigs = await prisma.appConfig.findMany()
     * 
     * // Get first 10 AppConfigs
     * const appConfigs = await prisma.appConfig.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppConfigFindManyArgs>(args?: SelectSubset<T, AppConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AppConfig.
     * @param {AppConfigCreateArgs} args - Arguments to create a AppConfig.
     * @example
     * // Create one AppConfig
     * const AppConfig = await prisma.appConfig.create({
     *   data: {
     *     // ... data to create a AppConfig
     *   }
     * })
     * 
     */
    create<T extends AppConfigCreateArgs>(args: SelectSubset<T, AppConfigCreateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AppConfigs.
     * @param {AppConfigCreateManyArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppConfigCreateManyArgs>(args?: SelectSubset<T, AppConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppConfigs and returns the data saved in the database.
     * @param {AppConfigCreateManyAndReturnArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppConfigs and only return the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AppConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AppConfig.
     * @param {AppConfigDeleteArgs} args - Arguments to delete one AppConfig.
     * @example
     * // Delete one AppConfig
     * const AppConfig = await prisma.appConfig.delete({
     *   where: {
     *     // ... filter to delete one AppConfig
     *   }
     * })
     * 
     */
    delete<T extends AppConfigDeleteArgs>(args: SelectSubset<T, AppConfigDeleteArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AppConfig.
     * @param {AppConfigUpdateArgs} args - Arguments to update one AppConfig.
     * @example
     * // Update one AppConfig
     * const appConfig = await prisma.appConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppConfigUpdateArgs>(args: SelectSubset<T, AppConfigUpdateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AppConfigs.
     * @param {AppConfigDeleteManyArgs} args - Arguments to filter AppConfigs to delete.
     * @example
     * // Delete a few AppConfigs
     * const { count } = await prisma.appConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppConfigDeleteManyArgs>(args?: SelectSubset<T, AppConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppConfigUpdateManyArgs>(args: SelectSubset<T, AppConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs and returns the data updated in the database.
     * @param {AppConfigUpdateManyAndReturnArgs} args - Arguments to update many AppConfigs.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AppConfigs and only return the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, AppConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AppConfig.
     * @param {AppConfigUpsertArgs} args - Arguments to update or create a AppConfig.
     * @example
     * // Update or create a AppConfig
     * const appConfig = await prisma.appConfig.upsert({
     *   create: {
     *     // ... data to create a AppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfig we want to update
     *   }
     * })
     */
    upsert<T extends AppConfigUpsertArgs>(args: SelectSubset<T, AppConfigUpsertArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigCountArgs} args - Arguments to filter AppConfigs to count.
     * @example
     * // Count the number of AppConfigs
     * const count = await prisma.appConfig.count({
     *   where: {
     *     // ... the filter for the AppConfigs we want to count
     *   }
     * })
    **/
    count<T extends AppConfigCountArgs>(
      args?: Subset<T, AppConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppConfigAggregateArgs>(args: Subset<T, AppConfigAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAggregateType<T>>

    /**
     * Group by AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppConfigGroupByArgs['orderBy'] }
        : { orderBy?: AppConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppConfig model
   */
  readonly fields: AppConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppConfig model
   */
  interface AppConfigFieldRefs {
    readonly key: FieldRef<"AppConfig", 'String'>
    readonly value: FieldRef<"AppConfig", 'String'>
    readonly updatedAt: FieldRef<"AppConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppConfig findUnique
   */
  export type AppConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findUniqueOrThrow
   */
  export type AppConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findFirst
   */
  export type AppConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findFirstOrThrow
   */
  export type AppConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findMany
   */
  export type AppConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter, which AppConfigs to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig create
   */
  export type AppConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data needed to create a AppConfig.
     */
    data: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
  }

  /**
   * AppConfig createMany
   */
  export type AppConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig createManyAndReturn
   */
  export type AppConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig update
   */
  export type AppConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data needed to update a AppConfig.
     */
    data: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
    /**
     * Choose, which AppConfig to update.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig updateMany
   */
  export type AppConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to update.
     */
    limit?: number
  }

  /**
   * AppConfig updateManyAndReturn
   */
  export type AppConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to update.
     */
    limit?: number
  }

  /**
   * AppConfig upsert
   */
  export type AppConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * The filter to search for the AppConfig to update in case it exists.
     */
    where: AppConfigWhereUniqueInput
    /**
     * In case the AppConfig found by the `where` argument doesn't exist, create a new AppConfig with this data.
     */
    create: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
    /**
     * In case the AppConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
  }

  /**
   * AppConfig delete
   */
  export type AppConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
    /**
     * Filter which AppConfig to delete.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig deleteMany
   */
  export type AppConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfigs to delete
     */
    where?: AppConfigWhereInput
    /**
     * Limit how many AppConfigs to delete.
     */
    limit?: number
  }

  /**
   * AppConfig without action
   */
  export type AppConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AppConfig
     */
    omit?: AppConfigOmit<ExtArgs> | null
  }


  /**
   * Model AiResult
   */

  export type AggregateAiResult = {
    _count: AiResultCountAggregateOutputType | null
    _min: AiResultMinAggregateOutputType | null
    _max: AiResultMaxAggregateOutputType | null
  }

  export type AiResultMinAggregateOutputType = {
    studyInstanceUid: string | null
    modality: string | null
    conclusion: string | null
    isUrgent: boolean | null
    heatmapPath: string | null
    heatmapBase64: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiResultMaxAggregateOutputType = {
    studyInstanceUid: string | null
    modality: string | null
    conclusion: string | null
    isUrgent: boolean | null
    heatmapPath: string | null
    heatmapBase64: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AiResultCountAggregateOutputType = {
    studyInstanceUid: number
    modality: number
    conclusion: number
    findings: number
    isUrgent: number
    heatmapPath: number
    heatmapBase64: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AiResultMinAggregateInputType = {
    studyInstanceUid?: true
    modality?: true
    conclusion?: true
    isUrgent?: true
    heatmapPath?: true
    heatmapBase64?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiResultMaxAggregateInputType = {
    studyInstanceUid?: true
    modality?: true
    conclusion?: true
    isUrgent?: true
    heatmapPath?: true
    heatmapBase64?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AiResultCountAggregateInputType = {
    studyInstanceUid?: true
    modality?: true
    conclusion?: true
    findings?: true
    isUrgent?: true
    heatmapPath?: true
    heatmapBase64?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AiResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiResult to aggregate.
     */
    where?: AiResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiResults to fetch.
     */
    orderBy?: AiResultOrderByWithRelationInput | AiResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiResults
    **/
    _count?: true | AiResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiResultMaxAggregateInputType
  }

  export type GetAiResultAggregateType<T extends AiResultAggregateArgs> = {
        [P in keyof T & keyof AggregateAiResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiResult[P]>
      : GetScalarType<T[P], AggregateAiResult[P]>
  }




  export type AiResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiResultWhereInput
    orderBy?: AiResultOrderByWithAggregationInput | AiResultOrderByWithAggregationInput[]
    by: AiResultScalarFieldEnum[] | AiResultScalarFieldEnum
    having?: AiResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiResultCountAggregateInputType | true
    _min?: AiResultMinAggregateInputType
    _max?: AiResultMaxAggregateInputType
  }

  export type AiResultGroupByOutputType = {
    studyInstanceUid: string
    modality: string
    conclusion: string
    findings: JsonValue
    isUrgent: boolean
    heatmapPath: string | null
    heatmapBase64: string | null
    createdAt: Date
    updatedAt: Date
    _count: AiResultCountAggregateOutputType | null
    _min: AiResultMinAggregateOutputType | null
    _max: AiResultMaxAggregateOutputType | null
  }

  type GetAiResultGroupByPayload<T extends AiResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiResultGroupByOutputType[P]>
            : GetScalarType<T[P], AiResultGroupByOutputType[P]>
        }
      >
    >


  export type AiResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studyInstanceUid?: boolean
    modality?: boolean
    conclusion?: boolean
    findings?: boolean
    isUrgent?: boolean
    heatmapPath?: boolean
    heatmapBase64?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiResult"]>

  export type AiResultSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studyInstanceUid?: boolean
    modality?: boolean
    conclusion?: boolean
    findings?: boolean
    isUrgent?: boolean
    heatmapPath?: boolean
    heatmapBase64?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiResult"]>

  export type AiResultSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studyInstanceUid?: boolean
    modality?: boolean
    conclusion?: boolean
    findings?: boolean
    isUrgent?: boolean
    heatmapPath?: boolean
    heatmapBase64?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["aiResult"]>

  export type AiResultSelectScalar = {
    studyInstanceUid?: boolean
    modality?: boolean
    conclusion?: boolean
    findings?: boolean
    isUrgent?: boolean
    heatmapPath?: boolean
    heatmapBase64?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AiResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"studyInstanceUid" | "modality" | "conclusion" | "findings" | "isUrgent" | "heatmapPath" | "heatmapBase64" | "createdAt" | "updatedAt", ExtArgs["result"]["aiResult"]>

  export type $AiResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiResult"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      studyInstanceUid: string
      modality: string
      conclusion: string
      findings: Prisma.JsonValue
      isUrgent: boolean
      heatmapPath: string | null
      heatmapBase64: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["aiResult"]>
    composites: {}
  }

  type AiResultGetPayload<S extends boolean | null | undefined | AiResultDefaultArgs> = $Result.GetResult<Prisma.$AiResultPayload, S>

  type AiResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AiResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AiResultCountAggregateInputType | true
    }

  export interface AiResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiResult'], meta: { name: 'AiResult' } }
    /**
     * Find zero or one AiResult that matches the filter.
     * @param {AiResultFindUniqueArgs} args - Arguments to find a AiResult
     * @example
     * // Get one AiResult
     * const aiResult = await prisma.aiResult.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiResultFindUniqueArgs>(args: SelectSubset<T, AiResultFindUniqueArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AiResult that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AiResultFindUniqueOrThrowArgs} args - Arguments to find a AiResult
     * @example
     * // Get one AiResult
     * const aiResult = await prisma.aiResult.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiResultFindUniqueOrThrowArgs>(args: SelectSubset<T, AiResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiResult that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultFindFirstArgs} args - Arguments to find a AiResult
     * @example
     * // Get one AiResult
     * const aiResult = await prisma.aiResult.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiResultFindFirstArgs>(args?: SelectSubset<T, AiResultFindFirstArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AiResult that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultFindFirstOrThrowArgs} args - Arguments to find a AiResult
     * @example
     * // Get one AiResult
     * const aiResult = await prisma.aiResult.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiResultFindFirstOrThrowArgs>(args?: SelectSubset<T, AiResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AiResults that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiResults
     * const aiResults = await prisma.aiResult.findMany()
     * 
     * // Get first 10 AiResults
     * const aiResults = await prisma.aiResult.findMany({ take: 10 })
     * 
     * // Only select the `studyInstanceUid`
     * const aiResultWithStudyInstanceUidOnly = await prisma.aiResult.findMany({ select: { studyInstanceUid: true } })
     * 
     */
    findMany<T extends AiResultFindManyArgs>(args?: SelectSubset<T, AiResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AiResult.
     * @param {AiResultCreateArgs} args - Arguments to create a AiResult.
     * @example
     * // Create one AiResult
     * const AiResult = await prisma.aiResult.create({
     *   data: {
     *     // ... data to create a AiResult
     *   }
     * })
     * 
     */
    create<T extends AiResultCreateArgs>(args: SelectSubset<T, AiResultCreateArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AiResults.
     * @param {AiResultCreateManyArgs} args - Arguments to create many AiResults.
     * @example
     * // Create many AiResults
     * const aiResult = await prisma.aiResult.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiResultCreateManyArgs>(args?: SelectSubset<T, AiResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiResults and returns the data saved in the database.
     * @param {AiResultCreateManyAndReturnArgs} args - Arguments to create many AiResults.
     * @example
     * // Create many AiResults
     * const aiResult = await prisma.aiResult.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiResults and only return the `studyInstanceUid`
     * const aiResultWithStudyInstanceUidOnly = await prisma.aiResult.createManyAndReturn({
     *   select: { studyInstanceUid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiResultCreateManyAndReturnArgs>(args?: SelectSubset<T, AiResultCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AiResult.
     * @param {AiResultDeleteArgs} args - Arguments to delete one AiResult.
     * @example
     * // Delete one AiResult
     * const AiResult = await prisma.aiResult.delete({
     *   where: {
     *     // ... filter to delete one AiResult
     *   }
     * })
     * 
     */
    delete<T extends AiResultDeleteArgs>(args: SelectSubset<T, AiResultDeleteArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AiResult.
     * @param {AiResultUpdateArgs} args - Arguments to update one AiResult.
     * @example
     * // Update one AiResult
     * const aiResult = await prisma.aiResult.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiResultUpdateArgs>(args: SelectSubset<T, AiResultUpdateArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AiResults.
     * @param {AiResultDeleteManyArgs} args - Arguments to filter AiResults to delete.
     * @example
     * // Delete a few AiResults
     * const { count } = await prisma.aiResult.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiResultDeleteManyArgs>(args?: SelectSubset<T, AiResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiResults
     * const aiResult = await prisma.aiResult.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiResultUpdateManyArgs>(args: SelectSubset<T, AiResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiResults and returns the data updated in the database.
     * @param {AiResultUpdateManyAndReturnArgs} args - Arguments to update many AiResults.
     * @example
     * // Update many AiResults
     * const aiResult = await prisma.aiResult.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AiResults and only return the `studyInstanceUid`
     * const aiResultWithStudyInstanceUidOnly = await prisma.aiResult.updateManyAndReturn({
     *   select: { studyInstanceUid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AiResultUpdateManyAndReturnArgs>(args: SelectSubset<T, AiResultUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AiResult.
     * @param {AiResultUpsertArgs} args - Arguments to update or create a AiResult.
     * @example
     * // Update or create a AiResult
     * const aiResult = await prisma.aiResult.upsert({
     *   create: {
     *     // ... data to create a AiResult
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiResult we want to update
     *   }
     * })
     */
    upsert<T extends AiResultUpsertArgs>(args: SelectSubset<T, AiResultUpsertArgs<ExtArgs>>): Prisma__AiResultClient<$Result.GetResult<Prisma.$AiResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AiResults.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultCountArgs} args - Arguments to filter AiResults to count.
     * @example
     * // Count the number of AiResults
     * const count = await prisma.aiResult.count({
     *   where: {
     *     // ... the filter for the AiResults we want to count
     *   }
     * })
    **/
    count<T extends AiResultCountArgs>(
      args?: Subset<T, AiResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AiResultAggregateArgs>(args: Subset<T, AiResultAggregateArgs>): Prisma.PrismaPromise<GetAiResultAggregateType<T>>

    /**
     * Group by AiResult.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AiResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiResultGroupByArgs['orderBy'] }
        : { orderBy?: AiResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AiResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiResult model
   */
  readonly fields: AiResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiResult.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AiResult model
   */
  interface AiResultFieldRefs {
    readonly studyInstanceUid: FieldRef<"AiResult", 'String'>
    readonly modality: FieldRef<"AiResult", 'String'>
    readonly conclusion: FieldRef<"AiResult", 'String'>
    readonly findings: FieldRef<"AiResult", 'Json'>
    readonly isUrgent: FieldRef<"AiResult", 'Boolean'>
    readonly heatmapPath: FieldRef<"AiResult", 'String'>
    readonly heatmapBase64: FieldRef<"AiResult", 'String'>
    readonly createdAt: FieldRef<"AiResult", 'DateTime'>
    readonly updatedAt: FieldRef<"AiResult", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiResult findUnique
   */
  export type AiResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter, which AiResult to fetch.
     */
    where: AiResultWhereUniqueInput
  }

  /**
   * AiResult findUniqueOrThrow
   */
  export type AiResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter, which AiResult to fetch.
     */
    where: AiResultWhereUniqueInput
  }

  /**
   * AiResult findFirst
   */
  export type AiResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter, which AiResult to fetch.
     */
    where?: AiResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiResults to fetch.
     */
    orderBy?: AiResultOrderByWithRelationInput | AiResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiResults.
     */
    cursor?: AiResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiResults.
     */
    distinct?: AiResultScalarFieldEnum | AiResultScalarFieldEnum[]
  }

  /**
   * AiResult findFirstOrThrow
   */
  export type AiResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter, which AiResult to fetch.
     */
    where?: AiResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiResults to fetch.
     */
    orderBy?: AiResultOrderByWithRelationInput | AiResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiResults.
     */
    cursor?: AiResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiResults.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiResults.
     */
    distinct?: AiResultScalarFieldEnum | AiResultScalarFieldEnum[]
  }

  /**
   * AiResult findMany
   */
  export type AiResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter, which AiResults to fetch.
     */
    where?: AiResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiResults to fetch.
     */
    orderBy?: AiResultOrderByWithRelationInput | AiResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiResults.
     */
    cursor?: AiResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiResults from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiResults.
     */
    skip?: number
    distinct?: AiResultScalarFieldEnum | AiResultScalarFieldEnum[]
  }

  /**
   * AiResult create
   */
  export type AiResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * The data needed to create a AiResult.
     */
    data: XOR<AiResultCreateInput, AiResultUncheckedCreateInput>
  }

  /**
   * AiResult createMany
   */
  export type AiResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiResults.
     */
    data: AiResultCreateManyInput | AiResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiResult createManyAndReturn
   */
  export type AiResultCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * The data used to create many AiResults.
     */
    data: AiResultCreateManyInput | AiResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiResult update
   */
  export type AiResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * The data needed to update a AiResult.
     */
    data: XOR<AiResultUpdateInput, AiResultUncheckedUpdateInput>
    /**
     * Choose, which AiResult to update.
     */
    where: AiResultWhereUniqueInput
  }

  /**
   * AiResult updateMany
   */
  export type AiResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiResults.
     */
    data: XOR<AiResultUpdateManyMutationInput, AiResultUncheckedUpdateManyInput>
    /**
     * Filter which AiResults to update
     */
    where?: AiResultWhereInput
    /**
     * Limit how many AiResults to update.
     */
    limit?: number
  }

  /**
   * AiResult updateManyAndReturn
   */
  export type AiResultUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * The data used to update AiResults.
     */
    data: XOR<AiResultUpdateManyMutationInput, AiResultUncheckedUpdateManyInput>
    /**
     * Filter which AiResults to update
     */
    where?: AiResultWhereInput
    /**
     * Limit how many AiResults to update.
     */
    limit?: number
  }

  /**
   * AiResult upsert
   */
  export type AiResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * The filter to search for the AiResult to update in case it exists.
     */
    where: AiResultWhereUniqueInput
    /**
     * In case the AiResult found by the `where` argument doesn't exist, create a new AiResult with this data.
     */
    create: XOR<AiResultCreateInput, AiResultUncheckedCreateInput>
    /**
     * In case the AiResult was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiResultUpdateInput, AiResultUncheckedUpdateInput>
  }

  /**
   * AiResult delete
   */
  export type AiResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
    /**
     * Filter which AiResult to delete.
     */
    where: AiResultWhereUniqueInput
  }

  /**
   * AiResult deleteMany
   */
  export type AiResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiResults to delete
     */
    where?: AiResultWhereInput
    /**
     * Limit how many AiResults to delete.
     */
    limit?: number
  }

  /**
   * AiResult without action
   */
  export type AiResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiResult
     */
    select?: AiResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AiResult
     */
    omit?: AiResultOmit<ExtArgs> | null
  }


  /**
   * Model SatuSehatIntegration
   */

  export type AggregateSatuSehatIntegration = {
    _count: SatuSehatIntegrationCountAggregateOutputType | null
    _min: SatuSehatIntegrationMinAggregateOutputType | null
    _max: SatuSehatIntegrationMaxAggregateOutputType | null
  }

  export type SatuSehatIntegrationMinAggregateOutputType = {
    accessionNumber: string | null
    studyInstanceUid: string | null
    satusehatId: string | null
    patientNik: string | null
    status: string | null
    error: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SatuSehatIntegrationMaxAggregateOutputType = {
    accessionNumber: string | null
    studyInstanceUid: string | null
    satusehatId: string | null
    patientNik: string | null
    status: string | null
    error: string | null
    syncedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SatuSehatIntegrationCountAggregateOutputType = {
    accessionNumber: number
    studyInstanceUid: number
    satusehatId: number
    patientNik: number
    status: number
    error: number
    bundleResponse: number
    syncedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SatuSehatIntegrationMinAggregateInputType = {
    accessionNumber?: true
    studyInstanceUid?: true
    satusehatId?: true
    patientNik?: true
    status?: true
    error?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SatuSehatIntegrationMaxAggregateInputType = {
    accessionNumber?: true
    studyInstanceUid?: true
    satusehatId?: true
    patientNik?: true
    status?: true
    error?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SatuSehatIntegrationCountAggregateInputType = {
    accessionNumber?: true
    studyInstanceUid?: true
    satusehatId?: true
    patientNik?: true
    status?: true
    error?: true
    bundleResponse?: true
    syncedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SatuSehatIntegrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatIntegration to aggregate.
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatIntegrations to fetch.
     */
    orderBy?: SatuSehatIntegrationOrderByWithRelationInput | SatuSehatIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SatuSehatIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SatuSehatIntegrations
    **/
    _count?: true | SatuSehatIntegrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SatuSehatIntegrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SatuSehatIntegrationMaxAggregateInputType
  }

  export type GetSatuSehatIntegrationAggregateType<T extends SatuSehatIntegrationAggregateArgs> = {
        [P in keyof T & keyof AggregateSatuSehatIntegration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSatuSehatIntegration[P]>
      : GetScalarType<T[P], AggregateSatuSehatIntegration[P]>
  }




  export type SatuSehatIntegrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SatuSehatIntegrationWhereInput
    orderBy?: SatuSehatIntegrationOrderByWithAggregationInput | SatuSehatIntegrationOrderByWithAggregationInput[]
    by: SatuSehatIntegrationScalarFieldEnum[] | SatuSehatIntegrationScalarFieldEnum
    having?: SatuSehatIntegrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SatuSehatIntegrationCountAggregateInputType | true
    _min?: SatuSehatIntegrationMinAggregateInputType
    _max?: SatuSehatIntegrationMaxAggregateInputType
  }

  export type SatuSehatIntegrationGroupByOutputType = {
    accessionNumber: string
    studyInstanceUid: string | null
    satusehatId: string | null
    patientNik: string | null
    status: string
    error: string | null
    bundleResponse: JsonValue | null
    syncedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: SatuSehatIntegrationCountAggregateOutputType | null
    _min: SatuSehatIntegrationMinAggregateOutputType | null
    _max: SatuSehatIntegrationMaxAggregateOutputType | null
  }

  type GetSatuSehatIntegrationGroupByPayload<T extends SatuSehatIntegrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SatuSehatIntegrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SatuSehatIntegrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SatuSehatIntegrationGroupByOutputType[P]>
            : GetScalarType<T[P], SatuSehatIntegrationGroupByOutputType[P]>
        }
      >
    >


  export type SatuSehatIntegrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    satusehatId?: boolean
    patientNik?: boolean
    status?: boolean
    error?: boolean
    bundleResponse?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["satuSehatIntegration"]>

  export type SatuSehatIntegrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    satusehatId?: boolean
    patientNik?: boolean
    status?: boolean
    error?: boolean
    bundleResponse?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["satuSehatIntegration"]>

  export type SatuSehatIntegrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    satusehatId?: boolean
    patientNik?: boolean
    status?: boolean
    error?: boolean
    bundleResponse?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["satuSehatIntegration"]>

  export type SatuSehatIntegrationSelectScalar = {
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    satusehatId?: boolean
    patientNik?: boolean
    status?: boolean
    error?: boolean
    bundleResponse?: boolean
    syncedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SatuSehatIntegrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"accessionNumber" | "studyInstanceUid" | "satusehatId" | "patientNik" | "status" | "error" | "bundleResponse" | "syncedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["satuSehatIntegration"]>

  export type $SatuSehatIntegrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SatuSehatIntegration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      accessionNumber: string
      studyInstanceUid: string | null
      satusehatId: string | null
      patientNik: string | null
      status: string
      error: string | null
      bundleResponse: Prisma.JsonValue | null
      syncedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["satuSehatIntegration"]>
    composites: {}
  }

  type SatuSehatIntegrationGetPayload<S extends boolean | null | undefined | SatuSehatIntegrationDefaultArgs> = $Result.GetResult<Prisma.$SatuSehatIntegrationPayload, S>

  type SatuSehatIntegrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SatuSehatIntegrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SatuSehatIntegrationCountAggregateInputType | true
    }

  export interface SatuSehatIntegrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SatuSehatIntegration'], meta: { name: 'SatuSehatIntegration' } }
    /**
     * Find zero or one SatuSehatIntegration that matches the filter.
     * @param {SatuSehatIntegrationFindUniqueArgs} args - Arguments to find a SatuSehatIntegration
     * @example
     * // Get one SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SatuSehatIntegrationFindUniqueArgs>(args: SelectSubset<T, SatuSehatIntegrationFindUniqueArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SatuSehatIntegration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SatuSehatIntegrationFindUniqueOrThrowArgs} args - Arguments to find a SatuSehatIntegration
     * @example
     * // Get one SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SatuSehatIntegrationFindUniqueOrThrowArgs>(args: SelectSubset<T, SatuSehatIntegrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatIntegration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationFindFirstArgs} args - Arguments to find a SatuSehatIntegration
     * @example
     * // Get one SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SatuSehatIntegrationFindFirstArgs>(args?: SelectSubset<T, SatuSehatIntegrationFindFirstArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatIntegration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationFindFirstOrThrowArgs} args - Arguments to find a SatuSehatIntegration
     * @example
     * // Get one SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SatuSehatIntegrationFindFirstOrThrowArgs>(args?: SelectSubset<T, SatuSehatIntegrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SatuSehatIntegrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SatuSehatIntegrations
     * const satuSehatIntegrations = await prisma.satuSehatIntegration.findMany()
     * 
     * // Get first 10 SatuSehatIntegrations
     * const satuSehatIntegrations = await prisma.satuSehatIntegration.findMany({ take: 10 })
     * 
     * // Only select the `accessionNumber`
     * const satuSehatIntegrationWithAccessionNumberOnly = await prisma.satuSehatIntegration.findMany({ select: { accessionNumber: true } })
     * 
     */
    findMany<T extends SatuSehatIntegrationFindManyArgs>(args?: SelectSubset<T, SatuSehatIntegrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SatuSehatIntegration.
     * @param {SatuSehatIntegrationCreateArgs} args - Arguments to create a SatuSehatIntegration.
     * @example
     * // Create one SatuSehatIntegration
     * const SatuSehatIntegration = await prisma.satuSehatIntegration.create({
     *   data: {
     *     // ... data to create a SatuSehatIntegration
     *   }
     * })
     * 
     */
    create<T extends SatuSehatIntegrationCreateArgs>(args: SelectSubset<T, SatuSehatIntegrationCreateArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SatuSehatIntegrations.
     * @param {SatuSehatIntegrationCreateManyArgs} args - Arguments to create many SatuSehatIntegrations.
     * @example
     * // Create many SatuSehatIntegrations
     * const satuSehatIntegration = await prisma.satuSehatIntegration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SatuSehatIntegrationCreateManyArgs>(args?: SelectSubset<T, SatuSehatIntegrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SatuSehatIntegrations and returns the data saved in the database.
     * @param {SatuSehatIntegrationCreateManyAndReturnArgs} args - Arguments to create many SatuSehatIntegrations.
     * @example
     * // Create many SatuSehatIntegrations
     * const satuSehatIntegration = await prisma.satuSehatIntegration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SatuSehatIntegrations and only return the `accessionNumber`
     * const satuSehatIntegrationWithAccessionNumberOnly = await prisma.satuSehatIntegration.createManyAndReturn({
     *   select: { accessionNumber: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SatuSehatIntegrationCreateManyAndReturnArgs>(args?: SelectSubset<T, SatuSehatIntegrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SatuSehatIntegration.
     * @param {SatuSehatIntegrationDeleteArgs} args - Arguments to delete one SatuSehatIntegration.
     * @example
     * // Delete one SatuSehatIntegration
     * const SatuSehatIntegration = await prisma.satuSehatIntegration.delete({
     *   where: {
     *     // ... filter to delete one SatuSehatIntegration
     *   }
     * })
     * 
     */
    delete<T extends SatuSehatIntegrationDeleteArgs>(args: SelectSubset<T, SatuSehatIntegrationDeleteArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SatuSehatIntegration.
     * @param {SatuSehatIntegrationUpdateArgs} args - Arguments to update one SatuSehatIntegration.
     * @example
     * // Update one SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SatuSehatIntegrationUpdateArgs>(args: SelectSubset<T, SatuSehatIntegrationUpdateArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SatuSehatIntegrations.
     * @param {SatuSehatIntegrationDeleteManyArgs} args - Arguments to filter SatuSehatIntegrations to delete.
     * @example
     * // Delete a few SatuSehatIntegrations
     * const { count } = await prisma.satuSehatIntegration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SatuSehatIntegrationDeleteManyArgs>(args?: SelectSubset<T, SatuSehatIntegrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SatuSehatIntegrations
     * const satuSehatIntegration = await prisma.satuSehatIntegration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SatuSehatIntegrationUpdateManyArgs>(args: SelectSubset<T, SatuSehatIntegrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatIntegrations and returns the data updated in the database.
     * @param {SatuSehatIntegrationUpdateManyAndReturnArgs} args - Arguments to update many SatuSehatIntegrations.
     * @example
     * // Update many SatuSehatIntegrations
     * const satuSehatIntegration = await prisma.satuSehatIntegration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SatuSehatIntegrations and only return the `accessionNumber`
     * const satuSehatIntegrationWithAccessionNumberOnly = await prisma.satuSehatIntegration.updateManyAndReturn({
     *   select: { accessionNumber: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SatuSehatIntegrationUpdateManyAndReturnArgs>(args: SelectSubset<T, SatuSehatIntegrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SatuSehatIntegration.
     * @param {SatuSehatIntegrationUpsertArgs} args - Arguments to update or create a SatuSehatIntegration.
     * @example
     * // Update or create a SatuSehatIntegration
     * const satuSehatIntegration = await prisma.satuSehatIntegration.upsert({
     *   create: {
     *     // ... data to create a SatuSehatIntegration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SatuSehatIntegration we want to update
     *   }
     * })
     */
    upsert<T extends SatuSehatIntegrationUpsertArgs>(args: SelectSubset<T, SatuSehatIntegrationUpsertArgs<ExtArgs>>): Prisma__SatuSehatIntegrationClient<$Result.GetResult<Prisma.$SatuSehatIntegrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SatuSehatIntegrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationCountArgs} args - Arguments to filter SatuSehatIntegrations to count.
     * @example
     * // Count the number of SatuSehatIntegrations
     * const count = await prisma.satuSehatIntegration.count({
     *   where: {
     *     // ... the filter for the SatuSehatIntegrations we want to count
     *   }
     * })
    **/
    count<T extends SatuSehatIntegrationCountArgs>(
      args?: Subset<T, SatuSehatIntegrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SatuSehatIntegrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SatuSehatIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SatuSehatIntegrationAggregateArgs>(args: Subset<T, SatuSehatIntegrationAggregateArgs>): Prisma.PrismaPromise<GetSatuSehatIntegrationAggregateType<T>>

    /**
     * Group by SatuSehatIntegration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatIntegrationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SatuSehatIntegrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SatuSehatIntegrationGroupByArgs['orderBy'] }
        : { orderBy?: SatuSehatIntegrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SatuSehatIntegrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSatuSehatIntegrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SatuSehatIntegration model
   */
  readonly fields: SatuSehatIntegrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SatuSehatIntegration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SatuSehatIntegrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SatuSehatIntegration model
   */
  interface SatuSehatIntegrationFieldRefs {
    readonly accessionNumber: FieldRef<"SatuSehatIntegration", 'String'>
    readonly studyInstanceUid: FieldRef<"SatuSehatIntegration", 'String'>
    readonly satusehatId: FieldRef<"SatuSehatIntegration", 'String'>
    readonly patientNik: FieldRef<"SatuSehatIntegration", 'String'>
    readonly status: FieldRef<"SatuSehatIntegration", 'String'>
    readonly error: FieldRef<"SatuSehatIntegration", 'String'>
    readonly bundleResponse: FieldRef<"SatuSehatIntegration", 'Json'>
    readonly syncedAt: FieldRef<"SatuSehatIntegration", 'DateTime'>
    readonly createdAt: FieldRef<"SatuSehatIntegration", 'DateTime'>
    readonly updatedAt: FieldRef<"SatuSehatIntegration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SatuSehatIntegration findUnique
   */
  export type SatuSehatIntegrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatIntegration to fetch.
     */
    where: SatuSehatIntegrationWhereUniqueInput
  }

  /**
   * SatuSehatIntegration findUniqueOrThrow
   */
  export type SatuSehatIntegrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatIntegration to fetch.
     */
    where: SatuSehatIntegrationWhereUniqueInput
  }

  /**
   * SatuSehatIntegration findFirst
   */
  export type SatuSehatIntegrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatIntegration to fetch.
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatIntegrations to fetch.
     */
    orderBy?: SatuSehatIntegrationOrderByWithRelationInput | SatuSehatIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatIntegrations.
     */
    cursor?: SatuSehatIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatIntegrations.
     */
    distinct?: SatuSehatIntegrationScalarFieldEnum | SatuSehatIntegrationScalarFieldEnum[]
  }

  /**
   * SatuSehatIntegration findFirstOrThrow
   */
  export type SatuSehatIntegrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatIntegration to fetch.
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatIntegrations to fetch.
     */
    orderBy?: SatuSehatIntegrationOrderByWithRelationInput | SatuSehatIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatIntegrations.
     */
    cursor?: SatuSehatIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatIntegrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatIntegrations.
     */
    distinct?: SatuSehatIntegrationScalarFieldEnum | SatuSehatIntegrationScalarFieldEnum[]
  }

  /**
   * SatuSehatIntegration findMany
   */
  export type SatuSehatIntegrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatIntegrations to fetch.
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatIntegrations to fetch.
     */
    orderBy?: SatuSehatIntegrationOrderByWithRelationInput | SatuSehatIntegrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SatuSehatIntegrations.
     */
    cursor?: SatuSehatIntegrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatIntegrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatIntegrations.
     */
    skip?: number
    distinct?: SatuSehatIntegrationScalarFieldEnum | SatuSehatIntegrationScalarFieldEnum[]
  }

  /**
   * SatuSehatIntegration create
   */
  export type SatuSehatIntegrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * The data needed to create a SatuSehatIntegration.
     */
    data: XOR<SatuSehatIntegrationCreateInput, SatuSehatIntegrationUncheckedCreateInput>
  }

  /**
   * SatuSehatIntegration createMany
   */
  export type SatuSehatIntegrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SatuSehatIntegrations.
     */
    data: SatuSehatIntegrationCreateManyInput | SatuSehatIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatIntegration createManyAndReturn
   */
  export type SatuSehatIntegrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * The data used to create many SatuSehatIntegrations.
     */
    data: SatuSehatIntegrationCreateManyInput | SatuSehatIntegrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatIntegration update
   */
  export type SatuSehatIntegrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * The data needed to update a SatuSehatIntegration.
     */
    data: XOR<SatuSehatIntegrationUpdateInput, SatuSehatIntegrationUncheckedUpdateInput>
    /**
     * Choose, which SatuSehatIntegration to update.
     */
    where: SatuSehatIntegrationWhereUniqueInput
  }

  /**
   * SatuSehatIntegration updateMany
   */
  export type SatuSehatIntegrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SatuSehatIntegrations.
     */
    data: XOR<SatuSehatIntegrationUpdateManyMutationInput, SatuSehatIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatIntegrations to update
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * Limit how many SatuSehatIntegrations to update.
     */
    limit?: number
  }

  /**
   * SatuSehatIntegration updateManyAndReturn
   */
  export type SatuSehatIntegrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * The data used to update SatuSehatIntegrations.
     */
    data: XOR<SatuSehatIntegrationUpdateManyMutationInput, SatuSehatIntegrationUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatIntegrations to update
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * Limit how many SatuSehatIntegrations to update.
     */
    limit?: number
  }

  /**
   * SatuSehatIntegration upsert
   */
  export type SatuSehatIntegrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * The filter to search for the SatuSehatIntegration to update in case it exists.
     */
    where: SatuSehatIntegrationWhereUniqueInput
    /**
     * In case the SatuSehatIntegration found by the `where` argument doesn't exist, create a new SatuSehatIntegration with this data.
     */
    create: XOR<SatuSehatIntegrationCreateInput, SatuSehatIntegrationUncheckedCreateInput>
    /**
     * In case the SatuSehatIntegration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SatuSehatIntegrationUpdateInput, SatuSehatIntegrationUncheckedUpdateInput>
  }

  /**
   * SatuSehatIntegration delete
   */
  export type SatuSehatIntegrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
    /**
     * Filter which SatuSehatIntegration to delete.
     */
    where: SatuSehatIntegrationWhereUniqueInput
  }

  /**
   * SatuSehatIntegration deleteMany
   */
  export type SatuSehatIntegrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatIntegrations to delete
     */
    where?: SatuSehatIntegrationWhereInput
    /**
     * Limit how many SatuSehatIntegrations to delete.
     */
    limit?: number
  }

  /**
   * SatuSehatIntegration without action
   */
  export type SatuSehatIntegrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatIntegration
     */
    select?: SatuSehatIntegrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatIntegration
     */
    omit?: SatuSehatIntegrationOmit<ExtArgs> | null
  }


  /**
   * Model SatuSehatWebhookLog
   */

  export type AggregateSatuSehatWebhookLog = {
    _count: SatuSehatWebhookLogCountAggregateOutputType | null
    _min: SatuSehatWebhookLogMinAggregateOutputType | null
    _max: SatuSehatWebhookLogMaxAggregateOutputType | null
  }

  export type SatuSehatWebhookLogMinAggregateOutputType = {
    id: string | null
    studyInstanceUid: string | null
    patientName: string | null
    status: string | null
    message: string | null
    createdAt: Date | null
  }

  export type SatuSehatWebhookLogMaxAggregateOutputType = {
    id: string | null
    studyInstanceUid: string | null
    patientName: string | null
    status: string | null
    message: string | null
    createdAt: Date | null
  }

  export type SatuSehatWebhookLogCountAggregateOutputType = {
    id: number
    studyInstanceUid: number
    patientName: number
    status: number
    message: number
    errorDetail: number
    rawPayload: number
    createdAt: number
    _all: number
  }


  export type SatuSehatWebhookLogMinAggregateInputType = {
    id?: true
    studyInstanceUid?: true
    patientName?: true
    status?: true
    message?: true
    createdAt?: true
  }

  export type SatuSehatWebhookLogMaxAggregateInputType = {
    id?: true
    studyInstanceUid?: true
    patientName?: true
    status?: true
    message?: true
    createdAt?: true
  }

  export type SatuSehatWebhookLogCountAggregateInputType = {
    id?: true
    studyInstanceUid?: true
    patientName?: true
    status?: true
    message?: true
    errorDetail?: true
    rawPayload?: true
    createdAt?: true
    _all?: true
  }

  export type SatuSehatWebhookLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatWebhookLog to aggregate.
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatWebhookLogs to fetch.
     */
    orderBy?: SatuSehatWebhookLogOrderByWithRelationInput | SatuSehatWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SatuSehatWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SatuSehatWebhookLogs
    **/
    _count?: true | SatuSehatWebhookLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SatuSehatWebhookLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SatuSehatWebhookLogMaxAggregateInputType
  }

  export type GetSatuSehatWebhookLogAggregateType<T extends SatuSehatWebhookLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSatuSehatWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSatuSehatWebhookLog[P]>
      : GetScalarType<T[P], AggregateSatuSehatWebhookLog[P]>
  }




  export type SatuSehatWebhookLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SatuSehatWebhookLogWhereInput
    orderBy?: SatuSehatWebhookLogOrderByWithAggregationInput | SatuSehatWebhookLogOrderByWithAggregationInput[]
    by: SatuSehatWebhookLogScalarFieldEnum[] | SatuSehatWebhookLogScalarFieldEnum
    having?: SatuSehatWebhookLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SatuSehatWebhookLogCountAggregateInputType | true
    _min?: SatuSehatWebhookLogMinAggregateInputType
    _max?: SatuSehatWebhookLogMaxAggregateInputType
  }

  export type SatuSehatWebhookLogGroupByOutputType = {
    id: string
    studyInstanceUid: string | null
    patientName: string | null
    status: string
    message: string | null
    errorDetail: JsonValue | null
    rawPayload: JsonValue | null
    createdAt: Date
    _count: SatuSehatWebhookLogCountAggregateOutputType | null
    _min: SatuSehatWebhookLogMinAggregateOutputType | null
    _max: SatuSehatWebhookLogMaxAggregateOutputType | null
  }

  type GetSatuSehatWebhookLogGroupByPayload<T extends SatuSehatWebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SatuSehatWebhookLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SatuSehatWebhookLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SatuSehatWebhookLogGroupByOutputType[P]>
            : GetScalarType<T[P], SatuSehatWebhookLogGroupByOutputType[P]>
        }
      >
    >


  export type SatuSehatWebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studyInstanceUid?: boolean
    patientName?: boolean
    status?: boolean
    message?: boolean
    errorDetail?: boolean
    rawPayload?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatWebhookLog"]>

  export type SatuSehatWebhookLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studyInstanceUid?: boolean
    patientName?: boolean
    status?: boolean
    message?: boolean
    errorDetail?: boolean
    rawPayload?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatWebhookLog"]>

  export type SatuSehatWebhookLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studyInstanceUid?: boolean
    patientName?: boolean
    status?: boolean
    message?: boolean
    errorDetail?: boolean
    rawPayload?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatWebhookLog"]>

  export type SatuSehatWebhookLogSelectScalar = {
    id?: boolean
    studyInstanceUid?: boolean
    patientName?: boolean
    status?: boolean
    message?: boolean
    errorDetail?: boolean
    rawPayload?: boolean
    createdAt?: boolean
  }

  export type SatuSehatWebhookLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studyInstanceUid" | "patientName" | "status" | "message" | "errorDetail" | "rawPayload" | "createdAt", ExtArgs["result"]["satuSehatWebhookLog"]>

  export type $SatuSehatWebhookLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SatuSehatWebhookLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      studyInstanceUid: string | null
      patientName: string | null
      status: string
      message: string | null
      errorDetail: Prisma.JsonValue | null
      rawPayload: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["satuSehatWebhookLog"]>
    composites: {}
  }

  type SatuSehatWebhookLogGetPayload<S extends boolean | null | undefined | SatuSehatWebhookLogDefaultArgs> = $Result.GetResult<Prisma.$SatuSehatWebhookLogPayload, S>

  type SatuSehatWebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SatuSehatWebhookLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SatuSehatWebhookLogCountAggregateInputType | true
    }

  export interface SatuSehatWebhookLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SatuSehatWebhookLog'], meta: { name: 'SatuSehatWebhookLog' } }
    /**
     * Find zero or one SatuSehatWebhookLog that matches the filter.
     * @param {SatuSehatWebhookLogFindUniqueArgs} args - Arguments to find a SatuSehatWebhookLog
     * @example
     * // Get one SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SatuSehatWebhookLogFindUniqueArgs>(args: SelectSubset<T, SatuSehatWebhookLogFindUniqueArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SatuSehatWebhookLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SatuSehatWebhookLogFindUniqueOrThrowArgs} args - Arguments to find a SatuSehatWebhookLog
     * @example
     * // Get one SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SatuSehatWebhookLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SatuSehatWebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatWebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogFindFirstArgs} args - Arguments to find a SatuSehatWebhookLog
     * @example
     * // Get one SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SatuSehatWebhookLogFindFirstArgs>(args?: SelectSubset<T, SatuSehatWebhookLogFindFirstArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatWebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogFindFirstOrThrowArgs} args - Arguments to find a SatuSehatWebhookLog
     * @example
     * // Get one SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SatuSehatWebhookLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SatuSehatWebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SatuSehatWebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SatuSehatWebhookLogs
     * const satuSehatWebhookLogs = await prisma.satuSehatWebhookLog.findMany()
     * 
     * // Get first 10 SatuSehatWebhookLogs
     * const satuSehatWebhookLogs = await prisma.satuSehatWebhookLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const satuSehatWebhookLogWithIdOnly = await prisma.satuSehatWebhookLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SatuSehatWebhookLogFindManyArgs>(args?: SelectSubset<T, SatuSehatWebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SatuSehatWebhookLog.
     * @param {SatuSehatWebhookLogCreateArgs} args - Arguments to create a SatuSehatWebhookLog.
     * @example
     * // Create one SatuSehatWebhookLog
     * const SatuSehatWebhookLog = await prisma.satuSehatWebhookLog.create({
     *   data: {
     *     // ... data to create a SatuSehatWebhookLog
     *   }
     * })
     * 
     */
    create<T extends SatuSehatWebhookLogCreateArgs>(args: SelectSubset<T, SatuSehatWebhookLogCreateArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SatuSehatWebhookLogs.
     * @param {SatuSehatWebhookLogCreateManyArgs} args - Arguments to create many SatuSehatWebhookLogs.
     * @example
     * // Create many SatuSehatWebhookLogs
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SatuSehatWebhookLogCreateManyArgs>(args?: SelectSubset<T, SatuSehatWebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SatuSehatWebhookLogs and returns the data saved in the database.
     * @param {SatuSehatWebhookLogCreateManyAndReturnArgs} args - Arguments to create many SatuSehatWebhookLogs.
     * @example
     * // Create many SatuSehatWebhookLogs
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SatuSehatWebhookLogs and only return the `id`
     * const satuSehatWebhookLogWithIdOnly = await prisma.satuSehatWebhookLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SatuSehatWebhookLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SatuSehatWebhookLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SatuSehatWebhookLog.
     * @param {SatuSehatWebhookLogDeleteArgs} args - Arguments to delete one SatuSehatWebhookLog.
     * @example
     * // Delete one SatuSehatWebhookLog
     * const SatuSehatWebhookLog = await prisma.satuSehatWebhookLog.delete({
     *   where: {
     *     // ... filter to delete one SatuSehatWebhookLog
     *   }
     * })
     * 
     */
    delete<T extends SatuSehatWebhookLogDeleteArgs>(args: SelectSubset<T, SatuSehatWebhookLogDeleteArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SatuSehatWebhookLog.
     * @param {SatuSehatWebhookLogUpdateArgs} args - Arguments to update one SatuSehatWebhookLog.
     * @example
     * // Update one SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SatuSehatWebhookLogUpdateArgs>(args: SelectSubset<T, SatuSehatWebhookLogUpdateArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SatuSehatWebhookLogs.
     * @param {SatuSehatWebhookLogDeleteManyArgs} args - Arguments to filter SatuSehatWebhookLogs to delete.
     * @example
     * // Delete a few SatuSehatWebhookLogs
     * const { count } = await prisma.satuSehatWebhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SatuSehatWebhookLogDeleteManyArgs>(args?: SelectSubset<T, SatuSehatWebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatWebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SatuSehatWebhookLogs
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SatuSehatWebhookLogUpdateManyArgs>(args: SelectSubset<T, SatuSehatWebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatWebhookLogs and returns the data updated in the database.
     * @param {SatuSehatWebhookLogUpdateManyAndReturnArgs} args - Arguments to update many SatuSehatWebhookLogs.
     * @example
     * // Update many SatuSehatWebhookLogs
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SatuSehatWebhookLogs and only return the `id`
     * const satuSehatWebhookLogWithIdOnly = await prisma.satuSehatWebhookLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SatuSehatWebhookLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SatuSehatWebhookLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SatuSehatWebhookLog.
     * @param {SatuSehatWebhookLogUpsertArgs} args - Arguments to update or create a SatuSehatWebhookLog.
     * @example
     * // Update or create a SatuSehatWebhookLog
     * const satuSehatWebhookLog = await prisma.satuSehatWebhookLog.upsert({
     *   create: {
     *     // ... data to create a SatuSehatWebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SatuSehatWebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends SatuSehatWebhookLogUpsertArgs>(args: SelectSubset<T, SatuSehatWebhookLogUpsertArgs<ExtArgs>>): Prisma__SatuSehatWebhookLogClient<$Result.GetResult<Prisma.$SatuSehatWebhookLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SatuSehatWebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogCountArgs} args - Arguments to filter SatuSehatWebhookLogs to count.
     * @example
     * // Count the number of SatuSehatWebhookLogs
     * const count = await prisma.satuSehatWebhookLog.count({
     *   where: {
     *     // ... the filter for the SatuSehatWebhookLogs we want to count
     *   }
     * })
    **/
    count<T extends SatuSehatWebhookLogCountArgs>(
      args?: Subset<T, SatuSehatWebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SatuSehatWebhookLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SatuSehatWebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SatuSehatWebhookLogAggregateArgs>(args: Subset<T, SatuSehatWebhookLogAggregateArgs>): Prisma.PrismaPromise<GetSatuSehatWebhookLogAggregateType<T>>

    /**
     * Group by SatuSehatWebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatWebhookLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SatuSehatWebhookLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SatuSehatWebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: SatuSehatWebhookLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SatuSehatWebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSatuSehatWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SatuSehatWebhookLog model
   */
  readonly fields: SatuSehatWebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SatuSehatWebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SatuSehatWebhookLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SatuSehatWebhookLog model
   */
  interface SatuSehatWebhookLogFieldRefs {
    readonly id: FieldRef<"SatuSehatWebhookLog", 'String'>
    readonly studyInstanceUid: FieldRef<"SatuSehatWebhookLog", 'String'>
    readonly patientName: FieldRef<"SatuSehatWebhookLog", 'String'>
    readonly status: FieldRef<"SatuSehatWebhookLog", 'String'>
    readonly message: FieldRef<"SatuSehatWebhookLog", 'String'>
    readonly errorDetail: FieldRef<"SatuSehatWebhookLog", 'Json'>
    readonly rawPayload: FieldRef<"SatuSehatWebhookLog", 'Json'>
    readonly createdAt: FieldRef<"SatuSehatWebhookLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SatuSehatWebhookLog findUnique
   */
  export type SatuSehatWebhookLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatWebhookLog to fetch.
     */
    where: SatuSehatWebhookLogWhereUniqueInput
  }

  /**
   * SatuSehatWebhookLog findUniqueOrThrow
   */
  export type SatuSehatWebhookLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatWebhookLog to fetch.
     */
    where: SatuSehatWebhookLogWhereUniqueInput
  }

  /**
   * SatuSehatWebhookLog findFirst
   */
  export type SatuSehatWebhookLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatWebhookLog to fetch.
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatWebhookLogs to fetch.
     */
    orderBy?: SatuSehatWebhookLogOrderByWithRelationInput | SatuSehatWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatWebhookLogs.
     */
    cursor?: SatuSehatWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatWebhookLogs.
     */
    distinct?: SatuSehatWebhookLogScalarFieldEnum | SatuSehatWebhookLogScalarFieldEnum[]
  }

  /**
   * SatuSehatWebhookLog findFirstOrThrow
   */
  export type SatuSehatWebhookLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatWebhookLog to fetch.
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatWebhookLogs to fetch.
     */
    orderBy?: SatuSehatWebhookLogOrderByWithRelationInput | SatuSehatWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatWebhookLogs.
     */
    cursor?: SatuSehatWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatWebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatWebhookLogs.
     */
    distinct?: SatuSehatWebhookLogScalarFieldEnum | SatuSehatWebhookLogScalarFieldEnum[]
  }

  /**
   * SatuSehatWebhookLog findMany
   */
  export type SatuSehatWebhookLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatWebhookLogs to fetch.
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatWebhookLogs to fetch.
     */
    orderBy?: SatuSehatWebhookLogOrderByWithRelationInput | SatuSehatWebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SatuSehatWebhookLogs.
     */
    cursor?: SatuSehatWebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatWebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatWebhookLogs.
     */
    skip?: number
    distinct?: SatuSehatWebhookLogScalarFieldEnum | SatuSehatWebhookLogScalarFieldEnum[]
  }

  /**
   * SatuSehatWebhookLog create
   */
  export type SatuSehatWebhookLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SatuSehatWebhookLog.
     */
    data: XOR<SatuSehatWebhookLogCreateInput, SatuSehatWebhookLogUncheckedCreateInput>
  }

  /**
   * SatuSehatWebhookLog createMany
   */
  export type SatuSehatWebhookLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SatuSehatWebhookLogs.
     */
    data: SatuSehatWebhookLogCreateManyInput | SatuSehatWebhookLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatWebhookLog createManyAndReturn
   */
  export type SatuSehatWebhookLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * The data used to create many SatuSehatWebhookLogs.
     */
    data: SatuSehatWebhookLogCreateManyInput | SatuSehatWebhookLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatWebhookLog update
   */
  export type SatuSehatWebhookLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SatuSehatWebhookLog.
     */
    data: XOR<SatuSehatWebhookLogUpdateInput, SatuSehatWebhookLogUncheckedUpdateInput>
    /**
     * Choose, which SatuSehatWebhookLog to update.
     */
    where: SatuSehatWebhookLogWhereUniqueInput
  }

  /**
   * SatuSehatWebhookLog updateMany
   */
  export type SatuSehatWebhookLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SatuSehatWebhookLogs.
     */
    data: XOR<SatuSehatWebhookLogUpdateManyMutationInput, SatuSehatWebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatWebhookLogs to update
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * Limit how many SatuSehatWebhookLogs to update.
     */
    limit?: number
  }

  /**
   * SatuSehatWebhookLog updateManyAndReturn
   */
  export type SatuSehatWebhookLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * The data used to update SatuSehatWebhookLogs.
     */
    data: XOR<SatuSehatWebhookLogUpdateManyMutationInput, SatuSehatWebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatWebhookLogs to update
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * Limit how many SatuSehatWebhookLogs to update.
     */
    limit?: number
  }

  /**
   * SatuSehatWebhookLog upsert
   */
  export type SatuSehatWebhookLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SatuSehatWebhookLog to update in case it exists.
     */
    where: SatuSehatWebhookLogWhereUniqueInput
    /**
     * In case the SatuSehatWebhookLog found by the `where` argument doesn't exist, create a new SatuSehatWebhookLog with this data.
     */
    create: XOR<SatuSehatWebhookLogCreateInput, SatuSehatWebhookLogUncheckedCreateInput>
    /**
     * In case the SatuSehatWebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SatuSehatWebhookLogUpdateInput, SatuSehatWebhookLogUncheckedUpdateInput>
  }

  /**
   * SatuSehatWebhookLog delete
   */
  export type SatuSehatWebhookLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
    /**
     * Filter which SatuSehatWebhookLog to delete.
     */
    where: SatuSehatWebhookLogWhereUniqueInput
  }

  /**
   * SatuSehatWebhookLog deleteMany
   */
  export type SatuSehatWebhookLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatWebhookLogs to delete
     */
    where?: SatuSehatWebhookLogWhereInput
    /**
     * Limit how many SatuSehatWebhookLogs to delete.
     */
    limit?: number
  }

  /**
   * SatuSehatWebhookLog without action
   */
  export type SatuSehatWebhookLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatWebhookLog
     */
    select?: SatuSehatWebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatWebhookLog
     */
    omit?: SatuSehatWebhookLogOmit<ExtArgs> | null
  }


  /**
   * Model SatuSehatSetting
   */

  export type AggregateSatuSehatSetting = {
    _count: SatuSehatSettingCountAggregateOutputType | null
    _avg: SatuSehatSettingAvgAggregateOutputType | null
    _sum: SatuSehatSettingSumAggregateOutputType | null
    _min: SatuSehatSettingMinAggregateOutputType | null
    _max: SatuSehatSettingMaxAggregateOutputType | null
  }

  export type SatuSehatSettingAvgAggregateOutputType = {
    id: number | null
  }

  export type SatuSehatSettingSumAggregateOutputType = {
    id: number | null
  }

  export type SatuSehatSettingMinAggregateOutputType = {
    id: number | null
    environment: string | null
    stgOrganizationId: string | null
    stgClientId: string | null
    stgClientSecret: string | null
    stgAuthUrl: string | null
    stgBaseUrl: string | null
    prdOrganizationId: string | null
    prdClientId: string | null
    prdClientSecret: string | null
    prdAuthUrl: string | null
    prdBaseUrl: string | null
    organizationId: string | null
    clientId: string | null
    clientSecret: string | null
    authUrl: string | null
    baseUrl: string | null
    encounterUrl: string | null
    conditionUrl: string | null
    serviceRequestUrl: string | null
    imagingStudyUrl: string | null
    observationUrl: string | null
    diagnosticReportUrl: string | null
    compositionUrl: string | null
    patientUrl: string | null
    locationUrl: string | null
    practitionerUrl: string | null
    defaultPatientId: string | null
    defaultPractitionerId: string | null
    patientIdSource: string | null
    isActive: boolean | null
    updatedAt: Date | null
    autoSyncEnabled: boolean | null
    autoSyncFrequency: string | null
    autoSyncTime: string | null
    lastAutoSyncAt: Date | null
    sendImageStudyFromWeb: boolean | null
  }

  export type SatuSehatSettingMaxAggregateOutputType = {
    id: number | null
    environment: string | null
    stgOrganizationId: string | null
    stgClientId: string | null
    stgClientSecret: string | null
    stgAuthUrl: string | null
    stgBaseUrl: string | null
    prdOrganizationId: string | null
    prdClientId: string | null
    prdClientSecret: string | null
    prdAuthUrl: string | null
    prdBaseUrl: string | null
    organizationId: string | null
    clientId: string | null
    clientSecret: string | null
    authUrl: string | null
    baseUrl: string | null
    encounterUrl: string | null
    conditionUrl: string | null
    serviceRequestUrl: string | null
    imagingStudyUrl: string | null
    observationUrl: string | null
    diagnosticReportUrl: string | null
    compositionUrl: string | null
    patientUrl: string | null
    locationUrl: string | null
    practitionerUrl: string | null
    defaultPatientId: string | null
    defaultPractitionerId: string | null
    patientIdSource: string | null
    isActive: boolean | null
    updatedAt: Date | null
    autoSyncEnabled: boolean | null
    autoSyncFrequency: string | null
    autoSyncTime: string | null
    lastAutoSyncAt: Date | null
    sendImageStudyFromWeb: boolean | null
  }

  export type SatuSehatSettingCountAggregateOutputType = {
    id: number
    environment: number
    stgOrganizationId: number
    stgClientId: number
    stgClientSecret: number
    stgAuthUrl: number
    stgBaseUrl: number
    prdOrganizationId: number
    prdClientId: number
    prdClientSecret: number
    prdAuthUrl: number
    prdBaseUrl: number
    organizationId: number
    clientId: number
    clientSecret: number
    authUrl: number
    baseUrl: number
    encounterUrl: number
    conditionUrl: number
    serviceRequestUrl: number
    imagingStudyUrl: number
    observationUrl: number
    diagnosticReportUrl: number
    compositionUrl: number
    patientUrl: number
    locationUrl: number
    practitionerUrl: number
    defaultPatientId: number
    defaultPractitionerId: number
    patientIdSource: number
    isActive: number
    updatedAt: number
    autoSyncEnabled: number
    autoSyncFrequency: number
    autoSyncTime: number
    lastAutoSyncAt: number
    sendImageStudyFromWeb: number
    _all: number
  }


  export type SatuSehatSettingAvgAggregateInputType = {
    id?: true
  }

  export type SatuSehatSettingSumAggregateInputType = {
    id?: true
  }

  export type SatuSehatSettingMinAggregateInputType = {
    id?: true
    environment?: true
    stgOrganizationId?: true
    stgClientId?: true
    stgClientSecret?: true
    stgAuthUrl?: true
    stgBaseUrl?: true
    prdOrganizationId?: true
    prdClientId?: true
    prdClientSecret?: true
    prdAuthUrl?: true
    prdBaseUrl?: true
    organizationId?: true
    clientId?: true
    clientSecret?: true
    authUrl?: true
    baseUrl?: true
    encounterUrl?: true
    conditionUrl?: true
    serviceRequestUrl?: true
    imagingStudyUrl?: true
    observationUrl?: true
    diagnosticReportUrl?: true
    compositionUrl?: true
    patientUrl?: true
    locationUrl?: true
    practitionerUrl?: true
    defaultPatientId?: true
    defaultPractitionerId?: true
    patientIdSource?: true
    isActive?: true
    updatedAt?: true
    autoSyncEnabled?: true
    autoSyncFrequency?: true
    autoSyncTime?: true
    lastAutoSyncAt?: true
    sendImageStudyFromWeb?: true
  }

  export type SatuSehatSettingMaxAggregateInputType = {
    id?: true
    environment?: true
    stgOrganizationId?: true
    stgClientId?: true
    stgClientSecret?: true
    stgAuthUrl?: true
    stgBaseUrl?: true
    prdOrganizationId?: true
    prdClientId?: true
    prdClientSecret?: true
    prdAuthUrl?: true
    prdBaseUrl?: true
    organizationId?: true
    clientId?: true
    clientSecret?: true
    authUrl?: true
    baseUrl?: true
    encounterUrl?: true
    conditionUrl?: true
    serviceRequestUrl?: true
    imagingStudyUrl?: true
    observationUrl?: true
    diagnosticReportUrl?: true
    compositionUrl?: true
    patientUrl?: true
    locationUrl?: true
    practitionerUrl?: true
    defaultPatientId?: true
    defaultPractitionerId?: true
    patientIdSource?: true
    isActive?: true
    updatedAt?: true
    autoSyncEnabled?: true
    autoSyncFrequency?: true
    autoSyncTime?: true
    lastAutoSyncAt?: true
    sendImageStudyFromWeb?: true
  }

  export type SatuSehatSettingCountAggregateInputType = {
    id?: true
    environment?: true
    stgOrganizationId?: true
    stgClientId?: true
    stgClientSecret?: true
    stgAuthUrl?: true
    stgBaseUrl?: true
    prdOrganizationId?: true
    prdClientId?: true
    prdClientSecret?: true
    prdAuthUrl?: true
    prdBaseUrl?: true
    organizationId?: true
    clientId?: true
    clientSecret?: true
    authUrl?: true
    baseUrl?: true
    encounterUrl?: true
    conditionUrl?: true
    serviceRequestUrl?: true
    imagingStudyUrl?: true
    observationUrl?: true
    diagnosticReportUrl?: true
    compositionUrl?: true
    patientUrl?: true
    locationUrl?: true
    practitionerUrl?: true
    defaultPatientId?: true
    defaultPractitionerId?: true
    patientIdSource?: true
    isActive?: true
    updatedAt?: true
    autoSyncEnabled?: true
    autoSyncFrequency?: true
    autoSyncTime?: true
    lastAutoSyncAt?: true
    sendImageStudyFromWeb?: true
    _all?: true
  }

  export type SatuSehatSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatSetting to aggregate.
     */
    where?: SatuSehatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatSettings to fetch.
     */
    orderBy?: SatuSehatSettingOrderByWithRelationInput | SatuSehatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SatuSehatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SatuSehatSettings
    **/
    _count?: true | SatuSehatSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SatuSehatSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SatuSehatSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SatuSehatSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SatuSehatSettingMaxAggregateInputType
  }

  export type GetSatuSehatSettingAggregateType<T extends SatuSehatSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSatuSehatSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSatuSehatSetting[P]>
      : GetScalarType<T[P], AggregateSatuSehatSetting[P]>
  }




  export type SatuSehatSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SatuSehatSettingWhereInput
    orderBy?: SatuSehatSettingOrderByWithAggregationInput | SatuSehatSettingOrderByWithAggregationInput[]
    by: SatuSehatSettingScalarFieldEnum[] | SatuSehatSettingScalarFieldEnum
    having?: SatuSehatSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SatuSehatSettingCountAggregateInputType | true
    _avg?: SatuSehatSettingAvgAggregateInputType
    _sum?: SatuSehatSettingSumAggregateInputType
    _min?: SatuSehatSettingMinAggregateInputType
    _max?: SatuSehatSettingMaxAggregateInputType
  }

  export type SatuSehatSettingGroupByOutputType = {
    id: number
    environment: string
    stgOrganizationId: string
    stgClientId: string
    stgClientSecret: string
    stgAuthUrl: string
    stgBaseUrl: string
    prdOrganizationId: string
    prdClientId: string
    prdClientSecret: string
    prdAuthUrl: string
    prdBaseUrl: string
    organizationId: string
    clientId: string
    clientSecret: string
    authUrl: string
    baseUrl: string
    encounterUrl: string | null
    conditionUrl: string | null
    serviceRequestUrl: string | null
    imagingStudyUrl: string | null
    observationUrl: string | null
    diagnosticReportUrl: string | null
    compositionUrl: string | null
    patientUrl: string | null
    locationUrl: string | null
    practitionerUrl: string | null
    defaultPatientId: string | null
    defaultPractitionerId: string | null
    patientIdSource: string | null
    isActive: boolean
    updatedAt: Date
    autoSyncEnabled: boolean
    autoSyncFrequency: string
    autoSyncTime: string
    lastAutoSyncAt: Date | null
    sendImageStudyFromWeb: boolean
    _count: SatuSehatSettingCountAggregateOutputType | null
    _avg: SatuSehatSettingAvgAggregateOutputType | null
    _sum: SatuSehatSettingSumAggregateOutputType | null
    _min: SatuSehatSettingMinAggregateOutputType | null
    _max: SatuSehatSettingMaxAggregateOutputType | null
  }

  type GetSatuSehatSettingGroupByPayload<T extends SatuSehatSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SatuSehatSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SatuSehatSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SatuSehatSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SatuSehatSettingGroupByOutputType[P]>
        }
      >
    >


  export type SatuSehatSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    stgOrganizationId?: boolean
    stgClientId?: boolean
    stgClientSecret?: boolean
    stgAuthUrl?: boolean
    stgBaseUrl?: boolean
    prdOrganizationId?: boolean
    prdClientId?: boolean
    prdClientSecret?: boolean
    prdAuthUrl?: boolean
    prdBaseUrl?: boolean
    organizationId?: boolean
    clientId?: boolean
    clientSecret?: boolean
    authUrl?: boolean
    baseUrl?: boolean
    encounterUrl?: boolean
    conditionUrl?: boolean
    serviceRequestUrl?: boolean
    imagingStudyUrl?: boolean
    observationUrl?: boolean
    diagnosticReportUrl?: boolean
    compositionUrl?: boolean
    patientUrl?: boolean
    locationUrl?: boolean
    practitionerUrl?: boolean
    defaultPatientId?: boolean
    defaultPractitionerId?: boolean
    patientIdSource?: boolean
    isActive?: boolean
    updatedAt?: boolean
    autoSyncEnabled?: boolean
    autoSyncFrequency?: boolean
    autoSyncTime?: boolean
    lastAutoSyncAt?: boolean
    sendImageStudyFromWeb?: boolean
  }, ExtArgs["result"]["satuSehatSetting"]>

  export type SatuSehatSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    stgOrganizationId?: boolean
    stgClientId?: boolean
    stgClientSecret?: boolean
    stgAuthUrl?: boolean
    stgBaseUrl?: boolean
    prdOrganizationId?: boolean
    prdClientId?: boolean
    prdClientSecret?: boolean
    prdAuthUrl?: boolean
    prdBaseUrl?: boolean
    organizationId?: boolean
    clientId?: boolean
    clientSecret?: boolean
    authUrl?: boolean
    baseUrl?: boolean
    encounterUrl?: boolean
    conditionUrl?: boolean
    serviceRequestUrl?: boolean
    imagingStudyUrl?: boolean
    observationUrl?: boolean
    diagnosticReportUrl?: boolean
    compositionUrl?: boolean
    patientUrl?: boolean
    locationUrl?: boolean
    practitionerUrl?: boolean
    defaultPatientId?: boolean
    defaultPractitionerId?: boolean
    patientIdSource?: boolean
    isActive?: boolean
    updatedAt?: boolean
    autoSyncEnabled?: boolean
    autoSyncFrequency?: boolean
    autoSyncTime?: boolean
    lastAutoSyncAt?: boolean
    sendImageStudyFromWeb?: boolean
  }, ExtArgs["result"]["satuSehatSetting"]>

  export type SatuSehatSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    environment?: boolean
    stgOrganizationId?: boolean
    stgClientId?: boolean
    stgClientSecret?: boolean
    stgAuthUrl?: boolean
    stgBaseUrl?: boolean
    prdOrganizationId?: boolean
    prdClientId?: boolean
    prdClientSecret?: boolean
    prdAuthUrl?: boolean
    prdBaseUrl?: boolean
    organizationId?: boolean
    clientId?: boolean
    clientSecret?: boolean
    authUrl?: boolean
    baseUrl?: boolean
    encounterUrl?: boolean
    conditionUrl?: boolean
    serviceRequestUrl?: boolean
    imagingStudyUrl?: boolean
    observationUrl?: boolean
    diagnosticReportUrl?: boolean
    compositionUrl?: boolean
    patientUrl?: boolean
    locationUrl?: boolean
    practitionerUrl?: boolean
    defaultPatientId?: boolean
    defaultPractitionerId?: boolean
    patientIdSource?: boolean
    isActive?: boolean
    updatedAt?: boolean
    autoSyncEnabled?: boolean
    autoSyncFrequency?: boolean
    autoSyncTime?: boolean
    lastAutoSyncAt?: boolean
    sendImageStudyFromWeb?: boolean
  }, ExtArgs["result"]["satuSehatSetting"]>

  export type SatuSehatSettingSelectScalar = {
    id?: boolean
    environment?: boolean
    stgOrganizationId?: boolean
    stgClientId?: boolean
    stgClientSecret?: boolean
    stgAuthUrl?: boolean
    stgBaseUrl?: boolean
    prdOrganizationId?: boolean
    prdClientId?: boolean
    prdClientSecret?: boolean
    prdAuthUrl?: boolean
    prdBaseUrl?: boolean
    organizationId?: boolean
    clientId?: boolean
    clientSecret?: boolean
    authUrl?: boolean
    baseUrl?: boolean
    encounterUrl?: boolean
    conditionUrl?: boolean
    serviceRequestUrl?: boolean
    imagingStudyUrl?: boolean
    observationUrl?: boolean
    diagnosticReportUrl?: boolean
    compositionUrl?: boolean
    patientUrl?: boolean
    locationUrl?: boolean
    practitionerUrl?: boolean
    defaultPatientId?: boolean
    defaultPractitionerId?: boolean
    patientIdSource?: boolean
    isActive?: boolean
    updatedAt?: boolean
    autoSyncEnabled?: boolean
    autoSyncFrequency?: boolean
    autoSyncTime?: boolean
    lastAutoSyncAt?: boolean
    sendImageStudyFromWeb?: boolean
  }

  export type SatuSehatSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "environment" | "stgOrganizationId" | "stgClientId" | "stgClientSecret" | "stgAuthUrl" | "stgBaseUrl" | "prdOrganizationId" | "prdClientId" | "prdClientSecret" | "prdAuthUrl" | "prdBaseUrl" | "organizationId" | "clientId" | "clientSecret" | "authUrl" | "baseUrl" | "encounterUrl" | "conditionUrl" | "serviceRequestUrl" | "imagingStudyUrl" | "observationUrl" | "diagnosticReportUrl" | "compositionUrl" | "patientUrl" | "locationUrl" | "practitionerUrl" | "defaultPatientId" | "defaultPractitionerId" | "patientIdSource" | "isActive" | "updatedAt" | "autoSyncEnabled" | "autoSyncFrequency" | "autoSyncTime" | "lastAutoSyncAt" | "sendImageStudyFromWeb", ExtArgs["result"]["satuSehatSetting"]>

  export type $SatuSehatSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SatuSehatSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      environment: string
      stgOrganizationId: string
      stgClientId: string
      stgClientSecret: string
      stgAuthUrl: string
      stgBaseUrl: string
      prdOrganizationId: string
      prdClientId: string
      prdClientSecret: string
      prdAuthUrl: string
      prdBaseUrl: string
      organizationId: string
      clientId: string
      clientSecret: string
      authUrl: string
      baseUrl: string
      encounterUrl: string | null
      conditionUrl: string | null
      serviceRequestUrl: string | null
      imagingStudyUrl: string | null
      observationUrl: string | null
      diagnosticReportUrl: string | null
      compositionUrl: string | null
      patientUrl: string | null
      locationUrl: string | null
      practitionerUrl: string | null
      defaultPatientId: string | null
      defaultPractitionerId: string | null
      patientIdSource: string | null
      isActive: boolean
      updatedAt: Date
      autoSyncEnabled: boolean
      autoSyncFrequency: string
      autoSyncTime: string
      lastAutoSyncAt: Date | null
      sendImageStudyFromWeb: boolean
    }, ExtArgs["result"]["satuSehatSetting"]>
    composites: {}
  }

  type SatuSehatSettingGetPayload<S extends boolean | null | undefined | SatuSehatSettingDefaultArgs> = $Result.GetResult<Prisma.$SatuSehatSettingPayload, S>

  type SatuSehatSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SatuSehatSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SatuSehatSettingCountAggregateInputType | true
    }

  export interface SatuSehatSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SatuSehatSetting'], meta: { name: 'SatuSehatSetting' } }
    /**
     * Find zero or one SatuSehatSetting that matches the filter.
     * @param {SatuSehatSettingFindUniqueArgs} args - Arguments to find a SatuSehatSetting
     * @example
     * // Get one SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SatuSehatSettingFindUniqueArgs>(args: SelectSubset<T, SatuSehatSettingFindUniqueArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SatuSehatSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SatuSehatSettingFindUniqueOrThrowArgs} args - Arguments to find a SatuSehatSetting
     * @example
     * // Get one SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SatuSehatSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SatuSehatSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingFindFirstArgs} args - Arguments to find a SatuSehatSetting
     * @example
     * // Get one SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SatuSehatSettingFindFirstArgs>(args?: SelectSubset<T, SatuSehatSettingFindFirstArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingFindFirstOrThrowArgs} args - Arguments to find a SatuSehatSetting
     * @example
     * // Get one SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SatuSehatSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SatuSehatSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SatuSehatSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SatuSehatSettings
     * const satuSehatSettings = await prisma.satuSehatSetting.findMany()
     * 
     * // Get first 10 SatuSehatSettings
     * const satuSehatSettings = await prisma.satuSehatSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const satuSehatSettingWithIdOnly = await prisma.satuSehatSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SatuSehatSettingFindManyArgs>(args?: SelectSubset<T, SatuSehatSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SatuSehatSetting.
     * @param {SatuSehatSettingCreateArgs} args - Arguments to create a SatuSehatSetting.
     * @example
     * // Create one SatuSehatSetting
     * const SatuSehatSetting = await prisma.satuSehatSetting.create({
     *   data: {
     *     // ... data to create a SatuSehatSetting
     *   }
     * })
     * 
     */
    create<T extends SatuSehatSettingCreateArgs>(args: SelectSubset<T, SatuSehatSettingCreateArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SatuSehatSettings.
     * @param {SatuSehatSettingCreateManyArgs} args - Arguments to create many SatuSehatSettings.
     * @example
     * // Create many SatuSehatSettings
     * const satuSehatSetting = await prisma.satuSehatSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SatuSehatSettingCreateManyArgs>(args?: SelectSubset<T, SatuSehatSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SatuSehatSettings and returns the data saved in the database.
     * @param {SatuSehatSettingCreateManyAndReturnArgs} args - Arguments to create many SatuSehatSettings.
     * @example
     * // Create many SatuSehatSettings
     * const satuSehatSetting = await prisma.satuSehatSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SatuSehatSettings and only return the `id`
     * const satuSehatSettingWithIdOnly = await prisma.satuSehatSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SatuSehatSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SatuSehatSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SatuSehatSetting.
     * @param {SatuSehatSettingDeleteArgs} args - Arguments to delete one SatuSehatSetting.
     * @example
     * // Delete one SatuSehatSetting
     * const SatuSehatSetting = await prisma.satuSehatSetting.delete({
     *   where: {
     *     // ... filter to delete one SatuSehatSetting
     *   }
     * })
     * 
     */
    delete<T extends SatuSehatSettingDeleteArgs>(args: SelectSubset<T, SatuSehatSettingDeleteArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SatuSehatSetting.
     * @param {SatuSehatSettingUpdateArgs} args - Arguments to update one SatuSehatSetting.
     * @example
     * // Update one SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SatuSehatSettingUpdateArgs>(args: SelectSubset<T, SatuSehatSettingUpdateArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SatuSehatSettings.
     * @param {SatuSehatSettingDeleteManyArgs} args - Arguments to filter SatuSehatSettings to delete.
     * @example
     * // Delete a few SatuSehatSettings
     * const { count } = await prisma.satuSehatSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SatuSehatSettingDeleteManyArgs>(args?: SelectSubset<T, SatuSehatSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SatuSehatSettings
     * const satuSehatSetting = await prisma.satuSehatSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SatuSehatSettingUpdateManyArgs>(args: SelectSubset<T, SatuSehatSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatSettings and returns the data updated in the database.
     * @param {SatuSehatSettingUpdateManyAndReturnArgs} args - Arguments to update many SatuSehatSettings.
     * @example
     * // Update many SatuSehatSettings
     * const satuSehatSetting = await prisma.satuSehatSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SatuSehatSettings and only return the `id`
     * const satuSehatSettingWithIdOnly = await prisma.satuSehatSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SatuSehatSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SatuSehatSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SatuSehatSetting.
     * @param {SatuSehatSettingUpsertArgs} args - Arguments to update or create a SatuSehatSetting.
     * @example
     * // Update or create a SatuSehatSetting
     * const satuSehatSetting = await prisma.satuSehatSetting.upsert({
     *   create: {
     *     // ... data to create a SatuSehatSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SatuSehatSetting we want to update
     *   }
     * })
     */
    upsert<T extends SatuSehatSettingUpsertArgs>(args: SelectSubset<T, SatuSehatSettingUpsertArgs<ExtArgs>>): Prisma__SatuSehatSettingClient<$Result.GetResult<Prisma.$SatuSehatSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SatuSehatSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingCountArgs} args - Arguments to filter SatuSehatSettings to count.
     * @example
     * // Count the number of SatuSehatSettings
     * const count = await prisma.satuSehatSetting.count({
     *   where: {
     *     // ... the filter for the SatuSehatSettings we want to count
     *   }
     * })
    **/
    count<T extends SatuSehatSettingCountArgs>(
      args?: Subset<T, SatuSehatSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SatuSehatSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SatuSehatSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SatuSehatSettingAggregateArgs>(args: Subset<T, SatuSehatSettingAggregateArgs>): Prisma.PrismaPromise<GetSatuSehatSettingAggregateType<T>>

    /**
     * Group by SatuSehatSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SatuSehatSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SatuSehatSettingGroupByArgs['orderBy'] }
        : { orderBy?: SatuSehatSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SatuSehatSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSatuSehatSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SatuSehatSetting model
   */
  readonly fields: SatuSehatSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SatuSehatSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SatuSehatSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SatuSehatSetting model
   */
  interface SatuSehatSettingFieldRefs {
    readonly id: FieldRef<"SatuSehatSetting", 'Int'>
    readonly environment: FieldRef<"SatuSehatSetting", 'String'>
    readonly stgOrganizationId: FieldRef<"SatuSehatSetting", 'String'>
    readonly stgClientId: FieldRef<"SatuSehatSetting", 'String'>
    readonly stgClientSecret: FieldRef<"SatuSehatSetting", 'String'>
    readonly stgAuthUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly stgBaseUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly prdOrganizationId: FieldRef<"SatuSehatSetting", 'String'>
    readonly prdClientId: FieldRef<"SatuSehatSetting", 'String'>
    readonly prdClientSecret: FieldRef<"SatuSehatSetting", 'String'>
    readonly prdAuthUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly prdBaseUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly organizationId: FieldRef<"SatuSehatSetting", 'String'>
    readonly clientId: FieldRef<"SatuSehatSetting", 'String'>
    readonly clientSecret: FieldRef<"SatuSehatSetting", 'String'>
    readonly authUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly baseUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly encounterUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly conditionUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly serviceRequestUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly imagingStudyUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly observationUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly diagnosticReportUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly compositionUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly patientUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly locationUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly practitionerUrl: FieldRef<"SatuSehatSetting", 'String'>
    readonly defaultPatientId: FieldRef<"SatuSehatSetting", 'String'>
    readonly defaultPractitionerId: FieldRef<"SatuSehatSetting", 'String'>
    readonly patientIdSource: FieldRef<"SatuSehatSetting", 'String'>
    readonly isActive: FieldRef<"SatuSehatSetting", 'Boolean'>
    readonly updatedAt: FieldRef<"SatuSehatSetting", 'DateTime'>
    readonly autoSyncEnabled: FieldRef<"SatuSehatSetting", 'Boolean'>
    readonly autoSyncFrequency: FieldRef<"SatuSehatSetting", 'String'>
    readonly autoSyncTime: FieldRef<"SatuSehatSetting", 'String'>
    readonly lastAutoSyncAt: FieldRef<"SatuSehatSetting", 'DateTime'>
    readonly sendImageStudyFromWeb: FieldRef<"SatuSehatSetting", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * SatuSehatSetting findUnique
   */
  export type SatuSehatSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatSetting to fetch.
     */
    where: SatuSehatSettingWhereUniqueInput
  }

  /**
   * SatuSehatSetting findUniqueOrThrow
   */
  export type SatuSehatSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatSetting to fetch.
     */
    where: SatuSehatSettingWhereUniqueInput
  }

  /**
   * SatuSehatSetting findFirst
   */
  export type SatuSehatSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatSetting to fetch.
     */
    where?: SatuSehatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatSettings to fetch.
     */
    orderBy?: SatuSehatSettingOrderByWithRelationInput | SatuSehatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatSettings.
     */
    cursor?: SatuSehatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatSettings.
     */
    distinct?: SatuSehatSettingScalarFieldEnum | SatuSehatSettingScalarFieldEnum[]
  }

  /**
   * SatuSehatSetting findFirstOrThrow
   */
  export type SatuSehatSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatSetting to fetch.
     */
    where?: SatuSehatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatSettings to fetch.
     */
    orderBy?: SatuSehatSettingOrderByWithRelationInput | SatuSehatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatSettings.
     */
    cursor?: SatuSehatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatSettings.
     */
    distinct?: SatuSehatSettingScalarFieldEnum | SatuSehatSettingScalarFieldEnum[]
  }

  /**
   * SatuSehatSetting findMany
   */
  export type SatuSehatSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatSettings to fetch.
     */
    where?: SatuSehatSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatSettings to fetch.
     */
    orderBy?: SatuSehatSettingOrderByWithRelationInput | SatuSehatSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SatuSehatSettings.
     */
    cursor?: SatuSehatSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatSettings.
     */
    skip?: number
    distinct?: SatuSehatSettingScalarFieldEnum | SatuSehatSettingScalarFieldEnum[]
  }

  /**
   * SatuSehatSetting create
   */
  export type SatuSehatSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SatuSehatSetting.
     */
    data: XOR<SatuSehatSettingCreateInput, SatuSehatSettingUncheckedCreateInput>
  }

  /**
   * SatuSehatSetting createMany
   */
  export type SatuSehatSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SatuSehatSettings.
     */
    data: SatuSehatSettingCreateManyInput | SatuSehatSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatSetting createManyAndReturn
   */
  export type SatuSehatSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SatuSehatSettings.
     */
    data: SatuSehatSettingCreateManyInput | SatuSehatSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatSetting update
   */
  export type SatuSehatSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SatuSehatSetting.
     */
    data: XOR<SatuSehatSettingUpdateInput, SatuSehatSettingUncheckedUpdateInput>
    /**
     * Choose, which SatuSehatSetting to update.
     */
    where: SatuSehatSettingWhereUniqueInput
  }

  /**
   * SatuSehatSetting updateMany
   */
  export type SatuSehatSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SatuSehatSettings.
     */
    data: XOR<SatuSehatSettingUpdateManyMutationInput, SatuSehatSettingUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatSettings to update
     */
    where?: SatuSehatSettingWhereInput
    /**
     * Limit how many SatuSehatSettings to update.
     */
    limit?: number
  }

  /**
   * SatuSehatSetting updateManyAndReturn
   */
  export type SatuSehatSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * The data used to update SatuSehatSettings.
     */
    data: XOR<SatuSehatSettingUpdateManyMutationInput, SatuSehatSettingUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatSettings to update
     */
    where?: SatuSehatSettingWhereInput
    /**
     * Limit how many SatuSehatSettings to update.
     */
    limit?: number
  }

  /**
   * SatuSehatSetting upsert
   */
  export type SatuSehatSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SatuSehatSetting to update in case it exists.
     */
    where: SatuSehatSettingWhereUniqueInput
    /**
     * In case the SatuSehatSetting found by the `where` argument doesn't exist, create a new SatuSehatSetting with this data.
     */
    create: XOR<SatuSehatSettingCreateInput, SatuSehatSettingUncheckedCreateInput>
    /**
     * In case the SatuSehatSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SatuSehatSettingUpdateInput, SatuSehatSettingUncheckedUpdateInput>
  }

  /**
   * SatuSehatSetting delete
   */
  export type SatuSehatSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
    /**
     * Filter which SatuSehatSetting to delete.
     */
    where: SatuSehatSettingWhereUniqueInput
  }

  /**
   * SatuSehatSetting deleteMany
   */
  export type SatuSehatSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatSettings to delete
     */
    where?: SatuSehatSettingWhereInput
    /**
     * Limit how many SatuSehatSettings to delete.
     */
    limit?: number
  }

  /**
   * SatuSehatSetting without action
   */
  export type SatuSehatSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatSetting
     */
    select?: SatuSehatSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatSetting
     */
    omit?: SatuSehatSettingOmit<ExtArgs> | null
  }


  /**
   * Model SatuSehatResourceLog
   */

  export type AggregateSatuSehatResourceLog = {
    _count: SatuSehatResourceLogCountAggregateOutputType | null
    _avg: SatuSehatResourceLogAvgAggregateOutputType | null
    _sum: SatuSehatResourceLogSumAggregateOutputType | null
    _min: SatuSehatResourceLogMinAggregateOutputType | null
    _max: SatuSehatResourceLogMaxAggregateOutputType | null
  }

  export type SatuSehatResourceLogAvgAggregateOutputType = {
    responseCode: number | null
  }

  export type SatuSehatResourceLogSumAggregateOutputType = {
    responseCode: number | null
  }

  export type SatuSehatResourceLogMinAggregateOutputType = {
    id: string | null
    resourceType: string | null
    resourceId: string | null
    accessionNumber: string | null
    studyInstanceUid: string | null
    method: string | null
    status: string | null
    responseCode: number | null
    environment: string | null
    createdAt: Date | null
  }

  export type SatuSehatResourceLogMaxAggregateOutputType = {
    id: string | null
    resourceType: string | null
    resourceId: string | null
    accessionNumber: string | null
    studyInstanceUid: string | null
    method: string | null
    status: string | null
    responseCode: number | null
    environment: string | null
    createdAt: Date | null
  }

  export type SatuSehatResourceLogCountAggregateOutputType = {
    id: number
    resourceType: number
    resourceId: number
    accessionNumber: number
    studyInstanceUid: number
    method: number
    status: number
    responseCode: number
    responseBody: number
    environment: number
    createdAt: number
    _all: number
  }


  export type SatuSehatResourceLogAvgAggregateInputType = {
    responseCode?: true
  }

  export type SatuSehatResourceLogSumAggregateInputType = {
    responseCode?: true
  }

  export type SatuSehatResourceLogMinAggregateInputType = {
    id?: true
    resourceType?: true
    resourceId?: true
    accessionNumber?: true
    studyInstanceUid?: true
    method?: true
    status?: true
    responseCode?: true
    environment?: true
    createdAt?: true
  }

  export type SatuSehatResourceLogMaxAggregateInputType = {
    id?: true
    resourceType?: true
    resourceId?: true
    accessionNumber?: true
    studyInstanceUid?: true
    method?: true
    status?: true
    responseCode?: true
    environment?: true
    createdAt?: true
  }

  export type SatuSehatResourceLogCountAggregateInputType = {
    id?: true
    resourceType?: true
    resourceId?: true
    accessionNumber?: true
    studyInstanceUid?: true
    method?: true
    status?: true
    responseCode?: true
    responseBody?: true
    environment?: true
    createdAt?: true
    _all?: true
  }

  export type SatuSehatResourceLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatResourceLog to aggregate.
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatResourceLogs to fetch.
     */
    orderBy?: SatuSehatResourceLogOrderByWithRelationInput | SatuSehatResourceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SatuSehatResourceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatResourceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatResourceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SatuSehatResourceLogs
    **/
    _count?: true | SatuSehatResourceLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SatuSehatResourceLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SatuSehatResourceLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SatuSehatResourceLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SatuSehatResourceLogMaxAggregateInputType
  }

  export type GetSatuSehatResourceLogAggregateType<T extends SatuSehatResourceLogAggregateArgs> = {
        [P in keyof T & keyof AggregateSatuSehatResourceLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSatuSehatResourceLog[P]>
      : GetScalarType<T[P], AggregateSatuSehatResourceLog[P]>
  }




  export type SatuSehatResourceLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SatuSehatResourceLogWhereInput
    orderBy?: SatuSehatResourceLogOrderByWithAggregationInput | SatuSehatResourceLogOrderByWithAggregationInput[]
    by: SatuSehatResourceLogScalarFieldEnum[] | SatuSehatResourceLogScalarFieldEnum
    having?: SatuSehatResourceLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SatuSehatResourceLogCountAggregateInputType | true
    _avg?: SatuSehatResourceLogAvgAggregateInputType
    _sum?: SatuSehatResourceLogSumAggregateInputType
    _min?: SatuSehatResourceLogMinAggregateInputType
    _max?: SatuSehatResourceLogMaxAggregateInputType
  }

  export type SatuSehatResourceLogGroupByOutputType = {
    id: string
    resourceType: string
    resourceId: string | null
    accessionNumber: string | null
    studyInstanceUid: string | null
    method: string
    status: string
    responseCode: number | null
    responseBody: JsonValue | null
    environment: string
    createdAt: Date
    _count: SatuSehatResourceLogCountAggregateOutputType | null
    _avg: SatuSehatResourceLogAvgAggregateOutputType | null
    _sum: SatuSehatResourceLogSumAggregateOutputType | null
    _min: SatuSehatResourceLogMinAggregateOutputType | null
    _max: SatuSehatResourceLogMaxAggregateOutputType | null
  }

  type GetSatuSehatResourceLogGroupByPayload<T extends SatuSehatResourceLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SatuSehatResourceLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SatuSehatResourceLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SatuSehatResourceLogGroupByOutputType[P]>
            : GetScalarType<T[P], SatuSehatResourceLogGroupByOutputType[P]>
        }
      >
    >


  export type SatuSehatResourceLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceType?: boolean
    resourceId?: boolean
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    method?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    environment?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatResourceLog"]>

  export type SatuSehatResourceLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceType?: boolean
    resourceId?: boolean
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    method?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    environment?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatResourceLog"]>

  export type SatuSehatResourceLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    resourceType?: boolean
    resourceId?: boolean
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    method?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    environment?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["satuSehatResourceLog"]>

  export type SatuSehatResourceLogSelectScalar = {
    id?: boolean
    resourceType?: boolean
    resourceId?: boolean
    accessionNumber?: boolean
    studyInstanceUid?: boolean
    method?: boolean
    status?: boolean
    responseCode?: boolean
    responseBody?: boolean
    environment?: boolean
    createdAt?: boolean
  }

  export type SatuSehatResourceLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "resourceType" | "resourceId" | "accessionNumber" | "studyInstanceUid" | "method" | "status" | "responseCode" | "responseBody" | "environment" | "createdAt", ExtArgs["result"]["satuSehatResourceLog"]>

  export type $SatuSehatResourceLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SatuSehatResourceLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      resourceType: string
      resourceId: string | null
      accessionNumber: string | null
      studyInstanceUid: string | null
      method: string
      status: string
      responseCode: number | null
      responseBody: Prisma.JsonValue | null
      environment: string
      createdAt: Date
    }, ExtArgs["result"]["satuSehatResourceLog"]>
    composites: {}
  }

  type SatuSehatResourceLogGetPayload<S extends boolean | null | undefined | SatuSehatResourceLogDefaultArgs> = $Result.GetResult<Prisma.$SatuSehatResourceLogPayload, S>

  type SatuSehatResourceLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SatuSehatResourceLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SatuSehatResourceLogCountAggregateInputType | true
    }

  export interface SatuSehatResourceLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SatuSehatResourceLog'], meta: { name: 'SatuSehatResourceLog' } }
    /**
     * Find zero or one SatuSehatResourceLog that matches the filter.
     * @param {SatuSehatResourceLogFindUniqueArgs} args - Arguments to find a SatuSehatResourceLog
     * @example
     * // Get one SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SatuSehatResourceLogFindUniqueArgs>(args: SelectSubset<T, SatuSehatResourceLogFindUniqueArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SatuSehatResourceLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SatuSehatResourceLogFindUniqueOrThrowArgs} args - Arguments to find a SatuSehatResourceLog
     * @example
     * // Get one SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SatuSehatResourceLogFindUniqueOrThrowArgs>(args: SelectSubset<T, SatuSehatResourceLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatResourceLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogFindFirstArgs} args - Arguments to find a SatuSehatResourceLog
     * @example
     * // Get one SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SatuSehatResourceLogFindFirstArgs>(args?: SelectSubset<T, SatuSehatResourceLogFindFirstArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatResourceLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogFindFirstOrThrowArgs} args - Arguments to find a SatuSehatResourceLog
     * @example
     * // Get one SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SatuSehatResourceLogFindFirstOrThrowArgs>(args?: SelectSubset<T, SatuSehatResourceLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SatuSehatResourceLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SatuSehatResourceLogs
     * const satuSehatResourceLogs = await prisma.satuSehatResourceLog.findMany()
     * 
     * // Get first 10 SatuSehatResourceLogs
     * const satuSehatResourceLogs = await prisma.satuSehatResourceLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const satuSehatResourceLogWithIdOnly = await prisma.satuSehatResourceLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SatuSehatResourceLogFindManyArgs>(args?: SelectSubset<T, SatuSehatResourceLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SatuSehatResourceLog.
     * @param {SatuSehatResourceLogCreateArgs} args - Arguments to create a SatuSehatResourceLog.
     * @example
     * // Create one SatuSehatResourceLog
     * const SatuSehatResourceLog = await prisma.satuSehatResourceLog.create({
     *   data: {
     *     // ... data to create a SatuSehatResourceLog
     *   }
     * })
     * 
     */
    create<T extends SatuSehatResourceLogCreateArgs>(args: SelectSubset<T, SatuSehatResourceLogCreateArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SatuSehatResourceLogs.
     * @param {SatuSehatResourceLogCreateManyArgs} args - Arguments to create many SatuSehatResourceLogs.
     * @example
     * // Create many SatuSehatResourceLogs
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SatuSehatResourceLogCreateManyArgs>(args?: SelectSubset<T, SatuSehatResourceLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SatuSehatResourceLogs and returns the data saved in the database.
     * @param {SatuSehatResourceLogCreateManyAndReturnArgs} args - Arguments to create many SatuSehatResourceLogs.
     * @example
     * // Create many SatuSehatResourceLogs
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SatuSehatResourceLogs and only return the `id`
     * const satuSehatResourceLogWithIdOnly = await prisma.satuSehatResourceLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SatuSehatResourceLogCreateManyAndReturnArgs>(args?: SelectSubset<T, SatuSehatResourceLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SatuSehatResourceLog.
     * @param {SatuSehatResourceLogDeleteArgs} args - Arguments to delete one SatuSehatResourceLog.
     * @example
     * // Delete one SatuSehatResourceLog
     * const SatuSehatResourceLog = await prisma.satuSehatResourceLog.delete({
     *   where: {
     *     // ... filter to delete one SatuSehatResourceLog
     *   }
     * })
     * 
     */
    delete<T extends SatuSehatResourceLogDeleteArgs>(args: SelectSubset<T, SatuSehatResourceLogDeleteArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SatuSehatResourceLog.
     * @param {SatuSehatResourceLogUpdateArgs} args - Arguments to update one SatuSehatResourceLog.
     * @example
     * // Update one SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SatuSehatResourceLogUpdateArgs>(args: SelectSubset<T, SatuSehatResourceLogUpdateArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SatuSehatResourceLogs.
     * @param {SatuSehatResourceLogDeleteManyArgs} args - Arguments to filter SatuSehatResourceLogs to delete.
     * @example
     * // Delete a few SatuSehatResourceLogs
     * const { count } = await prisma.satuSehatResourceLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SatuSehatResourceLogDeleteManyArgs>(args?: SelectSubset<T, SatuSehatResourceLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatResourceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SatuSehatResourceLogs
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SatuSehatResourceLogUpdateManyArgs>(args: SelectSubset<T, SatuSehatResourceLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatResourceLogs and returns the data updated in the database.
     * @param {SatuSehatResourceLogUpdateManyAndReturnArgs} args - Arguments to update many SatuSehatResourceLogs.
     * @example
     * // Update many SatuSehatResourceLogs
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SatuSehatResourceLogs and only return the `id`
     * const satuSehatResourceLogWithIdOnly = await prisma.satuSehatResourceLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SatuSehatResourceLogUpdateManyAndReturnArgs>(args: SelectSubset<T, SatuSehatResourceLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SatuSehatResourceLog.
     * @param {SatuSehatResourceLogUpsertArgs} args - Arguments to update or create a SatuSehatResourceLog.
     * @example
     * // Update or create a SatuSehatResourceLog
     * const satuSehatResourceLog = await prisma.satuSehatResourceLog.upsert({
     *   create: {
     *     // ... data to create a SatuSehatResourceLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SatuSehatResourceLog we want to update
     *   }
     * })
     */
    upsert<T extends SatuSehatResourceLogUpsertArgs>(args: SelectSubset<T, SatuSehatResourceLogUpsertArgs<ExtArgs>>): Prisma__SatuSehatResourceLogClient<$Result.GetResult<Prisma.$SatuSehatResourceLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SatuSehatResourceLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogCountArgs} args - Arguments to filter SatuSehatResourceLogs to count.
     * @example
     * // Count the number of SatuSehatResourceLogs
     * const count = await prisma.satuSehatResourceLog.count({
     *   where: {
     *     // ... the filter for the SatuSehatResourceLogs we want to count
     *   }
     * })
    **/
    count<T extends SatuSehatResourceLogCountArgs>(
      args?: Subset<T, SatuSehatResourceLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SatuSehatResourceLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SatuSehatResourceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SatuSehatResourceLogAggregateArgs>(args: Subset<T, SatuSehatResourceLogAggregateArgs>): Prisma.PrismaPromise<GetSatuSehatResourceLogAggregateType<T>>

    /**
     * Group by SatuSehatResourceLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatResourceLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SatuSehatResourceLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SatuSehatResourceLogGroupByArgs['orderBy'] }
        : { orderBy?: SatuSehatResourceLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SatuSehatResourceLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSatuSehatResourceLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SatuSehatResourceLog model
   */
  readonly fields: SatuSehatResourceLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SatuSehatResourceLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SatuSehatResourceLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SatuSehatResourceLog model
   */
  interface SatuSehatResourceLogFieldRefs {
    readonly id: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly resourceType: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly resourceId: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly accessionNumber: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly studyInstanceUid: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly method: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly status: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly responseCode: FieldRef<"SatuSehatResourceLog", 'Int'>
    readonly responseBody: FieldRef<"SatuSehatResourceLog", 'Json'>
    readonly environment: FieldRef<"SatuSehatResourceLog", 'String'>
    readonly createdAt: FieldRef<"SatuSehatResourceLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SatuSehatResourceLog findUnique
   */
  export type SatuSehatResourceLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatResourceLog to fetch.
     */
    where: SatuSehatResourceLogWhereUniqueInput
  }

  /**
   * SatuSehatResourceLog findUniqueOrThrow
   */
  export type SatuSehatResourceLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatResourceLog to fetch.
     */
    where: SatuSehatResourceLogWhereUniqueInput
  }

  /**
   * SatuSehatResourceLog findFirst
   */
  export type SatuSehatResourceLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatResourceLog to fetch.
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatResourceLogs to fetch.
     */
    orderBy?: SatuSehatResourceLogOrderByWithRelationInput | SatuSehatResourceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatResourceLogs.
     */
    cursor?: SatuSehatResourceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatResourceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatResourceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatResourceLogs.
     */
    distinct?: SatuSehatResourceLogScalarFieldEnum | SatuSehatResourceLogScalarFieldEnum[]
  }

  /**
   * SatuSehatResourceLog findFirstOrThrow
   */
  export type SatuSehatResourceLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatResourceLog to fetch.
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatResourceLogs to fetch.
     */
    orderBy?: SatuSehatResourceLogOrderByWithRelationInput | SatuSehatResourceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatResourceLogs.
     */
    cursor?: SatuSehatResourceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatResourceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatResourceLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatResourceLogs.
     */
    distinct?: SatuSehatResourceLogScalarFieldEnum | SatuSehatResourceLogScalarFieldEnum[]
  }

  /**
   * SatuSehatResourceLog findMany
   */
  export type SatuSehatResourceLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatResourceLogs to fetch.
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatResourceLogs to fetch.
     */
    orderBy?: SatuSehatResourceLogOrderByWithRelationInput | SatuSehatResourceLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SatuSehatResourceLogs.
     */
    cursor?: SatuSehatResourceLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatResourceLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatResourceLogs.
     */
    skip?: number
    distinct?: SatuSehatResourceLogScalarFieldEnum | SatuSehatResourceLogScalarFieldEnum[]
  }

  /**
   * SatuSehatResourceLog create
   */
  export type SatuSehatResourceLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * The data needed to create a SatuSehatResourceLog.
     */
    data: XOR<SatuSehatResourceLogCreateInput, SatuSehatResourceLogUncheckedCreateInput>
  }

  /**
   * SatuSehatResourceLog createMany
   */
  export type SatuSehatResourceLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SatuSehatResourceLogs.
     */
    data: SatuSehatResourceLogCreateManyInput | SatuSehatResourceLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatResourceLog createManyAndReturn
   */
  export type SatuSehatResourceLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * The data used to create many SatuSehatResourceLogs.
     */
    data: SatuSehatResourceLogCreateManyInput | SatuSehatResourceLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatResourceLog update
   */
  export type SatuSehatResourceLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * The data needed to update a SatuSehatResourceLog.
     */
    data: XOR<SatuSehatResourceLogUpdateInput, SatuSehatResourceLogUncheckedUpdateInput>
    /**
     * Choose, which SatuSehatResourceLog to update.
     */
    where: SatuSehatResourceLogWhereUniqueInput
  }

  /**
   * SatuSehatResourceLog updateMany
   */
  export type SatuSehatResourceLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SatuSehatResourceLogs.
     */
    data: XOR<SatuSehatResourceLogUpdateManyMutationInput, SatuSehatResourceLogUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatResourceLogs to update
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * Limit how many SatuSehatResourceLogs to update.
     */
    limit?: number
  }

  /**
   * SatuSehatResourceLog updateManyAndReturn
   */
  export type SatuSehatResourceLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * The data used to update SatuSehatResourceLogs.
     */
    data: XOR<SatuSehatResourceLogUpdateManyMutationInput, SatuSehatResourceLogUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatResourceLogs to update
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * Limit how many SatuSehatResourceLogs to update.
     */
    limit?: number
  }

  /**
   * SatuSehatResourceLog upsert
   */
  export type SatuSehatResourceLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * The filter to search for the SatuSehatResourceLog to update in case it exists.
     */
    where: SatuSehatResourceLogWhereUniqueInput
    /**
     * In case the SatuSehatResourceLog found by the `where` argument doesn't exist, create a new SatuSehatResourceLog with this data.
     */
    create: XOR<SatuSehatResourceLogCreateInput, SatuSehatResourceLogUncheckedCreateInput>
    /**
     * In case the SatuSehatResourceLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SatuSehatResourceLogUpdateInput, SatuSehatResourceLogUncheckedUpdateInput>
  }

  /**
   * SatuSehatResourceLog delete
   */
  export type SatuSehatResourceLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
    /**
     * Filter which SatuSehatResourceLog to delete.
     */
    where: SatuSehatResourceLogWhereUniqueInput
  }

  /**
   * SatuSehatResourceLog deleteMany
   */
  export type SatuSehatResourceLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatResourceLogs to delete
     */
    where?: SatuSehatResourceLogWhereInput
    /**
     * Limit how many SatuSehatResourceLogs to delete.
     */
    limit?: number
  }

  /**
   * SatuSehatResourceLog without action
   */
  export type SatuSehatResourceLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatResourceLog
     */
    select?: SatuSehatResourceLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatResourceLog
     */
    omit?: SatuSehatResourceLogOmit<ExtArgs> | null
  }


  /**
   * Model ModalityConnection
   */

  export type AggregateModalityConnection = {
    _count: ModalityConnectionCountAggregateOutputType | null
    _min: ModalityConnectionMinAggregateOutputType | null
    _max: ModalityConnectionMaxAggregateOutputType | null
  }

  export type ModalityConnectionMinAggregateOutputType = {
    id: string | null
    aeTitle: string | null
    ipAddress: string | null
    event: string | null
    timestamp: Date | null
  }

  export type ModalityConnectionMaxAggregateOutputType = {
    id: string | null
    aeTitle: string | null
    ipAddress: string | null
    event: string | null
    timestamp: Date | null
  }

  export type ModalityConnectionCountAggregateOutputType = {
    id: number
    aeTitle: number
    ipAddress: number
    event: number
    timestamp: number
    _all: number
  }


  export type ModalityConnectionMinAggregateInputType = {
    id?: true
    aeTitle?: true
    ipAddress?: true
    event?: true
    timestamp?: true
  }

  export type ModalityConnectionMaxAggregateInputType = {
    id?: true
    aeTitle?: true
    ipAddress?: true
    event?: true
    timestamp?: true
  }

  export type ModalityConnectionCountAggregateInputType = {
    id?: true
    aeTitle?: true
    ipAddress?: true
    event?: true
    timestamp?: true
    _all?: true
  }

  export type ModalityConnectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModalityConnection to aggregate.
     */
    where?: ModalityConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModalityConnections to fetch.
     */
    orderBy?: ModalityConnectionOrderByWithRelationInput | ModalityConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModalityConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModalityConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModalityConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ModalityConnections
    **/
    _count?: true | ModalityConnectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModalityConnectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModalityConnectionMaxAggregateInputType
  }

  export type GetModalityConnectionAggregateType<T extends ModalityConnectionAggregateArgs> = {
        [P in keyof T & keyof AggregateModalityConnection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModalityConnection[P]>
      : GetScalarType<T[P], AggregateModalityConnection[P]>
  }




  export type ModalityConnectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModalityConnectionWhereInput
    orderBy?: ModalityConnectionOrderByWithAggregationInput | ModalityConnectionOrderByWithAggregationInput[]
    by: ModalityConnectionScalarFieldEnum[] | ModalityConnectionScalarFieldEnum
    having?: ModalityConnectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModalityConnectionCountAggregateInputType | true
    _min?: ModalityConnectionMinAggregateInputType
    _max?: ModalityConnectionMaxAggregateInputType
  }

  export type ModalityConnectionGroupByOutputType = {
    id: string
    aeTitle: string
    ipAddress: string
    event: string
    timestamp: Date
    _count: ModalityConnectionCountAggregateOutputType | null
    _min: ModalityConnectionMinAggregateOutputType | null
    _max: ModalityConnectionMaxAggregateOutputType | null
  }

  type GetModalityConnectionGroupByPayload<T extends ModalityConnectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModalityConnectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModalityConnectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModalityConnectionGroupByOutputType[P]>
            : GetScalarType<T[P], ModalityConnectionGroupByOutputType[P]>
        }
      >
    >


  export type ModalityConnectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aeTitle?: boolean
    ipAddress?: boolean
    event?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["modalityConnection"]>

  export type ModalityConnectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aeTitle?: boolean
    ipAddress?: boolean
    event?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["modalityConnection"]>

  export type ModalityConnectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    aeTitle?: boolean
    ipAddress?: boolean
    event?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["modalityConnection"]>

  export type ModalityConnectionSelectScalar = {
    id?: boolean
    aeTitle?: boolean
    ipAddress?: boolean
    event?: boolean
    timestamp?: boolean
  }

  export type ModalityConnectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "aeTitle" | "ipAddress" | "event" | "timestamp", ExtArgs["result"]["modalityConnection"]>

  export type $ModalityConnectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ModalityConnection"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      aeTitle: string
      ipAddress: string
      event: string
      timestamp: Date
    }, ExtArgs["result"]["modalityConnection"]>
    composites: {}
  }

  type ModalityConnectionGetPayload<S extends boolean | null | undefined | ModalityConnectionDefaultArgs> = $Result.GetResult<Prisma.$ModalityConnectionPayload, S>

  type ModalityConnectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ModalityConnectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ModalityConnectionCountAggregateInputType | true
    }

  export interface ModalityConnectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ModalityConnection'], meta: { name: 'ModalityConnection' } }
    /**
     * Find zero or one ModalityConnection that matches the filter.
     * @param {ModalityConnectionFindUniqueArgs} args - Arguments to find a ModalityConnection
     * @example
     * // Get one ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ModalityConnectionFindUniqueArgs>(args: SelectSubset<T, ModalityConnectionFindUniqueArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ModalityConnection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ModalityConnectionFindUniqueOrThrowArgs} args - Arguments to find a ModalityConnection
     * @example
     * // Get one ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ModalityConnectionFindUniqueOrThrowArgs>(args: SelectSubset<T, ModalityConnectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModalityConnection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionFindFirstArgs} args - Arguments to find a ModalityConnection
     * @example
     * // Get one ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ModalityConnectionFindFirstArgs>(args?: SelectSubset<T, ModalityConnectionFindFirstArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ModalityConnection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionFindFirstOrThrowArgs} args - Arguments to find a ModalityConnection
     * @example
     * // Get one ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ModalityConnectionFindFirstOrThrowArgs>(args?: SelectSubset<T, ModalityConnectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ModalityConnections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ModalityConnections
     * const modalityConnections = await prisma.modalityConnection.findMany()
     * 
     * // Get first 10 ModalityConnections
     * const modalityConnections = await prisma.modalityConnection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const modalityConnectionWithIdOnly = await prisma.modalityConnection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ModalityConnectionFindManyArgs>(args?: SelectSubset<T, ModalityConnectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ModalityConnection.
     * @param {ModalityConnectionCreateArgs} args - Arguments to create a ModalityConnection.
     * @example
     * // Create one ModalityConnection
     * const ModalityConnection = await prisma.modalityConnection.create({
     *   data: {
     *     // ... data to create a ModalityConnection
     *   }
     * })
     * 
     */
    create<T extends ModalityConnectionCreateArgs>(args: SelectSubset<T, ModalityConnectionCreateArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ModalityConnections.
     * @param {ModalityConnectionCreateManyArgs} args - Arguments to create many ModalityConnections.
     * @example
     * // Create many ModalityConnections
     * const modalityConnection = await prisma.modalityConnection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ModalityConnectionCreateManyArgs>(args?: SelectSubset<T, ModalityConnectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ModalityConnections and returns the data saved in the database.
     * @param {ModalityConnectionCreateManyAndReturnArgs} args - Arguments to create many ModalityConnections.
     * @example
     * // Create many ModalityConnections
     * const modalityConnection = await prisma.modalityConnection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ModalityConnections and only return the `id`
     * const modalityConnectionWithIdOnly = await prisma.modalityConnection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ModalityConnectionCreateManyAndReturnArgs>(args?: SelectSubset<T, ModalityConnectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ModalityConnection.
     * @param {ModalityConnectionDeleteArgs} args - Arguments to delete one ModalityConnection.
     * @example
     * // Delete one ModalityConnection
     * const ModalityConnection = await prisma.modalityConnection.delete({
     *   where: {
     *     // ... filter to delete one ModalityConnection
     *   }
     * })
     * 
     */
    delete<T extends ModalityConnectionDeleteArgs>(args: SelectSubset<T, ModalityConnectionDeleteArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ModalityConnection.
     * @param {ModalityConnectionUpdateArgs} args - Arguments to update one ModalityConnection.
     * @example
     * // Update one ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ModalityConnectionUpdateArgs>(args: SelectSubset<T, ModalityConnectionUpdateArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ModalityConnections.
     * @param {ModalityConnectionDeleteManyArgs} args - Arguments to filter ModalityConnections to delete.
     * @example
     * // Delete a few ModalityConnections
     * const { count } = await prisma.modalityConnection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ModalityConnectionDeleteManyArgs>(args?: SelectSubset<T, ModalityConnectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModalityConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ModalityConnections
     * const modalityConnection = await prisma.modalityConnection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ModalityConnectionUpdateManyArgs>(args: SelectSubset<T, ModalityConnectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ModalityConnections and returns the data updated in the database.
     * @param {ModalityConnectionUpdateManyAndReturnArgs} args - Arguments to update many ModalityConnections.
     * @example
     * // Update many ModalityConnections
     * const modalityConnection = await prisma.modalityConnection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ModalityConnections and only return the `id`
     * const modalityConnectionWithIdOnly = await prisma.modalityConnection.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ModalityConnectionUpdateManyAndReturnArgs>(args: SelectSubset<T, ModalityConnectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ModalityConnection.
     * @param {ModalityConnectionUpsertArgs} args - Arguments to update or create a ModalityConnection.
     * @example
     * // Update or create a ModalityConnection
     * const modalityConnection = await prisma.modalityConnection.upsert({
     *   create: {
     *     // ... data to create a ModalityConnection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ModalityConnection we want to update
     *   }
     * })
     */
    upsert<T extends ModalityConnectionUpsertArgs>(args: SelectSubset<T, ModalityConnectionUpsertArgs<ExtArgs>>): Prisma__ModalityConnectionClient<$Result.GetResult<Prisma.$ModalityConnectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ModalityConnections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionCountArgs} args - Arguments to filter ModalityConnections to count.
     * @example
     * // Count the number of ModalityConnections
     * const count = await prisma.modalityConnection.count({
     *   where: {
     *     // ... the filter for the ModalityConnections we want to count
     *   }
     * })
    **/
    count<T extends ModalityConnectionCountArgs>(
      args?: Subset<T, ModalityConnectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModalityConnectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ModalityConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ModalityConnectionAggregateArgs>(args: Subset<T, ModalityConnectionAggregateArgs>): Prisma.PrismaPromise<GetModalityConnectionAggregateType<T>>

    /**
     * Group by ModalityConnection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModalityConnectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ModalityConnectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModalityConnectionGroupByArgs['orderBy'] }
        : { orderBy?: ModalityConnectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ModalityConnectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModalityConnectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ModalityConnection model
   */
  readonly fields: ModalityConnectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ModalityConnection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModalityConnectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ModalityConnection model
   */
  interface ModalityConnectionFieldRefs {
    readonly id: FieldRef<"ModalityConnection", 'String'>
    readonly aeTitle: FieldRef<"ModalityConnection", 'String'>
    readonly ipAddress: FieldRef<"ModalityConnection", 'String'>
    readonly event: FieldRef<"ModalityConnection", 'String'>
    readonly timestamp: FieldRef<"ModalityConnection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ModalityConnection findUnique
   */
  export type ModalityConnectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ModalityConnection to fetch.
     */
    where: ModalityConnectionWhereUniqueInput
  }

  /**
   * ModalityConnection findUniqueOrThrow
   */
  export type ModalityConnectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ModalityConnection to fetch.
     */
    where: ModalityConnectionWhereUniqueInput
  }

  /**
   * ModalityConnection findFirst
   */
  export type ModalityConnectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ModalityConnection to fetch.
     */
    where?: ModalityConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModalityConnections to fetch.
     */
    orderBy?: ModalityConnectionOrderByWithRelationInput | ModalityConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModalityConnections.
     */
    cursor?: ModalityConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModalityConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModalityConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModalityConnections.
     */
    distinct?: ModalityConnectionScalarFieldEnum | ModalityConnectionScalarFieldEnum[]
  }

  /**
   * ModalityConnection findFirstOrThrow
   */
  export type ModalityConnectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ModalityConnection to fetch.
     */
    where?: ModalityConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModalityConnections to fetch.
     */
    orderBy?: ModalityConnectionOrderByWithRelationInput | ModalityConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ModalityConnections.
     */
    cursor?: ModalityConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModalityConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModalityConnections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ModalityConnections.
     */
    distinct?: ModalityConnectionScalarFieldEnum | ModalityConnectionScalarFieldEnum[]
  }

  /**
   * ModalityConnection findMany
   */
  export type ModalityConnectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter, which ModalityConnections to fetch.
     */
    where?: ModalityConnectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ModalityConnections to fetch.
     */
    orderBy?: ModalityConnectionOrderByWithRelationInput | ModalityConnectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ModalityConnections.
     */
    cursor?: ModalityConnectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ModalityConnections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ModalityConnections.
     */
    skip?: number
    distinct?: ModalityConnectionScalarFieldEnum | ModalityConnectionScalarFieldEnum[]
  }

  /**
   * ModalityConnection create
   */
  export type ModalityConnectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * The data needed to create a ModalityConnection.
     */
    data: XOR<ModalityConnectionCreateInput, ModalityConnectionUncheckedCreateInput>
  }

  /**
   * ModalityConnection createMany
   */
  export type ModalityConnectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ModalityConnections.
     */
    data: ModalityConnectionCreateManyInput | ModalityConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModalityConnection createManyAndReturn
   */
  export type ModalityConnectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * The data used to create many ModalityConnections.
     */
    data: ModalityConnectionCreateManyInput | ModalityConnectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ModalityConnection update
   */
  export type ModalityConnectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * The data needed to update a ModalityConnection.
     */
    data: XOR<ModalityConnectionUpdateInput, ModalityConnectionUncheckedUpdateInput>
    /**
     * Choose, which ModalityConnection to update.
     */
    where: ModalityConnectionWhereUniqueInput
  }

  /**
   * ModalityConnection updateMany
   */
  export type ModalityConnectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ModalityConnections.
     */
    data: XOR<ModalityConnectionUpdateManyMutationInput, ModalityConnectionUncheckedUpdateManyInput>
    /**
     * Filter which ModalityConnections to update
     */
    where?: ModalityConnectionWhereInput
    /**
     * Limit how many ModalityConnections to update.
     */
    limit?: number
  }

  /**
   * ModalityConnection updateManyAndReturn
   */
  export type ModalityConnectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * The data used to update ModalityConnections.
     */
    data: XOR<ModalityConnectionUpdateManyMutationInput, ModalityConnectionUncheckedUpdateManyInput>
    /**
     * Filter which ModalityConnections to update
     */
    where?: ModalityConnectionWhereInput
    /**
     * Limit how many ModalityConnections to update.
     */
    limit?: number
  }

  /**
   * ModalityConnection upsert
   */
  export type ModalityConnectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * The filter to search for the ModalityConnection to update in case it exists.
     */
    where: ModalityConnectionWhereUniqueInput
    /**
     * In case the ModalityConnection found by the `where` argument doesn't exist, create a new ModalityConnection with this data.
     */
    create: XOR<ModalityConnectionCreateInput, ModalityConnectionUncheckedCreateInput>
    /**
     * In case the ModalityConnection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModalityConnectionUpdateInput, ModalityConnectionUncheckedUpdateInput>
  }

  /**
   * ModalityConnection delete
   */
  export type ModalityConnectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
    /**
     * Filter which ModalityConnection to delete.
     */
    where: ModalityConnectionWhereUniqueInput
  }

  /**
   * ModalityConnection deleteMany
   */
  export type ModalityConnectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ModalityConnections to delete
     */
    where?: ModalityConnectionWhereInput
    /**
     * Limit how many ModalityConnections to delete.
     */
    limit?: number
  }

  /**
   * ModalityConnection without action
   */
  export type ModalityConnectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModalityConnection
     */
    select?: ModalityConnectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ModalityConnection
     */
    omit?: ModalityConnectionOmit<ExtArgs> | null
  }


  /**
   * Model RadiologyReport
   */

  export type AggregateRadiologyReport = {
    _count: RadiologyReportCountAggregateOutputType | null
    _min: RadiologyReportMinAggregateOutputType | null
    _max: RadiologyReportMaxAggregateOutputType | null
  }

  export type RadiologyReportMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    studyInstanceUid: string | null
    studyDate: string | null
    accessionNumber: string | null
    patientName: string | null
    patientSex: string | null
    age: string | null
    examType: string | null
    findings: string | null
    reportDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    doctorId: string | null
    doctorName: string | null
  }

  export type RadiologyReportMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    studyInstanceUid: string | null
    studyDate: string | null
    accessionNumber: string | null
    patientName: string | null
    patientSex: string | null
    age: string | null
    examType: string | null
    findings: string | null
    reportDate: string | null
    createdAt: Date | null
    updatedAt: Date | null
    doctorId: string | null
    doctorName: string | null
  }

  export type RadiologyReportCountAggregateOutputType = {
    id: number
    patientId: number
    studyInstanceUid: number
    studyDate: number
    accessionNumber: number
    patientName: number
    patientSex: number
    age: number
    examType: number
    findings: number
    measurementImages: number
    selectedSeries: number
    reportDate: number
    createdAt: number
    updatedAt: number
    doctorId: number
    doctorName: number
    _all: number
  }


  export type RadiologyReportMinAggregateInputType = {
    id?: true
    patientId?: true
    studyInstanceUid?: true
    studyDate?: true
    accessionNumber?: true
    patientName?: true
    patientSex?: true
    age?: true
    examType?: true
    findings?: true
    reportDate?: true
    createdAt?: true
    updatedAt?: true
    doctorId?: true
    doctorName?: true
  }

  export type RadiologyReportMaxAggregateInputType = {
    id?: true
    patientId?: true
    studyInstanceUid?: true
    studyDate?: true
    accessionNumber?: true
    patientName?: true
    patientSex?: true
    age?: true
    examType?: true
    findings?: true
    reportDate?: true
    createdAt?: true
    updatedAt?: true
    doctorId?: true
    doctorName?: true
  }

  export type RadiologyReportCountAggregateInputType = {
    id?: true
    patientId?: true
    studyInstanceUid?: true
    studyDate?: true
    accessionNumber?: true
    patientName?: true
    patientSex?: true
    age?: true
    examType?: true
    findings?: true
    measurementImages?: true
    selectedSeries?: true
    reportDate?: true
    createdAt?: true
    updatedAt?: true
    doctorId?: true
    doctorName?: true
    _all?: true
  }

  export type RadiologyReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RadiologyReport to aggregate.
     */
    where?: RadiologyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiologyReports to fetch.
     */
    orderBy?: RadiologyReportOrderByWithRelationInput | RadiologyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RadiologyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiologyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiologyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RadiologyReports
    **/
    _count?: true | RadiologyReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RadiologyReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RadiologyReportMaxAggregateInputType
  }

  export type GetRadiologyReportAggregateType<T extends RadiologyReportAggregateArgs> = {
        [P in keyof T & keyof AggregateRadiologyReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRadiologyReport[P]>
      : GetScalarType<T[P], AggregateRadiologyReport[P]>
  }




  export type RadiologyReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RadiologyReportWhereInput
    orderBy?: RadiologyReportOrderByWithAggregationInput | RadiologyReportOrderByWithAggregationInput[]
    by: RadiologyReportScalarFieldEnum[] | RadiologyReportScalarFieldEnum
    having?: RadiologyReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RadiologyReportCountAggregateInputType | true
    _min?: RadiologyReportMinAggregateInputType
    _max?: RadiologyReportMaxAggregateInputType
  }

  export type RadiologyReportGroupByOutputType = {
    id: string
    patientId: string
    studyInstanceUid: string
    studyDate: string | null
    accessionNumber: string | null
    patientName: string | null
    patientSex: string | null
    age: string | null
    examType: string | null
    findings: string | null
    measurementImages: JsonValue | null
    selectedSeries: JsonValue | null
    reportDate: string | null
    createdAt: Date
    updatedAt: Date
    doctorId: string | null
    doctorName: string | null
    _count: RadiologyReportCountAggregateOutputType | null
    _min: RadiologyReportMinAggregateOutputType | null
    _max: RadiologyReportMaxAggregateOutputType | null
  }

  type GetRadiologyReportGroupByPayload<T extends RadiologyReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RadiologyReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RadiologyReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RadiologyReportGroupByOutputType[P]>
            : GetScalarType<T[P], RadiologyReportGroupByOutputType[P]>
        }
      >
    >


  export type RadiologyReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    studyInstanceUid?: boolean
    studyDate?: boolean
    accessionNumber?: boolean
    patientName?: boolean
    patientSex?: boolean
    age?: boolean
    examType?: boolean
    findings?: boolean
    measurementImages?: boolean
    selectedSeries?: boolean
    reportDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctorId?: boolean
    doctorName?: boolean
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["radiologyReport"]>

  export type RadiologyReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    studyInstanceUid?: boolean
    studyDate?: boolean
    accessionNumber?: boolean
    patientName?: boolean
    patientSex?: boolean
    age?: boolean
    examType?: boolean
    findings?: boolean
    measurementImages?: boolean
    selectedSeries?: boolean
    reportDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctorId?: boolean
    doctorName?: boolean
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["radiologyReport"]>

  export type RadiologyReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    studyInstanceUid?: boolean
    studyDate?: boolean
    accessionNumber?: boolean
    patientName?: boolean
    patientSex?: boolean
    age?: boolean
    examType?: boolean
    findings?: boolean
    measurementImages?: boolean
    selectedSeries?: boolean
    reportDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctorId?: boolean
    doctorName?: boolean
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }, ExtArgs["result"]["radiologyReport"]>

  export type RadiologyReportSelectScalar = {
    id?: boolean
    patientId?: boolean
    studyInstanceUid?: boolean
    studyDate?: boolean
    accessionNumber?: boolean
    patientName?: boolean
    patientSex?: boolean
    age?: boolean
    examType?: boolean
    findings?: boolean
    measurementImages?: boolean
    selectedSeries?: boolean
    reportDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctorId?: boolean
    doctorName?: boolean
  }

  export type RadiologyReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "studyInstanceUid" | "studyDate" | "accessionNumber" | "patientName" | "patientSex" | "age" | "examType" | "findings" | "measurementImages" | "selectedSeries" | "reportDate" | "createdAt" | "updatedAt" | "doctorId" | "doctorName", ExtArgs["result"]["radiologyReport"]>
  export type RadiologyReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }
  export type RadiologyReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }
  export type RadiologyReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | RadiologyReport$doctorArgs<ExtArgs>
  }

  export type $RadiologyReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RadiologyReport"
    objects: {
      doctor: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      studyInstanceUid: string
      studyDate: string | null
      accessionNumber: string | null
      patientName: string | null
      patientSex: string | null
      age: string | null
      examType: string | null
      findings: string | null
      measurementImages: Prisma.JsonValue | null
      selectedSeries: Prisma.JsonValue | null
      reportDate: string | null
      createdAt: Date
      updatedAt: Date
      doctorId: string | null
      doctorName: string | null
    }, ExtArgs["result"]["radiologyReport"]>
    composites: {}
  }

  type RadiologyReportGetPayload<S extends boolean | null | undefined | RadiologyReportDefaultArgs> = $Result.GetResult<Prisma.$RadiologyReportPayload, S>

  type RadiologyReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RadiologyReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RadiologyReportCountAggregateInputType | true
    }

  export interface RadiologyReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RadiologyReport'], meta: { name: 'RadiologyReport' } }
    /**
     * Find zero or one RadiologyReport that matches the filter.
     * @param {RadiologyReportFindUniqueArgs} args - Arguments to find a RadiologyReport
     * @example
     * // Get one RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RadiologyReportFindUniqueArgs>(args: SelectSubset<T, RadiologyReportFindUniqueArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RadiologyReport that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RadiologyReportFindUniqueOrThrowArgs} args - Arguments to find a RadiologyReport
     * @example
     * // Get one RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RadiologyReportFindUniqueOrThrowArgs>(args: SelectSubset<T, RadiologyReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RadiologyReport that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportFindFirstArgs} args - Arguments to find a RadiologyReport
     * @example
     * // Get one RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RadiologyReportFindFirstArgs>(args?: SelectSubset<T, RadiologyReportFindFirstArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RadiologyReport that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportFindFirstOrThrowArgs} args - Arguments to find a RadiologyReport
     * @example
     * // Get one RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RadiologyReportFindFirstOrThrowArgs>(args?: SelectSubset<T, RadiologyReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RadiologyReports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RadiologyReports
     * const radiologyReports = await prisma.radiologyReport.findMany()
     * 
     * // Get first 10 RadiologyReports
     * const radiologyReports = await prisma.radiologyReport.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const radiologyReportWithIdOnly = await prisma.radiologyReport.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RadiologyReportFindManyArgs>(args?: SelectSubset<T, RadiologyReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RadiologyReport.
     * @param {RadiologyReportCreateArgs} args - Arguments to create a RadiologyReport.
     * @example
     * // Create one RadiologyReport
     * const RadiologyReport = await prisma.radiologyReport.create({
     *   data: {
     *     // ... data to create a RadiologyReport
     *   }
     * })
     * 
     */
    create<T extends RadiologyReportCreateArgs>(args: SelectSubset<T, RadiologyReportCreateArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RadiologyReports.
     * @param {RadiologyReportCreateManyArgs} args - Arguments to create many RadiologyReports.
     * @example
     * // Create many RadiologyReports
     * const radiologyReport = await prisma.radiologyReport.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RadiologyReportCreateManyArgs>(args?: SelectSubset<T, RadiologyReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RadiologyReports and returns the data saved in the database.
     * @param {RadiologyReportCreateManyAndReturnArgs} args - Arguments to create many RadiologyReports.
     * @example
     * // Create many RadiologyReports
     * const radiologyReport = await prisma.radiologyReport.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RadiologyReports and only return the `id`
     * const radiologyReportWithIdOnly = await prisma.radiologyReport.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RadiologyReportCreateManyAndReturnArgs>(args?: SelectSubset<T, RadiologyReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RadiologyReport.
     * @param {RadiologyReportDeleteArgs} args - Arguments to delete one RadiologyReport.
     * @example
     * // Delete one RadiologyReport
     * const RadiologyReport = await prisma.radiologyReport.delete({
     *   where: {
     *     // ... filter to delete one RadiologyReport
     *   }
     * })
     * 
     */
    delete<T extends RadiologyReportDeleteArgs>(args: SelectSubset<T, RadiologyReportDeleteArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RadiologyReport.
     * @param {RadiologyReportUpdateArgs} args - Arguments to update one RadiologyReport.
     * @example
     * // Update one RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RadiologyReportUpdateArgs>(args: SelectSubset<T, RadiologyReportUpdateArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RadiologyReports.
     * @param {RadiologyReportDeleteManyArgs} args - Arguments to filter RadiologyReports to delete.
     * @example
     * // Delete a few RadiologyReports
     * const { count } = await prisma.radiologyReport.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RadiologyReportDeleteManyArgs>(args?: SelectSubset<T, RadiologyReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RadiologyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RadiologyReports
     * const radiologyReport = await prisma.radiologyReport.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RadiologyReportUpdateManyArgs>(args: SelectSubset<T, RadiologyReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RadiologyReports and returns the data updated in the database.
     * @param {RadiologyReportUpdateManyAndReturnArgs} args - Arguments to update many RadiologyReports.
     * @example
     * // Update many RadiologyReports
     * const radiologyReport = await prisma.radiologyReport.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RadiologyReports and only return the `id`
     * const radiologyReportWithIdOnly = await prisma.radiologyReport.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RadiologyReportUpdateManyAndReturnArgs>(args: SelectSubset<T, RadiologyReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RadiologyReport.
     * @param {RadiologyReportUpsertArgs} args - Arguments to update or create a RadiologyReport.
     * @example
     * // Update or create a RadiologyReport
     * const radiologyReport = await prisma.radiologyReport.upsert({
     *   create: {
     *     // ... data to create a RadiologyReport
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RadiologyReport we want to update
     *   }
     * })
     */
    upsert<T extends RadiologyReportUpsertArgs>(args: SelectSubset<T, RadiologyReportUpsertArgs<ExtArgs>>): Prisma__RadiologyReportClient<$Result.GetResult<Prisma.$RadiologyReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RadiologyReports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportCountArgs} args - Arguments to filter RadiologyReports to count.
     * @example
     * // Count the number of RadiologyReports
     * const count = await prisma.radiologyReport.count({
     *   where: {
     *     // ... the filter for the RadiologyReports we want to count
     *   }
     * })
    **/
    count<T extends RadiologyReportCountArgs>(
      args?: Subset<T, RadiologyReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RadiologyReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RadiologyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RadiologyReportAggregateArgs>(args: Subset<T, RadiologyReportAggregateArgs>): Prisma.PrismaPromise<GetRadiologyReportAggregateType<T>>

    /**
     * Group by RadiologyReport.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RadiologyReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RadiologyReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RadiologyReportGroupByArgs['orderBy'] }
        : { orderBy?: RadiologyReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RadiologyReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRadiologyReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RadiologyReport model
   */
  readonly fields: RadiologyReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RadiologyReport.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RadiologyReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends RadiologyReport$doctorArgs<ExtArgs> = {}>(args?: Subset<T, RadiologyReport$doctorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RadiologyReport model
   */
  interface RadiologyReportFieldRefs {
    readonly id: FieldRef<"RadiologyReport", 'String'>
    readonly patientId: FieldRef<"RadiologyReport", 'String'>
    readonly studyInstanceUid: FieldRef<"RadiologyReport", 'String'>
    readonly studyDate: FieldRef<"RadiologyReport", 'String'>
    readonly accessionNumber: FieldRef<"RadiologyReport", 'String'>
    readonly patientName: FieldRef<"RadiologyReport", 'String'>
    readonly patientSex: FieldRef<"RadiologyReport", 'String'>
    readonly age: FieldRef<"RadiologyReport", 'String'>
    readonly examType: FieldRef<"RadiologyReport", 'String'>
    readonly findings: FieldRef<"RadiologyReport", 'String'>
    readonly measurementImages: FieldRef<"RadiologyReport", 'Json'>
    readonly selectedSeries: FieldRef<"RadiologyReport", 'Json'>
    readonly reportDate: FieldRef<"RadiologyReport", 'String'>
    readonly createdAt: FieldRef<"RadiologyReport", 'DateTime'>
    readonly updatedAt: FieldRef<"RadiologyReport", 'DateTime'>
    readonly doctorId: FieldRef<"RadiologyReport", 'String'>
    readonly doctorName: FieldRef<"RadiologyReport", 'String'>
  }
    

  // Custom InputTypes
  /**
   * RadiologyReport findUnique
   */
  export type RadiologyReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter, which RadiologyReport to fetch.
     */
    where: RadiologyReportWhereUniqueInput
  }

  /**
   * RadiologyReport findUniqueOrThrow
   */
  export type RadiologyReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter, which RadiologyReport to fetch.
     */
    where: RadiologyReportWhereUniqueInput
  }

  /**
   * RadiologyReport findFirst
   */
  export type RadiologyReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter, which RadiologyReport to fetch.
     */
    where?: RadiologyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiologyReports to fetch.
     */
    orderBy?: RadiologyReportOrderByWithRelationInput | RadiologyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RadiologyReports.
     */
    cursor?: RadiologyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiologyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiologyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RadiologyReports.
     */
    distinct?: RadiologyReportScalarFieldEnum | RadiologyReportScalarFieldEnum[]
  }

  /**
   * RadiologyReport findFirstOrThrow
   */
  export type RadiologyReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter, which RadiologyReport to fetch.
     */
    where?: RadiologyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiologyReports to fetch.
     */
    orderBy?: RadiologyReportOrderByWithRelationInput | RadiologyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RadiologyReports.
     */
    cursor?: RadiologyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiologyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiologyReports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RadiologyReports.
     */
    distinct?: RadiologyReportScalarFieldEnum | RadiologyReportScalarFieldEnum[]
  }

  /**
   * RadiologyReport findMany
   */
  export type RadiologyReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter, which RadiologyReports to fetch.
     */
    where?: RadiologyReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RadiologyReports to fetch.
     */
    orderBy?: RadiologyReportOrderByWithRelationInput | RadiologyReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RadiologyReports.
     */
    cursor?: RadiologyReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RadiologyReports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RadiologyReports.
     */
    skip?: number
    distinct?: RadiologyReportScalarFieldEnum | RadiologyReportScalarFieldEnum[]
  }

  /**
   * RadiologyReport create
   */
  export type RadiologyReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * The data needed to create a RadiologyReport.
     */
    data: XOR<RadiologyReportCreateInput, RadiologyReportUncheckedCreateInput>
  }

  /**
   * RadiologyReport createMany
   */
  export type RadiologyReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RadiologyReports.
     */
    data: RadiologyReportCreateManyInput | RadiologyReportCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RadiologyReport createManyAndReturn
   */
  export type RadiologyReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * The data used to create many RadiologyReports.
     */
    data: RadiologyReportCreateManyInput | RadiologyReportCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RadiologyReport update
   */
  export type RadiologyReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * The data needed to update a RadiologyReport.
     */
    data: XOR<RadiologyReportUpdateInput, RadiologyReportUncheckedUpdateInput>
    /**
     * Choose, which RadiologyReport to update.
     */
    where: RadiologyReportWhereUniqueInput
  }

  /**
   * RadiologyReport updateMany
   */
  export type RadiologyReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RadiologyReports.
     */
    data: XOR<RadiologyReportUpdateManyMutationInput, RadiologyReportUncheckedUpdateManyInput>
    /**
     * Filter which RadiologyReports to update
     */
    where?: RadiologyReportWhereInput
    /**
     * Limit how many RadiologyReports to update.
     */
    limit?: number
  }

  /**
   * RadiologyReport updateManyAndReturn
   */
  export type RadiologyReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * The data used to update RadiologyReports.
     */
    data: XOR<RadiologyReportUpdateManyMutationInput, RadiologyReportUncheckedUpdateManyInput>
    /**
     * Filter which RadiologyReports to update
     */
    where?: RadiologyReportWhereInput
    /**
     * Limit how many RadiologyReports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RadiologyReport upsert
   */
  export type RadiologyReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * The filter to search for the RadiologyReport to update in case it exists.
     */
    where: RadiologyReportWhereUniqueInput
    /**
     * In case the RadiologyReport found by the `where` argument doesn't exist, create a new RadiologyReport with this data.
     */
    create: XOR<RadiologyReportCreateInput, RadiologyReportUncheckedCreateInput>
    /**
     * In case the RadiologyReport was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RadiologyReportUpdateInput, RadiologyReportUncheckedUpdateInput>
  }

  /**
   * RadiologyReport delete
   */
  export type RadiologyReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
    /**
     * Filter which RadiologyReport to delete.
     */
    where: RadiologyReportWhereUniqueInput
  }

  /**
   * RadiologyReport deleteMany
   */
  export type RadiologyReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RadiologyReports to delete
     */
    where?: RadiologyReportWhereInput
    /**
     * Limit how many RadiologyReports to delete.
     */
    limit?: number
  }

  /**
   * RadiologyReport.doctor
   */
  export type RadiologyReport$doctorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * RadiologyReport without action
   */
  export type RadiologyReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RadiologyReport
     */
    select?: RadiologyReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RadiologyReport
     */
    omit?: RadiologyReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RadiologyReportInclude<ExtArgs> | null
  }


  /**
   * Model SatuSehatBulkSyncTask
   */

  export type AggregateSatuSehatBulkSyncTask = {
    _count: SatuSehatBulkSyncTaskCountAggregateOutputType | null
    _avg: SatuSehatBulkSyncTaskAvgAggregateOutputType | null
    _sum: SatuSehatBulkSyncTaskSumAggregateOutputType | null
    _min: SatuSehatBulkSyncTaskMinAggregateOutputType | null
    _max: SatuSehatBulkSyncTaskMaxAggregateOutputType | null
  }

  export type SatuSehatBulkSyncTaskAvgAggregateOutputType = {
    totalItems: number | null
    successCount: number | null
    failCount: number | null
  }

  export type SatuSehatBulkSyncTaskSumAggregateOutputType = {
    totalItems: number | null
    successCount: number | null
    failCount: number | null
  }

  export type SatuSehatBulkSyncTaskMinAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    totalItems: number | null
    successCount: number | null
    failCount: number | null
    currentStudyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type SatuSehatBulkSyncTaskMaxAggregateOutputType = {
    id: string | null
    type: string | null
    status: string | null
    totalItems: number | null
    successCount: number | null
    failCount: number | null
    currentStudyId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type SatuSehatBulkSyncTaskCountAggregateOutputType = {
    id: number
    type: number
    status: number
    totalItems: number
    successCount: number
    failCount: number
    currentStudyId: number
    errors: number
    studyIds: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type SatuSehatBulkSyncTaskAvgAggregateInputType = {
    totalItems?: true
    successCount?: true
    failCount?: true
  }

  export type SatuSehatBulkSyncTaskSumAggregateInputType = {
    totalItems?: true
    successCount?: true
    failCount?: true
  }

  export type SatuSehatBulkSyncTaskMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    totalItems?: true
    successCount?: true
    failCount?: true
    currentStudyId?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type SatuSehatBulkSyncTaskMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    totalItems?: true
    successCount?: true
    failCount?: true
    currentStudyId?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type SatuSehatBulkSyncTaskCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    totalItems?: true
    successCount?: true
    failCount?: true
    currentStudyId?: true
    errors?: true
    studyIds?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type SatuSehatBulkSyncTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatBulkSyncTask to aggregate.
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatBulkSyncTasks to fetch.
     */
    orderBy?: SatuSehatBulkSyncTaskOrderByWithRelationInput | SatuSehatBulkSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SatuSehatBulkSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatBulkSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatBulkSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SatuSehatBulkSyncTasks
    **/
    _count?: true | SatuSehatBulkSyncTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SatuSehatBulkSyncTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SatuSehatBulkSyncTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SatuSehatBulkSyncTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SatuSehatBulkSyncTaskMaxAggregateInputType
  }

  export type GetSatuSehatBulkSyncTaskAggregateType<T extends SatuSehatBulkSyncTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateSatuSehatBulkSyncTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSatuSehatBulkSyncTask[P]>
      : GetScalarType<T[P], AggregateSatuSehatBulkSyncTask[P]>
  }




  export type SatuSehatBulkSyncTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SatuSehatBulkSyncTaskWhereInput
    orderBy?: SatuSehatBulkSyncTaskOrderByWithAggregationInput | SatuSehatBulkSyncTaskOrderByWithAggregationInput[]
    by: SatuSehatBulkSyncTaskScalarFieldEnum[] | SatuSehatBulkSyncTaskScalarFieldEnum
    having?: SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SatuSehatBulkSyncTaskCountAggregateInputType | true
    _avg?: SatuSehatBulkSyncTaskAvgAggregateInputType
    _sum?: SatuSehatBulkSyncTaskSumAggregateInputType
    _min?: SatuSehatBulkSyncTaskMinAggregateInputType
    _max?: SatuSehatBulkSyncTaskMaxAggregateInputType
  }

  export type SatuSehatBulkSyncTaskGroupByOutputType = {
    id: string
    type: string
    status: string
    totalItems: number
    successCount: number
    failCount: number
    currentStudyId: string | null
    errors: JsonValue | null
    studyIds: JsonValue
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: SatuSehatBulkSyncTaskCountAggregateOutputType | null
    _avg: SatuSehatBulkSyncTaskAvgAggregateOutputType | null
    _sum: SatuSehatBulkSyncTaskSumAggregateOutputType | null
    _min: SatuSehatBulkSyncTaskMinAggregateOutputType | null
    _max: SatuSehatBulkSyncTaskMaxAggregateOutputType | null
  }

  type GetSatuSehatBulkSyncTaskGroupByPayload<T extends SatuSehatBulkSyncTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SatuSehatBulkSyncTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SatuSehatBulkSyncTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SatuSehatBulkSyncTaskGroupByOutputType[P]>
            : GetScalarType<T[P], SatuSehatBulkSyncTaskGroupByOutputType[P]>
        }
      >
    >


  export type SatuSehatBulkSyncTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    totalItems?: boolean
    successCount?: boolean
    failCount?: boolean
    currentStudyId?: boolean
    errors?: boolean
    studyIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["satuSehatBulkSyncTask"]>

  export type SatuSehatBulkSyncTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    totalItems?: boolean
    successCount?: boolean
    failCount?: boolean
    currentStudyId?: boolean
    errors?: boolean
    studyIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["satuSehatBulkSyncTask"]>

  export type SatuSehatBulkSyncTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    totalItems?: boolean
    successCount?: boolean
    failCount?: boolean
    currentStudyId?: boolean
    errors?: boolean
    studyIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["satuSehatBulkSyncTask"]>

  export type SatuSehatBulkSyncTaskSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    totalItems?: boolean
    successCount?: boolean
    failCount?: boolean
    currentStudyId?: boolean
    errors?: boolean
    studyIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type SatuSehatBulkSyncTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "totalItems" | "successCount" | "failCount" | "currentStudyId" | "errors" | "studyIds" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["satuSehatBulkSyncTask"]>

  export type $SatuSehatBulkSyncTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SatuSehatBulkSyncTask"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      status: string
      totalItems: number
      successCount: number
      failCount: number
      currentStudyId: string | null
      errors: Prisma.JsonValue | null
      studyIds: Prisma.JsonValue
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["satuSehatBulkSyncTask"]>
    composites: {}
  }

  type SatuSehatBulkSyncTaskGetPayload<S extends boolean | null | undefined | SatuSehatBulkSyncTaskDefaultArgs> = $Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload, S>

  type SatuSehatBulkSyncTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SatuSehatBulkSyncTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SatuSehatBulkSyncTaskCountAggregateInputType | true
    }

  export interface SatuSehatBulkSyncTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SatuSehatBulkSyncTask'], meta: { name: 'SatuSehatBulkSyncTask' } }
    /**
     * Find zero or one SatuSehatBulkSyncTask that matches the filter.
     * @param {SatuSehatBulkSyncTaskFindUniqueArgs} args - Arguments to find a SatuSehatBulkSyncTask
     * @example
     * // Get one SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SatuSehatBulkSyncTaskFindUniqueArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskFindUniqueArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SatuSehatBulkSyncTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SatuSehatBulkSyncTaskFindUniqueOrThrowArgs} args - Arguments to find a SatuSehatBulkSyncTask
     * @example
     * // Get one SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SatuSehatBulkSyncTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatBulkSyncTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskFindFirstArgs} args - Arguments to find a SatuSehatBulkSyncTask
     * @example
     * // Get one SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SatuSehatBulkSyncTaskFindFirstArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskFindFirstArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SatuSehatBulkSyncTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskFindFirstOrThrowArgs} args - Arguments to find a SatuSehatBulkSyncTask
     * @example
     * // Get one SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SatuSehatBulkSyncTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SatuSehatBulkSyncTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTasks = await prisma.satuSehatBulkSyncTask.findMany()
     * 
     * // Get first 10 SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTasks = await prisma.satuSehatBulkSyncTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const satuSehatBulkSyncTaskWithIdOnly = await prisma.satuSehatBulkSyncTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SatuSehatBulkSyncTaskFindManyArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SatuSehatBulkSyncTask.
     * @param {SatuSehatBulkSyncTaskCreateArgs} args - Arguments to create a SatuSehatBulkSyncTask.
     * @example
     * // Create one SatuSehatBulkSyncTask
     * const SatuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.create({
     *   data: {
     *     // ... data to create a SatuSehatBulkSyncTask
     *   }
     * })
     * 
     */
    create<T extends SatuSehatBulkSyncTaskCreateArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskCreateArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SatuSehatBulkSyncTasks.
     * @param {SatuSehatBulkSyncTaskCreateManyArgs} args - Arguments to create many SatuSehatBulkSyncTasks.
     * @example
     * // Create many SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SatuSehatBulkSyncTaskCreateManyArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SatuSehatBulkSyncTasks and returns the data saved in the database.
     * @param {SatuSehatBulkSyncTaskCreateManyAndReturnArgs} args - Arguments to create many SatuSehatBulkSyncTasks.
     * @example
     * // Create many SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SatuSehatBulkSyncTasks and only return the `id`
     * const satuSehatBulkSyncTaskWithIdOnly = await prisma.satuSehatBulkSyncTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SatuSehatBulkSyncTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SatuSehatBulkSyncTask.
     * @param {SatuSehatBulkSyncTaskDeleteArgs} args - Arguments to delete one SatuSehatBulkSyncTask.
     * @example
     * // Delete one SatuSehatBulkSyncTask
     * const SatuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.delete({
     *   where: {
     *     // ... filter to delete one SatuSehatBulkSyncTask
     *   }
     * })
     * 
     */
    delete<T extends SatuSehatBulkSyncTaskDeleteArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskDeleteArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SatuSehatBulkSyncTask.
     * @param {SatuSehatBulkSyncTaskUpdateArgs} args - Arguments to update one SatuSehatBulkSyncTask.
     * @example
     * // Update one SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SatuSehatBulkSyncTaskUpdateArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskUpdateArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SatuSehatBulkSyncTasks.
     * @param {SatuSehatBulkSyncTaskDeleteManyArgs} args - Arguments to filter SatuSehatBulkSyncTasks to delete.
     * @example
     * // Delete a few SatuSehatBulkSyncTasks
     * const { count } = await prisma.satuSehatBulkSyncTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SatuSehatBulkSyncTaskDeleteManyArgs>(args?: SelectSubset<T, SatuSehatBulkSyncTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatBulkSyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SatuSehatBulkSyncTaskUpdateManyArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SatuSehatBulkSyncTasks and returns the data updated in the database.
     * @param {SatuSehatBulkSyncTaskUpdateManyAndReturnArgs} args - Arguments to update many SatuSehatBulkSyncTasks.
     * @example
     * // Update many SatuSehatBulkSyncTasks
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SatuSehatBulkSyncTasks and only return the `id`
     * const satuSehatBulkSyncTaskWithIdOnly = await prisma.satuSehatBulkSyncTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SatuSehatBulkSyncTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SatuSehatBulkSyncTask.
     * @param {SatuSehatBulkSyncTaskUpsertArgs} args - Arguments to update or create a SatuSehatBulkSyncTask.
     * @example
     * // Update or create a SatuSehatBulkSyncTask
     * const satuSehatBulkSyncTask = await prisma.satuSehatBulkSyncTask.upsert({
     *   create: {
     *     // ... data to create a SatuSehatBulkSyncTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SatuSehatBulkSyncTask we want to update
     *   }
     * })
     */
    upsert<T extends SatuSehatBulkSyncTaskUpsertArgs>(args: SelectSubset<T, SatuSehatBulkSyncTaskUpsertArgs<ExtArgs>>): Prisma__SatuSehatBulkSyncTaskClient<$Result.GetResult<Prisma.$SatuSehatBulkSyncTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SatuSehatBulkSyncTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskCountArgs} args - Arguments to filter SatuSehatBulkSyncTasks to count.
     * @example
     * // Count the number of SatuSehatBulkSyncTasks
     * const count = await prisma.satuSehatBulkSyncTask.count({
     *   where: {
     *     // ... the filter for the SatuSehatBulkSyncTasks we want to count
     *   }
     * })
    **/
    count<T extends SatuSehatBulkSyncTaskCountArgs>(
      args?: Subset<T, SatuSehatBulkSyncTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SatuSehatBulkSyncTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SatuSehatBulkSyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SatuSehatBulkSyncTaskAggregateArgs>(args: Subset<T, SatuSehatBulkSyncTaskAggregateArgs>): Prisma.PrismaPromise<GetSatuSehatBulkSyncTaskAggregateType<T>>

    /**
     * Group by SatuSehatBulkSyncTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SatuSehatBulkSyncTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SatuSehatBulkSyncTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SatuSehatBulkSyncTaskGroupByArgs['orderBy'] }
        : { orderBy?: SatuSehatBulkSyncTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SatuSehatBulkSyncTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSatuSehatBulkSyncTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SatuSehatBulkSyncTask model
   */
  readonly fields: SatuSehatBulkSyncTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SatuSehatBulkSyncTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SatuSehatBulkSyncTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SatuSehatBulkSyncTask model
   */
  interface SatuSehatBulkSyncTaskFieldRefs {
    readonly id: FieldRef<"SatuSehatBulkSyncTask", 'String'>
    readonly type: FieldRef<"SatuSehatBulkSyncTask", 'String'>
    readonly status: FieldRef<"SatuSehatBulkSyncTask", 'String'>
    readonly totalItems: FieldRef<"SatuSehatBulkSyncTask", 'Int'>
    readonly successCount: FieldRef<"SatuSehatBulkSyncTask", 'Int'>
    readonly failCount: FieldRef<"SatuSehatBulkSyncTask", 'Int'>
    readonly currentStudyId: FieldRef<"SatuSehatBulkSyncTask", 'String'>
    readonly errors: FieldRef<"SatuSehatBulkSyncTask", 'Json'>
    readonly studyIds: FieldRef<"SatuSehatBulkSyncTask", 'Json'>
    readonly createdAt: FieldRef<"SatuSehatBulkSyncTask", 'DateTime'>
    readonly updatedAt: FieldRef<"SatuSehatBulkSyncTask", 'DateTime'>
    readonly completedAt: FieldRef<"SatuSehatBulkSyncTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SatuSehatBulkSyncTask findUnique
   */
  export type SatuSehatBulkSyncTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatBulkSyncTask to fetch.
     */
    where: SatuSehatBulkSyncTaskWhereUniqueInput
  }

  /**
   * SatuSehatBulkSyncTask findUniqueOrThrow
   */
  export type SatuSehatBulkSyncTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatBulkSyncTask to fetch.
     */
    where: SatuSehatBulkSyncTaskWhereUniqueInput
  }

  /**
   * SatuSehatBulkSyncTask findFirst
   */
  export type SatuSehatBulkSyncTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatBulkSyncTask to fetch.
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatBulkSyncTasks to fetch.
     */
    orderBy?: SatuSehatBulkSyncTaskOrderByWithRelationInput | SatuSehatBulkSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatBulkSyncTasks.
     */
    cursor?: SatuSehatBulkSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatBulkSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatBulkSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatBulkSyncTasks.
     */
    distinct?: SatuSehatBulkSyncTaskScalarFieldEnum | SatuSehatBulkSyncTaskScalarFieldEnum[]
  }

  /**
   * SatuSehatBulkSyncTask findFirstOrThrow
   */
  export type SatuSehatBulkSyncTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatBulkSyncTask to fetch.
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatBulkSyncTasks to fetch.
     */
    orderBy?: SatuSehatBulkSyncTaskOrderByWithRelationInput | SatuSehatBulkSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SatuSehatBulkSyncTasks.
     */
    cursor?: SatuSehatBulkSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatBulkSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatBulkSyncTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SatuSehatBulkSyncTasks.
     */
    distinct?: SatuSehatBulkSyncTaskScalarFieldEnum | SatuSehatBulkSyncTaskScalarFieldEnum[]
  }

  /**
   * SatuSehatBulkSyncTask findMany
   */
  export type SatuSehatBulkSyncTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter, which SatuSehatBulkSyncTasks to fetch.
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SatuSehatBulkSyncTasks to fetch.
     */
    orderBy?: SatuSehatBulkSyncTaskOrderByWithRelationInput | SatuSehatBulkSyncTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SatuSehatBulkSyncTasks.
     */
    cursor?: SatuSehatBulkSyncTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SatuSehatBulkSyncTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SatuSehatBulkSyncTasks.
     */
    skip?: number
    distinct?: SatuSehatBulkSyncTaskScalarFieldEnum | SatuSehatBulkSyncTaskScalarFieldEnum[]
  }

  /**
   * SatuSehatBulkSyncTask create
   */
  export type SatuSehatBulkSyncTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * The data needed to create a SatuSehatBulkSyncTask.
     */
    data: XOR<SatuSehatBulkSyncTaskCreateInput, SatuSehatBulkSyncTaskUncheckedCreateInput>
  }

  /**
   * SatuSehatBulkSyncTask createMany
   */
  export type SatuSehatBulkSyncTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SatuSehatBulkSyncTasks.
     */
    data: SatuSehatBulkSyncTaskCreateManyInput | SatuSehatBulkSyncTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatBulkSyncTask createManyAndReturn
   */
  export type SatuSehatBulkSyncTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * The data used to create many SatuSehatBulkSyncTasks.
     */
    data: SatuSehatBulkSyncTaskCreateManyInput | SatuSehatBulkSyncTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SatuSehatBulkSyncTask update
   */
  export type SatuSehatBulkSyncTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * The data needed to update a SatuSehatBulkSyncTask.
     */
    data: XOR<SatuSehatBulkSyncTaskUpdateInput, SatuSehatBulkSyncTaskUncheckedUpdateInput>
    /**
     * Choose, which SatuSehatBulkSyncTask to update.
     */
    where: SatuSehatBulkSyncTaskWhereUniqueInput
  }

  /**
   * SatuSehatBulkSyncTask updateMany
   */
  export type SatuSehatBulkSyncTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SatuSehatBulkSyncTasks.
     */
    data: XOR<SatuSehatBulkSyncTaskUpdateManyMutationInput, SatuSehatBulkSyncTaskUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatBulkSyncTasks to update
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * Limit how many SatuSehatBulkSyncTasks to update.
     */
    limit?: number
  }

  /**
   * SatuSehatBulkSyncTask updateManyAndReturn
   */
  export type SatuSehatBulkSyncTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * The data used to update SatuSehatBulkSyncTasks.
     */
    data: XOR<SatuSehatBulkSyncTaskUpdateManyMutationInput, SatuSehatBulkSyncTaskUncheckedUpdateManyInput>
    /**
     * Filter which SatuSehatBulkSyncTasks to update
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * Limit how many SatuSehatBulkSyncTasks to update.
     */
    limit?: number
  }

  /**
   * SatuSehatBulkSyncTask upsert
   */
  export type SatuSehatBulkSyncTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * The filter to search for the SatuSehatBulkSyncTask to update in case it exists.
     */
    where: SatuSehatBulkSyncTaskWhereUniqueInput
    /**
     * In case the SatuSehatBulkSyncTask found by the `where` argument doesn't exist, create a new SatuSehatBulkSyncTask with this data.
     */
    create: XOR<SatuSehatBulkSyncTaskCreateInput, SatuSehatBulkSyncTaskUncheckedCreateInput>
    /**
     * In case the SatuSehatBulkSyncTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SatuSehatBulkSyncTaskUpdateInput, SatuSehatBulkSyncTaskUncheckedUpdateInput>
  }

  /**
   * SatuSehatBulkSyncTask delete
   */
  export type SatuSehatBulkSyncTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
    /**
     * Filter which SatuSehatBulkSyncTask to delete.
     */
    where: SatuSehatBulkSyncTaskWhereUniqueInput
  }

  /**
   * SatuSehatBulkSyncTask deleteMany
   */
  export type SatuSehatBulkSyncTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SatuSehatBulkSyncTasks to delete
     */
    where?: SatuSehatBulkSyncTaskWhereInput
    /**
     * Limit how many SatuSehatBulkSyncTasks to delete.
     */
    limit?: number
  }

  /**
   * SatuSehatBulkSyncTask without action
   */
  export type SatuSehatBulkSyncTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SatuSehatBulkSyncTask
     */
    select?: SatuSehatBulkSyncTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SatuSehatBulkSyncTask
     */
    omit?: SatuSehatBulkSyncTaskOmit<ExtArgs> | null
  }


  /**
   * Model ReportExportTask
   */

  export type AggregateReportExportTask = {
    _count: ReportExportTaskCountAggregateOutputType | null
    _avg: ReportExportTaskAvgAggregateOutputType | null
    _sum: ReportExportTaskSumAggregateOutputType | null
    _min: ReportExportTaskMinAggregateOutputType | null
    _max: ReportExportTaskMaxAggregateOutputType | null
  }

  export type ReportExportTaskAvgAggregateOutputType = {
    totalItems: number | null
    processedCount: number | null
  }

  export type ReportExportTaskSumAggregateOutputType = {
    totalItems: number | null
    processedCount: number | null
  }

  export type ReportExportTaskMinAggregateOutputType = {
    id: string | null
    status: string | null
    totalItems: number | null
    processedCount: number | null
    fileUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type ReportExportTaskMaxAggregateOutputType = {
    id: string | null
    status: string | null
    totalItems: number | null
    processedCount: number | null
    fileUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
    completedAt: Date | null
  }

  export type ReportExportTaskCountAggregateOutputType = {
    id: number
    status: number
    totalItems: number
    processedCount: number
    fileUrl: number
    filters: number
    reportIds: number
    createdAt: number
    updatedAt: number
    completedAt: number
    _all: number
  }


  export type ReportExportTaskAvgAggregateInputType = {
    totalItems?: true
    processedCount?: true
  }

  export type ReportExportTaskSumAggregateInputType = {
    totalItems?: true
    processedCount?: true
  }

  export type ReportExportTaskMinAggregateInputType = {
    id?: true
    status?: true
    totalItems?: true
    processedCount?: true
    fileUrl?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type ReportExportTaskMaxAggregateInputType = {
    id?: true
    status?: true
    totalItems?: true
    processedCount?: true
    fileUrl?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
  }

  export type ReportExportTaskCountAggregateInputType = {
    id?: true
    status?: true
    totalItems?: true
    processedCount?: true
    fileUrl?: true
    filters?: true
    reportIds?: true
    createdAt?: true
    updatedAt?: true
    completedAt?: true
    _all?: true
  }

  export type ReportExportTaskAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportExportTask to aggregate.
     */
    where?: ReportExportTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportExportTasks to fetch.
     */
    orderBy?: ReportExportTaskOrderByWithRelationInput | ReportExportTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportExportTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportExportTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportExportTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportExportTasks
    **/
    _count?: true | ReportExportTaskCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReportExportTaskAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportExportTaskSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportExportTaskMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportExportTaskMaxAggregateInputType
  }

  export type GetReportExportTaskAggregateType<T extends ReportExportTaskAggregateArgs> = {
        [P in keyof T & keyof AggregateReportExportTask]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportExportTask[P]>
      : GetScalarType<T[P], AggregateReportExportTask[P]>
  }




  export type ReportExportTaskGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportExportTaskWhereInput
    orderBy?: ReportExportTaskOrderByWithAggregationInput | ReportExportTaskOrderByWithAggregationInput[]
    by: ReportExportTaskScalarFieldEnum[] | ReportExportTaskScalarFieldEnum
    having?: ReportExportTaskScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportExportTaskCountAggregateInputType | true
    _avg?: ReportExportTaskAvgAggregateInputType
    _sum?: ReportExportTaskSumAggregateInputType
    _min?: ReportExportTaskMinAggregateInputType
    _max?: ReportExportTaskMaxAggregateInputType
  }

  export type ReportExportTaskGroupByOutputType = {
    id: string
    status: string
    totalItems: number
    processedCount: number
    fileUrl: string | null
    filters: JsonValue | null
    reportIds: JsonValue | null
    createdAt: Date
    updatedAt: Date
    completedAt: Date | null
    _count: ReportExportTaskCountAggregateOutputType | null
    _avg: ReportExportTaskAvgAggregateOutputType | null
    _sum: ReportExportTaskSumAggregateOutputType | null
    _min: ReportExportTaskMinAggregateOutputType | null
    _max: ReportExportTaskMaxAggregateOutputType | null
  }

  type GetReportExportTaskGroupByPayload<T extends ReportExportTaskGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportExportTaskGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportExportTaskGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportExportTaskGroupByOutputType[P]>
            : GetScalarType<T[P], ReportExportTaskGroupByOutputType[P]>
        }
      >
    >


  export type ReportExportTaskSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    totalItems?: boolean
    processedCount?: boolean
    fileUrl?: boolean
    filters?: boolean
    reportIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["reportExportTask"]>

  export type ReportExportTaskSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    totalItems?: boolean
    processedCount?: boolean
    fileUrl?: boolean
    filters?: boolean
    reportIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["reportExportTask"]>

  export type ReportExportTaskSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    status?: boolean
    totalItems?: boolean
    processedCount?: boolean
    fileUrl?: boolean
    filters?: boolean
    reportIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }, ExtArgs["result"]["reportExportTask"]>

  export type ReportExportTaskSelectScalar = {
    id?: boolean
    status?: boolean
    totalItems?: boolean
    processedCount?: boolean
    fileUrl?: boolean
    filters?: boolean
    reportIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    completedAt?: boolean
  }

  export type ReportExportTaskOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "status" | "totalItems" | "processedCount" | "fileUrl" | "filters" | "reportIds" | "createdAt" | "updatedAt" | "completedAt", ExtArgs["result"]["reportExportTask"]>

  export type $ReportExportTaskPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ReportExportTask"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: string
      totalItems: number
      processedCount: number
      fileUrl: string | null
      filters: Prisma.JsonValue | null
      reportIds: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["reportExportTask"]>
    composites: {}
  }

  type ReportExportTaskGetPayload<S extends boolean | null | undefined | ReportExportTaskDefaultArgs> = $Result.GetResult<Prisma.$ReportExportTaskPayload, S>

  type ReportExportTaskCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportExportTaskFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportExportTaskCountAggregateInputType | true
    }

  export interface ReportExportTaskDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ReportExportTask'], meta: { name: 'ReportExportTask' } }
    /**
     * Find zero or one ReportExportTask that matches the filter.
     * @param {ReportExportTaskFindUniqueArgs} args - Arguments to find a ReportExportTask
     * @example
     * // Get one ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportExportTaskFindUniqueArgs>(args: SelectSubset<T, ReportExportTaskFindUniqueArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ReportExportTask that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportExportTaskFindUniqueOrThrowArgs} args - Arguments to find a ReportExportTask
     * @example
     * // Get one ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportExportTaskFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportExportTaskFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportExportTask that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskFindFirstArgs} args - Arguments to find a ReportExportTask
     * @example
     * // Get one ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportExportTaskFindFirstArgs>(args?: SelectSubset<T, ReportExportTaskFindFirstArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ReportExportTask that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskFindFirstOrThrowArgs} args - Arguments to find a ReportExportTask
     * @example
     * // Get one ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportExportTaskFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportExportTaskFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ReportExportTasks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportExportTasks
     * const reportExportTasks = await prisma.reportExportTask.findMany()
     * 
     * // Get first 10 ReportExportTasks
     * const reportExportTasks = await prisma.reportExportTask.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportExportTaskWithIdOnly = await prisma.reportExportTask.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportExportTaskFindManyArgs>(args?: SelectSubset<T, ReportExportTaskFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ReportExportTask.
     * @param {ReportExportTaskCreateArgs} args - Arguments to create a ReportExportTask.
     * @example
     * // Create one ReportExportTask
     * const ReportExportTask = await prisma.reportExportTask.create({
     *   data: {
     *     // ... data to create a ReportExportTask
     *   }
     * })
     * 
     */
    create<T extends ReportExportTaskCreateArgs>(args: SelectSubset<T, ReportExportTaskCreateArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ReportExportTasks.
     * @param {ReportExportTaskCreateManyArgs} args - Arguments to create many ReportExportTasks.
     * @example
     * // Create many ReportExportTasks
     * const reportExportTask = await prisma.reportExportTask.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportExportTaskCreateManyArgs>(args?: SelectSubset<T, ReportExportTaskCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ReportExportTasks and returns the data saved in the database.
     * @param {ReportExportTaskCreateManyAndReturnArgs} args - Arguments to create many ReportExportTasks.
     * @example
     * // Create many ReportExportTasks
     * const reportExportTask = await prisma.reportExportTask.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ReportExportTasks and only return the `id`
     * const reportExportTaskWithIdOnly = await prisma.reportExportTask.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportExportTaskCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportExportTaskCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ReportExportTask.
     * @param {ReportExportTaskDeleteArgs} args - Arguments to delete one ReportExportTask.
     * @example
     * // Delete one ReportExportTask
     * const ReportExportTask = await prisma.reportExportTask.delete({
     *   where: {
     *     // ... filter to delete one ReportExportTask
     *   }
     * })
     * 
     */
    delete<T extends ReportExportTaskDeleteArgs>(args: SelectSubset<T, ReportExportTaskDeleteArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ReportExportTask.
     * @param {ReportExportTaskUpdateArgs} args - Arguments to update one ReportExportTask.
     * @example
     * // Update one ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportExportTaskUpdateArgs>(args: SelectSubset<T, ReportExportTaskUpdateArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ReportExportTasks.
     * @param {ReportExportTaskDeleteManyArgs} args - Arguments to filter ReportExportTasks to delete.
     * @example
     * // Delete a few ReportExportTasks
     * const { count } = await prisma.reportExportTask.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportExportTaskDeleteManyArgs>(args?: SelectSubset<T, ReportExportTaskDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportExportTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportExportTasks
     * const reportExportTask = await prisma.reportExportTask.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportExportTaskUpdateManyArgs>(args: SelectSubset<T, ReportExportTaskUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportExportTasks and returns the data updated in the database.
     * @param {ReportExportTaskUpdateManyAndReturnArgs} args - Arguments to update many ReportExportTasks.
     * @example
     * // Update many ReportExportTasks
     * const reportExportTask = await prisma.reportExportTask.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ReportExportTasks and only return the `id`
     * const reportExportTaskWithIdOnly = await prisma.reportExportTask.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportExportTaskUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportExportTaskUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ReportExportTask.
     * @param {ReportExportTaskUpsertArgs} args - Arguments to update or create a ReportExportTask.
     * @example
     * // Update or create a ReportExportTask
     * const reportExportTask = await prisma.reportExportTask.upsert({
     *   create: {
     *     // ... data to create a ReportExportTask
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportExportTask we want to update
     *   }
     * })
     */
    upsert<T extends ReportExportTaskUpsertArgs>(args: SelectSubset<T, ReportExportTaskUpsertArgs<ExtArgs>>): Prisma__ReportExportTaskClient<$Result.GetResult<Prisma.$ReportExportTaskPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ReportExportTasks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskCountArgs} args - Arguments to filter ReportExportTasks to count.
     * @example
     * // Count the number of ReportExportTasks
     * const count = await prisma.reportExportTask.count({
     *   where: {
     *     // ... the filter for the ReportExportTasks we want to count
     *   }
     * })
    **/
    count<T extends ReportExportTaskCountArgs>(
      args?: Subset<T, ReportExportTaskCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportExportTaskCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportExportTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportExportTaskAggregateArgs>(args: Subset<T, ReportExportTaskAggregateArgs>): Prisma.PrismaPromise<GetReportExportTaskAggregateType<T>>

    /**
     * Group by ReportExportTask.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportExportTaskGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportExportTaskGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportExportTaskGroupByArgs['orderBy'] }
        : { orderBy?: ReportExportTaskGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportExportTaskGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportExportTaskGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ReportExportTask model
   */
  readonly fields: ReportExportTaskFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportExportTask.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportExportTaskClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ReportExportTask model
   */
  interface ReportExportTaskFieldRefs {
    readonly id: FieldRef<"ReportExportTask", 'String'>
    readonly status: FieldRef<"ReportExportTask", 'String'>
    readonly totalItems: FieldRef<"ReportExportTask", 'Int'>
    readonly processedCount: FieldRef<"ReportExportTask", 'Int'>
    readonly fileUrl: FieldRef<"ReportExportTask", 'String'>
    readonly filters: FieldRef<"ReportExportTask", 'Json'>
    readonly reportIds: FieldRef<"ReportExportTask", 'Json'>
    readonly createdAt: FieldRef<"ReportExportTask", 'DateTime'>
    readonly updatedAt: FieldRef<"ReportExportTask", 'DateTime'>
    readonly completedAt: FieldRef<"ReportExportTask", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ReportExportTask findUnique
   */
  export type ReportExportTaskFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter, which ReportExportTask to fetch.
     */
    where: ReportExportTaskWhereUniqueInput
  }

  /**
   * ReportExportTask findUniqueOrThrow
   */
  export type ReportExportTaskFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter, which ReportExportTask to fetch.
     */
    where: ReportExportTaskWhereUniqueInput
  }

  /**
   * ReportExportTask findFirst
   */
  export type ReportExportTaskFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter, which ReportExportTask to fetch.
     */
    where?: ReportExportTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportExportTasks to fetch.
     */
    orderBy?: ReportExportTaskOrderByWithRelationInput | ReportExportTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportExportTasks.
     */
    cursor?: ReportExportTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportExportTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportExportTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportExportTasks.
     */
    distinct?: ReportExportTaskScalarFieldEnum | ReportExportTaskScalarFieldEnum[]
  }

  /**
   * ReportExportTask findFirstOrThrow
   */
  export type ReportExportTaskFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter, which ReportExportTask to fetch.
     */
    where?: ReportExportTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportExportTasks to fetch.
     */
    orderBy?: ReportExportTaskOrderByWithRelationInput | ReportExportTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportExportTasks.
     */
    cursor?: ReportExportTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportExportTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportExportTasks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportExportTasks.
     */
    distinct?: ReportExportTaskScalarFieldEnum | ReportExportTaskScalarFieldEnum[]
  }

  /**
   * ReportExportTask findMany
   */
  export type ReportExportTaskFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter, which ReportExportTasks to fetch.
     */
    where?: ReportExportTaskWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportExportTasks to fetch.
     */
    orderBy?: ReportExportTaskOrderByWithRelationInput | ReportExportTaskOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportExportTasks.
     */
    cursor?: ReportExportTaskWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportExportTasks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportExportTasks.
     */
    skip?: number
    distinct?: ReportExportTaskScalarFieldEnum | ReportExportTaskScalarFieldEnum[]
  }

  /**
   * ReportExportTask create
   */
  export type ReportExportTaskCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * The data needed to create a ReportExportTask.
     */
    data: XOR<ReportExportTaskCreateInput, ReportExportTaskUncheckedCreateInput>
  }

  /**
   * ReportExportTask createMany
   */
  export type ReportExportTaskCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ReportExportTasks.
     */
    data: ReportExportTaskCreateManyInput | ReportExportTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportExportTask createManyAndReturn
   */
  export type ReportExportTaskCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * The data used to create many ReportExportTasks.
     */
    data: ReportExportTaskCreateManyInput | ReportExportTaskCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ReportExportTask update
   */
  export type ReportExportTaskUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * The data needed to update a ReportExportTask.
     */
    data: XOR<ReportExportTaskUpdateInput, ReportExportTaskUncheckedUpdateInput>
    /**
     * Choose, which ReportExportTask to update.
     */
    where: ReportExportTaskWhereUniqueInput
  }

  /**
   * ReportExportTask updateMany
   */
  export type ReportExportTaskUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ReportExportTasks.
     */
    data: XOR<ReportExportTaskUpdateManyMutationInput, ReportExportTaskUncheckedUpdateManyInput>
    /**
     * Filter which ReportExportTasks to update
     */
    where?: ReportExportTaskWhereInput
    /**
     * Limit how many ReportExportTasks to update.
     */
    limit?: number
  }

  /**
   * ReportExportTask updateManyAndReturn
   */
  export type ReportExportTaskUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * The data used to update ReportExportTasks.
     */
    data: XOR<ReportExportTaskUpdateManyMutationInput, ReportExportTaskUncheckedUpdateManyInput>
    /**
     * Filter which ReportExportTasks to update
     */
    where?: ReportExportTaskWhereInput
    /**
     * Limit how many ReportExportTasks to update.
     */
    limit?: number
  }

  /**
   * ReportExportTask upsert
   */
  export type ReportExportTaskUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * The filter to search for the ReportExportTask to update in case it exists.
     */
    where: ReportExportTaskWhereUniqueInput
    /**
     * In case the ReportExportTask found by the `where` argument doesn't exist, create a new ReportExportTask with this data.
     */
    create: XOR<ReportExportTaskCreateInput, ReportExportTaskUncheckedCreateInput>
    /**
     * In case the ReportExportTask was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportExportTaskUpdateInput, ReportExportTaskUncheckedUpdateInput>
  }

  /**
   * ReportExportTask delete
   */
  export type ReportExportTaskDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
    /**
     * Filter which ReportExportTask to delete.
     */
    where: ReportExportTaskWhereUniqueInput
  }

  /**
   * ReportExportTask deleteMany
   */
  export type ReportExportTaskDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ReportExportTasks to delete
     */
    where?: ReportExportTaskWhereInput
    /**
     * Limit how many ReportExportTasks to delete.
     */
    limit?: number
  }

  /**
   * ReportExportTask without action
   */
  export type ReportExportTaskDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportExportTask
     */
    select?: ReportExportTaskSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ReportExportTask
     */
    omit?: ReportExportTaskOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    emailVerified: 'emailVerified',
    image: 'image',
    signature: 'signature',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    roleId: 'roleId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum]


  export const PermissionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    provider: 'provider',
    providerAccountId: 'providerAccountId',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 'expires_at',
    token_type: 'token_type',
    scope: 'scope',
    id_token: 'id_token',
    session_state: 'session_state'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const AppConfigScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type AppConfigScalarFieldEnum = (typeof AppConfigScalarFieldEnum)[keyof typeof AppConfigScalarFieldEnum]


  export const AiResultScalarFieldEnum: {
    studyInstanceUid: 'studyInstanceUid',
    modality: 'modality',
    conclusion: 'conclusion',
    findings: 'findings',
    isUrgent: 'isUrgent',
    heatmapPath: 'heatmapPath',
    heatmapBase64: 'heatmapBase64',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AiResultScalarFieldEnum = (typeof AiResultScalarFieldEnum)[keyof typeof AiResultScalarFieldEnum]


  export const SatuSehatIntegrationScalarFieldEnum: {
    accessionNumber: 'accessionNumber',
    studyInstanceUid: 'studyInstanceUid',
    satusehatId: 'satusehatId',
    patientNik: 'patientNik',
    status: 'status',
    error: 'error',
    bundleResponse: 'bundleResponse',
    syncedAt: 'syncedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SatuSehatIntegrationScalarFieldEnum = (typeof SatuSehatIntegrationScalarFieldEnum)[keyof typeof SatuSehatIntegrationScalarFieldEnum]


  export const SatuSehatWebhookLogScalarFieldEnum: {
    id: 'id',
    studyInstanceUid: 'studyInstanceUid',
    patientName: 'patientName',
    status: 'status',
    message: 'message',
    errorDetail: 'errorDetail',
    rawPayload: 'rawPayload',
    createdAt: 'createdAt'
  };

  export type SatuSehatWebhookLogScalarFieldEnum = (typeof SatuSehatWebhookLogScalarFieldEnum)[keyof typeof SatuSehatWebhookLogScalarFieldEnum]


  export const SatuSehatSettingScalarFieldEnum: {
    id: 'id',
    environment: 'environment',
    stgOrganizationId: 'stgOrganizationId',
    stgClientId: 'stgClientId',
    stgClientSecret: 'stgClientSecret',
    stgAuthUrl: 'stgAuthUrl',
    stgBaseUrl: 'stgBaseUrl',
    prdOrganizationId: 'prdOrganizationId',
    prdClientId: 'prdClientId',
    prdClientSecret: 'prdClientSecret',
    prdAuthUrl: 'prdAuthUrl',
    prdBaseUrl: 'prdBaseUrl',
    organizationId: 'organizationId',
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    authUrl: 'authUrl',
    baseUrl: 'baseUrl',
    encounterUrl: 'encounterUrl',
    conditionUrl: 'conditionUrl',
    serviceRequestUrl: 'serviceRequestUrl',
    imagingStudyUrl: 'imagingStudyUrl',
    observationUrl: 'observationUrl',
    diagnosticReportUrl: 'diagnosticReportUrl',
    compositionUrl: 'compositionUrl',
    patientUrl: 'patientUrl',
    locationUrl: 'locationUrl',
    practitionerUrl: 'practitionerUrl',
    defaultPatientId: 'defaultPatientId',
    defaultPractitionerId: 'defaultPractitionerId',
    patientIdSource: 'patientIdSource',
    isActive: 'isActive',
    updatedAt: 'updatedAt',
    autoSyncEnabled: 'autoSyncEnabled',
    autoSyncFrequency: 'autoSyncFrequency',
    autoSyncTime: 'autoSyncTime',
    lastAutoSyncAt: 'lastAutoSyncAt',
    sendImageStudyFromWeb: 'sendImageStudyFromWeb'
  };

  export type SatuSehatSettingScalarFieldEnum = (typeof SatuSehatSettingScalarFieldEnum)[keyof typeof SatuSehatSettingScalarFieldEnum]


  export const SatuSehatResourceLogScalarFieldEnum: {
    id: 'id',
    resourceType: 'resourceType',
    resourceId: 'resourceId',
    accessionNumber: 'accessionNumber',
    studyInstanceUid: 'studyInstanceUid',
    method: 'method',
    status: 'status',
    responseCode: 'responseCode',
    responseBody: 'responseBody',
    environment: 'environment',
    createdAt: 'createdAt'
  };

  export type SatuSehatResourceLogScalarFieldEnum = (typeof SatuSehatResourceLogScalarFieldEnum)[keyof typeof SatuSehatResourceLogScalarFieldEnum]


  export const ModalityConnectionScalarFieldEnum: {
    id: 'id',
    aeTitle: 'aeTitle',
    ipAddress: 'ipAddress',
    event: 'event',
    timestamp: 'timestamp'
  };

  export type ModalityConnectionScalarFieldEnum = (typeof ModalityConnectionScalarFieldEnum)[keyof typeof ModalityConnectionScalarFieldEnum]


  export const RadiologyReportScalarFieldEnum: {
    id: 'id',
    patientId: 'patientId',
    studyInstanceUid: 'studyInstanceUid',
    studyDate: 'studyDate',
    accessionNumber: 'accessionNumber',
    patientName: 'patientName',
    patientSex: 'patientSex',
    age: 'age',
    examType: 'examType',
    findings: 'findings',
    measurementImages: 'measurementImages',
    selectedSeries: 'selectedSeries',
    reportDate: 'reportDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    doctorId: 'doctorId',
    doctorName: 'doctorName'
  };

  export type RadiologyReportScalarFieldEnum = (typeof RadiologyReportScalarFieldEnum)[keyof typeof RadiologyReportScalarFieldEnum]


  export const SatuSehatBulkSyncTaskScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    totalItems: 'totalItems',
    successCount: 'successCount',
    failCount: 'failCount',
    currentStudyId: 'currentStudyId',
    errors: 'errors',
    studyIds: 'studyIds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type SatuSehatBulkSyncTaskScalarFieldEnum = (typeof SatuSehatBulkSyncTaskScalarFieldEnum)[keyof typeof SatuSehatBulkSyncTaskScalarFieldEnum]


  export const ReportExportTaskScalarFieldEnum: {
    id: 'id',
    status: 'status',
    totalItems: 'totalItems',
    processedCount: 'processedCount',
    fileUrl: 'fileUrl',
    filters: 'filters',
    reportIds: 'reportIds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    completedAt: 'completedAt'
  };

  export type ReportExportTaskScalarFieldEnum = (typeof ReportExportTaskScalarFieldEnum)[keyof typeof ReportExportTaskScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    signature?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    roleId?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    reports?: RadiologyReportListRelationFilter
    sessions?: SessionListRelationFilter
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roleId?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    reports?: RadiologyReportOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    role?: RoleOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    signature?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    roleId?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    reports?: RadiologyReportListRelationFilter
    sessions?: SessionListRelationFilter
    role?: XOR<RoleNullableScalarRelationFilter, RoleWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    signature?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roleId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    signature?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    roleId?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RoleWhereInput = {
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: PermissionListRelationFilter
  }

  export type RoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    permissions?: PermissionOrderByRelationAggregateInput
  }

  export type RoleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: RoleWhereInput | RoleWhereInput[]
    OR?: RoleWhereInput[]
    NOT?: RoleWhereInput | RoleWhereInput[]
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
    users?: UserListRelationFilter
    permissions?: PermissionListRelationFilter
  }, "id" | "name">

  export type RoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoleCountOrderByAggregateInput
    _max?: RoleMaxOrderByAggregateInput
    _min?: RoleMinOrderByAggregateInput
  }

  export type RoleScalarWhereWithAggregatesInput = {
    AND?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    OR?: RoleScalarWhereWithAggregatesInput[]
    NOT?: RoleScalarWhereWithAggregatesInput | RoleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Role"> | string
    name?: StringWithAggregatesFilter<"Role"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Role"> | Date | string
  }

  export type PermissionWhereInput = {
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }

  export type PermissionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RoleOrderByRelationAggregateInput
  }

  export type PermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: PermissionWhereInput | PermissionWhereInput[]
    OR?: PermissionWhereInput[]
    NOT?: PermissionWhereInput | PermissionWhereInput[]
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
    roles?: RoleListRelationFilter
  }, "id" | "name">

  export type PermissionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PermissionCountOrderByAggregateInput
    _max?: PermissionMaxOrderByAggregateInput
    _min?: PermissionMinOrderByAggregateInput
  }

  export type PermissionScalarWhereWithAggregatesInput = {
    AND?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    OR?: PermissionScalarWhereWithAggregatesInput[]
    NOT?: PermissionScalarWhereWithAggregatesInput | PermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permission"> | string
    name?: StringWithAggregatesFilter<"Permission"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Permission"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type AppConfigWhereInput = {
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    key?: StringFilter<"AppConfig"> | string
    value?: StringFilter<"AppConfig"> | string
    updatedAt?: DateTimeFilter<"AppConfig"> | Date | string
  }

  export type AppConfigOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    value?: StringFilter<"AppConfig"> | string
    updatedAt?: DateTimeFilter<"AppConfig"> | Date | string
  }, "key">

  export type AppConfigOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: AppConfigCountOrderByAggregateInput
    _max?: AppConfigMaxOrderByAggregateInput
    _min?: AppConfigMinOrderByAggregateInput
  }

  export type AppConfigScalarWhereWithAggregatesInput = {
    AND?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    OR?: AppConfigScalarWhereWithAggregatesInput[]
    NOT?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppConfig"> | string
    value?: StringWithAggregatesFilter<"AppConfig"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AppConfig"> | Date | string
  }

  export type AiResultWhereInput = {
    AND?: AiResultWhereInput | AiResultWhereInput[]
    OR?: AiResultWhereInput[]
    NOT?: AiResultWhereInput | AiResultWhereInput[]
    studyInstanceUid?: StringFilter<"AiResult"> | string
    modality?: StringFilter<"AiResult"> | string
    conclusion?: StringFilter<"AiResult"> | string
    findings?: JsonFilter<"AiResult">
    isUrgent?: BoolFilter<"AiResult"> | boolean
    heatmapPath?: StringNullableFilter<"AiResult"> | string | null
    heatmapBase64?: StringNullableFilter<"AiResult"> | string | null
    createdAt?: DateTimeFilter<"AiResult"> | Date | string
    updatedAt?: DateTimeFilter<"AiResult"> | Date | string
  }

  export type AiResultOrderByWithRelationInput = {
    studyInstanceUid?: SortOrder
    modality?: SortOrder
    conclusion?: SortOrder
    findings?: SortOrder
    isUrgent?: SortOrder
    heatmapPath?: SortOrderInput | SortOrder
    heatmapBase64?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiResultWhereUniqueInput = Prisma.AtLeast<{
    studyInstanceUid?: string
    AND?: AiResultWhereInput | AiResultWhereInput[]
    OR?: AiResultWhereInput[]
    NOT?: AiResultWhereInput | AiResultWhereInput[]
    modality?: StringFilter<"AiResult"> | string
    conclusion?: StringFilter<"AiResult"> | string
    findings?: JsonFilter<"AiResult">
    isUrgent?: BoolFilter<"AiResult"> | boolean
    heatmapPath?: StringNullableFilter<"AiResult"> | string | null
    heatmapBase64?: StringNullableFilter<"AiResult"> | string | null
    createdAt?: DateTimeFilter<"AiResult"> | Date | string
    updatedAt?: DateTimeFilter<"AiResult"> | Date | string
  }, "studyInstanceUid">

  export type AiResultOrderByWithAggregationInput = {
    studyInstanceUid?: SortOrder
    modality?: SortOrder
    conclusion?: SortOrder
    findings?: SortOrder
    isUrgent?: SortOrder
    heatmapPath?: SortOrderInput | SortOrder
    heatmapBase64?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AiResultCountOrderByAggregateInput
    _max?: AiResultMaxOrderByAggregateInput
    _min?: AiResultMinOrderByAggregateInput
  }

  export type AiResultScalarWhereWithAggregatesInput = {
    AND?: AiResultScalarWhereWithAggregatesInput | AiResultScalarWhereWithAggregatesInput[]
    OR?: AiResultScalarWhereWithAggregatesInput[]
    NOT?: AiResultScalarWhereWithAggregatesInput | AiResultScalarWhereWithAggregatesInput[]
    studyInstanceUid?: StringWithAggregatesFilter<"AiResult"> | string
    modality?: StringWithAggregatesFilter<"AiResult"> | string
    conclusion?: StringWithAggregatesFilter<"AiResult"> | string
    findings?: JsonWithAggregatesFilter<"AiResult">
    isUrgent?: BoolWithAggregatesFilter<"AiResult"> | boolean
    heatmapPath?: StringNullableWithAggregatesFilter<"AiResult"> | string | null
    heatmapBase64?: StringNullableWithAggregatesFilter<"AiResult"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiResult"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AiResult"> | Date | string
  }

  export type SatuSehatIntegrationWhereInput = {
    AND?: SatuSehatIntegrationWhereInput | SatuSehatIntegrationWhereInput[]
    OR?: SatuSehatIntegrationWhereInput[]
    NOT?: SatuSehatIntegrationWhereInput | SatuSehatIntegrationWhereInput[]
    accessionNumber?: StringFilter<"SatuSehatIntegration"> | string
    studyInstanceUid?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    satusehatId?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    patientNik?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    status?: StringFilter<"SatuSehatIntegration"> | string
    error?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    bundleResponse?: JsonNullableFilter<"SatuSehatIntegration">
    syncedAt?: DateTimeNullableFilter<"SatuSehatIntegration"> | Date | string | null
    createdAt?: DateTimeFilter<"SatuSehatIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"SatuSehatIntegration"> | Date | string
  }

  export type SatuSehatIntegrationOrderByWithRelationInput = {
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    satusehatId?: SortOrderInput | SortOrder
    patientNik?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    bundleResponse?: SortOrderInput | SortOrder
    syncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SatuSehatIntegrationWhereUniqueInput = Prisma.AtLeast<{
    accessionNumber?: string
    AND?: SatuSehatIntegrationWhereInput | SatuSehatIntegrationWhereInput[]
    OR?: SatuSehatIntegrationWhereInput[]
    NOT?: SatuSehatIntegrationWhereInput | SatuSehatIntegrationWhereInput[]
    studyInstanceUid?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    satusehatId?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    patientNik?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    status?: StringFilter<"SatuSehatIntegration"> | string
    error?: StringNullableFilter<"SatuSehatIntegration"> | string | null
    bundleResponse?: JsonNullableFilter<"SatuSehatIntegration">
    syncedAt?: DateTimeNullableFilter<"SatuSehatIntegration"> | Date | string | null
    createdAt?: DateTimeFilter<"SatuSehatIntegration"> | Date | string
    updatedAt?: DateTimeFilter<"SatuSehatIntegration"> | Date | string
  }, "accessionNumber">

  export type SatuSehatIntegrationOrderByWithAggregationInput = {
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    satusehatId?: SortOrderInput | SortOrder
    patientNik?: SortOrderInput | SortOrder
    status?: SortOrder
    error?: SortOrderInput | SortOrder
    bundleResponse?: SortOrderInput | SortOrder
    syncedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SatuSehatIntegrationCountOrderByAggregateInput
    _max?: SatuSehatIntegrationMaxOrderByAggregateInput
    _min?: SatuSehatIntegrationMinOrderByAggregateInput
  }

  export type SatuSehatIntegrationScalarWhereWithAggregatesInput = {
    AND?: SatuSehatIntegrationScalarWhereWithAggregatesInput | SatuSehatIntegrationScalarWhereWithAggregatesInput[]
    OR?: SatuSehatIntegrationScalarWhereWithAggregatesInput[]
    NOT?: SatuSehatIntegrationScalarWhereWithAggregatesInput | SatuSehatIntegrationScalarWhereWithAggregatesInput[]
    accessionNumber?: StringWithAggregatesFilter<"SatuSehatIntegration"> | string
    studyInstanceUid?: StringNullableWithAggregatesFilter<"SatuSehatIntegration"> | string | null
    satusehatId?: StringNullableWithAggregatesFilter<"SatuSehatIntegration"> | string | null
    patientNik?: StringNullableWithAggregatesFilter<"SatuSehatIntegration"> | string | null
    status?: StringWithAggregatesFilter<"SatuSehatIntegration"> | string
    error?: StringNullableWithAggregatesFilter<"SatuSehatIntegration"> | string | null
    bundleResponse?: JsonNullableWithAggregatesFilter<"SatuSehatIntegration">
    syncedAt?: DateTimeNullableWithAggregatesFilter<"SatuSehatIntegration"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"SatuSehatIntegration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SatuSehatIntegration"> | Date | string
  }

  export type SatuSehatWebhookLogWhereInput = {
    AND?: SatuSehatWebhookLogWhereInput | SatuSehatWebhookLogWhereInput[]
    OR?: SatuSehatWebhookLogWhereInput[]
    NOT?: SatuSehatWebhookLogWhereInput | SatuSehatWebhookLogWhereInput[]
    id?: StringFilter<"SatuSehatWebhookLog"> | string
    studyInstanceUid?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    patientName?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    status?: StringFilter<"SatuSehatWebhookLog"> | string
    message?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    errorDetail?: JsonNullableFilter<"SatuSehatWebhookLog">
    rawPayload?: JsonNullableFilter<"SatuSehatWebhookLog">
    createdAt?: DateTimeFilter<"SatuSehatWebhookLog"> | Date | string
  }

  export type SatuSehatWebhookLogOrderByWithRelationInput = {
    id?: SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    patientName?: SortOrderInput | SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    errorDetail?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatWebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SatuSehatWebhookLogWhereInput | SatuSehatWebhookLogWhereInput[]
    OR?: SatuSehatWebhookLogWhereInput[]
    NOT?: SatuSehatWebhookLogWhereInput | SatuSehatWebhookLogWhereInput[]
    studyInstanceUid?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    patientName?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    status?: StringFilter<"SatuSehatWebhookLog"> | string
    message?: StringNullableFilter<"SatuSehatWebhookLog"> | string | null
    errorDetail?: JsonNullableFilter<"SatuSehatWebhookLog">
    rawPayload?: JsonNullableFilter<"SatuSehatWebhookLog">
    createdAt?: DateTimeFilter<"SatuSehatWebhookLog"> | Date | string
  }, "id">

  export type SatuSehatWebhookLogOrderByWithAggregationInput = {
    id?: SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    patientName?: SortOrderInput | SortOrder
    status?: SortOrder
    message?: SortOrderInput | SortOrder
    errorDetail?: SortOrderInput | SortOrder
    rawPayload?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SatuSehatWebhookLogCountOrderByAggregateInput
    _max?: SatuSehatWebhookLogMaxOrderByAggregateInput
    _min?: SatuSehatWebhookLogMinOrderByAggregateInput
  }

  export type SatuSehatWebhookLogScalarWhereWithAggregatesInput = {
    AND?: SatuSehatWebhookLogScalarWhereWithAggregatesInput | SatuSehatWebhookLogScalarWhereWithAggregatesInput[]
    OR?: SatuSehatWebhookLogScalarWhereWithAggregatesInput[]
    NOT?: SatuSehatWebhookLogScalarWhereWithAggregatesInput | SatuSehatWebhookLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SatuSehatWebhookLog"> | string
    studyInstanceUid?: StringNullableWithAggregatesFilter<"SatuSehatWebhookLog"> | string | null
    patientName?: StringNullableWithAggregatesFilter<"SatuSehatWebhookLog"> | string | null
    status?: StringWithAggregatesFilter<"SatuSehatWebhookLog"> | string
    message?: StringNullableWithAggregatesFilter<"SatuSehatWebhookLog"> | string | null
    errorDetail?: JsonNullableWithAggregatesFilter<"SatuSehatWebhookLog">
    rawPayload?: JsonNullableWithAggregatesFilter<"SatuSehatWebhookLog">
    createdAt?: DateTimeWithAggregatesFilter<"SatuSehatWebhookLog"> | Date | string
  }

  export type SatuSehatSettingWhereInput = {
    AND?: SatuSehatSettingWhereInput | SatuSehatSettingWhereInput[]
    OR?: SatuSehatSettingWhereInput[]
    NOT?: SatuSehatSettingWhereInput | SatuSehatSettingWhereInput[]
    id?: IntFilter<"SatuSehatSetting"> | number
    environment?: StringFilter<"SatuSehatSetting"> | string
    stgOrganizationId?: StringFilter<"SatuSehatSetting"> | string
    stgClientId?: StringFilter<"SatuSehatSetting"> | string
    stgClientSecret?: StringFilter<"SatuSehatSetting"> | string
    stgAuthUrl?: StringFilter<"SatuSehatSetting"> | string
    stgBaseUrl?: StringFilter<"SatuSehatSetting"> | string
    prdOrganizationId?: StringFilter<"SatuSehatSetting"> | string
    prdClientId?: StringFilter<"SatuSehatSetting"> | string
    prdClientSecret?: StringFilter<"SatuSehatSetting"> | string
    prdAuthUrl?: StringFilter<"SatuSehatSetting"> | string
    prdBaseUrl?: StringFilter<"SatuSehatSetting"> | string
    organizationId?: StringFilter<"SatuSehatSetting"> | string
    clientId?: StringFilter<"SatuSehatSetting"> | string
    clientSecret?: StringFilter<"SatuSehatSetting"> | string
    authUrl?: StringFilter<"SatuSehatSetting"> | string
    baseUrl?: StringFilter<"SatuSehatSetting"> | string
    encounterUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    conditionUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    serviceRequestUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    imagingStudyUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    observationUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    diagnosticReportUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    compositionUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    patientUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    locationUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    practitionerUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    defaultPatientId?: StringNullableFilter<"SatuSehatSetting"> | string | null
    defaultPractitionerId?: StringNullableFilter<"SatuSehatSetting"> | string | null
    patientIdSource?: StringNullableFilter<"SatuSehatSetting"> | string | null
    isActive?: BoolFilter<"SatuSehatSetting"> | boolean
    updatedAt?: DateTimeFilter<"SatuSehatSetting"> | Date | string
    autoSyncEnabled?: BoolFilter<"SatuSehatSetting"> | boolean
    autoSyncFrequency?: StringFilter<"SatuSehatSetting"> | string
    autoSyncTime?: StringFilter<"SatuSehatSetting"> | string
    lastAutoSyncAt?: DateTimeNullableFilter<"SatuSehatSetting"> | Date | string | null
    sendImageStudyFromWeb?: BoolFilter<"SatuSehatSetting"> | boolean
  }

  export type SatuSehatSettingOrderByWithRelationInput = {
    id?: SortOrder
    environment?: SortOrder
    stgOrganizationId?: SortOrder
    stgClientId?: SortOrder
    stgClientSecret?: SortOrder
    stgAuthUrl?: SortOrder
    stgBaseUrl?: SortOrder
    prdOrganizationId?: SortOrder
    prdClientId?: SortOrder
    prdClientSecret?: SortOrder
    prdAuthUrl?: SortOrder
    prdBaseUrl?: SortOrder
    organizationId?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    authUrl?: SortOrder
    baseUrl?: SortOrder
    encounterUrl?: SortOrderInput | SortOrder
    conditionUrl?: SortOrderInput | SortOrder
    serviceRequestUrl?: SortOrderInput | SortOrder
    imagingStudyUrl?: SortOrderInput | SortOrder
    observationUrl?: SortOrderInput | SortOrder
    diagnosticReportUrl?: SortOrderInput | SortOrder
    compositionUrl?: SortOrderInput | SortOrder
    patientUrl?: SortOrderInput | SortOrder
    locationUrl?: SortOrderInput | SortOrder
    practitionerUrl?: SortOrderInput | SortOrder
    defaultPatientId?: SortOrderInput | SortOrder
    defaultPractitionerId?: SortOrderInput | SortOrder
    patientIdSource?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    autoSyncEnabled?: SortOrder
    autoSyncFrequency?: SortOrder
    autoSyncTime?: SortOrder
    lastAutoSyncAt?: SortOrderInput | SortOrder
    sendImageStudyFromWeb?: SortOrder
  }

  export type SatuSehatSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SatuSehatSettingWhereInput | SatuSehatSettingWhereInput[]
    OR?: SatuSehatSettingWhereInput[]
    NOT?: SatuSehatSettingWhereInput | SatuSehatSettingWhereInput[]
    environment?: StringFilter<"SatuSehatSetting"> | string
    stgOrganizationId?: StringFilter<"SatuSehatSetting"> | string
    stgClientId?: StringFilter<"SatuSehatSetting"> | string
    stgClientSecret?: StringFilter<"SatuSehatSetting"> | string
    stgAuthUrl?: StringFilter<"SatuSehatSetting"> | string
    stgBaseUrl?: StringFilter<"SatuSehatSetting"> | string
    prdOrganizationId?: StringFilter<"SatuSehatSetting"> | string
    prdClientId?: StringFilter<"SatuSehatSetting"> | string
    prdClientSecret?: StringFilter<"SatuSehatSetting"> | string
    prdAuthUrl?: StringFilter<"SatuSehatSetting"> | string
    prdBaseUrl?: StringFilter<"SatuSehatSetting"> | string
    organizationId?: StringFilter<"SatuSehatSetting"> | string
    clientId?: StringFilter<"SatuSehatSetting"> | string
    clientSecret?: StringFilter<"SatuSehatSetting"> | string
    authUrl?: StringFilter<"SatuSehatSetting"> | string
    baseUrl?: StringFilter<"SatuSehatSetting"> | string
    encounterUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    conditionUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    serviceRequestUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    imagingStudyUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    observationUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    diagnosticReportUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    compositionUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    patientUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    locationUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    practitionerUrl?: StringNullableFilter<"SatuSehatSetting"> | string | null
    defaultPatientId?: StringNullableFilter<"SatuSehatSetting"> | string | null
    defaultPractitionerId?: StringNullableFilter<"SatuSehatSetting"> | string | null
    patientIdSource?: StringNullableFilter<"SatuSehatSetting"> | string | null
    isActive?: BoolFilter<"SatuSehatSetting"> | boolean
    updatedAt?: DateTimeFilter<"SatuSehatSetting"> | Date | string
    autoSyncEnabled?: BoolFilter<"SatuSehatSetting"> | boolean
    autoSyncFrequency?: StringFilter<"SatuSehatSetting"> | string
    autoSyncTime?: StringFilter<"SatuSehatSetting"> | string
    lastAutoSyncAt?: DateTimeNullableFilter<"SatuSehatSetting"> | Date | string | null
    sendImageStudyFromWeb?: BoolFilter<"SatuSehatSetting"> | boolean
  }, "id">

  export type SatuSehatSettingOrderByWithAggregationInput = {
    id?: SortOrder
    environment?: SortOrder
    stgOrganizationId?: SortOrder
    stgClientId?: SortOrder
    stgClientSecret?: SortOrder
    stgAuthUrl?: SortOrder
    stgBaseUrl?: SortOrder
    prdOrganizationId?: SortOrder
    prdClientId?: SortOrder
    prdClientSecret?: SortOrder
    prdAuthUrl?: SortOrder
    prdBaseUrl?: SortOrder
    organizationId?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    authUrl?: SortOrder
    baseUrl?: SortOrder
    encounterUrl?: SortOrderInput | SortOrder
    conditionUrl?: SortOrderInput | SortOrder
    serviceRequestUrl?: SortOrderInput | SortOrder
    imagingStudyUrl?: SortOrderInput | SortOrder
    observationUrl?: SortOrderInput | SortOrder
    diagnosticReportUrl?: SortOrderInput | SortOrder
    compositionUrl?: SortOrderInput | SortOrder
    patientUrl?: SortOrderInput | SortOrder
    locationUrl?: SortOrderInput | SortOrder
    practitionerUrl?: SortOrderInput | SortOrder
    defaultPatientId?: SortOrderInput | SortOrder
    defaultPractitionerId?: SortOrderInput | SortOrder
    patientIdSource?: SortOrderInput | SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    autoSyncEnabled?: SortOrder
    autoSyncFrequency?: SortOrder
    autoSyncTime?: SortOrder
    lastAutoSyncAt?: SortOrderInput | SortOrder
    sendImageStudyFromWeb?: SortOrder
    _count?: SatuSehatSettingCountOrderByAggregateInput
    _avg?: SatuSehatSettingAvgOrderByAggregateInput
    _max?: SatuSehatSettingMaxOrderByAggregateInput
    _min?: SatuSehatSettingMinOrderByAggregateInput
    _sum?: SatuSehatSettingSumOrderByAggregateInput
  }

  export type SatuSehatSettingScalarWhereWithAggregatesInput = {
    AND?: SatuSehatSettingScalarWhereWithAggregatesInput | SatuSehatSettingScalarWhereWithAggregatesInput[]
    OR?: SatuSehatSettingScalarWhereWithAggregatesInput[]
    NOT?: SatuSehatSettingScalarWhereWithAggregatesInput | SatuSehatSettingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SatuSehatSetting"> | number
    environment?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    stgOrganizationId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    stgClientId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    stgClientSecret?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    stgAuthUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    stgBaseUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    prdOrganizationId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    prdClientId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    prdClientSecret?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    prdAuthUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    prdBaseUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    organizationId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    clientId?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    clientSecret?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    authUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    baseUrl?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    encounterUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    conditionUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    serviceRequestUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    imagingStudyUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    observationUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    diagnosticReportUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    compositionUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    patientUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    locationUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    practitionerUrl?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    defaultPatientId?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    defaultPractitionerId?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    patientIdSource?: StringNullableWithAggregatesFilter<"SatuSehatSetting"> | string | null
    isActive?: BoolWithAggregatesFilter<"SatuSehatSetting"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"SatuSehatSetting"> | Date | string
    autoSyncEnabled?: BoolWithAggregatesFilter<"SatuSehatSetting"> | boolean
    autoSyncFrequency?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    autoSyncTime?: StringWithAggregatesFilter<"SatuSehatSetting"> | string
    lastAutoSyncAt?: DateTimeNullableWithAggregatesFilter<"SatuSehatSetting"> | Date | string | null
    sendImageStudyFromWeb?: BoolWithAggregatesFilter<"SatuSehatSetting"> | boolean
  }

  export type SatuSehatResourceLogWhereInput = {
    AND?: SatuSehatResourceLogWhereInput | SatuSehatResourceLogWhereInput[]
    OR?: SatuSehatResourceLogWhereInput[]
    NOT?: SatuSehatResourceLogWhereInput | SatuSehatResourceLogWhereInput[]
    id?: StringFilter<"SatuSehatResourceLog"> | string
    resourceType?: StringFilter<"SatuSehatResourceLog"> | string
    resourceId?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    accessionNumber?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    studyInstanceUid?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    method?: StringFilter<"SatuSehatResourceLog"> | string
    status?: StringFilter<"SatuSehatResourceLog"> | string
    responseCode?: IntNullableFilter<"SatuSehatResourceLog"> | number | null
    responseBody?: JsonNullableFilter<"SatuSehatResourceLog">
    environment?: StringFilter<"SatuSehatResourceLog"> | string
    createdAt?: DateTimeFilter<"SatuSehatResourceLog"> | Date | string
  }

  export type SatuSehatResourceLogOrderByWithRelationInput = {
    id?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    accessionNumber?: SortOrderInput | SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    method?: SortOrder
    status?: SortOrder
    responseCode?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    environment?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatResourceLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SatuSehatResourceLogWhereInput | SatuSehatResourceLogWhereInput[]
    OR?: SatuSehatResourceLogWhereInput[]
    NOT?: SatuSehatResourceLogWhereInput | SatuSehatResourceLogWhereInput[]
    resourceType?: StringFilter<"SatuSehatResourceLog"> | string
    resourceId?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    accessionNumber?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    studyInstanceUid?: StringNullableFilter<"SatuSehatResourceLog"> | string | null
    method?: StringFilter<"SatuSehatResourceLog"> | string
    status?: StringFilter<"SatuSehatResourceLog"> | string
    responseCode?: IntNullableFilter<"SatuSehatResourceLog"> | number | null
    responseBody?: JsonNullableFilter<"SatuSehatResourceLog">
    environment?: StringFilter<"SatuSehatResourceLog"> | string
    createdAt?: DateTimeFilter<"SatuSehatResourceLog"> | Date | string
  }, "id">

  export type SatuSehatResourceLogOrderByWithAggregationInput = {
    id?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrderInput | SortOrder
    accessionNumber?: SortOrderInput | SortOrder
    studyInstanceUid?: SortOrderInput | SortOrder
    method?: SortOrder
    status?: SortOrder
    responseCode?: SortOrderInput | SortOrder
    responseBody?: SortOrderInput | SortOrder
    environment?: SortOrder
    createdAt?: SortOrder
    _count?: SatuSehatResourceLogCountOrderByAggregateInput
    _avg?: SatuSehatResourceLogAvgOrderByAggregateInput
    _max?: SatuSehatResourceLogMaxOrderByAggregateInput
    _min?: SatuSehatResourceLogMinOrderByAggregateInput
    _sum?: SatuSehatResourceLogSumOrderByAggregateInput
  }

  export type SatuSehatResourceLogScalarWhereWithAggregatesInput = {
    AND?: SatuSehatResourceLogScalarWhereWithAggregatesInput | SatuSehatResourceLogScalarWhereWithAggregatesInput[]
    OR?: SatuSehatResourceLogScalarWhereWithAggregatesInput[]
    NOT?: SatuSehatResourceLogScalarWhereWithAggregatesInput | SatuSehatResourceLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SatuSehatResourceLog"> | string
    resourceType?: StringWithAggregatesFilter<"SatuSehatResourceLog"> | string
    resourceId?: StringNullableWithAggregatesFilter<"SatuSehatResourceLog"> | string | null
    accessionNumber?: StringNullableWithAggregatesFilter<"SatuSehatResourceLog"> | string | null
    studyInstanceUid?: StringNullableWithAggregatesFilter<"SatuSehatResourceLog"> | string | null
    method?: StringWithAggregatesFilter<"SatuSehatResourceLog"> | string
    status?: StringWithAggregatesFilter<"SatuSehatResourceLog"> | string
    responseCode?: IntNullableWithAggregatesFilter<"SatuSehatResourceLog"> | number | null
    responseBody?: JsonNullableWithAggregatesFilter<"SatuSehatResourceLog">
    environment?: StringWithAggregatesFilter<"SatuSehatResourceLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SatuSehatResourceLog"> | Date | string
  }

  export type ModalityConnectionWhereInput = {
    AND?: ModalityConnectionWhereInput | ModalityConnectionWhereInput[]
    OR?: ModalityConnectionWhereInput[]
    NOT?: ModalityConnectionWhereInput | ModalityConnectionWhereInput[]
    id?: StringFilter<"ModalityConnection"> | string
    aeTitle?: StringFilter<"ModalityConnection"> | string
    ipAddress?: StringFilter<"ModalityConnection"> | string
    event?: StringFilter<"ModalityConnection"> | string
    timestamp?: DateTimeFilter<"ModalityConnection"> | Date | string
  }

  export type ModalityConnectionOrderByWithRelationInput = {
    id?: SortOrder
    aeTitle?: SortOrder
    ipAddress?: SortOrder
    event?: SortOrder
    timestamp?: SortOrder
  }

  export type ModalityConnectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModalityConnectionWhereInput | ModalityConnectionWhereInput[]
    OR?: ModalityConnectionWhereInput[]
    NOT?: ModalityConnectionWhereInput | ModalityConnectionWhereInput[]
    aeTitle?: StringFilter<"ModalityConnection"> | string
    ipAddress?: StringFilter<"ModalityConnection"> | string
    event?: StringFilter<"ModalityConnection"> | string
    timestamp?: DateTimeFilter<"ModalityConnection"> | Date | string
  }, "id">

  export type ModalityConnectionOrderByWithAggregationInput = {
    id?: SortOrder
    aeTitle?: SortOrder
    ipAddress?: SortOrder
    event?: SortOrder
    timestamp?: SortOrder
    _count?: ModalityConnectionCountOrderByAggregateInput
    _max?: ModalityConnectionMaxOrderByAggregateInput
    _min?: ModalityConnectionMinOrderByAggregateInput
  }

  export type ModalityConnectionScalarWhereWithAggregatesInput = {
    AND?: ModalityConnectionScalarWhereWithAggregatesInput | ModalityConnectionScalarWhereWithAggregatesInput[]
    OR?: ModalityConnectionScalarWhereWithAggregatesInput[]
    NOT?: ModalityConnectionScalarWhereWithAggregatesInput | ModalityConnectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ModalityConnection"> | string
    aeTitle?: StringWithAggregatesFilter<"ModalityConnection"> | string
    ipAddress?: StringWithAggregatesFilter<"ModalityConnection"> | string
    event?: StringWithAggregatesFilter<"ModalityConnection"> | string
    timestamp?: DateTimeWithAggregatesFilter<"ModalityConnection"> | Date | string
  }

  export type RadiologyReportWhereInput = {
    AND?: RadiologyReportWhereInput | RadiologyReportWhereInput[]
    OR?: RadiologyReportWhereInput[]
    NOT?: RadiologyReportWhereInput | RadiologyReportWhereInput[]
    id?: StringFilter<"RadiologyReport"> | string
    patientId?: StringFilter<"RadiologyReport"> | string
    studyInstanceUid?: StringFilter<"RadiologyReport"> | string
    studyDate?: StringNullableFilter<"RadiologyReport"> | string | null
    accessionNumber?: StringNullableFilter<"RadiologyReport"> | string | null
    patientName?: StringNullableFilter<"RadiologyReport"> | string | null
    patientSex?: StringNullableFilter<"RadiologyReport"> | string | null
    age?: StringNullableFilter<"RadiologyReport"> | string | null
    examType?: StringNullableFilter<"RadiologyReport"> | string | null
    findings?: StringNullableFilter<"RadiologyReport"> | string | null
    measurementImages?: JsonNullableFilter<"RadiologyReport">
    selectedSeries?: JsonNullableFilter<"RadiologyReport">
    reportDate?: StringNullableFilter<"RadiologyReport"> | string | null
    createdAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    updatedAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    doctorId?: StringNullableFilter<"RadiologyReport"> | string | null
    doctorName?: StringNullableFilter<"RadiologyReport"> | string | null
    doctor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type RadiologyReportOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    studyInstanceUid?: SortOrder
    studyDate?: SortOrderInput | SortOrder
    accessionNumber?: SortOrderInput | SortOrder
    patientName?: SortOrderInput | SortOrder
    patientSex?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    examType?: SortOrderInput | SortOrder
    findings?: SortOrderInput | SortOrder
    measurementImages?: SortOrderInput | SortOrder
    selectedSeries?: SortOrderInput | SortOrder
    reportDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorId?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    doctor?: UserOrderByWithRelationInput
  }

  export type RadiologyReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    patientId_studyInstanceUid?: RadiologyReportPatientIdStudyInstanceUidCompoundUniqueInput
    AND?: RadiologyReportWhereInput | RadiologyReportWhereInput[]
    OR?: RadiologyReportWhereInput[]
    NOT?: RadiologyReportWhereInput | RadiologyReportWhereInput[]
    patientId?: StringFilter<"RadiologyReport"> | string
    studyInstanceUid?: StringFilter<"RadiologyReport"> | string
    studyDate?: StringNullableFilter<"RadiologyReport"> | string | null
    accessionNumber?: StringNullableFilter<"RadiologyReport"> | string | null
    patientName?: StringNullableFilter<"RadiologyReport"> | string | null
    patientSex?: StringNullableFilter<"RadiologyReport"> | string | null
    age?: StringNullableFilter<"RadiologyReport"> | string | null
    examType?: StringNullableFilter<"RadiologyReport"> | string | null
    findings?: StringNullableFilter<"RadiologyReport"> | string | null
    measurementImages?: JsonNullableFilter<"RadiologyReport">
    selectedSeries?: JsonNullableFilter<"RadiologyReport">
    reportDate?: StringNullableFilter<"RadiologyReport"> | string | null
    createdAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    updatedAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    doctorId?: StringNullableFilter<"RadiologyReport"> | string | null
    doctorName?: StringNullableFilter<"RadiologyReport"> | string | null
    doctor?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id" | "patientId_studyInstanceUid">

  export type RadiologyReportOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    studyInstanceUid?: SortOrder
    studyDate?: SortOrderInput | SortOrder
    accessionNumber?: SortOrderInput | SortOrder
    patientName?: SortOrderInput | SortOrder
    patientSex?: SortOrderInput | SortOrder
    age?: SortOrderInput | SortOrder
    examType?: SortOrderInput | SortOrder
    findings?: SortOrderInput | SortOrder
    measurementImages?: SortOrderInput | SortOrder
    selectedSeries?: SortOrderInput | SortOrder
    reportDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorId?: SortOrderInput | SortOrder
    doctorName?: SortOrderInput | SortOrder
    _count?: RadiologyReportCountOrderByAggregateInput
    _max?: RadiologyReportMaxOrderByAggregateInput
    _min?: RadiologyReportMinOrderByAggregateInput
  }

  export type RadiologyReportScalarWhereWithAggregatesInput = {
    AND?: RadiologyReportScalarWhereWithAggregatesInput | RadiologyReportScalarWhereWithAggregatesInput[]
    OR?: RadiologyReportScalarWhereWithAggregatesInput[]
    NOT?: RadiologyReportScalarWhereWithAggregatesInput | RadiologyReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RadiologyReport"> | string
    patientId?: StringWithAggregatesFilter<"RadiologyReport"> | string
    studyInstanceUid?: StringWithAggregatesFilter<"RadiologyReport"> | string
    studyDate?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    accessionNumber?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    patientName?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    patientSex?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    age?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    examType?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    findings?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    measurementImages?: JsonNullableWithAggregatesFilter<"RadiologyReport">
    selectedSeries?: JsonNullableWithAggregatesFilter<"RadiologyReport">
    reportDate?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RadiologyReport"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RadiologyReport"> | Date | string
    doctorId?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
    doctorName?: StringNullableWithAggregatesFilter<"RadiologyReport"> | string | null
  }

  export type SatuSehatBulkSyncTaskWhereInput = {
    AND?: SatuSehatBulkSyncTaskWhereInput | SatuSehatBulkSyncTaskWhereInput[]
    OR?: SatuSehatBulkSyncTaskWhereInput[]
    NOT?: SatuSehatBulkSyncTaskWhereInput | SatuSehatBulkSyncTaskWhereInput[]
    id?: StringFilter<"SatuSehatBulkSyncTask"> | string
    type?: StringFilter<"SatuSehatBulkSyncTask"> | string
    status?: StringFilter<"SatuSehatBulkSyncTask"> | string
    totalItems?: IntFilter<"SatuSehatBulkSyncTask"> | number
    successCount?: IntFilter<"SatuSehatBulkSyncTask"> | number
    failCount?: IntFilter<"SatuSehatBulkSyncTask"> | number
    currentStudyId?: StringNullableFilter<"SatuSehatBulkSyncTask"> | string | null
    errors?: JsonNullableFilter<"SatuSehatBulkSyncTask">
    studyIds?: JsonFilter<"SatuSehatBulkSyncTask">
    createdAt?: DateTimeFilter<"SatuSehatBulkSyncTask"> | Date | string
    updatedAt?: DateTimeFilter<"SatuSehatBulkSyncTask"> | Date | string
    completedAt?: DateTimeNullableFilter<"SatuSehatBulkSyncTask"> | Date | string | null
  }

  export type SatuSehatBulkSyncTaskOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
    currentStudyId?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    studyIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
  }

  export type SatuSehatBulkSyncTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SatuSehatBulkSyncTaskWhereInput | SatuSehatBulkSyncTaskWhereInput[]
    OR?: SatuSehatBulkSyncTaskWhereInput[]
    NOT?: SatuSehatBulkSyncTaskWhereInput | SatuSehatBulkSyncTaskWhereInput[]
    type?: StringFilter<"SatuSehatBulkSyncTask"> | string
    status?: StringFilter<"SatuSehatBulkSyncTask"> | string
    totalItems?: IntFilter<"SatuSehatBulkSyncTask"> | number
    successCount?: IntFilter<"SatuSehatBulkSyncTask"> | number
    failCount?: IntFilter<"SatuSehatBulkSyncTask"> | number
    currentStudyId?: StringNullableFilter<"SatuSehatBulkSyncTask"> | string | null
    errors?: JsonNullableFilter<"SatuSehatBulkSyncTask">
    studyIds?: JsonFilter<"SatuSehatBulkSyncTask">
    createdAt?: DateTimeFilter<"SatuSehatBulkSyncTask"> | Date | string
    updatedAt?: DateTimeFilter<"SatuSehatBulkSyncTask"> | Date | string
    completedAt?: DateTimeNullableFilter<"SatuSehatBulkSyncTask"> | Date | string | null
  }, "id">

  export type SatuSehatBulkSyncTaskOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
    currentStudyId?: SortOrderInput | SortOrder
    errors?: SortOrderInput | SortOrder
    studyIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: SatuSehatBulkSyncTaskCountOrderByAggregateInput
    _avg?: SatuSehatBulkSyncTaskAvgOrderByAggregateInput
    _max?: SatuSehatBulkSyncTaskMaxOrderByAggregateInput
    _min?: SatuSehatBulkSyncTaskMinOrderByAggregateInput
    _sum?: SatuSehatBulkSyncTaskSumOrderByAggregateInput
  }

  export type SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput = {
    AND?: SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput | SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput[]
    OR?: SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput[]
    NOT?: SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput | SatuSehatBulkSyncTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SatuSehatBulkSyncTask"> | string
    type?: StringWithAggregatesFilter<"SatuSehatBulkSyncTask"> | string
    status?: StringWithAggregatesFilter<"SatuSehatBulkSyncTask"> | string
    totalItems?: IntWithAggregatesFilter<"SatuSehatBulkSyncTask"> | number
    successCount?: IntWithAggregatesFilter<"SatuSehatBulkSyncTask"> | number
    failCount?: IntWithAggregatesFilter<"SatuSehatBulkSyncTask"> | number
    currentStudyId?: StringNullableWithAggregatesFilter<"SatuSehatBulkSyncTask"> | string | null
    errors?: JsonNullableWithAggregatesFilter<"SatuSehatBulkSyncTask">
    studyIds?: JsonWithAggregatesFilter<"SatuSehatBulkSyncTask">
    createdAt?: DateTimeWithAggregatesFilter<"SatuSehatBulkSyncTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SatuSehatBulkSyncTask"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"SatuSehatBulkSyncTask"> | Date | string | null
  }

  export type ReportExportTaskWhereInput = {
    AND?: ReportExportTaskWhereInput | ReportExportTaskWhereInput[]
    OR?: ReportExportTaskWhereInput[]
    NOT?: ReportExportTaskWhereInput | ReportExportTaskWhereInput[]
    id?: StringFilter<"ReportExportTask"> | string
    status?: StringFilter<"ReportExportTask"> | string
    totalItems?: IntFilter<"ReportExportTask"> | number
    processedCount?: IntFilter<"ReportExportTask"> | number
    fileUrl?: StringNullableFilter<"ReportExportTask"> | string | null
    filters?: JsonNullableFilter<"ReportExportTask">
    reportIds?: JsonNullableFilter<"ReportExportTask">
    createdAt?: DateTimeFilter<"ReportExportTask"> | Date | string
    updatedAt?: DateTimeFilter<"ReportExportTask"> | Date | string
    completedAt?: DateTimeNullableFilter<"ReportExportTask"> | Date | string | null
  }

  export type ReportExportTaskOrderByWithRelationInput = {
    id?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    processedCount?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    filters?: SortOrderInput | SortOrder
    reportIds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
  }

  export type ReportExportTaskWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportExportTaskWhereInput | ReportExportTaskWhereInput[]
    OR?: ReportExportTaskWhereInput[]
    NOT?: ReportExportTaskWhereInput | ReportExportTaskWhereInput[]
    status?: StringFilter<"ReportExportTask"> | string
    totalItems?: IntFilter<"ReportExportTask"> | number
    processedCount?: IntFilter<"ReportExportTask"> | number
    fileUrl?: StringNullableFilter<"ReportExportTask"> | string | null
    filters?: JsonNullableFilter<"ReportExportTask">
    reportIds?: JsonNullableFilter<"ReportExportTask">
    createdAt?: DateTimeFilter<"ReportExportTask"> | Date | string
    updatedAt?: DateTimeFilter<"ReportExportTask"> | Date | string
    completedAt?: DateTimeNullableFilter<"ReportExportTask"> | Date | string | null
  }, "id">

  export type ReportExportTaskOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    processedCount?: SortOrder
    fileUrl?: SortOrderInput | SortOrder
    filters?: SortOrderInput | SortOrder
    reportIds?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: ReportExportTaskCountOrderByAggregateInput
    _avg?: ReportExportTaskAvgOrderByAggregateInput
    _max?: ReportExportTaskMaxOrderByAggregateInput
    _min?: ReportExportTaskMinOrderByAggregateInput
    _sum?: ReportExportTaskSumOrderByAggregateInput
  }

  export type ReportExportTaskScalarWhereWithAggregatesInput = {
    AND?: ReportExportTaskScalarWhereWithAggregatesInput | ReportExportTaskScalarWhereWithAggregatesInput[]
    OR?: ReportExportTaskScalarWhereWithAggregatesInput[]
    NOT?: ReportExportTaskScalarWhereWithAggregatesInput | ReportExportTaskScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ReportExportTask"> | string
    status?: StringWithAggregatesFilter<"ReportExportTask"> | string
    totalItems?: IntWithAggregatesFilter<"ReportExportTask"> | number
    processedCount?: IntWithAggregatesFilter<"ReportExportTask"> | number
    fileUrl?: StringNullableWithAggregatesFilter<"ReportExportTask"> | string | null
    filters?: JsonNullableWithAggregatesFilter<"ReportExportTask">
    reportIds?: JsonNullableWithAggregatesFilter<"ReportExportTask">
    createdAt?: DateTimeWithAggregatesFilter<"ReportExportTask"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ReportExportTask"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"ReportExportTask"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reports?: RadiologyReportCreateNestedManyWithoutDoctorInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roleId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reports?: RadiologyReportUncheckedCreateNestedManyWithoutDoctorInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: RoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUncheckedUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roleId?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoleCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
    permissions?: PermissionCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type RoleCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RoleUncheckedCreateNestedManyWithoutPermissionsInput
  }

  export type PermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RoleUncheckedUpdateManyWithoutPermissionsNestedInput
  }

  export type PermissionCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiResultCreateInput = {
    studyInstanceUid: string
    modality: string
    conclusion: string
    findings: JsonNullValueInput | InputJsonValue
    isUrgent?: boolean
    heatmapPath?: string | null
    heatmapBase64?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiResultUncheckedCreateInput = {
    studyInstanceUid: string
    modality: string
    conclusion: string
    findings: JsonNullValueInput | InputJsonValue
    isUrgent?: boolean
    heatmapPath?: string | null
    heatmapBase64?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiResultUpdateInput = {
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    conclusion?: StringFieldUpdateOperationsInput | string
    findings?: JsonNullValueInput | InputJsonValue
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    heatmapPath?: NullableStringFieldUpdateOperationsInput | string | null
    heatmapBase64?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiResultUncheckedUpdateInput = {
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    conclusion?: StringFieldUpdateOperationsInput | string
    findings?: JsonNullValueInput | InputJsonValue
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    heatmapPath?: NullableStringFieldUpdateOperationsInput | string | null
    heatmapBase64?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiResultCreateManyInput = {
    studyInstanceUid: string
    modality: string
    conclusion: string
    findings: JsonNullValueInput | InputJsonValue
    isUrgent?: boolean
    heatmapPath?: string | null
    heatmapBase64?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiResultUpdateManyMutationInput = {
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    conclusion?: StringFieldUpdateOperationsInput | string
    findings?: JsonNullValueInput | InputJsonValue
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    heatmapPath?: NullableStringFieldUpdateOperationsInput | string | null
    heatmapBase64?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiResultUncheckedUpdateManyInput = {
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    modality?: StringFieldUpdateOperationsInput | string
    conclusion?: StringFieldUpdateOperationsInput | string
    findings?: JsonNullValueInput | InputJsonValue
    isUrgent?: BoolFieldUpdateOperationsInput | boolean
    heatmapPath?: NullableStringFieldUpdateOperationsInput | string | null
    heatmapBase64?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatIntegrationCreateInput = {
    accessionNumber: string
    studyInstanceUid?: string | null
    satusehatId?: string | null
    patientNik?: string | null
    status?: string
    error?: string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SatuSehatIntegrationUncheckedCreateInput = {
    accessionNumber: string
    studyInstanceUid?: string | null
    satusehatId?: string | null
    patientNik?: string | null
    status?: string
    error?: string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SatuSehatIntegrationUpdateInput = {
    accessionNumber?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    satusehatId?: NullableStringFieldUpdateOperationsInput | string | null
    patientNik?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatIntegrationUncheckedUpdateInput = {
    accessionNumber?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    satusehatId?: NullableStringFieldUpdateOperationsInput | string | null
    patientNik?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatIntegrationCreateManyInput = {
    accessionNumber: string
    studyInstanceUid?: string | null
    satusehatId?: string | null
    patientNik?: string | null
    status?: string
    error?: string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SatuSehatIntegrationUpdateManyMutationInput = {
    accessionNumber?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    satusehatId?: NullableStringFieldUpdateOperationsInput | string | null
    patientNik?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatIntegrationUncheckedUpdateManyInput = {
    accessionNumber?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    satusehatId?: NullableStringFieldUpdateOperationsInput | string | null
    patientNik?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    error?: NullableStringFieldUpdateOperationsInput | string | null
    bundleResponse?: NullableJsonNullValueInput | InputJsonValue
    syncedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatWebhookLogCreateInput = {
    id?: string
    studyInstanceUid?: string | null
    patientName?: string | null
    status: string
    message?: string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SatuSehatWebhookLogUncheckedCreateInput = {
    id?: string
    studyInstanceUid?: string | null
    patientName?: string | null
    status: string
    message?: string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SatuSehatWebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatWebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatWebhookLogCreateManyInput = {
    id?: string
    studyInstanceUid?: string | null
    patientName?: string | null
    status: string
    message?: string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type SatuSehatWebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatWebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    message?: NullableStringFieldUpdateOperationsInput | string | null
    errorDetail?: NullableJsonNullValueInput | InputJsonValue
    rawPayload?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatSettingCreateInput = {
    id?: number
    environment?: string
    stgOrganizationId?: string
    stgClientId?: string
    stgClientSecret?: string
    stgAuthUrl?: string
    stgBaseUrl?: string
    prdOrganizationId?: string
    prdClientId?: string
    prdClientSecret?: string
    prdAuthUrl?: string
    prdBaseUrl?: string
    organizationId?: string
    clientId?: string
    clientSecret?: string
    authUrl?: string
    baseUrl?: string
    encounterUrl?: string | null
    conditionUrl?: string | null
    serviceRequestUrl?: string | null
    imagingStudyUrl?: string | null
    observationUrl?: string | null
    diagnosticReportUrl?: string | null
    compositionUrl?: string | null
    patientUrl?: string | null
    locationUrl?: string | null
    practitionerUrl?: string | null
    defaultPatientId?: string | null
    defaultPractitionerId?: string | null
    patientIdSource?: string | null
    isActive?: boolean
    updatedAt?: Date | string
    autoSyncEnabled?: boolean
    autoSyncFrequency?: string
    autoSyncTime?: string
    lastAutoSyncAt?: Date | string | null
    sendImageStudyFromWeb?: boolean
  }

  export type SatuSehatSettingUncheckedCreateInput = {
    id?: number
    environment?: string
    stgOrganizationId?: string
    stgClientId?: string
    stgClientSecret?: string
    stgAuthUrl?: string
    stgBaseUrl?: string
    prdOrganizationId?: string
    prdClientId?: string
    prdClientSecret?: string
    prdAuthUrl?: string
    prdBaseUrl?: string
    organizationId?: string
    clientId?: string
    clientSecret?: string
    authUrl?: string
    baseUrl?: string
    encounterUrl?: string | null
    conditionUrl?: string | null
    serviceRequestUrl?: string | null
    imagingStudyUrl?: string | null
    observationUrl?: string | null
    diagnosticReportUrl?: string | null
    compositionUrl?: string | null
    patientUrl?: string | null
    locationUrl?: string | null
    practitionerUrl?: string | null
    defaultPatientId?: string | null
    defaultPractitionerId?: string | null
    patientIdSource?: string | null
    isActive?: boolean
    updatedAt?: Date | string
    autoSyncEnabled?: boolean
    autoSyncFrequency?: string
    autoSyncTime?: string
    lastAutoSyncAt?: Date | string | null
    sendImageStudyFromWeb?: boolean
  }

  export type SatuSehatSettingUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    environment?: StringFieldUpdateOperationsInput | string
    stgOrganizationId?: StringFieldUpdateOperationsInput | string
    stgClientId?: StringFieldUpdateOperationsInput | string
    stgClientSecret?: StringFieldUpdateOperationsInput | string
    stgAuthUrl?: StringFieldUpdateOperationsInput | string
    stgBaseUrl?: StringFieldUpdateOperationsInput | string
    prdOrganizationId?: StringFieldUpdateOperationsInput | string
    prdClientId?: StringFieldUpdateOperationsInput | string
    prdClientSecret?: StringFieldUpdateOperationsInput | string
    prdAuthUrl?: StringFieldUpdateOperationsInput | string
    prdBaseUrl?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: StringFieldUpdateOperationsInput | string
    authUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    encounterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    conditionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    serviceRequestUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagingStudyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    observationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticReportUrl?: NullableStringFieldUpdateOperationsInput | string | null
    compositionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    patientUrl?: NullableStringFieldUpdateOperationsInput | string | null
    locationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    practitionerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPatientId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPractitionerId?: NullableStringFieldUpdateOperationsInput | string | null
    patientIdSource?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autoSyncEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSyncFrequency?: StringFieldUpdateOperationsInput | string
    autoSyncTime?: StringFieldUpdateOperationsInput | string
    lastAutoSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sendImageStudyFromWeb?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SatuSehatSettingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    environment?: StringFieldUpdateOperationsInput | string
    stgOrganizationId?: StringFieldUpdateOperationsInput | string
    stgClientId?: StringFieldUpdateOperationsInput | string
    stgClientSecret?: StringFieldUpdateOperationsInput | string
    stgAuthUrl?: StringFieldUpdateOperationsInput | string
    stgBaseUrl?: StringFieldUpdateOperationsInput | string
    prdOrganizationId?: StringFieldUpdateOperationsInput | string
    prdClientId?: StringFieldUpdateOperationsInput | string
    prdClientSecret?: StringFieldUpdateOperationsInput | string
    prdAuthUrl?: StringFieldUpdateOperationsInput | string
    prdBaseUrl?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: StringFieldUpdateOperationsInput | string
    authUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    encounterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    conditionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    serviceRequestUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagingStudyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    observationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticReportUrl?: NullableStringFieldUpdateOperationsInput | string | null
    compositionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    patientUrl?: NullableStringFieldUpdateOperationsInput | string | null
    locationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    practitionerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPatientId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPractitionerId?: NullableStringFieldUpdateOperationsInput | string | null
    patientIdSource?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autoSyncEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSyncFrequency?: StringFieldUpdateOperationsInput | string
    autoSyncTime?: StringFieldUpdateOperationsInput | string
    lastAutoSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sendImageStudyFromWeb?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SatuSehatSettingCreateManyInput = {
    id?: number
    environment?: string
    stgOrganizationId?: string
    stgClientId?: string
    stgClientSecret?: string
    stgAuthUrl?: string
    stgBaseUrl?: string
    prdOrganizationId?: string
    prdClientId?: string
    prdClientSecret?: string
    prdAuthUrl?: string
    prdBaseUrl?: string
    organizationId?: string
    clientId?: string
    clientSecret?: string
    authUrl?: string
    baseUrl?: string
    encounterUrl?: string | null
    conditionUrl?: string | null
    serviceRequestUrl?: string | null
    imagingStudyUrl?: string | null
    observationUrl?: string | null
    diagnosticReportUrl?: string | null
    compositionUrl?: string | null
    patientUrl?: string | null
    locationUrl?: string | null
    practitionerUrl?: string | null
    defaultPatientId?: string | null
    defaultPractitionerId?: string | null
    patientIdSource?: string | null
    isActive?: boolean
    updatedAt?: Date | string
    autoSyncEnabled?: boolean
    autoSyncFrequency?: string
    autoSyncTime?: string
    lastAutoSyncAt?: Date | string | null
    sendImageStudyFromWeb?: boolean
  }

  export type SatuSehatSettingUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    environment?: StringFieldUpdateOperationsInput | string
    stgOrganizationId?: StringFieldUpdateOperationsInput | string
    stgClientId?: StringFieldUpdateOperationsInput | string
    stgClientSecret?: StringFieldUpdateOperationsInput | string
    stgAuthUrl?: StringFieldUpdateOperationsInput | string
    stgBaseUrl?: StringFieldUpdateOperationsInput | string
    prdOrganizationId?: StringFieldUpdateOperationsInput | string
    prdClientId?: StringFieldUpdateOperationsInput | string
    prdClientSecret?: StringFieldUpdateOperationsInput | string
    prdAuthUrl?: StringFieldUpdateOperationsInput | string
    prdBaseUrl?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: StringFieldUpdateOperationsInput | string
    authUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    encounterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    conditionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    serviceRequestUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagingStudyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    observationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticReportUrl?: NullableStringFieldUpdateOperationsInput | string | null
    compositionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    patientUrl?: NullableStringFieldUpdateOperationsInput | string | null
    locationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    practitionerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPatientId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPractitionerId?: NullableStringFieldUpdateOperationsInput | string | null
    patientIdSource?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autoSyncEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSyncFrequency?: StringFieldUpdateOperationsInput | string
    autoSyncTime?: StringFieldUpdateOperationsInput | string
    lastAutoSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sendImageStudyFromWeb?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SatuSehatSettingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    environment?: StringFieldUpdateOperationsInput | string
    stgOrganizationId?: StringFieldUpdateOperationsInput | string
    stgClientId?: StringFieldUpdateOperationsInput | string
    stgClientSecret?: StringFieldUpdateOperationsInput | string
    stgAuthUrl?: StringFieldUpdateOperationsInput | string
    stgBaseUrl?: StringFieldUpdateOperationsInput | string
    prdOrganizationId?: StringFieldUpdateOperationsInput | string
    prdClientId?: StringFieldUpdateOperationsInput | string
    prdClientSecret?: StringFieldUpdateOperationsInput | string
    prdAuthUrl?: StringFieldUpdateOperationsInput | string
    prdBaseUrl?: StringFieldUpdateOperationsInput | string
    organizationId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    clientSecret?: StringFieldUpdateOperationsInput | string
    authUrl?: StringFieldUpdateOperationsInput | string
    baseUrl?: StringFieldUpdateOperationsInput | string
    encounterUrl?: NullableStringFieldUpdateOperationsInput | string | null
    conditionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    serviceRequestUrl?: NullableStringFieldUpdateOperationsInput | string | null
    imagingStudyUrl?: NullableStringFieldUpdateOperationsInput | string | null
    observationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosticReportUrl?: NullableStringFieldUpdateOperationsInput | string | null
    compositionUrl?: NullableStringFieldUpdateOperationsInput | string | null
    patientUrl?: NullableStringFieldUpdateOperationsInput | string | null
    locationUrl?: NullableStringFieldUpdateOperationsInput | string | null
    practitionerUrl?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPatientId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultPractitionerId?: NullableStringFieldUpdateOperationsInput | string | null
    patientIdSource?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    autoSyncEnabled?: BoolFieldUpdateOperationsInput | boolean
    autoSyncFrequency?: StringFieldUpdateOperationsInput | string
    autoSyncTime?: StringFieldUpdateOperationsInput | string
    lastAutoSyncAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sendImageStudyFromWeb?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SatuSehatResourceLogCreateInput = {
    id?: string
    resourceType: string
    resourceId?: string | null
    accessionNumber?: string | null
    studyInstanceUid?: string | null
    method?: string
    status: string
    responseCode?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment: string
    createdAt?: Date | string
  }

  export type SatuSehatResourceLogUncheckedCreateInput = {
    id?: string
    resourceType: string
    resourceId?: string | null
    accessionNumber?: string | null
    studyInstanceUid?: string | null
    method?: string
    status: string
    responseCode?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment: string
    createdAt?: Date | string
  }

  export type SatuSehatResourceLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatResourceLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatResourceLogCreateManyInput = {
    id?: string
    resourceType: string
    resourceId?: string | null
    accessionNumber?: string | null
    studyInstanceUid?: string | null
    method?: string
    status: string
    responseCode?: number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment: string
    createdAt?: Date | string
  }

  export type SatuSehatResourceLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SatuSehatResourceLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    resourceType?: StringFieldUpdateOperationsInput | string
    resourceId?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    studyInstanceUid?: NullableStringFieldUpdateOperationsInput | string | null
    method?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    responseCode?: NullableIntFieldUpdateOperationsInput | number | null
    responseBody?: NullableJsonNullValueInput | InputJsonValue
    environment?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModalityConnectionCreateInput = {
    id?: string
    aeTitle: string
    ipAddress: string
    event: string
    timestamp?: Date | string
  }

  export type ModalityConnectionUncheckedCreateInput = {
    id?: string
    aeTitle: string
    ipAddress: string
    event: string
    timestamp?: Date | string
  }

  export type ModalityConnectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aeTitle?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModalityConnectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    aeTitle?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModalityConnectionCreateManyInput = {
    id?: string
    aeTitle: string
    ipAddress: string
    event: string
    timestamp?: Date | string
  }

  export type ModalityConnectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    aeTitle?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ModalityConnectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    aeTitle?: StringFieldUpdateOperationsInput | string
    ipAddress?: StringFieldUpdateOperationsInput | string
    event?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RadiologyReportCreateInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorName?: string | null
    doctor?: UserCreateNestedOneWithoutReportsInput
  }

  export type RadiologyReportUncheckedCreateInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorId?: string | null
    doctorName?: string | null
  }

  export type RadiologyReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
    doctor?: UserUpdateOneWithoutReportsNestedInput
  }

  export type RadiologyReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiologyReportCreateManyInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorId?: string | null
    doctorName?: string | null
  }

  export type RadiologyReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiologyReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorId?: NullableStringFieldUpdateOperationsInput | string | null
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SatuSehatBulkSyncTaskCreateInput = {
    id?: string
    type?: string
    status?: string
    totalItems?: number
    successCount?: number
    failCount?: number
    currentStudyId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type SatuSehatBulkSyncTaskUncheckedCreateInput = {
    id?: string
    type?: string
    status?: string
    totalItems?: number
    successCount?: number
    failCount?: number
    currentStudyId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type SatuSehatBulkSyncTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failCount?: IntFieldUpdateOperationsInput | number
    currentStudyId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SatuSehatBulkSyncTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failCount?: IntFieldUpdateOperationsInput | number
    currentStudyId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SatuSehatBulkSyncTaskCreateManyInput = {
    id?: string
    type?: string
    status?: string
    totalItems?: number
    successCount?: number
    failCount?: number
    currentStudyId?: string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds: JsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type SatuSehatBulkSyncTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failCount?: IntFieldUpdateOperationsInput | number
    currentStudyId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SatuSehatBulkSyncTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    successCount?: IntFieldUpdateOperationsInput | number
    failCount?: IntFieldUpdateOperationsInput | number
    currentStudyId?: NullableStringFieldUpdateOperationsInput | string | null
    errors?: NullableJsonNullValueInput | InputJsonValue
    studyIds?: JsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportExportTaskCreateInput = {
    id?: string
    status?: string
    totalItems?: number
    processedCount?: number
    fileUrl?: string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ReportExportTaskUncheckedCreateInput = {
    id?: string
    status?: string
    totalItems?: number
    processedCount?: number
    fileUrl?: string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ReportExportTaskUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    processedCount?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportExportTaskUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    processedCount?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportExportTaskCreateManyInput = {
    id?: string
    status?: string
    totalItems?: number
    processedCount?: number
    fileUrl?: string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    completedAt?: Date | string | null
  }

  export type ReportExportTaskUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    processedCount?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ReportExportTaskUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    totalItems?: IntFieldUpdateOperationsInput | number
    processedCount?: IntFieldUpdateOperationsInput | number
    fileUrl?: NullableStringFieldUpdateOperationsInput | string | null
    filters?: NullableJsonNullValueInput | InputJsonValue
    reportIds?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type RadiologyReportListRelationFilter = {
    every?: RadiologyReportWhereInput
    some?: RadiologyReportWhereInput
    none?: RadiologyReportWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type RoleNullableScalarRelationFilter = {
    is?: RoleWhereInput | null
    isNot?: RoleWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RadiologyReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roleId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roleId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    signature?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roleId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type PermissionListRelationFilter = {
    every?: PermissionWhereInput
    some?: PermissionWhereInput
    none?: PermissionWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoleListRelationFilter = {
    every?: RoleWhereInput
    some?: RoleWhereInput
    none?: RoleWhereInput
  }

  export type RoleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermissionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PermissionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type AppConfigCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AiResultCountOrderByAggregateInput = {
    studyInstanceUid?: SortOrder
    modality?: SortOrder
    conclusion?: SortOrder
    findings?: SortOrder
    isUrgent?: SortOrder
    heatmapPath?: SortOrder
    heatmapBase64?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiResultMaxOrderByAggregateInput = {
    studyInstanceUid?: SortOrder
    modality?: SortOrder
    conclusion?: SortOrder
    isUrgent?: SortOrder
    heatmapPath?: SortOrder
    heatmapBase64?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AiResultMinOrderByAggregateInput = {
    studyInstanceUid?: SortOrder
    modality?: SortOrder
    conclusion?: SortOrder
    isUrgent?: SortOrder
    heatmapPath?: SortOrder
    heatmapBase64?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SatuSehatIntegrationCountOrderByAggregateInput = {
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    satusehatId?: SortOrder
    patientNik?: SortOrder
    status?: SortOrder
    error?: SortOrder
    bundleResponse?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SatuSehatIntegrationMaxOrderByAggregateInput = {
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    satusehatId?: SortOrder
    patientNik?: SortOrder
    status?: SortOrder
    error?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SatuSehatIntegrationMinOrderByAggregateInput = {
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    satusehatId?: SortOrder
    patientNik?: SortOrder
    status?: SortOrder
    error?: SortOrder
    syncedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type SatuSehatWebhookLogCountOrderByAggregateInput = {
    id?: SortOrder
    studyInstanceUid?: SortOrder
    patientName?: SortOrder
    status?: SortOrder
    message?: SortOrder
    errorDetail?: SortOrder
    rawPayload?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatWebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder
    studyInstanceUid?: SortOrder
    patientName?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatWebhookLogMinOrderByAggregateInput = {
    id?: SortOrder
    studyInstanceUid?: SortOrder
    patientName?: SortOrder
    status?: SortOrder
    message?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SatuSehatSettingCountOrderByAggregateInput = {
    id?: SortOrder
    environment?: SortOrder
    stgOrganizationId?: SortOrder
    stgClientId?: SortOrder
    stgClientSecret?: SortOrder
    stgAuthUrl?: SortOrder
    stgBaseUrl?: SortOrder
    prdOrganizationId?: SortOrder
    prdClientId?: SortOrder
    prdClientSecret?: SortOrder
    prdAuthUrl?: SortOrder
    prdBaseUrl?: SortOrder
    organizationId?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    authUrl?: SortOrder
    baseUrl?: SortOrder
    encounterUrl?: SortOrder
    conditionUrl?: SortOrder
    serviceRequestUrl?: SortOrder
    imagingStudyUrl?: SortOrder
    observationUrl?: SortOrder
    diagnosticReportUrl?: SortOrder
    compositionUrl?: SortOrder
    patientUrl?: SortOrder
    locationUrl?: SortOrder
    practitionerUrl?: SortOrder
    defaultPatientId?: SortOrder
    defaultPractitionerId?: SortOrder
    patientIdSource?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    autoSyncEnabled?: SortOrder
    autoSyncFrequency?: SortOrder
    autoSyncTime?: SortOrder
    lastAutoSyncAt?: SortOrder
    sendImageStudyFromWeb?: SortOrder
  }

  export type SatuSehatSettingAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SatuSehatSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    environment?: SortOrder
    stgOrganizationId?: SortOrder
    stgClientId?: SortOrder
    stgClientSecret?: SortOrder
    stgAuthUrl?: SortOrder
    stgBaseUrl?: SortOrder
    prdOrganizationId?: SortOrder
    prdClientId?: SortOrder
    prdClientSecret?: SortOrder
    prdAuthUrl?: SortOrder
    prdBaseUrl?: SortOrder
    organizationId?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    authUrl?: SortOrder
    baseUrl?: SortOrder
    encounterUrl?: SortOrder
    conditionUrl?: SortOrder
    serviceRequestUrl?: SortOrder
    imagingStudyUrl?: SortOrder
    observationUrl?: SortOrder
    diagnosticReportUrl?: SortOrder
    compositionUrl?: SortOrder
    patientUrl?: SortOrder
    locationUrl?: SortOrder
    practitionerUrl?: SortOrder
    defaultPatientId?: SortOrder
    defaultPractitionerId?: SortOrder
    patientIdSource?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    autoSyncEnabled?: SortOrder
    autoSyncFrequency?: SortOrder
    autoSyncTime?: SortOrder
    lastAutoSyncAt?: SortOrder
    sendImageStudyFromWeb?: SortOrder
  }

  export type SatuSehatSettingMinOrderByAggregateInput = {
    id?: SortOrder
    environment?: SortOrder
    stgOrganizationId?: SortOrder
    stgClientId?: SortOrder
    stgClientSecret?: SortOrder
    stgAuthUrl?: SortOrder
    stgBaseUrl?: SortOrder
    prdOrganizationId?: SortOrder
    prdClientId?: SortOrder
    prdClientSecret?: SortOrder
    prdAuthUrl?: SortOrder
    prdBaseUrl?: SortOrder
    organizationId?: SortOrder
    clientId?: SortOrder
    clientSecret?: SortOrder
    authUrl?: SortOrder
    baseUrl?: SortOrder
    encounterUrl?: SortOrder
    conditionUrl?: SortOrder
    serviceRequestUrl?: SortOrder
    imagingStudyUrl?: SortOrder
    observationUrl?: SortOrder
    diagnosticReportUrl?: SortOrder
    compositionUrl?: SortOrder
    patientUrl?: SortOrder
    locationUrl?: SortOrder
    practitionerUrl?: SortOrder
    defaultPatientId?: SortOrder
    defaultPractitionerId?: SortOrder
    patientIdSource?: SortOrder
    isActive?: SortOrder
    updatedAt?: SortOrder
    autoSyncEnabled?: SortOrder
    autoSyncFrequency?: SortOrder
    autoSyncTime?: SortOrder
    lastAutoSyncAt?: SortOrder
    sendImageStudyFromWeb?: SortOrder
  }

  export type SatuSehatSettingSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SatuSehatResourceLogCountOrderByAggregateInput = {
    id?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    method?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    responseBody?: SortOrder
    environment?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatResourceLogAvgOrderByAggregateInput = {
    responseCode?: SortOrder
  }

  export type SatuSehatResourceLogMaxOrderByAggregateInput = {
    id?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    method?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    environment?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatResourceLogMinOrderByAggregateInput = {
    id?: SortOrder
    resourceType?: SortOrder
    resourceId?: SortOrder
    accessionNumber?: SortOrder
    studyInstanceUid?: SortOrder
    method?: SortOrder
    status?: SortOrder
    responseCode?: SortOrder
    environment?: SortOrder
    createdAt?: SortOrder
  }

  export type SatuSehatResourceLogSumOrderByAggregateInput = {
    responseCode?: SortOrder
  }

  export type ModalityConnectionCountOrderByAggregateInput = {
    id?: SortOrder
    aeTitle?: SortOrder
    ipAddress?: SortOrder
    event?: SortOrder
    timestamp?: SortOrder
  }

  export type ModalityConnectionMaxOrderByAggregateInput = {
    id?: SortOrder
    aeTitle?: SortOrder
    ipAddress?: SortOrder
    event?: SortOrder
    timestamp?: SortOrder
  }

  export type ModalityConnectionMinOrderByAggregateInput = {
    id?: SortOrder
    aeTitle?: SortOrder
    ipAddress?: SortOrder
    event?: SortOrder
    timestamp?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type RadiologyReportPatientIdStudyInstanceUidCompoundUniqueInput = {
    patientId: string
    studyInstanceUid: string
  }

  export type RadiologyReportCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    studyInstanceUid?: SortOrder
    studyDate?: SortOrder
    accessionNumber?: SortOrder
    patientName?: SortOrder
    patientSex?: SortOrder
    age?: SortOrder
    examType?: SortOrder
    findings?: SortOrder
    measurementImages?: SortOrder
    selectedSeries?: SortOrder
    reportDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
  }

  export type RadiologyReportMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    studyInstanceUid?: SortOrder
    studyDate?: SortOrder
    accessionNumber?: SortOrder
    patientName?: SortOrder
    patientSex?: SortOrder
    age?: SortOrder
    examType?: SortOrder
    findings?: SortOrder
    reportDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
  }

  export type RadiologyReportMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    studyInstanceUid?: SortOrder
    studyDate?: SortOrder
    accessionNumber?: SortOrder
    patientName?: SortOrder
    patientSex?: SortOrder
    age?: SortOrder
    examType?: SortOrder
    findings?: SortOrder
    reportDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorId?: SortOrder
    doctorName?: SortOrder
  }

  export type SatuSehatBulkSyncTaskCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
    currentStudyId?: SortOrder
    errors?: SortOrder
    studyIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type SatuSehatBulkSyncTaskAvgOrderByAggregateInput = {
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
  }

  export type SatuSehatBulkSyncTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
    currentStudyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type SatuSehatBulkSyncTaskMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
    currentStudyId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type SatuSehatBulkSyncTaskSumOrderByAggregateInput = {
    totalItems?: SortOrder
    successCount?: SortOrder
    failCount?: SortOrder
  }

  export type ReportExportTaskCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    processedCount?: SortOrder
    fileUrl?: SortOrder
    filters?: SortOrder
    reportIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportExportTaskAvgOrderByAggregateInput = {
    totalItems?: SortOrder
    processedCount?: SortOrder
  }

  export type ReportExportTaskMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    processedCount?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportExportTaskMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    totalItems?: SortOrder
    processedCount?: SortOrder
    fileUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    completedAt?: SortOrder
  }

  export type ReportExportTaskSumOrderByAggregateInput = {
    totalItems?: SortOrder
    processedCount?: SortOrder
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type RadiologyReportCreateNestedManyWithoutDoctorInput = {
    create?: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput> | RadiologyReportCreateWithoutDoctorInput[] | RadiologyReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: RadiologyReportCreateOrConnectWithoutDoctorInput | RadiologyReportCreateOrConnectWithoutDoctorInput[]
    createMany?: RadiologyReportCreateManyDoctorInputEnvelope
    connect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type RoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    connect?: RoleWhereUniqueInput
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type RadiologyReportUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput> | RadiologyReportCreateWithoutDoctorInput[] | RadiologyReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: RadiologyReportCreateOrConnectWithoutDoctorInput | RadiologyReportCreateOrConnectWithoutDoctorInput[]
    createMany?: RadiologyReportCreateManyDoctorInputEnvelope
    connect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type RadiologyReportUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput> | RadiologyReportCreateWithoutDoctorInput[] | RadiologyReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: RadiologyReportCreateOrConnectWithoutDoctorInput | RadiologyReportCreateOrConnectWithoutDoctorInput[]
    upsert?: RadiologyReportUpsertWithWhereUniqueWithoutDoctorInput | RadiologyReportUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: RadiologyReportCreateManyDoctorInputEnvelope
    set?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    disconnect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    delete?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    connect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    update?: RadiologyReportUpdateWithWhereUniqueWithoutDoctorInput | RadiologyReportUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: RadiologyReportUpdateManyWithWhereWithoutDoctorInput | RadiologyReportUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: RadiologyReportScalarWhereInput | RadiologyReportScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type RoleUpdateOneWithoutUsersNestedInput = {
    create?: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: RoleCreateOrConnectWithoutUsersInput
    upsert?: RoleUpsertWithoutUsersInput
    disconnect?: RoleWhereInput | boolean
    delete?: RoleWhereInput | boolean
    connect?: RoleWhereUniqueInput
    update?: XOR<XOR<RoleUpdateToOneWithWhereWithoutUsersInput, RoleUpdateWithoutUsersInput>, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type RadiologyReportUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput> | RadiologyReportCreateWithoutDoctorInput[] | RadiologyReportUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: RadiologyReportCreateOrConnectWithoutDoctorInput | RadiologyReportCreateOrConnectWithoutDoctorInput[]
    upsert?: RadiologyReportUpsertWithWhereUniqueWithoutDoctorInput | RadiologyReportUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: RadiologyReportCreateManyDoctorInputEnvelope
    set?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    disconnect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    delete?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    connect?: RadiologyReportWhereUniqueInput | RadiologyReportWhereUniqueInput[]
    update?: RadiologyReportUpdateWithWhereUniqueWithoutDoctorInput | RadiologyReportUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: RadiologyReportUpdateManyWithWhereWithoutDoctorInput | RadiologyReportUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: RadiologyReportScalarWhereInput | RadiologyReportScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutRoleInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type PermissionUncheckedCreateNestedManyWithoutRolesInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PermissionUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutRoleNestedInput = {
    create?: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput> | UserCreateWithoutRoleInput[] | UserUncheckedCreateWithoutRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutRoleInput | UserCreateOrConnectWithoutRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutRoleInput | UserUpsertWithWhereUniqueWithoutRoleInput[]
    createMany?: UserCreateManyRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutRoleInput | UserUpdateWithWhereUniqueWithoutRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutRoleInput | UserUpdateManyWithWhereWithoutRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type PermissionUncheckedUpdateManyWithoutRolesNestedInput = {
    create?: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput> | PermissionCreateWithoutRolesInput[] | PermissionUncheckedCreateWithoutRolesInput[]
    connectOrCreate?: PermissionCreateOrConnectWithoutRolesInput | PermissionCreateOrConnectWithoutRolesInput[]
    upsert?: PermissionUpsertWithWhereUniqueWithoutRolesInput | PermissionUpsertWithWhereUniqueWithoutRolesInput[]
    set?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    disconnect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    delete?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    connect?: PermissionWhereUniqueInput | PermissionWhereUniqueInput[]
    update?: PermissionUpdateWithWhereUniqueWithoutRolesInput | PermissionUpdateWithWhereUniqueWithoutRolesInput[]
    updateMany?: PermissionUpdateManyWithWhereWithoutRolesInput | PermissionUpdateManyWithWhereWithoutRolesInput[]
    deleteMany?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
  }

  export type RoleCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUncheckedCreateNestedManyWithoutPermissionsInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
  }

  export type RoleUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsNestedInput = {
    create?: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput> | RoleCreateWithoutPermissionsInput[] | RoleUncheckedCreateWithoutPermissionsInput[]
    connectOrCreate?: RoleCreateOrConnectWithoutPermissionsInput | RoleCreateOrConnectWithoutPermissionsInput[]
    upsert?: RoleUpsertWithWhereUniqueWithoutPermissionsInput | RoleUpsertWithWhereUniqueWithoutPermissionsInput[]
    set?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    disconnect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    delete?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    connect?: RoleWhereUniqueInput | RoleWhereUniqueInput[]
    update?: RoleUpdateWithWhereUniqueWithoutPermissionsInput | RoleUpdateWithWhereUniqueWithoutPermissionsInput[]
    updateMany?: RoleUpdateManyWithWhereWithoutPermissionsInput | RoleUpdateManyWithWhereWithoutPermissionsInput[]
    deleteMany?: RoleScalarWhereInput | RoleScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RadiologyReportCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorName?: string | null
  }

  export type RadiologyReportUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorName?: string | null
  }

  export type RadiologyReportCreateOrConnectWithoutDoctorInput = {
    where: RadiologyReportWhereUniqueInput
    create: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput>
  }

  export type RadiologyReportCreateManyDoctorInputEnvelope = {
    data: RadiologyReportCreateManyDoctorInput | RadiologyReportCreateManyDoctorInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RoleCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionCreateNestedManyWithoutRolesInput
  }

  export type RoleUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: PermissionUncheckedCreateNestedManyWithoutRolesInput
  }

  export type RoleCreateOrConnectWithoutUsersInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
  }

  export type RadiologyReportUpsertWithWhereUniqueWithoutDoctorInput = {
    where: RadiologyReportWhereUniqueInput
    update: XOR<RadiologyReportUpdateWithoutDoctorInput, RadiologyReportUncheckedUpdateWithoutDoctorInput>
    create: XOR<RadiologyReportCreateWithoutDoctorInput, RadiologyReportUncheckedCreateWithoutDoctorInput>
  }

  export type RadiologyReportUpdateWithWhereUniqueWithoutDoctorInput = {
    where: RadiologyReportWhereUniqueInput
    data: XOR<RadiologyReportUpdateWithoutDoctorInput, RadiologyReportUncheckedUpdateWithoutDoctorInput>
  }

  export type RadiologyReportUpdateManyWithWhereWithoutDoctorInput = {
    where: RadiologyReportScalarWhereInput
    data: XOR<RadiologyReportUpdateManyMutationInput, RadiologyReportUncheckedUpdateManyWithoutDoctorInput>
  }

  export type RadiologyReportScalarWhereInput = {
    AND?: RadiologyReportScalarWhereInput | RadiologyReportScalarWhereInput[]
    OR?: RadiologyReportScalarWhereInput[]
    NOT?: RadiologyReportScalarWhereInput | RadiologyReportScalarWhereInput[]
    id?: StringFilter<"RadiologyReport"> | string
    patientId?: StringFilter<"RadiologyReport"> | string
    studyInstanceUid?: StringFilter<"RadiologyReport"> | string
    studyDate?: StringNullableFilter<"RadiologyReport"> | string | null
    accessionNumber?: StringNullableFilter<"RadiologyReport"> | string | null
    patientName?: StringNullableFilter<"RadiologyReport"> | string | null
    patientSex?: StringNullableFilter<"RadiologyReport"> | string | null
    age?: StringNullableFilter<"RadiologyReport"> | string | null
    examType?: StringNullableFilter<"RadiologyReport"> | string | null
    findings?: StringNullableFilter<"RadiologyReport"> | string | null
    measurementImages?: JsonNullableFilter<"RadiologyReport">
    selectedSeries?: JsonNullableFilter<"RadiologyReport">
    reportDate?: StringNullableFilter<"RadiologyReport"> | string | null
    createdAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    updatedAt?: DateTimeFilter<"RadiologyReport"> | Date | string
    doctorId?: StringNullableFilter<"RadiologyReport"> | string | null
    doctorName?: StringNullableFilter<"RadiologyReport"> | string | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type RoleUpsertWithoutUsersInput = {
    update: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
    create: XOR<RoleCreateWithoutUsersInput, RoleUncheckedCreateWithoutUsersInput>
    where?: RoleWhereInput
  }

  export type RoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: RoleWhereInput
    data: XOR<RoleUpdateWithoutUsersInput, RoleUncheckedUpdateWithoutUsersInput>
  }

  export type RoleUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUpdateManyWithoutRolesNestedInput
  }

  export type RoleUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: PermissionUncheckedUpdateManyWithoutRolesNestedInput
  }

  export type UserCreateWithoutRoleInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reports?: RadiologyReportCreateNestedManyWithoutDoctorInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRoleInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reports?: RadiologyReportUncheckedCreateNestedManyWithoutDoctorInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserCreateManyRoleInputEnvelope = {
    data: UserCreateManyRoleInput | UserCreateManyRoleInput[]
    skipDuplicates?: boolean
  }

  export type PermissionCreateWithoutRolesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PermissionCreateOrConnectWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type UserUpsertWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
    create: XOR<UserCreateWithoutRoleInput, UserUncheckedCreateWithoutRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutRoleInput, UserUncheckedUpdateWithoutRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    image?: StringNullableFilter<"User"> | string | null
    signature?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    roleId?: StringNullableFilter<"User"> | string | null
  }

  export type PermissionUpsertWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    update: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
    create: XOR<PermissionCreateWithoutRolesInput, PermissionUncheckedCreateWithoutRolesInput>
  }

  export type PermissionUpdateWithWhereUniqueWithoutRolesInput = {
    where: PermissionWhereUniqueInput
    data: XOR<PermissionUpdateWithoutRolesInput, PermissionUncheckedUpdateWithoutRolesInput>
  }

  export type PermissionUpdateManyWithWhereWithoutRolesInput = {
    where: PermissionScalarWhereInput
    data: XOR<PermissionUpdateManyMutationInput, PermissionUncheckedUpdateManyWithoutRolesInput>
  }

  export type PermissionScalarWhereInput = {
    AND?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    OR?: PermissionScalarWhereInput[]
    NOT?: PermissionScalarWhereInput | PermissionScalarWhereInput[]
    id?: StringFilter<"Permission"> | string
    name?: StringFilter<"Permission"> | string
    createdAt?: DateTimeFilter<"Permission"> | Date | string
    updatedAt?: DateTimeFilter<"Permission"> | Date | string
  }

  export type RoleCreateWithoutPermissionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutRoleInput
  }

  export type RoleUncheckedCreateWithoutPermissionsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutRoleInput
  }

  export type RoleCreateOrConnectWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpsertWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    update: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<RoleCreateWithoutPermissionsInput, RoleUncheckedCreateWithoutPermissionsInput>
  }

  export type RoleUpdateWithWhereUniqueWithoutPermissionsInput = {
    where: RoleWhereUniqueInput
    data: XOR<RoleUpdateWithoutPermissionsInput, RoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type RoleUpdateManyWithWhereWithoutPermissionsInput = {
    where: RoleScalarWhereInput
    data: XOR<RoleUpdateManyMutationInput, RoleUncheckedUpdateManyWithoutPermissionsInput>
  }

  export type RoleScalarWhereInput = {
    AND?: RoleScalarWhereInput | RoleScalarWhereInput[]
    OR?: RoleScalarWhereInput[]
    NOT?: RoleScalarWhereInput | RoleScalarWhereInput[]
    id?: StringFilter<"Role"> | string
    name?: StringFilter<"Role"> | string
    createdAt?: DateTimeFilter<"Role"> | Date | string
    updatedAt?: DateTimeFilter<"Role"> | Date | string
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    reports?: RadiologyReportCreateNestedManyWithoutDoctorInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roleId?: string | null
    reports?: RadiologyReportUncheckedCreateNestedManyWithoutDoctorInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reports?: RadiologyReportUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: RoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    reports?: RadiologyReportUncheckedUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    reports?: RadiologyReportCreateNestedManyWithoutDoctorInput
    role?: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roleId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    reports?: RadiologyReportUncheckedCreateNestedManyWithoutDoctorInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUpdateManyWithoutDoctorNestedInput
    role?: RoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUncheckedUpdateManyWithoutDoctorNestedInput
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    role?: RoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    roleId?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    role?: RoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roleId?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
  }

  export type RadiologyReportCreateManyDoctorInput = {
    id?: string
    patientId: string
    studyInstanceUid: string
    studyDate?: string | null
    accessionNumber?: string | null
    patientName?: string | null
    patientSex?: string | null
    age?: string | null
    examType?: string | null
    findings?: string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorName?: string | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiologyReportUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiologyReportUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RadiologyReportUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    studyInstanceUid?: StringFieldUpdateOperationsInput | string
    studyDate?: NullableStringFieldUpdateOperationsInput | string | null
    accessionNumber?: NullableStringFieldUpdateOperationsInput | string | null
    patientName?: NullableStringFieldUpdateOperationsInput | string | null
    patientSex?: NullableStringFieldUpdateOperationsInput | string | null
    age?: NullableStringFieldUpdateOperationsInput | string | null
    examType?: NullableStringFieldUpdateOperationsInput | string | null
    findings?: NullableStringFieldUpdateOperationsInput | string | null
    measurementImages?: NullableJsonNullValueInput | InputJsonValue
    selectedSeries?: NullableJsonNullValueInput | InputJsonValue
    reportDate?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorName?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyRoleInput = {
    id?: string
    name?: string | null
    email?: string | null
    password?: string | null
    emailVerified?: Date | string | null
    image?: string | null
    signature?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    reports?: RadiologyReportUncheckedUpdateManyWithoutDoctorNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    signature?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoleUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutRoleNestedInput
  }

  export type RoleUncheckedUpdateManyWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}