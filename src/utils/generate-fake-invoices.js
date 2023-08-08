import { faker } from "@faker-js/faker";
import moment from "moment";


export const generateInvoices = (count = 10) => {
    const all = [];

    for (let i = 0; i < count; i++) {
        all.push({
            id: faker.database.mongodbObjectId(),
            invoiceId: `#${faker.string.alphanumeric(4)}`,
            name:  `${faker.person.firstName()} ${faker.person.lastName()}`,
            date: faker.date.anytime(),
            amount: faker.finance.amount(),
            status: faker.helpers.arrayElement(['paid', 'pending', 'draft']),
            streetAddress: faker.location.streetAddress(),
            city: faker.location.city(),
            postCode: faker.location.zipCode(),
            country: faker.location.country(),
            clientName: `${faker.person.firstName()} ${faker.person.lastName()}`,
            clientEmail: faker.internet.email(),
            clientStreetAddress: faker.location.streetAddress(),
            clientCity: faker.location.city(),
            clientPostCode: faker.location.zipCode(),
            clientCountry: faker.location.country(),
            invoiceDate: moment(faker.date.past()).format('YYYY-MM-DD'),
            paymentDue: moment(faker.date.future()).format('YYYY-MM-DD'),
            project: faker.commerce.product(),
            items: faker.helpers.multiple(() => ({
                name: faker.commerce.product(),
                quantity: faker.number.int(10),
                price: faker.commerce.price()
            }), { count: 2 })
        })
    }

    return all;
}