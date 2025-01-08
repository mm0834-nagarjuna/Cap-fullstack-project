sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("forntend.controller.customerDetail", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("RouteCustomerDetail").attachPatternMatched(this._onCustomerMatched, this);

            // Initialize edit mode model
            var oViewModel = new JSONModel({
                bEditMode: false
            });
            this.getView().setModel(oViewModel, "view");
        },

        _onCustomerMatched: function (oEvent) {
            let _customerID = oEvent.getParameter("arguments").customerId;

            if (_customerID) {
                this.getView().bindElement({
                    path: `/customer(${_customerID})`,
                    model: "LibraryData",
                    parameters: {
                        expand: "BorrowedBooks, Reviews"
                    }
                });
            }
        },
        onNavBack: function () {
            // Navigate back to the previous page (or another route)
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('Routelist');
        },
        

        
        formatter: {
            Initials : function (iName){
                iName = iName.split(' ')
                let Initials = ''
                iName.map(initial => {
                    Initials = Initials + initial[0]
                })
                return Initials
            }

            
        },
        
        
    });
});
