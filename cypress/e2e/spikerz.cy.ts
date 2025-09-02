import Spikerz from '../pages/Spikerz';

const spikerzData = Cypress.env('spikerz');

describe(
  'Spikerz ui test functionality',
  function () {
    beforeEach(function () {
      cy.viewport('macbook-15');
      Spikerz.userLogin('/');
    });

    it(
      'verify successful user log in',
      function () {
        Spikerz.verifySignedInUser(spikerzData);
      }
    );

    it(
      'verify social connect with youtube',
      function () {
        Spikerz.navigateToPage(
          spikerzData.socialConnectUrlSlug
        );
        cy.loginByGoogleApi();
        Spikerz.verifySocialConnectPage(spikerzData);
        Spikerz.verifySocialConnectCardsDisplayed(spikerzData);
        Spikerz.clickSocialConnectCard(spikerzData.socialConnectCardNames[3]);
        Spikerz.verifyConnectWithSocialPage(spikerzData.socialConnectCardNames[3]);
        Spikerz.clickConnectWithYoutube();
        // commenting this out till the google auth issue is sorted
        // Spikerz.confirmYoutubeConnection(spikerzData);
      }
    );

    it(
      'verify page navigation for all menu items',
      function () {
        Spikerz.verifySignedInUser(spikerzData);
        Spikerz.verifyMenuItemPage(spikerzData);
      }
    );
  }
);
