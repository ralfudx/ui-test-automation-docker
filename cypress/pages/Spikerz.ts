/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint sonarjs/no-duplicate-string: 0 */
/* eslint @typescript-eslint/no-shadow: 0 */

import { SpikerzData } from "../test_data/spikerz";

const spikerzLogo = '.sidebar-logo > a > img:nth-child(2)';
const userProfileButton = '.profile-wrapper div';
const headerTitleContainer = '.giant-section-title > h4';
const menuItems = '.ant-menu-title-content > a > span';
const ConnectWithYoutubeImage = 'span[class="content-wrapper no-filter"] > img';
const socialConnectCards = '.ant-card-body > div > div:nth-child(2)';


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
    cy.assertVisible(spikerzLogo);
    cy.get(spikerzLogo)
      .should('have.attr', 'alt', spikerz.logoText);
    cy.assertVisible(userProfileButton);
    cy.assertContainsTextVisible('h5', spikerz.overviewHeaderText);
  },

  userLogOut(spikerz: SpikerzData) {
    cy.assertVisible(userProfileButton).click();
    cy.assertContainsTextVisible('span', spikerz.logoutText).click();
  },

  navigateToPage(urlSlug: string) {
    this.userLogin(urlSlug);
  },

  verifyPageHeaderText(headerText: string) {
    cy.assertVisible(headerTitleContainer)
      .and('contain', headerText);
  },

  verifySocialConnectPage(spikerz: SpikerzData) {
    cy.assertContainsTextVisible('h4', spikerz.socialConnectHeaderText);
    cy.assertContainsTextVisible('div', spikerz.socialConnectSubHeaderText);
    cy.assertVisible(socialConnectCards).and('have.length', 6);
  },

  verifySocialConnectCardsDisplayed(spikerz: SpikerzData) {
    Cypress._.forEach(spikerz.socialConnectCardNames, (cardName) => {
      cy.assertContainsTextVisible(socialConnectCards, cardName);
    });
  },

  clickSocialConnectCard(cardName: string) {
    cy.assertContainsTextVisible(socialConnectCards, cardName).click();
  },

  verifyConnectWithSocialPage(cardName: string) {
    cy.assertContainsTextVisible('h4', `Connect with ${cardName}`);
  },

  clickConnectWithYoutube() {
    cy.assertVisible(ConnectWithYoutubeImage).click();
  },

  confirmYoutubeConnection(spikerz: SpikerzData) {
    this.verifyConnectWithSocialPage(spikerz.socialConnectCardNames[3]);
    cy.assertContainsTextVisible('h5', spikerz.confirmDetailsText);
    cy.assertContainsTextVisible('div', spikerz.youtubeHandle);
  },

  verifyMenuItemPage(spikerz: SpikerzData) {
    Cypress._.forEach(spikerz.menuTitles, (menuTitle) => {
      if(menuTitle != spikerz.menuTitles[0]) {
        cy.assertContainsTextVisible(menuItems, menuTitle).click({force: true});
        this.verifyPageHeaderText(menuTitle);
      };
    });
  },
};

export default Spikerz;
