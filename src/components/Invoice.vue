
<script setup>
    import InvoiceStatus from './InvoiceStatus.vue';
    import { defineProps } from 'vue';
    import moment from 'moment';

    defineProps({
        invoiceId: String,
        name: String,
        date: String,
        amount: String,
        status: {
            validate(value) {
                return ['paid', 'pending', 'draft'].includes(value);
            }
        }
    })

</script>

<template>
    <div class="invoice-card">
       <h6 class="invoice-card__invoice-id">{{ invoiceId }}</h6>
       <h6 class="invoice-card__name">{{ name }}</h6>
       <h6 class="invoice-card__date">{{ moment(date).format('DD-MM-YYYY hh:mm') }}</h6>
       <h6 class="invoice-card__amount">$ {{ amount }}</h6>
       <InvoiceStatus class="invoice-card__status" :kind="status" />

       <svg class="invoice-card__icon" width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L1 9" stroke="#7C5DFA" stroke-width="2"/>
        </svg>

    </div>
</template>



<style lang="scss">

    .invoice-card {
        width: 100%;
        height: 13.4rem;
        background: var(--dropdown-bg);
        border-radius: 8px;
        cursor: pointer;
        display: grid;
        grid-template-rows: auto auto auto auto auto auto;
        grid-template-columns: auto auto auto auto auto auto;

        * {
            padding: 0;
            margin: 0;
        }

        &__icon {
            display: none;
        }

        &__invoice-id {
            grid-area: 2 / 2 / 3 / 3;
            align-self: center;
            @include heading-sm;
            color: var(--input-text);
            
        }

        &__name {
            grid-area: 2 / 6 / 3 / 7;
            justify-self: center;
            align-self: center;
            @include body-v;
            color: $blue-600;
            width: 10.6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            text-align: center;
        }

        &__date {
            grid-area: 4 / 2 / 5 / 3;
            align-self: center;
            @include body-v;
            color: $blue-200;

        }

        &__amount {
            grid-area: 5 / 2 / 7 / 3;
            @include heading-sm;
            line-height: 24px;
            color: var(--input-text);
        }

        &__status {
            grid-area: 4 / 6 / 7 / 7;
            margin-top: .5rem;  
            justify-self: center;
        }



        &:hover, &:active {
            border: 1px solid $purple-100;
        }

        @include for-device(tablet) {
            height: 7.2rem;
     
            justify-items: center;


            &__invoice-id {
                grid-area: 4 / 1 / 5 / 1;
            }

            &__date {
                grid-area: 4 / 2 / 5 / 2;
            }

            &__name {
                grid-area: 4 / 3 / 5 / 3;
            }

            &__amount {
                grid-area: 4 / 4 / 5 / 4;
                align-self: center;
            }

            &__status {
                grid-area: 4 / 5 / 5 / 5 ;
                margin-top: 0;
                
            }

            &__icon {
                display: block;
                grid-area: 4 / 6 / 5 / 6;
                margin-top: 1.5rem;
            }
        }

    }
</style>


