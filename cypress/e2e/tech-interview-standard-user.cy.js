describe("Standard User Flows", () => {
    before(() => {
        // Navigate and login into Sauce Demo
        cy.visit("https://www.saucedemo.com/");
        cy.get('#user-name').type('standard_user');
        cy.get("#password").type("secret_sauce");
        cy.get('#login-button').click();
        cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    });
  
    it("should add/remove an item to the cart, checkout completition", () => {
      cy.get(".inventory_item").first().find(".btn_primary").click();
      cy.get(".shopping_cart_link").click();
      cy.get(".cart_item").should("have.length.at.least", 1);
      cy.get(".cart_item").first().find('[id^="remove"]').click()
      cy.get(".cart_item").should("not.exist");
      cy.get('#continue-shopping').click()
      cy.get(".inventory_item").first().find(".btn_primary").click();
      cy.get(".shopping_cart_link").click();
      cy.get(".cart_item").should("have.length.at.least", 1);
      cy.get("#checkout").click();
      cy.get("#first-name").type("Gian");
      cy.get("#last-name").type("Herrera");
      cy.get("#postal-code").type("111115");
      cy.get("#continue").click();
      cy.get("#finish").click();
      cy.get("#checkout_complete_container").should("exist");
      cy.get("#back-to-products").click();
    });
  
    after(() => {
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
      cy.get("#login_credentials").should("exist");
    });
  });
  