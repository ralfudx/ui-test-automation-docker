"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Spikerz_1 = __importDefault(require("../pages/Spikerz"));
const spikerzData = Cypress.env('spikerz');
describe('Spikerz ui test functionality', function () {
    beforeEach(function () {
        cy.viewport('macbook-15');
        Spikerz_1.default.userLogin('/', Cypress.env('users').userWithAccess);
    });
    it('verify successful user log in', function () {
        Spikerz_1.default.verifySignedInUser(spikerzData);
    });
    it('verify social connect with youtube', function () {
        Spikerz_1.default.navigateToPage(spikerzData.socialConnectUrlSlug, Cypress.env('users').userWithAccess);
        cy.loginByGoogleApi();
        Spikerz_1.default.verifySocialConnectPage(spikerzData);
        Spikerz_1.default.verifySocialConnectCardsDisplayed(spikerzData);
        Spikerz_1.default.clickSocialConnectCard(spikerzData.socialConnectCardNames[3]);
        Spikerz_1.default.verifyConnectWithSocialPage(spikerzData.socialConnectCardNames[3]);
        Spikerz_1.default.clickConnectWithYoutube();
        // commenting this out till the google auth issue is sorted
        // Spikerz.confirmYoutubeConnection(spikerzData);
    });
    it('verify page navigation for all menu items', function () {
        Spikerz_1.default.verifySignedInUser(spikerzData);
        Spikerz_1.default.verifyMenuItemPage(spikerzData);
    });
});
