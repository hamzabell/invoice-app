<script setup>
    import Button from '../components/Button.vue';
    import Invoice from '../components/Invoice.vue';
    import {useInvoiceStore} from '../store/useInvoiceStore';
    import { onUpdated, reactive, ref, watch } from 'vue';
    import { useRouter  } from 'vue-router';
    import InvoiceForm from '../components/InvoiceForm.vue';

    const $invoices = useInvoiceStore();
    const $router = useRouter();

    let allInvoices = reactive($invoices.invoices);


    const showFilterOptions = ref(false);
    const addInvoice = ref(false);
    let filters = reactive([]);


    const addToFilter = (filterId) => filters.push(filterId)

    const removeFromFilter = (filterId) => {
        const index = filters.indexOf(filterId);

        if(index != -1) filters.splice(index, 1);
    }

    const addAsDraft = (values) => {
        $invoices.addInvoice(values, 'draft');
        addInvoice.value = false;
    }

    const addNew = (values) => {
        $invoices.addInvoice(values);
        addInvoice.value = false;
        allInvoices =  $invoices.invoices;
    }


 
    watch(filters, (newValue, oldValue) => {
        if (filters.length  > 0) {
            allInvoices = $invoices.getInvoicesByStatuses(newValue)
        } else {
            allInvoices = $invoices.invoices;
        }
    })


</script>

<template>
    <main class="home-page">
        <section class="home-page__actions-wrapper">
            <div class="home-page__actions-title-wrapper">
                <h1 class="home-page__actions-title">Invoices</h1>
                <p class="home-page__actions-subtitle">{{ allInvoices.length || 0 }} Invoices</p>
            </div>

            <div class="home-page__actions"  @click="showFilterOptions = !showFilterOptions">
                <p class="home-page__actions-filter">
                    <svg v-if="showFilterOptions" class="home-page__actions-filter-icon" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.22754L5.2279 1.99964L9.4558 6.22754" stroke="#7C5DFA" stroke-width="2"/>
                    </svg>

                    <svg v-else class="home-page__actions-filter-icon" width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5.2279 5.2279L9.4558 1" stroke="#7C5DFA" stroke-width="2"/>
                    </svg>


                    <span class="home-page__actions-filter-dropdown" :style="{ display: showFilterOptions ? 'flex': 'none' }" @click.stop>
                        <span class="home-page__actions-filter-dropdown-option">
                            <input type="checkbox" :checked="filters.includes('draft')"  @change="e => filters.includes('draft') ? removeFromFilter('draft') : addToFilter('draft')">
                            Draft
                        </span>

                        <span class="home-page__actions-filter-dropdown-option">
                            <input type="checkbox" :checked="filters.includes('pending')"  @change="e => filters.includes('pending') ? removeFromFilter('pending') : addToFilter('pending')">
                            Pending
                        </span>

                        <span class="home-page__actions-filter-dropdown-option">
                            <input type="checkbox" :checked="filters.includes('paid')"  @change="e => filters.includes('paid') ? removeFromFilter('paid') : addToFilter('paid')">
                            Paid
                        </span>
                    </span>
                </p>
                <Button type="button" kind="primary" class="home-page__actions-button" @click.stop="addInvoice = !addInvoice">
                    <template #icon>
                        <div class="button-icon">+</div>
                    </template>

                </Button>
            </div>

        </section>

        <section class="home-page__invoices" :class="{ 'home-page__invoices--empty-state': allInvoices.length === 0}">
            <div v-if=" allInvoices.length === 0" class="home-page__empty-state">
                <img src="../assets/no-invoice.svg" alt="">

                <div class="home-page__empty-state-message">
                    <h3 class="home-page__empty-state-title">There is nothing here</h3>
                    <p class="home-page__empty-state-subtitle">
                        Create an invoice by clicking the 
                        <b>New</b> button and get started
                    </p>
                </div>

            </div>

            <Invoice class="home-page__invoice" @click="$router.push(`/invoice/${id}`)" v-for="({id, invoiceId, name, date, amount, status }, idx) in allInvoices" :key="idx" :invoiceId="invoiceId" :name="name" :date="date" :amount="amount" :status="status"/>

        </section>
    </main>

    <div class="add-invoice-form" v-if="addInvoice">
        <h6 class="add-invoice-form__nav" @click="addInvoice = !addInvoice">
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155" stroke="#7C5DFA" stroke-width="2"/>
            </svg>
            Go back
        </h6>
        <InvoiceForm @close="addInvoice = !addInvoice"  @draft="addAsDraft"  @save="addNew"/>
    </div>

    <div class="add-invoice-form-bg" v-if="addInvoice"></div>

</template>


<style lang="scss">
    .home-page {
        width: 100%;
        height: 100%;
        padding: 3.2rem  2.4rem;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 1;
        display: flex;
        flex-direction: column;
        position: relative;

        &__invoice {
            margin-bottom: 1.6rem;
        }


        &__empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            /* justify-content: center; */
            /* margin-top: 10rem; */
            overflow-y: hidden;
            width: 100%;
            padding-top: 4rem; 

            &-title {
                @include heading-md;
                white-space: nowrap;
                color: var(--input-text);
                margin-left: -3rem;

                @include for-device(tablet){
                    margin-left: 0rem;
                }
            }

            &-subtitle {
                @include body;
                color: $blue-200;
                text-align: center;
                white-space: normal;
                

                @include for-device(tablet) {
                    width: 20rem;
                    margin-left: 3rem;
                }
            }

            img {
                width: 19.31rem;
                height: 16rem;
               

                @include for-device(tablet) {
                    margin-left: 6.5rem;
                }
            }

            &-message {
                width: 20.6rem;
                height: 27.8rem;
                row-gap: 4.2rem;
            }
        }

        &__invoices {
            margin-top: 3.2rem;
            flex: 1;
            overflow-y: scroll;

            &--empty-state {
                display: flex;
                justify-content: center;
                align-items: center;
            }

            @include for-device(tablet) {
                margin-top: 5.5rem;
            }

            @include for-device(desktop) {
                margin-top: 6.4rem;
            }
        }


        @include for-device(tablet) {
            padding: 6.1rem 4.8rem;
        }

        @include for-device(desktop) {
            padding-top: 7.7rem;
            margin: auto;

            width: 73rem;

        }

        &__actions {
            display: flex;
            &-filter {
                display: flex;
                column-gap: 1.5rem;
                color: var(--input-text);
                cursor: pointer;
                position: relative;
                
                &::before {
                    content: 'Filter'
                }

                #dropdown-icon {
                    content: url('../assets/down.svg')
                }

                &--open-dropdown {
                    #dropdown-icon {
                        content: url('../assets/up.svg')
                    }
                }

                &-dropdown {
                    position: absolute;
                    width: 19.2rem;
                    height: 12.8rem;
                    border-radius: 8px;
                    flex-direction: column;
                    padding: 2.4rem;
                    top: 3.5rem;
                    left: -30%;
                    background: var(--dropdown-bg);
                    z-index: 5;
                    row-gap: 1.5rem;

                    &-option {
                        display: flex;
                        column-gap: 1.3rem;
                        @include heading-sm;
                    
                        input[type='checkbox'] {
                            accent-color: $purple-100;
                        }
                    }

                }

                @include for-device(tablet) {
                    column-gap: 1.4rem;

                    &::before {
                        content: 'Filter by status'
                    }
                }

                &-icon {
                    margin-top: .7rem;
                    margin-right: 1rem;
                }
            }

            &-button {
                width: 9rem;
                height: 4.4rem;
                @include heading-sm;
                column-gap: .8rem;
                
                &::after {
                    content: 'New'
                }

                @include for-device(tablet) {
                    width: 15rem;
                    height: 4.8rem;
                    column-gap: 1.2rem;
                    &::after {
                    content: 'New Invoice'
                }
                }
                
            }

            &-wrapper {
                display: flex;
                justify-content: space-between;
            }

            &-title {
                @include heading-md;
                color: var(--input-text);
                &-wrapper {
                    display: flex;
                    flex-direction: column;
                    row-gap: .3rem;
                    padding-top: .65rem;

                    * {
                        padding: 0;
                        margin: 0;
                    }
                }
            }
            &-subtitle {
                @include body-v;
                color: $blue-200;
            }
        }
    }


    .add-invoice-form {
        width: 100%;
        padding: 3.3rem 2.4rem;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 20;
        overflow-y: scroll ;
        background: var(--add-invoice-bg);
        padding-bottom: 10rem;

        &__nav {
            color: var(--input-text);
            @include heading-sm;
            cursor: pointer;

            @include for-device(tablet) {
                display: none;
            }
        }
   
        @include for-device(tablet) {
            padding: 5.9rem 5.6rem;
            border-radius:  0 20px 20px 0;
            
            width: 61.6rem;
            
        }

        @include for-device(desktop) {
            left: 10.3rem;
            
        }
    }

    .add-invoice-form-bg {
        display: none;

        @include for-device(tablet) {
            display: block;
            position: fixed;
            left: 10.3rem;
            top: 0;
            height: 100vh;
            width: 100%;
            z-index: 15;
            background: rgba(0,0,0, 0.5);
        }
    }
</style>