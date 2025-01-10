

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

                var oUIModel = new sap.ui.model.json.JSONModel({
                    editMode: true,  
                    saveMode: false, 
                    tableEdit : false
                    
                });
                this.getView().setModel(oUIModel, "ui");
            
                


            },
            onBookListItemPress: function (oEvent) {

                const oSelectedItem = oEvent.getParameter("listItem");
                const oContext = oSelectedItem.getBindingContext("LibraryData");
                console.log(oContext)
                console.log(oContext.getObject())
                const sId = oContext.getObject().BookID;
                console.log(sId)
                let oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("RouteBookdetail", { entityName2: "book", entityId2: sId });

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
                this._FilterHandler("Title", oEvent.getSource().getValue(), 'bookTable') 
                // this._FilterHandler("ISBN", oEvent.getSource().getValue(), 'bookTable')

            },

            onTitleSearch: function (oEvent) {
                const searchValue = oEvent.getSource().getValue();
                const oBinding = this.byId("bookTable").getBinding("items");

                console.log(oBinding.getModel())

            },
            onSearchBorrowCustomer : function(oEvent){
                this._FilterHandler("CustomerName", oEvent.getSource().getValue(), 'borrowedTable')
            },

            onSearchCustomer : function(oEvent){
                this._FilterHandler("Name", oEvent.getSource().getValue(), 'customerTable')
            },

            _FilterHandler: function (field, query, tableName) {
                let aFilter = [];
                let sQuery = query
                if (sQuery && sQuery.length > 0) {

                    let oUniversalFilter = new Filter(
                        field, FilterOperator.Contains, sQuery
                    );
                    aFilter.push(oUniversalFilter);

                }
                let oListItems = this.byId(tableName)
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
                        customerId: sBookId
                    });
                }
            },

            
            
            onEditBorrowedBook: function () {
                var oUIModel = this.getView().getModel("ui");
                oUIModel.setProperty("/editMode", false); // Hide Edit button
                oUIModel.setProperty("/saveMode", true); // Show Save/Cancel buttons
                oUIModel.setProperty("/tableEdit", true);
            
                // Set the selected row as editable
                var oModel = this.getView().getModel("LibraryData");
                var oSelectedRow = oUIModel.getProperty("/selectedRow");
                console.log(oSelectedRow
                )
                oModel.refresh();
            },
            
            onSaveBorrowedBook: function () {
                var oUIModel = this.getView().getModel("ui");
                oUIModel.setProperty("/editMode", true);  // Show Edit button
                oUIModel.setProperty("/saveMode", false); // Hide Save/Cancel buttons
                oUIModel.setProperty("/tableEdit", false);
            
                // Save the data to the backend (optional)
                var oModel = this.getView().getModel("LibraryData");
                oModel.refresh();
            },
            
            onCancelEditBorrowedBook: function () {
                var oUIModel = this.getView().getModel("ui");
                oUIModel.setProperty("/editMode", true);  // Show Edit button
                oUIModel.setProperty("/saveMode", false); // Hide Save/Cancel buttons
                oUIModel.setProperty("/tableEdit", false);
            
                // Reset the editable state of the selected row
                var oModel = this.getView().getModel("LibraryData");
                var oSelectedRow = oUIModel.getProperty("/selectedRow");
                oSelectedRow.editable = false;
                oModel.refresh();
            },
            onNewBorrow: function (oEvent) {
               
            }
            
            


        });
    });
