sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function (Controller, JSONModel, Fragment) {
	"use strict";

	return Controller.extend("com.bosch.training.MasterDetail.controller.DetailPage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.bosch.training.MasterDetail.view.DetailPage
		 */
		onInit: function () {
			// Get the Router Object
			const oRouter = this.getOwnerComponent().getRouter();
			// Attaching the Route Pattern Matched Event
			oRouter.attachRoutePatternMatched(this.onProductLoad, this);

		},
		onProductLoad: function (oEvent) {
			// Getting the Product ID from the URL
			const sProductId = oEvent.getParameter("arguments").ID;
			// here we have stored the array values in the OData variable
			const oData = this.getView().getModel().getData().value;
			// Filterring the product id from the array
			const sSelectedItem = oData.filter(product => product.ID === parseInt(sProductId));
			// Creating the json model and setting up in the view.
			this.getView().setModel(new JSONModel(sSelectedItem[0]), "Product");
		},
		onCreateNewProduct: async function (oEvent) {
			// Json Model for tracking the create Request
			this.getView().setModel(new JSONModel({
					Categories: [],
					ID: 0,
					Name: "",
					Description: ""
				}), "createProduct")
				// Location of the Fragment
			const sFragmentName = "com.bosch.training.MasterDetail.fragments.CreateProduct";
			// Creating the Fragment
			if (!this.oCreateDialog) {
				this.oCreateDialog = await Fragment.load({
					id: this.getView().getId(),
					name: sFragmentName,
					controller: this
				});
			}
			// 
			this.getView().addDependent(this.oCreateDialog);
			// Open the Fragment
			this.oCreateDialog.open();
		},
		onCancel: function () {
			if (this.oCreateDialog) {
				this.oCreateDialog.close();
			}
		},
		onSaveDetails: function () {
			// Get binding Data
			const oData = this.getView().getModel("createProduct").getData();
			const sCatgoryId = this.getView().byId("idCategoryID").getValue();
			const sCategoryName = this.getView().byId("idCategoryName").getValue();
			oData.Categories.push({
				ID: sCatgoryId,
				Name: sCategoryName
			});
			oData.ID = parseInt(oData.ID);
			this.getView().getModel().getData().value.push(oData);
			this.getView().getModel().refresh(true);
			if (this.oCreateDialog) {
				this.oCreateDialog.close();
			}
			this.getView().byId("idCategoryID").setValue("");
			this.getView().byId("idCategoryName").setValue("");
		}
	});

});