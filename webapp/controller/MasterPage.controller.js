sap.ui.define([
	"sap/ui/core/mvc/Controller"
	
], function (Controller) {
	"use strict";

	return Controller.extend("com.bosch.training.MasterDetail.controller.MasterPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.bosch.training.MasterDetail.view.MasterPage
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		onItemPress: function(oEvent){
			const sItemPath = oEvent.getParameter("listItem").getBindingContext().sPath;
			const sProductId = sItemPath.split("/")[2];
			this.oRouter.navTo("DetailView", {ID: sProductId});
		}

	});

});