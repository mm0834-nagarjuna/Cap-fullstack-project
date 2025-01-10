sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/model/json/JSONModel"],function(e,t){"use strict";return e.extend("forntend.controller.bookDetail",{onInit:function(){this.oRouter=this.getOwnerComponent().getRouter();var e=new t({bEditMode:false});this.getView().setModel(e,"view");let o=new t({});this.getView().setModel(o,"RatingData");this.oRouter.getRoute("RouteBookdetail").attachPatternMatched(this._onBookMatched,this)},_onBookMatched:function(e){let t=e.getParameter("arguments").bookId;let o=e.getParameter("arguments").ISBN;if(o){console.log("Fetching rating for ISBN:",o);this.getRating(o)}if(t){this.getView().bindElement({path:`/book('${t}')`,model:"LibraryData",parameters:{expand:"Author, Reviews"}})}},onNavBack:function(){const e=this.getView().getModel("view");const t=this.getOwnerComponent().getRouter();t.navTo("Routelist");e.setProperty("/bEditMode",false);const o=this.getView().byId("nStock");if(o){o.setValue("")}},onEditToggleButtonPress:function(){var e=this.getView().getModel("view");var t=e.getProperty("/bEditMode");e.setProperty("/bEditMode",!t)},onSavePress:function(){var e=this.getView().getModel("view");e.setProperty("/bEditMode",false)},onCancelPress:function(){var e=this.getView().getModel("view");e.setProperty("/bEditMode",false)},formatter:{statusState:function(e){return e>0?"Success":"Error"},stockWarning:function(e){return e<=0?"Out of Stock":e}},onNewStockLiveChange:function(e){var t=this.getView().byId("stock");if(!t){console.error("Stock input field not found.");return}var o=parseFloat(t.getValue())||0;var n=e.getParameter("newValue")||"0";var r=e.getSource().data("prevValue")||"0";var a=parseFloat(r);var i=parseFloat(n);var s=i-a;var g=o+s;t.setValue(g.toString());e.getSource().data("prevValue",n)},getRating:function(e){let t=this.getView().getModel("RatingData");let o=`${this.getOwnerComponent().getModel("LibraryData").getServiceUrl()}getAverageRating`;console.log("Fetching rating from:",o);$.ajax({url:o,method:"POST",contentType:"application/json",data:JSON.stringify({bookISBN:e}),success:function(e){console.log("Rating response:",e.value);t.setData(e.value)},error:function(e){console.error("Error fetching rating:",e)}})}})});
//# sourceMappingURL=bookDetail.controller.js.map