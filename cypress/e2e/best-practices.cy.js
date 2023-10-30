describe("Standard User Flows", () => {
    before(() => {
      // Common setup for all test cases within this describe block "Sign in"
      cy.visit("https://www.saucedemo.com/");
      cy.get('#user-name').type('standard_user');
      cy.get("#password").type("secret_sauce");
      cy.get('#login-button').click();
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    });
  
    it("should add an item to the cart", () => {
      // Test-specific setup
      cy.get(".inventory_item").first().find(".btn_primary").click();
      cy.get(".shopping_cart_link").click();
      
      // Assertions
      cy.get(".cart_item").should("have.length.at.least", 1);
    });
  
    it("should remove an item from the cart", () => {
      // Test-specific setup
      cy.get(".inventory_item").first().find(".btn_primary").click();
      cy.get(".shopping_cart_link").click();
      
      // Assertions
      cy.get(".cart_item").should("have.length.at.least", 1);
      
      // Test-specific actions
      cy.get(".cart_item").first().find('[id^="remove"]').click();
      cy.get(".cart_item").should("not.exist");
    });
  
    it("should checkout an item in the cart", () => {
      // Test-specific setup
      cy.get(".inventory_item").first().find(".btn_primary").click();
      cy.get(".shopping_cart_link").click();
      
      // Assertions
      cy.get(".cart_item").should("have.length.at.least", 1);
      
      // Test-specific actions
      cy.get("#checkout").click();
      cy.get("#first-name").type("Gian");
      cy.get("#last-name").type("Herrera");
      cy.get("#postal-code").type("111115");
      cy.get("#continue").click();
      cy.get("#finish").click();
      
      // Final assertions
      cy.get("#checkout_complete_container").should("exist");
    });
  
    after(() => {
      // Common cleanup for all test cases within this describe block
      cy.get("#react-burger-menu-btn").click();
      cy.get("#logout_sidebar_link").click();
      cy.get("#login_credentials").should("exist");
    });
  });
  