describe("pagination", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
        cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0", {
            fixture: 'first-page.json'
        }).as("firstPage");
        cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20", {
            fixture: 'second-page.json'
        }).as("secondPage");

        cy.fixture('first-page.json').then((data) => {
            data.results.forEach((result) => {
                cy.intercept("GET", `https://pokeapi.co/api/v2/pokemon/${result.name}`, {
                    fixture: `/first_page/${result.name}.json`
                }).as(`${result.name}`);
            })
        });
        cy.fixture('second-page.json').then((data) => {
            data.results.forEach((result) => {
                cy.intercept("GET", `https://pokeapi.co/api/v2/pokemon/${result.name}`, {
                    fixture: `/second_page/${result.name}.json`
                }).as(`${result.name}`);
            })
        });
    })

    describe("positive paths", () => {
        it("verifies clicking go button changes to next page", () => {
            cy.get("#page-number").as("page-number").should("have.value", 1);
            cy.get("#next-button").as("next-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 2);
        });
        it("verifies changing page number and then clicking go button changes to the selected page", () => {
            cy.get("#page-number").as("page-number").should("have.value", 1);
            cy.get("#page-number").invoke('val', '2').trigger('change');
            cy.get("#next-button").as("next-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 2);
        })
        it("verifies clicking back button changes to previous page", () => {
            cy.get("#page-number").as("page-number").should("have.value", 1);
            cy.get("#next-button").as("next-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 2);
            cy.get("#back-button").as("back-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 1);
        })
    })
    describe("negative paths", () => {
        it("verifies page number cannot be less than 1", () => {
            cy.get("#page-number").as("page-number").should("have.value", 1);
            cy.get("#page-number").clear()
            cy.get("#next-button").as("next-button").click();
            cy.get("#back-button").as("back-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 0);

            cy.get("#page-number").invoke('val', '-1').trigger('change');
            cy.get("#next-button").as("next-button").click();
            cy.get("#back-button").as("back-button").click();
            cy.get("#page-number").as("page-number").should("have.value", -1);

        })
        it("verifies page number cannot be greater than the max number of pages", () => {
            cy.get("#page-number").as("page-number").should("have.value", 1);
            cy.get("#page-number").clear().type(5000);
            cy.get("#next-button").as("next-button").click();
            cy.get("#back-button").as("back-button").click();
            cy.get("#page-number").as("page-number").should("have.value", 50000);
        })
    })
    
})