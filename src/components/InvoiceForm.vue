<script setup>
    import  { useForm, useFieldArray, Field } from 'vee-validate';
    import * as yup from 'yup';
    import { toTypedSchema } from '@vee-validate/yup';
    import { defineProps, onMounted } from 'vue';
    import FormInput from './FormInput.vue';
    import moment from 'moment';
    import Button from './Button.vue';


    const $emit = defineEmits(["close", "save", "update", "draft"]);

    const props = defineProps(['initialValues']);


    const formatDate = (date) => moment(date).format('YYYY-MM-DD')


    const validationSchema = toTypedSchema(yup.object({
        streetAddress: yup.string().required('Street Address is Required!'),
        city: yup.string().required('City is required!'),
        country: yup.string().required('Country is required!'),
        postCode: yup.string().required('Post Code is required!'),
        clientName: yup.string().required('Client Name is required!'),
        clientEmail: yup.string().required("Client's Email is required!"),
        clientStreetAddress: yup.string().required("Client's Street Address is Required!"),
        clientCity: yup.string().required("Client's City is Required!"),
        clientPostCode: yup.string().required("Client's Post code is required!"),
        clientCountry: yup.string().required("Client's Country is required!"),
        invoiceDate: yup.date().required('Invoice Date is required!'),
        paymentDue: yup.date().required('Payment Due is required!'),
        project: yup.string().required('Project description is required!'),
        items: yup.array().of(
            yup.object().shape({
                name: yup.string().required(),
                quantity: yup.number().required(),
                price: yup.number().required()
            })
        ).strict()
    }));

    const { defineInputBinds, meta, errors, isSubmitting, values } = useForm({ 
            validationSchema, 
            initialValues: props.initialValues ? { ...props.initialValues, invoiceDate: formatDate(props.initialValues.invoiceDate), paymentDue: formatDate(props.initialValues.paymentDue) } : { invoiceDate: formatDate(new Date())}
    })
    const { remove, push, fields } = useFieldArray('items');


    const streetAddress = defineInputBinds('streetAddress');
    const city = defineInputBinds('city');
    const country = defineInputBinds('country');
    const postCode = defineInputBinds('postCode');
    const clientName = defineInputBinds('clientName');
    const clientEmail = defineInputBinds('clientEmail');
    const clientStreetAddress = defineInputBinds('clientStreetAddress');
    const clientCity = defineInputBinds('clientCity');
    const clientPostCode = defineInputBinds('clientPostCode');
    const clientCountry = defineInputBinds('clientCountry');
    const invoiceDate = defineInputBinds('invoiceDate');
    const paymentDue = defineInputBinds('paymentDue');
    const project = defineInputBinds('project')

</script>
<template>
    <form  class="invoice-form">
        <h1 v-if="!initialValues" class="invoice-form__title">New Invoice</h1>
        <h1 v-else class="invoice-form__title">Edit Invoice</h1>
        <section class="invoice-form__bill-from section">
            <h1 class="invoice-form-header">Bill From</h1>

            <FormInput  label="Street Address">
                <input v-bind="streetAddress" type="text" placeholder="19 Union Terrace">
            </FormInput>

            <div class="split-input">
                <FormInput  label="City">
                    <input v-bind="city" type="text" placeholder="London">
                </FormInput>

                <FormInput  label="Post Code">
                    <input v-bind="postCode" type="text" placeholder="1928">
                </FormInput>

                <FormInput  label="Country">
                    <input v-bind="country" type="text" placeholder="United Kingdom">
                </FormInput>

            </div>

        </section>
        <section class="invoice-form__bill-to section">
            <h1 class="invoice-form-header">Bill To</h1>

            <FormInput  label="Client's Name">
                <input v-bind="clientName" type="text" placeholder="John Doe">
            </FormInput>

            <FormInput  label="Client's Email">
                <input v-bind="clientEmail" type="email" placeholder="johndoe@mail.com">
            </FormInput>

            <FormInput  label="Street Address">
                <input v-bind="clientStreetAddress" type="text" placeholder="John Doe Street">
            </FormInput>

            <div class="split-input">
                <FormInput  label="City">
                    <input v-bind="clientCity" type="text" placeholder="London">
                </FormInput>
                <FormInput  label="Post Code">
                    <input v-bind="clientPostCode" type="text" placeholder="19234">
                </FormInput>
                <FormInput  label="Country">
                    <input v-bind="clientCountry" type="text" placeholder="United Kingdom">
                </FormInput>
            </div>

            <div class="split-input">
                <FormInput  label="Invoice Date">
                    <input type="date" v-bind="invoiceDate"  disabled />                    
                </FormInput>
                <FormInput  label="Payment Due">
                    <input  v-bind="paymentDue" type="date"   />
                </FormInput>
            </div>

            <FormInput  label="Project Description">
                <input v-bind="project" type="text" placeholder="Graphic Design">
            </FormInput>

        </section>
        <section class="invoice-form__items">
            <h1 class="invoice-form__items-title">Item List</h1>

            <table class="invoice-form__items-table">
                <thead class="invoice-form__items-table-header">
                    <tr>
                        <th>Item Name</th>
                        <th>Qty.</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody class="invoice-form__items-table-items">

                    <tr v-for="(field, idx) in fields" :key="field.key">
                        <td>
                            <label class="table-label">Item Name</label>
                            <input type="text" class="table-input" v-model="field.value.name">
                        </td>
                        <td>
                            <label class="table-label">Qty.</label>

                            <input type="number" class="table-input table-input--qty" v-model="field.value.quantity">
                        </td>
                        <td>
                            <label class="table-label">Price</label>

                            <input type="number" class="table-input table-input--price" v-model="field.value.price">
                        </td>
                        <td >
                            <label class="table-label">Total</label>
                            <p class="invoice-form__total">{{  field.value.price * field.value.quantity || 0 }}</p>
                        </td>

                        <td >

                            <svg @click="remove(idx)" style="cursor: pointer" width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.47222 0L9.36113 0.888875H12.4722V2.66667H0.0278015V0.888875H3.13888L4.0278 0H8.47222ZM2.69447 16C1.71222 16 0.916677 15.2045 0.916677 14.2222V3.55554H11.5833V14.2222C11.5833 15.2045 10.7878 16 9.80559 16H2.69447Z" fill="#888EB0"/>
                            </svg>
                        </td>
                    </tr>

                </tbody>

            </table>

            <Button type="submit" :disabled="!meta.valid" @click="push({ name: '', quantity: 0, price: 0})" kind="secondary" class="invoice-form__button">+ Add New Item</Button>
            
        </section>
    </form>

    <div class="invoice-form__actions">
        <div v-if="initialValues" class="invoice-form__actions-edit">
            <Button  kind="secondary" @click="$emit('close')">Cancel</Button>
            <Button kind="primary" @click="$emit('edit', values)">Save Changes</Button>
        </div>
        <div v-else class="invoice-form__actions-new">
            <Button kind="secondary" @click="$emit('close')">Discard</Button>

            <div class="group">
                <Button  kind="secondary" @click="$emit('draft', values)">Save as Draft</Button>
                <Button kind="primary" @click="$emit('save', values)">Save & Send</Button>
            </div>

        </div>
    </div>  
</template>

<style lang="scss">

    .error {

    }

    .table-label {
        display: block;
        @include body-v;
        color: var(--input-label);


        @include for-device(tablet) {
            display: none;
        }
    }


    .invoice-form-header {
        color: $purple-100;
        @include heading-sm;
    }

    .split-input {
        display: flex;
        column-gap: 2.4rem;
        width: 100%;
    }

    .section {
        display: flex;
        flex-direction: column;
        row-gap: 2.4rem;
    }

    .table-input {
        width: 21.4rem;
        height: 4.8rem;
        border: 1px solid var(--input-border);
        outline: none;
        background: var(--input-bg);
        color: var(--input-text);
        display: flex;
        align-items: center;
        padding-left: 2rem;
        border-radius: 4px;

        &--qty {
            width: 4.6rem;
            justify-content: center;
            padding-left: 1rem;
        }

        &--price {
            width: 10rem;
        }
    }

    .group {

        width: fit-content;

        & > button {
            width: 11.2rem;
            height:4.8rem;
            justify-content: center;
            @include body-v;
        }
       

        @include for-device(tablet) {
            &> button:first-child {
                width: 13.3rem;
            }

        }
        @extend  .invoice-form__actions-edit;


       
    }
   
    .invoice-form {
        position: relative;
        &__title {
            @include heading-md;
            color: var(--input-text);
        }

        &__actions {
            
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 30;
            height: 9.1rem;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--input-bg);
            box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.10);

            @include for-device(tablet) {
                margin-top: 4.7rem;
                position: relative;
                background: inherit;
                justify-content: flex-start;
                box-shadow: none;
            }

            &-edit {
                display: flex;
                width: fit-content;
              
                column-gap: .5rem;

                @include for-device(tablet) {
                    column-gap: .8rem;
                    width: 100%;
                    justify-content: flex-end;
                }
    
                & > button {
                    width: 9.6rem;
                    height:4.8rem;
                    justify-content: center;
                    @include body-v;


                }

                &> button:last-child {
                    width: 13.8rem;
                }
            }

            &-new {
                display: flex;
                column-gap: .5rem;
                width: fit-content;

      

                @include for-device(tablet){
                    justify-content: space-between;
                    width: 100%;

                    & > button {
                    width: 9.6rem;
                    height:4.8rem;
                    justify-content: center;
                    @include body-v;


                    }

                    &> button:last-child {
                        width: 13.8rem;
                    }
                }

                @extend .invoice-form__actions-edit;
            }


        }

       

        &__total {
            @include heading-sm;
            color: var(--total-text);
            margin-left: 0.5rem;

            @include for-device(tablet) {
                margin-left: 0;
            }
        }

        &__button {
            width: 100%;
            height: 4.8rem;
            justify-content: center;
            color: var(--input-label);
            @include heading-sm;
        }

        &__bill-to {
            margin-top: 2.4rem;
        }

        &__items {
            margin-top: 3.5rem;
            margin-bottom: 8rem;

            @include for-device(tablet){
                margin-bottom: 0;
            }

            &-title {
                font-weight: bold;
                font-size: 18px;
                line-height: 32px;
                color: $items-list-title;
            }

            &-table {
                width: 100%;
                margin-bottom: 1.8rem;


                &-items {
                    & > tr {
                        margin-top: 1rem;
                        display: grid;
                        grid-template-columns: 9.3rem 9.3rem auto auto;
                        grid-template-rows: auto auto;
                        grid-gap: 0 0.5rem;


                        @include for-device(tablet) {
                            display: table-row;
                        }
                        &> td > input {
                            width: 100%;

                            @include for-device(tablet) {
                                width: 18.4rem;
                            }
                        }

                        &> td:nth-child(2) > input {
                            @include for-device(tablet) {
                                width: 4.6rem;
                            }
                        }

                        &> td:nth-child(3) > input {
                            @include for-device(tablet) {
                                width: 10rem;
                            }
                        }

                        &>td:first-child {
                            grid-area: 1 / 1 / 2 / 5;
                            margin-bottom: 1rem;
                        }

                        &>td:last-child {
                            align-self: center;
                        }



                    



                        /* &>td:where(:not(:first-child)) {
                            display: inline-flex;
                        } */
                    }
                }

                &-header {
                   display: none;

                   @include for-device(tablet) {
                    display: table-row-group;
                   }

                  

                    & > tr > th  {
                        text-align: left;
                        color: var(--input-label);
                        @include body-v;
                    }
                }
            }
        }
        
    }

</style>

