/*global QUnit*/

sap.ui.define([
	"com/bosch/training/MasterDetail/controller/Root.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Root Controller");

	QUnit.test("I should test the Root controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});