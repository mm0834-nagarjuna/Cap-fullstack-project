

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
                this._FilterHandler("ISBN", oEvent.getSource().getValue())

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
            

            onListItemPress: function (oEvent) {
                // Get the selected list item and its binding context
                var oListItem = oEvent.getSource();
                var oBindingContext = oListItem.getBindingContext("LibraryData");
             
                // Determine the selected IconTabFilter
                var sSelectedTab = this.getView().byId("idIconTabBarStretchContent").getSelectedKey();
                console.log(sSelectedTab)
                // Navigate to the appropriate detail page
                if (sSelectedTab === "Book") {
                   // Extract book ID and navigate to BookDetail
                   console.log(oBindingContext.getProperty("BookID"))
                   var sBookId = oBindingContext.getProperty("BookID");
                   var sBookISBN = oBindingContext.getProperty("ISBN");
                   this.getOwnerComponent().getRouter().navTo("RouteBookdetail", {
                    bookId: sBookId, ISBN: sBookISBN
                   });
                } else if (sSelectedTab === "Customer") {
                   // Extract customer ID and navigate to CustomerDetail
                   console.log(oBindingContext.getProperty("CustomerId"))
                   var sBookId = oBindingContext.getProperty("CustomerId");
                   this.getOwnerComponent().getRouter().navTo("RouteCustomerDetail", {
                    customerId : sBookId
                   });
                }
             }
             
        });
    });
