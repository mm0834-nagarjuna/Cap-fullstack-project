

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/Column",
    "sap/m/ColumnListItem",
    "sap/m/Text",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment",


],
    function (Controller, MessageToast, Column, ColumnListItem, Text, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("frontend.controller.List", {
            onInit: function () {
                this.oModel = this.getOwnerComponent().getModel("LibraryData");
                this.oTitleSearch = this.byId('genreTitleSearch')
                this.oInitialSearch = this.byId('allTitleSearch')




            },
            onBookListItemPress: function (oEvent) {

                const oSelectedItem = oEvent.getParameter("listItem");
                const oContext = oSelectedItem.getBindingContext("LibraryData");
                console.log(oContext)
                console.log(oContext.getObject())
                const sId = oContext.getObject().BookID;
                console.log(sId)
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteBookdetail", { entityName2: "book", entityId2:sId });

            },


            formatter: {
                statusState: function (iStock) {

                    if (iStock > 0) {
                        return "Success";
                    }
                    return "Error";
                },
                stockWarning: function (sCount) {
                    if (sCount <= 0) {
                        return "Out of Stock"
                    }
                    return sCount
                }
            },
            onSearchBookTitle: function (oEvent) {
                this._FilterHandler("Title", oEvent.getSource().getValue())

            },


            onSelectionFinish: function (oEvent) {
                // Retrieve all selected items
                let selectedItems = oEvent.getParameter("selectedItems");
                let aFilter = [];

                // If there are selected items, create filters for each one
                if (selectedItems && selectedItems.length > 0) {
                    selectedItems.forEach((item) => {
                        let genre = item.getText();
                        let oBookFilter = new Filter("Genre", FilterOperator.Contains, genre);

                        // toggle for search field
                        if (this.oTitleSearch.setVisibleInFilterBar(false) && this.oInitialSearch.setVisibleInFilterBar(true)) {
                            this.oTitleSearch.setVisibleInFilterBar(true);
                            this.oTitleSearch.setVisible(true)
                            this.oInitialSearch.setVisibleInFilterBar(false);
                            this.oInitialSearch.setVisible(false)
                        } else {
                            console.log("this.oTitleSearch and this.oInitialSearch are else block")
                        }
                        aFilter.push(oBookFilter);
                    });

                } else {
                    this.oTitleSearch.setVisibleInFilterBar(false);
                    this.oTitleSearch.setVisible(false)
                    this.oInitialSearch.setVisibleInFilterBar(true);
                    this.oInitialSearch.setVisible(true)
                }

                // Update the table binding with the new filters
                let oListItems = this.byId('bookTable');
                let oBinding = oListItems.getBinding("items");
                oBinding.filter(aFilter);

            },
            onTitleSearch: function (oEvent) {
                const searchValue = oEvent.getSource().getValue();
                const oBinding = this.byId("bookTable").getBinding("items");

                console.log(oBinding.getModel())

            },

            _FilterHandler: function (field, query) {
                let aFilter = [];
                let sQuery = query
                if (sQuery && sQuery.length > 0) {

                    let oBookFilter = new Filter(
                        field, FilterOperator.Contains, sQuery
                    );
                    aFilter.push(oBookFilter);

                }
                let oListItems = this.byId('bookTable')
                let oBinding = oListItems.getBinding("items");
                oBinding.filter(aFilter);
            },
            onFilterClear: function () {
                // Avoid recursive calls using a flag
                if (this._isClearingFilters) {
                    return;
                }

                try {
                    // Set the flag to true to prevent recursion
                    this._isClearingFilters = true;

                    // Clear the FilterBar filters
                    let oFilterBar = this.byId("filterbar");
                    let oMultiComboBox = this.byId('genreSelectionBox')
                    let oSearchField = this.byId('searchField')
                    let oSearchField1 = this.byId('titleSearchField')


                    if (oFilterBar) {
                        oFilterBar.clear();
                        oMultiComboBox.setSelectedKeys([]);
                        oSearchField.setValue("")
                        oSearchField1.setValue('')
                        this.oTitleSearch.setVisibleInFilterBar(false);
                        this.oTitleSearch.setVisible(false)
                        this.oInitialSearch.setVisibleInFilterBar(true);
                        this.oInitialSearch.setVisible(true)

                    }

                    // Clear the filters in the associated table or list binding
                    let oTable = this.byId("bookTable");
                    if (oTable) {
                        let oBinding = oTable.getBinding("items");
                        if (oBinding) {
                            oBinding.filter([]);
                        }
                    }
                } finally {
                    // Reset the flag after operation
                    this._isClearingFilters = false;
                }
            },
            onCustomerListItemPress : function(oEvent){
                console.log(oEvent)
                const oSelectedItem = oEvent.getParameter("listItem");
                const oContext = oSelectedItem.getBindingContext("LibraryData");
                console.log(oContext.getObject())
                const sId = oContext.getObject().CustomerId;
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteCustomerDetail", {customerId:sId});
            }
        });
    });
