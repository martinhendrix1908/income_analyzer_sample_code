- [Project Overview](#project-overview)
  - [Purpose](#purpose)
  - [Goals](#goals)
  - [Target Audience](#target-audience)
- [Technical Information](#technical-information)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
    - [public/build/](#publicbuild)
    - [release\_notes/](#release_notes)
    - [src/](#src)
      - [1. lib/](#1-lib)
      - [2. routes/](#2-routes)
      - [3. app.css](#3-appcss)
      - [4. app.d.ts](#4-appdts)
      - [5. app.html](#5-apphtml)
      - [6. hooks.server.ts](#6-hooksserverts)
        - [Key Features](#key-features)
        - [Purpose](#purpose-1)
      - [7. index.test.ts](#7-indextestts)
      - [static/](#static)
      - [tests/](#tests)
    - [.env files (.env, .env.chirp, .env.cmsbx, .env.dev, .env.sbx, .env.stg)](#env-files-env-envchirp-envcmsbx-envdev-envsbx-envstg)
    - [.gitignore](#gitignore)
    - [CHANGELOG.md](#changelogmd)
    - [Dockerfile](#dockerfile)
    - [package-lock.json](#package-lockjson)
    - [package.json](#packagejson)
    - [General Information](#general-information)
    - [Scripts](#scripts)
    - [Dependencies](#dependencies)
    - [DevDependencies](#devdependencies)
    - [Type](#type)
    - [playwright.config.ts](#playwrightconfigts)
    - [postcss.config.js](#postcssconfigjs)
    - [README.md](#readmemd)
    - [Svelte config files (svelte.config.js, svelte.config.dev.js, svelte.config.sbx.js)](#svelte-config-files-svelteconfigjs-svelteconfigdevjs-svelteconfigsbxjs)
    - [tailwind.config.js](#tailwindconfigjs)
    - [tsconfig.json](#tsconfigjson)
    - [vite.config.ts](#viteconfigts)
    - [State Management](#state-management)
  - [1. Cookies for Session Management](#1-cookies-for-session-management)
    - [Usage](#usage)
      - [Set Cookies](#set-cookies)
      - [Read Cookies](#read-cookies)
    - [`page.locals` for Session Data](#pagelocals-for-session-data)
      - [Example: Using the Handle Hook](#example-using-the-handle-hook)
    - [How It Works](#how-it-works)
      - [Usage in Pages](#usage-in-pages)
  - [2. Stores](#2-stores)
    - [Loader Store](#loader-store)
      - [Usage in Layout](#usage-in-layout)
      - [Example Code](#example-code)
    - [Toast Store](#toast-store)
      - [Usage](#usage-1)
      - [Example Code](#example-code-1)
  - [Layout](#layout)
    - [Overview](#overview)
- [Pages](#pages)
- [Login](#login)
  - [1. Overview](#1-overview)
  - [2. Functional Scope](#2-functional-scope)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown)
    - [3.1 Core Features](#31-core-features)
    - [3.2 User Interactions](#32-user-interactions)
  - [4. APIs](#4-apis)
    - [4.1 `/Auth/Login`](#41-authlogin)
    - [4.2 `/Auth/RefreshToken`](#42-authrefreshtoken)
    - [4.3 `/Auth/SendEmail`](#43-authsendemail)
  - [5. Key Components](#5-key-components)
    - [5.1 `Login` Component](#51-login-component)
    - [5.2 `ForgotPassword` Component](#52-forgotpassword-component)
    - [5.3 `page.svelte`](#53-pagesvelte)
  - [6. Actions (`actions`)](#6-actions-actions)
    - [6.1 `login`](#61-login)
    - [6.2 `refreshToken`](#62-refreshtoken)
    - [6.3 `send_reset_password_link`](#63-send_reset_password_link)
    - [6.4 `logout`](#64-logout)
  - [7. Helper Functions](#7-helper-functions)
    - [7.1 `setCookies`](#71-setcookies)
    - [7.2 `parse_jwt`](#72-parse_jwt)
    - [7.3 `encodePassword`](#73-encodepassword)
  - [8. Security Considerations](#8-security-considerations)
  - [9. Error Handling](#9-error-handling)
- [Set Password](#set-password)
  - [1. Overview](#1-overview-1)
  - [2. Functional Scope](#2-functional-scope-1)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-1)
    - [3.1 Core Features](#31-core-features-1)
    - [3.2 User Interactions](#32-user-interactions-1)
  - [4. Key Components](#4-key-components)
    - [4.1 Password Fields](#41-password-fields)
    - [4.2 Success and Error Messages](#42-success-and-error-messages)
    - [4.3 Submit Button](#43-submit-button)
  - [5. APIs](#5-apis)
    - [5.1 Reset Password](#51-reset-password)
    - [5.2 Request Password Reset Email (Optional)](#52-request-password-reset-email-optional)
  - [6. Actions (`actions`)](#6-actions-actions-1)
    - [6.1 `set_password`](#61-set_password)
- [Dashboard](#dashboard)
  - [1. Overview](#1-overview-2)
  - [2. Functional Scope](#2-functional-scope-2)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-2)
    - [3.1 Core Features](#31-core-features-2)
    - [3.2 User Interactions](#32-user-interactions-2)
  - [4. APIs](#4-apis-1)
    - [4.1 `/TransDetails/GetRequestIds`](#41-transdetailsgetrequestids)
    - [4.2 `/TransDetails/GetFilteredRequestIdsWithPagination`](#42-transdetailsgetfilteredrequestidswithpagination)
  - [5. Key Components](#5-key-components-1)
    - [5.1 `ButtonGroup` Component](#51-buttongroup-component)
      - [Overview](#overview-1)
      - [Features](#features)
      - [Props](#props)
    - [5.2 `XlsxModal` Component](#52-xlsxmodal-component)
    - [5.3 `AccountsTable` Component](#53-accountstable-component)
      - [Overview](#overview-2)
      - [Features](#features-1)
      - [Props](#props-1)
      - [Table Structure](#table-structure)
      - [Styling](#styling)
    - [5.4 `AccountsTableSearchBar` Component](#54-accountstablesearchbar-component)
      - [Overview](#overview-3)
      - [Features](#features-2)
      - [Props](#props-2)
      - [Search Handling](#search-handling)
      - [Note](#note)
    - [5.5 `Pagination` Component](#55-pagination-component)
      - [Overview](#overview-4)
      - [Features](#features-3)
      - [Props](#props-3)
      - [Pagination Logic](#pagination-logic)
      - [Navigation Functions](#navigation-functions)
      - [Pagination List Generation](#pagination-list-generation)
    - [5.6 `SectionWrapper` Component](#56-sectionwrapper-component)
    - [5.7 `Welcome` Component](#57-welcome-component)
      - [Overview](#overview-5)
      - [Functionality](#functionality)
      - [Props:](#props-4)
      - [Key Features:](#key-features-1)
  - [6. Actions (`actions`)](#6-actions-actions-2)
    - [6.1 `getFilteredRequestIdsWithPagination`](#61-getfilteredrequestidswithpagination)
    - [6.2 `setCurrentPage`](#62-setcurrentpage)
    - [6.3 `toggleOpenImportFilesModal` and `toggleCloseImportFilesModal`](#63-toggleopenimportfilesmodal-and-togglecloseimportfilesmodal)
  - [7. Security Considerations](#7-security-considerations)
  - [8. Error Handling](#8-error-handling)
- [Create Request](#create-request)
  - [1. Overview](#1-overview-3)
  - [2. Functional Scope](#2-functional-scope-3)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-3)
    - [3.1 Core Features](#31-core-features-3)
      - [Form Sections:](#form-sections)
      - [Real-time Validation:](#real-time-validation)
      - [Dynamic Provider Selection:](#dynamic-provider-selection)
  - [4. APIs](#4-apis-2)
    - [4.1 `/IBVService/GetIBVProviders`](#41-ibvservicegetibvproviders)
    - [4.2 `/IBVService/CreateIBVRequest`](#42-ibvservicecreateibvrequest)
    - [4.3 `/api/validate-routing-number`](#43-apivalidate-routing-number)
  - [5. Key Components](#5-key-components-2)
    - [5.1 Form Component](#51-form-component)
    - [5.2 InputField Component](#52-inputfield-component)
    - [5.3 DynamicSelect Component](#53-dynamicselect-component)
    - [5.4 CreateRequestSearchBar Component](#54-createrequestsearchbar-component)
  - [6. Utility Functions](#6-utility-functions)
    - [6.1 `formatPhoneNumberAsYouType`](#61-formatphonenumberasyoutype)
    - [6.2 `copyToClipboard`](#62-copytoclipboard)
    - [6.3 `validateForm`](#63-validateform)
    - [6.4 `formDataToJSONString`](#64-formdatatojsonstring)
  - [7. State Management](#7-state-management)
    - [7.1 Form State](#71-form-state)
    - [7.2 Data Flow](#72-data-flow)
  - [8. Security Considerations](#8-security-considerations-1)
  - [9. Error Handling](#9-error-handling-1)
- [User Profile](#user-profile)
  - [1. Overview](#1-overview-4)
  - [2. Functional Scope](#2-functional-scope-4)
  - [3. Components](#3-components)
    - [3.1 Personal Information Card (`PersonalInfoCard`)](#31-personal-information-card-personalinfocard)
    - [3.2 Password Management Card (`PasswordManagementCard`)](#32-password-management-card-passwordmanagementcard)
    - [3.3 Profile Details Card (`ProfileDetailsCard`)](#33-profile-details-card-profiledetailscard)
    - [3.4 Profile Picture Management Modal (`ProfilePictureManagementModal`)](#34-profile-picture-management-modal-profilepicturemanagementmodal)
  - [4. APIs](#4-apis-3)
    - [4.1 Get User Data](#41-get-user-data)
    - [4.2 Update User Password](#42-update-user-password)
    - [4.3 Update User Information](#43-update-user-information)
  - [5. Actions](#5-actions)
    - [5.1 Server Actions](#51-server-actions)
      - [`updateUserPassword`](#updateuserpassword)
    - [5.2 API Actions](#52-api-actions)
      - [`setUser` (POST)](#setuser-post)
    - [6. State Management](#6-state-management)
      - [6.1 User Data State](#61-user-data-state)
      - [6.2 Image Management State](#62-image-management-state)
    - [7. Image Cropping Library](#7-image-cropping-library)
  - [8. Error Handling](#8-error-handling-1)
- [User Management](#user-management)
  - [1. Overview](#1-overview-5)
  - [2. Functional Scope](#2-functional-scope-5)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-4)
    - [3.1 Core Features](#31-core-features-4)
    - [3.2 User Interactions](#32-user-interactions-3)
  - [4. Key Components](#4-key-components-1)
    - [4.1 UsersTable Component](#41-userstable-component)
    - [4.2 OrganizationSearchBar Component](#42-organizationsearchbar-component)
    - [4.3 Button Group](#43-button-group)
  - [5. APIs](#5-apis-1)
    - [5.1 Get Users](#51-get-users)
- [Add/Update User](#addupdate-user)
  - [1. Overview](#1-overview-6)
  - [2. Functional Scope](#2-functional-scope-6)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-5)
    - [3.1 Core Features](#31-core-features-5)
    - [3.2 User Interactions](#32-user-interactions-4)
  - [4. Key Components](#4-key-components-2)
    - [4.1 UserDetailsAndAccess Component](#41-userdetailsandaccess-component)
    - [4.2  RolesAndAccessTable Component](#42--rolesandaccesstable-component)
      - [4.2.1  OrganizationUnit Component](#421--organizationunit-component)
  - [5. APIs](#5-apis-2)
    - [5.1 GET /Users/GetUserRoles](#51-get-usersgetuserroles)
    - [5.1 POST /api/users/manage-role/{userId}](#51-post-apiusersmanage-roleuserid)
  - [6. Form Validation](#6-form-validation)
    - [6.1  Field Validation](#61--field-validation)
        - [6.2  Submit Validation](#62--submit-validation)
  - [7. State Management](#7-state-management-1)
    - [7.1 User State](#71-user-state)
    - [7.2 Form State](#72-form-state)
  - [8. Utility Functions](#8-utility-functions)
  - [9. Error Handling](#9-error-handling-2)
- [Groups Management](#groups-management)
  - [1. Overview](#1-overview-7)
  - [2. Functional Scope](#2-functional-scope-7)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-6)
    - [3.1 Core Features](#31-core-features-6)
    - [3.2 User Interactions](#32-user-interactions-5)
  - [4. Key Components](#4-key-components-3)
    - [4.1 NestedGroupsTable Component](#41-nestedgroupstable-component)
    - [4.2 OrganizationSearchBar Component](#42-organizationsearchbar-component-1)
    - [4.3 NewEntityPopup Component](#43-newentitypopup-component)
    - [4.4 PopupMessage Component](#44-popupmessage-component)
  - [5. APIs](#5-apis-3)
    - [5.1 /Users/GetOrganizationUnits](#51-usersgetorganizationunits)
    - [5.2 /Users/SetOrganizationUnit](#52-userssetorganizationunit)
  - [6. State Management](#6-state-management-1)
    - [6.1 Page State](#61-page-state)
    - [6.2 Popup Messages](#62-popup-messages)
- [Unit Management](#unit-management)
  - [1. Overview](#1-overview-8)
  - [2. Functional Scope](#2-functional-scope-8)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-7)
    - [3.1 Core Features](#31-core-features-7)
    - [3.2 User Interactions](#32-user-interactions-6)
  - [4. Key Components](#4-key-components-4)
    - [4.1 UnitsTable Component](#41-unitstable-component)
    - [4.2 OrganizationSearchBar Component](#42-organizationsearchbar-component-2)
    - [4.3 NewEntityPopup Component](#43-newentitypopup-component-1)
    - [4.4 PopupMessage Component](#44-popupmessage-component-1)
  - [5. APIs](#5-apis-4)
    - [5.1 /Users/GetOrganizationUnits](#51-usersgetorganizationunits-1)
    - [5.2 /Users/SetOrganizationUnit](#52-userssetorganizationunit-1)
  - [6. State Management](#6-state-management-2)
    - [6.1 Page State](#61-page-state-1)
    - [6.2 Popup Messages](#62-popup-messages-1)
- [Group Details Management](#group-details-management)
  - [1. Overview](#1-overview-9)
  - [2. Functional Scope](#2-functional-scope-9)
  - [3. Components](#3-components-1)
    - [3.1 GroupOrUnitDetails Component](#31-grouporunitdetails-component)
    - [Child Components:](#child-components)
      - [1. SectionWrapper](#1-sectionwrapper)
      - [2. GroupUnitSidebar](#2-groupunitsidebar)
      - [3. GroupUnitSection](#3-groupunitsection)
    - [Data Handling in GroupOrUnitDetails Component:](#data-handling-in-grouporunitdetails-component)
  - [4. APIs](#4-apis-4)
    - [4.1 Get Organization Settings](#41-get-organization-settings)
  - [5. Screens Breakdown](#5-screens-breakdown)
    - [5.1 Group Details](#51-group-details)
      - [5.1.1 Purpose](#511-purpose)
      - [5.1.2 Key Features](#512-key-features)
      - [5.1.3 Key Components](#513-key-components)
      - [5.1.4 State Management](#514-state-management)
        - [State Variables](#state-variables)
        - [Reactivity](#reactivity)
      - [5.1.5 APIs and Props](#515-apis-and-props)
      - [5.1.6  Example Data Flow](#516--example-data-flow)
    - [5.2 Income](#52-income)
      - [5.2.1 Purpose](#521-purpose)
      - [5.2.2 Key Features](#522-key-features)
      - [5.2.3 Key Components](#523-key-components)
      - [5.2.3 State Management](#523-state-management)
    - [5.3 Lending Guide](#53-lending-guide)
      - [5.3.1 Purpose](#531-purpose)
      - [5.3.2 Key Features](#532-key-features)
      - [5.3.3 Key Components](#533-key-components)
      - [5.3.4 State Management](#534-state-management)
    - [5.4 Bank Connectivity Provider](#54-bank-connectivity-provider)
      - [5.3.1 Purpose](#531-purpose-1)
      - [5.3.2 Key Features](#532-key-features-1)
      - [5.3.3 Key Components](#533-key-components-1)
      - [5.3.4 State Management](#534-state-management-1)
      - [5.3.5 User Flow](#535-user-flow)
    - [5.5 Assessment Zones](#55-assessment-zones)
      - [5.5.1 Purpose](#551-purpose)
      - [5.5.2 Key Features](#552-key-features)
      - [5.4.3 Key Components](#543-key-components)
    - [5.6 API Settings](#56-api-settings)
      - [5.6.1 Purpose](#561-purpose)
      - [5.6.2 Key Features](#562-key-features)
      - [5.6.3 Key Components](#563-key-components)
      - [5.6.4 State Management](#564-state-management)
      - [5.6.5 API Integration](#565-api-integration)
      - [5.5.6 User Flow](#556-user-flow)
- [Organization Details Management](#organization-details-management)
  - [1. Overview](#1-overview-10)
  - [2. Inheritance from Group Details Management](#2-inheritance-from-group-details-management)
  - [3. Key Differences and Organization-Specific Features](#3-key-differences-and-organization-specific-features)
    - [3.1 Component Variations](#31-component-variations)
  - [4. API Differences](#4-api-differences)
    - [4.1 Organization-Specific Endpoints](#41-organization-specific-endpoints)
    - [4.2 Subscription Details Endpoint (Under development)](#42-subscription-details-endpoint-under-development)
      - [4.2.1 Bundle List API](#421-bundle-list-api)
      - [4.2.2 Feature List API](#422-feature-list-api)
  - [5 Feature-Specific Differences](#5-feature-specific-differences)
    - [5.1 API Settings Screen](#51-api-settings-screen)
  - [6. Additional Screens](#6-additional-screens)
    - [5.7 Subscription Details  (Under development)](#57-subscription-details--under-development)
      - [5.7.1 Purpose](#571-purpose)
      - [5.7.2 Key Features](#572-key-features)
      - [5.7.3 Key Components](#573-key-components)
      - [5.7.4 State Management](#574-state-management)
      - [5.7.5 Data Integration](#575-data-integration)
- [Unit Details Management](#unit-details-management)
  - [1. Overview](#1-overview-11)
  - [2. Inheritance from Group Details Management](#2-inheritance-from-group-details-management-1)
  - [3. Key Differences and Unit-Specific Features](#3-key-differences-and-unit-specific-features)
    - [3.1 Component Variations](#31-component-variations-1)
  - [4. API Differences](#4-api-differences-1)
    - [4.1 Unit-Specific Endpoints](#41-unit-specific-endpoints)
  - [5 Feature-Specific Differences](#5-feature-specific-differences-1)
- [Roles Management](#roles-management)
  - [1. Overview](#1-overview-12)
  - [2. Functional Scope](#2-functional-scope-10)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-8)
    - [3.1 Core Features](#31-core-features-8)
    - [3.2 User Interactions](#32-user-interactions-7)
  - [4. Key Components](#4-key-components-5)
    - [4.1 UsersTable Component](#41-userstable-component-1)
    - [4.2 OrganizationSearchBar Component](#42-organizationsearchbar-component-3)
    - [4.3 Button Group](#43-button-group-1)
  - [5. APIs](#5-apis-5)
    - [5.1 Get Roles](#51-get-roles)
- [Bundles Management](#bundles-management)
  - [1. Overview](#1-overview-13)
  - [2. Functional Scope](#2-functional-scope-11)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-9)
    - [3.1 Core Features](#31-core-features-9)
    - [3.2 User Interactions](#32-user-interactions-8)
  - [4. Key Components](#4-key-components-6)
    - [4.1 BundlesTable Component](#41-bundlestable-component)
    - [4.2 Add Bundle Button](#42-add-bundle-button)
    - [4.3 Expandable Feature Details](#43-expandable-feature-details)
  - [5. APIs](#5-apis-6)
    - [5.1 Get Bundles](#51-get-bundles)
  - [6. State Management](#6-state-management-3)
    - [6.1 Table State](#61-table-state)
- [Bundle Management (Add/Update Bundle)](#bundle-management-addupdate-bundle)
  - [1. Overview](#1-overview-14)
  - [2. Functional Scope](#2-functional-scope-12)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-10)
    - [3.1 Core Features](#31-core-features-10)
    - [3.2 User Interactions](#32-user-interactions-9)
  - [4. Key Components](#4-key-components-7)
    - [4.1 Bundle Information Form](#41-bundle-information-form)
    - [4.2 Dynamic Feature Selection](#42-dynamic-feature-selection)
    - [4.3 Tier Management](#43-tier-management)
    - [4.4 Save Button](#44-save-button)
  - [5. APIs](#5-apis-7)
    - [5.1 Fetch Features](#51-fetch-features)
  - [5.2 Fetch Bundle Details (Edit Mode)](#52-fetch-bundle-details-edit-mode)
  - [5.3 Save Bundle](#53-save-bundle)
  - [6. State Management](#6-state-management-4)
    - [6.1 Bundle State](#61-bundle-state)
    - [6.2 Error State](#62-error-state)
    - [6.3 Save State](#63-save-state)
- [Feature Management](#feature-management)
  - [1. Overview](#1-overview-15)
  - [2. Functional Scope](#2-functional-scope-13)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-11)
    - [3.1 Core Features](#31-core-features-11)
    - [3.2 User Interactions](#32-user-interactions-10)
  - [4. Key Components](#4-key-components-8)
    - [4.1 FeaturesTable Component](#41-featurestable-component)
    - [4.2 Add Feature Button](#42-add-feature-button)
    - [4.3 Tooltips](#43-tooltips)
  - [5. APIs](#5-apis-8)
    - [5.1 Get Features](#51-get-features)
  - [6. State Management](#6-state-management-5)
    - [6.1 Table State](#61-table-state-1)
- [Feature Management (Add/Update Feature)](#feature-management-addupdate-feature)
  - [1. Overview](#1-overview-16)
  - [2. Functional Scope](#2-functional-scope-14)
  - [3. Detailed Feature Breakdown](#3-detailed-feature-breakdown-12)
    - [3.1 Core Features](#31-core-features-12)
    - [3.2 User Interactions](#32-user-interactions-11)
  - [4. Key Components](#4-key-components-9)
    - [4.1 Feature Information Form](#41-feature-information-form)
    - [4.2 Tier Management](#42-tier-management)
    - [4.3 Save Button](#43-save-button)
  - [5. APIs](#5-apis-9)
    - [5.1 Fetch Feature Details (Edit Mode)](#51-fetch-feature-details-edit-mode)
    - [5.2 Save Feature](#52-save-feature)
  - [6. State Management](#6-state-management-6)
    - [6.1 Feature State](#61-feature-state)
  - [6.2 Validation State](#62-validation-state)
  - [6.3 Save State](#63-save-state-1)
- [Report](#report)
  - [1. Overview](#1-overview-17)
  - [2. Functional Scope](#2-functional-scope-15)
  - [3. Key Components](#3-key-components)
    - [3.1 Top Banner](#31-top-banner)
      - [3.1.1 Overview](#311-overview)
      - [3.1.2 Props](#312-props)
      - [3.1.3 Features](#313-features)
      - [3.1.4 Utility Functions](#314-utility-functions)
      - [3.1.5 Components](#315-components)
    - [3.2 Support Components](#32-support-components)
    - [3.3 Error](#33-error)
    - [3.3 Transactions Not Found](#33-transactions-not-found)
    - [3.4 Historical Report](#34-historical-report)
    - [3.5 Report Screens](#35-report-screens)
      - [3.5.1 Risk Assessment](#351-risk-assessment)
      - [3.5.2 Overview](#352-overview)
      - [3.5.3 IncomeTrends](#353-incometrends)
      - [3.5.4 Forcasted Paydays](#354-forcasted-paydays)
      - [3.5.5 Source And Frequency](#355-source-and-frequency)
      - [3.5.6 All Transactions](#356-all-transactions)
      - [3.5.6 Refresh Loading Screen](#356-refresh-loading-screen)
  - [4. API](#4-api)
    - [4.1 API Endpoints](#41-api-endpoints)
      - [4.1.1 /TransDetails/GetProcessingResults:](#411-transdetailsgetprocessingresults)
      - [4.1.1 /IBVService/RefreshConnect:](#411-ibvservicerefreshconnect)
- [Commom Components](#commom-components)
- [DoughnutChart](#doughnutchart)
  - [Purpose](#purpose-2)
  - [Key Features](#key-features-2)
  - [Props](#props-5)
  - [Notes](#notes)
- [DynamicLineChart Component](#dynamiclinechart-component)
  - [Purpose](#purpose-3)
  - [Key Features](#key-features-3)
  - [Props](#props-6)
    - [Pre-defined Colors in `Colors` constant](#pre-defined-colors-in-colors-constant)
- [Button Component](#button-component)
  - [Purpose](#purpose-4)
  - [Key Features](#key-features-4)
  - [Props](#props-7)
    - [Required](#required)
    - [Optional](#optional)
  - [Component Layout](#component-layout)
  - [Example Usage](#example-usage)
    - [Basic Examples](#basic-examples)
  - [Advanced Examples](#advanced-examples)
  - [Styling Reference](#styling-reference)
    - [Predefined Variants](#predefined-variants)
  - [Notes](#notes-1)
- [Checkbox Component](#checkbox-component)
  - [Purpose](#purpose-5)
  - [Key Features](#key-features-5)
  - [Props](#props-8)
    - [Required](#required-1)
    - [Optional](#optional-1)
  - [Component Layout](#component-layout-1)
  - [Example Usage](#example-usage-1)
    - [Basic Examples](#basic-examples-1)
  - [Advanced Examples](#advanced-examples-1)
- [Checkbox Component](#checkbox-component-1)
  - [Purpose](#purpose-6)
  - [Key Features](#key-features-6)
  - [Props](#props-9)
    - [Required](#required-2)
    - [Optional](#optional-2)
  - [Component Layout](#component-layout-2)
  - [Example Usage](#example-usage-2)
    - [Basic Examples](#basic-examples-2)
  - [Styling Reference](#styling-reference-1)
    - [Predefined Colors](#predefined-colors)
  - [Key Points](#key-points)
- [ColorRangePicker Component](#colorrangepicker-component)
  - [Purpose](#purpose-7)
  - [Features](#features-4)
  - [Props](#props-10)
  - [AssessmentZone Interface](#assessmentzone-interface)
  - [Slots](#slots)
  - [Customizable Styles](#customizable-styles)
  - [Behavior and Logic](#behavior-and-logic)
  - [Dependencies](#dependencies-1)
  - [Notes](#notes-2)
- [ConfirmationPopup Component](#confirmationpopup-component)
  - [Purpose](#purpose-8)
  - [Features](#features-5)
  - [Props](#props-11)
  - [Slots](#slots-1)
  - [Events](#events)
  - [Usage](#usage-2)
    - [Basic Example](#basic-example)
    - [Custom Content Example](#custom-content-example)
  - [Key Points](#key-points-1)
- [CustomSearchBar](#customsearchbar)
  - [Purpose](#purpose-9)
  - [Features](#features-6)
  - [Props](#props-12)
  - [Slots](#slots-2)
  - [Events](#events-1)
  - [Usage](#usage-3)
    - [Basic Example](#basic-example-1)
    - [Customized Styling](#customized-styling)
  - [Notes](#notes-3)
- [CustomSwitch Component](#customswitch-component)
  - [Purpose](#purpose-10)
  - [Features](#features-7)
  - [Props](#props-13)
  - [Slots](#slots-3)
  - [Events](#events-2)
  - [Usage](#usage-4)
    - [Basic Example](#basic-example-2)
    - [Customized Colors](#customized-colors)
    - [Conditional Text Visibility](#conditional-text-visibility)
  - [Key Points](#key-points-2)
- [DynamicFieldSearch](#dynamicfieldsearch)
  - [Purpose](#purpose-11)
  - [Features](#features-8)
  - [Props](#props-14)
  - [Slots](#slots-4)
  - [Events](#events-3)
  - [Usage](#usage-5)
    - [Basic Example](#basic-example-3)
    - [Dynamic Search Fields](#dynamic-search-fields)
  - [Key Points](#key-points-3)
- [DynamicSelect Component](#dynamicselect-component)
  - [Purpose](#purpose-12)
  - [Features](#features-9)
  - [Props](#props-15)
  - [Option Structure](#option-structure)
  - [Events](#events-4)
  - [Usage](#usage-6)
    - [Basic Usage](#basic-usage)
    - [Single-Select Mode](#single-select-mode)
  - [Features and UI Details](#features-and-ui-details)
- [FormMessage Component](#formmessage-component)
  - [Features](#features-10)
  - [Props](#props-16)
  - [Usage](#usage-7)
    - [Basic Usage](#basic-usage-1)
    - [Custom Styling](#custom-styling)
  - [Conditional Rendering](#conditional-rendering)
- [InformationTooltip Component](#informationtooltip-component)
  - [Purpose](#purpose-13)
  - [Features](#features-11)
  - [Props](#props-17)
  - [Usage](#usage-8)
    - [Basic Usage](#basic-usage-2)
    - [Custom Styling](#custom-styling-1)
  - [Tooltip Content Structure](#tooltip-content-structure)
  - [Customization](#customization)
- [InputField Component](#inputfield-component)
  - [Purpose](#purpose-14)
  - [Features](#features-12)
  - [Props](#props-18)
  - [Usage](#usage-9)
    - [Basic Usage](#basic-usage-3)
    - [Input with Validation and Error Handling](#input-with-validation-and-error-handling)
    - [Formatting Phone Number Input](#formatting-phone-number-input)
  - [Input Field Behavior](#input-field-behavior)
- [Loader Component](#loader-component)
  - [Purpose](#purpose-15)
  - [Props](#props-19)
  - [Usage](#usage-10)
    - [Basic Example](#basic-example-4)
    - [Loader without message](#loader-without-message)
  - [Component Behavior](#component-behavior)
  - [Accessibility](#accessibility)
- [LottiePlayer Component](#lottieplayer-component)
  - [Purpose](#purpose-16)
  - [Features](#features-13)
  - [Props](#props-20)
  - [Usage](#usage-11)
    - [Basic usage](#basic-usage-4)
  - [Component Behavior](#component-behavior-1)
- [PopOver Component](#popover-component)
  - [Purpose](#purpose-17)
  - [Features](#features-14)
  - [Props](#props-21)
  - [Behavior](#behavior)
    - [Positioning Logic](#positioning-logic)
  - [Usage](#usage-12)
    - [Basic Usage](#basic-usage-5)
  - [Key Points](#key-points-4)
- [PopupWrapper Component](#popupwrapper-component)
  - [Purpose](#purpose-18)
  - [Features](#features-15)
  - [Props](#props-22)
  - [Behavior](#behavior-1)
  - [Usage](#usage-13)
    - [Basic Usage](#basic-usage-6)
  - [Key Points](#key-points-5)
- [RangeSelector Component](#rangeselector-component)
  - [Purpose](#purpose-19)
  - [Features](#features-16)
  - [Props](#props-23)
  - [Behavior](#behavior-2)
  - [Usage](#usage-14)
    - [Basic Usage](#basic-usage-7)
  - [Key Points](#key-points-6)
- [SectionWrapper Component](#sectionwrapper-component)
  - [Purpose](#purpose-20)
  - [Features](#features-17)
  - [Props](#props-24)
  - [Behavior](#behavior-3)
  - [Usage](#usage-15)
  - [Key Points](#key-points-7)
- [SortButton](#sortbutton)
  - [Purpose](#purpose-21)
  - [Features](#features-18)
  - [Props](#props-25)
  - [Behavior](#behavior-4)
  - [Usage](#usage-16)
    - [Basic Usage](#basic-usage-8)
  - [Key Points](#key-points-8)
- [TabIconWrapper Component](#tabiconwrapper-component)
  - [Purpose](#purpose-22)
  - [Features](#features-19)
  - [Props](#props-26)
  - [Behavior](#behavior-5)
  - [Usage](#usage-17)
    - [Basic Usage](#basic-usage-9)
  - [Key Points](#key-points-9)
- [Tabs Component](#tabs-component)
  - [Purpose](#purpose-23)
  - [Features](#features-20)
  - [Props](#props-27)
  - [Behavior](#behavior-6)
  - [Usage](#usage-18)
    - [Basic usage](#basic-usage-10)
    - [Example with Icons](#example-with-icons)
    - [Example with URL sync](#example-with-url-sync)
  - [Key Points](#key-points-10)
- [TierManagement Component](#tiermanagement-component)
  - [Purpose](#purpose-24)
  - [Feateres](#feateres)
  - [Props](#props-28)
  - [States](#states)
  - [Behavior](#behavior-7)
  - [Usage](#usage-19)
    - [Basic Usage](#basic-usage-11)
  - [Key Points](#key-points-11)
- [Tooltip Component](#tooltip-component)
  - [Purpose](#purpose-25)
  - [Features](#features-21)
  - [Props](#props-29)
  - [Behavior](#behavior-8)
  - [Usage](#usage-20)
    - [Basic usage](#basic-usage-12)
    - [Example with Light Theme](#example-with-light-theme)
    - [Example with Component Content](#example-with-component-content)
  - [Key Points](#key-points-12)
- [Utility functions](#utility-functions)
  - [Common Utils](#common-utils)
    - [1. `groupBY` function](#1-groupby-function)
      - [1.1 Overview](#11-overview)
      - [1.2 Function](#12-function)
      - [1.3 Parameters](#13-parameters)
      - [1.4 Return Value](#14-return-value)
      - [1.5 Behavior](#15-behavior)
      - [1.6 Usage](#16-usage)
      - [1.7 Edge Cases](#17-edge-cases)
    - [2. `generateUniqueId` function](#2-generateuniqueid-function)
      - [2.1  Overview](#21--overview)
      - [2.2 Function](#22-function)
      - [2.3 Returns](#23-returns)
      - [2.4 Behavior](#24-behavior)
      - [2.5 Usage](#25-usage)
      - [2.6 Edge Cases](#26-edge-cases)
    - [3. `splitValuesToAnArray` function](#3-splitvaluestoanarray-function)
      - [3.1 Overview](#31-overview)
      - [3.2 Function](#32-function)
      - [3.3 Parameters](#33-parameters)
      - [3.4 Returns](#34-returns)
      - [3.5 Behavior](#35-behavior)
      - [3.6 Usage](#36-usage)
    - [4. `areObjectsEqual` function](#4-areobjectsequal-function)
      - [4.1 Overview](#41-overview)
      - [4.2 Function](#42-function)
      - [4.3 Parameters](#43-parameters)
      - [4.4 Returns](#44-returns)
      - [4.5 Behavior](#45-behavior)
      - [4.6 Usage](#46-usage)
    - [5. `debounce` function](#5-debounce-function)
      - [5.1 Overview](#51-overview)
      - [5.2 Function](#52-function)
      - [5.3 Parameters](#53-parameters)
      - [5.4 Returns](#54-returns)
      - [5.5 Behavior](#55-behavior)
      - [5.6 Usage](#56-usage)
    - [6. `deepClone` function](#6-deepclone-function)
      - [6.1 Overview](#61-overview)
      - [6.2 Function](#62-function)
      - [6.3 Parameters](#63-parameters)
      - [6.4 Returns](#64-returns)
      - [6.5 Usage](#65-usage)
  - [Canvas Utils](#canvas-utils)
    - [1. `createImage` function](#1-createimage-function)
      - [1.1 Overview](#11-overview-1)
      - [1.2 Function](#12-function-1)
      - [1.3 Parameters](#13-parameters-1)
      - [1.4 Returns](#14-returns)
      - [1.5 Usage](#15-usage)
      - [1.6 Edge Case](#16-edge-case)
    - [2. `getRadianAngle` function](#2-getradianangle-function)
      - [2.1 Overview](#21-overview)
      - [2.2 Function](#22-function-1)
      - [2.3 Parameters](#23-parameters)
      - [2.4 Returns](#24-returns)
      - [2.5 Usage](#25-usage-1)
      - [2.6 Edge Case](#26-edge-case)
    - [3. `getCroppedImg` function](#3-getcroppedimg-function)
      - [3.1 Overview](#31-overview-1)
      - [3.2 Function](#32-function-1)
      - [3.3 Parameters](#33-parameters-1)
      - [3.4 Returns](#34-returns-1)
      - [3.5 Usage](#35-usage)
      - [3.6 Edge Cases](#36-edge-cases)
    - [4. `getRotatedImage` function](#4-getrotatedimage-function)
      - [4.1 Overview](#41-overview-1)
      - [4.2 Function signature](#42-function-signature)
      - [4.3 Parameters](#43-parameters-1)
      - [4.4 Returns](#44-returns-1)
      - [4.5 Usage](#45-usage)
      - [4.6 Edge Cases](#46-edge-cases)
  - [Chart Utils](#chart-utils)
    - [1. `legends` constant](#1-legends-constant)
      - [1.1 Overview](#11-overview-2)
      - [1.2 `legends` data](#12-legends-data)
      - [1.3 Values](#13-values)
      - [1.4 Usage](#14-usage)
    - [2. `tabs` constant](#2-tabs-constant)
      - [2.1 Overview](#21-overview-1)
      - [2.2 `tabs` Data](#22-tabs-data)
      - [2.3 Values](#23-values)
    - [3. `hoverLine` plugin](#3-hoverline-plugin)
      - [3.1 Overview](#31-overview-2)
      - [3.2 Function](#32-function-2)
      - [3.3 Behavior](#33-behavior)
    - [4. `chartLabelValue` function](#4-chartlabelvalue-function)
      - [4.1 Overview](#41-overview-2)
      - [4.2 Function](#42-function-1)
      - [4.3 Parameters](#43-parameters-2)
      - [4.4 Returns](#44-returns-2)
      - [4.5 Behavior](#45-behavior-1)
    - [5. `getMinMax` function](#5-getminmax-function)
      - [5.1 Overview](#51-overview-1)
      - [5.2 Function](#52-function-1)
      - [5.3 Parameters](#53-parameters-1)
      - [5.4 Returns](#54-returns-1)
    - [6. `getTooltipData` function](#6-gettooltipdata-function)
      - [6.1 Overview](#61-overview-1)
      - [6.2 Function](#62-function-1)
      - [6.3 Parameters](#63-parameters-1)
      - [6.4 Returns](#64-returns-1)
    - [7. `determineTabVisibility` function](#7-determinetabvisibility-function)
      - [7.1 Overview](#71-overview)
      - [7.2 Function](#72-function)
      - [7.3 Parameters](#73-parameters)
      - [7.4 Returns](#74-returns)
      - [7.5 Behavior](#75-behavior)
    - [8. `removeDuplicates` function](#8-removeduplicates-function)
      - [8.1 Overview](#81-overview)
      - [8.2 Function](#82-function)
      - [8.3 Parameters](#83-parameters)
      - [8.4 Returns](#84-returns)
      - [8.5 Behavior](#85-behavior)
  - [Date Utils](#date-utils)
    - [1. `convertDateTime` function](#1-convertdatetime-function)
      - [1.1 Overview](#11-overview-3)
      - [1.2 Function](#12-function-2)
      - [1.3 Parameters](#13-parameters-2)
      - [1.4 Returns](#14-returns-1)
      - [1.5 Usage](#15-usage-1)
    - [2. `convertDate` function](#2-convertdate-function)
      - [2.1 Overview](#21-overview-2)
      - [2.2 Function](#22-function-2)
      - [2.3 Parameters](#23-parameters-1)
      - [2.4 Returns](#24-returns-1)
      - [2.5 Usage](#25-usage-2)
    - [3. `convertDateToDay` function](#3-convertdatetoday-function)
      - [3.1 Overview](#31-overview-3)
      - [3.2 Function](#32-function-3)
      - [3.3 Parameters](#33-parameters-2)
      - [3.4 Returns](#34-returns-2)
      - [3.5 Usage](#35-usage-1)
    - [4. `months` constant](#4-months-constant)
      - [4.1 Overview](#41-overview-3)
      - [4.2 Type Definition](#42-type-definition)
      - [4.3 Values](#43-values)
    - [5. `convertToDateMonth` function](#5-converttodatemonth-function)
      - [5.1 Overview](#51-overview-2)
      - [5.2 Function](#52-function-2)
      - [5.3 Parameters](#53-parameters-2)
      - [5.4 Returns](#54-returns-2)
      - [5.5 Usage](#55-usage)
    - [6. `convertToFormatedDate` function](#6-converttoformateddate-function)
      - [6.1 Overview](#61-overview-2)
      - [6.2 Function](#62-function-2)
      - [6.3 Parameters](#63-parameters-2)
      - [6.4 Returns](#64-returns-2)
      - [6.5 Usage](#65-usage-1)
    - [7. `dateMonthDifference` function](#7-datemonthdifference-function)
      - [7.1 Overview](#71-overview-1)
      - [7.2 Function](#72-function-1)
      - [7.3 Parameters](#73-parameters-1)
      - [7.4 Returns](#74-returns-1)
      - [7.5 Behavior](#75-behavior-1)
      - [7.6 Usage](#76-usage)
      - [7.7 Edge Cases](#77-edge-cases)
  - [Month-Year Utils](#month-year-utils)
    - [1. `findEndMonthAndYear` function](#1-findendmonthandyear-function)
      - [1.1 Overview](#11-overview-4)
      - [1.2 Function](#12-function-3)
      - [1.3 Parameters](#13-parameters-3)
      - [1.4 Returns](#14-returns-2)
      - [1.5 Behavior](#15-behavior-1)
      - [1.6 Usage](#16-usage-1)
    - [2. `findStartMonthAndYear` function](#2-findstartmonthandyear-function)
      - [2.1 Overview](#21-overview-3)
      - [2.2 Function](#22-function-3)
      - [2.3 Parameters](#23-parameters-2)
      - [2.4 Returns](#24-returns-2)
      - [2.5 Behavior](#25-behavior)
      - [2.6 Usage](#26-usage)
      - [2.7 Edge Cases](#27-edge-cases)
  - [Number Format Utils](#number-format-utils)
    - [1. `formatPhoneNumber` function](#1-formatphonenumber-function)
      - [1.1 Overview](#11-overview-5)
      - [1.2 Function](#12-function-4)
      - [1.3 Parameters](#13-parameters-4)
      - [1.4 Returns](#14-returns-3)
      - [1.5 Behavior](#15-behavior-2)
      - [1.6 Usage](#16-usage-2)
    - [2. `formatNumberOnly` function](#2-formatnumberonly-function)
      - [2.1 Overview](#21-overview-4)
      - [2.2 Function](#22-function-4)
      - [2.3 Parameters](#23-parameters-3)
      - [2.4 Returns](#24-returns-3)
      - [2.5 Usage](#25-usage-3)
    - [3. `addOrdinalSuffix` function](#3-addordinalsuffix-function)
      - [3.1 Overview](#31-overview-4)
      - [3.2 Function](#32-function-4)
      - [3.3 Parameters](#33-parameters-3)
      - [3.4 Returns](#34-returns-3)
      - [3.5 Behavior](#35-behavior-1)
      - [3.6 Usage](#36-usage-1)
    - [4. `parseNumericValue` function](#4-parsenumericvalue-function)
      - [4.1 Overview](#41-overview-4)
      - [4.2 Function](#42-function-2)
      - [4.3 Parameters](#43-parameters-3)
      - [4.4 Returns](#44-returns-3)
      - [4.5 Behavior](#45-behavior-2)
      - [4.6 Usage](#46-usage-1)
      - [4.7 Edge Cases](#47-edge-cases)
  - [Currency Utils](#currency-utils)
    - [1. `convertToUSD` function](#1-converttousd-function)
      - [1.1 Overview](#11-overview-6)
      - [1.2 Function](#12-function-5)
      - [1.3 Parameters](#13-parameters-5)
      - [1.4 Returns](#14-returns-4)
      - [1.5 Behavior](#15-behavior-3)
      - [1.6 Usage](#16-usage-3)
  - [Risk Assessment Utils](#risk-assessment-utils)
    - [2. `getRiskAssessmentFromRiskScore` function](#2-getriskassessmentfromriskscore-function)
      - [2.1 Overview](#21-overview-5)
      - [2.2 Function](#22-function-5)
      - [2.3 Parameters](#23-parameters-4)
      - [2.4 Returns](#24-returns-4)
      - [2.5 Behavior](#25-behavior-1)
      - [2.6 Usage](#26-usage-1)
# Project Overview 

**Version**: 3.1.95
**Date**: 01-31-2025

## Purpose

The Income Analyzer is an intelligent financial platform that transforms raw bank
statement transaction data into comprehensive income insights through
advanced data analysis algorithms. The solution aims to convert complex financial
information into actionable, meaningful intelligence about an individual's income
patterns and financial health.

## Goals

- Automate the analysis of bank statement transaction data
- Generate detailed insights about income sources, types, and frequencies
- Provide a comprehensive income health assessment
- Enable precise risk evaluation for financial and property-related decisions

- Create a scalable platform for financial intelligence and risk management
- Develop a tool that supports more informed lending and leasing decisions

## Target Audience

1. Business-to-Business (B2B) Markets
   a. Financial Institutions
   b. Lending Companies
   c. Property Management Firms
   d. Leasing Agencies
   e. Credit Assessment Organizations
2. Potential Future Markets
   a. Personal Finance Management Platforms
   b. Credit Counseling Services
   c. Insurance Providers
   d. Employment Verification Services
   e. Financial Technology (FinTech) Companies

The platform is designed to serve professionals who require deep, data-driven
insights into an individual's financial stability and income reliability, with the
flexibility to expand into broader personal financial management applications.

# Technical Information

## Technology Stack

- **Frontend Framework** : Sveltekit
- **Routing** : _filesystem-based router_ of Sveltekit
- **State Management** : Browser cookies & Svelte stores
- **Styling** : Tailwind
- **Build Tool** : Vite
- **Deployment Platform** : Azure

## Project Structure

Below is the screenshot that shows the overall folder structure of the source
code:

The screenshot highlights all the important elements in our source code. The main
point of focus over here lies in src, app.html, lib, hook.server.ts, static,
package.json and .env. Let’s deep dive into them one-by-one.

### public/build/

This folder holds static files that have been compiled or built, intended for serving
in production. SvelteKit places static assets here during the build process.

### release_notes/

Presumably a folder containing documentation or notes about the releases of the
application, useful for tracking changes between versions.

### src/

The main source code directory where application components, routes, and logic
are stored.

#### 1. lib/

This is a general-purpose folder for reusable resources in the project. It is
common to structure it as follows:

- **assets/:** Contains static files like images, fonts, or other assets used in the
  app.
- **components/:** Stores reusable UI components such as buttons, modals,
  forms, etc. These are building blocks for pages.
- **constants/:** A place for storing constant values, such as app-wide
  configuration or static values like API endpoints or enums.
- **functions/:** Houses utility or helper functions, like formatting dates,
  calculating values, or other reusable logic.
- **icons/:** Contains SVGs or icon components used throughout the app.
- **store/:** Holds Svelte writable or readable stores to manage global state.
- **types/:** Includes TypeScript definitions and interfaces for strict typing
  across the project.
- **utils/:** A folder for miscellaneous helper utilities that don’t fit into other
  categories, such as validation logic or error handling.

#### 2. routes/

This folder contains all the routes for your application. Each route corresponds to
a page in your app.

- **api/:** In this project, the /api folder is used to create server-side API endpoints that act
  as intermediaries between the client and the backend API. This approach ensures
  that API calls to the backend are made server-side, avoiding direct client-side
  requests.

- **layout.server.ts:** This file provides the user object from locals to all pages within the current layout
  for server-side rendering.

- **layout.svelte:** This file defines the main structure and functionality of your application's layout.
  It includes key components such as the header, sidebar, modals, and loaders,
  which are shared across multiple pages. The file manages navigation-related
  behaviors and global UI elements, ensuring a consistent experience.
  This file contains below components.

  - **Global Components** :
    - **Header** and **Sidebar** : Provide navigation and layout structure, with
      Sidebar data populated from menuItems.
    - **SessionTimeoutModal** : Manages user session expiration.
    - **Toasts** : Displays notifications at the bottom-left of the screen.
  - **Loading Management** : Uses beforeNavigate and afterNavigate hooks to display or hide the
    loader during page transitions, with customizable loader text.

  - **Page-Specific Logic** : Dynamically renders the header, sidebar, and loader if the user is
    authenticated (authToken) and not on login-related routes.
  - **Slot Handling** : Renders child components or pages ({@render children()}) to display
    the content specific to each route.

- **page.server.ts** : This file handles server-side redirection based on the user's role:

  - **Admin** and **Agent** are redirected to /dashboard.
  - Unauthenticated or invalid users are redirected to /login.

  It ensures role-based access control and proper routing for authenticated users.

- **page.svelte** : This file is empty because the base route (/) does not display any content. All requests to the base route are handled by page.server.ts, which redirects users to
  either the dashboard (/dashboard) or the login page (/login) based on their
  authentication and role.

#### 3. app.css

A global stylesheet file for the entire application. You can define base styles,
variables, or utility classes here.

#### 4. app.d.ts

A TypeScript declaration file that extends or augments the types available in the
SvelteKit application. You can use it to declare global types or interfaces.

#### 5. app.html

The `app.html` file is the main HTML template, providing the basic structure with
placeholders like %svelte.head% and `%svelte.body%` to dynamically inject head
elements and rendered components. It serves as the entry point for rendering the
app.

Here's a breakdown of its contents:

- **Document Type and HTML Element** :
  - `<!DOCTYPE html>`: Declares the document type as HTML5.
  - `<html lang="en" class="bg-naro">`: Defines the HTML document with a language attribute set to English and a bg-naro class for styling.
- **Head Section** :
  - `<meta charset="utf-8" />`: Specifies the character encoding for the document as UTF-8.
  - `<link rel="icon" href="%sveltekit.assets%/images/ia-logo.svg" />`: Links to the site's favicon, dynamically loaded from the SvelteKit assets.
  - `<link rel="preconnect" href="https://fonts.googleapis.com">` and
    `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`: Optimize font loading by preconnecting to Google Fonts.
  - `<link href="https://fonts.googleapis.com/...rel="stylesheet">`:
    Imports the Roboto font family from Google Fonts.
  - `<meta name="viewport" content="width=device-width" />`: Ensures
    the website is responsive by setting the viewport for mobile devices.
  - `<title>Income Analyzer</title>`: Sets the document's title.
  - `%sveltekit.head%`: Placeholder where SvelteKit injects additional
    head elements specific to the page.
- **Body Section** :
  - `<body data-sveltekit-preload-data="hover" class="...">`: The body has
    attributes for preloading data on hover and includes multiple classes for styling, such as background color (bg-naro), text color (text-naro-500), and other layout styles.
  - `<div style="display: contents">%sveltekit.body%</div>`: A wrapper
    for rendering the app’s content, with %sveltekit.body% serving as a
    placeholder for the app’s main content.
- **Script Section** :
  - The script within `<script type="text/javascript">` is used for
    integrating Mouseflow, a third-party service for tracking user
    interactions. The script asynchronously loads Mouseflow's JavaScript
    file to capture session data for analytics.\*\*\*\*

#### 6. hooks.server.ts

A server-side hook that runs before every request. It’s often used for tasks like:

- Setting up custom headers.
- Handling authentication.

```typescript
export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser

  const session = event.cookies.get("session");
  const name = event.cookies.get("name");
  const email = event.cookies.get("email");
  const id = event.cookies.get("id");
  const role = event.cookies.get("role");
  const last_login = event.cookies.get("lastLogindate");
  const panelConfig = event.cookies.get("panelConfig");
  const timeStampString = event.cookies.get("timeStamps");

  if (
    !session ||
    !name ||
    !email ||
    !id ||
    !role ||
    !last_login ||
    !panelConfig ||
    !timeStampString
  ) {
    return await resolve(event);
  }
  const timeStamps = JSON.parse(decodeURIComponent(timeStampString));
  const panelConfigs = JSON.parse(decodeURIComponent(panelConfig));

  event.locals.user = {
    authToken: session,
    name: name,
    email: email,
    id: id,
    role: role,
    last_login: last_login,
    panelConfig: panelConfigs,
    timeStamps: timeStamps,
  };
  const response = await resolve(event);

  const origin = event.url.origin;

  const image_src =
    "img-src 'self' data: blob: *.mouseflow.com " +
    SERVER_URL +
    "/images/users/; ";

  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' *.mouseflow.com; " +
      "style-src 'self' 'unsafe-inline' *.mouseflow.com; " +
      "connect-src 'self' blob: *.mouseflow.com; " +
      image_src +
      "font-src 'self' data: *.mouseflow.com; " +
      "frame-src 'self' *.mouseflow.com; " +
      "media-src 'self' *.mouseflow.com;"
  );

  response.headers.set(
    "Access-Control-Allow-Origin",
    event.request.headers.get("origin") || origin
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
};
```

##### Key Features

- **User Session Management** : - Extracts cookies (session, name, email, etc.) to retrieve user data. - Decodes and parses JSON-encoded cookies (panelConfig,
  timeStamps). - Attaches user data to event.locals.user, making it accessible
  throughout the app.
- **Content Security Policy (CSP)** : - Adds a Content-Security-Policy header to control resource
  loading (e.g., scripts, styles, images). - Restricts resources to trusted origins ('self', \*.mouseflow.com,
  SERVER_URL).
- **Cross-Origin Resource Sharing (CORS)** : - Sets headers for Access-Control-Allow-Origin, methods, and
  credentials to handle secure cross-origin requests.
- **Dynamic Request Handling** : - If cookies are incomplete, the request is resolved without user-
  specific processing. - Modifies responses dynamically based on user session data and app
  requirements.

##### Purpose

- **Authentication** : Ensures user sessions are validated and accessible server-
  side.

- **Security** : Protects against XSS attacks and manages secure cross-origin
  requests.
- **Custom Handling** : Provides flexibility to customize responses and requests
  globally.

#### 7. index.test.ts

A testing file, likely containing unit or integration tests for the home page or core
functionality. It’s written in TypeScript and could use a testing framework like
Vitest or Playwright.

#### static/

Contains static assets like images, icons, or other files that should be served as-is
without processing.

#### tests/

A directory for holding test files, likely used for end-to-end, integration, or unit
testing.

### .env files (.env, .env.chirp, .env.cmsbx, .env.dev, .env.sbx, .env.stg)

These files store environment variables for different configurations (e.g.,
development, staging, production). Each file may correspond to a specific
environment or feature set.

### .gitignore

Specifies which files and directories should be ignored by Git, preventing them
from being included in version control

### CHANGELOG.md

A markdown file that tracks the changes made in different versions of the project,
helping to keep a historical record of updates.

### Dockerfile

A configuration file that contains instructions to build a Docker image for the
project, used to containerize the application for consistent deployment.

### package-lock.json

An automatically generated file that locks the versions of dependencies installed
in node_modules, ensuring consistent installations.

### package.json

Defines the project's metadata, scripts, dependencies, and configurations for the
Node.js project.

### General Information

- **name** : The name of the project is "income-analyzer".
- **version** : The current version of the project is "3.1.88".
- **private** : This field is set to true, indicating that the package is private and
  should not be published to the npm registry.

### Scripts

- **dev** : Runs the development server using Vite (vite dev).
- **build** : Builds the project for production using Vite (vite build).
- **preview** : Previews the built project (vite preview).
- **test** : Runs both integration and unit tests (npm run test:integration &&
  npm run test:unit).
- **check** : Syncs SvelteKit and performs type checking with Svelte (svelte-kit
  sync && svelte-check --tsconfig ./tsconfig.json).
- **check:watch** : Similar to check, but watches for changes and re-runs the
  check (svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch).
- **lint** : Checks code formatting and linting using Prettier and ESLint (prettier --
  check. && eslint .).

- **format** : Formats the codebase using Prettier (prettier --write .).
- **test:integration** : Runs integration tests using Playwright (playwright test).
- **test:unit** : Runs unit tests using Vitest (vitest).

### Dependencies

- **@dagrejs/dagre** : Library for directed graphs, useful for layouts in
  visualizations.
- **@fortawesome/fontawesome-free** : Font Awesome icons for UI
  components.
- **@lottiefiles/svelte-lottie-player** : Lottie animation player for Svelte.
- **@sveltejs/adapter-node** : SvelteKit adapter for Node.js deployments.
- **@xyflow/svelte** : A library for flowchart or diagram functionalities in Svelte.
- **chart.js** : A popular library for creating charts.
- **chartjs-adapter-date-fns** : Adapter for chart.js to format dates using date-
  fns.
- **chartjs-plugin-datalabels** : Plugin for displaying data labels on chart.js
  charts.
- **clsx** : Utility for conditionally joining classNames together.
- **dotenv** : Loads environment variables from .env files.
- **svelte-easy-crop** : A cropper component for Svelte, useful for cropping
  images.
- **svelte-icons** : A collection of SVG icons for Svelte applications.

### DevDependencies

- **@playwright/test** : End-to-end testing library for automating browsers.
- **@sveltejs/adapter-auto** : SvelteKit adapter for automatic deployment
  environment detection.
- **@sveltejs/kit** : The core SvelteKit package.
- **@sveltejs/vite-plugin-svelte** : Vite plugin for Svelte, integrating Svelte with
  Vite.
- **@types/eslint** : TypeScript definitions for ESLint.

- **autoprefixer** : A PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint** : A linter tool for identifying and fixing problems in
  JavaScript/TypeScript code.
- **eslint-config-prettier** : Disables ESLint rules that conflict with Prettier.
- **eslint-plugin-svelte** : ESLint plugin for linting Svelte files.
- **globals** : A library of global variables for JavaScript.
- **postcss** : A tool to transform CSS with plugins.
- **prettier** : A code formatter for consistent code styling.
- **prettier-plugin-svelte** : A Prettier plugin for formatting Svelte files.
- **svelte** : The core Svelte framework.
- **svelte-check** : A tool for checking Svelte files for errors, type checking, and
  linting.
- **tailwindcss** : A utility-first CSS framework.
- **tslib** : Runtime library for TypeScript helper functions.
- **typescript** : TypeScript language support.
- **typescript-eslint** : Linter integration for TypeScript with ESLint.
- **vite** : A build tool for fast development.
- **vitest** : A testing framework that integrates well with Vite.

### Type

- **type** : Specifies that this project is a module ("module"), which allows the
  use of ES module syntax.

### playwright.config.ts

Configuration file for Playwright, an end-to-end testing library. It specifies test
settings, browsers, and other options.

### postcss.config.js

Configuration for PostCSS, a tool for transforming CSS with plugins.

### README.md

A markdown file that typically provides an overview of the project, including
setup instructions, usage, and other relevant information.

### Svelte config files (svelte.config.js, svelte.config.dev.js, svelte.config.sbx.js)

The main configuration file for SvelteKit, defining how the framework should
behave, including settings for plugins, preprocessors, and adapters according to
the environments.

### tailwind.config.js

Configuration file for Tailwind CSS, where customizations like theme extensions,
plugins, and other settings are defined.

### tsconfig.json

TypeScript configuration file that specifies compiler options and paths for the
TypeScript project.

### vite.config.ts

Configuration for Vite, the build tool used by SvelteKit. It defines settings for
plugins, server options, and build configuration.

### State Management

## 1. Cookies for Session Management

Cookies are used to store session data, such as authentication tokens, enabling the server to manage user sessions effectively.

### Usage

#### Set Cookies

```typescript
cookies.set("session", session, {
  path: "/",
  httpOnly: true,
  sameSite: "strict",
  maxAge: 60 * 60, // 1 hour
});
```

#### Read Cookies

```typescript
const session = cookies.get("session");
if (!session) throw redirect(302, "/login");
```

### `page.locals` for Session Data

`page.locals` holds per-request data, making it accessible throughout the app. Use the handle hook to extract cookie data and populate locals.

#### Example: Using the Handle Hook

```typescript
import { SERVER_URL } from "$env/static/private";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const session = event.cookies.get("session");
  const name = event.cookies.get("name");
  const email = event.cookies.get("email");
  const id = event.cookies.get("id");
  const role = event.cookies.get("role");
  const lastLogin = event.cookies.get("lastLogindate");
  const panelConfig = event.cookies.get("panelConfig");
  const timeStampString = event.cookies.get("timeStamps");

  if (
    !session ||
    !name ||
    !email ||
    !id ||
    !role ||
    !lastLogin ||
    !panelConfig ||
    !timeStampString
  ) {
    return await resolve(event);
  }

  const timeStamps = JSON.parse(decodeURIComponent(timeStampString));
  const panelConfigs = JSON.parse(decodeURIComponent(panelConfig));

  event.locals.user = {
    authToken: session,
    name,
    email,
    id,
    role,
    lastLogin,
    panelConfig: panelConfigs,
    timeStamps,
  };

  const response = await resolve(event);

  const origin = event.url.origin;

  const imageSrc = `img-src 'self' data: blob: *.mouseflow.com /images/users/; `;

  response.headers.set(
    "Content-Security-Policy",
    `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.mouseflow.com; style-src 'self' 'unsafe-inline' *.mouseflow.com; connect-src 'self' blob: *.mouseflow.com; ${imageSrc} font-src 'self' data: *.mouseflow.com; frame-src 'self' *.mouseflow.com; media-src 'self' *.mouseflow.com;`
  );

  response.headers.set(
    "Access-Control-Allow-Origin",
    event.request.headers.get("origin") || origin
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return response;
};
```

### How It Works

1. **Retrieve Cookies**: Extract cookies like session, name, and others from the request.
2. **Validation**: Ensure all required cookies are present; if not, the app continues without a session.
3. **Parse Complex Data**: Decode and parse JSON cookies like `panelConfig` and `timeStamps`.
4. **Populate `locals`**: Store session-related data in `event.locals.user`.
5. **Access in Load Functions**: Use `locals` in page load functions to retrieve user-specific data.

#### Usage in Pages

```typescript
export async function load({ locals }) {
  if (!locals.user) {
    throw redirect(302, "/login");
  }
  return { user: locals.user };
}
```

---

## 2. Stores

Stores are used for managing reactive states within the app, such as showing/hiding loaders and displaying toast notifications.

### Loader Store

- **File Path**: `$lib/store/loader_store.ts`
- **Purpose**: Manages the visibility and content of the loader across navigation and API calls.
- **Details**:
  - **Reactive State**: Tracks if the loader should be visible and what message it should display.

#### Usage in Layout

- **Show Loader**: Triggered using `showLoader()` during long-running operations (e.g., page navigation or API calls).
- **Hide Loader**: Invoked using `hideLoader()` after the operation completes.
- **Set Loader Text**: Invoked using `setLoaderText("Loading text")` to show text along with the spinning animation.

#### Example Code

```typescript
import { derived, writable } from "svelte/store";

const loading = writable<boolean>(false);
const loadingText = writable<string>("");

export const showLoader = () => {
  loading.set(true);
};

export const hideLoader = () => {
  loading.set(false);
};

export const setLoaderText = (text: string) => {
  loadingText.set(text);
};

export const isLoading = derived(loading, ($loading) => $loading);
export const loaderText = derived(loadingText, ($loadingText) => $loadingText);
```

### Toast Store

- **File Path**: `$lib/store/toast_store.ts`
- **Purpose**: Handles toast notifications to provide feedback to the user (e.g., success, error, or informational messages).
- **Reactive State**: Maintains a list of active toasts that are displayed in the UI.

#### Usage

- **Adding a Toast**: Use the `addToast()` function to display a toast message. The function accepts an object of type `Toast` with the following properties:

  ```typescript
  export type Toast = {
    id?: number; // Unique ID for the toast
    message: string; // The message to display
    type?: ToastType; // Type of the toast (e.g., "success", "error", "info")
    dismissible?: boolean; // Whether the toast can be manually dismissed
    timeout?: number; // Duration (ms) before the toast is removed automatically
    position?: ToastPosition; // Position of the toast on the screen
  };
  ```

- Automatically removes the toast after a set timeout or allows manual dismissal.
- **Dismiss all toast messages** using `dismissToast()`.

#### Example Code

```typescript
import { writable } from "svelte/store";

export type ToastType = "default" | "info" | "success" | "warning" | "error";
export type ToastPosition =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

export type Toast = {
  id?: number;
  message: string;
  type?: ToastType;
  dismissible?: boolean;
  timeout?: number;
  position?: ToastPosition;
};

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Toast) => {
  const id = Math.floor(Math.random() * 10000);
  const defaults: Toast = {
    id,
    type: "default",
    dismissible: false,
    timeout: 3000,
    position: "bottom-left",
    message: "",
  };

  toasts.update((all) => [{ ...defaults, ...toast }, ...all]);

  setTimeout(() => dismissToast(id), toast.timeout || defaults.timeout);
};

export const dismissToast = (id: number) => {
  toasts.update((all) => all.filter((t) => t.id !== id));
};

import { derived } from "svelte/store";
export const activeToasts = derived(toasts, ($toasts) => $toasts);
```

## Layout

### Overview

The layout structure in this project serves as the foundation for all pages. It
ensures a consistent design, behavior, and data flow throughout the application.
Shared components like the header, sidebar, modals, and loaders are managed
within the layout files to simplify screen-level implementations. This section
details the primary layout files and their roles in the project.

**_Key Layout Files_**

1. **layout.svelte** :
   - Handles the visual structure of the application, including rendering
     shared components such as headers, sidebars, and loaders.
   - Manages global behavior for navigation events using SvelteKit's
     beforeNavigate and afterNavigate hooks.
2. **layout.server.ts** :
   - Fetches and provides user-specific data (e.g., user information stored
     in locals.user) to be shared across the application.

**Shared Components**

**_Header_**

- **File Path** : `lib/components/layout/Header.svelte`

- **Purpose** : Displays the application header, including branding, menu icon, a
  Global search bar (functionality currently not added) and Logout link.

- **Key Features** :
  - Provides a toggle for opening and closing the sidebar.
  - Displays Logout link for quick access to log out from application.

**_Sidebar_**

- **File Path** : `lib/components/layout/Sidebar.svelte`
- **Purpose** : Renders the navigation menu for the application.
- **Props** :

  - **data**: An array of menu items to display.
    ```typescript
    export const menuItems: IMenuItems[] = [
    {
        name: "Favorites",
        link: "#!",
        icon: "heart",
        text: "Favorites",
        subMenuItems: [],
        isDevider: false,
        hasSubMenu: false
    },
    {
        name: "Settings",
        link: "#!",
        icon: "settings",
        text: "Settings",
        subMenuItems: [
            {
                name: "Manage Organization",
                link: "/manage/organizations",
                icon: "organization",
                text: "Manage Organization",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "Manage Groups",
                link: "/manage/groups",
                icon: "group",
                text: "Manage Groups",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "Manage Units",
                link: "/manage/units",
                icon: "units",
                text: "Manage Units",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "Global Permissions",
                link: "/manage/permissions",
                icon: "permissions",
                text: "Global Permissions",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "User Roles",
                link: "/manage/user-roles",
                icon: "roles",
                text: "User Roles",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "Manage Users",
                link: "/manage/users",
                icon: "users",
                text: "Manage Users",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            },
            {
                name: "Manage Bundles",
                link: "/manage/bundles",
                icon: "group",
                text: "Manage Bundles",
                subMenuItems: [],
                isDevider: false,
                hasSubMenu: false
            }
        ],
        isDevider: false,
        hasSubMenu: true
    },
    {
        name: "Billing",
        link: "/billing",
        icon: "billing",
        text: "Billing",
        subMenuItems: [],
        isDevider: false,
        hasSubMenu: false
    },
    {
        name: "Authentication",
        link: "#!",
        icon: "lock",
        text: "Authentication",
        subMenuItems: [],
        isDevider: false,
        hasSubMenu: false
    },
    {
        name: "API",
        link: "#!",
        icon: "api",
        text: "API",
        subMenuItems: [],
        isDevider: false,
        hasSubMenu: false
    }
    ];
    ```

    The above menuItem constant is stored in directory
    lib/constants/index.ts file and passed as props to the sidebar component. Currently it is static, later it will be received from API and
    will be shown dynamically.

  - **isSidebarOpen**: Boolean to toggle the visibility of the sidebar.

- **Usage** : Helps users navigate through the application.
- **Note:** The Favorites, Authentication, API, User Manual, and Release Notes links are not currently functional and will not redirect to any screens when clicked.

**_Session Timeout Modal_**

- **File Path** : `lib/components/layout/SessionTimeoutModal.svelte`
- **Purpose** : Alerts users when their session is about to expire due to inactivity and optionally logs them out.
- **Behavior** :
  - Tracks user activity and displays a modal after a predefined timeout.
- **Key Functions** :
  - **startTimer** : Initializes the countdown timer based on the session
    expiration timestamp. It continuously checks for time remaining and
    adjusts the session state accordingly (e.g., WARNING, EXPIRED).
  - **stopTimers** : Clears all active timers to prevent redundant execution,
    ensuring clean timer management when the modal is closed or the
    session expires.
  - **startRemainingTimer** : Handles the countdown for the warning
    period (last two minutes), updating the time remaining and session
    state dynamically.
  - **Lifecycle Methods** :
    - **onMount**: Starts the session timer and attaches an event
      listener for visibility changes.
    - **onDestroy**: Cleans up timers and removes event listeners to
      avoid memory leaks.
  - **Event Handlers** :
    - **handleClose**: Manages the logic for when the user explicitly
      closes the modal, stopping timers and resetting session state.
    - **handleOutsideClose**: Handles modal closure triggered by
      external actions, ensuring consistent cleanup and state reset.

**_Loader_**

- **File Path** : `lib/components/building_blocks/Loader.svelte`
- **Purpose** : Displays a spinner and message during route transitions or API
  calls.
- **Props** :
  o message: A custom message to display with the loader.
- **Usage** : Shown globally when an action (like page navigation) requires
  waiting.

**_Toasts_**

- **File Path**: `lib/components/toast/Toasts.svelte`
- **Purpose** : Displays notifications for success, error, or informational
  messages.
- **Behavior** :
  - Toasts appear at a specified position (e.g., bottom-left) and disappear automatically after a delay or on user action

**Global Navigation Behavior**

The layout incorporates global hooks for handling navigation:

- **beforeNavigate** : Displays the loader when navigation begins.
- **afterNavigate** : Hides the loader and resets loader messages after
  navigation is complete.

**Layout Flow**

1. The layout.svelte file initializes shared components, such as the Header,
   Sidebar, SessionTimeoutModal, and Toasts.
2. Data for the layout, including user information, is fetched in layout.server.ts
   and provided through the locals.user object.
3. Navigation events are managed globally to ensure a smooth user
   experience with loaders and transitions.

By managing these shared components and logic in the layout files, the
application ensures a consistent and efficient structure, making individual screens
lighter and more focused on specific functionality.

# Pages

# Login
## 1. Overview
The Login page serves as the entry point for users to authenticate themselves, enabling access to protected areas of the application. It facilitates user authentication, password reset, token refresh, and secure session management. This page ensures users are redirected to their appropriate roles’ dashboards after successful login.

## 2. Functional Scope
- Authenticate users with their credentials.
- Handle password reset requests.
- Provide secure token refresh functionality.
- Redirect authenticated users to the appropriate page based on roles (e.g., Admin, Client).

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Login Form**: Captures userId, password, and rememberMe option.
- **Secure Token Management**: Uses cookies to store tokens securely.
- **Password Reset**: Allows users to request password reset emails.
- **Role-Based Redirection**: Redirects users to pages such as `/dashboard` or `/admin` based on their role.

### 3.2 User Interactions
- **Login**: Users input their credentials and are authenticated via the `/Auth/Login` API.
- **Forgot Password**: Users provide an email address to request a password reset link.

## 4. APIs

### 4.1 `/Auth/Login`
- **Purpose**: Authenticates user credentials (email and password) and returns a JWT token upon successful authentication.
- **Input**: JSON body containing `email` and `password`.
- **Output**: 
  - Success: JWT token, user information.
  - Failure: 400 error with `invalid` or `credentials` set to true.

### 4.2 `/Auth/RefreshToken`
- **Purpose**: Refreshes the user's JWT using the existing token.
- **Input**: JWT from cookies.
- **Output**: New JWT and updated user information.

### 4.3 `/Auth/SendEmail`
- **Purpose**: Sends password reset emails to users.
- **Input**: JSON body containing `email`, `template`, and `callback URL`.
- **Output**: Success or failure message.

## 5. Key Components

### 5.1 `Login` Component
- **Purpose**: Handles the user authentication process.
- **Features**:
  - Displays a login form with fields for `userId`, `password`, and a `rememberMe` checkbox.
  - Toggles password visibility with the `VisibilityIcon`.
  - Handles input validation and submits the form using the `/Auth/Login` API.
  - Decodes and pre-fills saved credentials from cookies if the "Remember Me" option was enabled.
  - Displays error messages for invalid credentials or API failures.

### 5.2 `ForgotPassword` Component
- **Purpose**: Allows users to initiate the password reset process.
- **Features**:
  - Accepts a user’s email address and submits it via the `/Auth/SendEmail` API.
  - Displays success or error messages based on the API response.
  - Includes a link for users to open their email inbox directly.
  - Shows a confirmation message when the password reset link is sent successfully.

### 5.3 `page.svelte`
- **Purpose**: Acts as the entry point for rendering the appropriate component based on the `forgotPassword` query parameter.
- **Features**:
  - Dynamically loads either the `Login` or `ForgotPassword` component.
  - Extracts query parameters to determine the mode (login or password reset).

## 6. Actions (`actions`)

### 6.1 `login`
- **Input**: `userId`, `password`, `remember` (boolean), `returnURL`.
- **Process**:
  - Validates input.
  - Calls `/Auth/Login` API.
  - On success:
    - Creates `loginCred` object (userId, encoded password, remember).
    - Sets cookies: `loginCred` (if `remember` is true), `session` (JWT), `timeStamps`, `name`, `email`, `id`, `role`, `lastLogindate`, `panelConfig`.
    - Redirects to `returnURL`.
  - On failure: Returns a 400 error with `invalid` or `credentials` set to true.

### 6.2 `refreshToken`
- **Process**:
  - Calls `/Auth/RefreshToken` API.
  - On success: Updates user data and cookies (similar to `login` action).
  - Redirects to the referring page or `/`.
  - On failure: Returns a 400 error.

### 6.3 `send_reset_password_link`
- **Input**: `email`, `mailType`.
- **Process**:
  - Calls `/Auth/SendEmail` API with email, template, and callback URL.
  - Returns success/failure message.

### 6.4 `logout`
- **Process**:
  - Clears all cookies except `loginCred`.
  - Redirects to `/login`.

## 7. Helper Functions

### 7.1 `setCookies`
- Sets all necessary cookies related to user authentication and application configuration.
- Handles cookie expiration and secure flags.

### 7.2 `parse_jwt`
- Decodes the JWT to extract user information.

### 7.3 `encodePassword`
- Encodes the user's password before storing it in the `loginCred` cookie.

## 8. Security Considerations
- Passwords are encoded before being stored in cookies.
- JWTs are used for authentication and authorization.
- Secure and HTTPOnly flags are used for sensitive cookies.
- Input validation prevents common injection attacks.

## 9. Error Handling
- **Invalid Credentials**: Displays appropriate error messages for incorrect email or password.
- **API Failures**: Provides user-friendly error messages for backend issues.
  
# Set Password

## 1. Overview
The Set Password screen allows users to set their password securely by using a reset link sent via email. It ensures the password meets defined security requirements and provides real-time validation and feedback during the process. This screen supports both resetting an existing password and setting up a new account password.

## 2. Functional Scope
- Validate reset code from the URL to ensure the request is legitimate.
- Allow users to securely set a new password.
- Provide detailed feedback on password strength and requirements.
- Confirm password input to avoid mismatches.
- Handle expired or invalid reset links with appropriate error handling.
- Notify users of successful password reset or account setup.

## 3. Detailed Feature Breakdown
### 3.1 Core Features
- Password Input:
  - Collects the new password from the user.
  - Provides feedback on password strength based on criteria like uppercase, lowercase, numbers, special characters, and length.
- Confirm Password Input:
  - Ensures the user re-enters the same password for confirmation.
  - Displays a "passwords do not match" warning if they differ.
- Validation and Feedback:
  - Inline validation for password strength and confirmation.
  - Tooltip-like guidance for unmet password requirements.
- Submit Button:
  - Submits the password reset request to the backend.
  - Disabled if the form is invalid.

### 3.2 User Interactions
- Enter and confirm a new password.
- View real-time password strength validation feedback.
- Submit the password reset request.
- Handle expired or invalid reset links by requesting a new one.

## 4. Key Components
### 4.1 Password Fields
- **Password**:
  - Input for the new password.
  - Includes a toggle for visibility (text or password).
  - Validates password strength against the following **criteria**:
    - At least one uppercase letter.
    - At least one lowercase letter.
    - At least one number.
    - At least one special character.
    - Minimum length of 8 characters.
- **Confirm Password**:
  - Ensures the user re-enters the same password.
  - Shows a mismatch warning if the inputs do not match.

### 4.2 Success and Error Messages
  - **Success Message**:
    - Displays a confirmation message when the password is successfully reset or account setup is complete.
    - Provides a button to navigate back to the login page.
  - **Error Message**:
    - Displays errors for invalid or expired reset links, guiding the user to request a new link.
    - Inline messages for unmet password requirements or mismatched passwords.
### 4.3 Submit Button
- **Features**:
  - Submits the password reset form.
  - Disabled if validation fails or the reset link is invalid.
- **States**:
  - Loading: Displays a loading spinner during the submission process.
  - Success: Redirects to the login page with a success message.
  - Failure: Displays appropriate error messages.

## 5. APIs
### 5.1 Reset Password
- **Endpoint**: `POST /Auth/ResetPassword`
- **Purpose**: Submits the reset code and new password to the backend to update the user’s password.
- **Input**: `code`, `password`.
- **Output**: Message with success or failure status.

### 5.2 Request Password Reset Email (Optional)

- **Endpoint**: POST /api/send_mail
- **Purpose**: Sends a new reset password link to the user's email if the existing link has expired.
- **Input**: `email` and `mail.

## 6. Actions (`actions`)

### 6.1 `set_password`
- **Input**: `code`, `password`.
- **Process**:
  - Validates input.
  - Calls `/Auth/ResetPassword` API.
  - On success:
    - return object with  `message` and `success` set to true.
  - On failure: Returns a 400 error with `invalid` set to true.

# Dashboard

## 1. Overview
The Dashboard page provides an overview of the user's account data, with functionality for viewing, sorting, and searching requests. It includes components for displaying account details, managing pagination, searching for specific request IDs, and uploading XLSX files. This page facilitates user interaction with the system’s reports and allows filtering and sorting of records according to various criteria.

## 2. Functional Scope
- Display account information in a table format.
- Allow users to search, sort, and filter request records.
- Provide pagination for browsing through large sets of data.
- Allow XLSX file uploads for importing data.
- Redirect users to individual request reports when a record is selected.

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Account Overview**: Displays a list of accounts with details like request IDs.
- **Search & Filter**: Allows users to search for requests based on keywords and filter results by various criteria.
- **Sorting**: Users can sort the data by specific columns, like the snapshot date.
- **Pagination**: The data is split across multiple pages, allowing users to navigate between pages of request records.
- **XLSX Upload**: Provides a modal interface for uploading XLSX files, enabling bulk data import.

### 3.2 User Interactions
- **Sorting**: Users can click on column headers to toggle sorting between ascending and descending order.
- **Search**: Users can enter a search query to filter records by customer name or request code.
- **Pagination**: Users can navigate between pages of data using the pagination controls.
- **File Import**: Users can upload data in XLSX format via a modal dialog box.

## 4. APIs

### 4.1 `/TransDetails/GetRequestIds`
- **Purpose**: Retrieves request IDs based on various filters and sorting parameters.
- **Input**: JSON body containing filter expressions, pagination details, and sorting parameters.
- **Output**: 
  - Success: A list of request IDs, total records, and pagination information.
  - Failure: Error response.

### 4.2 `/TransDetails/GetFilteredRequestIdsWithPagination`
- **Purpose**: Filters and returns request IDs based on form parameters.
- **Input**: Form data containing search values, client ID, sort parameters, and page details.
- **Output**: 
  - Success: Filtered request IDs, pagination details.
  - Failure: Error message indicating invalid input.

## 5. Key Components

### 5.1 `ButtonGroup` Component
#### Overview
The `ButtonGroup` component provides action buttons for file import and creating new requests, with conditional rendering based on user permissions.

#### Features
- **File Import Button**: Triggers the XLSX modal for file uploads (currently hidden).
- **Create New Request Button**: Shown if the user has the `ShowCreateRequest` permission, linking to `/create-request`.

#### Props
- **toggleOpenImportFilesModal**: Function to open/close the XLSX modal.
- **isUploadXlsxModalOpen**: Boolean controlling modal visibility.

### 5.2 `XlsxModal` Component
- **Purpose**: Displays a modal interface for uploading XLSX files. (Currently hidden)
- **Features**:
  - Allows users to upload XLSX files for data import.
  - Closes the modal when the "Close" button is clicked.

### 5.3 `AccountsTable` Component

#### Overview
The `AccountsTable` component displays a table of requests, allowing sorting by columns such as `Date Created` and `Last Updated`. It provides navigation to detailed reports by clicking on specific request entries.

#### Features
- **Dynamic Sorting**: Columns can be sorted by clicking the header, toggling between ascending and descending order.
- **Responsive Design**: The table adapts to various screen sizes while maintaining readability.
- **Navigation**: Clicking on a request links to its detailed report.
- **Date Formatting**: Displays dates in a human-readable format using `convertDateTime`.
  
#### Props
- **requestIds**: Array of `RequestId` objects containing request details.
- **sortBy**: The current sorting column.
- **sortDirection**: The sorting direction (1 for ascending, -1 for descending).
- **toggleSortByColumn**: Function to handle column sorting when clicked.

#### Table Structure
- **Columns**:
  - **Request ID**: Displays the request's code.
  - **Applicant Name**: Shows the customer's name.
  - **Date Created**: Sortable by `SubscribedOn` date.
  - **Last Updated**: Sortable by `SnapshotDate` date.
  - **Unit**: Displays the unit name associated with the request.

#### Styling
- **Sticky Header**: The header remains fixed while scrolling.
- **Hover Effects**: Request rows change background on hover for better interaction.
- **Custom Icons**: Sort icons are used in sortable columns, changing colors based on the sorting direction.

### 5.4 `AccountsTableSearchBar` Component

#### Overview
The `AccountTableSearchBar` component provides a search input field for filtering request IDs or names. It allows real-time searching with debouncing to avoid excessive API calls. It also supports pagination, displaying the appropriate results based on the search criteria.

#### Features
- **Search Functionality**: Allows users to search by `Request ID` or `Name`.
- **Debounced Input**: Searches are triggered after a delay to reduce unnecessary requests.
- **Automatic Navigation**: When a single result is found, it automatically redirects to the detailed report page.
- **Pagination Support**: The search results are paginated, with total pages and records displayed based on the query results.
  
#### Props
- **currentPage**: The current page of the search results.
- **requestIds**: List of `RequestId` objects matching the search query.
- **totalPage**: The total number of pages based on the search results.
- **totalRecords**: Total number of records found.
- **pageSize**: The number of records per page.
- **searchValue**: The current value in the search field.
- **clientId**: The client ID for filtering results.
- **sortBy**: The column by which the results are sorted.
- **sortDirection**: The direction of the sorting (ascending or descending).
- **isLoading**: A flag indicating whether the search is in progress.
- **placeholder**: Placeholder text for the search input field.

#### Search Handling
- **Debounced Input**: The search query is processed with a delay of 350ms to prevent excessive requests. The search results update accordingly as the user types.
  
  Example:
  ```typescript
  oninput={(e) => {
    searchValue = e.currentTarget.value;
    clearTimeout(timeout);
    isLoading = true;
    timeout = setTimeout(async () => {
      const req = await fetch("/api/requestIds/searchValue", {
        method: "POST",
        body: JSON.stringify({
          authToken: page?.data?.user?.authToken,
          clientId: clientId,
          sortBy: sortBy,
          sortDirection: sortDirection,
          searchValue: searchValue,
          currentPage: currentPage,
        }),
      });
      // Update requestIds and pagination
    }, 350);
  }}

#### Automatic Navigation
- When only one result is found, it automatically redirects to the specific request's detailed report page.
 Example:
  ```typescript
  if (res?.requestIds?.length === 1) {
    setLoaderText(`Loading ${res.requestIds[0]?.  requestCode}`);
    goto(`/report/${res.requestIds[0]?.requestId}`);
  }
  ```
#### Note

Ensure that the backend API endpoint `/api/requestIds/searchValue` supports the required search functionality, including pagination and sorting.
The goto function from `$app/navigation` handles navigation to a report when only one result is found.

### 5.5 `Pagination` Component

#### Overview
The `Pagination` component provides an intuitive interface for navigating through large sets of data, allowing users to easily jump between pages. It includes buttons for navigating to the first, previous, next, and last pages, as well as a dynamic list of page numbers.

#### Features
- **Page Navigation**: Includes buttons for navigating between pages: "First", "Previous", "Next", and "Last".
- **Dynamic Page Numbers**: Displays a limited set of page numbers around the current page, with the ability to scroll through more pages if needed.
- **Display Information**: Shows which records are currently displayed (e.g., "Showing 1 to 10 of 100 records").
- **Current Page Highlighting**: Highlights the current page button to give users a visual indication of their position in the pagination.
- **Disable Buttons**: Buttons like "First" and "Previous" are disabled when the user is on the first page, and "Next" and "Last" are disabled on the last page.

#### Props
- **totalRecords**: The total number of records available.
- **currentPage**: The current page being viewed.
- **setCurrentPage**: A function to set the current page.
- **pageSize**: The number of records displayed per page.
- **totalPage**: The total number of pages.

#### Pagination Logic
- **Items Per Page**: Defines how many records are displayed per page. It is set to the `pageSize` prop.
- **Pages to Show**: Limits the number of page buttons displayed. In this case, 5 pages are shown at a time, adjusting dynamically based on the current page.
- **Start and End Index**: Calculates and displays the range of records currently being shown.

#### Navigation Functions

- **goToFirstPage**: Navigates to the first page.

- **goToPreviousPage**: Navigates to the previous page.

- **goToNextPage**: Navigates to the next page.

- **goToLastPage**: Navigates to the last page.
  
Example:
```typescript
const goToNextPage = () => {
  if (currentPage < totalPages) {
    currentPage++;
  }
  setCurrentPage(currentPage);
};
```
#### Pagination List Generation

- **getPaginationList**: Generates a list of page numbers to display, ensuring the list stays within the defined pagesToShow limit. It adjusts for edge cases when near the beginning or end of the pagination.

Example:
```typescript
const getPaginationList = (totalRecord: number) => {
  const totalPages = totalPage ?? Math.ceil(totalRecord / itemsPerPage);
  if (totalPages <= pagesToShow) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  // Adjust page range dynamically
  return Array.from({ length: pagesToShow }, (_, i) => i + startPage);
};
```

### 5.6 `SectionWrapper` Component
- **Purpose**: Wraps the main section of the dashboard layout.
- **Features**:
  - Ensures consistent layout and styling for the content on the dashboard page.

### 5.7 `Welcome` Component
#### Overview

The Welcome component provides a personalized greeting for the user, displaying their name, the last login time, and the current session duration. The session time updates every second and is formatted to display in HH:mm:ss format.

#### Functionality

- **User Data**: The component utilizes the page store to access user information, such as the user's name and the last login timestamp.
  
- **Session Timer**: When the component mounts, a session timer is started, which tracks the duration of the user's current session since the last login.
  
- **Session Duration Update**: The session duration is updated every second using setInterval, and cleared on component destruction via onDestroy.
  
- **Date Formatting**: The convertToDateMonth utility function is used to format the last login timestamp, while the formatSessionDuration utility formats the session time in hours, minutes, and seconds.

#### Props:

**None**: This component does not accept any props directly, but it relies on the page store to access the user information.

#### Key Features:

- **Dynamic User Greeting**: Displays a personalized greeting using the user's name (`page?.data?.user?.name`).

- **Last Login**: The user's last login date is formatted using convertToDateMonth for a more user-friendly display.

- **Session Duration**: Tracks the duration of the current session since the user logged in, updating every second with the format HH:mm:ss.

- **Clean-Up**: Ensures the session timer is cleared when the component is destroyed (`onDestroy`).
  

## 6. Actions (`actions`)

### 6.1 `getFilteredRequestIdsWithPagination`
- **Input**: Form data containing `clientId`, `sortBy`, `sortDirection`, and `searchValue`.
- **Process**:
  - Validates input parameters and constructs the appropriate filter.
  - Calls `/TransDetails/GetFilteredRequestIdsWithPagination` API to retrieve filtered request IDs.
  - On success: Returns the filtered request IDs along with pagination information.
  - On failure: Returns a 400 error indicating invalid input.

### 6.2 `setCurrentPage`
- **Input**: `page` (number) representing the page number to display.
- **Process**:
  - Sends a POST request to the `/api/requestIds/searchValue` endpoint with the necessary parameters (e.g., `authToken`, `clientId`, `sortBy`, etc.).
  - Updates the UI state with the returned data (request IDs, pagination, etc.).
  - If only one request is returned, the user is redirected to that request's report page.

### 6.3 `toggleOpenImportFilesModal` and `toggleCloseImportFilesModal`
- **Purpose**: Open and close the XLSX import modal respectively.
- **Process**:
  - Toggles the state of the modal and adjusts the page scroll behavior when the modal is shown or hidden.

## 7. Security Considerations
- **Token Validation**: The server validates the `authToken` provided in the request headers before proceeding with any actions.
- **Authorization**: All actions require the user to be authenticated and authorized to access the requested data.

## 8. Error Handling
- **Invalid Input**: If any of the input parameters (e.g., `clientId`, `sortBy`, `sortDirection`, etc.) are invalid, the API returns a 400 error.
- **Missing Authentication**: If the `authToken` is missing or invalid, the user is redirected to the login page.
- **API Failures**: The system provides user-friendly error messages for API failures and other issues (e.g., when no data is found). 

# Create Request

## 1. Overview
The Create Request page provides a comprehensive form interface for creating new Income Analyzer verification requests. It features real-time validation, dynamic form fields, and automatic routing number verification. The page is designed to collect personal, contact, and banking information efficiently while ensuring data accuracy.

## 2. Functional Scope
- Create new income verification requests
- Validate routing numbers in real-time
- Generate and share request links
- Support multiple bank connectivity providers
- Handle form validation and error messaging
- Copy functionality for sharing request details

## 3. Detailed Feature Breakdown

### 3.1 Core Features
#### Form Sections:
- **Personal Information** (name fields)
- **Contact Information** (phone, email)
- **Banking Information** (routing, account details)
- **Bank Connectivity Provider selection**
- **Share Request section** (links and IDs)

#### Real-time Validation:
- Routing number verification
- Phone number formatting
- Email validation
- Required field validation

#### Dynamic Provider Selection:
- Fetches available providers from API
- Updates account types based on provider selection

## 4. APIs

### 4.1 `/IBVService/GetIBVProviders`
- **Purpose**: Retrieves available IBV providers and their account types
- **Method**: GET
- **Headers**: Authorization, Content-Type, Ocp-Apim-Subscription-Key
- **Response**: List of providers with supported account types

### 4.2 `/IBVService/CreateIBVRequest`
- **Purpose**: Creates a new verification request
- **Method**: POST
- **Headers**: Authorization, Content-Type, Ocp-Apim-Subscription-Key
- **Body**: Form data converted to JSON
- **Response**: Request status, code, and verification URL

### 4.3 `/api/validate-routing-number`
- **Purpose**: Validates bank routing numbers
- **Method**: GET
- **Query Params**: routingNumber
- **Response**: Validation status and bank name

## 5. Key Components

### 5.1 Form Component
- **Purpose**: Main form for creating requests
- **Features**:
  - Section-based layout
  - Real-time validation
  - Dynamic field updates
  - Error handling
  - Success messaging

### 5.2 InputField Component
- **Purpose**: Reusable input component with validation
- **Features**:
  - Custom validation rules
  - Error messaging
  - Placeholder support
  - Maximum/minimum length validation
  - Type-specific formatting (phone, email, numbers)

### 5.3 DynamicSelect Component
- **Purpose**: Dropdown selection for providers and account types
- **Features**:
  - Single selection mode
  - Dynamic options loading
  - Placeholder support
  - Bound value updates

### 5.4 CreateRequestSearchBar Component
- **Purpose**: Search functionality for existing requests
- **Features**:
  - Quick access to existing requests
  - Real-time search results

## 6. Utility Functions

### 6.1 `formatPhoneNumberAsYouType`
- **Purpose**: Formats phone numbers as users type
- **Supports**: Multiple format patterns (000-000-0000 or (000) 000-0000)

### 6.2 `copyToClipboard`
- **Purpose**: Copies text to clipboard
- **Usage**: Request links and IDs sharing

### 6.3 `validateForm`
- **Purpose**: Validates form fields before submission
- **Features**:
  - Checks all required fields
  - Shows validation messages
  - Returns form validity status

### 6.4 `formDataToJSONString`
- **Purpose**: Converts FormData to JSON string
- **Usage**: API request body preparation

## 7. State Management

### 7.1 Form State
- **Provider Selection**: Manages selected provider and account types
- **Validation State**: Tracks routing number validation status
- **Form Messages**: Manages error and success messages
- **Request Details**: Stores generated request code and URL

### 7.2 Data Flow
- Load providers on page initialization
- Update account types based on provider selection
- Validate form fields on input
- Submit form data to API
- Display success/error messages
- Show request sharing details on success

## 8. Security Considerations
- **Authentication**: Requires valid user session
- **Input Validation**: Server-side validation of all form inputs
- **API Key**: Uses subscription key for API access
- **Data Sanitization**: Cleanses phone numbers and other inputs

## 9. Error Handling
- **Form Validation**: Shows inline validation messages
- **API Errors**: Displays user-friendly error messages
- **Routing Validation**: Provides immediate feedback on routing number validity

# User Profile

## 1. Overview
The User Profile screen provides users with a centralized interface to manage their personal information, profile picture, and password settings. The screen is divided into multiple cards that organize different aspects of user data management.

## 2. Functional Scope
- View and edit personal information
- Manage profile picture with image cropping capabilities
- Change password with validation
- View profile details including roles and activity timestamps

## 3. Components

### 3.1 Personal Information Card (`PersonalInfoCard`)
- Displays read-only information:
  - First Name
  - Last Name
  - Email ID
  - Mobile Number (auto-formatted as 000-000-0000)
- Allows editing of:
  - Profile Picture
- Includes image upload functionality

### 3.2 Password Management Card (`PasswordManagementCard`)
- Provides interface for password changes
- Features:
  - Current password validation
  - New password input
  - Password confirmation
  - Password strength requirements

### 3.3 Profile Details Card (`ProfileDetailsCard`)
- Displays read-only information:
  - User ID
  - Role Names
  - Creation Date
  - Last Activity Date
  - Account Status

### 3.4 Profile Picture Management Modal (`ProfilePictureManagementModal`)
- Handles image cropping and resizing
- Supports aspect ratio maintenance
- Preview functionality before saving

## 4. APIs

### 4.1 Get User Data
- **Endpoint**: `GET /Users/GetUser`
- **Purpose**: Retrieves user profile information and settings
- **Input**:
  - Query Parameter: `userId`
- **Headers**:
  - Authorization: Bearer token
  - Content-Type: application/json
  - Ocp-Apim-Subscription-Key: API_KEY
- **Output**: 
  - Success: User data object containing personal information, roles, and timestamps
  - Error: Throws error with message 'Unable to fetch user'
- **Usage**: Called during page load to populate user profile data

### 4.2 Update User Password
- **Endpoint**: `POST /Users/ChangeUserPassword`
- **Purpose**: Updates user's password after validation
- **Input**:
  - Form Data converted to JSON containing:
    - userId
    - current password
    - new password
- **Headers**:
  - Authorization: Bearer token
  - Content-Type: application/json
  - Ocp-Apim-Subscription-Key: API_KEY
- **Output**:
  - Success: Updated password confirmation
  - Error: Fail status with message "Unable to change user password"
- **Usage**: Called when user submits password change form

### 4.3 Update User Information
- **Endpoint**: `POST /Users/SetUser`
- **Purpose**: Updates user's personal information
- **Input**:
  - Form Data containing updated user details
  - Mobile number formatted using formatNumberOnly utility
- **Headers**:
  - Authorization: Bearer token
  - Ocp-Apim-Subscription-Key: API_KEY
- **Output**:
  - Success: Updated user data
  - Error: JSON response with message "Failed to update user"
- **Usage**: Called when user updates their profile information
## 5. Actions

### 5.1 Server Actions
#### `updateUserPassword`
- **Purpose**: Handles password change requests
- **Input**: Form data containing current and new password
- **Process**:
  - Validates user authentication
  - Sends request to `/Users/ChangeUserPassword` endpoint
  - Returns success/failure response
- **Error Handling**: Returns fail status with message on unsuccessful password change

### 5.2 API Actions
#### `setUser` (POST)
- **Purpose**: Updates user profile information
- **Input**: Form data with updated user details
- **Process**:
  - Formats phone number using `formatNumberOnly`
  - Sends request to `/Users/SetUser` endpoint
  - Returns updated user data
- **Error Handling**: Returns JSON response with error message on failure

### 6. State Management

#### 6.1 User Data State
```typescript
interface UserData {
  userId: string;
  username: string;
  firstname: string;
  lastname: string;
  emailId: string;
  mobile: string;
  imageData: string;
  lastActivityDate: Date | null;
  isActive: boolean;
  isVerified: boolean;
  roleList: Array<any>;
  roleNames: string;
  passwordChangedDate: string;
  orgUnitList: Array<any>;
  created: Date | null;
  updated: Date | null;
}
```

#### 6.2 Image Management State
```typescript
interface ImageDetails {
  width: number;
  height: number;
  aspectRatio: string;
  previewUrl: string;
}
```
### 7. Image Cropping Library
- Uses `svelte-easy-crop` library for image manipulation
- Features:
  - Interactive crop area selection
  - Real-time preview
  - Zoom functionality
  - Maintains aspect ratio during cropping
  - Touch device support
  - Customizable crop area shape
  
## 8. Error Handling
- Form validation for required fields
- Password change failure notifications
- Image upload size and format validation
- API error responses with appropriate status codes

# User Management

## 1. Overview
The User Management screen provides administrators with a centralized interface to view, search, and manage users within the system. It features a responsive table layout with sorting capabilities, search functionality, and direct access to add new users.

## 2. Functional Scope
- Display list of users with essential details.
- Search users by name or other criteria  
- Sort users by different columns  
- Add new users through a dedicated interface  
- Manage user permissions and access  

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **User Table**: Displays user information in a sortable, paginated format.  
- **Search Bar**: Real-time user search functionality.  
- **Add User**: Quick access to user creation interface.  
- **Pagination**: Navigate through user records efficiently.  
- **Sorting**: Order users by various columns.  

### 3.2 User Interactions
- Sort table columns by clicking headers.  
- Search for specific users using the search bar.  
- Navigate between pages of user records.  
- Add new users via the "Add New User" button.  

## 4. Key Components

### 4.1 UsersTable Component
**Features**  
- Dynamic sorting by columns  
- Responsive design for various screen sizes  
- Interactive row highlighting  
- Column-specific sorting indicators  

**Props**  
- `sortBy`: Current sorting column  
- `sortOrder`: Sort direction (`"asc"` | `"desc"`)  
- `totalRecords`: Total number of user records  
- `currentPage`: Current page number  
- `pageSize`: Records per page  
- `searchValue`: Current search term  

### 4.2 OrganizationSearchBar Component
**Features**  
- Real-time search functionality  
- Debounced input handling  
- Clear search option  

### 4.3 Button Group
**Features**  
- "Add New User" button with icon  
- Permission-based button visibility  
- Direct navigation to user creation form  
  
## 5. APIs

### 5.1 Get Users
 
 - **Endpoint**: `GET /Users/GetUsers`
 - **Purpose**: Retrieves paginated and filtered list of users

  - **Input**:
    - **Query Parameters**:
      - pageNo: Current page number (default: 1)
      - sortBy: Column to sort by
      - sortOrder: Sort direction
      - filters: Search value for filtering users
      - orgUnitId: Organization unit identifier
- **Output**:
    - Success: JSON object containing:
      - List of users
      - Pagination information
      - Total record count
- **Error**: JSON response with message "Failed to fetch users" and 500 status
- **Usage**: Called to populate and update the users table with sorting, filtering, and pagination

# Add/Update User

## 1. Overview
The Add/Update User screen provides administrators with a comprehensive interface for creating new users and modifying existing user details. It features role assignment, organization unit access management, and detailed user information fields.

## 2. Functional Scope
- Create new user accounts
- Update existing user information
- Manage user roles and permissions
- Configure organization unit access
- Validate user input in real-time  

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **User Details Form**:Input fields for personal and contact information.  
- **Roles & Access Table**: Manage user roles and organization unit access
- **Real-time Validation**:Input validation with immediate feedback
- **Dynamic Updates**: Automatic state management for form changes
 

### 3.2 User Interactions
- Fill in user details (name, email, mobile)
- Assign roles and permissions.  
- Configure organization unit access.  
- Submit form for creation/update.  
- Receive success/error notifications

## 4. Key Components

### 4.1 UserDetailsAndAccess Component
**Purpose** : Main form for user information
**Features**  :
- Personal information fields
- Contact details with formatting  
- Real-time validation
- Error messaging

**Props**  
- `user`: User object with user details

### 4.2  RolesAndAccessTable Component
**Purpose** : Manages user roles and organization unit access
**Features**  
- Recursive organization unit display
- Role-based column headers
- Horizontal scrolling for many roles
- Fixed header during vertical scrollin

**Props**
- `user`: User object with roles and access
  
#### 4.2.1  OrganizationUnit Component
- **Purpose**: Renders individual organization units in a hierarchical tree structure with role-based checkboxes
- **Key Features**:
  - Recursive self-rendering for nested units
  - Visual hierarchy indicators
  - Role-based permissions through checkboxes
  - Hover states and tooltips
  - Collapsible tree structure
- **Props** :
  ```javascript
      {
    organizationUnit: OrgUnit;  // Organization unit  data
    space?: number;             // Horizontal spacing   for indentation
    depth?: number;            // Current depth level   in tree
  }
  ```
## 5. APIs

### 5.1 GET /Users/GetUserRoles
 
 - **Purpose**: Retrieves user roles and permissions for editing

  - **Input**:
    - **Query Parameters**:
      - userId: Current userId  (default:0)
- **Output**: User data including roles and organization units

### 5.1 POST /api/users/manage-role/{userId}
 
 - **Purpose**: Creates or updates user information

  - **Input**:
    - **Query Parameters**:
      - userId: Current userId  (default:0)
- **Output**: Success/failure status with appropriate message

## 6. Form Validation
### 6.1  Field Validation
- Required field checks
- Email format validation
- Phone number formatting
- Custom validation messages
##### 6.2  Submit Validation
- Complete form validation
- Field trimming
- Modified unit tracking
- Error handling and display
## 7. State Management
### 7.1 User State
```typescript 
interface UserData {
  userId: number;
  firstname: string;
  lastname: string;
  emailId: string;
  mobile: string;
  orgUnitList: Array<any>;
}
```
### 7.2 Form State

- Loading state management
- Validation state tracking 
- Modified data detection 
- Success/error message handling

## 8. Utility Functions
**transformOrgUnits**: Recursively transforms organization units into a hierarchical tree structure
  ```typescript
  function transformOrgUnits(orgUnits) {
    // Transforms flat organization unit list into  hierarchical structure
    // Adds necessary properties for UI rendering
    return transformed units with hierarchy
  }
  ```
**findModifiedUnits**: Identifies modified organization units
  ```typescript
    function findModifiedUnits(originalUnits,   currentUnits) {
    // Compares original and current unit states
    // Returns only modified units for efficient  updates
    return modified units array
  }
  ```
  **flattenOrgUnits**: Flattens hierarchical organization units
  ```typescript
    function flattenOrgUnits(orgUnits) {
    // Converts hierarchical structure back to flat   array
    // Preserves modification states
    return flattened units array
  }
  ```
## 9. Error Handling
- Form validation errors
- API error responses
- User-friendly error messages
- Toast notifications for status updates

# Groups Management

## 1. Overview

The Groups Management screen provides administrators with a centralized interface to organize and manage Units into meaningful collections like regions, states, or districts. It features a hierarchical table view, search functionality, and group creation capabilities.

## 2. Functional Scope
- Create and manage organizational groups 
- Search and filter groups  
- View nested group hierarchies 
- Manage group relationships  
- Create new groups through a modal interface 

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Groups Table**: Displays groups in a nested, hierarchical format.  
- **Search Bar**: Real-time user search functionality.  
- **Create Group**: Modal interface for new group creation.
- **Info Panel**: Contextual help about group functionality.
- **Sorting**:  Order groups by creation date or other criteria.  

### 3.2 User Interactions
- Search for specific groups using the search bar
- Create new groups via the "Create New Group" button
- View group hierarchies in the nested table
- Sort groups by different columns
- Access group information through the info panel

## 4. Key Components

### 4.1 NestedGroupsTable Component
**Purpose**: Displays groups in a hierarchical structure
**Features**  
- Nested group visualization
- Sortable columns
- Interactive row highlighting
- Dynamic data loading

**Props**  
- `sortBy`: Current sorting column  
- `sortOrder`: Sort direction (`"asc"` | `"desc"`)  
- `totalRecords`: Total number of user records  
- `currentPage`: Current page number  
- `pageSize`: Records per page  
- `searchValue`: Current search term  

### 4.2 OrganizationSearchBar Component
**Features**  
- Real-time search functionality  
- Debounced input handling  
- Clear search option  
**Props**
- searchValue: Current search term
- placeholder: Search input placeholder text

### 4.3 NewEntityPopup Component
**Purpose** : Modal for creating new groups
**Features**  
- Form for group details
- Validation
- Success/error messaging 
**Props**
- types: Entity type ("groups")
- isOpen: Modal visibility state
  

### 4.4 PopupMessage Component
**Purpose** : Displays informational messages about groups
**Features**  
- Dismissible info panel
- Contextual help content
- Icon support
**Props**
- title: Message title
- message: Help content
- isOpen: Panel visibility state
- Icon: Component for visual representation
  
## 5. APIs

### 5.1 /Users/GetOrganizationUnits
 
 - **Purpose**: Retrieves organization units based on filters and sorting

  - **Input**:
    - **Query Parameters**:
      - pageNo: Current page number (default: 1)
      - sortBy: Column to sort by
      - sortOrder: Sort direction
      - filters: Search value for filtering users
      - ouType: Organization unit type (default: "group")
      - orgUnitId: Organization unit identifier
- **Output**: List of organization units with hierarchy information
  
### 5.2 /Users/SetOrganizationUnit
 - **Purpose**: Creates or updates organization units
 - **Input**:Form data converted to JSON
- **Output**: Success/failure response with updated unit information

## 6. State Management
### 6.1 Page State
```typescript 
let sortOrder = $state<"asc" | "desc">("desc");
let sortBy = $state<string>("created");
let searchValue = $state<string>("");
let isPopupOpen = $state(false);
let isPopupMessageOpen = $state(true);
```
### 6.2 Popup Messages
```typescript
const popupMessages = {
  groups: {
    title: "Groups:",
    message: `Groups serve as a flexible way to organize your Units...`
  }
};
```

# Unit Management

## 1. Overview
The Unit Management screen provides administrators with a dedicated interface to manage operational entities like physical locations, online platforms, or service points. It features a responsive table layout with sorting capabilities, search functionality, and unit creation capabilities.

## 2. Functional Scope
- Display and manage operational units
- Search units with real-time filtering
- Create new units through a modal interface
- Sort units by various criteria
- View informational messages about unit functionality

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Units Table**: Displays units in a sortable format
- **Search Bar**: Real-time unit search functionality
- **Create Unit**: Modal interface for new unit creation
- **Info Panel**: Contextual help about unit functionality
- **Sorting**: Order units by creation date or other criteria

### 3.2 User Interactions
- Sort table columns by clicking headers
- Search for specific units using the search bar
- Create new units via the "Create New Unit" button
- View unit information through the info panel

## 4. Key Components

### 4.1 UnitsTable Component
**Features**
- Dynamic sorting by columns
- Responsive design
- Interactive row highlighting
- Column-specific sorting indicators

**Props**
- `sortBy`: Current sorting column
- `sortOrder`: Sort direction ("asc" | "desc")
- `searchValue`: Current search term

### 4.2 OrganizationSearchBar Component
**Features**
- Real-time search functionality
- Debounced input handling
- Clear search option

### 4.3 NewEntityPopup Component
**Purpose**: Modal for creating new units
**Features**
- Form for unit details
- Validation
- Success/error messaging

### 4.4 PopupMessage Component
**Purpose**: Displays informational messages about units
**Features**
- Dismissible info panel
- Contextual help content
- Icon support

## 5. APIs

### 5.1 /Users/GetOrganizationUnits
 
 - **Purpose**: Retrieves organization units based on filters and sorting

  - **Input**:
    - **Query Parameters**:
      - pageNo: Current page number (default: 1)
      - sortBy: Column to sort by
      - sortOrder: Sort direction
      - filters: Search value for filtering users
      - ouType: Organization unit type (default: "unit")
      - orgUnitId: Organization unit identifier
- **Output**: List of organization units 
### 5.2 /Users/SetOrganizationUnit
 - **Purpose**: Creates or updates organization units
 - **Input**:Form data converted to JSON
- **Output**: Success/failure response with updated unit information
  
## 6. State Management
### 6.1 Page State
```typescript 
let sortOrder = $state<"asc" | "desc">("desc");
let sortBy = $state<string>("created");
let searchValue = $state<string>("");
let isPopupOpen = $state(false);
let isPopupMessageOpen = $state(true);
```
### 6.2 Popup Messages
```typescript
const popupMessages = {
  units: {
    title: "Units:",
    message: "Units represent the primary operational entities within your organization, such as physical locations, online platforms, or service points..."
  }
};
```
# Group Details Management
## 1. Overview
The Group Details Management screen provides administrators with a detailed interface to view and manage specific group settings and configurations. It features a comprehensive view of group-specific data, unit associations, and configuration management.

## 2. Functional Scope
- View and edit group-specific details
- Manage group configurations
- View associated units
- Handle group-specific settings

## 3. Components

### 3.1 GroupOrUnitDetails Component

**Purpose**: The primary component for displaying and managing group details.

**Features**:
- Displays group configurations
- Shows associated unit list
- Shows associated group list
- Show associated member list
- Manages group settings

---

### Child Components:

#### 1. SectionWrapper  
**Purpose**:  
- Acts as a layout wrapper to organize content.  
- Provides consistent styling and structure across pages.  
- Handles responsive layout and spacing between elements.

**Usage in Main Component**:  
Wraps the `GroupUnitSidebar` and `GroupUnitSection` components to provide a flexible layout with appropriate spacing.

---

#### 2. GroupUnitSidebar  
**Purpose**:  
- Displays a navigation menu with tabs for sections like "Settings," "Groups," "Units," and "Members."  
- Provides an additional menu for "Settings" that lists detailed configuration options based on `menuItems`.  
- Handles navigation by updating the URL query parameters.

**Props**:  
- `menuItems`: List of menu items derived from the `claims` state, representing user-specific permissions for the available sections.  
- `activeTab`: Tracks the currently active tab.  
- `tabs`: List of tabs dynamically filtered based on the type of organization unit.

**Child Components**:  
- **Tabs**:  
  - Used for rendering and managing the top-level tab navigation (e.g., "Settings", "Groups", "Units" & "Members" etc.).  
  - Includes tab icons for better user experience, such as `GearIcon`, `GroupIcon`, `UnitIcon`, and `UserManagementIcon`.

**Features**:  
- Dynamically updates the `activeTab` and menu based on the current URL query parameters.  
- Displays submenus under "Settings" if applicable (e.g., a list of detailed configuration options).  
- Highlights the active tab and menu item for better user feedback.  

**Key Methods**:  
- `handleNavigation(claimType: string, subClaimType?: string)`:  
  Updates the URL parameters to navigate to the specified claim and submenu.  
- `handleTabChange(tab: string)`:  
  Updates the active tab and modifies the URL query parameters accordingly.  
- `getClaimNameByType(claimType: string)`:  
  Resolves the display name for a menu item based on its claim type.  

**Key Sections**:  
- **Tabs**:  
  - Renders the main navigation for sections.  
  - Uses the `Tabs` component with `tabIcons` for a visual representation of each section.  
- **Menu**:  
  - Under "Settings," renders the list of `menuItems` and highlights the active menu item.  
  - Dynamically includes additional submenus if the menu item has `subClaims`.
---

#### 3. GroupUnitSection  
**Purpose**:  
- Dynamically renders the content for the active tab (e.g., "Settings," "Groups," "Units," or "Members").  
- Responsible for managing state and handling dynamic components based on the active menu or submenu.  

**Props**:  
- `activeTab`: The currently active tab, determining the content to display.  

---

**Child Components**:  

1. **GroupUnitHeader**  
   - Displays the header for the current section, including a title and optional action buttons (e.g., "Add Group," "Add Unit").  
   - Dynamically updates the title based on the selected menu or tab.  
   - Includes icons such as `GroupIcon`, `UnitIcon`, and `AddUserIcon` for better visual feedback.

2. **CurrentComponent**  
   - Dynamically loaded component based on the `menuObject` mapping and the current submenu (e.g., "Details," "API Settings","Income", "Bank Connectivity Providers", "Assessment Zones" ).  
   - Loaded asynchronously when the active menu or submenu changes.  
   - Example dynamically loaded components:  
     - `GroupOrUnitDetails.svelte` (Details menu)  
     - `AcceptedIncome.svelte` (Income menu)  
     - `LendingGuide.svelte` (Lending Guide menu)  
     - `BankConnectivity.svelte` (Bank ConnectivityProviders menu)
     - `AssessmentZones.svelte` (Assessment Zones menu)
     - `APISettings.svelte` (API Settings menu)

3. **GroupUnitFooter**  
   - Footer component used for actions like saving or canceling changes.  
   - Disabled unless the user has "Edit" permissions (`claimValue === "Edit"`).  
   - Displays buttons for saving changes (`onSaveClick`) or canceling edits (`onCancelClick`).  

4. **GroupsTabContent**  
   - Displays the `GroupsTable` component to show the child groups associated with the current group when the "Groups" tab is active.
   - Key features include:
     - **Dynamic Sorting**: Allows sorting by columns (e.g., Group Name, Units, Users) with ascending/descending order.
     - **Data Fetching**: Fetches group data from an API (`/api/organization-units`) with sorting and search parameters.
     - **Responsive Layout**: Table adjusts for different screen sizes with sticky headers and overflow handling.
     - **Loading State**: Displays a loader icon while fetching data for improved user experience.
     - **Manage Links**: Each row includes a "Manage" link for easy access to group settings.
  
5. **UnitsTabContent**  
   - Displays the `UnitsTable` to show the child units associated with the current group when the "Units" tab is active.
   - Key features include:
      - **Dynamic Sorting**: Users can sort the table by columns like  "Unit Name," "Parent Group," "Users," etc., toggling between ascending and descending order.
      - **Data Fetching**: Fetches unit data from an API(`/api/organization-units`) with  parameters like sorting and search values to customize the data retrieval.
      - **Responsive Table**: The table layout is responsive with a sticky header, and adjusts based on screen size or if accessed from the management screen.
      - **Loading State**: Displays a loading icon while data is being fetched, improving user experience during data  retrieval.
      - **Manage Links**: Each row contains a "Manage" link to access detailed unit settings, featuring a gear icon for visual clarity.

6. **MembersTabContent**  
   - Displays the `MembersTable` to show the members associated with the current group when the "Members" tab is active.
   - Key features include:
     - **Dynamic Sorting**: Allows sorting by multiple columns (e.g., Full Name, User Email, Status) with toggleable ascending/descending order using SortButton.

     - **Paginated Data**: The component supports pagination with properties like currentPage, pageSize, and totalRecords to manage large datasets efficiently.

     - **Loading State**: Displays a loader icon while fetching data, ensuring users are aware that content is being loaded.

     - **User Information Display**: Displays user details like profile picture, name, email, status, last active date, and roles, with tooltips for better visibility and truncation of long text.

     - **Conditional Styling**: Offers dynamic table layout based on the screen context (e.g., from a management screen) and highlights user activity status (Active/Inactive) with color-coded indicators.

7. **ApplyChangesPopup**  
   - Popup modal displayed when saving changes.  
   - Bound to the `isOpen` state and configured with the current `configuration`.  
   - Key features include:
     - **Popup Modal for Settings**: This component displays a modal (PopupWrapper) that allows users to apply new settings to either all entities or selected entities from a list.

     - **Radio Button Options**: Users can choose to apply changes to "All Entities" or "Selected Entities." When "Selected Entities" is chosen, a dynamic select input is provided for users to pick individual units.

     - **Checkbox for Override Option**: If applying to "All Entities," users have the option to select a checkbox to apply changes to overridden entities, providing additional customization.

     - **Error Handling and Validation**: Ensures that users select at least one entity when applying settings to selected entities. If no entities are selected, an error message is displayed.

     - **State Management for Loading and Submitting**: It manages the loading state (isLoading) and ensures that API requests are made asynchronously when applying changes. On success, a toast notification is shown to inform the user of the result.

---

**Features**:  
- **Dynamic Content Rendering**:  
  - Renders the `CurrentComponent` dynamically based on the active submenu.  
  - Displays relevant content for tabs like "Settings," "Groups," "Units," and "Members."

- **State Management**:  
  - Uses `page.url.searchParams` to determine the active menu or submenu.  
  - Tracks the loading state (`isLoading`) and revalidation state (`revalidate`) for refreshing the content.  

- **Dynamic Header and Footer**:  
  - The header and footer update dynamically based on the active tab or menu.  
  - Specific buttons (e.g., "Add Group," "Add Unit") are enabled or disabled based on user permissions.

- **Error Handling**:  
  - Displays a "Loading..." message while components are being loaded.  
  - Handles cases where no menu or submenu is selected by showing an appropriate fallback.

---

**Key Methods**:  

1. `setConfiguration(config: ClaimConfiguration)`  
   - Updates the `configuration` state for the current menu.  

2. `loadComponent(validate: boolean, _claims: Claim[])`  
   - Asynchronously loads the appropriate component based on the current `menuObject` mapping.  
   - Updates the `CurrentComponent`, `pageHeader`, and `configuration` states.  
   - Handles errors and sets the loading state (`isLoading`) accordingly.  

---

**Dynamic Menu Object**:  
- The `menuObject` defines the mapping of menu keys to their respective headers and component loaders. Examples:  
  - `"Details"` → `GroupOrUnitDetails.svelte`  
  - `"Income"` → `AcceptedIncome.svelte`  
  - `"APISettings"` → `ApiSettings.svelte`  

**Dynamic Tabs**:  
- The content for "Groups," "Units," and "Members" tabs is handled through specific components like `GroupsTabContent`, `UnitsTabContent`, and `MembersTabContent`.  

---

### Data Handling in GroupOrUnitDetails Component:

- **States**:  
  - `claims`: Derived from `OrganizationClaims` to determine user-specific permissions for different sections.  
  - `allTabs`: List of all possible tabs available for navigation.  
  - `tabs`: Dynamically filtered based on the organization unit type (group, unit, or organization).  
  - `activeTab`: Tracks the current active section based on the user's selection or the URL's `tab` query parameter.

- **Effects**:  
  - Dynamically updates the `activeTab` when the `tab` query parameter in the URL changes.  

--- 

## 4. APIs

### 4.1 Get Organization Settings
- **Endpoint**: `GET /Users/GetOrganizationSettings`
- **Purpose**: Retrieves group-specific settings and configurations
- **Input**:
  - **Query Parameters**:
    - orgUnitId: Group identifier
    - ouType: Organization unit type ("Group")
- **Headers**:
  - Authorization: Bearer token
  - Content-Type: application/json
  - Ocp-Apim-Subscription-Key: API_KEY
- **Output**: 
  - Success: JSON object containing:
    - configurations: Array of group configurations
    - unitList: Array of associated units
  - Error: Throws error with message 'Unable to fetch organization records'
- **Usage**: Called during page load to populate group details and configurations

## 5. Screens Breakdown

### 5.1 Group Details

#### 5.1.1 Purpose

The Group Details screen allows administrators to configure basic group settings, such as the group name, timezone, currency, and whether customer reports should be shared. It provides an intuitive interface with validation and dynamic data loading.

#### 5.1.2 Key Features

- **Edit Group Name**
  - Input field for entering or editing the group name.
  - Disabled unless the claimValue is "Edit".
  - Configure Timezone and Currency

- **Dropdowns for selecting the group's timezone and currency.**
  - Dynamically populated options.
  - Selection updates the config object.
  - Toggle Report Sharing

- **Switch to enable or disable customer report sharing.**
  - Controlled via a CustomSwitch component.
  
#### 5.1.3 Key Components
- **InputField**: Component used for the Group Name input field.
  - **Props**: 
  - `placeholder`: Placeholder text for the input.
  - `type`: Input type (text).
  - `value`: Binds to config.name.
  - `disabled`: Disables editing when `claimValue !== "Edit"`. 
- **DynamicSelect**: Dropdown component used for selecting timezone and currency.
  - **Props**:
    - `mode`: Defines the selection mode (single for single selection).
    - `options`: Dynamically generated list of options.
    - `selectedValues`: Binds to the selected value(s).
    - `onChange`: Callback function to update config when a selection is made.
    - `disabled`: Disables selection when `claimValue !== "Edit"`.
- **CustomSwitch**: Toggle switch component used for enabling/disabling customer report sharing.
  - **Props**:
    - `toggle`: Binds to config.reportShared (true/false).
    - `handleSwitch`: Toggles the value of config.reportShared.
    - `disabled`: Disables toggling when `claimValue !== "Edit"`.
    - `isTextVisible`: Displays the switch label.
- **InformationTooltip**: Provides contextual tooltips for certain fields (e.g., Timezone and Currency, Reports).
   - **Props**:
     - `content`:  Tooltip content from the `HelpTexts` constant.
#### 5.1.4 State Management

##### State Variables

- `config`: Represents the current group configuration, initialized with default or provided values.
- `currencyOptions`: Derived from config.currencyList, providing a list of formatted currency options.
- `timeZoneOptions`: Derived from config.timeZoneList, providing a list of formatted timezone options.
- `selectedCurrency`: Stores the currently selected currency.
- `selectedTimeZone`: Stores the currently selected timezone.
##### Reactivity
`$effect`: Synchronizes the config object with the setConfiguration function and updates the selected currency/timezone options when changes occur.

#### 5.1.5 APIs and Props
- **Props**
  - `configuration`: Initial configuration object.
  - `setConfiguration`: Callback to update the configuration.
  - `claimValue`: Indicates if editing is allowed (e.g., "Edit").
  
- **APIs** : Data for timeZoneList and `currencyList` is fetched externally and passed via props in `configuration`.


#### 5.1.6  Example Data Flow

 - **Initial State**:

    - `config` is initialized with values from    `configuration`.
    - `currencyOptions` and `timeZoneOptions` are  derived from `config.currencyList` and ` config.   timeZoneList`.

 - **Updating Configurations**:
    - When a user updates a field (e.g., selects a timezone), the `onChange` handler updates the config object.
    - `$effect` synchronizes the updated config with the parent component via setConfiguration.

- **Disabling Fields**:
  - If `claimValue !== "Edit"`, all input fields and controls are `disabled`.

### 5.2 Income

#### 5.2.1 Purpose
The Income Screen enables users to configure the income types that are accepted. It provides an option to select all income types or select them individually. Users can toggle these options based on their requirements.

#### 5.2.2 Key Features

**Accepted Income Types Section**

- Displays all available income types with checkboxes.
- Provides a "Select All" option to toggle all income types on/off.
- Allows individual selection of income types.
  
**Dynamic Text Display**

- Shows a tooltip for contextual guidance.
Displays supplementary text for certain income types.

**Integration with OverrideLock**

- Renders an OverrideLock component if unitList is not empty.

#### 5.2.3 Key Components
**Checkbox**

- Used for "All" selection and for individual income types.
- **Props:**
  - `id`: A unique identifier for the checkbox.
  - `color`: Color of the checkbox.
  - `checked`: Indicates whether the checkbox is  checked.
  - `disabled`: Disables interaction when `claimValue  !== "Edit"`.
  - `onCheckedChange`: Event triggered when the checkbox state changes.
  
**InformationTooltip**

- Provides guidance or hints about the "Accepted Income Types" section.
- **Props**:
  - `content`: Tooltip content from HelpTexts.
  
**OverrideLock**

Displays additional functionality for locking configuration if unitList is not empty. This component provides a way to prevent modifications to income types by locking certain units, preventing them from overriding configuration settings.

- **Props:**

  - `configuration`: The current configuration of the income types.
  - `setConfiguration`: Function to set the configuration after changes.
  - `claimValue`: A value used to check if the user is in "Edit" mode to toggle   settings.
  - `units`: List of available units for selection, shown within the popup.
  - `lockedUnits`: List of units that have been locked and cannot override the income configuration.
  - `setLockedUnits`: Function to update the locked units.

- **Child Components**:
  - **UnitSelectionPopup**: The UnitSelectionPopup component allows the user to select and lock specific units that cannot override the income configuration.
    - **Key Features**: 
      - Displays a list of all available units with checkboxes for each.
      - Provides a "Select All" option to select or deselect all units.
      - Displays a custom switch for each unit to toggle its locked state.
      - Includes "Save" and "Cancel" buttons to confirm or discard changes.
    - **Props**:
      - `units`: The list of available units to be selected.
      - `lockedUnits`: The currently locked units.
      - `setLockedUnits`: A function to update the list of locked units.
      - `isOpen`: A boolean to control the visibility of the popup.
    - **Reactivity**:
      - `onMount()`: Checks if any units are locked on component mount, ensuring the UI reflects the current state of the locked units.
- **State Variables**:
  - `localConfiguration`: Stores the current configuration of income types (IncomeConfiguration). This includes which income types are selected and whether they are locked or not.
  - `lockedUnits`: A derived state variable containing a list of units that are locked and unable to override the settings.
  - `toggle`: A boolean to control whether the OverrideLock is enabled (allowing units to be locked).
  - `isOpen`: A boolean to control the visibility of the UnitSelectionPopup.
- **Functions**:
  - `handleToggle()`: Toggles the state of the lock (enabled/disabled) and  clears the locked units if toggled off.
  - `setLockedUnits(units: DropdownOption[])`: Updates the locked units state,  ensuring only selected units are locked.
  - `handleDeleteUnits(unit: DropdownOption, modifiedUnits: DropdownOption[])`:   Removes a specific unit from the list of locked units.
  - `handleSave()`: Saves the modified units to the configuration and closes  the popup.
  - `handleCancel()`: Reverts changes to the locked units and closes the popup.
#### 5.2.3 State Management
**State Variables**
- `localConfiguration`: Stores the current configuration of income types (IncomeConfiguration).
- `allChecked`: Derived state to determine whether all income types are selected.

**Functions**
- `setAllChecked(checked: boolean)`

  - Updates the isChecked property of all income types in incomeList.
- `handleCheckboxChange(checked: boolean, index: number)`

  - Updates the isChecked property of a specific income type based on the provided index.
  
**Reactivity**
- `$effect`: Synchronizes the local configuration (localConfiguration) with the global configuration whenever the latter changes.

### 5.3 Lending Guide

#### 5.3.1 Purpose 
The LendingGuide Screen allows users to configure loan amounts based on percentages or absolute limits. The screen provides functionality to adjust suggested loan amounts based on Active Monthly Income (AMI) and set absolute lending limits. Users can enable or disable bankuity suggestions, and the configuration can be locked based on the unit list.

#### 5.3.2 Key Features

**Bankuity-Suggested Loan Amounts Section**
- Allows users to enable/disable bankuity-suggested loan amounts via a toggle switch.
- Displays a tooltip providing additional context for the bankuity-suggested loan amounts.
- The "bankuity-suggestions" toggle is only editable when claimValue is in "Edit" mode.
  
**Active Monthly Income (AMI) Based Lending Limits**
- Users can define the suggested minimum and maximum loan amounts as percentages of the Active Monthly Income.
- Displays a tooltip with an example of how percentages apply to the active income.
- The input fields for loan amounts are only editable when claimValue is in "Edit" mode.
  
**Absolute Lending Limits Section**
- Users can specify the minimum and maximum absolute loan amounts.
- Input fields are editable when claimValue is in "Edit" mode.
  
**OverrideLock Integration**
- If the unit list is not empty, the OverrideLock component is displayed to allow locking certain configurations based on the available units.

#### 5.3.3 Key Components

- **CustomSwitch**: Toggles the state of bankuity-suggested loan amounts.
- **InformationTooltip**: Provides contextual guidance for each section (e.g., "Bankuity-Suggested Loan Amounts", "Active Monthly Income").
- **InputField**: Used to input loan amount values (both percentage-based and absolute).
- **OverrideLock**: Used to lock configurations based on available units, preventing changes to certain settings.
- **PercentageIcon**: Displays a percentage symbol next to the input field for loan amounts based on percentage.

#### 5.3.4 State Management

**State Variables**
- `config`: Stores the current configuration for the minimum and maximum loan amounts (both percentage-based and absolute).
  - `minLoanAmountPercentage`, `maxLoanAmountPercentage`: Percentage-based loan amounts.
  - `minLoanAmount`, `maxLoanAmount`: Absolute loan amounts.
- `bankuitySuggestionsDisabled`: Boolean to control whether the bankuity-suggested loan amounts are disabled.
  
**Functions**
- `$effect`: Ensures synchronization between the global configuration and the local config state. It updates the loan amounts when the configuration changes.
- `setConfiguration`: Sets the lending guide configuration based on the current values in the config object.

### 5.4 Bank Connectivity Provider

#### 5.3.1 Purpose

The Bank Connectivity Providers screen enables users to manage integration with bank connectivity providers. It allows for the enabling or disabling of connectivity optimization and the configuration of individual providers, including their status and settings.

#### 5.3.2 Key Features

**Bankuity Optimization Section**

- Displays a toggle to enable or disable Bankuity's Connectivity Providers.
- Shows a "Bankuity Optimizations Disabled" or "Bankuity Optimizations - Enabled" label based on the toggle state.
  
**Providers Table**
- Displays a list of selected bank connectivity providers, with their names, status (enabled/disabled), and a configuration button.
- Allows toggling the enabled status of each provider.
- Provides the option to configure each provider through a pop-up modal.

**Override Lock**
- Displays an OverrideLock component to prevent changes to the provider configuration if the unit list is not empty.
  
#### 5.3.3 Key Components

**CustomSwitch**: Used for toggling Bankuity optimization and individual provider statuses.

**InformationTooltip**: Provides additional guidance about the Bankuity optimization feature.

**IbvConfigPopup**:
  - **Purpose**: The IBV Configuration Popup allows users to configure individual bank connectivity providers by providing an intuitive interface for modifying settings. The pop-up supports different input types like text fields, dropdowns, and switches, enabling users to configure the selected provider's settings and save or cancel changes.
  - **Key Features**:
    - **Dynamic Form Rendering**: The pop-up adapts to different field types, rendering text inputs, number inputs, single or multi-select dropdowns, and checkboxes.
    - **Save and Cancel Actions**: Allows the user to save their changes or cancel the configuration process.
    - **Custom Switches for Boolean Fields**: Provides toggle switches for fields with boolean values (e.g., enabled/disabled settings).
    - **Field Validation**: Ensures that the fields are disabled or enabled based on the provider's current configuration or claim state.
  - **Key Components**:
    - **PopupWrapper**: Wraps the entire configuration form, controlling its visibility and providing the structure for the modal.
    - CustomSwitch: Used to render switches for boolean fields (e.g., enabled/disabled settings).
    - **InputField**:Renders a text or number input field for text-based or integer settings.
    - **DynamicSelect**: Renders dropdown menus for single-select and multi-select options based on the field's renderType.
    - **Button** :Provides Save and Cancel buttons for submitting or canceling changes.
  - **User Flow**
    - The user opens the configuration pop-up for a selected provider.
    - The pop-up dynamically renders fields based on the provider's configuration. These fields can be text inputs, dropdowns, or switches, depending on the field type.
    - The user modifies the settings as needed.
    - The user can either save the changes or cancel them.
      - Clicking "Save" triggers the onSaveClick function, passing the updated configuration.
      - Clicking "Cancel" triggers the onCancelClick function, discarding any changes.

**OverrideLock**: Prevents modifications to provider configurations if the unit list is not empty.

#### 5.3.4 State Management

**State Variables**

- `configurationState`: Stores the current configuration of bank connectivity providers, including enabled status and selected providers.
- `availableProviders`: List of available IBV providers.
- `selectedProviders`: List of selected IBV providers and their configurations.
- `newProviderPopupState`: Contains the state of the new provider popup (whether it’s open and loading state).
- `providerConfigState`: Contains the state for provider configuration popups (selected provider, mode, and visibility).
  
**Functions**
- `handleProviderToggle(provider: IBVConfigSetting, isEnabled: boolean)`: Updates the enabled status of a provider and updates the configuration.
- `handleAddNewProvider(provider: IBVProviderList)`: Adds a new provider to the selected providers list after fetching it from the API.
- `openProviderConfiguration(provider: IBVConfigSetting)`: Opens the configuration modal for a selected provider.
- `setProviderConfiguration(providerConfig: IBVConfigSetting)`: Updates the selected provider's configuration.
- `updatedConfig()`: Updates the overall configuration state with the selected providers.

**Reactivity**
- `$effect`: Synchronizes the `configurationState` with the global configuration whenever changes occur.
- `onMount()`: Fetches the available IBV providers and adds them to the selected list if they are not already included.

#### 5.3.5 User Flow

- The user can toggle Bankuity's connectivity optimization on or off, which controls whether provider configurations are editable.
- Providers are listed with their current status (enabled/disabled). Users can toggle the status of each provider individually.
- Clicking the "Configure" button opens a configuration modal for the selected provider.
- If no providers are selected, a message will be displayed saying "No providers selected."
- If the unit list is populated, the OverrideLock component prevents further changes to the configuration.

### 5.5 Assessment Zones

#### 5.5.1 Purpose

The Assessment Zones screen allows users to configure and manage zones used for assessments. It provides tools to define zones with unique properties like position, color, name, and description. The screen ensures that at least two zones are always present and allows editing or locking configurations based on certain conditions.

#### 5.5.2 Key Features

**Color Range Picker**:
- Displays a color range picker component to configure the color representation of each assessment zone.
- **Props**:
  - `zones`:  Binds the current list of zones for dynamic updates.
  - `claimValue`: Determines if editing is allowed based on user permissions.
- **Assessment Zone Details**
- Displays a detailed list of all assessment zones, allowing users to edit zone properties such as name, description, and position.
- **Props**:
  - `zones`: Binds the current list of zones to update zone details dynamically.
  - `claimValue`: Determines if zone details can be edited based on permissions.
- **Override Lock**
  - Prevents changes to assessment zones if the unitList contains any items.

#### 5.4.3 Key Components
  
**Color Range Picker**:
- Used to define and update the color ranges for assessment zones.
- Binds the zones array to ensure real-time updates during editing.
  
**Assessment Zone Details**:
- Provides a detailed view and editing interface for assessment zones.
- Allows modifications to zone properties such as position, color, name, and description.
  
**Override Lock**:
- Locks the configuration from being edited if certain conditions (e.g., populated unitList) are met.

### 5.6 API Settings

#### 5.6.1 Purpose
The API Settings screen allows users to securely view and manage their API credentials, including the API Key, Client ID, and Secret. This screen ensures that sensitive credentials are displayed in a read-only format, with functionality to regenerate and copy credentials when necessary.

#### 5.6.2 Key Features
**View Credentials:**

- Displays the API Key, Client ID, and Secret in a secure and read-only manner.
- Users are advised to store credentials securely and avoid sharing them.
  
**Copy to Clipboard:**

- Allows users to copy credentials (API Key, Client ID, or Secret) to the clipboard with a single click.
- A success or failure toast notification is displayed after the copy action.
  
**Regenerate Secret:**

- Provides functionality to regenerate the API Secret securely.
Includes loading and error handling mechanisms.
- Displays a confirmation toast on successful regeneration.
  
**Security Warning:**

- Displays a warning message to highlight the sensitive nature of credentials and emphasize the importance of secure storage.

#### 5.6.3 Key Components

**API Key Section**
- **Purpose**: Displays the API Key, which is used to authenticate API requests.
- **Features** : 
  - The key is shown in a read-only input field.
  - Includes a "Copy to Clipboard" button for convenience.
- **Props**:
  - `value`: Binds to localConfiguration?.apiKey

**Client ID Section**
- **Purpose**:  Displays the unique Client ID for identifying the API user.
- **Features** : 
  - The secret is shown in a read-only input field.
  - Includes a "Copy to Clipboard" button for convenience.
  - Users with appropriate permissions (`claimValue === "Edit"`) and in the correct context (`type=Organization`) can regenerate the secret.
  - Displays a loading spinner while regenerating the secret and updates the UI upon success or failure.

**Warning Message**
- **Purpose**: Informs users about the sensitive nature of API credentials and the importance of secure storage.
- **Details**:
  - The warning is highlighted with a yellow background to draw attention.

#### 5.6.4 State Management

- **State Variables**: 
  - `isLoading`: Indicates whether the secret is being regenerated.
  - `error`: Stores any error that occurs during the regeneration process.
  - `localConfiguration`: Maintains a local copy of the configuration for editing and regenerating secrets.
- **Effects**:
  - `$effect`: Updates the local copy of the configuration (`localConfiguration`) whenever the parent configuration changes.
  - 
#### 5.6.5 API Integration
- **Regenerate Secret Endpoint**:
  - **Endpoint**: `/api/organization-settings/regenerate-secret`
  - **Method**: `POST`
  - **Payload**: The current `localConfiguration`.
  - **Response Handling**:
    - Updates localConfiguration with new credentials upon success.
    - Displays toast notifications for success or failure.
- **Copy to Clipboard**:
  - Utilizes the `navigator.clipboard.writeText` API
  - Displays a toast notification indicating the outcome (success or failure).

#### 5.5.6 User Flow
  - **Viewing Credentials**:
    - Users access the screen to view their API Key, Client ID, and Secret in a secure manner.
    - Credentials are displayed in non-editable input fields.
 - **Copying Credentials**:
   - Users click the "Copy" button next to any credential.
   - A success or failure toast is displayed.
 - **Regenerating Secrets**:
   - If allowed (`claimValue === "Edit" and type=Organization`), users can regenerate the API Secret by clicking the "Regenerate Secret" button.
   - A loading spinner and toast notifications provide feedback on the process.


# Organization Details Management

## 1. Overview
The Organization Details Management screen extends the functionality of the Group Details Management screen, providing administrators with an interface to manage organization-level settings and configurations. While it shares many components and features with the Group Details Management screen, there are specific conditions and behaviors unique to the organization level.

## 2. Inheritance from Group Details Management
This screen inherits the core functionality, components, and structure from the Group Details Management screen. Refer to the Group Details Management for detailed information about shared components and features.

## 3. Key Differences and Organization-Specific Features

### 3.1 Component Variations

**GroupOrUnitDetails Component**
  - All functionality remains the same as Group Details Management
  - Additional conditions:
    - The name field displays the organization name instead of the group name based on condition `type==="Organization"`.
**GroupUnitSidebar Component**
  - All functionality remains the same as Group Details Management
  - The first menu item is renamed to "Organization Details" based on condition `type==="Organization"`.

**GroupUnitSection**
  - Maintains core functionality from Group Details Management
  - Organization-Level Modifications:
    - Headers display "Organization" instead of "Group" in titles

## 4. API Differences
### 4.1 Organization-Specific Endpoints

**Base endpoint**:` GET /Users/GetOrganizationSettings`
**Query Parameters**: ouType="Organization", others remail the same as Group Details Management

### 4.2 Subscription Details Endpoint (Under development)

#### 4.2.1 Bundle List API
- **Endpoint**: `GET /Organization/GetBundles`
- **Input**: none
- **Output**: List of bundles (bundleName, bundleId, description & featuresList) available for the organizations

#### 4.2.2 Feature List API
- **Endpoint**: `GET /Organization/GetFeatures`
- **Input**: none
- **Output**: List of features (featureName, featureId, description & featuresList) available for the organizations

## 5 Feature-Specific Differences
### 5.1 API Settings Screen
- In this screen the API Key, Client Id and Secret field are editable as the organization is the owner of the API.
- Other functionalities like copying the API key are the same as Group Details Management.
## 6. Additional Screens
The below are the additional screens that are specific to the organization level:
### 5.7 Subscription Details  (Under development)

#### 5.7.1 Purpose

The Subscription Details screen provides a comprehensive view of the user's current subscription, including the current subscribed bundle and associated features. It enables users to explore the details of current subscribed bundle and features and identify the features included in their subscription.

#### 5.7.2 Key Features

- **View Subscribed Bundle**:
  - Displays the currently subscribed bundle and its features.
  - Highlights the bundle features and addon features.
  
  
- **Features List**:
  - Displays a list of all features, including those included in the selected or current bundle.
  - Differentiates between included and add-on features.
  - Shows the bundle name for features that are part of a bundle.

- **Responsive Messaging**:
  - Displays appropriate messages when no bundles or features are available.

#### 5.7.3 Key Components

- **Subscribed Bundle Features Section**
  - **Purpose**: Displays a list of features associated with the subscribed bundle.
  - **Components**:
    - Each feature includes:
      - Feature name.
      - Feature description.
      - A badge indicating the feature's association with the current bundle.
  - **Responsive Behavior**:
    - Shows a warning message if no features are available for the selected bundle.
  - **Features Section**
    - **Purpose**: Displays all features, categorizing them as included or not included in the user's subscription.
    - **Components**:
      - Each feature includes:
        - Feature name.
        - Feature description.
        - A badge indicating the feature's inclusion status ("Included") and its associated bundle (if applicable).
      - Features are visually differentiated by inclusion status.
    - **Responsive Behavior**:
      - Shows a warning message if no features are available.
  
#### 5.7.4 State Management
- **State Variables**:
  - `selectedBundles`: Tracks the currently selected bundle(s) from the dropdown.
  - `selectedBundleFeatures`: A derived state that filters features associated with the selected bundle.
  - `allFeatureList`: A derived state that maps all available features, marking included features and their associated bundles.
- **Effects**:
  - `$effect`: Synchronizes the selected bundle dropdown with the current configuration.

#### 5.7.5 Data Integration
- **Bundle Data**:
  - Pulled from page.data.bundleList.
  - Each bundle includes
    - `bundleId`: Unique identifier.
    - `bundleName`: Name of the bundle.
    - `featuresList`: Comma-separated feature IDs.
- **Feature Data**:
  - Pulled from `page.data.featureList`
  - Each feature includes:
    - `featureId`: Unique identifier.
    - `featureName`: Name of the feature.
    - `description`: A brief explanation of the feature.
- **Mapping Logic**:
  - Maps features to their respective bundles using the `featuresList` field.
  - Marks features as "included" if they are part of the current or selected bundle.
  
- **User Flow**:
  - **View Current Subscription**: 
    - Users access the screen to view details of their current subscription, including the bundle and included features.
  - **Switching Bundles**:
    - Users select a different bundle from the dropdown.
    - The list of associated features updates dynamically.
  - **Explore All Features**:
    - Users view all available features, with included features visually distinguished.
    - Features that are part of a bundle display the associated bundle name.
  - **Responsive Feedback**:
    - If no bundles or features are available, users are informed with clear warning messages.

# Unit Details Management

## 1. Overview
The Unit Details Management screen adapts the functionality of the Group Details Management screen for unit-level operations. While sharing the core infrastructure, it implements unit-specific behaviors and restrictions. This focuses on the differences and unit-specific features.

## 2. Inheritance from Group Details Management
This screen inherits the base components and structure from the Group Details Management screen. Refer to the Group Details Management section for shared components and features.

## 3. Key Differences and Unit-Specific Features
### 3.1 Component Variations
**GroupOrUnitDetails** Component
- Core functionality remains similar to Group Details Management
- Unit-Specific Changes
  - Checks for type === "Unit" to enable unit-specific features.
  - The name field displays the unit name instead of the group name based on condition `type==="Unit"`.
  
**GroupUnitSidebar Component**
  - All functionality remains the same as Group Details Management
  - The first menu item is renamed to "Unit Details" based on condition `type==="Organization"`.
  - Reduced tab set: only "Settings" and "Members" tabs are available.
  - No "Groups" or "Units" tabs as units cannot contain sub-groups or sub-units.
  - "Settings" and "Members" tabs are displayed with icons as only two tabs are available.

**GroupUnitSection Component**
  - Maintains core structure from Group Details Management
  - Unit-Level Modifications:
    - Headers display "Unit" instead of "Group" in titles
  
**ApplyChangesPopup**:
- Unit-Level Modifications:
  - It hide Apply Settings to section to apply changes to child units as units cannot contain sub-groups or sub-units.
  - Only Save and Cancel buttons are displayed.
  
## 4. API Differences
### 4.1 Unit-Specific Endpoints
Base endpoint: GET /Users/GetOrganizationSettings
Query Parameters:ouType: Set to "Unit"

## 5 Feature-Specific Differences

- All Features (ex, Income, Lending Guide, Bank Connectivity provider, Assessment zones and Subscriptions) core functionality remains the same as Group Details Management.
-  Unit-Level Modifications:
   -  Override Lock Section is hidden for units as units cannot contain sub-groups or sub-units to lock the settings.
   -  All Units are allowed to change the settings if it is not locked from parent group or organization.

# Roles Management

## 1. Overview
The Roles Management screen provides administrators with a centralized interface to view, assign, and manage user roles within the system. It enables detailed role-based sorting, efficient pagination, and access to user-specific role information for better access control management.

## 2. Functional Scope
- Display list of roles with essential details.
- Search roles by name or other criteria  
- Sort roles by different columns  
- Add new roles through a dedicated interface (currently this screen is pending)  

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **User Table**: Displays role information in a sortable format.  
- **Search Bar**: Real-time user search functionality.  
- **Add new role**: Quick access to role creation interface (Under Development).   
- **Sorting**: Order users by various columns.  

### 3.2 User Interactions
- Sort table columns by clicking headers.  
- Search for specific users using the search bar.  
- Navigate between pages of user records.  
- Add new roles via the "Add New Role" button.(Under Development).

## 4. Key Components

### 4.1 UsersTable Component
**Features**  
- Dynamic sorting by columns  
- Responsive design for various screen sizes  
- Interactive row highlighting  
- Column-specific sorting indicators  

**Props**  
- `sortBy`: Current sorting column  
- `sortOrder`: Sort direction (`"asc"` | `"desc"`)  
- `totalRecords`: Total number of user records  
- `currentPage`: Current page number  
- `pageSize`: Records per page  
- `searchValue`: Current search term  

### 4.2 OrganizationSearchBar Component
**Features**  
- Real-time search functionality  
- Debounced input handling  
- Clear search option  

### 4.3 Button Group
**Features**  
- "Add New Role" button with icon  
- Permission-based button visibility  
- Direct navigation to role creation form  
  
## 5. APIs

### 5.1 Get Roles
 
 - **Endpoint**: `GET /Users/GetOrganizationRoles`
 - **Purpose**: Retrieves paginated and filtered list of roles

  - **Input**:
    - **Query Parameters**:
      - pageNo: Current page number (default: 1)
      - sortBy: Column to sort by
      - sortOrder: Sort direction
      - filters: Search value for filtering users
      - orgUnitId: Organization unit identifier
- **Output**:
    - Success: JSON object containing:
      - List of roles
      - Pagination information
      - Total record count
- **Error**: JSON response with message "Failed to fetch users" and 500 status
- **Usage**: Called to populate and update the users table with sorting, filtering, and pagination

# Bundles Management
## 1. Overview
The Bundles Management screen provides administrators with a centralized interface to view, create, and manage service bundles. This includes displaying bundle details, sorting and filtering capabilities, and access to a detailed view of bundle features. The screen also supports responsive design for seamless navigation across devices.

## 2. Functional Scope
- Display a list of bundles with key details.
- Expand individual bundles to view their features.
- Sort bundles by different columns such as name, price, and date.
- Add new bundles via a dedicated interface.
- Update or manage existing bundles.

## 3. Detailed Feature Breakdown
### 3.1 Core Features
- **Bundles Table**: Displays a sortable, paginated list of bundles with details like price, description, and creation date.
- **Expand/Collapse Rows**: View detailed feature lists for individual bundles.
- **Add Bundle Button**: Direct access to create a new bundle.
- **Sort Functionality**: Sort bundles by attributes such as name, price, or last updated.

### 3.2 User Interactions
- **Add Bundle**: Click the "Add Bundle" button to navigate to the bundle creation screen.
- **Sort Columns**: Click column headers to toggle sorting by that attribute.
- **Expand Rows**: Click on a bundle row to expand and view associated features.
- **Manage Bundle**: Click the "Manage" link in the action column to edit a specific bundle.

## 4. Key Components

### 4.1 BundlesTable Component
**Features**
- Displays key bundle information, including:
  - **Bundle Name**: The name of the bundle.
  - **Description**: A brief description of the bundle.
  - **Bundle Price**: The cost of the bundle.
  - **Platform Fee**: The platform's service fee for the bundle.
  - **Created By**: The name of the user who created the bundle.
  - **Last Updated**: The date the bundle was last modified.
- Expandable rows to display a list of features included in the bundle.
- Sortable columns for dynamic data organization.
  
**Props**
- `sortBy`: Current column used for sorting.
- `sortOrder`: Direction of sorting ("asc" or "desc").
- `bundles`: Array of bundle data.
- `isLoading`: Flag indicating if data is being fetched.

**Methods**

- `getBundles`: Fetches the list of bundles from the backend API.
- `onSortButtonClick`: Toggles the sorting state for the selected column.
- `toggleRow`: Expands or collapses a row to display detailed features.

### 4.2 Add Bundle Button
**Features**

- Navigates to the bundle creation screen (/manage/bundles/0).
- Includes an icon for visual clarity.

### 4.3 Expandable Feature Details

**Features**
- Displays additional details about the features included in a bundle.
- Feature fields:
  - **Feature Name**: Name of the feature.
  - **Description**: Details or purpose of the feature.

## 5. APIs
### 5.1 Get Bundles
- **Endpoint**: `GET /api/manage/bundles`
- **Purpose**: Fetch a list of bundles with sorting and filtering capabilities.
Input

- **Query Parameters**:
  - `sortBy`: Column to sort by (e.g., `bundleName`, `bundlePrice`).
  - `sortOrder`: Direction of sorting (`asc` or `desc`).

- **Output**:
  - Success: JSON response with a list of bundles.
## 6. State Management
### 6.1 Table State
- `sortBy`: The column used for sorting.
- `sortOrder`: The direction of sorting ("asc" or "desc").
- `expandedRows`: Tracks the currently expanded bundle row.
- `isLoading`: Indicates whether the data is being fetched.

# Bundle Management (Add/Update Bundle)

## 1. Overview
The Bundles Add/Update screen enables administrators to create or modify bundles in the system. This screen provides a user-friendly interface for entering bundle details, selecting features, configuring pricing tiers, and validating input data to ensure accuracy. The interface adapts dynamically based on whether a new bundle is being added or an existing one is being updated.

## 2. Functional Scope
- Add a new bundle with details such as name, features, pricing, and description.
- Update an existing bundle with new or modified details.
- Dynamically calculate bundle pricing based on selected features.
- Configure and manage pricing tiers for the bundle.
Validate input data to prevent errors during submission.

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Bundle Information Form**: Collect details such as name, description, selected features, platform fee, and calculated bundle price.
- **Dynamic Feature Selection**: Use a multi-select dropdown to choose features and auto-calculate the bundle price.
- **Tier Management**: Add and update pricing tiers with configurations like unit ranges and per-unit pricing.
- **Save Button**: Save the bundle to the system or navigate back to the bundle management page.
- **Validation**: Real-time validation of inputs with error messages for empty or invalid fields.

### 3.2 User Interactions
- Select one or more features from a dropdown and view the updated bundle price.
- Enter a platform fee to calculate the final price.
- Add or modify pricing tiers using the Tier Management component.
- Save the bundle or return to the previous screen.

## 4. Key Components
### 4.1 Bundle Information Form
- **Fields**:

  - **Name**: Text field for entering the bundle name.
    - Validation: Cannot be empty.
  - **Select Features**: Multi-select dropdown to choose features for the bundle.
    - Automatically calculates the total price based on selected features.
  - **Platform Fee**: Input field for specifying the monthly platform fee.
    - Validation: Must be a valid float number.
  - **Bundle Price**: Automatically calculated as the sum of selected feature prices.
    - Disabled for manual input.
  - **Description**: Text area to describe the bundle.
  
- **Validation Logic**:

  - Each field is validated to ensure proper input:
  - Name, features, and platform fee cannot be empty.
  - Bundle price is auto-calculated.

### 4.2 Dynamic Feature Selection
- Component: `DynamicSelect`
- Allows administrators to select features dynamically.
- Updates the total bundle price based on selected features.
- Retrieves feature details from the backend (/Organization/GetFeatures).

### 4.3 Tier Management
- Component: `TierManagement`
- Enables configuration of pricing tiers for the bundle.
- Allows defining:
  - **Unit Ranges**: Minimum and maximum units for the tier.
  - **Price Per Unit**: Cost per unit for the tier.
- Dynamically updates the tiers in the bundle object.

### 4.4 Save Button
- Component: `Button`
- Submits the form and saves the bundle to the system.
- Disabled when no changes are detected or while the save operation is in progress.
- Validation Before Save:
  - Ensure all mandatory fields are filled in.
  - Prevent saving if any errors exist in the input fields.

## 5. APIs
### 5.1 Fetch Features
- **Endpoint**: `GET /Organization/GetFeatures`
- **Purpose**: Retrieve a list of available features for selection.
- **Input**: None
- **Output**: JSON response with a list of features("featureId", "featureName", "basePrice").

## 5.2 Fetch Bundle Details (Edit Mode)
- **Endpoint**: `GET /Organization/GetBundle?bundleId={id}`
- **Purpose**: Retrieve the details of an existing bundle for editing.
- **Input**: `bundleId`, the ID of the bundle to fetch.
- **Output**: JSON response with bundle details.

## 5.3 Save Bundle
- **Endpoint**: `POST /api/manage/bundles`
- **Purpose**: Save the bundle to the system (create or update).
- **Input**: JSON object containing bundle details.
- **Output**: Message indicating success or failure.

## 6. State Management
### 6.1 Bundle State
- `bundle`: Stores all bundle details, including name, price, features, and tiers.
- `selectedFeatures`: Tracks features selected for the bundle.
tiers: Stores the pricing tiers associated with the bundle.
### 6.2 Error State
  - `errorMessage`: Tracks validation errors for each field in the form.
### 6.3 Save State
  - `isUpdating`: Prevents multiple save operations.
  - `trackChanges`: Detects unsaved changes to prevent redundant saves.

# Feature Management
## 1. Overview
The Features Management screen provides administrators with a centralized interface to view, create, update, and manage features within the system. This screen includes a responsive table for displaying features, sorting capabilities, and options to add or update features dynamically.

## 2. Functional Scope
- Display a list of features with key details.
- Sort features by attributes like name, price, or creation date.
- Add new features through a dedicated interface.
- Update existing features by navigating to their management page.
- Support responsive design for seamless usability across devices.

## 3. Detailed Feature Breakdown
### 3.1 Core Features
- **Features Table**: A sortable, responsive table displaying feature details, including pricing and creator information.
- **Add Feature Button**: A button that navigates to the feature creation interface.
- **Sort Functionality**: Sort features dynamically by clicking on column headers.
- **Manage Action**: Navigate to the individual feature management screen to edit details.

### 3.2 User Interactions
- **Add Feature**: Click the "Add Feature" button to create a new feature.
- **Sort Columns**: Click on a table header to toggle sorting by that column.
- **Manage Feature**: Click the "Manage" link in the action column to update a feature.

## 4. Key Components
### 4.1 FeaturesTable Component
**Features**

- Displays feature details, including:
  - **Feature Name**: Name of the feature.
  - **Description**: A brief description of the feature.
  - **Base Price**: The cost of the feature in USD.
  - **Platform Fee**: Additional platform service fee in USD.
  - **Created By**: The name of the user who created the feature.
  - **Last Updated**: The date the feature was last modified.
  - Sortable columns for dynamic data organization.
  - Action column for managing individual features.

**Props**

- `features`: Array of feature objects to display in the table.
- `sortBy`: The current column used for sorting.
- `sortOrder`: The sorting direction ("asc" or "desc").

**Methods**

- `getFeatures`: Fetches the list of features from the backend API.
- `onSortButtonClick`: Toggles sorting for the selected column.

### 4.2 Add Feature Button
**Features**

- Navigates to the feature creation screen (/manage/features/0).
- Includes an icon for visual clarity.

### 4.3 Tooltips
**Features**

- Display additional information (e.g., truncated text or field descriptions).
- Tooltip is triggered when hovering over a value in the table.

## 5. APIs
### 5.1 Get Features
- **Endpoint**: `GET /api/manage/features`
- **Purpose**: Fetch a list of features with sorting capabilities.
- **Input**: 

  - Query Parameters:
    - `sortBy`: The column to sort by (e.g., `featureName`, `basePrice`).
    - `sortOrder`: The sorting direction (`asc` or `desc`).
- **Output**:
  - Success: JSON response with a list of features:
  - Failure: Error response with appropriate status code and message.

## 6. State Management
### 6.1 Table State

- `features`: Stores the list of features fetched from the backend.
- `sortBy`: The column currently being used for sorting.
- `sortOrder`: The sorting direction ("asc" or "desc").
- `isLoading`: Indicates whether data is being fetched.
expandedRows: Tracks which rows in the table are expanded. 

# Feature Management (Add/Update Feature)

## 1. Overview
The Feature Add/Update screen provides administrators with a streamlined interface to create or edit features in the system. This screen includes fields for capturing basic feature details, tier pricing configurations, and real-time validation to ensure data accuracy. The interface adapts dynamically based on whether a new feature is being created or an existing one is being edited.

## 2. Functional Scope
- Add New Feature: Create a new feature with relevant details such as name, pricing, and description.
- Update Existing Feature: Edit the details of an existing feature, including tier configurations.
- Configure Pricing Tiers: Define custom pricing tiers for the feature.
- Validate Input: Real-time validation for all fields to ensure proper data entry.

## 3. Detailed Feature Breakdown

### 3.1 Core Features
- **Feature Information Form**: Collects feature details such as name, description, base price, and platform fee.
- **Tier Management**: Enables configuration of pricing tiers, including unit ranges and price per unit.
- **Save Button**: Saves the feature to the system, with feedback provided via toast notifications.
- **Dynamic Mode**: Adapts the interface for adding or updating a feature based on the feature ID.

### 3.2 User Interactions
- **Add Feature**: Users can create a new feature by entering details and clicking the "Save" button.
- **Edit Feature**: Users can modify an existing feature, update pricing tiers, and save changes.
- **Real-Time Validation**: Inline error messages guide users to correct invalid or incomplete inputs.
  

## 4. Key Components
### 4.1 Feature Information Form

**Fields**:

- **Name**: Input field for the feature's name.
Validation: Cannot be empty.
- **Base Price**: Input field for the feature's base price in USD.
  - **Validation**: Must be a valid float number.
  - Automatically updates the price per unit for the default tier.
- **Platform Fee**: Input field for the platform fee in USD.
  - **Validation**: Must be a valid float number.
- **Description**: Textarea for describing the feature.
- **Validation Logic**:

  - All fields are validated for completeness and correctness before submission.

### 4.2 Tier Management
Component: `TierManagement`

  - Enables defining pricing tiers for the feature.
  - **Tier Fields**:
    - **Unit Ranges**: Minimum and maximum units for the tier.
    - **Price Per Unit**: Cost per unit for the tier.
  - Automatically syncs tier pricing with the base price of the feature.

### 4.3 Save Button
Component: `Button`

  - Submits the form and saves the feature to the system.
  - Disabled when:
    - No changes are detected (tracked by trackChanges).
    - A save operation is already in progress (isUpdating).
  - Validation Before Save:

  - Ensures all required fields are filled and valid.

## 5. APIs
### 5.1 Fetch Feature Details (Edit Mode)
- **Endpoint**: `GET /Organization/GetFeature?featureId={id}`
- **Purpose**: Retrieve the details of an existing feature for editing.
- **Input**:Feature ID.
- **Output**: JSON response with feature details.

### 5.2 Save Feature
- **Endpoint**: `POST /api/manage/features`
- **Purpose**: Save a feature to the system (create or update).
- **Input**: Feature details including name, pricing, and tier configurations.
- **Output**: Message with success or failure response.

## 6. State Management
### 6.1 Feature State
- `feature`: Stores all details of the feature, including name, price, and tiers.
- `tiers`: Tracks the pricing tiers defined for the feature.
## 6.2 Validation State
- `errorMessage`: Tracks validation errors for each input field.
## 6.3 Save State
- `isUpdating`: Tracks whether a save operation is in progress.

# Report
## 1. Overview
This component serves as the main report page of the application. It provides a comprehensive view of the user's financial data by organizing and displaying various sections of their financial report. Below is a detailed explanation of its UI structure and functionalities:
## 2. Functional Scope
1. **Fetch and Display Data**: Retrieve the user's financial account data and associated processing results.
2. **Provide Financial Insights**: Present sections like:
    - **Risk Assessment**: Detailed breakdown of the user's financial risk profile.
    - **Lending Guide**: A guide to understanding the lending process.
    - **Overview**: A summary of the user's financial status.
    - **Income Trends**: Visual representation of income trends.
    - **Report of All Transactions**: A comprehensive list of all transactions.
3. **Handle Refresh Logic**: Allow users to refresh the report to view the latest financial data for a specific request ID.
4. **Show Historical Reports**: Display past reports generated after a successful refresh.
5. **Highlight Discrepancies**:
    - Identify and display differences between the financial data in Bankuity and the data received from various providers.
    - Help users understand and reconcile inconsistencies in the reported information.
## 3. Key Components
### 3.1 Top Banner
#### 3.1.1 Overview
The `Topbar` component is responsible for rendering the top banner of the report page. It displays information about the current report, including the report ID, request code, personal details, banking details, and any detected application changes for the latest report. The component also provides functionality to refresh the report and navigate to the report history page.
#### 3.1.2 Props
- `accountGuid`: The GUID of the current account beingdisplayed.
- `refreshPage`: A function to refresh the currentreport.
- `discrepancyDetails`: An array of account details,including any detected discrepancies.
  ``` typescript
  //discrepancyDetails type
   export type AccountDetails = {
    dataField: string;
    applicationData: string | number;
    bankuityData: string | number;
    match?: boolean;
   }; 
   ```
#### 3.1.3 Features
- **Latest Report Details**: On the left-hand side, it displays request code and account number ending, the date of the latest report, a button to view the historical report, a refresh button to generate the latest report, and the names on the account. On the right-hand side, it displays the personal details and banking details.
- **Historical Report**: When the user clicks on the "View" button, it toggles to the historical report page [].
- **Refresh Button**: When the user clicks on the refresh button, it toggles to the refresh screen [] and generates the latest report.
- **Discrepancy Details**: When the user clicks on the "aplication discripancy" button, it shows to the discrepancy details as a modal `ApplicationDiscrepanciesModal`([3.1.5 Components](#315-components)).
#### 3.1.4 Utility Functions
  The component uses various utility functions and components to generate and display the report details, including:
  - **`convertDateTime`**: A custom utility function to format the report date. About this function we will learn more in the common utility section.
  - **`getApplicationDifferenceData`**: A function to retrieve the application difference data.
  
    **Function Parameters**:
    - `responseData`: Represents the complete response data containing processing results, account details, and related financial information.
    - `selectedAccountGuid`: (Optional) Specifies the unique identifier of the account to extract data for.
      - If not provided, the function selects the primary income account or defaults to the first account in the list.

    **Return Value**:

    The function returns an object of type `ApplicationData`, which contains the following structured fields:
    - `CustAcctNo`: The account number from banking data, or an empty string if unavailable.  
    - `CustFName`: The first name of the account holder, derived from the names field.  
    - `CustLName`: The last name of the account holder, derived from the names field.  
    - `CustMobilePhone`: The account holder's phone number.  
    - `CustEmail`: The account holder's email address.  
    - `CustAdd1`: The account holder's address.  
    - `CustBankName`: The name of the bank associated with the account.  
    - `CustDebitCard`: The debit card information, if available.  
    - `MonthlyIncome`: The active monthly income for the account.  
    - `EmpName`: The employer's name for the account holder, set to "*" if `selectedAccountGuid` is not provided.  
    - `BankTransit`: The routing number of the bank.

  - **`createDifferenceArray`**: The createDifferenceArray function is used to compare two sets of application data (applicationData and bankuityData) and create an array of discrepancies. This array highlights any mismatches between the two datasets for various fields like name, phone number, account details, and more.
  
    **Function Parameters**: 
    - `applicationData`:
      - Represents the application data received from a provider.
      - Contains user-related information such as name, account details, and income.
    - `bankuityData`:
      - Represents the data from the "Bankuity" system.
      - Also contains user-related details for comparison.

    **Return Value**

    The function returns an array of type AccountDetails[]. Each element in the array contains:
      - `dataField`: The label of the field being compared (e.g., "First Name").
      - `applicationData`: The value of the field in the applicationData.
      - `bankuityData`: The value of the field in the bankuityData.
      - `match`: A boolean indicating whether the values from both datasets match.
  - **`generateDetails`**: The `generateDetails` function is designed to create and return structured data containing **personal details** and **banking details** for an account. It uses data from the provided account and product processing result to populate relevant fields.
    
    **Function Parameters**

    - `accountData`:Represents the account information, including:
      - Personal details such as email, phone, and address, primary income/employer name.
      - Banking details such as account type, account number ending, routing number, bank name and debit card ending, provider name.
    - `productProcessingResult: ProductProcessingResult`
        - Contains processing results for the product, including validation information like employer name.

    **Return Value**

    The function returns an object with two structured sections:
    - `_personalDetails`
      - Includes:
        - Email address
        - Phone number
        - Home address
        - Primary income (employer name)
      - Each field contains:
        - `label`: The display name of the field.
        - `value`: The data extracted or "N/A" if unavailable.
        - `isVisible`: Boolean indicating if the field should be displayed.

    - `_bankingDetails`
      - Includes:
        - Account type
        - Account number (masked)
        - Routing number
        - Bank name
        - Debit card ending
        - IBV (Instant Bank Verification)
      - Each field follows the same structure as personal details (`label`, `value`, `isVisible`).
#### 3.1.5 Components
  - **`DetailsComponent`**: A component to display the personal and banking details for the current account.
    - Takes data(DetailsTopBanner) as props.
      ``` typescript
      export interface DetailsTopBanner {
          heading: string;
          details: {
              label: string;
              value: string;
              isVisible?: boolean;
          }[];
      }
      ```
    - Renders the details on top banner component for a report.
    - The component displays a heading and a list of details, where each detail item has a label and a value.
    - The visibility of each detail item is controlled by the `isVisible` property.
  - **`HistoryAccountDropdown`**: A component to allow the user to switch between accounts in the report history.
    - A dropdown component that allows the user to select an option from a list of options.
    - The dropdown can be disabled, and the selected option is displayed with a label and a secondary label if available.
    - The dropdown can be toggled open and closed, and the user can select an option by clicking on it.
  - **`ApplicationDiscrepanciesModal`**: A modal component to display any detected application changes.
    - This component renders a modal that displays a data comparison between the application data and the Bankuity data for a specific account.
    - The modal includes a dropdown to select the account, and a table that displays the data fields name, application data, Bankuity data, and whether they match or not.
    - The component also handles closing the modal when the user clicks outside of it.
    - **`ActionNavigationBar`**: A component to display the navigation bar for the report.
      - Displays the number of connected and disconnected accounts.
      - Provides a dropdown to select an account and switch between accounts.
      - Includes navigation tabs for different financial sections.
      - Shows action buttons for quick access to the loan dashboard.
    - **`AccountDropDown`**: This component is a customizable dropdown for selecting bank accounts, displaying their connection status, balance, and other details.
      - Displays a list of accounts with connection status.
      - Shows the primary account with a star icon.
      - Provides tooltips for account names.
      - Dispalys formated balance and AMI (Active Monthly Income) values.
      - Supports an `onChange` callback when an option is selected.
### 3.2 Support Components
  - **`InfoPanel`**:This is a Svelte component that displays an informational panel with a title, an icon, and a body message.
    - **Props**:
      - `title`: string → The title text displayed in the panel.
      - `body`: string → The body text providing additional details. 
  - **`AlertAccordion`**:This Svelte component creates an expandable panel displaying an assessment title, description, assessment reasons if exists in an optional dropdown.
    - **Props**:
      - `title`: string → The main title of the assessment panel.
      - `description`: string → The description text providing additional details.
      - `assessmentReasons`: string[] → An array of strings representing the reasons for the assessment.
      - `style`: IZoneStyleType → Defines text color, border color, and background color.
        ``` typescript
        export interface IZoneStyleType {
            bgColor: string;
            textColor: string;
            borderColor: string;
        }
        ``` 
      - `enableDropdown`: boolean → Enables or disables the expandable section (default: true).
  - **`Loader`**: [Loader Component](#loader-component)
### 3.3 Error
This snippet conditionally displays an `InfoPanel` [3.2 Support Components](#42-support-components)  component when `processingResult.status` is `"Error"` form API [API]. The panel informs the user that the analysis is unavailable due to missing transaction data.
```svelte
{#if processingResult?.status === "Error"}
  <InfoPanel
    title="Analysis Unavailable:"
    body={processingResult.statusDescription ||
      "Report generation requires transaction data. For analysis, please select another account with activity."}
  />
{/if}
```
  The body dynamically displays `processingResult.statusDescription` if available or a default message prompting the user to select an account with activity.
### 3.3 Transactions Not Found
This conditionally displays an `InfoPanel` [3.2 Support Components](#42-support-components)  component when there is no transactions start and end date mentioned in the [4. API](#4-api) response. The panel informs the user that the analysis is unavailable due to missing transaction data.
```svelte
  <InfoPanel
    title="No Transactions Found:"
    body="Report generation requires transactdata. For analysis, please select anotaccount with activity."
  />
```
### 3.4 Historical Report
This screen displays the historical report for a selected account. It includes a dropdown to select an account, a table displaying the report details, and a button to download the report.

### 3.5 Report Screens
#### 3.5.1 Risk Assessment
This Svelte component processes risk assessment data for an account using a set of predefined risk levels. It dynamically calculates risk scores and assessments based on the latest report data and presents them using an AlertAccordion component.

  **Props**:
  - `reportData`: `IReportData` → Selected accountGuid from props to use it for filtering data.
  
  **Derived**:
  - `processingResult`: Retrieves the latest processing data from `page.data`.
  - `productProcessingResult`: Extracts product-specific processing details.
  - `accountData`: Retrieves account data from `productProcessingResult`.
  
  **Risk Configuration**:
  ```svelte
      const RISK_CONFIG = {
      Acceptable: {
        title: "Acceptable Risk:",
        description:
          "Profile appears acceptable. Risk metrics are within acceptable range, but always verify details before making lending decisions.",
        style: ZoneTypes.ACCEPTABLE,
      },
      High: {
        title: "High Risk:",
        description:
          "This account falls outside the acceptable risk range. We do not recommend lending this account without thorough reassessment.",
        style: ZoneTypes.HIGH,
      },
      Moderate: {
        title: "Moderate Risk:",
        description:
          "Risk metrics indicate the need for further evaluation. Exercise caution and review thoroughly before making lending decisions.",
        style: ZoneTypes.MODERATE,
      },
    };
  ```
  Defines risk categories (Acceptable, High, Moderate) with associated descriptions and styles.

  **Onboarding Response Visibility**:
  ```svelte
  let showOnboardingResponse = $derived.by(() => {
    const showOnboarding = page.data.user?.panelConfig?.UsePostOnboardingService ?? true;
      return productProcessingResult?.posResponse && showOnboarding;
    });
  ```
  Determines whether post-onboarding responses should be shown based on configuration settings.

  **Thresholds Calculation**:
  ```svelte
    let threshold1 = $derived.by(() => {
      return showOnboardingResponse
        ? processingResult?.extOptions?.postOnboardingThreshold?.threshold1
        : processingResult?.extOptions?.riskZoneScore?.threshold1;
    });

    let threshold2 = $derived.by(() => {
      return showOnboardingResponse
        ? processingResult?.extOptions?.postOnboardingThreshold?.threshold2
        : processingResult?.extOptions?.riskZoneScore?.threshold2;
    });
  ```
  Dynamically determines threshold values based on whether post-onboarding responses are enabled.

  **Risk Score Calculation**:
  ```svelte
    let riskScore = $derived.by(() => {
      return showOnboardingResponse
        ? productProcessingResult?.posResponse?.riskScore
        : productProcessingResult?.redZoneBehavior.find(
            (item) => item.accountGuid === accountGuid
          )?.riskScore || 0;
    });
  ```
  Fetches the risk score, prioritizing post-onboarding responses when applicable.

  **Assessment Reasons Extraction**:
  ```svelte
      let assessmentReasons = $derived.by(() => {
    const reasons = showOnboardingResponse
      ? productProcessingResult?.posResponse?.alerts
      : accountData?.assessmentReasons;

    return reasons
      ? (Object.values(reasons).flat() as string[])
      : ([] as string[]);
  });
  ```
  Retrieves assessment reasons from either post-onboarding responses or standard alerts.

  **Risk Assessment Computation**:
  ```svelte
    let riskAssessment = $derived.by(() => {
      return getRiskAssessmentFromRiskScore(riskScore, threshold1, threshold2);
    });
  ```
  Computes the risk assessment based on the riskScore and threshold values.

  **Risk Configuration Selection**:
  ```svelte
    let riskAssessment = $derived.by(() => {
      return getRiskAssessmentFromRiskScore(riskScore, threshold1, threshold2);
    });
  ```
  Determines the current risk level configuration (Acceptable, Moderate, or High).

  **Alert Display**:
  ```svelte
  <AlertAccordion
    title={currentRiskConfig.title}
    description={currentRiskConfig.description}
    {assessmentReasons}
    enableDropdown={assessmentReasons.length > 0}
    style={currentRiskConfig.style}
  />
  ```
  - Renders an AlertAccordion component with the calculated risk assessment details.
  - `title`, `description`, and `style` are dynamically populated from currentRiskConfig.
  - `assessmentReasons` are included as dropdown items if available.
#### 3.5.2 Overview
This Svelte component represents a detailed overview of an account's financial data, showing information such as the balance, active monthly income, recurring monthly income, and lending guide.

---
**Props**:
- `accountGuid`: The unique identifier of the account passed as a prop.
- `processingResult`: A derived store that fetches the processing result from the page's state.
- `accountData`: A derived store that finds the account data by matching the accountGuid

**Derived**:
  ```svelte
    let processingResult = $derived<ProcessingResult>(page?.data?.IAResponse?.processingResult);

    let accountData = $derived.by(() =>
        processingResult?.productProcessingResult.accounts.find(
          (item) => item.accountGuid === accountGuid
        )
      );
      
    const minLoanAmount = $derived(accountData?lendingGuide?.minLoanAmount || "0");

    const maxLoanAmount = $derived(accountData?lendingGuide?.maxLoanAmount || "0");

    const maxDebitAmount = $derived(accountData?lendingGuide?.maxDebitAmount || "0");

    const minDebitAmount = $derived(accountData?lendingGuide?.minDebitAmount || "0");

    const repeatOpportunity = $derived(accountData?lendingGuide?.repeatOpportunity || "None");

    const debitDate = $derived(accountData?lendingGuide?.debitDate || "None");

    const debitFrequency = $derived(accountData?lendingGuide?.debitFrequency || "None");

    const paymentNearHoliday = $derived(accountData?lendingGuide?.paymentNearHoliday || "None");
  ```

**Helper Functions**:
  ```javascript
    const getIncomeSources = () => {
      const totalSources =
        accountData?.incomeSources.filter(
          (item) =>
            item.activeScore === 3 &&
            (item.incomeType.includes("Payroll") ||
              item.incomeType.includes("Benefit"))
        ).length ?? 0;
      if (totalSources <= 1) return totalSources + " source";
      return totalSources + " sources";
    };
  ```
  `getIncomeSources`: This function calculates and returns thenumber of active income sources related to payroll or benefits.
  ```typescript
    const scrollToTable = () => {
      const tableRef = document.getElementById("summaryTable");
      if (tableRef) {
        tableRef.scrollIntoView({ behavior: "smooth", block:"center" });
      }
      setTimeout(() => {
        goto("?secondaryTab=Income", { noScroll: true });
      }, 500);
    };
  ```
  `scrollToTable`: Scrolls to the table of income sources in the UI and navigates to the income tab after a brief delay.

  **Balance Type**:
  ```svelte
    let balanceType = $derived.by(() => {
        if (accountData?.availableBalance != null) {
          return "available";
        } else if (accountData?.currentBalance != null) {
          return "current";
        } else {
          return "available"; // Default to "available"
        }
    });
  ```
  `balanceType`: Determines whether to show the "available" balance or the "current" balance based on the available data.

  **Balance Value**
  ```svelte
  let balance = $derived.by(() => {
    if (balanceType === "available") {
      return accountData?.availableBalance ?? 0; // Fallback to 0 if null/undefined
    } else if (balanceType === "current") {
      return accountData?.currentBalance || 0;
    }
  });
  ```
  `balance`: A derived value that returns the balance based on the selected balanceType

  **Sections of the UI**:
  - `Balance Section`: Shows either available or current balance, including the average monthly balance.
  - `Active Monthly Income Section`: Displays the monthly income and includes a tooltip explaining "Active Monthly Income".
  - `Lending Guide Section`: Displays lending conditions such as loan amounts, debit amounts, and frequency.
#### 3.5.3 IncomeTrends
This Svelte component is responsible for displaying income trends, monthly breakdowns, and key financial metrics. It integrates a chart and a calendar for visualizing income over time and handles data derived from [4.1.1 /TransDetails/GetProcessingResults:](#411-transdetailsgetprocessingresults).

---

**Props**:
```svelte
  let {
    accountGuid,
    incomeSources,
  }: {
    accountGuid: string;
    incomeSources: IncomeSourceProp[];
  } = $props();
```
- `accountGuid`: The unique identifier of the account passed as a prop.
- `incomeSources`: An array of income sources available.

**State Variables**:
  ```svelte
  let overview = $state<Overview>();
  let series = $state<Series[]>();
  let navMonth = $state<number>(0);
  let navYear = $state<number>(new Date().getFullYear());
  let yearDropdown = $state<number[]>([]);
  let activeEvent = $state<string>("");
  let activeMonth = $state<number>(0);
  let clickIndex = $state<number>(0);
  let incomeBreakdown = $derived(accountData?.incomeBreakdown);
  const monthlyBreakdown = $derived(incomeBreakdown?.monthlyBreakdown || []);
  ```
**Setting the Overview and Series Data**:
  ```svelte
  $effect(() => {
    const data = monthlyBreakdown?.filter(
      (item: any) => item.month === navMonth + 1 && item.year === navYear
    );
    if (data?.length) {
      overview = data[0]?.overview;
      series = data[0]?.series;
    }
  });
  ```
- Filters the monthlyBreakdown based on the selected month and year.
- Updates overview and series accordingly.

**Processing Transactions and Initializing the Calendar**:
  ```svelte
  $effect(() => {
    if (monthlyBreakdown && monthlyBreakdown?.length > 0) {
      monthlyBreakdown.forEach((element) => {
        element.incomeEvents.forEach((item) => {
          if (item.type === "4") {
            item.type = "3";
          }
        });
      });
    }

    const startDate = new Date(accountData?.transactionsRange?.start || "");
    const endDate = new Date(accountData?.transactionsRange?.end || "");
    yearDropdown = getMonthDropdown(startDate?.getFullYear(), endDate?.getFullYear());
    const navMonthAndYearEnd = findEndMonthAndYear(monthlyBreakdown || []);
    navMonth = navMonthAndYearEnd?.month;
    navYear = navMonthAndYearEnd?.year;
  });
  ```
- Modifies income events for consistency
- Determines the range of years available in the dataset
- Sets the initial navigation month and year

**Components**:

---

**IncomeTrendsChart**:

This Svelte component renders a bar chart using Chart.js to visualize monthly income trends. It provides interactive features such as tooltips, dataset visibility toggling, and scrolling navigation for large datasets.

**Props**:
- `chartDatas`:	The data for the monthly breakdown of income, including month, year, and series data.
- `navMonth`:	The currently selected month for navigation (0-11).
- `navYear`:	The currently selected year for navigation.
- `yearDropdown`:	A list of years available for navigation.
- `activeEvent`:	The currently active event based on user interaction.
- `activeMonth`:	The currently active month based on user interaction.
- `incomeSources`:	List of income sources used for displaying event-related details.

**States**
- `tootipDatas`: Stores tooltip data for chart hover events.
- `tooltipDate`: Stores the selected tooltip date.
- `chart`: Holds the Chart.js instance.
- `uniqueMonths`: Stores unique month labels.
- `monthArrLength`: Stores the total number of months in data.
- `chartData`: Stores dataset for the chart.
- `pointerX`, `pointerY`: Tracks pointer positions for navigation.
- `datasetVisibility`: Tracks visibility of different datasets.
- `isLeftEnd`, `isRightEnd`: Booleans to handle scrolling navigation.

**Helper Functions**

- **processChartData**:
This function processes the chartDatas prop to collect unique months and initialize the chart data. It maps the income series data into the chart's datasets.
  - **Returns**: An object containing:
    - `_chartData`: Processed datasets to populate the chart.
    - `_uniqueMonths`: Array of unique month-year strings.

- **initializeChart**:
Initializes the chart by calling processChartData and setting up the chart configuration. It sets up custom chart plugins for background coloring, bar avatar rendering, and tooltips.

- **updateActiveMonthAndEvent**:
Updates the active event type and month when an interaction occurs.

- **onScrollButtonClick**:
Handles the left and right scroll buttons to update the visible section of the chart.

- **updateNavigatorPosition**:
Updates the position of the navigator (a visual element above the bars) based on the selected month and year.

- **setTooltipData**:
Sets the data for the custom tooltip based on the selected date and event type.

- **customTooltip**:
Customizes the display of the tooltip by positioning it relative to the chart canvas and showing the relevant data.

- **toggleDatasetVisibility**:
Toggles the visibility of a dataset based on its index.

**Event Handlers**
- **onScrollButtonClick**: Handles click events for both left and right scroll buttons. It shifts the visible portion of the chart left or right.
- **updateActiveMonthAndEvent**: Triggered when the user hovers over or interacts with the chart, updating the active event and month.

**Chart Configuration**

The chart is configured using the following settings:

- **Chart Type**: Bar chart
- **Scales**:
  - `x`: Stacked bar chart, with grid lines and no border.
  - `y`: Stacked bar chart, with grid lines and a dollar-sign formatted ticks.
- **Plugins**:
  - `datalabels`: For displaying labels on bars (only for the total value).
  - `legend`: Customized to hide the default chart legend and instead show a custom legend.
  - `tooltip`: Disabled by default, uses the custom tooltip function (`customTooltip`).

**Custom Plugins**:
  - `CanvasBackgroundColor`: Sets a background color for the canvas.
  - `BarAvatarPlugin`: Adds an image overlay on the bars (`avatars`).

**External Components**
- **IncomeTrendsTooltip**: This component is used to display detailed data about the income events, including the date, income sources, and amounts. It is shown near the chart and is updated whenever the tooltip is triggered.
- **LeftScrollButton** and **RightScrollButton**: These are Svelte components used for rendering the left and right scroll buttons, which allow users to navigate horizontally through the chart.
---
**IncomeTrendsCalendar**:

This Svelte component renders an interactive calendar that displays income events for each day based on given data. It provides navigation through months and years and displays tooltips for income details.

**Props**:
- `accountData`: Account details and transaction range.
- `navMonth`: Currently selected month.
- `navYear`: Currently selected year.
- `yearDropdown`: List of selectable years.
- `chartDatas`: Monthly income data.
- `activeEvent`: Currently active income event type
- `activeMonth`: Month associated with the active event.
- `incomeSources`: List of income sources.

**States**
  ```svelte
  let enableDropdown = $state(false); // Controls year dropdown visibility
  
  let eventByDay = $state<{ [key: number]: TooltipData[] }>({}); // Stores events for each day

  let days = $state<number[]>([]); // Stores days displayed in the calendar grid

  let monthName = $state<string>(); // Stores the selected month's name

  let hoveredDay = $state<number | null>(null); // Stores the currently hovered day

  let year = $state(new Date().getFullYear()); // Stores the selected year
  ```

**Helper Functions**

- `eventBinding`: Binds events to the calendar grid.
  ```typescript
  function eventBinding(
    _chartDatas: MonthlyBreakdown[],
    month: number,
    year: number,
  ) {
    const newEventByDay: { [key: number]: TooltipData[] } = {};

    const data = _chartDatas?.filter(
      (item) => item.month === month + 1 && item.year === year,
    );

    data?.forEach((chartData) => {
      chartData?.incomeEvents?.forEach((event) => {
        const date = new Date(event?.date as string).getDate();
        if (!newEventByDay[date]) {
          newEventByDay[date] = [];
        }
        newEventByDay[date].push({
          type: event.type,
          amount: event.amount,
          sourceID: event.sourceID,
        });
      });
    });

    eventByDay = newEventByDay;
  }
  ```
- `isMonthYearEqual`: Checks if a date matches the given month and year.
  ```typescript
  function isMonthYearEqual(date: Date, month: number, year: number) {
    return date.getMonth() === month && date.getFullYear() === year;
  }
  ```
- `changeMonth`: Changes the current year and updates the month selection.
  ```typescript
  function changeMonth(selectedYear: number) {
    enableDropdown = !enableDropdown;
    navYear = +selectedYear;
    navMonth = navYear === endDate.getFullYear() ? endDate.getMonth() : 11;
  }
  ```
- `setHoveredDay`: Updates the hovered day.
  ```typescript
  function setHoveredDay(day: number | null, index: number) {
    hoveredDay =
      day === null || (index < 7 && day > 7) || (index > 28 && day < 8)
        ? null
        : day;
  }
  ```
- `getUniqueEvents`: Returns unique event types for a given day.
  ```typescript
  function getUniqueEvents(data: TooltipData[]) {
    const uniqueTypes = new Map<string, TooltipData>();
    data.forEach((item) => {
      if (!uniqueTypes.has(item.type)) {
        uniqueTypes.set(item.type, item);
      }
    });
    return Array.from(uniqueTypes.values());
  }
  ```
- `sortEventByDay`: Sorts events in descending order by amount.
  ```typescript
  function sortEventByDay(data: TooltipData[]) {
    return [...data].sort((a, b) => b.amount - a.amount);
  }
  ```

**Navigation Functions**

- `nextButtons()`: Moves to the next month if within range.
- `backButtons()`: Moves to the previous month if within range.

**UI Structure**

The component consists of:

- **Calendar Header**: Displays navigation buttons for months and years.
- **Week Days Row**: Displays day names (Sun-Sat).
- **Calendar Grid**: Displays days with event dots and tooltips.
---
**IncomeTrendsTooltip**:

This component is used to display detailed data about the income events, including the date, income sources, and amounts. It is shown near the chart and is updated whenever the tooltip is triggered.

**Props**:
- `title`:	Title of the tooltip.
- `tootipDatas`: Array containing income event details.
- `incomeSources`: List of income sources to map event sources.
- `fromChart`:	false	Determines if the tooltip is used within a chart.
  
**Functionality**

- **Title Display**: The tooltip header displays the provided title.
- **Income Event List**: Each income event is displayed as a list item with:
  - A colored dot representing the income type (based on Colors mapping).
  - The corresponding income source name.
  - The amount converted to USD format.

**Conditional Styling**:
- If fromChart is true, the tooltip is styled with is hidden by default.
- Otherwise, it has default positioning (-left-6 md:-left-10 min-w-200px mt-1).

---
#### 3.5.4 Forcasted Paydays

This Svelte component displays a forecasted paydays table with sorting, filtering, and a dropdown for income source selection.

**Props**

- `predictedPaydays`: List of predicted paydays data.

**State**

  ```svelte 
  let data: FilteredPaydays[] = $state([]);
  let sortBy = $state("");
  let sortDirection = $state(1);
  let checkboxes: CheckboxProp[] = $state([]);
  let filteredData: FilteredPaydays[] = $state([]);
  let name = $state("");
  let selectedCheckboxNames = $state("");
  let checkBoxDropdown = $state(false);
  ```

**Helper Functions**

  ```typescript
  const toggleSort = (column: keyof FilteredPaydays) => {
    if (sortBy === "") {
      sortBy = column;
    }
    if (sortBy === column) {
      sortDirection *= -1;
    } else {
      sortBy = column;
      sortDirection = 1;
    }

    filteredData = filteredData.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      if (aValue < bValue) return -sortDirection;
      if (aValue > bValue) return sortDirection;
      return 0;
    });
  };
  ```
Sorts table data based on a selected column. Toggles sort direction on repeated clicks.

```typescript
const handleCheckboxChange = (event: any, index: number) => {
  checkboxes[index].checked = event.target.checked;
};
```
Updates the checked state of checkboxes.

```typescript
const toggleData = () => {
  checkBoxDropdown = !checkBoxDropdown;
  getSelectedCheckboxNames();
  updateFilteredData();
};
```
Toggles the income source dropdown. Updates selected checkboxes.

```typescript
const getSelectedCheckboxNames = () => {
  const selectedNames = checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.name);

  name = selectedNames.length === 0 ? "Select" : selectedNames.join(", ");
  return name;
};
```
Retrieves and formats the selected checkbox names.

```typescript
const updateFilteredData = () => {
  filteredData = data.filter((item) =>
    checkboxes.some(
      (checkbox) =>
        checkbox.checked && item.incomeSource.includes(checkbox.name)
    )
  );
};
```
Filters table data based on selected checkboxes.

**Features**
- **Sorting**: Click column headers to sort data.
- **Filtering**: Select multiple income sources via checkboxes.
- **Dropdown Selection** : Displays selected sources.
- **Data Formatting**: Dates and amounts are formatted for better readability.
---
#### 3.5.5 Source And Frequency

This Svelte component displays income and loan sources in a tabular format, allowing users to toggle between active and inactive income sources. It integrates data processing from a report API response.

**Props**

- `accountGuid`: Representing the unique identifier for the account.

**States**

- `activeTab`: Stores the currently selected tab (Income or Loan).
- `activeSourceOn`: Boolean state to toggle between active/inactive income sources.

**Derived**

- `processingResult`: Extracts ProcessingResult from the page state.
- `accountData`: Finds account details based on accountGuid.
- `loanData`: Extracts loan source details from account data.
- `incomeData`: Extracts income sources and filters active ones if activeSourceOn is enabled.

**Features**

- Displays income and loan sources based on accountGuid.
- Toggle to filter active income sources.
- Tabbed navigation for switching between Income and Loan views.
- Uses derived state ($derived) for data processing.
- Uses $state for UI state management.
- Fetches transaction range and displays frequency of income.

**Child Components**

---
**IncomeSourceTable**:

This Svelte component renders an income table categorized by frequency of income sources. It organizes the income data into three main categories: Recurring Income, Irregular Income, and One-Time Income. Each category is presented with a header explaining the type of income, and each entry is displayed in a row with relevant details, such as the income amount and frequency.

Additionally, the component includes features such as tooltips to display the date on hover, dynamic class assignment for table cells based on frequency, and scrollable content.

**States**

- `incomeData`: Array of income sources (IncomeSource[]), passed as a prop.
- `data`: State holding the modified income data, categorized and sorted.
- `indexOfLine`: State for the currently selected row index, used for tooltip visibility.
- `existMissingDay`: Flag to indicate if any missing days exist in the data.
- `tooltipVisible`: Flag to control the visibility of the tooltip.
- `tooltipX`: X position of the tooltip.
- `tooltipY`: Y position of the tooltip.
- `tooltipData`: The data to display in the tooltip (date).

**Helper Functions**

- **findShade**:

  This function determines the appropriate shading for a set of dates based on the frequency type of the income source.

  - **Parameters**:
  data: Array of date strings representing income deposits.
  frequency: The frequency of the income (e.g., "I" for irregular, "M" for monthly, etc.).
  - **Returns**:
    - A dictionary of day names as keys and the assigned shade colors as values.
- **initializeIncomeTableData**:
  
  This function initializes the income data by sorting and categorizing the income entries based on the frequency of deposits and adds the calculated shading for each entry.
  - **Flow**:
    - Sorts the income data by date.
    - Groups the data by month and assigns shading based on frequency.
    - Modifies the incomeData by appending shades and groupedDates.
- **categorizeData**:

  This function categorizes the data into different arrays based on the income frequency type (I for irregular, O for one-time, E for estimated monthly income).

  - **Parameters**:
    - `dataparam`: The data to categorize.
    - `category`: The category to filter by (I, O, E).
  - **Returns**:
    - Categorized income data based on frequency.
- **showHideTooltip**:

  This function is used to control the visibility of the tooltip when hovering over a table row.

  **Parameters**:
  - `index`: The index of the hovered row.
- **getClassName**:

  This function generates a class name for each table cell based on the date, frequency, and whether the date is missing from the expected schedule.

  - **Parameters**:
    - `data`: The date to check for class assignment.
    - `frequency`: The frequency of the income.
    - `shades`: The shading dictionary for the frequency.
    - `missingPayDay`: A list of missing paydays.
  - **Returns**:
  - A class name to apply to the table cell.
- **scrollable**

  This function makes the table horizontally scrollable using mouse drag or touch events. It adds event listeners for mousedown, mousemove, mouseup, touchstart, touchmove, and touchend to handle the scrolling behavior.

- **showTooltip**

  This function displays a tooltip when a user hovers over a date cell in the table.

  - **Parameters**:
    - `event`: The mouse event that triggered the tooltip.
    - `date`: The date to display in the tooltip.

---
**LoanTable**:

This component renders a table displaying loan-related data. It displays information such as monthly payments, lender name, observed amount, frequency of payments, and the latest transaction date for each loan entry.

**Props**

- `loanData`: An array of LoanSource objects that contains loan information to be displayed in the table. Each object in the array represents a loan entry.

**Functionality**:

- **Monthly Payment**: If available, the monthlyPayment value is converted to USD and displayed. If not available, "N/A" is displayed.
- **Lender Name**: If the lender name is provided, it is displayed; otherwise, "N/A" is shown.
- **Amount Observed**: If the amountObserved value is 0, "N/A" is displayed with the description "Not Identified". Otherwise, it shows the converted USD value of the observed amount, with a note indicating that the actual amount may vary.
- **Payment Frequency**: Based on the frequency field in the loan data, it shows one of the following values:
   - "Inconsistent"
   - "Weekly"
   - "Bi-Weekly"
   - "Monthly"
   - "Semi-Monthly"
- **Latest Transaction**: Displays the date of the latest transaction using the convertDateToDay utility. If not available, "N/A" is shown.
- If no loan data is provided or available, the table will display a row with the message: "No records found".

**Utilities**
- `convertToUSD`: Converts a numerical value to USD format.
- `convertDateToDay`: Converts a date string to a human-readable day format.
---
#### 3.5.6 All Transactions

This component displays a table of all transactions associated with an account, including detailed information such as transaction date, category, description, and amount. It provides filtering, sorting, and pagination capabilities.

**Props**

- `accountGuid`: The unique identifier of the account for which transactions are displayed.
- `incomeSources`: An array of income sources associated with the account.

**States**
- `allTransaction`: List of all transactions.
- `filteredData`: List of filtered transactions based on selected filters.
- `sortBy`: The current column being sorted.
- `sortDirection`: The current sort direction.
- `resetAllFilters`: Boolean to control filter reset state.
- `totalAmount`: The total sum of amounts from filtered transactions.

**Function**

- `toggleSort`: Toggles the sorting of the table based on the selected column.
- `resetFilters`: Resets all active filters.
- `updateDataOnFilter`: Updates the displayed transactions based on selected filters.
- `calculateTotal`: Calculates the total sum of the filtered transactions.

**Components**

---
**FilterSection**:

  This is a Svelte component that provides a set of filterable dropdowns for transactions. Each dropdown allows the user to filter transaction data based on various criteria such as transaction type, month, transaction day, category, and transaction source.

  1. **States**

     - **transactionType**: The type of transaction (e.g., credit, debit).
     - **month**: The month of the transaction.
     - **depositDay**: The day the transaction was deposited.
     - **depositType**: Type of deposit (e.g., manual, automated).
     - **incomeType**: Type of income associated with the transaction.
     - **incomeSource**: Source of the income (e.g., a specific account or business).

  2. **Dropdown Components**:

      Each filter is represented by a `TransactionFilterDropdown` component. The dropdowns are dynamically bound to the corresponding filter state and are controlled through various functions.

      **Dropdown Filters**:

      - **Transaction Type**: Filter based on the type of transaction (e.g., credit, debit).
      - **Month**: Filter transactions by the month.
      - **Transaction Day**: Filter by the day of the week on which transactions were made.
      - **Category**: Filter by income type or category.
      - **Transaction Source**: Filter by income source (e.g., source ID or name).
  
      **Key Features**:

      - **Dynamic Labeling**: The dropdown's label is passed as a prop and displayed above the button.
      - **Visibility Control**: A `visibility` prop is used to enable or disable interaction with the dropdown (e.g., disabling the dropdown when visibility is `false`).
      - **Selected Option**: The selected option is dynamically displayed in the dropdown button. If no option is selected, it defaults to `"Select"`.
      - **Checkboxes with Custom Handlers**: The checkboxes are managed through Svelte's two-way binding (`bind:checked`) and custom functions for handling checkbox changes (`handleCheckboxChange`) and single-selection mode (`checkOnlyOne`).
      - **Dropdown Toggle**: The dropdown visibility is toggled using the `isOpen` prop and managed with a button click event (`handleButtonClick`).
      - **Conditional Rendering**: Based on the `categoryName`, the dropdown can show different types of data (e.g., income source names or income type names).
      - **Accessibility**: The dropdown uses `aria` attributes to ensure it's accessible for screen readers.

      **Functionality**:

      - `handleButtonClick`: Handles the visibility toggle of the dropdown when the button is clicked.
      - `handleCheckboxChange`: Handles the changes made when checkboxes are checked or unchecked, updating the dropdown's state accordingly.
      - `checkOnlyOne`: Ensures that only one checkbox is selected at a time, providing a single-selection behavior.
      - `getSelectedCheckboxNames`: Updates the selected names when a checkbox is clicked.
      - `categoryName` and category: Allow the component to adapt to different types of data being filtered (e.g., incomeSourceName, incomeTypeName).
      - `DownArrowHead`: A custom icon component for the dropdown toggle button.

  1. **Checkbox Handling**:
    The `handleCheckboxChange` function manages the checkbox state when the user interacts with the dropdown. It ensures the following:

      - **"All" checkbox**: When selected, all items in the dropdown are either checked or unchecked.
      - **Single-selection mode**: Some dropdowns support selecting only one option at a time.

  2. **Dropdown Visibility**:

      The `showHideDropdowns` function controls the visibility of each dropdown. When a user clicks on a dropdown, it toggles its visibility. Only one dropdown can be open at a time, ensuring a clean and organized interface.

  3. **Selected Names**:
   
      The `getSelectedCheckboxNames` function updates the names of the selected items in the dropdowns. It ensures the names are correctly displayed as a comma-separated list or "All" if all options are selected.

  4. **Data Initialization** (`onMount`):

      When the component mounts, it populates the dropdowns with initial data from `allTransaction`. It adds available transaction types, income sources, deposit types, and months to the respective states.

**Features**
- **Transaction Table**: Displays transaction details such as date, day, category, description, and amount.
- **Filtering**: Allows filtering by transaction type, month, deposit day, deposit type, income type, and income source.
- **Sorting**: Sorts the table by various columns such as date, income type, and amount.
- **Total Calculation**: Displays the total of all filtered transactions at the bottom.
- **Reset Filter**: Resets all filters to their default state.


---
#### 3.5.6 Refresh Loading Screen
This Svelte component displays a file upload progress indicator. It uses a predefined set of progress values that update at fixed intervals, creating a simulated loading effect.

**Props**
- `goBack` (optional): A function that allows navigation back to the previous screen.

**State Variables**
- `fileProgress`: Represents the upload progress percentage.
- `progressInterval`: Stores the interval reference for progress updates.

**Lifecycle Methods**
- `onMount`: Initializes the progress update sequence upon component mount.
- `onDestroy`: Clears the interval to prevent memory leaks when the component is destroyed.

**Logic Flow**
1. The component mounts and initializes `fileProgress` with a predefined set of progress values.
2. It updates `fileProgress` every 800ms.
3. Upon reaching the last value, the progress resets.
4. The interval is cleared when the component is destroyed.

**UI Elements**
- **Loading Animation:** Two animated divs displaying a switching effect.
- **Progress Bar:** A visual representation of the upload progress.
- **Loading Text:** Displays "Loading" below the progress bar.
- **Go Back Button:** Hidden by default, it provides an option to navigate back.
## 4. API
### 4.1 API Endpoints
#### 4.1.1 /TransDetails/GetProcessingResults:

 Retrieves processing results for a specific account.
  - Method: POST
  - parameters:
    - rid: The unique request ID for specific account.
    - product: Default set to "Income"
  
  **Request**:
  ```typescript
  await fetch(
    `${SERVER_URL}/TransDetails/GetProcessingResults?rid=${id}&product=Incomes`,
    {
      method: "POST",
      headers: {
        authorization: `bearer ${locals.user.authToken}`,
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": API_KEY,
      },
  }
  ```
  
  **Response**:
  ```typescript
    IncomeAnalyzerDataRespnse = {
        requestId: string;
        availableProducts: string[];
        processingResult: ProcessingResult;
        historicalReports: HistoricalReport[];
        errors: string[];
        application?: ApplicationData;
        ibvStatusInfo: IBVStatusInfo;
    };
  ```
#### 4.1.1 /IBVService/RefreshConnect: 

Refreshes the request ID and generates latest request ID with reports.
  - Method: POST
  - parameters:
    - rid: The unique request ID for specific account.
    - forceRefresh: Default set to false
  
  **Extracting Request Data**:
  - The requestId and currentPageLocation are extracted from the incoming request.formData().
  - If currentPageLocation is not provided, it defaults to an empty string.
  - If requestId is missing, the function returns a 400 Bad Request error.
  ```typescript
  const data = await request.formData();
  const requestId = data.get("requestId") as string;
  let currentPageLocation = data.get("currentPageLocation") as string;
  if (!currentPageLocation) currentPageLocation = "";
  if (!requestId) return fail(400, { missingRequestId: true });
  ```
  **Request**:
  ```typescript
  await fetch(
        `${SERVER_URL}/IBVService/RefreshConnect?rid=${requestId}&forceRefresh=false`,
        {
          method: "POST",
          headers: {
            Authorization: `bearer ${locals.user.authToken}`,
            "Ocp-Apim-Subscription-Key": API_KEY,
          },
          credentials: "include",
        }
      );
  ```
  **Response**:
  
   The response is converted to JSON, and the action checks if the request succeeded.
  ```typescript
  const refreshConnectResponse = await refreshConnect.json();
  if (refreshConnectResponse.succeeded) {
    redirect(302, `/report/${refreshConnectResponse.requestId}`);
  }
  ```

  **Error Handling & Messages**: 
  
  If the request fails, an appropriate error message is assigned based on the response’s errorCode:
  - 0: Success (No further action needed)
  - 1: Account on Cool Down (User needs to wait)
  - 2: Account Disconnected (User must create a new request)
  - 3: Unable to Refresh (Temporary issue, retry later)
  - Default: Generic error message
  ```typescript
    let errorMessage: string = '';
    let errorTitle: string = '';
    switch (refreshConnectResponse?.errorCode) {
      case 0:
        errorTitle = "Success";
        errorMessage = "Your request has been successfully processed. Everything is working as expected.";
        return;
      case 1:
        errorTitle = "Account on Cool Down";
        errorMessage = "Your account is currently on cooldown. Please wait a moment before trying again.";
        break;
      case 2:
        errorTitle = "Account Disconnected";
        errorMessage = "The account has been disconnected. Please create new request.";
        break;
      case 3:
        errorTitle = "Unable to Refresh";
        errorMessage = "We're having trouble retrieving new data at the moment. Please try again later.";
        break;
      default:
        errorTitle = "Unable to Refresh";
        errorMessage = "We're having trouble retrieving new data at the moment. Please try again later.";
        break;
    }
  ```
  **Returning the Error Response**:
  
   If an error occurs, a 400 Bad Request response is returned with detailed error messages.
  ```typescript
  return fail(400, {
    errorCode: refreshConnectResponse.requestCode,
    errorUploading: true,
    errorMessage: errorMessage,
    errorTitle: errorTitle
  });
  ```
---
# Commom Components

# DoughnutChart 

## Purpose
The **DoughnutChart** component is a reusable charting component built using Chart.js. It renders a doughnut chart with customizable data and legend positioning, making it versatile for displaying circular statistical visualizations.

## Key Features
1. **Interactive Doughnut Chart:**
   - Displays data in a responsive and animated doughnut chart.
   - Configurable with different datasets, colors, and chart properties.

2. **Customizable Legend:**
   - Dynamically generated legend based on chart data.
   - Positionable legend (`right`, `left`, `top`, `bottom`) for flexible UI layout.

3. **Dynamic State Management:**
   - Updates legend items automatically when data changes.
   - Allows toggling of individual dataset visibility directly from the legend.

4. **Optimized Rendering:**
   - Utilizes Chart.js for animations, scalability, and responsive rendering.
   - Automatically destroys and cleans up the chart instance on unmount.

## Props
- **chartData**: (*required*)  
  A `ChartData` object containing labels and datasets for the doughnut chart.  
  Example structure:
  ```typescript
  {
    labels: ["Category 1", "Category 2"],
    datasets: [
      {
        data: [30, 70],
        backgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  }
- **legendPosition (optional)**:
  - Specifies the position of the legend relative to the chart.
  - Type: "right" | "left" | "top" | "bottom"
  - Default: "right"
- **Methods**:
  - `toggleDataset(index: number)`
    - Toggles the visibility of a dataset when clicking on a legend item.

  - `getLegendClasses(position: LegendPosition): string`
    - Returns appropriate CSS classes for positioning the legend based on the specified legendPosition.

## Component Lifecycle
  - **Initialization**: Registers required Chart.js plugins and initializes the chart using the provided chartData.


  - **Reactive Updates**:Updates the legend dynamically whenever chartData changes.


  - **Cleanup**: Destroys the chart instance when the component is unmounted to prevent memory leaks.

- **Layout**
  - **Chart Canvas**: Renders the doughnut chart inside a `<canvas>` element.
  - **Legend**: Displays dynamically generated legend items as buttons adjacent to the chart, styled and positioned based on legendPosition.

## Example Usage:
```typescript
  <script>
  import DoughnutChart from "./DoughnutChart.svelte";
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };
</script>
<DoughnutChart
  chartData={data}
  legendPosition="bottom"
/>
```
## Notes
- The chart has a default cutout size of 75%, giving it a distinctive doughnut appearance.
- The legend does not display by default using Chart.js settings but is manually implemented for better control and customization.

# DynamicLineChart Component

## Purpose
The **DynamicLineChart** component provides a reusable and responsive line chart powered by Chart.js. It is ideal for visualizing trends or progressions over time.

## Key Features
1. **Interactive Line Chart:**
   - Renders a dynamic line chart with smooth animations and responsive behavior.
   - Displays data points and lines to connect them for a clear visual representation of trends.

2. **Customizable Chart Data:**
   - Accepts datasets and labels as input to dynamically configure the chart.

3. **Minimalistic Design:**
   - Grid lines, ticks, and borders are hidden for a clean and distraction-free appearance.

4. **Optimized Rendering:**
   - The component initializes the chart on mount and ensures proper rendering.

## Props
- **chartData**: (*required*)  
  A `ChartData` object specifying the labels and datasets for the line chart.  
  Example structure:
  ```typescript
  {
    labels: ["January", "February", "March"],
    datasets: [
      {
        label: "Sales",
        data: [10, 20, 15],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        fill: true,
      },
    ],
  }
## Component Lifecycle
- **Initialization**: 
  - Registers necessary Chart.js plugins, such as `LineController`, `CategoryScale`, and `Filler`.
  - Configures chart options for a clean and responsive design.


- **Rendering**: Creates the chart instance within `<canvas>` element when the component mounts..


- **Customization**: 
  - Destroys the chart instance when the component is unmounted to prevent memory leaks.
  - Allows dynamic updates to the chartData.

## Layout
  - **Canvas Element** : The chart is rendered inside a `<canvas>` element styled to occupy the full height and width of the container.
  - Example usage:
    ```svelte
    <script>
      import DynamicLineChart from "./DynamicLineChart.svelte";
    
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            label: "Revenue",
            data: [2000, 2500, 3000, 4000],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            fill: true,
          },
        ],
      };
    </script>
    
    <DynamicLineChart chartData={data} />
    ```
## Notes
  - The chart hides grid lines and axes for a minimalist look.  
  - Modify the options in the code if you require additional features like grid lines or axis labels.
  - It does not display a legend by default to avoid clutter. You can enable it in the plugins.legend.display setting if required.

# AnimatedDot Component

## Purpose
The **AnimatedDot** component renders a small circular dot that can be optionally animated to indicate an event or status visually. It is a lightweight and reusable component for use in Report, status indicators, or notification systems.

---

## Key Features
1. **Dynamic Colors:**
   - Supports customizable colors through props.
   - Defaults to pre-defined colors based on `eventType`.

2. **Optional Animation:**
   - Includes a pulsing animation effect to draw attention to the dot.
   - The animation can be enabled or disabled via props.

3. **Lightweight Design:**
   - Minimal DOM structure with efficient rendering for performance.

---

## Props

- **color** (optional):  
  Specifies the dot's color in any valid CSS format (e.g., `#ff0000`, `rgb(255, 0, 0)`, or `hsl(0, 100%, 50%)`).  
  Defaults to a color derived from the `eventType` value if not provided.

- **eventType** (optional):  
  A string representing the type of event. It maps to pre-defined colors in the `Colors` constant.

- **showAnimation** (required):  
  A boolean that toggles the pulsing animation effect.  
  When `true`, the dot displays a wiggle animation with three overlaying animated layers.

---

## Component Layout
The dot is created using a `span` element styled as a circle (`h-2 w-2 rounded-md`). If `showAnimation` is enabled, three additional animated `span` elements are layered on top of the base dot for the visual effect.

---

## Example Usage

### Basic Example
```svelte
<script>
  import AnimatedDot from "./AnimatedDot.svelte";
</script>

<!-- Static Dot -->
<AnimatedDot color="#007BFF" showAnimation={false} />

<!-- Animated Dot using eventType -->
<AnimatedDot eventType="success" showAnimation={true} />
```

### Pre-defined Colors in `Colors` constant

```typescript
export const Colors: { [key: string]: string } = {
    "0": "#FF3B30",
    "1": "#007AFF",
    "2": "#87D0FD",
    "3": "#FFCC00",
    "4": "#FFCC00",
    "5": "#FF8400",
    "6": "#FF3B30",
}
```

# Button Component

## Purpose
The **Button** component is a versatile and reusable button element designed to handle various use cases across an application. It supports multiple visual variants, customization options, and states like disabled or outlined, making it adaptable to different design and interaction requirements.

---

## Key Features
1. **Customizable Variants:**
   - Provides six predefined styles: `default`, `primary`, `secondary`, `black`, `blue`, and `red`.
   - Supports both filled and outlined variants.

2. **Disabled State:**
   - Automatically adjusts styles and disables interactions when the `disabled` prop is set.

3. **Customizable Styling:**
   - Accepts additional CSS classes via the `class` prop for further customization.

4. **Event Handling:**
   - Allows custom event handling via the `onclick` prop.

---

## Props

### Required
- **children** (required):  
  The content or child elements to render inside the button (e.g., text, icons).

### Optional
- **onclick**:  
  A callback function triggered when the button is clicked.

- **type** (default: `"button"`):  
  Specifies the button type. Can be one of:
  - `"button"`
  - `"reset"`
  - `"submit"`

- **variant** (default: `"black"`):  
  Specifies the visual style of the button. Available options:
  - `"default"`: A neutral style for general use.
  - `"primary"`: A green button for primary actions.
  - `"secondary"`: A light green button for secondary actions.
  - `"black"`: A bold black button for emphasis.
  - `"blue"`: A blue button for informational actions.
  - `"red"`: A red button for destructive actions.

- **disabled** (default: `false`):  
  A boolean that disables the button and applies a "disabled" style.

- **outlined** (default: `false`):  
  A boolean that switches the button to an outlined style.

- **class** (default: `""`):  
  Additional custom CSS classes to apply to the button.

- **title** (default: `""`):  
  Tooltip text displayed when hovering over the button.

---

## Component Layout
The button is rendered as a `<button>` element with dynamic classes derived using the `clsx` utility. Classes are conditionally applied based on the `variant`, `disabled`, and `outlined` states, ensuring a consistent appearance for all configurations.

---

## Example Usage

### Basic Examples

```svelte
<script>
  import Button from "./Button.svelte";

  function handleClick() {
    alert("Button clicked!");
  }
</script>

<!-- Primary Button -->
<Button variant="primary" onclick={handleClick}>Submit</Button>

<!-- Outlined Secondary Button -->
<Button variant="secondary" outlined={true}>Cancel</Button>

<!-- Disabled Blue Button -->
<Button variant="blue" disabled={true}>Loading...</Button>
```
## Advanced Examples
- Custom Classes
  ```svelte
  <Button variant="red" class="uppercase  tracking-wider">Delete</Button>
  ```
- Dynamic Content
  ```svelte
  <Button variant="default" onclick={() => console.log("Clicked!")}>
    <span class="font-bold">🚀 Launch</span>
  </Button>
  ```

##  Styling Reference
### Predefined Variants
**Default (Neutral)**
- Filled: White background with gray text and border.
- Outlined: White background with a gray border.

**Primary (Green)**
- Filled: Green background with white text.
- Outlined: Transparent background with a green border.

**Secondary (Light Green)**
- Filled: Light green background with black text.
- Outlined: Transparent background with a light green border.

**Black**
- Filled: Black background with white text.
- Outlined: White background with a black border.

**Blue**
- Filled: Blue background with white text.
- Outlined: Transparent background with a blue border.

**Red**
- Filled: Red background with white text.
- Outlined: Transparent background with a red border.

## Notes
- **Styling Utility**: The component leverages the clsx utility for clean, conditional styling logic.

- **Responsive Design**: Styles use flexbox and padding to ensure consistency across various screen sizes.

- **Accessibility**: The title prop allows tooltips for additional context and accessibility.

- **Extensibility**: Custom classes passed through the class prop enable tailored designs without modifying the component.

# Checkbox Component

## Purpose
The **Checkbox** component is a customizable checkbox designed for flexibility, accessibility, and style consistency. It supports dynamic colors, an indeterminate state, and custom class handling, making it suitable for various UI needs.

---

## Key Features
1. **Customizable Appearance:**
   - Allows dynamic color selection for the checkbox border and checked state.
   - Supports custom classes for additional styling flexibility.

2. **Interactive Behavior:**
   - Emits changes through the `onCheckedChange` callback when the checkbox is toggled.

3. **Indeterminate State:**
   - Provides visual indication when a checkbox is in an "indeterminate" state.

4. **Disabled State:**
   - Prevents interaction and applies "disabled" styles when the `disabled` prop is set.

5. **Reactivity:**
   - Binds the `checked` state for dynamic value updates.

---

## Props

### Required
- **checked** (default: `false`):  
  A boolean value indicating whether the checkbox is checked. Supports two-way binding.

### Optional
- **color** (default: `"#000000"`):  
  Specifies the color theme for the checkbox. Available options:
  - `"#000000"` (Black)
  - `"#98c43d"` (Green)
  - `"#0A84FF"` (Blue)
  - Additional colors can be added with custom classes.

- **onCheckedChange**:  
  A callback function triggered whenever the checkbox state changes.

- **class** (default: `""`):  
  Additional CSS classes to extend or override the default styles.

- **disabled** (default: `false`):  
  A boolean indicating whether the checkbox is disabled.

- **id** (default: `undefined`):  
  A unique identifier for the checkbox element.

- **indeterminate** (default: `false`):  
  Sets the checkbox to an indeterminate visual state.

---

## Component Layout
The checkbox is rendered as an `<input>` element with the `checkbox` type. Dynamic classes are applied using the `clsx` utility to handle styles based on props like `checked`, `disabled`, and `color`.

---

## Example Usage

### Basic Examples
```svelte
<script>
  import Checkbox from "./Checkbox.svelte";

  let isChecked = false;

  function handleCheckboxChange(value) {
    console.log("Checkbox checked:", value);
  }
</script>

<!-- Default Checkbox -->
<Checkbox bind:checked={isChecked} onCheckedChange={handleCheckboxChange} />

<!-- Green Checkbox -->
<Checkbox color="#98c43d" bind:checked={isChecked} />

<!-- Disabled Checkbox -->
<Checkbox disabled={true} checked={true} />
```

## Advanced Examples
- Indeterminate State

  ```svelte
  <Checkbox indeterminate={true} checked={false} />
  ```
- Custom Classes
  ```svelte
  <Checkbox class="border-4 border-dashed" color="#0A84FF" />
  ```

# Checkbox Component

## Purpose
The **Checkbox** component is a customizable checkbox designed for flexibility, accessibility, and style consistency. It supports dynamic colors, an indeterminate state, and custom class handling, making it suitable for various UI needs.

---

## Key Features
1. **Customizable Appearance:**
   - Allows dynamic color selection for the checkbox border and checked state.
   - Supports custom classes for additional styling flexibility.

2. **Interactive Behavior:**
   - Emits changes through the `onCheckedChange` callback when the checkbox is toggled.

3. **Indeterminate State:**
   - Provides visual indication when a checkbox is in an "indeterminate" state.

4. **Disabled State:**
   - Prevents interaction and applies "disabled" styles when the `disabled` prop is set.

5. **Reactivity:**
   - Binds the `checked` state for dynamic value updates.

---

## Props

### Required
- **checked** (default: `false`):  
  A boolean value indicating whether the checkbox is checked. Supports two-way binding.

### Optional
- **color** (default: `"#000000"`):  
  Specifies the color theme for the checkbox. Available options:
  - `"#000000"` (Black)
  - `"#98c43d"` (Green)
  - `"#0A84FF"` (Blue)
  - Additional colors can be added with custom classes.

- **onCheckedChange**:  
  A callback function triggered whenever the checkbox state changes.

- **class** (default: `""`):  
  Additional CSS classes to extend or override the default styles.

- **disabled** (default: `false`):  
  A boolean indicating whether the checkbox is disabled.

- **id** (default: `undefined`):  
  A unique identifier for the checkbox element.

- **indeterminate** (default: `false`):  
  Sets the checkbox to an indeterminate visual state.

---

## Component Layout
The checkbox is rendered as an `<input>` element with the `checkbox` type. Dynamic classes are applied using the `clsx` utility to handle styles based on props like `checked`, `disabled`, and `color`.

---

## Example Usage

### Basic Examples
```svelte
<script>
  import Checkbox from "./Checkbox.svelte";

  let isChecked = false;

  function handleCheckboxChange(value) {
    console.log("Checkbox checked:", value);
  }
</script>

<!-- Default Checkbox -->
<Checkbox bind:checked={isChecked} onCheckedChange={handleCheckboxChange} />

<!-- Green Checkbox -->
<Checkbox color="#98c43d" bind:checked={isChecked} />

<!-- Disabled Checkbox -->
<Checkbox disabled={true} checked={true} />
```
## Styling Reference
### Predefined Colors
- **Black ("#000000")**
  - Border and hover color: Black
  - Checked background: Black checkmark
- **Green ("#98c43d")**
  - Border and hover color: Green
  - Checked background: Green checkmark
- **Blue ("#0A84FF")**
  - Border and hover color: Blue
  - Checked background: Blue checkmark
- **Disabled**
  - Border: Light gray
  - Checked background: Gray checkmark
  - Cursor: `not-allowed`

## Key Points
- **Indeterminate Support**: The indeterminate state is visual only and does not affect the checked value.

- **Styling Utility**:The component leverages clsx for dynamic class generation, enabling easy extension and conditional styles.

- **Custom Behavior**: Pass additional functionality via the onCheckedChange callback for integration with external logic.

- **Reactivity:** The bind:checked enables two-way binding, ensuring the parent component remains synced with the checkbox state.

# ColorRangePicker Component
## Purpose
The Color Range Picker is a custom Svelte component used for defining and visualizing range zones with draggable control points and tooltips for detailed information. This component is ideal for scenarios where precise control over a range of values is needed, such as assessments, data visualization, or interactive sliders.

## Features
- Define multiple zones, each with a unique color, position, and description.
- Dynamic rendering of segments and points based on input zones.
- Draggable points to adjust zone boundaries, with constrained movement to prevent overlap.
- Tooltip display on hover, showing details of the hovered segment.
- Supports both mouse and touch events for interaction.

## Props
| Props        | Type                     | Default | Description                                                                                                                                                    |
| ------------ | ------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `zones`      | `AssessmentZone[]`       | []      | An array of zone objects defining their position, color, name, and description.An array of zone objects defining their position, color, name, and description. |
| `claimValue` | `string`, (View or Edit) | ""      | Determines the current mode (e.g., "Edit"). Enables or disables interactions based on its value.                                                               |

## AssessmentZone Interface
Each zone should follow this interface:
```typescript
interface AssessmentZone {
  id: string;             // Unique identifier for the zone.
  position: number;       // Position of the zone (range: 0-1000).
  color: string;          // Color of the zone.
  name: string;           // Name of the zone.
  description: string;    // Description of the zone.
}
```

| Event            | Description                                                   |
| ---------------- | ------------------------------------------------------------- |
| `onMouseDown`    | Fired when the user clicks and drags a draggable point.       |
| `onMouseMove`    | Updates the position of the active point during drag.         |
| `onMouseUp`      | Ends the drag operation.                                      |
| `onTouchStart`   | Fired when a draggable point is touched on mobile devices.    |
| `onTouchMove`    | Updates the position of the active point during a touch drag. |
| `onTouchEnd`     | Ends the touch drag operation.                                |
| `onSegmentHover` | Triggers when hovering over a segment, showing the tooltip.   |

## Slots
This component does not use slots, but includes key child components like:

- PopOver: Displays tooltip information when a segment is hovered.
- AnimatedDot: Provides a visual animation effect for the active segment.

## Customizable Styles

The component includes styles for:

- **Segments**:
  - Background color and width determined by the input zones.
Renders dynamically with rounded edges for the first and last segments.
- **Points**:
  - Draggable points are styled with tooltip and position indicators.

## Behavior and Logic
- **Zones and Segments**:
  - Segments are dynamically calculated from the zones array.
  - Each segment represents the space between two consecutive zones.
- **Draggable Points**:
  - Points can be dragged horizontally to adjust the position of zones.
  - Movement is constrained within adjacent zones to prevent overlap.
- **Tooltip**:
  - Displays detailed information about the hovered segment, including its name, range, and description.
- **Dynamic Resizing**:
  - Zones can be recalculated when the range (e.g., start and end values) changes.

## Dependencies
The component relies on the following child components:

- `PopOver`: For displaying tooltips.
- `AnimatedDot`: For showing animation effects.
- `InputField`: For input fields for start and end values.
- `TooltipIcon`: For rendering the point indicators.

## Notes
- Ensure the zones array is properly sorted by position for accurate segment calculation.
- Adjust start and end values as required for custom ranges.
- Tooltip positioning relies on mouse/touch events for accurate placement.

# ConfirmationPopup Component
## Purpose
The ConfirmationPopup component provides a reusable, customizable confirmation dialog. It is used to confirm critical user actions, such as deletions, updates, or any operation requiring explicit acknowledgment. The component is modal and provides customizable messages, titles, and actions for confirmation and closure.

## Features
- Modal popup with customizable content.
- Configurable confirmation message.
- Callback handlers for confirmation and closure.
- Optional slot for custom child content.
- Predefined Confirm and Close buttons with actions.

## Props
| Prop Name             | Type         | Default                                         | Description                                                                    |
| --------------------- | ------------ | ----------------------------------------------- | ------------------------------------------------------------------------------ |
| `isOpen`              | `boolean`    | `false`                                         | Controls the visibility of the popup.                                          |
| `children`            | `any`        | `undefined`                                     | Slot to render custom content in the popup.                                    |
| `confirmationMessage` | `string`     | "Are you sure you want to perform this action?" | The message displayed in the popup body.                                       |
| `onConfirm`           | `() => void` | `undefined`                                     | Callback triggered when the Confirm button is clicked.                         |
| `onClose`             | `() => void` | `undefined`                                     | Callback triggered when the Close button is clicked or the popup is dismissed. |

## Slots

| Slot Name | Description                                                                  |
| --------- | ---------------------------------------------------------------------------- |
| `default` | Custom content rendered inside the popup. Replaces the default body content. |

## Events

| Event Name  | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `onConfirm` | Emitted when the Confirm button is clicked.                  |
| `onClose`   | Emitted when the Close button is clicked or popup is closed. |

## Usage

### Basic Example

A basic confirmation dialog with default message and actions.

```svelte
<script>
  import ConfirmationPopup from "$lib/components/ConfirmationPopup.svelte";

  let isPopupOpen = false;

  function handleConfirm() {
    console.log("Action confirmed!");
  }

  function handleClose() {
    console.log("Popup closed!");
  }
</script>

<button on:click={() => (isPopupOpen = true)}>Open Popup</button>

<ConfirmationPopup
  bind:isOpen={isPopupOpen}
  onConfirm={handleConfirm}
  onClose={handleClose}
/>
```
### Custom Content Example
Providing a custom confirmation message using the children slot.

```svelte
<ConfirmationPopup
  bind:isOpen={isPopupOpen}
  onConfirm={handleConfirm}
  onClose={handleClose}
>
  <div>
    <h2 class="text-lg font-bold">Delete Item</h2>
    <p class="text-sm text-gray-600">
      Are you sure you want to delete this item? This action cannot be undone.
    </p>
  </div>
</ConfirmationPopup>
```
## Key Points
- **Modal Wrapper**: The popup uses PopupWrapper for accessibility and layering.
- **Default Buttons**: Predefined buttons for confirmation and closure ensure consistency in behavior.
- **Extensible**: Custom content can be added using the children slot.
- **Controlled Visibility**: The isOpen prop binds to parent components for dynamic visibility control.

# CustomSearchBar

## Purpose
The **CustomSearchBar** component is a reusable and customizable search input field with a built-in debounce mechanism to optimize search functionality. It features a search icon, dynamic placeholders, and options for styling customization. Ideal for applications requiring search inputs with live feedback or asynchronous querying.

## Features
- **Debounce Mechanism**: Prevents frequent calls to the onSearch function by delaying execution after user input stops.
- **Search Icon**: Includes a left-aligned search icon for a polished UI.
- **Customizable Styles**: Offers flexibility to adjust the appearance of the input field and icon through class props.
- **Binding Support**: Two-way binding for the value prop to sync with parent components.
- **Placeholder Text**: Customizable placeholder for guidance on input content.

## Props
| Prop Name        | Type                           | Default    | Description                                                                                  |
| ---------------- | ------------------------------ | ---------- | -------------------------------------------------------------------------------------------- |
| `value`          | `string`                       | `""`       | The search input value. Supports two-way binding.                                            |
| `placeholder`    | `string`                       | `"Search"` | Placeholder text displayed in the input field.                                               |
| `debounceTime`   | `number`                       | `350`      | Time (in milliseconds) to wait after the user stops typing before calling `onSearch`.        |
| `onSearch`       | `(searchTerm: string) => void` | `() => {}` | Callback function triggered when the debounce period ends. Receives the current input value. |
| `className`      | `string`                       | `""`       | Additional classes for the container wrapping the input and icon.                            |
| `inputClassName` | `string`                       | `""`       | Additional classes for styling the input field.                                              |
| `iconClassName`  | `string`                       | `""`       | Additional classes for styling the search icon.                                              |

## Slots
This component does not support slots.

## Events
| Event Name | Description                                                              |
| ---------- | ------------------------------------------------------------------------ |
| `onSearch` | Emitted after the debounce period ends. Returns the current input value. |

## Usage
### Basic Example
A simple search bar with a default configuration.

```svelte
<script>
  import CustomSearchBar from "$lib/components/CustomSearchBar.svelte";

  let searchValue = "";

  function handleSearch(searchTerm) {
    console.log("Search term:", searchTerm);
  }
</script>

<CustomSearchBar
  bind:value={searchValue}
  onSearch={handleSearch}
/>
```
### Customized Styling
Adding custom styles to the search bar and icon.
```svelte
<CustomSearchBar
  placeholder="Type to search..."
  className="bg-gray-50 rounded-md"
  inputClassName="text-gray-700"
  iconClassName="text-gray-400"
  debounceTime={500}
  onSearch={handleSearch}
/>
```

## Notes

- **Debounce Logic**: Prevents excessive calls to the onSearch function, optimizing performance.
- **Customizable Design**: Flexible styling through class props for container, input, and icon elements.
- **Easy Integration**: Works seamlessly with data-binding and event handling in parent components.
- **Accessible**: Includes appropriate attributes such as placeholder and autocomplete for usability.

# CustomSwitch Component
## Purpose
The CustomSwitch component is a customizable toggle switch that allows for a binary state (on/off). It can be used to represent options or settings where the user needs to select between two choices. The switch includes customizable colors, optional text for each state, and can be disabled when necessary.

## Features
- **Toggle Switch**: Allows switching between two states with smooth animation.
- **Customizable Colors**: Supports a customizable color for the active state of the switch.
- **Text Visibility**: Optionally displays text ("On" and "Off") when the switch is toggled.
- **Disabled State**: The switch can be disabled, preventing user interaction.
- **Event Handling**: Allows handling the toggle state change with a callback function.

## Props
| Prop Name       | Type                                       | Default Value | Description                                                                                                      |
| --------------- | ------------------------------------------ | ------------- | ---------------------------------------------------------------------------------------------------------------- |
| `title`         | `string`                                   |               | The title or label for the switch.                                                                               |
| `toggle`        | `boolean`                                  | `false`       | The current state of the switch (on/off).                                                                        |
| `isTextVisible` | `boolean`                                  | `false`       | Determines whether "On" and "Off" labels are shown on the switch.                                                |
| `handleSwitch`  | `(toggle: boolean, title: string) => void` | `() => {}`    | Callback function triggered when the switch state changes. Passes the current state (toggle) and the title prop. |
| `color`         | `string`                                   | `"#09814A "`  | Custom color for the active state of the switch (when toggle is true).                                           |
| `disabled`      | `boolean`                                  | `false`       | Whether the switch is disabled, preventing interaction.                                                          |

## Slots
This component does not support slots.

## Events
| Event Name     | Description                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------- |
| `handleSwitch` | Triggered when the state of the switch changes. Passes the new `toggle` value and the `title`. |

## Usage
### Basic Example
A simple toggle switch with the default configuration.

```svelte
<script>
  import CustomSwitch from "$lib/components/CustomSwitch.svelte";

  let switchState = false;

  function handleSwitch(newState, title) {
    console.log(`${title} switched to ${newState ? "On" : "Off"}`);
    switchState = newState;
  }
</script>

<CustomSwitch
  title="Switch"
  bind:toggle={switchState}
  isTextVisible={true}
  handleSwitch={handleSwitch}
/>
```
### Customized Colors
Changing the color of the active state of the switch.
```svelte
<CustomSwitch
  title="Custom Switch"
  bind:toggle={switchState}
  color="#FF5733"
  isTextVisible={true}
  handleSwitch={handleSwitch}
/>

```
### Conditional Text Visibility
```svelte
<CustomSwitch
  title="Switch with Text"
  bind:toggle={switchState}
  isTextVisible={true}
  handleSwitch={handleSwitch}
/>
```

## Key Points

- **Smooth Animation**: The switch includes a smooth transition when toggling between "On" and "Off" states.
- **Customizable Design**: Easily customize the active color and visibility of the text labels to fit your design.
- **Disabled State**: You can disable the switch, preventing the user from interacting with it.
- **Event Handling**: The handleSwitch function allows you to respond to toggle state changes, making this component easy to integrate with other logic in your application.

# DynamicFieldSearch
## Purpose
The `CustomSearchSelector` component is a combined dropdown and input field, designed to allow users to select a search field from a list of options and input a search query. The selected search field and search value are bound to the component, enabling flexible search functionality. The dropdown is toggleable, allowing users to select the search field dynamically.

## Features
- **Dropdown Selector**: Allows the user to choose from a list of search fields.
- **Search Input**: A text input field bound to the search query, dynamically changing based on the selected search field.
- **Customizable Search Fields**: The list of available search fields can be passed as options.
- **Toggleable Dropdown**: The dropdown visibility can be toggled by clicking the button.
- **Dynamic Placeholder**: The input field's placeholder updates based on the selected search field.

## Props

| Prop Name             | Type                   | Default Value | Description                                                                                                            |
| --------------------- | ---------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `searchValue`         | `string`               | `""`          | The current value of the search query input field.                                                                     |
| `selectedSearchField` | `DynamicSearchField`   | `undefined`   | The currently selected search field from the list of available options.                                                |
| `options`             | `DynamicSearchField[]` | `[]`          | An array of available search fields to choose from in the dropdown. Each field is expected to have a `label` property. |

## Slots
This component does not support slots.

## Events
This component does not directly emit events, but the searchValue and selectedSearchField are bound to the component, and any change in these will be reflected in the parent component.

## Usage
### Basic Example
```svelte
<script>
  import CustomSearchSelector from "$lib/components/CustomSearchSelector.svelte";
  
  let searchValue = "";
  let selectedSearchField = { label: "Name", value: "name" };
  const options = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" }
  ];
</script>

<CustomSearchSelector
  bind:searchValue={searchValue}
  bind:selectedSearchField={selectedSearchField}
  {options}
/>
```
### Dynamic Search Fields
If you want to allow dynamic search fields, you can update the options array accordingly, and the component will handle the display of the dropdown and input behavior.
```svelte
<script>
  import CustomSearchSelector from "$lib/components/CustomSearchSelector.svelte";
  
  let searchValue = "";
  let selectedSearchField = { label: "Name", value: "name" };
  const options = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Phone", value: "phone" }
  ];
</script>

<CustomSearchSelector
  bind:searchValue={searchValue}
  bind:selectedSearchField={selectedSearchField}
  {options}
/>
```
## Key Points

- **Dropdown and Input Combination:** The CustomSearchSelector combines a dropdown and an input field, offering a dynamic search experience where the user can select a search field and enter a query.
- **Customizable Options:** The search fields (`options`) can be passed as an array, allowing you to control the available search criteria.
- **Dynamic Placeholder:** The input's placeholder text dynamically updates based on the selected search field, guiding the user to input the correct type of information.
- **Toggleable Dropdown:** The dropdown visibility can be toggled with a button click, offering a compact and interactive UI element for selecting search criteria.

# DynamicSelect Component

## Purpose
The `DynamicSelect` component is a customizable select/dropdown input that supports both single and multi-selection modes. It features a dynamic search functionality, allowing users to filter options as they type. Additionally, the component offers visual enhancements such as icon support, removal of selected options, and automatic dropdown positioning based on the available space. This component can be used for forms or anywhere a dynamic, searchable, multi-option selection is required.

## Features

- **Single and Multi Selection Modes:** Supports both single and multi-selection, providing flexibility depending on use cases.
- **Searchable Dropdown:** Filters the list of options dynamically as the user types, making it easier to find and select options.
- **Customizable Option Rendering:** The options can include labels and icons, and can be styled as needed.
- **Removal of Selected Options:** In multi-selection mode, users can easily remove options from their selection.
- **Dropdown Positioning:** The dropdown automatically adjusts its position (top or bottom) based on available space near the dropdown button.
- **Customizable Appearance:** The component supports custom CSS classes, placeholders, and error messages.

## Props
| Prop Name            | Type                                       | Default Value            | Description                                                                                             |
| -------------------- | ------------------------------------------ | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `id`                 | `string`                                   | ...                      | The unique identifier for the select component.                                                         |
| `name`               | `string`                                   | `undefined`              | The name of the select component. Used for form submissions.                                            |
| `options`            | `Option[]`                                 | `[]`                     | The list of options to display in the dropdown. Each option should have `value` and `label` properties. |
| `placeholder`        | `string`                                   | ...                      | The placeholder text for the input field when no options are selected.                                  |
| `selectedValues`     | `Option[]`                                 | `[]`                     | The currently selected values in the select component.                                                  |
| `disabled`           | `boolean`                                  | `false`                  | Whether the select component is disabled.                                                               |
| `required`           | `boolean`                                  | `false`                  | Whether the select component is required.                                                               |
| `maxHeight`          | `string`                                   | `"200px"`                | The maximum height of the dropdown, after which scrolling is enabled.                                   |
| `noOptionsMessage`   | `string`                                   | `"No options available"` | The message displayed when there are no available options.                                              |
| `customClass`        | `string`                                   | ...                      | Custom CSS classes to style the select component.                                                       |
| `mode`               | `string` ("single" or "multi" or "multi" ) | ...                      |
| `onChange`           | `(selected: Option[]) => void `            | `undefined`              | Callback function that is triggered when the selected values change.                                    |
| `enableSearch`       | `boolean`                                  | `true`                   | Whether to enable search functionality in the dropdown.                                                 |
| `errorMessage`       | `string`                                   | `undefined`              | Error message to display if validation fails.                                                           |
| `enableRemoveOption` | `boolean`                                  | `false`                  | If true, users can remove selected options in "single" selection mode.                                  |
## Option Structure
Each option in the options array should have the following properties:

| Property Name | Type      | Description                                                      |
| ------------- | --------- | ---------------------------------------------------------------- |
| `value`       | `string`  | The unique identifier for the option.                            |
| `label`       | `string`  | The label that will be displayed for the option.                 |
| `icon`        | `string?` | Optional property to display an icon next to the option's label. |

## Events
The component emits the `onChange` event whenever the selection changes. This event passes the updated array of selected values to the parent component.

## Usage
### Basic Usage
```svelte
<script>
  import DynamicSelect from "$lib/components/DynamicSelect.svelte";
  
  let selectedValues = $state([]);
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" }
  ];

  const handleChange = (selected) => {
    selectedValues = selected;
    console.log("Selected Values: ", selectedValues);
  };
</script>

<DynamicSelect
  id="my-select"
  name="my-select"
  options={options}
  bind:selectedValues
  placeholder="Select an option"
  onChange={handleChange}
/>
```
### Single-Select Mode
```svelte 
<script>
  import DynamicSelect from "$lib/components/DynamicSelect.svelte";
  
  let selectedValue = $state([]);
  const options = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" }
  ];

  const handleChange = (selected) => {
    selectedValue = selected;
    console.log("Selected Value: ", selectedValue);
  };
</script>

<DynamicSelect
  id="my-single-select"
  name="single-select"
  options={options}
  bind:selectedValues={selectedValue}
  mode="single"
  placeholder="Select a single option"
  onChange={handleChange}
/>
```
## Features and UI Details

- **Search Functionality:** When enabled, users can type in the input field to filter the options list. The dropdown will automatically display only matching options.
- **Multi-Select Mode:** When in multi-select mode, users can select multiple options, and each selected option is displayed in a horizontal list above the input. Users can remove selected options by clicking the close icon next to each option.
- **Single-Select Mode:** In single-select mode, only one option can be selected, and it is displayed inside the input field. The option can be deselected by clicking the close icon.
- **Dynamic Icons:** If options include icons, they are displayed next to the labels, providing an enhanced visual experience.
- **Error Message:** If an error occurs (e.g., validation fails), the component will display the error message below the input field.

# FormMessage Component
The `FormMessage` component is a simple utility component designed to display form validation messages or feedback to users. It allows for dynamic message display with customizable styling based on the message type (Success or Error). This component is useful for showing messages beneath form controls, such as indicating whether a field is valid or showing an error.

## Features

- **Message Display**: Displays a message below a form field.
- **Customizable Message Type**: Supports two types of messages: "Success" and "Error", with different text colors.
- **Custom Styling**: Allows for additional styling via the `errorClass` prop to further customize the appearance of the message.
- **Conditional Rendering**: The message is only shown when the `message` prop has content, making it dynamic and efficient.

## Props
| Prop Name    | Type                            | Default Value | Description                                                                               |
| ------------ | ------------------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `message`    | `string`                        | `""`          | The message text to be displayed. This can be a success or error message based on `type`. |
| `type`       | `string` ("Success" or "Error") | "Error"       |
| `errorClass` | `string`?                       | `undefined`   | Optional additional CSS classes to customize the message's styling.                       |

## Usage

### Basic Usage
```svelte
<script>
  import FormMessage from "$lib/components/FormMessage.svelte";

  let errorMessage = "This field is required!";
</script>

<FormMessage message={errorMessage} type="Error" />
```
This example will display an error message with red text.

### Custom Styling
```svelte
<script>
  import FormMessage from "$lib/components/FormMessage.svelte";

  let errorMessage = "There was an error processing your request!";
</script>

<FormMessage message={errorMessage} type="Error" errorClass="font-bold" />
```

## Conditional Rendering
- The component only renders the message if the `message` prop contains text. If the `message` is empty, no message is shown.
- The `type` prop defaults to "Error" if not specified, but can be changed to "Success" for a different visual feedback style.


# InformationTooltip Component
## Purpose 
The `InformationTooltip` component is a small, reusable UI element used to display informational tooltips. It allows for showing additional context or details when a user hovers over an icon or other element. This component is typically used for showing help or additional information in the form of brief text explanations, such as tips, instructions, or descriptions.

## Features

- **Content Display**: Displays either predefined content or dynamically rendered children inside the tooltip.
- **Customizable Appearance**: Supports custom styling via the `class` prop, enabling you to tailor the tooltip's appearance to your needs.
- **Help Icon**: Displays a help icon (typically a question mark or similar symbol) that users can hover over to view the tooltip.
- **Tooltip Positioning**: The tooltip content is shown in a light theme with customizable positioning (top, bottom, etc.) and display styling.

## Props

| Prop Name  | Type      | Default Value | Description                                                                                          |
| ---------- | --------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| `content`  | `string?` | `undefined`   | The main content of the tooltip. If provided, it will display the text content.                      |
| `children` | `any?`    | `undefined`   | Alternative to `content`, allowing you to pass any custom content to be rendered inside the tooltip. |
| `class`    | `string?` | `undefined`   | Optional custom CSS class to further customize the tooltip's appearance.                             |

## Usage
### Basic Usage
```svelte
<script>
  import InformationTooltip from "$lib/components/InformationTooltip.svelte";
</script>

<InformationTooltip content="This is some helpful information" />
```
This example will render the tooltip with the text "This is some helpful information", which will be displayed when hovering over the icon.

Using Children for Custom Content
```svelte
<script>
  import InformationTooltip from "$lib/components/InformationTooltip.svelte";
</script>

<InformationTooltip>
  <span>Custom tooltip content with more details can go here.</span>
</InformationTooltip>
```
Here, instead of using the content prop, the tooltip will display custom HTML or components passed as children.

### Custom Styling
```svelte
<script>
  import InformationTooltip from "$lib/components/InformationTooltip.svelte";
</script>

<InformationTooltip content="Information" class="text-blue-500" />
```
In this example, the tooltip will use custom styling (text-blue-500), which could be defined using a utility-first CSS framework like Tailwind.

## Tooltip Content Structure
If the content prop is provided, it will be split into two parts using the colon (:) character. The text before the colon is treated as a label (bold), and the text after it is treated as the actual content (italic).

For example:

**Content**: "Title: Information"

**Result**:
  - The title (`Title:`) will be bold.
  - The information (`Information`) will be italicized.
If no colon is present in the content, the entire message will be displayed as regular italic text.

## Customization
- **Tooltip Position**: The tooltip by default is positioned at the top, but you can customize this by modifying the position prop in the Tooltip component.
- **Icon**: The tooltip uses a HelpIcon (a question mark) to indicate additional information, and it is part of the component's default behavior.
- **Class Prop**: Allows you to apply additional classes to the tooltip container for further customization, like setting colors, borders, shadows, etc.

# InputField Component

## Purpose
The InputField component is a versatile and customizable input field used to gather user input in forms. It includes features like validation, error handling, and specific input formatting (e.g., number-only, alpha-only, phone number formatting). This component supports a variety of input types, including text, password, email, and more. It also provides visual feedback with error messages, ensuring a seamless and user-friendly experience.


## Features

- **Customizable Input Types:** Supports multiple input types like `text`, `password`, `email`, and others.
- **Validation Handling:** Provides built-in validation logic for common input fields (e.g., phone number, required fields, minimum/maximum length).
- **Formatted Input:** Automatically formats certain input fields, such as phone numbers, and enforces restrictions like number-only or alpha-only input.
- **Error Handling:** Displays error messages related to invalid inputs or missing values.
- **Flexible Styling:** Easily customizable styling through the `class` and `errorClass` props.
- **Accessibility:** Ensures that the input field and validation messages are accessible for all users.

## Props
| Prop Name        | Type                  | Default Value | Description                                                                                        |
| ---------------- | --------------------- | ------------- | -------------------------------------------------------------------------------------------------- |
| `error`          | `string?`             | `undefined`   | Optional error message to display if validation fails.                                             |
| `name`           | `string?`             | `undefined`   | The name of the input field, used for form submissions and validation.                             |
| `placeholder`    | `string?`             | `"Text"`      | Placeholder text displayed inside the input field when it is empty.                                |
| `type`           | `string?`             | `"text"`      | The type of input field (e.g., `text`, `password`, `email`, `number`, etc.).                       |
| `id`             | `string?`             | `undefined`   | The `id` attribute for the input field, useful for associating the input with labels.              |
| `value`          | `string`              | `number`      | null                                                                                               |
| `minlength`      | `number?`             | `undefined`   | The minimum number of characters allowed for the input field.                                      |
| `maxlength`      | `number?`             | `undefined`   | The maximum number of characters allowed for the input field.                                      |
| `required`       | `boolean?`            | `undefined`   | Whether the input field is required or not.                                                        |
| `readonly`       | `boolean?`            | `undefined`   | Whether the input field is read-only or not.                                                       |
| `autocomplete`   | FullAutoFill?         | `undefined`   | Specifies whether to enable autocomplete for the input field (e.g., for forms like name or email). |
| `validationName` | `string?`             | `undefined`   | The type of validation to apply (e.g., `phone`, `email`, etc.).                                    |
| `numberOnly`     | `boolean?`            | `undefined`   | Enforces a restriction that only numeric input is allowed.                                         |
| `alphaOnly`      | `boolean?`            | `undefined`   | Restricts input to alphabetic characters only.                                                     |
| `isFloat`        | `boolean?`            | `undefined`   | Allows decimal numbers to be entered, enforcing only one decimal point.                            |
| `oninput`        | `(e: Event) => void?` | `undefined`   | Event handler function that fires on input changes.                                                |
| `disabled`       | `boolean?`            | `false`       | Whether the input field is disabled or not.                                                        |
| `onblur`         | `(e: Event) => void?` | `undefined`   | Event handler function that fires when the input field loses focus.                                |
| `class`          | `(e: Event) => void?` | `undefined`   | Event handler function that fires when the input field loses focus.                                |
| `errorClass`     | `(e: Event) => void?` | `undefined`   | Event handler function that fires when the input field loses focus.                                |


## Usage
### Basic Usage

```svelte
<script>
  import InputField from "$lib/components/InputField.svelte";
</script>

<InputField
  name="email"
  type="email"
  placeholder="Enter your email"
  required={true}
/>
```
This will create a basic email input field with validation for required values.

### Input with Validation and Error Handling
```svelte 
<script>
  import InputField from "$lib/components/InputField.svelte";
</script>

<InputField
  name="phone"
  type="text"
  validationName="phone"
  placeholder="Enter your phone number"
  error="Invalid phone number"
/>

```
This example shows an input field for a phone number with validation. If the user enters an invalid phone number, an error message is displayed.

### Formatting Phone Number Input
```svelte
<script>
  import InputField from "$lib/components/InputField.svelte";
</script>

<InputField
  name="phone"
  validationName="phone2"
  placeholder="Enter phone number"
  required
/>
```

This will automatically format the phone number as the user types, following the pattern "000-000-0000"

## Input Field Behavior
- **Input Type**: The field automatically handles different input types (e.g., text, email, password) to support various use cases.
- **Validation**: The component validates inputs based on rules defined in the validationName prop. Validation checks include required fields, phone number format, and custom patterns (via regex).
- **Formatting**: Specific inputs, like phone numbers, are automatically formatted as users type to ensure proper formatting.
- **Number-only / Alpha-only Input**: You can restrict input to numbers only or alphabets by setting the numberOnly or aplphaOnly props.
- **Error Message Display**: If the input is invalid, the component will show an error message below the input field using the FormMessage component.

# Loader Component

## Purpose
The Loader component is a visual loading indicator designed to be used when content is being fetched or processed. It overlays the screen with a spinner and an optional message, providing feedback to the user that the system is working and preventing interactions until the loading process is complete. The spinner animation is created using CSS, and the component is fully customizable to fit different use cases.

**Features**

- **Spinner Animation:** Displays a rotating spinner composed of two color-coded circles to give users a visual cue that something is loading.
- **Customizable Message:** Optionally display a message (e.g., "Loading...") under the spinner, providing additional context to the user.
- **Overlay Screen:** Covers the entire screen with a semi-transparent background, preventing interaction with the page while the loader is visible.
- **Preventing Clicks:** The loader intercepts clicks to prevent any unintended actions while the page is loading.
- **Backdrop Blur:** The background of the page is blurred to help focus user attention on the loader.
- **CSS Animations:** Uses CSS for smooth spinner animations, making the loader feel dynamic and responsive.

## Props
| Prop Name | Type      | Default Value | Description                                                                             |
| --------- | --------- | ------------- | --------------------------------------------------------------------------------------- |
| `message` | `string?` | `undefined`   | Optional message to be displayed below the spinner, providing more context to the user. |

## Usage

### Basic Example
```svelte
<script>
  import Loader from "$lib/components/Loader.svelte";
</script>

<Loader message="Loading your content..." />
```
This will show the default loader spinner with the message "Loading your content..." beneath it.

### Loader without message

```svelte
<script>
  import Loader from "$lib/components/Loader.svelte";
</script>

<Loader />
```
This will show the loader spinner without any message.

## Component Behavior

- **Overlay:** When activated, the loader will take up the entire screen (`position: fixed`), and prevent interactions with any other page elements beneath it.
- **Message:** If a message is provided via the `message` prop, it will be displayed below the spinner. This could be a generic message like "Loading..." or something more specific depending on your needs.
- **Preventing Clicks:** Any clicks on the loader overlay will be prevented, ensuring the user cannot interact with the page while the content is loading.
- **Backdrop Blur:** The backdrop behind the loader has a blurred effect (`backdrop-blur-sm`), visually isolating the loading process from the rest of the content.

## Accessibility
- **Screen Reader**: The loader overlay is visually hidden but can be announced to screen readers by providing a meaningful message through the message prop.
- **Click Prevention**: By intercepting click events, the component ensures that users cannot accidentally trigger interactions while waiting for content to load, making the interface more predictable.

# LottiePlayer Component

## Purpose
The LottiePlayer component is used to render and control Lottie animations in a Svelte application. Lottie animations are vector-based animations that can be easily scaled and controlled for high-performance animation rendering. This component integrates the `@lottiefiles/svelte-lottie-player` library, which enables seamless playback of Lottie animations using the Svelte framework.

This component provides flexibility for developers to embed interactive and high-quality animations, making it perfect for loading screens, interactive animations, or any other part of your app that could benefit from dynamic vector-based motion.

## Features

- **Autoplay**: Automatically starts playing the animation when the component is loaded.
- **Looping**: Controls whether the animation loops indefinitely or plays only once.
- **Customizable Renderer**: Choose between different rendering formats (e.g., SVG, Canvas, or HTML).
- **Background Control**: Set the background color or transparency of the animation container.
- **Dimensions**: Adjust the width and height of the animation for responsiveness or fixed sizes.
- **Control Panel**: Optionally, add playback controls (e.g., play, pause, restart).
- **Flexible Layout**: Customize the controls layout for better user experience.
## Props
| Prop Name        | Type      | Default Value | Description                                                           |
| ---------------- | --------- | ------------- | --------------------------------------------------------------------- |
| `src`            | `string`  | -             | The URL or path to the Lottie JSON animation file.                    |
| `autoplay`       | `boolean` | `true`        | If set to `true`, the animation will start playing automatically.     |
| `loop`           | `boolean` | `true`        | If set to `true`, the animation will loop indefinitely.               |
| `controls`       | `boolean` | `false`       | If set to `true`, enables playback controls (play, pause, etc.).      |
| `renderer`       | `string`  | `svg`         | Defines the rendering method. Can be `svg`, `canvas`, or `html`.      |
| `background`     | `string`  | transparent   | Sets the background color or transparency of the animation container. |
| `height`         | `number`  | -             | Sets the height of the animation container.                           |
| `width`          | `number`  | -             | Sets the width of the animation container.                            |
| `controlsLayout` | `object`  | `{}`          | Customizes the layout of the controls (if `controls` is `true`).      |

## Usage
### Basic usage
```svelte
<script>
  import LottiePlayer from "$lib/components/LottiePlayer.svelte";
</script>

<LottiePlayer src="https://assets7.lottiefiles.com/packages/lf20_qetj4hgh.json" autoplay loop />
```
In this example, the Lottie animation will autoplay and loop continuously using the provided src URL.

## Component Behavior

- **Dynamic Import:** The `Lottie` component is dynamically imported only when the component is mounted to ensure that the Lottie animation functionality is loaded efficiently.
- **Rendering:** The animation will be rendered according to the specified `renderer` (defaulting to `svg`), allowing for high-quality vector-based rendering.
- **Autoplay & Loop:** The animation starts immediately after loading if `autoplay` is set to `true`, and it will loop if `loop` is enabled.
- **Controls:** Playback controls allow the user to interact with the animation, pausing or restarting as needed.
- **Responsiveness:** You can customize the width and height of the animation container, which can be made responsive using percentage-based values or fixed pixel sizes.

# PopOver Component
## Purpose
The PopOver component is a flexible and dynamic tooltip-like UI element that allows you to display contextual content at a specific position on the screen. It is designed to provide a responsive, position-adjustable container for displaying additional information, notifications, or UI elements relative to a target point.

This component calculates the optimal position for the popover to ensure it stays within the viewport and provides a seamless user experience.

## Features
- **Dynamic Positioning**: Automatically adjusts the popover's position to fit within the viewport based on the given coordinates (x, y) and the specified position.
- **Configurable Placement**: Supports positioning at the top, bottom, left, or right of the specified coordinates.
- **Smooth Transitions**: Includes fade-in and fade-out transitions for a polished user experience.
- **Customizable Content**: Displays any custom child content passed to it.
- **Viewport Awareness**: Prevents the popover from overflowing outside the visible screen.

## Props
| Prop Name  | Type                                      | Default Value | Description                                                                              |
| ---------- | ----------------------------------------- | ------------- | ---------------------------------------------------------------------------------------- |
| `show`     | `boolean`                                 | `false`       | Determines whether the popover is visible (`true`) or hidden (`false`).                  |
| `x`        | `number`                                  | `0`           | The X-coordinate (in pixels) for the popover's anchor point.                             |
| `y`        | `number`                                  | `0`           | The Y-coordinate (in pixels) for the popover's anchor point.                             |
| `position` | `string` ("top"  or "bottom"  or "left" ) |
| `children` | `any`                                     | -             | Content to render inside the popover. This can include text, HTML, or Svelte components. |

## Behavior
### Positioning Logic
The `calculateTooltipPosition` function ensures that the popover:

- Follows the Specified Position: Positions the popover based on the value of the `position` prop (`top`, `bottom`, `left`, or `right`).
- Adjusts to Stay Within Viewport: Automatically adjusts the `x` and `y` coordinates if the popover would overflow outside the visible screen. A padding of 20px is maintained from the viewport edges.
- Dynamic Recalculation: Recalculates the position dynamically whenever the `show`, `x`, `y`, or `position` values change.

## Usage

### Basic Usage

```svelte
<script>
  import PopOver from "$lib/components/PopOver.svelte";
  let showPopOver = false;
  let coordinates = { x: 150, y: 200 };
</script>

<button
  on:click={() => (showPopOver = !showPopOver)}
>
  Toggle PopOver
</button>

<PopOver
  {showPopOver}
  x={coordinates.x}
  y={coordinates.y}
  position="top"
>
  <p>This is the content inside the popover.</p>
</PopOver>
```

In this example, clicking the button toggles the visibility of the popover at the specified coordinates (`x=150, y=200`), with the content displayed at the top of the specified position.

## Key Points
- **Visibility Control**: Use the show prop to toggle the visibility of the popover dynamically.

- **Responsive Positioning**: Automatically repositions to stay visible within the viewport.

- **Flexible Content**: Render any HTML or Svelte components as the popover's children.

- **Smooth Transitions**: Includes a fade-in/out effect for polished user interaction.

# PopupWrapper Component
## Purpose
The PopupWrapper component provides a simple and customizable way to display modal popups or overlay dialogs. It offers support for dynamic content rendering, click-outside-to-close functionality, and seamless integration into existing designs. This component is particularly useful for creating modals, dialogs, or custom popups.

## Features
- **Dynamic Content Rendering**: Supports rendering any child elements within the popup.
- **Click-Outside-to-Close**: Automatically closes the popup when a user clicks outside the popup body.
- **Customizable Styles**: Allows you to apply additional custom styles using the className prop.
- **Backdrop**: Includes a dimmed backdrop to focus user attention on the popup content.
- **Close Handler**: Provides a callback function (onClose) to execute custom logic when the popup is closed.

## Props
| Prop Name   | Type              | Default Value | Description                                                              |
| ----------- | ----------------- | ------------- | ------------------------------------------------------------------------ |
| `children`  | `any`             | -             | The content to render inside the popup.                                  |
| `popUpBody` | `HTMLFormElement` | `HTMLElement` | `undefined`                                                              |
| `isOpen`    | `boolean`         | `false`       | Determines whether the popup is visible (`true`) or hidden (`false`).    |
| `onClose`   | `() => void`      | `undefined`   | Callback function triggered when the popup is closed.                    |
| `className` | `string`          | `undefined`   | Additional CSS classes to apply to the popup wrapper for custom styling. |

## Behavior

- **Click-Outside Detection:**
    * The `handleClickOutside` function listens for click events on the overlay (`onmousedown`).
    * If the click occurs outside the popup body (specified by the `popUpBody` reference), the `onClose` callback is triggered, and `isOpen` is set to `false`.

- **Dynamic Visibility:**
    * The popup is conditionally rendered using `{#if isOpen}`. When `isOpen` is `true`, the popup and its backdrop are displayed; otherwise, they are hidden.

- **Backdrop Styling:**
    * A dimmed backdrop (`backdrop-brightness-75`) is applied to reduce distractions and focus the user's attention on the popup content.

- **Custom Overflow Handling:**
    * (Commented out in the code) The popup can optionally disable scrolling on the main document when open by modifying the `document.body.style.overflow` property.

  ## Usage

  ### Basic Usage

  ```svelte
  <script>
  import PopupWrapper from "$lib/components/PopupWrapper.svelte";
  let isPopupOpen = false;
  </script>

  <button on:click={() => (isPopupOpen = true)}>Open Popup</button>

  <PopupWrapper isOpen={isPopupOpen} onClose={() => (isPopupOpen = false)}>
  <div class="bg-white p-6 rounded shadow-lg">
    <h2 class="text-lg font-bold">Popup Title</h2>
    <p>This is some content inside the popup.</p>
    <button on:click={() => (isPopupOpen = false)}>Close</button>
  </div>
  </PopupWrapper>
  ```
  In this example, clicking the "Open Popup" button toggles the visibility of the popup. Clicking outside the popup or the "Close" button will close the popup.

## Key Points
- **Visibility Control**: Use the `isOpen` prop to toggle the popup's visibility dynamically.
- **Outside Click Handling**: The popup automatically closes when a click is detected outside the popup body.
- **Customizable Layout**: Pass any child content to the popup and apply custom styles using the `className` prop.
- **Responsive and Accessible**: Designed for a seamless user experience on all devices with accessibility in mind.

# RangeSelector Component
## Purpose
The RangeSelector component provides an interactive and customizable slider for selecting a numeric range. It includes features like dynamic tooltip positioning, accessibility support, and smooth user interactions through pointer events. This component is well-suited for applications requiring range selection, such as filters, input forms, and data visualizations.

## Features
- **Customizable Range**: Set minimum, maximum, and step values to define the range.
- **Dynamic Tooltip**: Displays the current range value with a dynamically positioned tooltip to prevent overflow.
- **Accessible**: Includes ARIA attributes to enhance usability for assistive technologies.
- **Smooth Interaction**: Handles dragging events to update the range value in real time.
- **Adaptive Design**: Tooltip and caret positions are adjusted to prevent clipping or overflow from the slider boundaries.
- **Modern Styling**: Includes a visually appealing filled track, thumb, and tooltip with a clean design.

## Props
| Prop Name    | Type     | Default Value | Description                                                                                   |
| ------------ | -------- | ------------- | --------------------------------------------------------------------------------------------- |
| `minValue`   | `number` | -             | The minimum value of the range.                                                               |
| `maxValue`   | `number` | -             | The maximum value of the range.                                                               |
| `step`       | `number` | -             | The step value for the range increments.                                                      |
| `rangeValue` | `number` | -             | The current value of the slider. This value is updated as the user interacts with the slider. |

## Behavior

- **Pointer Event Handling:**
    * `onpointerdown`: Activates dragging and sets the initial pointer position.
    * `onpointermove`: Updates the range value dynamically as the thumb is dragged.
    * `onpointerup`: Ends the dragging operation and releases the pointer capture.

- **Tooltip Positioning:**
    * The tooltip dynamically calculates its position relative to the slider and the viewport to prevent clipping.
    * The caret position within the tooltip is adjusted to point accurately at the slider thumb.

- **Accessibility:**
    * ARIA attributes such as `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` are added to the slider for assistive technology support.

- **Overflow Prevention:**
    * The tooltip's position is adjusted to remain within the slider's boundaries, ensuring it is fully visible.

- **Styling:**
    * The slider includes a filled track that reflects the range value visually.
    * A thumb (slider handle) is used for precise adjustments.
    * Tooltip styling highlights the current value with a clear visual indicator.

## Usage
### Basic Usage
```svelte
<script>
  import RangeSelector from "$lib/components/RangeSelector.svelte";
  let rangeValue = $state(50);
</script>

<RangeSelector
  minValue={0}
  maxValue={100}
  step={5}
  bind:rangeValue
/>
```

In this example, the slider allows users to select a value between 0 and 100 in increments of 5. The rangeValue variable is bound to the slider to reflect the current value.

## Key Points
- **Dynamic and Interactive**: The slider updates the value in real time as the user drags the thumb.
- **Customizable**: You can define the range, step, and styling to fit specific use cases.
- **Responsive**: The tooltip adjusts its position dynamically to avoid overflow, ensuring a seamless user experience.
- **Accessibility First**: Designed to support assistive technologies and improve usability for all users.

# SectionWrapper Component

## Purpose
The `SectionWrapper` component is a flexible layout container designed to wrap content inside a structured section. It provides built-in padding, responsive spacing, and an optional id attribute for easy navigation. This component ensures consistency in page layouts while allowing flexibility in content arrangement.

## Features
- Content Wrapping: Wraps child elements inside a structured section.
- Responsive Spacing: Adapts padding and margins based on screen size for a consistent layout.
- Custom ID Support: Allows adding an id attribute for internal linking and navigation.
- Flexible Content: Accepts any child components or elements.

## Props

| Prop Name  | Type      | Default Value | Description                                         |
| ---------- | --------- | ------------- | --------------------------------------------------- |
| `id`       | `string?` | undefined     | Optional ID for the section, useful for navigation. |
| `children` | `any`     | -             | Content to be rendered inside the section.          |

## Behavior

**Content Wrapping**

- The component wraps child elements inside a `<section>` tag with structured padding and spacing.
- Uses `flex flex-col gap-y-12` to ensure a vertical layout with adequate spacing between child elements.
  
**Responsive Design**

- Adjusts padding dynamically:
  - `px-4` for small screens
  - `md:px-10` for medium screens
  - `2xl:px-[72px]` for large screens
Uses `2xl:container mx-auto` for centering the content within the maximum width constraints.

**ID Attribute Support**

- The optional `id` prop allows assigning a unique identifier to the section, making it easy to reference via anchor links.

## Usage

```svelte
<SectionWrapper id="about">
  <h2 class="text-2xl font-bold">About Us</h2>
  <p>Learn more about our mission and vision.</p>
</SectionWrapper>
```
## Key Points
- **Consistent Layout**: Ensures uniform padding and spacing across sections.
- **Responsive Design**: Adapts well to different screen sizes.
- **Custom ID Support**: Enables deep linking and navigation.
- **Flexible Usage**: Can wrap any content while maintaining proper alignment.

# SortButton

## Purpose
The `SortButton` component is a simple UI element that visually represents sorting order in a table or list. It utilizes an icon to indicate sorting direction (asc or desc) and highlights the active sort state when applied.

## Features
- **Indicates Sorting Direction**: Supports ascending (asc) and descending (desc) sorting states.
- **Visual Feedback for Active Sorting**: Changes color when sorting is applied.
- **Lightweight and Reusable**: Designed as a small, reusable component for sorting in tables or lists.

## Props

| Prop Name     | Type      | Default Value | Description                                         |
| ------------- | --------- | ------------- | --------------------------------------------------- |
| `sortOrder`   | `string`  | -             | Optional ID for the section, useful for navigation. |
| `sortApplied` | `boolean` | `false`       | Indicates whether sorting is currently applied.     |

## Behavior

**Sorting Direction Visualization**
- Uses the `SortIcon` component to represent sorting order.
- If `sortOrder` is "`asc`", the upward arrow in `SortIcon` is highlighted.
- If `sortOrder` is "`desc`", the downward arrow in `SortIcon` is highlighted.
- If sorting is not applied, both arrows remain in their default color (`white`).

**Dynamic Color Changes**
- The fillColor1 (ascending) and fillColor2 (descending) properties of SortIcon dynamically change based on sortOrder and sortApplied state.
- When sorting is applied, the active sort direction turns gray (#9C9C9C).

## Usage

### Basic Usage
```svelte
<script>
  import SortButton from "$lib/components/SortButton.svelte";

  let sortOrder: "asc" | "desc" | undefined;
  let sortApplied = false;

  function toggleSort() {
    if (!sortOrder) {
      sortOrder = "asc";
      sortApplied = true;
    } else if (sortOrder === "asc") {
      sortOrder = "desc";
    } else {
      sortOrder = undefined;
      sortApplied = false;
    }
  }
</script>

<button on:click={toggleSort}>
  <SortButton {sortOrder} {sortApplied} />
</button>
```

## Key Points

- Indicates Sorting Order: Highlights the current sorting direction (`asc` or `desc`).
- Dynamic Styling: Changes icon color when sorting is applied.
- Reusable & Lightweight: Can be easily integrated into tables and lists.
- Customizable Behavior: Works well with external event handlers to modify sorting logic.

# TabIconWrapper Component

## Purpose
The `TabIconWrapper` component dynamically renders an icon based on the active tab. It receives a mapping of tab names to icon components and displays the corresponding icon for the currently selected tab.

## Features
- Dynamic Icon Rendering: Displays an icon based on the active tab.
- Supports Custom Icons: Accepts a mapping of tab names to Svelte components.
- Lightweight & Reusable: Can be used in tabbed interfaces for visual representation

## Props

| Prop Name  | Type                           | Default Value | Description                                     |
| ---------- | ------------------------------ | ------------- | ----------------------------------------------- |
| `tabIcons` | `{ [key: string]: Component }` | `{}`          | OObject mapping tab names to Svelte components. |
| `tab`      | `string`                       | `""`          | The currently active tab key.                   |

## Behavior
- Looks Up the Corresponding Icon

    - Retrieves the icon component associated with the current tab from tabIcons.
    - If no matching icon is found, nothing is rendered.
- Renders the Icon Component

  - If a matching icon is found, it is rendered with default properties:
      - `fillColor="currentColor`" → Uses the text color of the parent element.
      - `filled=false` → Ensures the icon is outlined instead of filled.

  ## Usage

  ### Basic Usage

  ```svelte
  <script>
  import TabIconWrapper from "$lib/components/TabIconWrapper.svelte";
  import HomeIcon from "$lib/icons/HomeIcon.svelte";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";

  let activeTab = "home";

  const tabIcons = {
    home: HomeIcon,
    settings: SettingsIcon,
  };
  </script>

  <TabIconWrapper {tabIcons} tab={activeTab} />
  ```
This will render the `HomeIcon` when activeTab is `"home"` and `SettingsIcon` when `activeTab` is `"settings"`

## Key Points
- Dynamic Icon Selection: Displays icons based on the currently active tab.
- Customizable & Flexible: Works with any icon components provided in tabIcons.
- Lightweight & Efficient: Renders only the necessary icon without unnecessary elements.
- Useful for Navigation: Can be used in tabbed layouts, navigation bars, or side menus. 

# Tabs Component

## Purpose
The `Tabs` component provides a horizontal, scrollable tab navigation system that allows users to switch between different sections of an interface. It supports icons, tooltips, and customizable styles.

## Features
- **Scrollable Tab Navigation**: Supports horizontal scrolling for overflowed tabs.
- **Customizable Appearance**: Allows different visual styles (primary and black).
- **Icon & Tooltip Support**: Displays icons and optional tooltips for each tab.
- **Drag-to-Scroll**: Enables smooth scrolling via mouse drag or touch gestures.
- **Dynamic Active Tab Handling**: Updates active state via props or URL parameters.

## Props
| Prop Name     | Type                           | Default Value | Description                          |
| ------------- | ------------------------------ | ------------- | ------------------------------------ |
| `tabs`        | `string[]`                     | `[]`          | Array of tab labels.                 |
| `variant`     | `"primary" or "black"`         | `"black"`     | Defines tab appearance.              |
| `class`       | `string`                       | `""`          | Custom CSS classes.                  |
| `activeTab`   | `string`                       | `""`          | The currently active tab (optional). |
| `onTabClick`  | `(tab: string) => void`        | `undefined`   | Callback when a tab is clicked.      |
| `tabIcons`    | `{ [key: string]: Component }` | `{}`          | Object mapping tab names to icons.   |
| `hideTooltip` | `boolean`                      | `true`        | Hides tooltips when true.            |

## Behavior

-  **Handles Active Tab State**
    - If `activeTab` is provided, it controls the active tab.
    - Otherwise, it defaults to the `tab` query parameter in the URL.
    - Clicking a tab updates the URL if `onTabClick` is not provided.

- **Scrollable Navigation**

  - Users can scroll through tabs via mouse, touch gestures, or dragging.

- **Tab Styling**

  - Active and inactive tabs are styled differently based on the `variant` prop.
  - Uses `clsx` for conditional class handling.

- **Icons & Tooltips**

  - If `tabIcons` is provided, each tab displays an icon.
  - If `hideTooltip` is false, tooltips appear when hovering over tabs.
  - If tabs overflow, labels may be hidden to show only icons.


  ## Usage

  ### Basic usage

  ```svelte
  <script>
  import Tabs from "$lib/components/Tabs.svelte";

  let activeTab = "home";
  let tabs = ["home", "profile", "settings"];

  function handleTabClick(tab) {
    activeTab = tab;
  }
  </script>

  <Tabs {tabs} activeTab={activeTab} onTabClick={handleTabClick} />
  ```
  This creates a simple tab navigation where clicking a tab updates `activeTab`.

  ### Example with Icons
  ```svelte
  <script>
  import Tabs from "$lib/components/Tabs.svelte";
  import HomeIcon from "$lib/icons/HomeIcon.svelte";
  import ProfileIcon from "$lib/icons/ProfileIcon.svelte";
  import SettingsIcon from "$lib/icons/SettingsIcon.svelte";

  let tabs = ["home", "profile", "settings"];
  let activeTab = "home";
  
  const tabIcons = {
    home: HomeIcon,
    profile: ProfileIcon,
    settings: SettingsIcon,
  };
  </script>

  <Tabs {tabs} {tabIcons} activeTab={activeTab} />
  ```

  ### Example with URL sync
  ```svelte
  <script>
  import Tabs from "$lib/components/Tabs.svelte";

  let tabs = ["dashboard", "reports", "analytics"];
  </script>
  
  <Tabs {tabs} />
  ```
  Here, clicking a tab updates the URL with ?tab=tabName, allowing state persistence across page reloads.

## Key Points
- **Scrollable & Responsive**: Handles tab overflow with drag-to-scroll support.
- **Icon & Tooltip Support**: Enhances visual clarity and accessibility.
- **Active State Management**: Works via props, callbacks, or URL sync.
- **Flexible Styling**: Supports primary and black themes for customization.

# TierManagement Component
## Purpose
The TierManagement component allows users to manage pricing tiers dynamically. It supports adding, editing, and deleting tiers while ensuring data consistency and validation.

## Feateres
- **Dynamic Tier Management**: Add, edit, and remove tiers as needed.

- **Validation & Constraints**: Ensures min/max units and price constraints.

- **Inline Editing**: Supports in-place modifications of tiers.

- **Confirmation Prompt**: Asks for confirmation before deleting tiers.

- **Auto-Sorting:** Maintains order based on minUnits value.

- **Supports Unlimited Tiers**: Users can set maxUnits to null for unlimited scaling

## Props
| Prop Name     | Type                      | Description                                                         |
| ------------- | ------------------------- | ------------------------------------------------------------------- |
| `type`        | `string`                  | The category of pricing tiers (e.g., `subscription`, `enterprise`). |
| `tiers`       | `Tier[]`                  | List of existing tiers to be displayed and managed.                 |
| `updateTiers` | `(tiers: Tier[]) => void` | Callback function to update the tier list when modifications occur. |

## States
| State Variable     | Type            | Description                                                                |
| ------------------ | --------------- | -------------------------------------------------------------------------- |
| `localTierState`   | `Tier[]`        | A local copy of tiers for handling edits before updating the parent state. |
| `editingTierIndex` | `number`        | Index of the tier currently being edited.                                  |
| `editingTier`      | `Partial<Tier>` | Stores temporary edits before saving.                                      |
| `editingDiv`       | `HTMLElement`   | Reference to the currently edited tier's element.                          |
| `isOpen`           | `boolean`       | Tracks the confirmation popup state for deletion.                          |

## Behavior

- **Editing a Tier**
  - Clicking the edit button sets `editingTierIndex` and stores tier details in `editingTier` for modification.
  - Allows changing `minUnits`, `maxUnits`, and `pricePerUnit`.
  - Users can cancel edits to revert changes.
  - Saves changes and updates the parent state via `updateTiers()`.

- **Adding a New Tier**

  - Clicking "Add Tier" inserts a new tier at the end of the list.
  - Defaults to `minUnits` as the next available number and `maxUnits` as `null`.
  - Automatically switches to edit mode for immediate modification.

- **Deleting a Tier**

  - If the tier is newly created (`tierId === 0`), it is removed immediately.
  - If it exists in the database, it is marked as `isDeleted = true` instead of being removed.
  - A confirmation popup appears before deletion.

- **Sorting Tiers**

  - After modifications, tiers are sorted by `minUnits` in ascending order.

- **Validation Rules**

  - `minUnits` must be a positive number.
  - `maxUnits` must be greater than `minUnits`, or `null` (unlimited).
  - `pricePerUnit` must be greater than zero.

## Usage
### Basic Usage
```svelte
<script>
  import TierManagement from "$lib/components/TierManagement.svelte";
  let tiers = [
    { tierId: 1, minUnits: 1, maxUnits: 10, pricePerUnit: 5, isDeleted: false },
    { tierId: 2, minUnits: 11, maxUnits: null, pricePerUnit: 3, isDeleted: false },
  ];

  function handleTiersUpdate(newTiers) {
    tiers = newTiers;
  }
</script>

<TierManagement type="subscription" {tiers} updateTiers={handleTiersUpdate} />
```
This sets up a tier management system for a subscription-based service.

## Key Points

- **Handles Active Tier Edits**: Allows real-time modification of tiers.

- **Validation-Driven Input Fields**: Ensures user input adheres to business logic.

- **Tier Sorting & Cleanup**: Maintains tier order and prevents inconsistencies.

- **Flexible & Scalable**: Works with any pricing model needing tiered structures.

# Tooltip Component

## Purpose
The Tooltip component provides contextual information on hover or focus. It supports dynamic positioning, custom content, theme variants, and overflow detection.

## Features
- **Auto-Positioning**: Determines the best placement based on available space.
- **Theming Support**: Supports `dark` and `light` styles.
- **Content Flexibility**: Accepts text or custom components.
- **Overflow Detection**: Ensures tooltips appear only when necessary.
- **Adaptive Positioning**: Keeps tooltips within viewport boundaries.
- **Smooth Transitions**: Uses `fade` animation for appearance.
- **Event Handling**: Shows on `hover`, `focus`, and hides on `scroll` or `resize`.

## Props

| Prop Name        | Type                                              | Default Value | Description                                               |
| ---------------- | ------------------------------------------------- | ------------- | --------------------------------------------------------- |
| content          | `string`                                          | `""`          | Text content for the tooltip.                             |
| delay            | `number`                                          | `400`         | Time in milliseconds before the tooltip appears.          |
| children         | `any`                                             | `undefined`   | The element triggering the tooltip.                       |
| class            | `string`                                          | `""`          | Custom CSS classes for the wrapper.                       |
| position         | `string`(`"top" or "bottom" or "left" or "right"` | `"bottom"`)   | Preferred tooltip placement.                              |
| hidden           | `boolean`                                         | `false`       | If true, the tooltip is always hidden.                    |
| variant          | `string` (`"dark" or "light"`)                    | `"dark"`      | Defines the tooltip theme.                                |
| checkOverflow    | `boolean`                                         | `false`       | If true, the tooltip only appears when content overflows. |
| componentContent | `any`                                             | `undefined`   | Custom Svelte component as tooltip content.               |
| contentClass     | `string`                                          | `""`          | Custom CSS classes for the tooltip content.               |

## Behavior

- **Tooltip Visibility**

  - Appears when the user hovers over or focuses on the target element.
  - Hides on `mouseleave`, `blur`, `scroll`, or `resize`.
  - Shows only if `checkOverflow` is false or content overflows.

- **Positioning**

  - Tries to place the tooltip in the preferred `position`.
  - Adjusts dynamically if there isn't enough space.
  - Keeps tooltips inside the viewport.

- **Styling Variants**

  - `dark`: Dark background with white text.
  - `light`: White background with gray text and shadow.

- **Animation**

  - Uses fade transition with 200ms duration.

## Usage

### Basic usage
```svelte
<script>
  import Tooltip from "$lib/components/Tooltip.svelte";
</script>

<Tooltip content="This is a tooltip">
  <button class="p-2 bg-blue-500 text-white">Hover me</button>
</Tooltip>
```
This displays a tooltip with the default dark theme on hover or focus.

### Example with Light Theme

```svelte
<Tooltip content="Light tooltip" variant="light">
  <button class="p-2 border">Hover me</button>
</Tooltip>
```
This renders a light-themed tooltip.

### Example with Component Content

```svelte
<script>
  import Tooltip from "$lib/components/Tooltip.svelte";
  import CustomTooltipContent from "$lib/components/CustomTooltipContent.svelte";
</script>

<Tooltip componentContent={CustomTooltipContent}>
  <button class="p-2 bg-green-500 text-white">Hover for custom content</button>
</Tooltip>
```

This displays a custom component inside the tooltip.

## Key Points
- **Adaptive Positioning**: Ensures tooltips appear within the viewport.
- **Theming Options**: Supports dark and light styles.
- **Dynamic Content**: Accepts both text and components.
- **Event-Based Visibility**: Triggers on hover, focus, and hides on scroll or resize.

# Utility functions

## Common Utils

### 1. `groupBY` function

#### 1.1 Overview
The groupBy function groups an array of objects based on a specified key or a key-extracting function. It returns an object where the keys are the group identifiers, and the values are arrays containing the grouped items.

#### 1.2 Function 

```typescript
export const groupBy = <T, K extends keyof any>(
    array: T[],
    key: ((item: T) => K) | keyof T
) => {
    return array.reduce((result: any, currentValue) => {
        // Get the group key using the function or property name
        const groupKey = typeof key === 'function' ? key(currentValue) : currentValue[key as keyof T];

        // If the group doesn't exist, create it
        if (!result[groupKey]) {
            result[groupKey] = [];
        }

        // Push the current value to the group
        result[groupKey].push(currentValue);

        return result;
    }, {} as Record<K, T[]>);
};
```

#### 1.3 Parameters

| Parameter | Type                          | Description                                                           |
| --------- | ----------------------------- | --------------------------------------------------------------------- |
| `array`   | `T[]`                         | The array of items to be grouped.                                     |
| `key`     | `((item: T) => K) \| keyof T` | A function that returns the group key or a property name to group by. |

#### 1.4 Return Value

- `Record<K, T[]>`: An object where each key represents a group, and the value is an array of objects belonging to that group.

#### 1.5 Behavior

- Iterates through the `array` using `reduce`.
- Extracts the group key from each item using either:
  - A provided function `key(item)`
  - A direct property lookup `item[key]`
- Adds the item to the appropriate group.
- Returns an object with grouped values.

#### 1.6 Usage

```typescript
const users = [
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" },
    { id: 3, name: "Charlie", role: "admin" },
];

const groupedByRole = groupBy(users, "role");

console.log(groupedByRole);
/*
{
  admin: [
    { id: 1, name: "Alice", role: "admin" },
    { id: 3, name: "Charlie", role: "admin" }
  ],
  user: [
    { id: 2, name: "Bob", role: "user" }
  ]
}
*/
```

#### 1.7 Edge Cases
- If the `array` is empty, it returns an empty object `{}`.
- If the `key` does not exist in objects, it will group under `undefined`.
- Works with both primitive values and object properties.

### 2. `generateUniqueId` function

#### 2.1  Overview
The `generateUniqueId` function generates a unique identifier string based on the current timestamp and a random value. It ensures uniqueness by combining a time-based component with a randomly generated segment.

#### 2.2 Function 
```typescript
export const generateUniqueId = (): string => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`;
}
```

#### 2.3 Returns
- `string`: A unique identifier in the format `"timestamp-random"`.

#### 2.4 Behavior

- **Timestamp Component**

  - Uses Date.now() to get the current timestamp (in milliseconds).
  - Converts it to a base-36 string to reduce length while preserving uniqueness.

- **Random Component**

  - Generates a random decimal using Math.random().
  - Converts it to a base-36 string.
  - Extracts a substring (characters 2–8) to ensure a sufficiently unique portion.
  - 
- **Concatenation**
  - Combines the timestamp and random parts with a - separator.
  
#### 2.5 Usage

Example 1: Generating Unique ID
```typescript
const id1 = generateUniqueId();
// Example Output: "mryzx0-4g9h1d"

const id2 = generateUniqueId();
// Example Output: "mryzx1-92n7k3"
```

#### 2.6 Edge Cases
- Since Date.now() changes every millisecond, duplicate IDs are highly unlikely unless generated in the same exact millisecond.
- The random component further reduces the chances of collisions.
- The generated ID is URL-safe and does not contain special characters.

### 3. `splitValuesToAnArray` function

#### 3.1 Overview
The splitValuesToAnArray function takes a string containing comma-separated values and converts it into an array of trimmed strings. It is useful for parsing lists from user input or configuration values.

#### 3.2 Function 

```typescript
export const splitValuesToAnArray = (value: any) => {
    return value.split(", ").map((item: any) => item.trim());
};
```

#### 3.3 Parameters
- value: any
  - Expected to be a string containing items separated by `", "`.
  - However, since the function does not enforce type checking, passing a non-string value may cause runtime errors.

#### 3.4 Returns
-` string[]`: An array of trimmed strings extracted from the input.


#### 3.5 Behavior
- Splitting

    - Uses `.split(", ")` to separate the string into an array based on the `", "` delimiter.
- Trimming

    - Uses `.map((item) => item.trim())` to remove extra spaces around each value.

#### 3.6 Usage

Example 1: Splitting a Comma-Separated String

```typescript
const result = splitValuesToAnArray("item1, item2, item3");
// Output: ["item1", "item2", "item3"]
```

### 4. `areObjectsEqual` function

#### 4.1 Overview
The `areObjectsEqual` function performs a **deep comparison** between two objects to determine if they are equal. It also provides an option to **ignore specific properties** during the comparison.

This function is useful for detecting changes in objects, performing state comparisons, or validating equality in data structures.

#### 4.2 Function 
```typescript
export const areObjectsEqual = (obj1: any, obj2: any, ignoreProperties?: string[]): boolean => {
    // If both are not objects or one is null, check for direct equality
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;

    const ignoreSet = new Set(ignoreProperties || []);


    for (const key in obj1) {
        if (ignoreSet.has(key)) {
            continue;
        }
        if (!Object.prototype.hasOwnProperty.call(obj2, key)) {
            return false;
        }
        if (!areObjectsEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}
```

#### 4.3 Parameters
- obj1: any
  - The first object to compare.
- obj2: any

  - The second object to compare.
- `ignoreProperties?`: string[] (Optional)

  - An array of property names that should be ignored during the comparison.
- If not provided, all properties will be considered.

#### 4.4 Returns
- `boolean`:
  - Returns `true` if both objects are deeply equal (excluding ignored properties).
  - Returns `false` if they are different in any way.

#### 4.5 Behavior
- Direct Comparison

  - If both `obj1` and `obj2` are strictly equal (`===`), return `true`.
  - If either value is `null` or not an object, return `false`.
- Property Iteration

  - Iterates over the keys in `obj1`.
  - If a key exists in `obj1` but not in `obj2`, return `false`.
  - If a key is in the ignore list, it is skipped.
  - Recursively compares nested properties for deep equality.

#### 4.6 Usage
  Example 1: Basic Object Comparison

  ```typescript
  const objA = { name: "Alice", age: 25 };
  const objB = { name: "Alice", age: 25 };

  console.log(areObjectsEqual(objA, objB)); 
  // Output: true
  ```
  Example 2: Ignoring Specific Properties
  ```
  const objA = { name: "Alice", age: 25, city: "New York" };
  const objB = { name: "Alice", age: 25, city: "Los Angeles" };

  console.log(areObjectsEqual(objA, objB, ["city"])); 
  // Output: true (city is ignored)
  ```
### 5. `debounce` function

#### 5.1 Overview
Overview
The debounce function limits the rate at which a function can be executed. It ensures that the function is called only after a specified delay (wait time) has elapsed since the last invocation.

This is particularly useful for performance optimization, such as reducing the number of API calls, handling user input events efficiently, and improving responsiveness in UI applications.

#### 5.2 Function 
```typescript
export const debounce = (callback: Function, wait = 250) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
};
```
#### 5.3 Parameters
- `callback: Function`
  - The function to be executed after the debounce delay.
  - It is invoked with the arguments passed when calling the  debounced function.
- `wait: number` (Optional, default = `250`)
  - The delay in milliseconds before the `callback` function is executed.
  - If the function is called repeatedly before the `wait` time expires, the timer resets.

#### 5.4 Returns
- A debounced function that delays the execution of the `callback` function.
- Every time the returned function is invoked, the timer resets.

#### 5.5 Behavior
- **Delays Execution**
  - The function will execute only if no new calls are made within the wait period.
  
- **Resets Timer**
  - If the function is called again before the timer expires, the previous timer is cleared, and a new one is set.
  
- **Passes Arguments**
  - The callback function receives all the arguments passed to the debounced function.

#### 5.6 Usage
Example 1: Basic Usage
```typescript
const search = (query: string) => {
  console.log(`Searching for: ${query}`);
};
const debouncedSearch = debounce(search, 500);

// Simulating rapid user input
debouncedSearch("apple");
debouncedSearch("apple p");
debouncedSearch("apple pie");

// Only "Searching for: apple pie" will be logged after 500ms
```
**Use case**: Prevents excessive API calls when a user types in a search field.

### 6. `deepClone` function
#### 6.1 Overview
The `deepClone` function creates a deep copy of an object or array, ensuring that nested structures are fully duplicated rather than just copying references.

This function is useful when working with objects or arrays that should be independent of the original data, preventing unintended modifications to the original structure.

#### 6.2 Function 
```typescript
export const deepClone = <T>(value: T): T => {
    if (value === null || typeof value !== 'object') {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(item => deepClone(item)) as T;
    }
    const clonedObject: { [key: string]: any } = {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            clonedObject[key] = deepClone(value[key]);
        }
    }
    if (value instanceof Date) {
        return new Date(value.getTime()) as T;
    }
    return clonedObject as T;
};
```
#### 6.3 Parameters
- `value: T`
  - The object, array, or primitive value to be deeply cloned.
If it is a primitive value (`string`, `number`, `boolean`, `null`, or `undefined`), it is returned as-is.

#### 6.4 Returns
- A deep copy of the input (`T`)
  - If the input is an object or an array, all nested properties and elements are also cloned.
  - If the input is a `Date` object, a new `Date` instance is returned.

#### 6.5 Usage
```typescript
const original = { name: "Alice", age: 30, address: { city: "New York" } };
const copy = deepClone(original);

copy.address.city = "Los Angeles";

console.log(original.address.city); // "New York"
console.log(copy.address.city); // "Los Angeles"
```
**Use case**: The original object remains unchanged even after modifying the cloned object.

## Canvas Utils

### 1. `createImage` function
#### 1.1 Overview
The `createImage` function loads an image from a given URL and returns a Promise that resolves with an HTMLImageElement. It ensures proper handling of cross-origin requests to prevent security issues.

#### 1.2 Function 
```typescript
// Define types for the createImage function
export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });
```
#### 1.3 Parameters
- `url: string`
  - The URL of the image to be loaded.

#### 1.4 Returns
- `Promise<HTMLImageElement>`: Resolves with the loaded HTMLImageElement or rejects on error.

#### 1.5 Usage
```typescript
createImage('https://example.com/image.jpg')
  .then(image => console.log('Image loaded', image))
  .catch(error => console.error('Error loading image', error));
```
#### 1.6 Edge Case 
- Handles cross-origin restrictions by setting crossOrigin attribute.
- Rejects the Promise if the image fails to load.

### 2. `getRadianAngle` function
#### 2.1 Overview
Converts a degree value to radians, commonly used in image transformations like rotations.

#### 2.2 Function 
```typescript
function getRadianAngle(degreeValue: number): number {
    return (degreeValue * Math.PI) / 180;
}
```
#### 2.3 Parameters
- `degreeValue: number`
  - The angle in degrees.

#### 2.4 Returns
- `number`: The angle converted to radians.

#### 2.5 Usage
```typescript
const radians = getRadianAngle(90);
console.log(radians); // Output: 1.5708
```
#### 2.6 Edge Case
- Accepts both positive and negative degree values.
- Returns 0 if input is 0.

### 3. `getCroppedImg` function
#### 3.1 Overview
Crops an image based on specified dimensions and rotation.
#### 3.2 Function 
```typescript
export async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop, rotation: number = 0): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('2D context not available');
    }

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // Set canvas dimensions to allow for a safe area for rotation
    canvas.width = safeArea;
    canvas.height = safeArea;

    // Translate and rotate canvas context
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // Draw rotated image and store data
    ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
    );
    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // Set canvas to final crop size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Paste rotated image with correct offsets for crop
    ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    );

    // Return cropped image as a blob URL
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            }
        }, 'image/png');
    });
}
```
#### 3.3 Parameters
- `imageSrc: string`
  - The source URL of the image.
  - `pixelCrop: PixelCrop`
    - Object defining crop dimensions. (`x`, `y`, `width`, `height`)
  - `rotation: number = 0`
    - Optional, Rotation angle in degrees. Defaults to 0.
#### 3.4 Returns
- `Promise<string>`: Resolves with the URL of the cropped image as a blob.
#### 3.5 Usage
```typescript
const croppedImage = await getCroppedImg('image-url.jpg', { width: 100, height: 100, x: 50, y: 50 }, 90);
console.log(croppedImage); // Blob URL of the cropped image
```
#### 3.6 Edge Cases
- Ensures proper rotation adjustments.

- Handles images of different sizes dynamically.

- Throws an error if ctx is unavailable.

### 4. `getRotatedImage` function
#### 4.1 Overview
Rotates an image by a given degree and returns the new rotated image as a blob URL.


####  4.2 Function signature
```typescript
export async function getRotatedImage(imageSrc: string, rotation: number = 0): Promise<string> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('2D context not available');
    }

    const orientationChanged =
        rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;

    if (orientationChanged) {
        canvas.width = image.height;
        canvas.height = image.width;
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    // Translate and rotate the canvas context
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    // Return rotated image as a blob URL
    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            if (file) {
                resolve(URL.createObjectURL(file));
            }
        }, 'image/png');
    });
}
```
#### 4.3 Parameters
- `imageSrc: string`
  - The source URL of the image.
- `rotation: number = 0`
  - Rotation angle in degrees. Defaults to 0.
#### 4.4 Returns
- `Promise<string>`: Resolves with rotated image URL.
#### 4.5 Usage
```typescript
const rotatedImage = await getRotatedImage('image-url.jpg', 180);
console.log(rotatedImage); // Blob URL of the rotated image
```
#### 4.6 Edge Cases
- Handles different rotation values, including negative degrees.
- Adjusts canvas size dynamically if orientation changes.
- Throws an error if ctx is unavailable.

## Chart Utils

### 1. `legends` constant

#### 1.1 Overview
The `legends` constant defines a set of predefined legend configurations for chart visualization, specifying labels, colors, and names for different data categories.

#### 1.2 `legends` data
```typescript
export const legends = [
    { label: "High(H)", color: "#BE0027", name: "High" },
    { label: "Acceptable(A)", color: "#2C9F45", name: "Acceptable" },
];
```

#### 1.3 Values
- High(H): Red color (#BE0027)
- Acceptable(A): Green color (#2C9F45)

#### 1.4 Usage
```typescript
console.log(legends[0]); // { label: "High(H)", color: "#BE0027", name: "High" }
```

### 2. `tabs` constant

#### 2.1 Overview
The `tabs` constant defines time range options for chart display, providing different duration views of the data.

#### 2.2 `tabs` Data
```typescript
export const tabs = [
    { value: "7D", label: "7D" },
    { value: "1M", label: "1M" },
    { value: "3M", label: "3M" },
    { value: "6M", label: "6M" },
    { value: "9M", label: "9M" },
    { value: "1Y", label: "1Y" }
];
```

#### 2.3 Values
Available time ranges:
- 7D (7 days)
- 1M (1 month)
- 3M (3 months)
- 6M (6 months)
- 9M (9 months)
- 1Y (1 year)

### 3. `hoverLine` plugin

#### 3.1 Overview
The `hoverLine` plugin adds a vertical line indicator to charts when hovering, enhancing data point visualization.

#### 3.2 Function 
```typescript
const hoverLine: {
    id: string;
    afterDatasetsDraw(chart: Chart, args: any, options: any, cancelable: boolean): void;
}
```

#### 3.3 Behavior
- Draws a dashed vertical line at the hover position
- Updates hover background color based on data point value
- Line styling: gray color (#666666), dashed pattern (5,5)

### 4. `chartLabelValue` function

#### 4.1 Overview
Generates chart labels and values array based on the selected time range tab.

#### 4.2 Function 
```typescript
export const chartLabelValue = (tabName: string) => {
    const currentDate = new Date();
    let startDate = new Date();
    let labels: string[] = [];
    let values: number[] = [];
    switch (tabName) {
        case "7D":
            const arr7D = [];
            startDate.setUTCDate(currentDate.getUTCDate() - 6);
            for (let i = 0; i <= 6; i++) {
                const date = new Date(currentDate);
                date.setUTCDate(currentDate.getUTCDate() - i);
                arr7D.push(date.toISOString().split('T')[0])
            }
            labels = arr7D;
            values = Array(labels?.length || 7).fill(NaN);
            break;
        case "1M":
            const arr1M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getUTCDate() - 1)) {
                arr1M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr1M;
            values = Array(labels?.length || 30).fill(NaN);
            break;
        case "3M":
            const arr3M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 3);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr3M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr3M;
            values = Array(labels?.length || 90).fill(NaN);
            break;
        case "6M":
            const arr6M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 6);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr6M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr6M;
            values = Array(labels?.length || 180).fill(NaN);
            break;
        case "9M":
            const arr9M = [];
            startDate.setUTCMonth(currentDate.getUTCMonth() - 9);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr9M.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr9M;
            values = Array(labels?.length || 270).fill(NaN);
            break;
        case "1Y":
            const arr1Y = [];
            startDate.setUTCFullYear(currentDate.getUTCFullYear() - 1);
            startDate.setUTCDate(1);
            for (let date = new Date(currentDate); date >= startDate; date.setUTCDate(date.getDate() - 1)) {
                arr1Y.push(new Date(date).toISOString().split('T')[0]);
            }
            labels = arr1Y;
            values = Array(labels?.length || 365).fill(NaN);
            break;
        default:
            startDate = new Date(Date.UTC(currentDate.getUTCFullYear(), 0, 1));
            break;
    }
    labels = labels.reverse();
    values = values.reverse();
    return { labelArr: labels, valueArr: values, date: startDate }
}
```

#### 4.3 Parameters
- `tabName: string`
  - One of: "7D", "1M", "3M", "6M", "9M", "1Y"

#### 4.4 Returns
Object containing:
- `labelArr`: Array of date strings
- `valueArr`: Array of NaN values (placeholder for data)
- `date`: Start date for the selected range

#### 4.5 Behavior
- Generates date labels based on the selected time range
- Creates corresponding array of NaN values
- Handles different time ranges with appropriate date calculations

### 5. `getMinMax` function

#### 5.1 Overview
Calculates the minimum and maximum values for chart scaling based on dataset visibility and threshold values.

#### 5.2 Function 
```typescript
export const getMinMax = (datasetVisibility: boolean[], high: number, moderate: number, low: number) => {
    let maxVal = high;
    let minVal = 0;
    if (
        datasetVisibility[4] &&
        !datasetVisibility[3] &&
        !datasetVisibility[2]
    ) {
        maxVal = high;
        minVal = moderate + 1;
    } else if (
        datasetVisibility[3] &&
        !datasetVisibility[2] &&
        !datasetVisibility[4]
    ) {
        maxVal = moderate;
        minVal = low + 1;
    } else if (
        datasetVisibility[2] &&
        !datasetVisibility[3] &&
        !datasetVisibility[4]
    ) {
        maxVal = low;
        minVal = 0;
    } else if (
        !datasetVisibility[2] &&
        datasetVisibility[3] &&
        datasetVisibility[4]
    ) {
        maxVal = high;
        minVal = low + 1;
    } else if (
        datasetVisibility[2] &&
        !datasetVisibility[3] &&
        datasetVisibility[4]
    ) {
        maxVal = high;
        minVal = 0;
    } else if (
        datasetVisibility[2] &&
        datasetVisibility[3] &&
        !datasetVisibility[4]
    ) {
        maxVal = moderate;
        minVal = 0;
    }
    return { maxVal, minVal }
}

```

#### 5.3 Parameters
- `datasetVisibility`: Array of boolean values indicating which datasets are visible
- `high`: High threshold value
- `moderate`: Moderate threshold value
- `low`: Low threshold value

#### 5.4 Returns
Object containing:
- `maxVal`: Maximum value for chart scaling
- `minVal`: Minimum value for chart scaling

### 6. `getTooltipData` function

#### 6.1 Overview
Retrieves historical data for tooltip display based on the selected label.

#### 6.2 Function 
```typescript
export const getTooltipData = (
    historicalReportArr: HistoricalAccountInfo[],
    label: string
) => {
    const data = historicalReportArr.find((item: HistoricalAccountInfo) => {
        const [year, month, day] = item?.snapshotDate.split("T")[0]?.split("-");
        const reportLabel = `${months[+month - 1]} ${day.replace(
            /^0+/,
            ""
        )}, ${year}`;
        if (reportLabel === label) {
            return true;
        }
        return false;
    });
    return data;
};
```

#### 6.3 Parameters
- `historicalReportArr`: Array of historical account information
- `label`: Date label string in format "Month Day, Year"

#### 6.4 Returns
- Matching historical account information object or undefined

### 7. `determineTabVisibility` function

#### 7.1 Overview
Determines which time range tabs should be visible based on the available historical data.

#### 7.2 Function 
```typescript
function determineTabVisibility(
    historicalReportArr: HistoricalAccountInfo[]
): Record<string, boolean>
```

#### 7.3 Parameters
- `historicalReportArr`: Array of historical account information

#### 7.4 Returns
Object containing visibility status for each tab:
- Keys: "7D", "1M", "3M", "6M", "9M", "1Y"
- Values: boolean indicating if tab should be visible

#### 7.5 Behavior
- Calculates date range of available data
- Enables appropriate tabs based on data range
- Progressive enablement (e.g., if 6M is visible, 3M, 1M, and 7D are also visible)

### 8. `removeDuplicates` function

#### 8.1 Overview
Removes duplicate entries from historical data array, keeping the most recent entry for each date.

#### 8.2 Function 
```typescript
export const removeDuplicates = (array: HistoricalAccountInfo[]): HistoricalAccountInfo[] => {
    const uniqueByDate = new Map<string, HistoricalAccountInfo>();

    array.forEach((item: HistoricalAccountInfo) => {
        const date = item?.snapshotDate.split('T')[0];
        const existingItem = uniqueByDate.get(date);

        if (!existingItem || new Date(item?.snapshotDate) > new Date(existingItem?.snapshotDate)) {
            uniqueByDate.set(date, item);
        }
    });

    return Array.from(uniqueByDate.values());
};
```

#### 8.3 Parameters
- `array`: Array of historical account information

#### 8.4 Returns
- Deduplicated array of historical account information

#### 8.5 Behavior
- Uses Map to track unique dates
- Keeps most recent entry when duplicates exist
- Preserves original data structure
## Date Utils

### 1. `convertDateTime` function

#### 1.1 Overview
Converts a date-time string from ISO format to a formatted string with AM/PM indicator.

#### 1.2 Function 
```typescript
export const convertDateTime = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return 'MM/DD/YYYY at 00:00 AM';
    // Split the given date string
    const dateTimeParts = dateTimeString?.split("T") ?? '';
    const datePart = dateTimeParts[0];
    const timePart = dateTimeParts[1];

    // Split the date part into year, month, and day
    const [year, month, day] = datePart?.split("-") ?? '';

    // Split the time part into hours, minutes, and seconds
    let [hours, minutes, seconds] = timePart?.split(":") ?? '';

    // Determine the AM or PM period
    const period = +hours >= 12 ? "PM" : "AM";

    // Create the formatted string
    const formattedDate = `${month}/${day}/${year} at ${+hours % 12 || '00'}:${minutes || '00'} ${period || 'AM'}`;

    return formattedDate;

}
```

#### 1.3 Parameters
- `dateTimeString`: ISO format date string (e.g., "2024-01-31T14:30:00")
  - Optional, can be undefined

#### 1.4 Returns
- Formatted date string: "MM/DD/YYYY at HH:MM AM/PM"
- Returns "MM/DD/YYYY at 00:00 AM" if input is undefined or empty

#### 1.5 Usage
```typescript
convertDateTime("2024-01-31T14:30:00")
// Output: "01/31/2024 at 02:30 PM"
```

### 2. `convertDate` function

#### 2.1 Overview
Converts a date-time string to a simple date format (MM/DD/YYYY).

#### 2.2 Function 
```typescript
export const convertDate = (dateTimeString: string | undefined) => {
    if (!dateTimeString || dateTimeString === "") return 'MM/DD/YYYY';
    dateTimeString = dateTimeString?.replaceAll('T', ' ') ?? "";
    const datePart = dateTimeString?.split(' ')[0] ?? '';
    const [year, month, day] = datePart?.split("-") ?? '';
    return `${month}/${day}/${year}`;
}
```

#### 2.3 Parameters
- `dateTimeString`: ISO format date string
  - Optional, can be undefined

#### 2.4 Returns
- Formatted date string: "MM/DD/YYYY"
- Returns "MM/DD/YYYY" if input is undefined or empty

#### 2.5 Usage
```typescript
convertDate("2024-01-31T14:30:00")
// Output: "01/31/2024"
```

### 3. `convertDateToDay` function

#### 3.1 Overview
Converts a date string to a format including the day of the week.

#### 3.2 Function 
```typescript
export const convertDateToDay = (inputDate: string) => {
    if (!inputDate || inputDate === "") return 'N/A';
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(inputDate);
    const index = date.getDay()
    const dayOfWeek = daysOfWeek[index];

    // Get the individual components of the date
    const dateParts = inputDate.split('T')[0].split(' ')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    if (dayOfWeek) {
        return `${dayOfWeek}, ${month}/${day}/${year}`;
    } else {
        return 'N/A'
    }
}
```

#### 3.3 Parameters
- `inputDate`: ISO format date string

#### 3.4 Returns
- Formatted string: "DDD, MM/DD/YYYY" (where DDD is three-letter day name)
- Returns "N/A" if input is invalid or empty

#### 3.5 Usage
```typescript
convertDateToDay("2024-01-31T14:30:00")
// Output: "Wed, 01/31/2024"
```

### 4. `months` constant

#### 4.1 Overview
Array of three-letter month abbreviations.

#### 4.2 Type Definition
```typescript
const months: string[]
```

#### 4.3 Values
Array containing: 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'

### 5. `convertToDateMonth` function

#### 5.1 Overview
Converts a date string to a long format with month name and ordinal day.

#### 5.2 Function 
```typescript
export const convertToDateMonth = (inputDate: string) => {
    if (!inputDate || inputDate === "") return 'N/A';
    // Extract date and time components
    const [year, month, day] = inputDate?.split('T')[0]?.split('-')?.concat(inputDate?.split('T')[1]?.split('.')[0]);

    // Convert month to its name

    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName: string = monthNames[parseInt(month, 10) - 1];

    // Format the time in 12-hour clock format

    let [hours, minutes] = inputDate.split('T')[1].split(':').map((num: any) => parseInt(num, 10));
    const ampm: string = hours < 12 ? 'AM' : 'PM';
    hours %= 12;
    hours = hours || 12; // Handle midnight (0:00) as 12:00 AM

    // Create the formatted date and time string
    const formattedDateTime: string = `${monthName} ${addOrdinalSuffix(+day)}, ${year} at ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formattedDateTime;
}
```

#### 5.3 Parameters
- `inputDate`: ISO format date string

#### 5.4 Returns
- Formatted string: "Month DDth, YYYY at HH:MM AM/PM"
- Returns "N/A" if input is invalid or empty

#### 5.5 Usage
```typescript
convertToDateMonth("2024-01-31T14:30:00")
// Output: "January 31st, 2024 at 2:30 PM"
```

### 6. `convertToFormatedDate` function

#### 6.1 Overview
Converts a date string to a format with full month name.

#### 6.2 Function 
```typescript
export const convertToFormatedDate = (inputDate: string) => {//Month Day, Year
    if (!inputDate || inputDate === "") return 'N/A';
    // Extract date and time components
    const [year, month, day] = inputDate?.split('T')[0]?.split('-')?.concat(inputDate?.split('T')[1]?.split('.')[0]);

    // Convert month to its name

    const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthName: string = monthNames[parseInt(month, 10) - 1];
    const formattedDateTime: string = `${monthName} ${day}, ${year}`;

    return formattedDateTime;
}
```

#### 6.3 Parameters
- `inputDate`: ISO format date string

#### 6.4 Returns
- Formatted string: "Month DD, YYYY"
- Returns "N/A" if input is invalid or empty

#### 6.5 Usage
```typescript
convertToFormatedDate("2024-01-31T14:30:00")
// Output: "January 31, 2024"
```

### 7. `dateMonthDifference` function

#### 7.1 Overview
Calculates the difference between two dates in months and days.

#### 7.2 Function 
```typescript
export const dateMonthDifference = (startDateStr: string | undefined, endDateStr: string | undefined) => {
    if (!startDateStr || !endDateStr || startDateStr === endDateStr || startDateStr === "" || endDateStr === "") {
        return "(0 Months, 0 Days)";
    }

    const parseDate = (dateString: any) => {
        const [datePart] = dateString.includes('T') ? dateString.split('T') : dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        return {
            year: parseInt(year, 10),
            month: parseInt(month, 10),
            day: parseInt(day, 10)
        };
    };

    const isLeapYear = (year: number): boolean => {
        // Function to check if the year is a leap year
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    };

    const getLastMonthDays = (year: number, month: number): number => {
        // Calculate the days in the last month of the specified year without using new Date()
        const daysInMonth = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Ensure the month is within the valid range (1 to 12)
        month = (month - 1 + 12) % 12 + 1; // Normalize month to a valid range

        return daysInMonth[month - 1];
    };

    const d1 = parseDate(startDateStr);
    const d2 = parseDate(endDateStr);

    let monthDiff = (d2.year - d1.year) * 12 + d2.month - d1.month;
    let dayDiff = d2.day - d1.day;

    // Adjust the difference if the day in the second date is less than or equal to the day in the first date
    if (dayDiff < 0) {
        monthDiff--;
        dayDiff = getLastMonthDays(d2.year, d2.month - 1) + dayDiff;
    }
    return `(${monthDiff} Months, ${dayDiff} Days)`;
}

```

#### 7.3 Parameters
- `startDateStr`: Starting date in ISO format (optional)
- `endDateStr`: Ending date in ISO format (optional)

#### 7.4 Returns
- Formatted string: "(X Months, Y Days)"
- Returns "(0 Months, 0 Days)" if dates are invalid, equal, or empty

#### 7.5 Behavior
- Handles leap years correctly
- Accounts for varying month lengths
- Provides accurate month and day differences

#### 7.6 Usage
```typescript
dateMonthDifference("2024-01-01T00:00:00", "2024-03-15T00:00:00")
// Output: "(2 Months, 14 Days)"
```

#### 7.7 Edge Cases
- Handles month rollovers correctly
- Properly accounts for different month lengths
- Handles leap year calculations
- Returns default value for invalid or equal dates


## Month-Year Utils

### 1. `findEndMonthAndYear` function

#### 1.1 Overview
Finds the latest month and year combination from an array of monthly breakdown data.

#### 1.2 Function 
```typescript
export const findEndMonthAndYear = (
  monthlyBreakdown: MonthlyBreakdown[]
): MonthYearProp => {
  let maxMonth = 0;
  let maxYear = 0;

  if (!monthlyBreakdown?.length) return { month: 0, year: 0 };
  for (const entry of monthlyBreakdown) {
    if (
      entry?.year > maxYear ||
      (entry?.year === maxYear && entry?.month > maxMonth)
    ) {
      maxYear = entry?.year;
      maxMonth = entry?.month;
    }
  }

  return { month: maxMonth - 1, year: maxYear };
};
```

#### 1.3 Parameters
- `monthlyBreakdown`: Array of MonthlyBreakdown objects
  - Each object contains `month` and `year` properties

#### 1.4 Returns
- `MonthYearProp`: Object containing:
  - `month`: number (0-based month index, 0-11)
  - `year`: number
- Returns `{ month: 0, year: 0 }` if input array is empty or undefined

#### 1.5 Behavior
- Iterates through the breakdown array to find maximum year
- For same year, finds maximum month
- Adjusts month to 0-based index (subtracts 1 from found month)

#### 1.6 Usage
```typescript
const breakdowns = [
    { month: 3, year: 2023 },
    { month: 12, year: 2023 },
    { month: 1, year: 2024 }
];

const result = findEndMonthAndYear(breakdowns);
// Output: { month: 0, year: 2024 }
```

### 2. `findStartMonthAndYear` function

#### 2.1 Overview
Finds the earliest month and year combination from an array of monthly breakdown data.

#### 2.2 Function 
```typescript
export const findStartMonthAndYear = (
  monthlyBreakdown: MonthlyBreakdown[]
): MonthYearProp => {
  let minMonth = Infinity;
  let minYear = Infinity;

  for (const entry of monthlyBreakdown) {
    if (
      entry.year < minYear ||
      (entry.year === minYear && entry.month < minMonth)
    ) {
      minYear = entry.year;
      minMonth = entry.month;
    }
  }

  return { month: minMonth - 1, year: minYear };
};
```

#### 2.3 Parameters
- `monthlyBreakdown`: Array of MonthlyBreakdown objects
  - Each object contains `month` and `year` properties

#### 2.4 Returns
- `MonthYearProp`: Object containing:
  - `month`: number (0-based month index, 0-11)
  - `year`: number

#### 2.5 Behavior
- Iterates through the breakdown array to find minimum year
- For same year, finds minimum month
- Adjusts month to 0-based index (subtracts 1 from found month)
- Uses Infinity as initial values to ensure first comparison works correctly

#### 2.6 Usage
```typescript
const breakdowns = [
    { month: 3, year: 2023 },
    { month: 12, year: 2023 },
    { month: 1, year: 2024 }
];

const result = findStartMonthAndYear(breakdowns);
// Output: { month: 2, year: 2023 }
```

#### 2.7 Edge Cases
Both functions handle:
- Empty arrays
- Undefined input (findEndMonthAndYear)
- Arrays with single entry
- Multiple entries in same month/year
- Entries spanning multiple years

## Number Format Utils

### 1. `formatPhoneNumber` function

#### 1.1 Overview
Formats a string of numbers into a standard phone number format with parentheses, spaces, and hyphens.

#### 1.2 Function 
```typescript
export const formatPhoneNumber = (number: string | undefined): string => {
    if (!number) {
        return 'N/A';
    }
    const cleaned = ('' + number).replace(/\D/g, '');
    let formattedNumber = '';
    if (cleaned.length >= 3) {
        formattedNumber += `(${cleaned.substring(0, 3)})`;
    } else {
        formattedNumber += cleaned;
    }
    if (cleaned.length > 3) {
        formattedNumber += ` ${cleaned.substring(3, Math.min(6, cleaned.length))}`;
    }
    if (cleaned.length > 6) {
        formattedNumber += `-${cleaned.substring(6, 10)}`;
    }
    const extraPart = cleaned.substring(10);
    if (extraPart) {
        formattedNumber += ` ${extraPart}`;
    }

    return formattedNumber;
}
```

#### 1.3 Parameters
- `number`: String of digits or undefined
  - Can include non-numeric characters which will be stripped

#### 1.4 Returns
- Formatted phone number string: "(XXX) XXX-XXXX" or "(XXX) XXX-XXXX XXXXX" for longer numbers
- Returns 'N/A' if input is undefined or empty

#### 1.5 Behavior
- Removes all non-digit characters
- Formats progressively based on input length:
  - First 3 digits: (XXX)
  - Next 3 digits: (XXX) XXX
  - Next 4 digits: (XXX) XXX-XXXX
  - Additional digits: (XXX) XXX-XXXX XXXXX

#### 1.6 Usage
```typescript
formatPhoneNumber("1234567890")
// Output: "(123) 456-7890"

formatPhoneNumber("12345678901234")
// Output: "(123) 456-7890 1234"

formatPhoneNumber("123")
// Output: "(123)"
```

### 2. `formatNumberOnly` function

#### 2.1 Overview
Strips all non-numeric characters from a string, returning only the digits.

#### 2.2 Function 
```typescript
export const formatNumberOnly = (value: string) => {
    return value ? value.replace(/\D/g, '') : '';
}
```

#### 2.3 Parameters
- `value`: Input string that may contain non-numeric characters

#### 2.4 Returns
- String containing only numeric characters
- Empty string if input is falsy

#### 2.5 Usage
```typescript
formatNumberOnly("ABC123-456.789")
// Output: "123456789"

formatNumberOnly("Phone: (123) 456-7890")
// Output: "1234567890"
```

### 3. `addOrdinalSuffix` function

#### 3.1 Overview
Adds the appropriate ordinal suffix (st, nd, rd, th) to a number.

#### 3.2 Function 
```typescript
export const addOrdinalSuffix = (day: number): string => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
};

```

#### 3.3 Parameters
- `day`: Number to which the ordinal suffix should be added

#### 3.4 Returns
- String with the number and its appropriate ordinal suffix

#### 3.5 Behavior
- Handles special cases (11th, 12th, 13th)
- Applies correct suffix based on last digit
  - 1 → "st" (except 11)
  - 2 → "nd" (except 12)
  - 3 → "rd" (except 13)
  - All others → "th"

#### 3.6 Usage
```typescript
addOrdinalSuffix(1)  // Output: "1st"
addOrdinalSuffix(2)  // Output: "2nd"
addOrdinalSuffix(3)  // Output: "3rd"
addOrdinalSuffix(4)  // Output: "4th"
addOrdinalSuffix(11) // Output: "11th"
addOrdinalSuffix(21) // Output: "21st"
```

### 4. `parseNumericValue` function

#### 4.1 Overview
Parses a value into a number by removing all non-numeric characters except decimal points and negative signs.

#### 4.2 Function 
```typescript
export const parseNumericValue = (value: any): number => {
    return parseFloat(value?.toString().replace(/[^0-9.-]+/g, "") || "0");
}
```

#### 4.3 Parameters
- `value`: Any value that can be converted to a string

#### 4.4 Returns
- Parsed number value
- Returns 0 if input is invalid or empty

#### 4.5 Behavior
- Converts input to string
- Removes all characters except:
  - Numbers (0-9)
  - Decimal point (.)
  - Negative sign (-)
- Converts cleaned string to number using parseFloat
- Returns 0 for invalid or empty inputs

#### 4.6 Usage
```typescript
parseNumericValue("$123.45")
// Output: 123.45

parseNumericValue("-$99.99")
// Output: -99.99

parseNumericValue("abc")
// Output: 0
```

#### 4.7 Edge Cases
- Handles undefined/null inputs (returns 0)
- Preserves decimal precision
- Maintains negative values
- Returns 0 for non-numeric strings

## Currency Utils

### 1. `convertToUSD` function

#### 1.1 Overview
Converts a given numeric value into a formatted USD currency string.

#### 1.2 Function 
```typescript
export function convertToUSD(value: any) {
    if (!value) return "$0";
    let convertedAmount;
    try {
        convertedAmount = value.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            // currencySign: 'accounting'
        });
    } catch (err) {
        console.log("Error in converting the value", err);
        convertedAmount = value;
    }
    return convertedAmount;
}

```

#### 1.3 Parameters
- `value`: Any input value that can be converted to a currency format.

#### 1.4 Returns
- Formatted string representing the value in USD currency (e.g., "$1,234.56").
- Returns "$0" if the input is invalid or falsy.

#### 1.5 Behavior
- Uses `toLocaleString('en-US')` to format the number in USD currency style.
- If the input value is invalid or causes an error, logs the error and returns the original value.
- Defaults to "$0" for falsy inputs.

#### 1.6 Usage
```typescript
convertToUSD(1234.56)
// Output: "$1,234.56"

convertToUSD("invalid")
// Output: "invalid"

convertToUSD(null)
// Output: "$0"
```

## Risk Assessment Utils

### 2. `getRiskAssessmentFromRiskScore` function

#### 2.1 Overview
Determines a risk assessment level based on a given risk score and threshold values.

#### 2.2 Function 
```typescript
export const getRiskAssessmentFromRiskScore = (
  riskScore: number | undefined,
  upperThreshold: number | undefined,
  lowerThreshold: number | undefined
) => {
  if (!riskScore || !lowerThreshold || !upperThreshold) return "High";
  if (riskScore) {
    if (
      riskScore >=
      upperThreshold // threshold1
    ) {
      return "Acceptable";
    }
    if (
      riskScore <=
      lowerThreshold // threshold2
    ) {
      return "High";
    }
    return "Moderate";
  } else {
    return "High";
  }
};
```

#### 2.3 Parameters
- `riskScore`: The numerical risk score to be evaluated.
- `upperThreshold`: The threshold above which the risk is considered "Acceptable".
- `lowerThreshold`: The threshold below which the risk is considered "High".

#### 2.4 Returns
- "Acceptable" if the risk score is greater than or equal to `upperThreshold`.
- "Moderate" if the risk score is between `lowerThreshold` and `upperThreshold`.
- "High" if the risk score is less than or equal to `lowerThreshold`.
- Defaults to "High" if any of the inputs are undefined.

#### 2.5 Behavior
- If `riskScore`, `upperThreshold`, or `lowerThreshold` are undefined, returns "High".
- Compares `riskScore` against `upperThreshold` and `lowerThreshold` to determine the appropriate risk level.

#### 2.6 Usage
```typescript
getRiskAssessmentFromRiskScore(85, 80, 50)
// Output: "Acceptable"

getRiskAssessmentFromRiskScore(60, 80, 50)
// Output: "Moderate"

getRiskAssessmentFromRiskScore(40, 80, 50)
// Output: "High"

getRiskAssessmentFromRiskScore(undefined, 80, 50)
// Output: "High"
```

