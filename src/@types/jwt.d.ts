import { $Enums } from '@prisma/client';

declare module 'jsonwebtoken' {
  export interface JwtPayload {
    sub: string; //userId
    role: $Enums.Role;
  }
}
