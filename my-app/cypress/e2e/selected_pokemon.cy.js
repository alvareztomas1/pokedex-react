describe("selected pokemon", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/")
        cy.intercept("GET", "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0", {
          fixture: 'first-page.json'
        }).as("firstPage");
    
        cy.fixture('first-page.json').then((data) => {
            data.results.forEach((result) => {
              cy.intercept("GET", `https://pokeapi.co/api/v2/pokemon/${result.name}`, {
                fixture: `/first_page/${result.name}.json`
              }).as(`${result.name}`);
            })
          });
    })

    it("verifies clicking on a pokemon displays it", () => {
        cy.get("#selected-pokemon").should("not.exist").as("selected-pokemon");
        cy.get("#1").as("bulbasaur").click();

        cy.get("#selected-pokemon").should("be.visible").as("selected-pokemon");
        cy.get("#pokemons-list").should("not.be.visible").as("pokemons-list");
        cy.get("#pagination").should("not.exist").as("pagination");

    })
    it("verifies selected pokemon is displayed", () => {
        cy.get("#1").as("bulbasaur").click();
        cy.fixture('/first_page/bulbasaur.json').then((data) => {
            cy.get("#selected-pokemon-image").as("selected-pokemon-image").should("have.attr", "src").then((src) => {
                expect(src).to.equal(data.sprites.other['official-artwork'].front_default);
            })
            cy.get("#selected-pokemon-name").as("selected-pokemon-name").should("have.text", data.name.toUpperCase());
            data.types.forEach((type, index) => {
                cy.get(`#selected-pokemon-type-${index}`).as(`selected-pokemon-type-${index}`).should("have.text", type.type.name.toUpperCase());
            })
            cy.get("#selected-pokemon-height").as("selected-pokemon-height").should("have.text", `Height: ${data.height} Cm.`);
            cy.get("#selected-pokemon-weight").as("selected-pokemon-weight").should("have.text", `Weight: ${data.weight / 10} Kg.`);
            data.stats.forEach((stat, index) => {
                cy.get(`#selected-pokemon-${stat.stat.name}`).as(`selected-pokemon-${stat.stat.name}`).should("have.text", `${stat.base_stat} / 255`);
            })
        })
    })
    it("verifies cliking on back button returns to home page", () => {
        cy.get("#1").as("bulbasaur").click();
        cy.get("#back-button").as("back-button").click();
        cy.get("#selected-pokemon").should("not.exist").as("selected-pokemon");
    })
})