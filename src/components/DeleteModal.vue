<script setup>
    import Button from '../components/Button.vue';
    import { defineEmits } from 'vue';

    const $emit = defineEmits(['cancel', 'delete'])

</script>

<template>
    <div class="modal-wrapper">

        <div class="modal">
            <h1 class="modal__title">Confirm Deletion</h1>
            <p class="modal__message">
                Are you sure you want to delete this invoice? This action cannot be undone.
            </p>

            <div class="modal__actions">
                <Button kind="secondary" @click="$emit('cancel')">Cancel</Button>
                <Button kind="danger" @click="$emit('delete')">Delete</Button>
            </div>
        </div>
    </div>
    
</template>


<style lang="scss">
    .modal-wrapper {
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: 50;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;


        .modal {
            width: 32.7rem;
            height: fit-content;
            background: var(--input-bg);
            border-radius: 8px;
            padding: 3.4rem 3.2rem;

            @include for-device(tablet) {
                width: 48rem;
                height: 24.9rem;
                /* padding: 5.1rem 4.8rem; */
            }

            &__title {
                @include heading-md;
                color: var(--input-label);
            }
            &__message {
                @include body;
                line-height: 22px;
                color: $blue-200;
            }

            &__actions {
                display: flex;
                justify-content: flex-end;
                column-gap: .8rem;

                & > button:first-child {
                    width: 9.1rem;
                }

                & > button {
                    width: 8.9rem;
                    height: 4.8rem;
                    border-radius: 24px;
                    justify-content: center;
                    @include heading-sm;
                }
            }
        }
    }

</style>