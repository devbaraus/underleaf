import {
  adminListUserSessionsMutationRequestSchema,
  adminListUserSessionsMutationResponseSchema,
} from './zod/adminListUserSessionsSchema.ts'
import {
  adminUpdateUserMutationRequestSchema,
  adminUpdateUserMutationResponseSchema,
} from './zod/adminUpdateUserSchema.ts'
import { banUserMutationRequestSchema, banUserMutationResponseSchema } from './zod/banUserSchema.ts'
import {
  changeEmailMutationRequestSchema,
  changeEmailMutationResponseSchema,
} from './zod/changeEmailSchema.ts'
import {
  changePasswordMutationRequestSchema,
  changePasswordMutationResponseSchema,
} from './zod/changePasswordSchema.ts'
import {
  createUserMutationRequestSchema,
  createUserMutationResponseSchema,
} from './zod/createUserSchema.ts'
import {
  deleteApiProjectsByIdFilesByFileIdPathParamsSchema,
  deleteApiProjectsByIdFilesByFileIdMutationResponseSchema,
} from './zod/deleteApiProjectsByIdFilesByFileIdSchema.ts'
import {
  deleteApiProjectsByIdPathParamsSchema,
  deleteApiProjectsByIdMutationResponseSchema,
} from './zod/deleteApiProjectsByIdSchema.ts'
import {
  deleteUserMutationRequestSchema,
  deleteUserMutationResponseSchema,
} from './zod/deleteUserSchema.ts'
import { getApiAdminAuditQueryResponseSchema } from './zod/getApiAdminAuditSchema.ts'
import { getApiAdminProjectsQueryResponseSchema } from './zod/getApiAdminProjectsSchema.ts'
import { getApiAdminTelemetryQueryResponseSchema } from './zod/getApiAdminTelemetrySchema.ts'
import { getApiAdminUsersQueryResponseSchema } from './zod/getApiAdminUsersSchema.ts'
import { getApiAuthAccountInfoQueryResponseSchema } from './zod/getApiAuthAccountInfoSchema.ts'
import {
  getApiAuthCallbackIdPathParamsSchema,
  getApiAuthCallbackIdQueryResponseSchema,
} from './zod/getApiAuthCallbackIdSchema.ts'
import {
  getApiAuthDeleteUserCallbackQueryParamsSchema,
  getApiAuthDeleteUserCallbackQueryResponseSchema,
} from './zod/getApiAuthDeleteUserCallbackSchema.ts'
import { getApiAuthErrorQueryResponseSchema } from './zod/getApiAuthErrorSchema.ts'
import { getApiAuthOkQueryResponseSchema } from './zod/getApiAuthOkSchema.ts'
import {
  getApiAuthVerifyEmailQueryParamsSchema,
  getApiAuthVerifyEmailQueryResponseSchema,
} from './zod/getApiAuthVerifyEmailSchema.ts'
import {
  getApiProjectsByIdLogsPathParamsSchema,
  getApiProjectsByIdLogsQueryResponseSchema,
} from './zod/getApiProjectsByIdLogsSchema.ts'
import {
  getApiProjectsByIdPdfPathParamsSchema,
  getApiProjectsByIdPdfQueryResponseSchema,
} from './zod/getApiProjectsByIdPdfSchema.ts'
import {
  getApiProjectsByIdPathParamsSchema,
  getApiProjectsByIdQueryResponseSchema,
} from './zod/getApiProjectsByIdSchema.ts'
import { getApiProjectsQueryResponseSchema } from './zod/getApiProjectsSchema.ts'
import { getApiUserMeQueryResponseSchema } from './zod/getApiUserMeSchema.ts'
import {
  getSessionPostMutationRequestSchema,
  getSessionPostMutationResponseSchema,
} from './zod/getSessionPostSchema.ts'
import { getSessionQueryResponseSchema } from './zod/getSessionSchema.ts'
import { getUserQueryParamsSchema, getUserQueryResponseSchema } from './zod/getUserSchema.ts'
import {
  impersonateUserMutationRequestSchema,
  impersonateUserMutationResponseSchema,
} from './zod/impersonateUserSchema.ts'
import {
  linkSocialAccountMutationRequestSchema,
  linkSocialAccountMutationResponseSchema,
} from './zod/linkSocialAccountSchema.ts'
import { listUserAccountsQueryResponseSchema } from './zod/listUserAccountsSchema.ts'
import { listUserSessionsQueryResponseSchema } from './zod/listUserSessionsSchema.ts'
import { listUsersQueryParamsSchema, listUsersQueryResponseSchema } from './zod/listUsersSchema.ts'
import {
  patchApiAdminUsersByIdQuotaPathParamsSchema,
  patchApiAdminUsersByIdQuotaMutationRequestSchema,
  patchApiAdminUsersByIdQuotaMutationResponseSchema,
} from './zod/patchApiAdminUsersByIdQuotaSchema.ts'
import {
  patchApiAdminUsersByIdRolePathParamsSchema,
  patchApiAdminUsersByIdRoleMutationRequestSchema,
  patchApiAdminUsersByIdRoleMutationResponseSchema,
} from './zod/patchApiAdminUsersByIdRoleSchema.ts'
import {
  patchApiAdminUsersByIdStatusPathParamsSchema,
  patchApiAdminUsersByIdStatusMutationRequestSchema,
  patchApiAdminUsersByIdStatusMutationResponseSchema,
} from './zod/patchApiAdminUsersByIdStatusSchema.ts'
import {
  patchApiProjectsByIdPathParamsSchema,
  patchApiProjectsByIdMutationRequestSchema,
  patchApiProjectsByIdMutationResponseSchema,
} from './zod/patchApiProjectsByIdSchema.ts'
import {
  postApiAuthAdminHasPermissionMutationRequestSchema,
  postApiAuthAdminHasPermissionMutationResponseSchema,
} from './zod/postApiAuthAdminHasPermissionSchema.ts'
import { postApiAuthAdminStopImpersonatingMutationResponseSchema } from './zod/postApiAuthAdminStopImpersonatingSchema.ts'
import {
  postApiAuthCallbackIdPathParamsSchema,
  postApiAuthCallbackIdMutationRequestSchema,
  postApiAuthCallbackIdMutationResponseSchema,
} from './zod/postApiAuthCallbackIdSchema.ts'
import {
  postApiAuthGetAccessTokenMutationRequestSchema,
  postApiAuthGetAccessTokenMutationResponseSchema,
} from './zod/postApiAuthGetAccessTokenSchema.ts'
import {
  postApiAuthRefreshTokenMutationRequestSchema,
  postApiAuthRefreshTokenMutationResponseSchema,
} from './zod/postApiAuthRefreshTokenSchema.ts'
import {
  postApiAuthRevokeOtherSessionsMutationRequestSchema,
  postApiAuthRevokeOtherSessionsMutationResponseSchema,
} from './zod/postApiAuthRevokeOtherSessionsSchema.ts'
import {
  postApiAuthRevokeSessionMutationRequestSchema,
  postApiAuthRevokeSessionMutationResponseSchema,
} from './zod/postApiAuthRevokeSessionSchema.ts'
import {
  postApiAuthRevokeSessionsMutationRequestSchema,
  postApiAuthRevokeSessionsMutationResponseSchema,
} from './zod/postApiAuthRevokeSessionsSchema.ts'
import {
  postApiAuthUnlinkAccountMutationRequestSchema,
  postApiAuthUnlinkAccountMutationResponseSchema,
} from './zod/postApiAuthUnlinkAccountSchema.ts'
import {
  postApiProjectsByIdCompilePathParamsSchema,
  postApiProjectsByIdCompileMutationRequestSchema,
  postApiProjectsByIdCompileMutationResponseSchema,
} from './zod/postApiProjectsByIdCompileSchema.ts'
import {
  postApiProjectsByIdFilesPathParamsSchema,
  postApiProjectsByIdFilesMutationRequestSchema,
  postApiProjectsByIdFilesMutationResponseSchema,
} from './zod/postApiProjectsByIdFilesSchema.ts'
import {
  postApiProjectsMutationRequestSchema,
  postApiProjectsMutationResponseSchema,
} from './zod/postApiProjectsSchema.ts'
import {
  putApiProjectsByIdFilesByFileIdPathParamsSchema,
  putApiProjectsByIdFilesByFileIdMutationRequestSchema,
  putApiProjectsByIdFilesByFileIdMutationResponseSchema,
} from './zod/putApiProjectsByIdFilesByFileIdSchema.ts'
import {
  removeUserMutationRequestSchema,
  removeUserMutationResponseSchema,
} from './zod/removeUserSchema.ts'
import {
  requestPasswordResetMutationRequestSchema,
  requestPasswordResetMutationResponseSchema,
} from './zod/requestPasswordResetSchema.ts'
import {
  resetPasswordCallbackPathParamsSchema,
  resetPasswordCallbackQueryParamsSchema,
  resetPasswordCallbackQueryResponseSchema,
} from './zod/resetPasswordCallbackSchema.ts'
import {
  resetPasswordMutationRequestSchema,
  resetPasswordMutationResponseSchema,
} from './zod/resetPasswordSchema.ts'
import {
  revokeUserSessionMutationRequestSchema,
  revokeUserSessionMutationResponseSchema,
} from './zod/revokeUserSessionSchema.ts'
import {
  revokeUserSessionsMutationRequestSchema,
  revokeUserSessionsMutationResponseSchema,
} from './zod/revokeUserSessionsSchema.ts'
import {
  sendVerificationEmailMutationRequestSchema,
  sendVerificationEmailMutationResponseSchema,
} from './zod/sendVerificationEmailSchema.ts'
import {
  setUserPasswordMutationRequestSchema,
  setUserPasswordMutationResponseSchema,
} from './zod/setUserPasswordSchema.ts'
import {
  setUserRoleMutationRequestSchema,
  setUserRoleMutationResponseSchema,
} from './zod/setUserRoleSchema.ts'
import {
  signInEmailMutationRequestSchema,
  signInEmailMutationResponseSchema,
} from './zod/signInEmailSchema.ts'
import { signOutMutationRequestSchema, signOutMutationResponseSchema } from './zod/signOutSchema.ts'
import {
  signUpWithEmailAndPasswordMutationRequestSchema,
  signUpWithEmailAndPasswordMutationResponseSchema,
} from './zod/signUpWithEmailAndPasswordSchema.ts'
import {
  socialSignInMutationRequestSchema,
  socialSignInMutationResponseSchema,
} from './zod/socialSignInSchema.ts'
import {
  unbanUserMutationRequestSchema,
  unbanUserMutationResponseSchema,
} from './zod/unbanUserSchema.ts'
import {
  updateSessionMutationRequestSchema,
  updateSessionMutationResponseSchema,
} from './zod/updateSessionSchema.ts'
import {
  updateUserMutationRequestSchema,
  updateUserMutationResponseSchema,
} from './zod/updateUserSchema.ts'
import {
  verifyPasswordMutationRequestSchema,
  verifyPasswordMutationResponseSchema,
} from './zod/verifyPasswordSchema.ts'
import { createSchema } from '@better-fetch/fetch'

export const betterFetchSchema = createSchema(
  {
    '@get/user/me': {
      output: getApiUserMeQueryResponseSchema,
    },
    '@get/projects': {
      output: getApiProjectsQueryResponseSchema,
    },
    '@post/projects': {
      input: postApiProjectsMutationRequestSchema,
      output: postApiProjectsMutationResponseSchema,
    },
    '@get/projects/:id': {
      params: getApiProjectsByIdPathParamsSchema,
      output: getApiProjectsByIdQueryResponseSchema,
    },
    '@patch/projects/:id': {
      params: patchApiProjectsByIdPathParamsSchema,
      input: patchApiProjectsByIdMutationRequestSchema,
      output: patchApiProjectsByIdMutationResponseSchema,
    },
    '@delete/projects/:id': {
      params: deleteApiProjectsByIdPathParamsSchema,
      output: deleteApiProjectsByIdMutationResponseSchema,
    },
    '@post/projects/:id/files': {
      params: postApiProjectsByIdFilesPathParamsSchema,
      input: postApiProjectsByIdFilesMutationRequestSchema,
      output: postApiProjectsByIdFilesMutationResponseSchema,
    },
    '@put/projects/:id/files/:fileId': {
      params: putApiProjectsByIdFilesByFileIdPathParamsSchema,
      input: putApiProjectsByIdFilesByFileIdMutationRequestSchema,
      output: putApiProjectsByIdFilesByFileIdMutationResponseSchema,
    },
    '@delete/projects/:id/files/:fileId': {
      params: deleteApiProjectsByIdFilesByFileIdPathParamsSchema,
      output: deleteApiProjectsByIdFilesByFileIdMutationResponseSchema,
    },
    '@post/projects/:id/compile': {
      params: postApiProjectsByIdCompilePathParamsSchema,
      input: postApiProjectsByIdCompileMutationRequestSchema,
      output: postApiProjectsByIdCompileMutationResponseSchema,
    },
    '@get/projects/:id/pdf': {
      params: getApiProjectsByIdPdfPathParamsSchema,
      output: getApiProjectsByIdPdfQueryResponseSchema,
    },
    '@get/projects/:id/logs': {
      params: getApiProjectsByIdLogsPathParamsSchema,
      output: getApiProjectsByIdLogsQueryResponseSchema,
    },
    '@get/admin/users': {
      output: getApiAdminUsersQueryResponseSchema,
    },
    '@patch/admin/users/:id/quota': {
      params: patchApiAdminUsersByIdQuotaPathParamsSchema,
      input: patchApiAdminUsersByIdQuotaMutationRequestSchema,
      output: patchApiAdminUsersByIdQuotaMutationResponseSchema,
    },
    '@patch/admin/users/:id/status': {
      params: patchApiAdminUsersByIdStatusPathParamsSchema,
      input: patchApiAdminUsersByIdStatusMutationRequestSchema,
      output: patchApiAdminUsersByIdStatusMutationResponseSchema,
    },
    '@patch/admin/users/:id/role': {
      params: patchApiAdminUsersByIdRolePathParamsSchema,
      input: patchApiAdminUsersByIdRoleMutationRequestSchema,
      output: patchApiAdminUsersByIdRoleMutationResponseSchema,
    },
    '@get/admin/projects': {
      output: getApiAdminProjectsQueryResponseSchema,
    },
    '@get/admin/telemetry': {
      output: getApiAdminTelemetryQueryResponseSchema,
    },
    '@get/admin/audit': {
      output: getApiAdminAuditQueryResponseSchema,
    },
    '@post/auth/sign-in/social': {
      input: socialSignInMutationRequestSchema,
      output: socialSignInMutationResponseSchema,
    },
    '@get/auth/callback/:id': {
      params: getApiAuthCallbackIdPathParamsSchema,
      output: getApiAuthCallbackIdQueryResponseSchema,
    },
    '@post/auth/callback/:id': {
      params: postApiAuthCallbackIdPathParamsSchema,
      input: postApiAuthCallbackIdMutationRequestSchema,
      output: postApiAuthCallbackIdMutationResponseSchema,
    },
    '@get/auth/get-session': {
      output: getSessionQueryResponseSchema,
    },
    '@post/auth/get-session': {
      input: getSessionPostMutationRequestSchema,
      output: getSessionPostMutationResponseSchema,
    },
    '@post/auth/sign-out': {
      input: signOutMutationRequestSchema,
      output: signOutMutationResponseSchema,
    },
    '@post/auth/sign-up/email': {
      input: signUpWithEmailAndPasswordMutationRequestSchema,
      output: signUpWithEmailAndPasswordMutationResponseSchema,
    },
    '@post/auth/sign-in/email': {
      input: signInEmailMutationRequestSchema,
      output: signInEmailMutationResponseSchema,
    },
    '@post/auth/reset-password': {
      input: resetPasswordMutationRequestSchema,
      output: resetPasswordMutationResponseSchema,
    },
    '@post/auth/verify-password': {
      input: verifyPasswordMutationRequestSchema,
      output: verifyPasswordMutationResponseSchema,
    },
    '@get/auth/verify-email': {
      query: getApiAuthVerifyEmailQueryParamsSchema,
      output: getApiAuthVerifyEmailQueryResponseSchema,
    },
    '@post/auth/send-verification-email': {
      input: sendVerificationEmailMutationRequestSchema,
      output: sendVerificationEmailMutationResponseSchema,
    },
    '@post/auth/change-email': {
      input: changeEmailMutationRequestSchema,
      output: changeEmailMutationResponseSchema,
    },
    '@post/auth/change-password': {
      input: changePasswordMutationRequestSchema,
      output: changePasswordMutationResponseSchema,
    },
    '@post/auth/update-session': {
      input: updateSessionMutationRequestSchema,
      output: updateSessionMutationResponseSchema,
    },
    '@post/auth/update-user': {
      input: updateUserMutationRequestSchema,
      output: updateUserMutationResponseSchema,
    },
    '@post/auth/delete-user': {
      input: deleteUserMutationRequestSchema,
      output: deleteUserMutationResponseSchema,
    },
    '@post/auth/request-password-reset': {
      input: requestPasswordResetMutationRequestSchema,
      output: requestPasswordResetMutationResponseSchema,
    },
    '@get/auth/reset-password/:token': {
      params: resetPasswordCallbackPathParamsSchema,
      query: resetPasswordCallbackQueryParamsSchema,
      output: resetPasswordCallbackQueryResponseSchema,
    },
    '@get/auth/list-sessions': {
      output: listUserSessionsQueryResponseSchema,
    },
    '@post/auth/revoke-session': {
      input: postApiAuthRevokeSessionMutationRequestSchema,
      output: postApiAuthRevokeSessionMutationResponseSchema,
    },
    '@post/auth/revoke-sessions': {
      input: postApiAuthRevokeSessionsMutationRequestSchema,
      output: postApiAuthRevokeSessionsMutationResponseSchema,
    },
    '@post/auth/revoke-other-sessions': {
      input: postApiAuthRevokeOtherSessionsMutationRequestSchema,
      output: postApiAuthRevokeOtherSessionsMutationResponseSchema,
    },
    '@post/auth/link-social': {
      input: linkSocialAccountMutationRequestSchema,
      output: linkSocialAccountMutationResponseSchema,
    },
    '@get/auth/list-accounts': {
      output: listUserAccountsQueryResponseSchema,
    },
    '@get/auth/delete-user/callback': {
      query: getApiAuthDeleteUserCallbackQueryParamsSchema,
      output: getApiAuthDeleteUserCallbackQueryResponseSchema,
    },
    '@post/auth/unlink-account': {
      input: postApiAuthUnlinkAccountMutationRequestSchema,
      output: postApiAuthUnlinkAccountMutationResponseSchema,
    },
    '@post/auth/refresh-token': {
      input: postApiAuthRefreshTokenMutationRequestSchema,
      output: postApiAuthRefreshTokenMutationResponseSchema,
    },
    '@post/auth/get-access-token': {
      input: postApiAuthGetAccessTokenMutationRequestSchema,
      output: postApiAuthGetAccessTokenMutationResponseSchema,
    },
    '@get/auth/account-info': {
      output: getApiAuthAccountInfoQueryResponseSchema,
    },
    '@get/auth/ok': {
      output: getApiAuthOkQueryResponseSchema,
    },
    '@get/auth/error': {
      output: getApiAuthErrorQueryResponseSchema,
    },
    '@post/auth/admin/set-role': {
      input: setUserRoleMutationRequestSchema,
      output: setUserRoleMutationResponseSchema,
    },
    '@get/auth/admin/get-user': {
      query: getUserQueryParamsSchema,
      output: getUserQueryResponseSchema,
    },
    '@post/auth/admin/create-user': {
      input: createUserMutationRequestSchema,
      output: createUserMutationResponseSchema,
    },
    '@post/auth/admin/update-user': {
      input: adminUpdateUserMutationRequestSchema,
      output: adminUpdateUserMutationResponseSchema,
    },
    '@get/auth/admin/list-users': {
      query: listUsersQueryParamsSchema,
      output: listUsersQueryResponseSchema,
    },
    '@post/auth/admin/list-user-sessions': {
      input: adminListUserSessionsMutationRequestSchema,
      output: adminListUserSessionsMutationResponseSchema,
    },
    '@post/auth/admin/unban-user': {
      input: unbanUserMutationRequestSchema,
      output: unbanUserMutationResponseSchema,
    },
    '@post/auth/admin/ban-user': {
      input: banUserMutationRequestSchema,
      output: banUserMutationResponseSchema,
    },
    '@post/auth/admin/impersonate-user': {
      input: impersonateUserMutationRequestSchema,
      output: impersonateUserMutationResponseSchema,
    },
    '@post/auth/admin/stop-impersonating': {
      output: postApiAuthAdminStopImpersonatingMutationResponseSchema,
    },
    '@post/auth/admin/revoke-user-session': {
      input: revokeUserSessionMutationRequestSchema,
      output: revokeUserSessionMutationResponseSchema,
    },
    '@post/auth/admin/revoke-user-sessions': {
      input: revokeUserSessionsMutationRequestSchema,
      output: revokeUserSessionsMutationResponseSchema,
    },
    '@post/auth/admin/remove-user': {
      input: removeUserMutationRequestSchema,
      output: removeUserMutationResponseSchema,
    },
    '@post/auth/admin/set-user-password': {
      input: setUserPasswordMutationRequestSchema,
      output: setUserPasswordMutationResponseSchema,
    },
    '@post/auth/admin/has-permission': {
      input: postApiAuthAdminHasPermissionMutationRequestSchema,
      output: postApiAuthAdminHasPermissionMutationResponseSchema,
    },
  },
  { strict: true },
)
