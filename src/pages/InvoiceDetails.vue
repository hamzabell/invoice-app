<script setup>
    import { onMounted, ref, Teleport } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useInvoiceStore } from '../store/useInvoiceStore';
    import InvoiceStatus from '../components/InvoiceStatus.vue';
    import InvoiceButtonGroup from '../components/InvoiceButtonGroup.vue';
    import DeleteModal from '../components/DeleteModal.vue';
    import InvoiceForm from '../components/InvoiceForm.vue';
    import moment from 'moment';
    

    const $router = useRouter();
    const $route = useRoute();
    const $invoiceStore = useInvoiceStore();
    let $invoice = ref({});
    const $invoiceTotal = ref(0)
    const editInvoice = ref(false);
    const showDeleteModal = ref(false);

    onMounted(() => {
        if (!$route.params.invoiceId) {
            $router.push('/')
        }
        $invoice.value = $invoiceStore.getInvoiceById($route.params.invoiceId);
        $invoiceTotal.value = $invoice.value.items.reduce((acc, curr) => acc + (Number(curr.price)* Number(curr.quantity) || 0 ), 0)
    })


    const onEdit = values => {
        $invoiceStore.updateInvoice($invoice.id, values);
        $invoice.value = values
        editInvoice.value = false;
    }

    const markAsPaid = () => {
        $invoiceStore.updateInvoice($invoice.value.id, { ...$invoice.value, status: 'paid' })
        $invoice.value = { ...$invoice.value, status: 'paid' }
    }

    const deleteInvoice = ( ) => {
        const id = $invoice.value.id;

        $invoiceStore.deleteInvoice(id);
        $router.go(-1);

    }
</script>

<template>
    <section class="invoice-details">
        <h6 class="invoice-details__nav" @click="$router.go(-1)">
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155" stroke="#7C5DFA" stroke-width="2"/>
            </svg>
            Go back
        </h6>

        <div class="invoice-details__banner">

            <div class="invoice-details__status-wrapper">
                <h1 class="invoice-details__status">Status</h1>
                <InvoiceStatus :kind="$invoice.status" />
            </div>


            <InvoiceButtonGroup class="invoice-details__button-group" @edit="editInvoice = !editInvoice" @paid="markAsPaid" @delete="showDeleteModal = true"  :is-paid="$invoice.status == 'paid'" />
        </div>

        <div class="invoice-details__invoice">
            <header class="invoice-details__header">
                <div class="invoice-details__header-group">
                    <h1 class="invoice-details__header-group-id">{{ $invoice.invoiceId }}</h1>
                    <p class="invoice-details__header-group-name">{{ $invoice.project }}</p>
                </div>

                <p class="invoice-details__address">
                    {{ $invoice.streetAddress }}<br>
                    {{ $invoice.city }}<br>
                    {{ $invoice.postCode }} <br>
                    {{ $invoice.country }}
                </p>
            </header>
            <section class="invoice-details__details">
               
                <div class="invoice-details__payment-due-invoice-date  invoice-details__details-group--date">
                    <div class="invoice-details__details-group">
                        <h1 class="invoice-details__details-group-title">Invoice Date</h1>
                        <p class="invoice-details__details-group-value">{{ moment($invoice.date).format('DD-MM-YYYY hh:mm') }}</p>
                    </div>
    
                    <div class="invoice-details__details-group">
                        <h1 class="invoice-details__details-group-title">Payment Due</h1>
                        <p class="invoice-details__details-group-value">{{ moment($invoice.paymentDue).format('DD-MM-YYYY hh:mm') }}</p>
                    </div>
                </div>

                <div class="invoice-details__details-group invoice-details__details-group--bill">
                    <h1 class="invoice-details__details-group-title">Bill To</h1>
                    <p class="invoice-details__details-group-value">
                        {{ $invoice.clientName }} <br /><br>
                        <span class="invoice-details__client-address">
                            {{ $invoice.clientStreetAddress }} <br/>
                            {{ $invoice.clientCity }} <br/>
                            {{ $invoice.clientPostCode }} <br />
                            {{ $invoice.clientCountry }} 
                        </span>

                    </p>
                </div>

               

                <div class="invoice-details__details-group invoice-details__details-group--sent">
                    <h1 class="invoice-details__details-group-title">Sent to</h1>
                    <p class="invoice-details__details-group-value">{{ $invoice.clientEmail }}</p>
                </div>

            </section>
            <aside class="invoice-details__invoice-items">
                <div class="invoice-details__items">

                    <div class="columns row ">
                        <h1 class="column-name">Item Name</h1>
                        <h1 class="column-name">QTY.</h1>
                        <h1 class="column-name">Price</h1>
                        <h1 class="column-name">Total</h1>
                    </div>


                    <div class="row table-header" v-for="(inv, idx) in $invoice.items" :key="idx">
                        <h1 class="column-name column-name--name">
                            {{ inv.name }}

                            <span class="column-name__price">{{ inv.quantity }} X {{ inv.price  }}</span>
                        </h1>
                        <h1 class="column-name column-name--price">{{ inv.quantity }}</h1>
                        <h1 class="column-name column-name--price">${{ inv.price }}</h1>
                        <h1 class="column-name column-name--total">${{ inv.quantity * inv.price }}</h1>
                    </div>

                </div>
                <div class="invoice-details__total">
                    <h1 class="invoice-details__total-title">Amount Due</h1>

                    <h6 class="invoice-details__total-value">${{ $invoiceTotal }}</h6>
                </div>
            </aside>
        </div>

        <div class="invoice-details__actions">
            <InvoiceButtonGroup class="invoice-details__actions-group"  @delete="showDeleteModal = true" @edit="editInvoice = !editInvoice" @paid="markAsPaid"  :is-paid="$invoice.status == 'paid'"/>
        </div>
    </section>

    <div class="edit-invoice-form" v-if="editInvoice">
        <h6 class="add-invoice-form__nav" @click="editInvoice = !editInvoice">
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155" stroke="#7C5DFA" stroke-width="2"/>
            </svg>
            Go back
        </h6>

        <InvoiceForm :initial-values="$invoice" @close="editInvoice = !editInvoice" @edit="onEdit" />
    </div>

    <div class="edit-invoice-form-bg" v-if="editInvoice"></div>

    <Teleport to="body">
        <DeleteModal v-if="showDeleteModal" @cancel="showDeleteModal = false" @delete="deleteInvoice" />
    </Teleport>
</template>

<style lang="scss">
    .invoice-details {
        padding: 3.2rem 2.4rem;
        display: flex;
        row-gap: 1.6rem;
        flex-direction: column;
        align-self: center;
        position: relative;


        &__actions {
            position: fixed;
            background: var(--input-bg);
            width: 100%;
            height: 9.1rem;
            bottom: 0;
            left: 0;
            padding: 2.2rem 2.4rem;
            box-shadow: 0px 10px 10px -10px rgba(72, 84, 159, 0.10);
            display: flex;
            justify-content: center;

            @include for-device(tablet) {
                display: none;
            }
        }

        @include for-device(desktop) {
            width: 73.3rem;
            margin: auto;
            padding: 0 !important;
        }

        @include for-device(tablet) {
            padding: 4rem 4.9rem;
        }

        &__nav {
            color: var(--input-text);
            @include heading-sm;
            cursor: pointer;
        }

        &__button-group {
            display: none;

            @include for-device(tablet) {
                display: flex;
            }
        }

        &__banner {
            width: 100%;
            height: 9.1rem;
            border-radius: 8px;
            background: var(--input-bg);
            display: flex;
            align-items: center;
            padding-left: 2.4rem;
            padding-right: 2.4rem;

            @include for-device(tablet) {
                    height: 8.8rem;
                    justify-content: space-between;
            }
        }

        &__status {
            color: $blue-600;
            @include body-v;
            &-wrapper {     
                width: 100%;
                display: flex;
                justify-content: space-between;

                @include for-device(tablet) {
                    justify-content: flex-start;
                    column-gap: 1.5rem;
                }
               
            }
        }


        &__header {
            display: flex;
            flex-direction: column;

            @include for-device(tablet) {
                flex-direction: row;
                justify-content: space-between;
            }
                 &-group {
                    display: flex;
                    flex-direction: column;
                    row-gap: .4rem;

                    &-id {
                        color: var(--input-text);
                        margin: 0;

                    }

                    &-name {
                        color: var(--input-label);
                        padding: 0;
                        margin: 0;
                    }
                }
        }
        &__address {
            color: var(--input-label);
            line-height: 18px;
            @include body;
        }

        &__client-address {
            color: var(--input-label);
            @include body;
        }

        &__payment-due-invoice-date {
            display: flex;
            flex-direction: column;
            row-gap: 3.1rem;
        }


        &__details {
            display: grid;
            grid-template-columns: 9.8rem auto ;
            grid-template-rows: auto auto ;
            column-gap: 1rem;

            @include for-device(tablet) {
                grid-template-columns: auto auto;
            }


            &-group {
                display: flex;
                flex-direction: column;
                row-gap: 1.3rem;
                margin-top: 3.5rem;

                & > h1 , p {
                    padding: 0;
                    margin: 0;
                }

                &-title {
                    color: var(--input-label);
                    @include body-v;
                }
                &-value {
                    @include heading-sm;
                    color: var(--input-text);
                }

                &--date {
                    grid-area: 1 / 1 / 2 / 2;
                    align-self: baseline;


                    @include for-device(tablet) {
                        grid-area: 1 / 1 / 3 / 1;
                    }
                }
    
                &--bill {
                    grid-area: 1  /  2 / 3 / 3;
                    justify-self: center;

                    @include for-device(tablet) {
                        grid-area: 1 / 2 / 3 / 2
                    }
            
                    /* display: none; */
                }

    
                &--sent {
                    grid-area: 2 / 1 / 3 / 2;
                    margin-top: 3.5rem;

                    @include for-device(tablet) {
                        grid-area: 1 / 3 / 3 / 3
                    }
                    
                }
            }


        }

        &__invoice {
            width: 100%;
            height: fit-content;
            border-radius: 8px;
            background: var(--input-bg);
            margin-bottom: 8rem;
            padding: 2.4rem;

            @include for-device(tablet) {

                padding: 3.2rem;
            }

            @include for-device(desktop) {
                padding: 5rem 4.8rem
            }
        }

        &__invoice-items {
            width: 100%;
            margin-top: 4.7rem;

        }

        &__items {
            padding: 3.3rem 3.2rem;
            border-radius: 8px 8px 0px 0px;
            background: var(--edit);
            width: 100%;


            @include for-device(tablet) {
                display: table;

            }
            
        }
        &__total {
            height: 8rem;
            border-radius: 0px 0px 8px 8px;
            background: var(--total-bg);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 2.4rem;

            @include for-device(tablet) {
                padding: 0 3.2rem;
            }

            &-title {
                @include body;
                color: $white;
            }

            &-value {
                @include heading-md;
                color: $white;
            }
        }

    }
    .cell {
        display: table-cell;
    }
    .row {
        display: table-row;
    }

    .table-header {
        display: flex;
        width: 100%;
    }

    .columns {
        display: none;

        @include for-device(tablet) {
            display: flex;
        }
    }
    .column-name {
        flex: 1;
        @include body;
        color: var(--input-text);

        &--price {
            color: var(--input-label);
            display: none;

            @include for-device(tablet) {
                display: block;
            }

        }

        &--name {
            @include heading-sm;

            @include for-device(tablet) {
                @include body;
            }
        }

        &--total {
            text-align: right;
            align-items: center;
            @include heading-sm;

            @include for-device(tablet) {
                text-align: left;
                align-items: flex-start;
                @include body;
            }
        }
        &__price {
            @include heading-sm;
            display: flex;
            color: $blue-300;
            margin-top: .8rem;


            @include for-device(tablet) {
                display: none;
            }
        }
    }


    .edit-invoice-form {
        width: 100%;
        padding: 3.3rem 2.4rem;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 30;
        padding-bottom: 10rem;
        overflow-y: scroll ;
        background: var(--add-invoice-bg);

        &__nav {
            color: var(--input-text);
            @include heading-sm;
            cursor: pointer;

            @include for-device(tablet) {
                display: none;
            }
        }
   
        @include for-device(tablet) {
            overflow-y: scroll;
            padding: 5.9rem 5.6rem;
            border-radius:  0 20px 20px 0;
            
            width: 61.6rem;
            
        }

        @include for-device(desktop) {
            left: 10.3rem;
            
        }
    }

    .edit-invoice-form-bg {
        display: none;

        @include for-device(tablet) {
            display: block;
            position: fixed;
            left: 10.3rem;
            top: 0;
            height: 100%;
            width: 100%;
            z-index: 15;
            background: rgba(0,0,0, 0.5);
        }
    }
    
</style>