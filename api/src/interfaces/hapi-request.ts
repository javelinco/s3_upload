import * as Boom from '@hapi/boom';
import * as Hapi from '@hapi/hapi';

export type OsResponse<T> = T | Boom<null>;

export const RegisteredJwtClaims = ['exp', 'jti', 'iss', 'aud', 'sub', 'iat', 'nbf'];

export interface OfficialClaims extends Hapi.AuthCredentials {
  exp: string;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  iat: string;
  nbf: string;
}

export interface OSJwtClaims extends Partial<OfficialClaims> {
  accountGuid: string;
  masterAccountGuid: string;
  integrationNid: string;
  tenantId: string;
  accessDisplay: boolean;
}

export interface OSHapiRequestAuth extends Hapi.RequestAuth {
  token: string;
  credentials: OSJwtClaims;
}

// This is created to get around a typescript type warning for type T not being compatible with the type of payload from
// Hapi.Request
export interface GenericRequest extends Hapi.Request {
  readonly payload: any;
}

export interface HapiRequest<T = any, R = any> extends GenericRequest {
  readonly payload: T;
  query: Hapi.RequestQuery & R;
  auth: OSHapiRequestAuth;
}
