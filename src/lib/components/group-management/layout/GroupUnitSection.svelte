<script lang="ts">
  import { page } from "$app/state";
  import type { Component } from "svelte";
  import GroupUnitFooter from "$lib/components/group-management/layout/GroupUnitFooter.svelte";
  import GroupUnitHeader from "$lib/components/group-management/layout/GroupUnitHeader.svelte";
  import type { Claim, ClaimConfiguration } from "$lib/types/types";
  import ApplyChangesPopup from "$lib/components/group-management/popups/ApplyChangesPopup.svelte";
  import GroupsTabContent from "$lib/components/group-management/sections/GroupsTabContent.svelte";
  import UnitsTabContent from "$lib/components/group-management/sections/UnitsTabContent.svelte";
  import MembersTabContent from "$lib/components/group-management/sections/MembersTabContent.svelte";
  import GroupIcon from "$lib/icons/GroupIcon.svelte";
  import UnitIcon from "$lib/icons/UnitIcon.svelte";
  import AddUserIcon from "$lib/icons/AddUserIcon.svelte";
  type AsyncComponentLoader = () => Promise<{
    default: Component<any>;
  }>;

  let { activeTab }: { activeTab: string } = $props();
  // Menu object with component loaders
  const menuObject: Record<
    string,
    { header: string; component: AsyncComponentLoader }
  > = {
    Details: {
      header: "Details",
      component: () => import("../sections/GroupOrUnitDetails.svelte"),
    },
    Income: {
      header: "Income",
      component: () => import("../sections/AcceptedIncome.svelte"),
    },
    LendingGuide: {
      header: "Lending Guide",
      component: () => import("../sections/LendingGuide.svelte"),
    },
    IBVSettings: {
      header: "Choose Bank Connectivity Provider",
      component: () => import("../sections/BankConnectivity.svelte"),
    },
    AssessmentZones: {
      header: "Assessment Zones",
      component: () => import("../sections/AssessmentZones.svelte"),
    },
    APISettings: {
      header: "API Settings",
      component: () => import("../sections/ApiSettings.svelte"),
    },
    SubscriptionDetails: {
      header: "Subscription Details",
      component: () => import("../sections/Subscriptions.svelte"),
    },
  };

  // State management
  let CurrentComponent: Component<{
    configuration: ClaimConfiguration | undefined;
    setConfiguration: (config: ClaimConfiguration) => void;
    claimValue: string;
  }> | null = $state(null);

  let configuration = $state<ClaimConfiguration | undefined>(undefined);
  let claims = $derived.by(() => {
    return page.data.claims as Claim[];
  });
  let claimValue = $state<string>("Read");
  let pageHeader = $state("");
  let isLoading = $state(true);
  let isOpen = $state(false);
  let orgType = $derived.by(() => {
    let type = page.url.searchParams.get("type") || "";
    if (type) return type?.charAt(0)?.toUpperCase() + type?.slice(1);
    return "";
  });
  let revalidate = $state(true);

  const setConfiguration = (config: ClaimConfiguration) => {
    configuration = config;
  };

  const loadComponent = async (validate: boolean, _claims: Claim[]) => {
    const key =
      page.url.searchParams.get("subMenu") ||
      page.url.searchParams.get("menu") ||
      "";
    if (validate || key) {
      // let _menuObject: typeof menuObject = Object.keys(menuObject)
      //   .filter((key) =>
      //     page.data.claims.some(
      //       (claim: Claim) => claim.claimType === menuObject[key].header
      //     )
      //   )
      //   .reduce(
      //     (acc, key) => {
      //       acc[key] = menuObject[key];
      //       return acc;
      //     },
      //     {} as typeof menuObject
      //   );
      try {
        const loader = menuObject[key]?.component;
        if (loader) {
          const module = await loader();
          CurrentComponent = module.default;
          pageHeader =
            key === "Details"
              ? orgType + " " + menuObject[key].header
              : menuObject[key].header;
          configuration = _claims?.find(
            (item: Claim) => item?.claimType === key
          )?.configuration;
          claimValue =
            _claims?.find((item: Claim) => item?.claimType === key)
              ?.claimValue || "Read";
        } else {
          CurrentComponent = null;
        }
      } catch (e) {
        console.log(e);
      } finally {
        isLoading = false;
        revalidate = false;
      }
    }
  };
  $effect(() => {
    loadComponent(revalidate, claims);
  });
</script>

{#key revalidate}
  <div
    class="rounded-md bg-white shadow-md flex p-6 flex-col items-start w-full"
  >
    {#if CurrentComponent && activeTab === "Settings"}
      <div class="flex flex-col gap-10 w-full">
        <GroupUnitHeader title={pageHeader} />
        <CurrentComponent {configuration} {setConfiguration} {claimValue} />
        {#if !(page.url.searchParams.get("menu") === "APISettings" || page.url.searchParams.get("menu") === "SubscriptionDetails")}
          <GroupUnitFooter
            disabled={claimValue !== "Edit"}
            onSaveClick={() => (isOpen = true)}
            onCancelClick={() => (revalidate = true)}
          />
        {/if}
      </div>
    {:else}
      <div class="grid gap-4 grid-flow-row grid-cols-1 w-full">
        {#if activeTab === "Groups"}
          <GroupUnitHeader
            title={"Manage Groups"}
            buttonLabel={"Add Group"}
            ButtonIcon={GroupIcon}
            disabled
          />
          <GroupsTabContent />
        {:else if activeTab === "Units"}
          <GroupUnitHeader
            title={"Manage Units"}
            buttonLabel={"Add Unit"}
            ButtonIcon={UnitIcon}
            disabled
          />
          <UnitsTabContent />
        {:else if activeTab === "Members"}
          <GroupUnitHeader
            title={"Manage Members"}
            buttonLabel={"Add Member"}
            ButtonIcon={AddUserIcon}
            disabled
          />
          <MembersTabContent />
        {/if}
      </div>

      <!-- <div class="flex items-center justify-center w-full p-4">
      {isLoading ? "Loading..." : "404"}
    </div> -->
    {/if}
  </div>

  <ApplyChangesPopup bind:isOpen {configuration} />
{/key}
