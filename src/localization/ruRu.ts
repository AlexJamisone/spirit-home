import type { LocalizationResource } from '@clerk/types';

const commonTexts = {
	signIn: {
		phoneCode: {
			title: 'Check your phone',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Verification code',
			formSubtitle:
				'Enter the verification code sent to your phone number',
			resendButton: 'Resend code',
		},
	},
} as const;

export const ruRU: LocalizationResource = {
	socialButtonsBlockButton: 'Continue with {{provider|titleize}}',
	dividerText: 'или',
	formFieldLabel__emailAddress: 'Твой Email',
	formFieldLabel__emailAddresses: 'Email addresses',
	formFieldLabel__phoneNumber: 'Phone number',
	formFieldLabel__username: 'Username',
	formFieldLabel__emailAddress_phoneNumber: 'Email address or phone number',
	formFieldLabel__emailAddress_username: 'Email address or username',
	formFieldLabel__phoneNumber_username: 'phone number or username',
	formFieldLabel__emailAddress_phoneNumber_username:
		'Email address, phone number or username',
	formFieldLabel__password: 'Пароль',
	formFieldLabel__newPassword: 'Новый пароль',
	formFieldLabel__confirmPassword: 'Потверди пароль',
	formFieldLabel__firstName: 'Имя',
	formFieldLabel__lastName: 'Фамилия',
	formFieldLabel__backupCode: 'Backup code',
	formFieldLabel__organizationName: 'Organization name',
	formFieldLabel__role: 'Role',
	formFieldInputPlaceholder__emailAddress: '',
	formFieldInputPlaceholder__emailAddresses:
		'Enter or paste one or more email addresses, separated by spaces or commas',
	formFieldInputPlaceholder__phoneNumber: '',
	formFieldInputPlaceholder__username: '',
	formFieldInputPlaceholder__emailAddress_phoneNumber: '',
	formFieldInputPlaceholder__emailAddress_username: '',
	formFieldInputPlaceholder__phoneNumber_username: '',
	formFieldInputPlaceholder__emailAddress_phoneNumber_username: '',
	formFieldInputPlaceholder__password: '',
	formFieldInputPlaceholder__firstName: '',
	formFieldInputPlaceholder__lastName: '',
	formFieldInputPlaceholder__backupCode: '',
	formFieldInputPlaceholder__organizationName: '',
	formFieldAction__forgotPassword: 'Забыли пароль?',
	formFieldHintText__optional: 'Необязательно',
	formButtonPrimary: 'Продолжить',
	signInEnterPasswordTitle: 'Введите свой пароль',
	backButton: 'Назад',
	footerActionLink__useAnotherMethod: 'Использовать другой метод',
	badge__primary: 'Primary',
	badge__thisDevice: 'This device',
	badge__userDevice: 'User device',
	badge__otherImpersonatorDevice: 'Other impersonator device',
	badge__default: 'Default',
	badge__unverified: 'Unverified',
	badge__requiresAction: 'Requires action',
	badge__you: 'You',
	footerPageLink__help: 'Help',
	footerPageLink__privacy: 'Privacy',
	footerPageLink__terms: 'Terms',
	paginationButton__previous: 'Previous',
	paginationButton__next: 'Next',
	paginationRowText__displaying: 'Displaying',
	paginationRowText__of: 'of',
	membershipRole__admin: 'Admin',
	membershipRole__basicMember: 'Member',
	membershipRole__guestMember: 'Guest',
	signUp: {
		start: {
			title: 'Создай свой аккаунт',
			subtitle: 'продолжить с {{applicationName}}',
			actionText: 'Уже есть аккаунт?',
			actionLink: 'Вход',
		},
		emailLink: {
			title: 'Подтвердите Ваш электронный адрес',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Идентификация по email',
			formSubtitle:
				'Используй ссылку для потверждения которая была отправленна на указанный email',
			resendButton: 'Отправить повторно',
			verified: {
				title: 'Successfully signed up',
			},
			loading: {
				title: 'Signing up...',
			},
			verifiedSwitchTab: {
				title: 'Successfully verified email',
				subtitle: 'Return to the newly opened tab to continue',
				subtitleNewTab: 'Return to previous tab to continue',
			},
		},
		emailCode: {
			title: 'Подтвердите Ваш email',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Verification code',
			formSubtitle:
				'Enter the verification code sent to your email address',
			resendButton: 'Resend code',
		},
		phoneCode: {
			title: 'Verify your phone',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Verification code',
			formSubtitle:
				'Enter the verification code sent to your phone number',
			resendButton: 'Resend code',
		},
		continue: {
			title: 'Fill in missing fields',
			subtitle: 'продолжить с {{applicationName}}',
			actionText: 'Have an account?',
			actionLink: 'Sign in',
		},
	},
	signIn: {
		start: {
			title: 'Вход',
			subtitle: 'Продолжить с {{applicationName}}',
			actionText: 'Нету аккаунта?',
			actionLink: 'Регистрация',
		},
		password: {
			title: 'Введите свой пароль',
			subtitle: 'продолжить с {{applicationName}}',
			actionLink: 'Использовать другой метод',
		},
		emailCode: {
			title: 'Check your email',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Verification code',
			formSubtitle:
				'Enter the verification code sent to your email address',
			resendButton: 'Resend code',
		},
		emailLink: {
			title: 'Check your email',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: 'Verification link',
			formSubtitle: 'Use the verification link sent to your email',
			resendButton: 'Resend link',
			unusedTab: {
				title: 'You may close this tab',
			},
			verified: {
				title: 'Successfully signed in',
				subtitle: 'You will be redirected soon',
			},
			verifiedSwitchTab: {
				subtitle: 'Return to original tab to continue',
				titleNewTab: 'Signed in on other tab',
				subtitleNewTab: 'Return to the newly opened tab to continue',
			},
			loading: {
				title: 'Signing in...',
				subtitle: 'You will be redirected soon',
			},
			failed: {
				title: 'This verification link is invalid',
				subtitle: 'Return to the original tab to continue.',
			},
			expired: {
				title: 'This verification link has expired',
				subtitle: 'Return to the original tab to continue.',
			},
		},
		phoneCode: { ...commonTexts.signIn.phoneCode },
		phoneCodeMfa: { ...commonTexts.signIn.phoneCode, subtitle: '' },
		totpMfa: {
			title: 'Two-step verification',
			subtitle: '',
			formTitle: 'Verification code',
			formSubtitle:
				'Enter the verification code generated by your authenticator app',
		},
		backupCodeMfa: {
			title: 'Enter a backup code',
			subtitle: 'продолжить с {{applicationName}}',
			formTitle: '',
			formSubtitle: '',
		},
		alternativeMethods: {
			title: 'Use another method',
			actionLink: 'Get help',
			blockButton__emailLink: 'Send link to {{identifier}}',
			blockButton__emailCode: 'Send code to {{identifier}}',
			blockButton__phoneCode: 'Send code to {{identifier}}',
			blockButton__password: 'Войти с помощью пароля',
			blockButton__totp: 'Use your authenticator app',
			blockButton__backupCode: 'Use a backup code',
			getHelp: {
				title: 'Помощь',
				content: `If you’re experiencing difficulty signing into your account, email us and we will work with you to restore access as soon as possible.`,
				blockButton__emailSupport: 'Email support',
			},
		},
		noAvailableMethods: {
			title: 'Cannot sign in',
			subtitle: 'An error occurred',
			message:
				"Cannot proceed with sign in. There's no available authentication factor.",
		},
	},
	userProfile: {
		mobileButton__menu: 'Меню',
		formButtonPrimary__continue: 'Продолжить',
		formButtonPrimary__finish: 'Завершить',
		formButtonReset: 'Отмена',
		start: {
			headerTitle__account: 'Аккаунт',
			headerTitle__security: 'Безопасность',
			headerSubtitle__account: 'Управление учётной записи',
			headerSubtitle__security: 'Управляйте настройками безопасности',
			profileSection: {
				title: 'Профиль',
			},
			usernameSection: {
				title: 'Username',
				primaryButton__changeUsername: 'Change username',
				primaryButton__setUsername: 'Set username',
			},
			emailAddressesSection: {
				title: 'Твои Email',
				primaryButton: 'Добавить Email-адрес',
				detailsTitle__primary: 'Главный email адрес',
				detailsSubtitle__primary:
					'Этот адрес электронной почты является основным адресом электронной почты',
				detailsAction__primary: 'Complete verification',
				detailsTitle__nonPrimary: 'Set as primary email address',
				detailsSubtitle__nonPrimary:
					'Set this email address as the primary to receive communications regarding your account.',
				detailsAction__nonPrimary: 'Set as primary',
				detailsTitle__unverified:
					'Неподтвержденный адрес электронной почты',
				detailsSubtitle__unverified:
					'Этот адрес электронной почты не был подтвержден, и его функциональность может быть ограничена.',
				detailsAction__unverified: 'Complete verification',
				destructiveActionTitle: 'Удалить',
				destructiveActionSubtitle:
					'Удалите этот адрес электронной почты и удалите его из своей учетной записи.',
				destructiveAction: 'Удалить адрес электронной почты',
			},
			phoneNumbersSection: {
				title: 'Phone numbers',
				primaryButton: 'Add a phone number',
				detailsTitle__primary: 'Primary phone number',
				detailsSubtitle__primary:
					'This phone number is the primary phone number',
				detailsAction__primary: 'Complete verification',
				detailsTitle__nonPrimary: 'Set as primary phone number',
				detailsSubtitle__nonPrimary:
					'Set this phone number as the primary to receive communications regarding your account.',
				detailsAction__nonPrimary: 'Set as primary',
				detailsTitle__unverified: 'Unverified phone number',
				detailsSubtitle__unverified:
					'This phone number has not been verified and may be limited in functionality',
				detailsAction__unverified: 'Complete verification',
				destructiveActionTitle: 'Remove',
				destructiveActionSubtitle:
					'Delete this phone number and remove it from your account',
				destructiveAction: 'Remove phone number',
			},
			connectedAccountsSection: {
				title: 'Подключить аккаунты',
				primaryButton: 'Подключить аккаунт',
				title__conectionFailed: 'Retry failed connection',
				title__reauthorize: 'Reauthorization required',
				subtitle__reauthorize:
					'The required scopes have been updated, and you may be experiencing limited functionality. Please re-authorize this application to avoid any issues',
				actionLabel__conectionFailed: 'Try again',
				actionLabel__reauthorize: 'Authorize now',
				destructiveActionTitle: 'Удалить',
				destructiveActionSubtitle:
					'Удалите эту подключенную учетную запись из своей учетной записи',
				destructiveActionAccordionSubtitle:
					'Удалить подключенную учетную запись',
			},
			passwordSection: {
				title: 'Пароль',
				primaryButton__changePassword: 'Изменить пароль',
				primaryButton__setPassword: 'Установить пароль',
			},
			mfaSection: {
				title: 'Two-step verification',
				primaryButton: 'Add two-step verification',
				phoneCode: {
					destructiveActionTitle: 'Remove',
					destructiveActionSubtitle:
						'Remove this phone number from the two-step verification methods',
					destructiveActionLabel: 'Remove phone number',
					title__default: 'Default factor',
					title__setDefault: 'Set as Default factor',
					subtitle__default:
						'This factor will be used as the default two-step verification method when signing in.',
					subtitle__setDefault:
						'Set this factor as the default factor to use it as the default two-step verification method when signing in.',
					actionLabel__setDefault: 'Set as default',
				},
				backupCodes: {
					headerTitle: 'Backup codes',
					title__regenerate: 'Regenerate backup codes',
					subtitle__regenerate:
						'Get a fresh set of secure backup codes. Prior backup codes will be deleted and cannot be used.',
					actionLabel__regenerate: 'Regenerate codes',
				},
				totp: {
					headerTitle: 'Authenticator application',
					title: 'Default factor',
					subtitle:
						'This factor will be used as the default two-step verification method when signing in.',
					destructiveActionTitle: 'Remove',
					destructiveActionSubtitle:
						'Remove authenticator application from the two-step verification methods',
					destructiveActionLabel: 'Remove authenticator application',
				},
			},
			activeDevicesSection: {
				title: 'Активные устройства',
				primaryButton: 'Активные устройства',
				detailsTitle: 'Текущее устройство',
				detailsSubtitle:
					'Это устройство, которое вы сейчас используете',
				destructiveActionTitle: 'Выход',
				destructiveActionSubtitle:
					'Sign out from your account on this device',
				destructiveAction: 'Sign out of device',
			},
			web3WalletsSection: {
				title: 'Web3 wallets',
				primaryButton: 'Web3 wallets',
				destructiveActionTitle: 'Remove',
				destructiveActionSubtitle:
					'Remove this web3 wallet from your account',
				destructiveAction: 'Remove wallet',
			},
		},
		profilePage: {
			title: 'Обновить профиль',
			imageFormTitle: 'Аватар',
			imageFormSubtitle: 'Загрузить',
			imageFormDestructiveActionSubtitle: 'Удалить',
			fileDropAreaTitle: 'Перетащите файл сюда или...',
			fileDropAreaAction: 'Выберите файл',
			fileDropAreaHint:
				'Загрузите изображение в формате JPG, PNG, GIF или WEBP размером менее 10 МБ.',
			successMessage: 'Ваш профиль был обновлен.',
		},
		usernamePage: {
			title: 'Update username',
			successMessage: 'Your username has been updated.',
		},
		emailAddressPage: {
			title: 'Добавить Адрес Электронной почты',
			emailCode: {
				formHint:
					'На этот адрес электронной почты будет отправлено письмо с кодом подтверждения.',
				formTitle: 'Verification code',
				formSubtitle:
					'Enter the verification code sent to {{identifier}}',
				resendButton: 'Resend code',
				successMessage:
					'The email {{identifier}} has been added to your account.',
			},
			emailLink: {
				formHint:
					'An email containing a verification link will be sent to this email address.',
				formTitle: 'Verification link',
				formSubtitle:
					'Click on the verification link in the email sent to {{identifier}}',
				resendButton: 'Resend link',
				successMessage:
					'The email {{identifier}} has been added to your account.',
			},
			removeResource: {
				title: 'Remove email address',
				messageLine1:
					'{{identifier}} will be removed from this account.',
				messageLine2:
					'You will no longer be able to sign in using this email address.',
				successMessage:
					'{{emailAddress}} has been removed from your account.',
			},
		},
		phoneNumberPage: {
			title: 'Add phone number',
			successMessage: '{{identifier}} has been added to your account.',
			infoText:
				'A text message containing a verification link will be sent to this phone number.',
			infoText__secondary: 'Message and data rates may apply.',
			removeResource: {
				title: 'Remove phone number',
				messageLine1:
					'{{identifier}} will be removed from this account.',
				messageLine2:
					'You will no longer be able to sign in using this phone number.',
				successMessage:
					'{{phoneNumber}} has been removed from your account.',
			},
		},
		connectedAccountPage: {
			title: 'Добавить подключенную учетную запись',
			formHint:
				'Выберите провайдера для подключения вашей учетной записи.',
			formHint__noAccounts:
				'There are no available external account providers.',
			socialButtonsBlockButton: 'Connect {{provider|titleize}} account',
			successMessage: 'The provider has been added to your account',
			removeResource: {
				title: 'Удалить подключенную учетную запись',
				messageLine1:
					'{{identifier}} will be removed from this account.',
				messageLine2:
					'You will no longer be able to use this connected account and any dependent features will no longer work.',
				successMessage:
					'{{connectedAccount}} has been removed from your account.',
			},
		},
		web3WalletPage: {
			title: 'Add web3 wallet',
			subtitle__availableWallets:
				'Select a web3 wallet to connect to your account.',
			subtitle__unavailableWallets:
				'There are no available web3 wallets.',
			successMessage: 'The wallet has been added to your account.',
			removeResource: {
				title: 'Remove web3 wallet',
				messageLine1:
					'{{identifier}} will be removed from this account.',
				messageLine2:
					'You will no longer be able to sign in using this web3 wallet.',
				successMessage:
					'{{web3Wallet}} has been removed from your account.',
			},
		},
		passwordPage: {
			title: 'Установи пароль',
			successMessage: 'Your password has been set.',
		},
		mfaPage: {
			title: 'Add two-step verification',
			formHint: 'Select a method to add.',
		},
		mfaTOTPPage: {
			title: 'Add authenticator application',
			verifyTitle: 'Verification code',
			verifySubtitle:
				'Enter verification code generated by your authenticator',
			successMessage:
				'Two-step verification is now enabled. When signing in, you will need to enter a verification code from this authenticator as an additional step.',
			authenticatorApp: {
				infoText__ableToScan:
					'Set up a new sign-in method in your authenticator app and scan the following QR code to link it to your account.',
				infoText__unableToScan:
					'Set up a new sign-in method in your authenticator and enter the Key provided below.',
				inputLabel__unableToScan1:
					'Make sure Time-based or One-time passwords is enabled, then finish linking your account.',
				inputLabel__unableToScan2:
					'Alternatively, if your authenticator supports TOTP URIs, you can also copy the full URI.',
				buttonAbleToScan__nonPrimary: 'Scan QR code instead',
				buttonUnableToScan__nonPrimary: 'Can’t scan QR code?',
			},
			removeResource: {
				title: 'Remove two-step verification',
				messageLine1:
					'Verification codes from this authenticator will no longer be required when signing in.',
				messageLine2:
					'Your account may not be as secure. Are you sure you want to continue?',
				successMessage:
					'Two-step verification via authenticator application has been removed.',
			},
		},
		mfaPhoneCodePage: {
			title: 'Add SMS code verification',
			primaryButton__addPhoneNumber: 'Add a phone number',
			subtitle__availablePhoneNumbers:
				'Select a phone number to register for SMS code two-step verification.',
			subtitle__unavailablePhoneNumbers:
				'There are no available phone numbers to register for SMS code two-step verification.',
			successMessage:
				'SMS code two-step verification is now enabled for this phone number. When signing in, you will need to enter a verification code sent to this phone number as an additional step.',
			removeResource: {
				title: 'Remove two-step verification',
				messageLine1:
					'{{identifier}} will be no longer receiving verification codes when signing in.',
				messageLine2:
					'Your account may not be as secure. Are you sure you want to continue?',
				successMessage:
					'SMS code two-step verification has been removed for {{mfaPhoneCode}}',
			},
		},
		backupCodePage: {
			title: 'Add backup code verification',
			title__codelist: 'Backup codes',
			subtitle__codelist: 'Store them securely and keep them secret.',
			infoText1: 'Backup codes will be enabled for this account.',
			infoText2:
				'Keep the backup codes secret and store them securely. You may regenerate backup codes if you suspect they have been compromised.',
			successSubtitle:
				'You can use one of these to sign in to your account, if you lose access to your authentication device.',
			successMessage:
				'Backup codes are now enabled. You can use one of these to sign in to your account, if you lose access to your authentication device. Each code can only be used once.',
			actionLabel__copy: 'Copy all',
			actionLabel__copied: 'Copied!',
			actionLabel__download: 'Download .txt',
			actionLabel__print: 'Print',
		},
	},
	userButton: {
		action__manageAccount: 'Управление аккаунтом',
		action__signOut: 'Выход',
		action__signOutAll: 'Sign out of all accounts',
		action__addAccount: 'Add account',
	},
	organizationSwitcher: {
		personalWorkspace: 'Personal Workspace',
		notSelected: 'No organization selected',
		action__createOrganization: 'Create Organization',
		action__manageOrganization: 'Manage Organization',
	},
	impersonationFab: {
		title: 'Signed in as {{identifier}}',
		action__signOut: 'Выход',
	},
	organizationProfile: {
		start: {
			headerTitle__members: 'Members',
			headerTitle__settings: 'Settings',
			headerSubtitle__members: 'View and manage organization members',
			headerSubtitle__settings: 'Manage organization settings',
		},
		profilePage: {
			title: 'Organization Profile',
			subtitle: 'Manage organization profile',
			successMessage: 'The organization has been updated.',
			dangerSection: {
				title: 'Danger',
				leaveOrganization: {
					title: 'Leave organization',
					messageLine1:
						'Are you sure you want to leave this organization? You will lose access to this organization and its applications.',
					messageLine2: 'This action is permanent and irreversible.',
					successMessage: 'You have left the organization.',
				},
			},
		},
		invitePage: {
			title: 'Invite members',
			subtitle: 'Invite new members to this organization',
			successMessage: 'Invitations successfully sent',
			detailsTitle__inviteFailed:
				'The invitations could not be sent. Fix the following and try again:',
			formButtonPrimary__continue: 'Send invitations',
		},
		membersPage: {
			detailsTitle__emptyRow: 'No members to display',
			action__invite: 'Invite',
			start: {
				headerTitle__active: 'Active',
				headerTitle__invited: 'Invited',
			},
			activeMembersTab: {
				tableHeader__user: 'User',
				tableHeader__joined: 'Joined',
				tableHeader__role: 'Role',
				tableHeader__actions: '',
				menuAction__remove: 'Remove member',
			},
			invitedMembersTab: {
				tableHeader__invited: 'Invited',
				menuAction__revoke: 'Revoke invitation',
			},
		},
	},
	createOrganization: {
		title: 'Create Organization',
		formButtonSubmit: 'Create organization',
		subtitle: 'Set the organization profile',
		invitePage: {
			formButtonReset: 'Skip',
		},
	},
	unstable__errors: {
		form_identifier_not_found: '',
		form_password_pwned: '',
		form_username_invalid_length: '',
		form_param_format_invalid: '',
		form_password_length_too_short: '',
		form_param_nil: '',
		form_code_incorrect: '',
		form_password_incorrect: '',
		not_allowed_access: '',
		form_identifier_exists: '',
	},
	dates: {
		previous6Days:
			"Last {{ date | weekday('en-US','long') }} at {{ date | timeString('en-US') }}",
		lastDay: "Yesterday at {{ date | timeString('en-US') }}",
		sameDay: "Today at {{ date | timeString('en-US') }}",
		nextDay: "Tomorrow at {{ date | timeString('en-US') }}",
		next6Days:
			"{{ date | weekday('en-US','long') }} at {{ date | timeString('en-US') }}",
		numeric: "{{ date | numeric('en-US') }}",
	},
} as const;
