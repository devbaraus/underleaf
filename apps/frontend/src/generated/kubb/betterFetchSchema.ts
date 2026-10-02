import * as z from 'zod'
import {
	adminListUserSessionsBodySchema,
	adminListUserSessionsResponseSchema,
} from './zod/adminListUserSessionsSchema'
import {
	adminUpdateUserBodySchema,
	adminUpdateUserResponseSchema,
} from './zod/adminUpdateUserSchema'
import { banUserBodySchema, banUserResponseSchema } from './zod/banUserSchema'
import {
	changeEmailBodySchema,
	changeEmailResponseSchema,
} from './zod/changeEmailSchema'
import {
	changePasswordBodySchema,
	changePasswordResponseSchema,
} from './zod/changePasswordSchema'
import {
	createUserBodySchema,
	createUserResponseSchema,
} from './zod/createUserSchema'
import {
	deleteApiProjectsByIdCollaboratorsByUserIdPathIdSchema,
	deleteApiProjectsByIdCollaboratorsByUserIdPathUserIdSchema,
} from './zod/deleteApiProjectsByIdCollaboratorsByUserIdSchema'
import {
	deleteApiProjectsByIdFilesByFileIdPathFileIdSchema,
	deleteApiProjectsByIdFilesByFileIdPathIdSchema,
} from './zod/deleteApiProjectsByIdFilesByFileIdSchema'
import { deleteApiProjectsByIdPathIdSchema } from './zod/deleteApiProjectsByIdSchema'
import {
	deleteUserBodySchema,
	deleteUserResponseSchema,
} from './zod/deleteUserSchema'
import { getApiAuthAccountInfoResponseSchema } from './zod/getApiAuthAccountInfoSchema'
import {
	getApiAuthCallbackIdPathIdSchema,
	getApiAuthCallbackIdResponseSchema,
} from './zod/getApiAuthCallbackIdSchema'
import {
	getApiAuthDeleteUserCallbackQueryCallbackURLSchema,
	getApiAuthDeleteUserCallbackQueryTokenSchema,
	getApiAuthDeleteUserCallbackResponseSchema,
} from './zod/getApiAuthDeleteUserCallbackSchema'
import { getApiAuthErrorResponseSchema } from './zod/getApiAuthErrorSchema'
import { getApiAuthOkResponseSchema } from './zod/getApiAuthOkSchema'
import {
	getApiAuthVerifyEmailQueryCallbackURLSchema,
	getApiAuthVerifyEmailQueryTokenSchema,
	getApiAuthVerifyEmailResponseSchema,
} from './zod/getApiAuthVerifyEmailSchema'
import { getApiProjectsByIdCollaboratorsPathIdSchema } from './zod/getApiProjectsByIdCollaboratorsSchema'
import { getApiProjectsByIdLogsPathIdSchema } from './zod/getApiProjectsByIdLogsSchema'
import { getApiProjectsByIdPdfPathIdSchema } from './zod/getApiProjectsByIdPdfSchema'
import { getApiProjectsByIdPathIdSchema } from './zod/getApiProjectsByIdSchema'
import {
	getApiReferencesMendeleyCallbackQueryCodeSchema,
	getApiReferencesMendeleyCallbackQueryErrorDescriptionSchema,
	getApiReferencesMendeleyCallbackQueryErrorSchema,
	getApiReferencesMendeleyCallbackQueryStateSchema,
} from './zod/getApiReferencesMendeleyCallbackSchema'
import {
	getSessionPostBodySchema,
	getSessionPostResponseSchema,
} from './zod/getSessionPostSchema'
import { getSessionResponseSchema } from './zod/getSessionSchema'
import {
	getUserQueryIdSchema,
	getUserResponseSchema,
} from './zod/getUserSchema'
import {
	impersonateUserBodySchema,
	impersonateUserResponseSchema,
} from './zod/impersonateUserSchema'
import {
	linkSocialAccountBodySchema,
	linkSocialAccountResponseSchema,
} from './zod/linkSocialAccountSchema'
import { listUserAccountsResponseSchema } from './zod/listUserAccountsSchema'
import { listUserSessionsResponseSchema } from './zod/listUserSessionsSchema'
import {
	listUsersQueryFilterFieldSchema,
	listUsersQueryFilterOperatorSchema,
	listUsersQueryFilterValueSchema,
	listUsersQueryLimitSchema,
	listUsersQueryOffsetSchema,
	listUsersQuerySearchFieldSchema,
	listUsersQuerySearchOperatorSchema,
	listUsersQuerySearchValueSchema,
	listUsersQuerySortBySchema,
	listUsersQuerySortDirectionSchema,
	listUsersResponseSchema,
} from './zod/listUsersSchema'
import { patchApiAdminUsersByIdQuotaPathIdSchema } from './zod/patchApiAdminUsersByIdQuotaSchema'
import { patchApiAdminUsersByIdRolePathIdSchema } from './zod/patchApiAdminUsersByIdRoleSchema'
import { patchApiAdminUsersByIdStatusPathIdSchema } from './zod/patchApiAdminUsersByIdStatusSchema'
import { patchApiProjectsByIdPathIdSchema } from './zod/patchApiProjectsByIdSchema'
import {
	postApiAuthAdminHasPermissionBodySchema,
	postApiAuthAdminHasPermissionResponseSchema,
} from './zod/postApiAuthAdminHasPermissionSchema'
import { postApiAuthAdminStopImpersonatingResponseSchema } from './zod/postApiAuthAdminStopImpersonatingSchema'
import {
	postApiAuthCallbackIdBodySchema,
	postApiAuthCallbackIdPathIdSchema,
	postApiAuthCallbackIdResponseSchema,
} from './zod/postApiAuthCallbackIdSchema'
import {
	postApiAuthGetAccessTokenBodySchema,
	postApiAuthGetAccessTokenResponseSchema,
} from './zod/postApiAuthGetAccessTokenSchema'
import {
	postApiAuthRefreshTokenBodySchema,
	postApiAuthRefreshTokenResponseSchema,
} from './zod/postApiAuthRefreshTokenSchema'
import {
	postApiAuthRevokeOtherSessionsBodySchema,
	postApiAuthRevokeOtherSessionsResponseSchema,
} from './zod/postApiAuthRevokeOtherSessionsSchema'
import {
	postApiAuthRevokeSessionBodySchema,
	postApiAuthRevokeSessionResponseSchema,
} from './zod/postApiAuthRevokeSessionSchema'
import {
	postApiAuthRevokeSessionsBodySchema,
	postApiAuthRevokeSessionsResponseSchema,
} from './zod/postApiAuthRevokeSessionsSchema'
import {
	postApiAuthUnlinkAccountBodySchema,
	postApiAuthUnlinkAccountResponseSchema,
} from './zod/postApiAuthUnlinkAccountSchema'
import { postApiProjectsByIdCompilePathIdSchema } from './zod/postApiProjectsByIdCompileSchema'
import { postApiProjectsByIdFilesPathIdSchema } from './zod/postApiProjectsByIdFilesSchema'
import { postApiReferencesByProjectIdMendeleyImportPathProjectIdSchema } from './zod/postApiReferencesByProjectIdMendeleyImportSchema'
import { postApiReferencesByProjectIdZoteroImportPathProjectIdSchema } from './zod/postApiReferencesByProjectIdZoteroImportSchema'
import { putApiProjectsByIdCollaboratorsPathIdSchema } from './zod/putApiProjectsByIdCollaboratorsSchema'
import {
	putApiProjectsByIdFilesByFileIdPathFileIdSchema,
	putApiProjectsByIdFilesByFileIdPathIdSchema,
} from './zod/putApiProjectsByIdFilesByFileIdSchema'
import {
	removeUserBodySchema,
	removeUserResponseSchema,
} from './zod/removeUserSchema'
import {
	requestPasswordResetBodySchema,
	requestPasswordResetResponseSchema,
} from './zod/requestPasswordResetSchema'
import {
	resetPasswordCallbackPathTokenSchema,
	resetPasswordCallbackQueryCallbackURLSchema,
	resetPasswordCallbackResponseSchema,
} from './zod/resetPasswordCallbackSchema'
import {
	resetPasswordBodySchema,
	resetPasswordResponseSchema,
} from './zod/resetPasswordSchema'
import {
	revokeUserSessionBodySchema,
	revokeUserSessionResponseSchema,
} from './zod/revokeUserSessionSchema'
import {
	revokeUserSessionsBodySchema,
	revokeUserSessionsResponseSchema,
} from './zod/revokeUserSessionsSchema'
import {
	sendVerificationEmailBodySchema,
	sendVerificationEmailResponseSchema,
} from './zod/sendVerificationEmailSchema'
import {
	setUserPasswordBodySchema,
	setUserPasswordResponseSchema,
} from './zod/setUserPasswordSchema'
import {
	setUserRoleBodySchema,
	setUserRoleResponseSchema,
} from './zod/setUserRoleSchema'
import {
	signInEmailBodySchema,
	signInEmailResponseSchema,
} from './zod/signInEmailSchema'
import { signOutBodySchema, signOutResponseSchema } from './zod/signOutSchema'
import {
	signUpWithEmailAndPasswordBodySchema,
	signUpWithEmailAndPasswordResponseSchema,
} from './zod/signUpWithEmailAndPasswordSchema'
import {
	socialSignInBodySchema,
	socialSignInResponseSchema,
} from './zod/socialSignInSchema'
import {
	unbanUserBodySchema,
	unbanUserResponseSchema,
} from './zod/unbanUserSchema'
import {
	updateSessionBodySchema,
	updateSessionResponseSchema,
} from './zod/updateSessionSchema'
import {
	updateUserBodySchema,
	updateUserResponseSchema,
} from './zod/updateUserSchema'
import {
	verifyPasswordBodySchema,
	verifyPasswordResponseSchema,
} from './zod/verifyPasswordSchema'
import { createSchema } from '@better-fetch/fetch'

export const betterFetchSchema = createSchema(
	{
		'@get/user/me': {},
		'@get/projects': {},
		'@post/projects': {},
		'@get/projects/:id': {
			params: z.object({ id: getApiProjectsByIdPathIdSchema }),
		},
		'@patch/projects/:id': {
			params: z.object({ id: patchApiProjectsByIdPathIdSchema }),
		},
		'@delete/projects/:id': {
			params: z.object({ id: deleteApiProjectsByIdPathIdSchema }),
		},
		'@post/projects/:id/files': {
			params: z.object({ id: postApiProjectsByIdFilesPathIdSchema }),
		},
		'@put/projects/:id/files/:fileId': {
			params: z.object({
				id: putApiProjectsByIdFilesByFileIdPathIdSchema,
				fileId: putApiProjectsByIdFilesByFileIdPathFileIdSchema,
			}),
		},
		'@delete/projects/:id/files/:fileId': {
			params: z.object({
				id: deleteApiProjectsByIdFilesByFileIdPathIdSchema,
				fileId: deleteApiProjectsByIdFilesByFileIdPathFileIdSchema,
			}),
		},
		'@get/projects/:id/collaborators': {
			params: z.object({ id: getApiProjectsByIdCollaboratorsPathIdSchema }),
		},
		'@put/projects/:id/collaborators': {
			params: z.object({ id: putApiProjectsByIdCollaboratorsPathIdSchema }),
		},
		'@delete/projects/:id/collaborators/:userId': {
			params: z.object({
				id: deleteApiProjectsByIdCollaboratorsByUserIdPathIdSchema,
				userId: deleteApiProjectsByIdCollaboratorsByUserIdPathUserIdSchema,
			}),
		},
		'@post/projects/:id/compile': {
			params: z.object({ id: postApiProjectsByIdCompilePathIdSchema }),
		},
		'@get/projects/:id/pdf': {
			params: z.object({ id: getApiProjectsByIdPdfPathIdSchema }),
		},
		'@get/projects/:id/logs': {
			params: z.object({ id: getApiProjectsByIdLogsPathIdSchema }),
		},
		'@get/admin/users': {},
		'@patch/admin/users/:id/quota': {
			params: z.object({ id: patchApiAdminUsersByIdQuotaPathIdSchema }),
		},
		'@patch/admin/users/:id/status': {
			params: z.object({ id: patchApiAdminUsersByIdStatusPathIdSchema }),
		},
		'@patch/admin/users/:id/role': {
			params: z.object({ id: patchApiAdminUsersByIdRolePathIdSchema }),
		},
		'@get/admin/projects': {},
		'@get/admin/telemetry': {},
		'@get/admin/audit': {},
		'@get/references/mendeley/status': {},
		'@post/references/mendeley/connect': {},
		'@get/references/mendeley/callback': {
			query: z.object({
				state: getApiReferencesMendeleyCallbackQueryStateSchema.optional(),
				code: getApiReferencesMendeleyCallbackQueryCodeSchema.optional(),
				error: getApiReferencesMendeleyCallbackQueryErrorSchema.optional(),
				error_description:
					getApiReferencesMendeleyCallbackQueryErrorDescriptionSchema.optional(),
			}),
		},
		'@delete/references/mendeley': {},
		'@post/references/:projectId/zotero/import': {
			params: z.object({
				projectId: postApiReferencesByProjectIdZoteroImportPathProjectIdSchema,
			}),
		},
		'@post/references/:projectId/mendeley/import': {
			params: z.object({
				projectId:
					postApiReferencesByProjectIdMendeleyImportPathProjectIdSchema,
			}),
		},
		'@post/auth/sign-in/social': {
			input: socialSignInBodySchema,
			output: socialSignInResponseSchema,
		},
		'@get/auth/callback/:id': {
			params: z.object({ id: getApiAuthCallbackIdPathIdSchema }),
			output: getApiAuthCallbackIdResponseSchema,
		},
		'@post/auth/callback/:id': {
			params: z.object({ id: postApiAuthCallbackIdPathIdSchema }),
			input: postApiAuthCallbackIdBodySchema,
			output: postApiAuthCallbackIdResponseSchema,
		},
		'@get/auth/get-session': {
			output: getSessionResponseSchema,
		},
		'@post/auth/get-session': {
			input: getSessionPostBodySchema,
			output: getSessionPostResponseSchema,
		},
		'@post/auth/sign-out': {
			input: signOutBodySchema,
			output: signOutResponseSchema,
		},
		'@post/auth/sign-up/email': {
			input: signUpWithEmailAndPasswordBodySchema,
			output: signUpWithEmailAndPasswordResponseSchema,
		},
		'@post/auth/sign-in/email': {
			input: signInEmailBodySchema,
			output: signInEmailResponseSchema,
		},
		'@post/auth/reset-password': {
			input: resetPasswordBodySchema,
			output: resetPasswordResponseSchema,
		},
		'@post/auth/verify-password': {
			input: verifyPasswordBodySchema,
			output: verifyPasswordResponseSchema,
		},
		'@get/auth/verify-email': {
			query: z.object({
				token: getApiAuthVerifyEmailQueryTokenSchema,
				callbackURL: getApiAuthVerifyEmailQueryCallbackURLSchema.optional(),
			}),
			output: getApiAuthVerifyEmailResponseSchema,
		},
		'@post/auth/send-verification-email': {
			input: sendVerificationEmailBodySchema,
			output: sendVerificationEmailResponseSchema,
		},
		'@post/auth/change-email': {
			input: changeEmailBodySchema,
			output: changeEmailResponseSchema,
		},
		'@post/auth/change-password': {
			input: changePasswordBodySchema,
			output: changePasswordResponseSchema,
		},
		'@post/auth/update-session': {
			input: updateSessionBodySchema,
			output: updateSessionResponseSchema,
		},
		'@post/auth/update-user': {
			input: updateUserBodySchema,
			output: updateUserResponseSchema,
		},
		'@post/auth/delete-user': {
			input: deleteUserBodySchema,
			output: deleteUserResponseSchema,
		},
		'@post/auth/request-password-reset': {
			input: requestPasswordResetBodySchema,
			output: requestPasswordResetResponseSchema,
		},
		'@get/auth/reset-password/:token': {
			params: z.object({ token: resetPasswordCallbackPathTokenSchema }),
			query: z.object({
				callbackURL: resetPasswordCallbackQueryCallbackURLSchema,
			}),
			output: resetPasswordCallbackResponseSchema,
		},
		'@get/auth/list-sessions': {
			output: listUserSessionsResponseSchema,
		},
		'@post/auth/revoke-session': {
			input: postApiAuthRevokeSessionBodySchema,
			output: postApiAuthRevokeSessionResponseSchema,
		},
		'@post/auth/revoke-sessions': {
			input: postApiAuthRevokeSessionsBodySchema,
			output: postApiAuthRevokeSessionsResponseSchema,
		},
		'@post/auth/revoke-other-sessions': {
			input: postApiAuthRevokeOtherSessionsBodySchema,
			output: postApiAuthRevokeOtherSessionsResponseSchema,
		},
		'@post/auth/link-social': {
			input: linkSocialAccountBodySchema,
			output: linkSocialAccountResponseSchema,
		},
		'@get/auth/list-accounts': {
			output: listUserAccountsResponseSchema,
		},
		'@get/auth/delete-user/callback': {
			query: z.object({
				token: getApiAuthDeleteUserCallbackQueryTokenSchema.optional(),
				callbackURL:
					getApiAuthDeleteUserCallbackQueryCallbackURLSchema.optional(),
			}),
			output: getApiAuthDeleteUserCallbackResponseSchema,
		},
		'@post/auth/unlink-account': {
			input: postApiAuthUnlinkAccountBodySchema,
			output: postApiAuthUnlinkAccountResponseSchema,
		},
		'@post/auth/refresh-token': {
			input: postApiAuthRefreshTokenBodySchema,
			output: postApiAuthRefreshTokenResponseSchema,
		},
		'@post/auth/get-access-token': {
			input: postApiAuthGetAccessTokenBodySchema,
			output: postApiAuthGetAccessTokenResponseSchema,
		},
		'@get/auth/account-info': {
			output: getApiAuthAccountInfoResponseSchema,
		},
		'@get/auth/ok': {
			output: getApiAuthOkResponseSchema,
		},
		'@get/auth/error': {
			output: getApiAuthErrorResponseSchema,
		},
		'@post/auth/admin/set-role': {
			input: setUserRoleBodySchema,
			output: setUserRoleResponseSchema,
		},
		'@get/auth/admin/get-user': {
			query: z.object({ id: getUserQueryIdSchema.optional() }),
			output: getUserResponseSchema,
		},
		'@post/auth/admin/create-user': {
			input: createUserBodySchema,
			output: createUserResponseSchema,
		},
		'@post/auth/admin/update-user': {
			input: adminUpdateUserBodySchema,
			output: adminUpdateUserResponseSchema,
		},
		'@get/auth/admin/list-users': {
			query: z.object({
				searchValue: listUsersQuerySearchValueSchema.optional(),
				searchField: listUsersQuerySearchFieldSchema.optional(),
				searchOperator: listUsersQuerySearchOperatorSchema.optional(),
				limit: listUsersQueryLimitSchema.optional(),
				offset: listUsersQueryOffsetSchema.optional(),
				sortBy: listUsersQuerySortBySchema.optional(),
				sortDirection: listUsersQuerySortDirectionSchema.optional(),
				filterField: listUsersQueryFilterFieldSchema.optional(),
				filterValue: listUsersQueryFilterValueSchema.optional(),
				filterOperator: listUsersQueryFilterOperatorSchema.optional(),
			}),
			output: listUsersResponseSchema,
		},
		'@post/auth/admin/list-user-sessions': {
			input: adminListUserSessionsBodySchema,
			output: adminListUserSessionsResponseSchema,
		},
		'@post/auth/admin/unban-user': {
			input: unbanUserBodySchema,
			output: unbanUserResponseSchema,
		},
		'@post/auth/admin/ban-user': {
			input: banUserBodySchema,
			output: banUserResponseSchema,
		},
		'@post/auth/admin/impersonate-user': {
			input: impersonateUserBodySchema,
			output: impersonateUserResponseSchema,
		},
		'@post/auth/admin/stop-impersonating': {
			output: postApiAuthAdminStopImpersonatingResponseSchema,
		},
		'@post/auth/admin/revoke-user-session': {
			input: revokeUserSessionBodySchema,
			output: revokeUserSessionResponseSchema,
		},
		'@post/auth/admin/revoke-user-sessions': {
			input: revokeUserSessionsBodySchema,
			output: revokeUserSessionsResponseSchema,
		},
		'@post/auth/admin/remove-user': {
			input: removeUserBodySchema,
			output: removeUserResponseSchema,
		},
		'@post/auth/admin/set-user-password': {
			input: setUserPasswordBodySchema,
			output: setUserPasswordResponseSchema,
		},
		'@post/auth/admin/has-permission': {
			input: postApiAuthAdminHasPermissionBodySchema,
			output: postApiAuthAdminHasPermissionResponseSchema,
		},
	},
	{ strict: true },
)
