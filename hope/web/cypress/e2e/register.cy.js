/// <reference types="cypress" />

import data from '../fixtures/orphanages.json'

import { generator } from '../support/factory'

describe('Cadastro de orfanatos', () => {

    it('deve cadastrar um novo orfanato', () => {
        const orphanage = generator()

        cy.gotoCreate(orphanage.position)
        cy.createOrphanage(orphanage)
        cy.popupHaveText('Orfanato cadastrado com sucesso.')
    })

    it('não deve cadastrar orfanato com nome duplicado', () => {
        const orphanage = generator()

        cy.postOrphanage(orphanage)

        cy.gotoCreate(orphanage.position)
        cy.createOrphanage(orphanage)
        cy.popupHaveText('Já existe um cadastro com o nome: ' + orphanage.name)

    })

    context('Campos obrigatórios', () => {
        it('não deve cadastrar se o nome não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.name

            cy.gotoCreate(orphanage.position)
            cy.createOrphanage(orphanage)

            cy.alertHaveText('Nome', 'Campo obrigatório')

        })

        it('não deve cadastrar se o sobre não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.description

            cy.gotoCreate(orphanage.position)
            cy.createOrphanage(orphanage)

            cy.alertHaveText('Sobre', 'Campo obrigatório')

        })

        it('não deve cadastrar se não anexar imagem', () => {
            let orphanage = generator() 

            delete orphanage.image

            cy.gotoCreate(orphanage.position)
            cy.createOrphanage(orphanage)

            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')

        })

        it('não deve cadastrar se o horário não for informado', () => {
            let orphanage = generator()

            delete orphanage.opening_hours

            cy.gotoCreate(orphanage.position)
            cy.createOrphanage(orphanage)

            cy.alertHaveText('Horário', 'Campo obrigatório')
        })

        it('não deve cadastrar se os campos obrigatorios não for preenchido', () => {
            let orphanage = generator()

            delete orphanage.name
            delete orphanage.description
            delete orphanage.image
            delete orphanage.opening_hours

            cy.gotoCreate(orphanage.position)
            cy.createOrphanage(orphanage)

            cy.alertHaveText('Nome', 'Campo obrigatório')
            cy.alertHaveText('Sobre', 'Campo obrigatório')
            cy.alertHaveText('Fotos', 'Envie pelo menos uma foto')
            cy.alertHaveText('Horário', 'Campo obrigatório')
        })
    })
})


