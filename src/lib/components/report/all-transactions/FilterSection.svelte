<script lang="ts">
  import type {
    IncomeSourceProp,
    Transaction,
    TransactionDropDownNames,
    TransactionDropDowns,
  } from "$lib/types/report.types";
  import { onMount } from "svelte";
  import {
    convertIncomeType,
    getMonthYear,
    getSourceNameById,
  } from "../../../../routes/report/[id]/utils";
  import TransactionFilterDropdown from "$lib/components/report/all-transactions/TransactionFilterDropdown.svelte";

  let {
    allNames = $bindable(),
    allTransaction,
    incomeSources,
    allDropDown = $bindable(),
  }: {
    allNames: TransactionDropDownNames;
    allTransaction: Transaction[] | [];
    incomeSources: IncomeSourceProp[];
    allDropDown: TransactionDropDowns;
  } = $props();

  let transactionType = $state([{ name: "All", checked: true }]);

  let month = $state([{ name: "All", checked: true }]);
  let depositDay = $state([
    { name: "All", checked: true },
    { name: "Mon", checked: true },
    { name: "Tue", checked: true },
    { name: "Wed", checked: true },
    { name: "Thr", checked: true },
    { name: "Fri", checked: true },
    { name: "Sat", checked: true },
    { name: "Sun", checked: true },
  ]);
  let depositType = $state([{ name: "All", checked: true }]);
  let incomeType = $state([
    { name: "All", checked: true },
    { name: "1", checked: true },
    { name: "2", checked: true },
    { name: "3", checked: true },
    // { name: "4", checked: true },
    { name: "5", checked: true },
    { name: "6", checked: true },
    { name: "0", checked: true },
  ]);
  let incomeSource = $state([{ name: "All", checked: true }]);
  let initialIncomeSources = $state([{ name: "All", checked: true }]);

  const handleCheckboxChange = (
    event: any,
    index: any,
    dropdown: any,
    dropdownName: any
  ) => {
    //on dropdown checkbox selection
    const checkboxes = dropdown;
    checkboxes[index].checked = event.target.checked;
    if (index === 0) {
      checkboxes.slice(1).forEach((checkbox: any) => {
        checkbox.checked = event.target.checked;
      });
    } else if (
      !checkboxes.slice(1).some((checkbox: any) => !checkbox.checked)
    ) {
      checkboxes[0].checked = true;
    } else {
      checkboxes[0].checked = false;
    }
    setDropdownValues(checkboxes, dropdownName);
  };

  const checkOnlyOne = (
    event: any,
    index: any,
    dropdown: any,
    dropdownName: any
  ) => {
    event.preventDefault();
    const checkboxes = dropdown.map((checkbox: any, i: number) => ({
      ...checkbox,
      checked: i === index ? true : false,
    }));
    setDropdownValues(checkboxes, dropdownName);
  };

  const setDropdownValues = (value: any, name: string) => {
    if (name === "transactionType") {
      transactionType = value;
    }
    if (name === "month") {
      month = value;
    }
    if (name === "depositDay") {
      depositDay = value;
    }
    if (name === "depositType") {
      depositType = value;
    }
    if (name === "incomeType") {
      incomeType = value;
    }
    if (name === "incomeSource") {
      incomeSource = value;
    }
  };

  const getSelectedCheckboxNames = (dropdownName: any, name: string) => {
    const checkboxes = dropdownName;
    const allDropDownNames = { ...allNames };
    const selectedNames = checkboxes
      .slice(1)
      .filter((checkbox: any) => checkbox.checked)
      .map((checkbox: any) =>
        name === "incomeTypeName"
          ? convertIncomeType(checkbox.name)
          : checkbox.name
      );
    allDropDownNames[name as keyof TransactionDropDownNames] =
      selectedNames.length === checkboxes.length - 1
        ? "All"
        : selectedNames.length === 0
          ? "Select"
          : selectedNames.join(", ");
    if (name === "incomeTypeName") {
      allDropDownNames.incomeSourceName = "All";
    }
    allNames = allDropDownNames;
    showHideDropdowns("all");
  };
  const showHideDropdowns = (name: string) => {
    //hide show checkbox
    let dropdowns = { ...allDropDown };
    if (name === "all") {
      dropdowns.transactionDropdown = false;
      dropdowns.monthDropdown = false;
      dropdowns.depositDayDropdown = false;
      dropdowns.depositTypeDropdown = false;
      dropdowns.incomeTypeDropdown = false;
      dropdowns.incomeSourceDropdown = false;
    } else {
      if (dropdowns[name as keyof TransactionDropDowns] === true) {
        dropdowns[name as keyof TransactionDropDowns] = false;
      } else {
        dropdowns[name as keyof TransactionDropDowns] = true;
        for (let key in dropdowns) {
          if (key !== name) {
            dropdowns[key as keyof TransactionDropDowns] = false;
          }
        }
      }
    }
    allDropDown = dropdowns;
  };

  const setTransactionSourceDropDownValue = (value: string) => {
    if (value === "All") {
      incomeSource = initialIncomeSources;
      return;
    }

    let data: {
      name: string;
      checked: boolean;
    }[] = [];
    initialIncomeSources.forEach((item: { name: string; checked: boolean }) => {
      if (item.name === "All") {
        data.push(item);
      } else {
        const exists = incomeSources.find(
          (source) => source.sourceID === item.name
        );
        if (exists?.sourceID) {
          if (allNames.incomeTypeName.includes(exists?.type)) {
            data.push(item);
          }
        }
      }
    });
    incomeSource = data;
  };
  const getSelectedSourceNames = (nameArray: string) => {
    const sourceIDs = nameArray.split(", ");
    let selectedSourceNames: string = "";
    sourceIDs.forEach((item: string) => {
      selectedSourceNames =
        selectedSourceNames !== ""
          ? selectedSourceNames + ", " + getSourceNameById(item, incomeSources)
          : getSourceNameById(item, incomeSources);
    });
    return selectedSourceNames;
  };

  $effect(() => {
    setTransactionSourceDropDownValue(allNames.incomeTypeName);
  });

  onMount(() => {
    if (allTransaction.length > 0) {
      allTransaction.forEach((obj: any) => {
        // if (obj.incomeType == "4" || obj.incomeType == 4) {
        //   obj.incomeType = "3";
        // }
        // // Handle DEBIT transactions
        // if (obj.transactionType === "DEBIT") {
        //   obj.amount *= -1;
        // }

        // // Set sourceName
        // obj.sourceName = getSourceNameById(obj.sourceID, incomeSources);

        //transaction Type
        const transactionTypeExist = transactionType.find(
          (item) => item.name === obj.transactionType
        );

        if (!transactionTypeExist) {
          transactionType.push({
            name: obj.transactionType,
            checked: true,
          });
        }

        // income source
        const incomeSourceExist = incomeSource.find(
          (item) => item.name === obj.sourceID
        );
        if (!incomeSourceExist) {
          incomeSource.push({
            name: obj.sourceID,
            checked: true,
          });
        }

        // Deposit Type
        const depositTypeExist = depositType.find(
          (item) => item.name === obj.depositType
        );
        if (!depositTypeExist) {
          depositType.push({
            name: obj.depositType,
            checked: true,
          });
        }

        // Update or add to month array
        const date = getMonthYear(obj.date);
        const monthExist = month.find((item) => item.name === date);
        if (!monthExist) {
          month.push({
            name: date,
            checked: true,
          });
        }
        incomeSource.sort((a, b) => a.name.localeCompare(b.name));
      });
      initialIncomeSources = incomeSource;
      //   updateDataOnFilter();
    }
  });
</script>

<TransactionFilterDropdown
  {incomeSources}
  label="Transaction Type:"
  selectedName={allNames.transactionTypeName
    ? allNames.transactionTypeName
    : "Select"}
  isOpen={allDropDown.transactionDropdown}
  bind:items={transactionType}
  handleButtonClick={() => showHideDropdowns("transactionDropdown")}
  {handleCheckboxChange}
  {checkOnlyOne}
  {getSelectedCheckboxNames}
  {convertIncomeType}
  category={transactionType}
  categoryName="transactionTypeName"
  checkOnlyOneCategory="transactionType"
  ariaLabelledBy="menu-button"
  visibility={true}
/>
<TransactionFilterDropdown
  {incomeSources}
  label="Month:"
  selectedName={allNames.monthName ? allNames.monthName : "Select"}
  isOpen={allDropDown.monthDropdown}
  bind:items={month}
  handleButtonClick={() => showHideDropdowns("monthDropdown")}
  {handleCheckboxChange}
  {checkOnlyOne}
  {getSelectedCheckboxNames}
  {convertIncomeType}
  category={month}
  categoryName="monthName"
  checkOnlyOneCategory="month"
  ariaLabelledBy="menu-button"
  visibility={true}
/>

<TransactionFilterDropdown
  {incomeSources}
  label="Transaction Day:"
  selectedName={allNames.depositDayName ? allNames.depositDayName : "Select"}
  isOpen={allDropDown.depositDayDropdown}
  bind:items={depositDay}
  handleButtonClick={() => showHideDropdowns("depositDayDropdown")}
  {handleCheckboxChange}
  {checkOnlyOne}
  {getSelectedCheckboxNames}
  {convertIncomeType}
  category={depositDay}
  categoryName="depositDayName"
  checkOnlyOneCategory="depositDay"
  ariaLabelledBy="menu-button"
  visibility={true}
/>

<TransactionFilterDropdown
  {incomeSources}
  label="Category:"
  selectedName={allNames.incomeTypeName ? allNames.incomeTypeName : "Select"}
  isOpen={allDropDown.incomeTypeDropdown}
  bind:items={incomeType}
  handleButtonClick={() => showHideDropdowns("incomeTypeDropdown")}
  {handleCheckboxChange}
  {checkOnlyOne}
  {getSelectedCheckboxNames}
  {convertIncomeType}
  category={incomeType}
  categoryName="incomeTypeName"
  checkOnlyOneCategory="incomeType"
  ariaLabelledBy="menu-button"
  visibility={true}
/>

<TransactionFilterDropdown
  {incomeSources}
  label="Transaction Sources:"
  selectedName={allNames.incomeSourceName
    ? getSelectedSourceNames(allNames.incomeSourceName)
    : "Select"}
  isOpen={allDropDown.incomeSourceDropdown}
  bind:items={incomeSource}
  handleButtonClick={() => showHideDropdowns("incomeSourceDropdown")}
  {handleCheckboxChange}
  {checkOnlyOne}
  {getSelectedCheckboxNames}
  {convertIncomeType}
  category={incomeSource}
  categoryName="incomeSourceName"
  checkOnlyOneCategory="incomeSource"
  ariaLabelledBy="menu-button"
  visibility={incomeSource?.length > 1}
/>
