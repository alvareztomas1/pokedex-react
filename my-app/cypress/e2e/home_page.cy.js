/// <reference types="cypress" />

describe('home page', () => {
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

   it("verifies loading functionality", () => {
     cy.get("#loading").should("be.visible").as("loading");
     cy.get("#pokedex").should("not.exist").as("pokedex");
     
     cy.wait("@firstPage");
 
     cy.get("@loading").should("not.exist");
     cy.get("#pokedex").should("be.visible");
 
   })
   it("verifies first page components", () => {
     cy.get("#title").should("be.visible").as("title");
     cy.get("#pokedex").should("be.visible").as("pokedex");
     cy.get("#pokemons-list").should("be.visible").as("pokemons-list");
     cy.get("#selected-pokemon").should("not.exist").as("selected-pokemon");

     
     cy.get("#pagination").should("be.visible").as("pagination");
     cy.get("#back-button").should("be.visible").as("back-button");
     cy.get("#next-button").should("be.visible").as("next-button");
     cy.get("#page-number").should("be.visible").as("page-number");
 
     cy.get("@page-number").should("have.value", 1);
     cy.get("@title").should("have.attr", "src").and("include", "/static/media/logo.907dcf3a592a0e37e0dd.png");
   });
  it("verifies every pokemon is displayed", () => {

    cy.fixture('first-page.json').then((data) => {
      cy.get(".pokemon").should("have.length", data.results.length);

      data.results.forEach((pokemon, index) => {
        cy.get(".pokemon").as("pokemon-name").eq(index).should("have.attr", "name").then((name) => {
          expect(name).to.equal(pokemon.name);
        })
        cy.get(".pokemon").as("pokemon-id").eq(index).should("have.attr", "id").then((id) => {
          expect(id).to.equal(String(index + 1));
        })
        cy.get(".pokemon").as("pokemon-image").eq(index).should("have.attr", "src").then((src) => {
          expect(src).to.equal(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`);
        })
      })
    })
  })
})