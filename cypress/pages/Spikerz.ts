/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint sonarjs/no-duplicate-string: 0 */
/* eslint @typescript-eslint/no-shadow: 0 */

import { SpikerzData } from "../test_data/spikerz";

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
  userLogin(urlSlug: string, username?: string, password?: string) {
    const userUsername = username || Cypress.env("USER_USERNAME");
    const userPassword = password || Cypress.env("USER_PASSWORD");
    cy.visit(urlSlug, {
      auth: {
        username: userUsername,
        password: userPassword,
      },
    });
    Cypress.log({
      name: "login",
      message: `Logged in as ${userUsername}`,
    });
  },

  verifySignedInUser(spikerz: SpikerzData) {
    cy.get(spikerzLogo)
      .should('be.visible')
      .and('have.attr', 'alt', spikerz.logoText);
    cy.get(userProfileButton)
      .should('be.visible');
    cy.get('h5').contains(spikerz.overviewHeaderText)
      .should('be.visible')
  },

  userLogOut(spikerz: SpikerzData) {
    cy.get(userProfileButton).should('be.visible').click();
    cy.get('span').contains(spikerz.logoutText).should('be.visible').click();
  },

  navigateToPage(urlSlug: string) {
    this.userLogin(urlSlug);
  },

  verifyPageHeaderText(headerText: string) {
    cy.get(headerTitleContainer)
      .should('be.visible')
      .and('contain', headerText);
  },

  verifySocialConnectPage(spikerz: SpikerzData) {
    cy.get('h4').contains(spikerz.socialConnectHeaderText)
      .should('be.visible');
    cy.get('div').contains(spikerz.socialConnectSubHeaderText)
      .should('be.visible');
    cy.get(socialConnectCards)
      .should('be.visible')
      .and('have.length', 6);
  },

  verifySocialConnectCardsDisplayed(spikerz: SpikerzData) {
    Cypress._.forEach(spikerz.socialConnectCardNames, (cardName) => {
      cy.get(socialConnectCards).contains(cardName)
        .should('be.visible');
    });
  },

  clickSocialConnectCard(cardName: string) {
    cy.get(socialConnectCards).contains(cardName)
        .should('be.visible').click();
  },

  verifyConnectWithSocialPage(cardName: string) {
    cy.get('h4').contains(`Connect with ${cardName}`)
      .should('be.visible');
  },

  clickConnectWithYoutube() {
    cy.get(ConnectWithYoutubeImage)
      .should('be.visible').click();
  },

  confirmYoutubeConnection(spikerz: SpikerzData) {
    this.verifyConnectWithSocialPage(spikerz.socialConnectCardNames[3]);
    cy.get('h5').contains(spikerz.confirmDetailsText)
      .should('be.visible');
    cy.get('div').contains(spikerz.youtubeHandle)
      .should('be.visible')
  },

  verifyMenuItemPage(spikerz: SpikerzData) {
    Cypress._.forEach(spikerz.menuTitles, (menuTitle) => {
      if(menuTitle != spikerz.menuTitles[0]) {
        cy.get(menuItems).contains(menuTitle)
          .should('be.visible').click({force: true});
        this.verifyPageHeaderText(menuTitle);
      };
    });
  },
};

export default Spikerz;
