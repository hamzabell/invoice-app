<script setup>
    import Button from './Button.vue';
    import { defineEmits, defineProps  } from 'vue';

    const $emit = defineEmits(['edit', 'delete', 'paid' ])

    defineProps({
        isPaid: {
            type: Boolean,
            default: true
        }
    })
</script>
<template>
    <div class="button-group">
        <Button class="button-group__edit" kind="secondary" @click="$emit('edit')">Edit</Button>
        <Button class="button-group__delete" kind="danger" @click="$emit('delete')">Delete</Button>
        <Button class="button-group__paid" kind="primary" :disabled="isPaid" @click="$emit('paid')" >Mark as Paid</Button>

    </div>
</template>

<style lang="scss">
    %button-ext {
        height: 4.8rem;
        justify-content: center;
        @include heading-sm;
    }

    .button-group {
        display: flex;
        column-gap: .8rem;

        &__edit {
            width: 7.3rem;
            height: 4.8rem;
            @extend %button-ext;
        }

        &__delete {
            width: 8.9rem;
            height: 4.8rem;
            @extend %button-ext;

            &::disabled {
                opacity: .4;;
            }
        }

        &__paid {
            width: 13.1rem;
            height: 4.8rem;
            @extend %button-ext;
        }
    }

</style>