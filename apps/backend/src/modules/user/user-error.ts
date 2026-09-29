export class UserNotAuthenticatedError extends Error {
  status = 401
  code = 'UNAUTHENTICATED'
  constructor(message = 'Usuário não autenticado') {
    super(message)
    this.name = 'UserNotAuthenticatedError'
  }
}

export class UserForbiddenError extends Error {
  status = 403
  code = 'FORBIDDEN'
  constructor(message = 'Acesso não autorizado') {
    super(message)
    this.name = 'UserForbiddenError'
  }
}

export class UserSuspendedError extends Error {
  status = 403
  code = 'USER_SUSPENDED'
  constructor(message = 'Conta de usuário suspensa') {
    super(message)
    this.name = 'UserSuspendedError'
  }
}
