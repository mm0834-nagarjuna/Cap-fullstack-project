sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("forntend.controller.bookDetail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("RouteBookdetail").attachPatternMatched(this._onBookMatched, this);

            // Initialize edit mode model
            var oViewModel = new JSONModel({
                bEditMode: false
            });
            this.getView().setModel(oViewModel, "view");
        },

        _onBookMatched: function (oEvent) {
            let _bookID = oEvent.getParameter("arguments").entityId2;

            if (_bookID) {
                this.getView().bindElement({
                    path: `/book('${_bookID}')`,
                    model: "LibraryData",
                    parameters: {
                        expand: "Author, Reviews"
                    }
                });
            }
        },
        onNavBack: function () {
            const oViewModel = this.getView().getModel("view");

            // Navigate back to the previous page (or another route)
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('Routelist');

            // Reset the edit mode state to initial (false)
            oViewModel.setProperty("/bEditMode", false);
            this.getView().byId("nStock").setValue();
        },
        

        onEditToggleButtonPress: function () {
            var oViewModel = this.getView().getModel("view");
            var bEditMode = oViewModel.getProperty("/bEditMode");
            oViewModel.setProperty("/bEditMode", !bEditMode);
        },

        onSavePress: function () {
            // Save changes
            var oViewModel = this.getView().getModel("view");
            oViewModel.setProperty("/bEditMode", false);
            // Additional save logic here
        },

        onCancelPress: function () {
            // Cancel changes
            var oViewModel = this.getView().getModel("view");
            oViewModel.setProperty("/bEditMode", false);
            // Additional cancel logic here
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
        onNewStockLiveChange: function (oEvent) {
            // Retrieve the stock input field
            var oStock = this.getView().byId("stock");
        
            // Get the current stock value
            var nCurrentStock = Number(oStock.getValue()) || 0;
        
            // Get the new value of nStock
            var sNewStockValue = oEvent.getParameter("newValue") || "0";
        
            // Get the previous value of nStock stored in data
            var sPrevStockValue = oEvent.getSource().data("prevValue") || "0";
        
            // Calculate the numeric values
            var nPrevStock = Number(sPrevStockValue);
            var nNewStock = Number(sNewStockValue);
        
            // Calculate the difference between previous and new nStock
            var delta = nNewStock - nPrevStock;
        
            // Update the total stock based on the delta
            var finalStock = nCurrentStock + delta;
        
            // Set the updated stock value
            oStock.setValue(String(finalStock));
        
            // Store the new value of nStock in data for the next calculation
            oEvent.getSource().data("prevValue", sNewStockValue);
        },
        
        
        
    });
});
