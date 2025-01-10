

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/date/UI5Date"
], function (Controller, JSONModel, UI5Date) {
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

            let cardManifests = new JSONModel()
            cardManifests.loadData(sap.ui.require.toUrl("forntend/model/cardManifests.json"));
            this.getView().setModel(cardManifests, "manifests");
          

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
            this._getCustomerDetails(_customerID)
            
        },
        onNavBack: function () {
            // Navigate back to the previous page (or another route)
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo('Routelist');
        },



        formatter: {
            Initials: function (iName) {
                iName = iName.split(' ')
                let Initials = ''
                iName.map(initial => {
                    Initials = Initials + initial[0]
                })
                console.log(Initials)
                return Initials
            }


        },

        _getCustomerDetails : function(customerID){
            let oCardManifestModel = this.getView().getModel("manifests");
            let url = `${this.getOwnerComponent().getModel("LibraryData").getServiceUrl()}customer(${customerID})?$expand=BorrowedBooks,Reviews`
            let objectCard = this.getView().byId('objectCard')
            let tableCard = this.getView().byId('tableCard')
            let reviewCard = this.getView().byId('reviewCard1')
            $.ajax({
                url:url,
                method:'GET',
                success: function(oData){
                    let oDynamicData = {
                        Name: oData.Name,
                        Email: oData.Email,
                        Phone: oData.Phone,
                        Address: oData.Address,
                        CustomerType : oData.CustomerType
                    };
                    console.log(oData.
                        Reviews
                        )
                    // console.log(oDynamicData)
                    oCardManifestModel.setProperty('/object/sap.card/data/json', oDynamicData)
                    oCardManifestModel.setProperty('/tableCard/sap.card/data/json', oData.BorrowedBooks)
                    oCardManifestModel.setProperty('/reviewCard/sap.card/content/data/json', oData.Reviews)
                    console.log(oCardManifestModel.getProperty('/reviewCard/sap.card'))
                    objectCard.refresh()
                    tableCard.refresh()
                    reviewCard.refresh()

                    
                },
                error:function(error){
                    console.log(error)
                }
            })
        },
        onCardReady: function (oCard) {
			console.log(oCard)
        }


    });
});
