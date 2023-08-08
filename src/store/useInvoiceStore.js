import { defineStore } from "pinia";
import { v4 as uuid4 } from 'uuid';
import { faker } from "@faker-js/faker";


export const useInvoiceStore = defineStore('invoices', {
    state: () => ({
        invoices: []
    }),
    getters: {
        numberOfInvoices: (state) => state.invoices?.length,
        getInvoicesByStatuses: (state) => {
            return (statuses) => state.invoices.filter(x =>  statuses.includes(x.status.toLowerCase()))
        },
        getInvoiceById: (state) => {
            const $invoices = state.invoices;
            return (id) => $invoices.filter(x => x.id === id)[0]

        }
    },
    actions: {
        addInvoice(invoice, status='pending') {

            const newInvoice = {
                ...invoice,
                status,
                id: uuid4(),
                name: faker.person.fullName(),
                date: faker.date.future(),
                items: invoice.items ? invoice.items : [],
                amount: invoice.items ? invoice.items.reduce((acc, curr) => acc += curr.quantity * curr.price, 0): 0,
                invoiceId: `#${faker.string.alphanumeric(4)}-${this.invoices.length}`
            }

            this.invoices = [ ...this.invoices, newInvoice ]
        },

        deleteInvoice(id) {
            this.invoices = [...this.invoices].filter(x => x.id !== id);
        },

        updateInvoice(id, newInvoice) {
            this.invoices = [...this.invoices].map(x => {
                if (x.id == id) return newInvoice;
                return x
            })
        }
    },
    persist: true

})