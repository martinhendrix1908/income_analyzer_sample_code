# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] YYYY-MM-DD

### Added

### Fixed

### Changed

### Removed

## [Unreleased] YYYY-MM-DD
## [3.2.3] 2025-02-11

### Added

- []() - Added an API service utility, `apiRequest`, to handle `GET/POST` requests and responses, reducing duplication of request logic, improving maintainability, and ensuring consistent error handling across the application. Updated the CMP screens to use the new `apiRequest` utility function. Additionally, implemented the design and functionality for the "Tickets" and "Third-Party Integration" tabs.

### Changes

- []() - Modified the code to add flags "Urgent/Follow-up Needed" to the Notes tab of CMP screen. Removed the use of "PUBLIC_API_KEY" and "PUBLIC_SERVER_URL" from the code base.

## [3.2.2] 2025-02-10

### Changes

- []() - Refactored code and fixed minor issues. Added a common validation mechanism for user authentication on every page. Updated the assessment zone design according to Figma and added functionality accordingly.

## [3.1.98] 2025-02-07

### Added

- []() - Added the modified code for the report screen according to the updated API response. Added a new field, "Reference/Client Type," when adding a new user and an admin for the organization. Also, added a redirection link after login to navigate to the specified route provided.

### Changes

- []() - Integrated the GetActivityLogs API into the activity screen and added a "Done By" column to the activity table. Fixed a minor issue with the contact screen set primary function. Updated the code to set the organization ID for users and validate them.

## [3.1.97] 2025-02-06

### Added

- []() - Added a Contacts tab with add, set-primary, and remove functionality. Added a Notes tab with the ability to add notes. Designed the Activity tab. Added an organization structure popup to the CMP action navigation bar.

### Changed

- []() - Updated a new variant as "secondary" for the Tabs component. Updated the Topbar with actual data for the organization details. Added validation to routing and visibility for the CMP screen based on organization and bankuity admins. Removed tabs from the global permissions screen. Added routing for the Settings screen (Manage Organization/Group/Unit/Member). Modified the CustomError component to display "Not Found" and "Forbidden" screens based on status, and "Coming Soon" for CMP error and third-party screens. Moved all components for the CMP screen to the CMP folder.

## [3.1.96] 2025-02-04

### Added

- []() - Added a new Role Creation popup and integrated the SetOrganizationRoles API. Added a CMP screen to manage organizations for Bankuity Adminstrations, including Details, Billing, API, and Subscription tab screens.

### Changed
- []() - Integrated the GetGlobalPermissions and SetGlobalPermissions APIs for the global permissions screen. Moved some utility functions from create request utils to common utils file.

## [3.1.95] 2025-01-31

### Changed

- []() - Updated the subscription screen design in the organization management. Added an API to retrieve menu items for the sidebar. Fixed an issue where an organization could be added without selecting a bundle or feature. Modified the custom InputField to display a dollar symbol if it is a price field. Adjusted the dashboard to set the initial sort on the "Date Created" column.

## [3.1.94] 2025-01-28

### Changed

- []() - Updated the design by hiding the two permission screens, added 'Share' and 'Review' actions for the demo, made minor design changes, and updated the toggle function for the bundle screen.

## [3.1.93] 2025-01-24

### Changed

- []() - Added API endpoints for the feature listing and manage feature screens to enable adding and editing features and their associated tiers. Updated the bundle screen to include the newly added fields and tier information, and removed the code for the popup previously used to add or edit a bundle. Also, added more actions to the permission screen. Updated the manage organization screen to make the bundle and feature selection optional, with the condition that at least one of them must be selected.

## [3.1.92] 2025-01-22

### Added

- []() - Added new screen feature and manage feature to Add/Edit feature and tiers.

### Changed

- []() - Updated the code to align application data changes with the API. Modified the Overview section to display the Current Balance if the Available Balance is not present. Enhanced the Manage Bundle (Add/Edit) screen design to enable tier addition.

## [3.1.91] 2025-01-21

### Changed

- []() - Removed duplicate code with the same functionality, updated all folder names, and adjusted routing and modified code to maintain a consistent structure.

## [3.1.90] 2025-01-20

### Changed

- []() - Updated the permission screens for the demo as per the last discussion and improved the object comparison code with a better handling mechanism.

## [3.1.89] 2025-01-17

### Changed

- []() - Fixed the issue with misalignment of Risk Assessment in the historical report. Updated the subscription page to address an issue when no bundles or features are available. Fixed the issue with admin data not displaying in the Organization Management screen. Reviewed various screens, fixed identified errors, and removed unused components. Replaced all individual select fields across the application with the "DynamicSelect" component.

## [3.1.88] 2025-01-16

### Added

- []() - Added the Manage Organization screen and the Admin table. Included subscription details on the Management tab for organizations, groups, or units. Implemented a new design for the select dropdown.

## Changed

- []() - Updated the Organization Management screen to align with API changes. Modified the design of the Bundle screen to display the selected features and their descriptions when a row is toggled. Added APIs for Admin Add/Edit functionality. Implemented different designs for the Permission Management screen. Renamed the column 'Likely Monthly Payment' to 'Likely Installment Amount' under Loans in the Report screen. Hid the Profile, Notification, and Chat tabs from the header, and removed the Loan Dashboard button from the top banner. Replaced the select dropdown in the Management screen with the newly designed version.

## [3.1.87] 2025-01-10

## Changed

- []() - Update the code to display the available balance in the overview section of the report screen. Fixed the issue in the "All Transactions" section where the category number is shown instead of the category name.

## [3.1.86] 2025-01-09

## Changed

- []() - Two new settings have been added to show or hide the Action Bar tabs on the report screen, as well as to show the post/pre onboarding risk assessments and reasons. Changed the "Current Balance" to "Available Balance" in the overview section of the report screen.

## [3.1.85] 2025-01-08

## Changed

- []() - Fixed discrepancy in assessment reasons and update code to show post-onboarding risk assessment if posResponse exists; otherwise, show account-specific risk assessment. Update historical report to show post-onboarding risk assessment, except for the initial report. Added code to hide the "Sidebar Menu" icon if the "ShowMenu" exists and is set to false. Added functionality to serve base64 image in user profile. Created separate API route handler for validating routing number in 'Create New Request' screen.

## [3.1.84] 2025-01-07

## Added

- []() - Added the Organizations and Bundles screens with Add, Edit, and Sort functionality. Also added the Regenerate API Key screen along with its functionality.

## Changed

- []() - Updated the custom select component and button with an improved design and dynamic positioning. Also fixed a minor issue where the return URL was not being set correctly.

## [3.1.84] 2025-01-03

## Changed

- []() - Update the code to display the risk assessment and reasons for post-onboarding if posResponse exists; otherwise, show the risk assessment and reason for each account and updated the risk assessment component.

## [3.1.83] 2024-12-24

## Changed

- []() - Updated sveltejs/vite-plugin-svelte to the latest version, requiring changes from @app/stores to @app/state, resulting in significant file modifications, integrated the API for billing in the Overview section of the billing screen(Not in use) and fixed issue after updating the version and removed deprecated code.

## [3.1.82] 2024-12-20

## Changed

- Modified the design for the reset and setup password screens according to Figma and completed their functionality. Updated the code for the bank connectivity provider to use the provider name to retrieve settings from the GetIBVProviderSettings API. Modified the risk assessment to display assessment reasons account-wise and added a design for selecting a month on the billing screen.

## [3.1.81] 2024-12-17

## Added

- []() - Added the screen to set and reset password their functionality.

## Changed

- []() - Updated the bank connectivity screen by removing the 'Add New Provider' button and the 'Delete Provider' option, displaying all providers by default. Refactored the dynamic icon component to use lazy loading with dynamic imports, updated the login response type, and removed the use of cookies with respective functionality everywhere except for the handle hook.

## [3.1.80] 2024-12-13

### Added

- []() - Completed the functionality for the bank connectivity screen to add a new provider, dynamically render fields for the configure popup, and save changes. Modified the save changes functionality for all organization, group, and unit screens, refactored the code, optimized the session timeout popup to address potential issues, and updated the code to display only assessments reasons and content from the posResponse, removing alerts and insights.

## [3.1.79] 2024-12-12

### Added

- []() - Added design for all screens under the billing page.

### Changed

- []() - Updated the refresh logic to terminate all instances of the GetProcessingResults API call once we receive expected response, modified the code to display the risk zone on an account basis, divided all screens under organization management into separate screens, and updated the routing and file structure for all accordingly.

## [3.1.78] 2024-12-06

### Added

- []() - The alert accordion was modified to display both posResponse and assessmentReasons, all instances of window.location.href were replaced with goto based on their functionality, design-related changes were made to the sidebar and navbar, the individual loaders on the dashboard and the "Create New Request" screen were replaced with a global loader, and all individual popups were wrapped in the same wrapper.

## [3.1.77] 2024-12-05

### Added

- []() - Added the sidebar to the main layout.

### Changed

- []() - Updated the code to display the report screen with an info panel for reports with a status of "Error" when a request ID is refreshed. Added functionalities and made updates to the code for the permission screen.

### Added

- []() - Allowlist mouseflow to properly retrieve assets from the application

## [3.1.76] 2024-12-04

### Changed

- []() - Updated the component structure for the roles and access table to match the revised API response, implemented client-side data transformation to recursively render rows, fixed the issue preventing toggling to a historical report from a past report, added `posResponse` alerts to the existing risk zone panel as a dropdown if alerts exist, and updated the permission screen design to make the Action column sticky while other columns remain scrollable.

## [3.1.75] 2024-11-29

### Changed

- []()- Updated the header component and the report screen to align with the new Figma design. Refactored the Report screen, Topbar and Overview to enhance code readability, removed unnecessary code, optimized functions, and resolved an issue where data was not updating on the group management screen.

## [3.1.74] 2024-11-24

### Changed

- []() - Fixed the issues with the source and frequency sections, refactored the report page by moving all logic from the parent (report) component to their respective components, and renamed variables and functions to align with their usage.

## [3.1.73] 2024-11-25

### Changed

- []() - Fixed an issue where data was not updating on the report screen. Refactored the Income Trends, Source and Frequency, All Transactions, and Historical Report (Line Chart) components to ensure they update correctly when toggling between accounts. Removed unused code from previous versions. Removed the "Manage" link from the Members table, added navigation to full names, updated Lending Guide and Bank Connectivity screens, introduced the dynamic IBVConfigPopup component, improved tooltip designs, and fixed alignment in Organization Management and User Roles & Access screens.

## [3.1.72] 2024-11-20

### Added

- []() - Added a loader component to display loading animation on each page navigation. Added a custom tooltip component to show icon button's information and the headers under organization settings screens. Added Role management screen.

# Changed

- []() - Modified the assessment zone to display two default zones, added a tooltip to the color slider, removed individual loaders, and implemented a global loader for both the report and dashboard pages. Additionally, removed the use of cookies for toggling between the report and view report screens, and replaced the loaders in the report and dashboard with the global loader. Updated the .env to use the new API URL.

### Changed

- []() - Renamed URL path name from group_management to organization_management. Fixed profile picture update issue in user profile screen due to caching. Fixed the input validation for common input field component to allow spaces. Updated organization structure popup height, header text and zoom level.

## [3.1.71] 2024-11-18

### Added

- []() - Added Groups, Units, and Members tab components in the Management Settings screen. Added Assessment Zones configuration screen for the Entities Settings screen and integrated it with the SetOrganizationUnits API.

### Changed

- []() - Implemented conditional edit/view access on the Management Settings screen based on claim values. Updated the "New Group" and "New Unit" popup components to display organizations and groups with icons in the dropdown, including search functionality. Modified the name "units" in the Apply Changes popup and Override Lock screen to "entity" as it contains both groups and units.

## [3.1.70] 2024-11-13

### Added

- []() - Added User Role Table in the Organization management screen and integrated GetOrganizationRoles API in it. Added a custom toaster component.

### Changed

- []() - Updated User management, User profile, Apply changes popup component code to display the toaster messages on API response.

## [3.1.69] 2024-11-11

### Changed

- []() - Updated the Roles and Access table components to bind checkboxes for Group and Organization also, completed the Group Management screen to allow updating of modified changes and added override lock functionality.

## [3.1.68] 2024-11-08

### Changed

- []() - Removed static data from the Svelte flow and integrated data from the GetOrganizationDetails API. Positioned the organization node at the center of the Svelte flow. Removed groups from the roles and access table that do not contain units.

## [3.1.68] 2024-11-07

### Changed

- []() - Updated the lending guide based on API responses, modified the code to display the N-1 refresh count, and fixed alignment and design issues in the member, group, and unit tables. Completed the add and search functionalities for the Manage Organization screen (Member, Group, Unit) with API integration, and implemented the edit functionality for the Member screen. Additionally, removed the radio button from the Add Unit popup.

## [3.1.67] 2024-11-06

### Added

- []() - Added Svelte Flow to display the tree of Organization, Group and unit in the Organization Structure Popup.

### Changed

- []() - Modified the code to display the message received from the GetProcessingResult API when the status is "NotFound". Fixed the issue on the "Create New Request" page where, during routing number validation, the focus was set to "account number" instead of "routing number" if the routing number was invalid. Additionally, added a loader to the dashboard that appears only when a single result is returned in the search. Modified Organization management screen as per the updated v4 figma design. Integrated the GetOrganizationDetails API to display the counts of users/units/groups. Integrated Group and Units API in this screen.

## [3.1.66] 2024-11-04

### Changed

- []() - Fixed an issue with the custom switch for the override lock on the group management screen, added a wrapper for all popups on the new screens, and made minor design-related changes.

## [3.1.65] 2024-11-01

### Changed

- []() - Updated the Role and Access Table component as per the latest figma design. Added User Profile screen in separate route. Updated the navigation links for Add user and manage access button.

## [3.1.64] 2024-10-25

### Added

- []() - Added Sidebar, Override Lock popup, Apply Changes popup, Group Details, Income, Lending Guide, Bank Connectivity Provider and Import and Export screen components.

### Changed

- []() - Changed Groups Management screen sections to load and render dynamically components.

## [3.1.63] 2024-10-22

### Changed

- []() - Fixed the issue where the historical reports count in the report screen top bar component was not matching the historical report table records.

## [3.1.62] 2024-10-21

### Changed

- []() - Integrated the change password API into the user profile screen. Implemented user profile image cropping and upload functionality using svelte-easy-crop. Changed all input fields on the user profile screen to read-only. Displayed user count in the units table and role names in the users table and user profile details card. Refactored the common button component and added different variant styles to it.

## [3.1.61] 2024-10-17

### Added

- []() - Added the Groups and Units management screen with nested tables, along with the Group and Units details management screen. Integrated the GetOrganizationUnits API for the nested group and units table, and the SetOrganizationUnits API in the New Entity Modal. Added Error pages for Users management and Group management.

### Changed

- []() - Renamed fields `bestDebitFrequency`, `bestDebitDateDate` and `SnapshotDate` to `debitFrequency`, `debitDate` and `snapshotDate`. Fixed issues with the Role and Access table checkbox selection.

## [3.1.60] 2024-10-15

### Changed

- []() - Integrated GetUser, SetUser, and GetUsers APIs in the User Profile and User Management screens. Added profile image upload in SetUser API and removed the Middle Name field from the User Profile. Implemented functionality for Roles and Permissions table with data mapping, nested groups display, and checkbox binding. Removed Application Access Card from User Management screen and updated some fields from the json to camel case.

## [3.1.59] 2024-10-10

### Changed

- []() - Refactored the Create Request Screen template and validation logic. Created common error screen components, including error title, description, buttons and the lottie. Refactored all error screens using reusable error components. Added new ia_error.lottie file for all the error animation. Removed all custom defined tailwind classes from all the components.

## [3.1.58] 2024-10-07

### Changed

- []() - Refactored the report page and added reusable components for the risk indicator and risk assessment. Removed unused code from the application discrepancy modal and fixed minor issues related to it. Additionally, added a loader to the dashboard while switching between "My Unit" and "All Units," refactored the import XLSX modal, and migrated the forecasted payday screen to Svelte 5.

## [3.1.57] 2024-10-04

### Changed

- []() - Completed the Svelte 5 migration for all components of the report screen, historical report screen, and all icons, also refactored the chart, calendar, and income breakdown (Source & Frequency) sections in the report screen. Additionally, fixed a minor issue with the dashboard screen.

## [3.1.56] 2024-10-02

### Changed

- []() - Added functionalities for the "Profile & Settings" page, refactored the code, and moved the API for GetProcessingResult to the server-side.

## [3.1.54] 2024-09-26

### Fixed

- []() - Migrate `/getRequestIds` calls to server-side

## [3.1.52] 2024-09-18

### Fixed 

- [PR-762](https://dev.azure.com/dmaassociates/CIP_IPM_Chirp/_git/CIP_IPM_FrontEnd/pullrequest/762) - When Transactions category is "Other", sort by `ibvCategory` (`report/Transactions.svelte`), and not by "Other" (because they were all "Other")

## [3.1.51] 2024-09-17

### Changed 

- [PR-760](https://dev.azure.com/dmaassociates/CIP_IPM_Chirp/_git/CIP_IPM_FrontEnd/pullrequest/760) - When Transactions category is "Other", show `ibvCategory` (`report/Transactions.svelte`)

## [3.1.50] 2024-08-22

### Changed 

- [PR-701](https://dev.azure.com/dmaassociates/CIP_IPM_Chirp/_git/CIP_IPM_FrontEnd/pullrequest/701) - updated Accounts Table in dashboard to have interactivity and loading indications

## [3.1.49] 2024-08-20

### Added 

- [PR-698](https://dev.azure.com/dmaassociates/Lead_Processing/_git/Troy_UI/pullrequest/698)- Added one different route to get the product processing result from the Chirp and added a re-direction URL to redirect to the requested page after login.