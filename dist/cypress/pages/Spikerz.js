"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint sonarjs/no-duplicate-string: 0 */
/* eslint @typescript-eslint/no-shadow: 0 */
Object.defineProperty(exports, "__esModule", { value: true });
const spikerzLogo = 'div[class="sidebar-logo"] > a > img:nth-child(2)';
const userProfileButton = 'button[nzoverlayclassname="main-menu-dropdown"] div';
const headerTitleContainer = 'div[class*="giant-section-title"] > h4';
const menuItems = 'span[class="ant-menu-title-content"] > a > span';
const ConnectWithYoutubeImage = 'span[class="content-wrapper no-filter"] > img';
const socialConnectCards = 'div[class="ant-card-body"] > div > div:nth-child(2)';
const gmailEmailInput = 'input#identifierId';
const gmailPasswordInput = 'input[name="Passwd"]';
const selectAllCheckbox = 'div#selectioni1';
const Spikerz = {
    userLogin(urlSlug, user) {
        cy.visit(urlSlug, {
            auth: {
                username: user.username,
                password: user.password,
            },
        });
    },
    verifySignedInUser(spikerz) {
        cy.get(spikerzLogo)
            .should('be.visible')
            .and('have.attr', 'alt', spikerz.logoText);
        cy.get(userProfileButton)
            .should('be.visible');
        cy.get('h5').contains(spikerz.overviewHeaderText)
            .should('be.visible');
    },
    userLogOut(spikerz) {
        cy.get(userProfileButton).should('be.visible').click();
        cy.get('span').contains(spikerz.logoutText).should('be.visible').click();
    },
    navigateToPage(urlSlug, user) {
        this.userLogin(urlSlug, user);
    },
    verifyPageHeaderText(headerText) {
        cy.get(headerTitleContainer)
            .should('be.visible')
            .and('contain', headerText);
    },
    verifySocialConnectPage(spikerz) {
        cy.get('h4').contains(spikerz.socialConnectHeaderText)
            .should('be.visible');
        cy.get('div').contains(spikerz.socialConnectSubHeaderText)
            .should('be.visible');
        cy.get(socialConnectCards)
            .should('be.visible')
            .and('have.length', 6);
    },
    verifySocialConnectCardsDisplayed(spikerz) {
        Cypress._.forEach(spikerz.socialConnectCardNames, (cardName) => {
            cy.get(socialConnectCards).contains(cardName)
                .should('be.visible');
        });
    },
    clickSocialConnectCard(cardName) {
        cy.get(socialConnectCards).contains(cardName)
            .should('be.visible').click();
    },
    verifyConnectWithSocialPage(cardName) {
        cy.get('h4').contains(`Connect with ${cardName}`)
            .should('be.visible');
    },
    clickConnectWithYoutube() {
        cy.get(ConnectWithYoutubeImage)
            .should('be.visible').click();
    },
    gmailUserLogin(user) {
        cy.get(gmailEmailInput).type(user.username);
        cy.get('span').contains('Next').click();
        cy.get(gmailPasswordInput).type(user.password);
        cy.get('span').contains('Next').click();
        //skip 2-step verification
        cy.get(selectAllCheckbox)
            .should('be.visible').click();
        cy.get('span').contains('Continue').click();
    },
    confirmYoutubeConnection(spikerz) {
        this.verifyConnectWithSocialPage(spikerz.socialConnectCardNames[3]);
        cy.get('h5').contains(spikerz.confirmDetailsText)
            .should('be.visible');
        cy.get('div').contains(spikerz.youtubeHandle)
            .should('be.visible');
    },
    verifyMenuItemPage(spikerz) {
        Cypress._.forEach(spikerz.menuTitles, (menuTitle) => {
            if (menuTitle != spikerz.menuTitles[0]) {
                cy.get(menuItems).contains(menuTitle)
                    .should('be.visible').click({ force: true });
                this.verifyPageHeaderText(menuTitle);
            }
            ;
        });
    },
};
exports.default = Spikerz;
