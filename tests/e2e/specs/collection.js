beforeEach(() => {
    cy.restoreLocalStorageCache();
});

afterEach(() => {
    cy.saveLocalStorageCache();
});

describe('Add release', () => {
    const importedRelease = {
        title: "The Pub That Doesn't Sell Beer/ Are The Good Old Days Gone",
        artist: 'Slim Dusty & The Travelling Country Band',
        label: 'Columbia',
        genre: 'Folk, World, & Country',
        year: '1982',
        status: 'inStock',
        imgUrl: 'https://img.discogs.com/qYKn3jUmymYVluU8w3F74WeunDU=/fit-in/599x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-16231767-1605680200-3104.jpeg.jpg'
    }

    const newReleaseData = {
        title: "The Test",
        artist: 'DJ Test',
        label: 'Test Records',
        genre: 'Minimal Test',
        year: '2020',
        status: 'sold',
        price: '69',
        condition: 'M',
        notes: "Don't panic, this is only a test"
    }
    it('Add release from Discogs', () => {
        cy.login()
        cy.get('#add-release').click()
        cy.location('pathname').should('eq', '/new');
        cy.get('#discogs-id').type('16231767')
        cy.get('#ok-btn').click()
        cy.get('#title').should('have.value', importedRelease.title)
        cy.get('#artist').should('have.value', importedRelease.artist)
        cy.get('#label').should('have.value', importedRelease.label)
        cy.get('#genre').should('have.value', importedRelease.genre)
        cy.get('#year').should('have.value', importedRelease.year)
        cy.get('#status').should('have.value', importedRelease.status)
        cy.get('#imgUrl').should('have.value', importedRelease.imgUrl)
        cy.get('#save-btn').click()
        cy.visit('/collection')
        cy.get('.releaseRow').should('contain', importedRelease.title)
    });
    it('Search and delete release', () => {
        cy.visit('/collection')
        cy.get('#search').type(importedRelease.title)
        cy.get('.releaseRow').should('have.length', 1)
        cy.get('#options').click()
        cy.get('#delete-release').click()
        cy.get('#deleteModal').find('.btn-dark').click()
        cy.get('#search').type(importedRelease.title)
        cy.get('.releaseRow').should('have.length', 0)
        cy.get('#search').clear()
    })
    it('Edit release', () => {
        cy.visit('/collection')
        cy.get('.releaseRow').should('have.length', 2)
            .eq(1)
            .then(($item) => {
                cy.wrap($item)
                    .find('#options').click()
                    .find('#edit-release').click()
            });
        cy.get('#title').clear().type(newReleaseData.title)
        cy.get('#artist').clear().type(newReleaseData.artist)
        cy.get('#label').clear().type(newReleaseData.label)
        cy.get('#genre').clear().type(newReleaseData.genre)
        cy.get('#year').clear().type(newReleaseData.year)
        cy.get('#notes').clear().type(newReleaseData.notes)
        cy.get('#status').select(newReleaseData.status)
        cy.get('#condition').select(newReleaseData.condition)
        cy.get('#imgUrl').clear()
        cy.get('#save-btn').click()
        cy.location('pathname').should('eq', '/collection');
        cy.get('.releaseRow').should('contain', newReleaseData.title)
    });
});
