<script setup>
    import { defineProps } from 'vue';

    defineProps({
        kind: {
            validate(value) {
                return ['paid', 'pending', 'draft'].includes(value);
            }
        }
    })
</script>

<template>
    <div class="invoice-status" 
        :class="{ 
            'invoice-status--paid': kind == 'paid',
            'invoice-status--pending': kind == 'pending',
            'invoice-status--draft': kind == 'draft'
        }"
    >
     <div class="invoice-status__bulb" />
     <p class="invoice-status__text">{{ kind }}</p>
    </div>
</template>

<style lang="scss">
    .invoice-status {
        width: 10.4rem;
        height: 4rem;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 1.2rem;
        cursor: pointer;

        &__text {
            text-transform: capitalize;
            @include heading-sm;
        }

        &__bulb {
            width: .8rem;
            height: .8rem;
            border-radius: 999px;
        }

        &--paid {
            color: $paid;
            background: $paid-bg;

            .invoice-status__bulb {
                background: $paid;
            }
        }


        &--draft {
            color: var(--input-text);
            background: $draft-bg;

            .invoice-status__bulb {
                background: var(--input-text);
            }
        }

        &--pending {
            color: $pending;
            background: $pending-bg;

            .invoice-status__bulb {
                background: $pending;
            }
        }

}
</style>