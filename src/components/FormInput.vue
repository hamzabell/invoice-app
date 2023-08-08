<script setup>
    import { defineProps } from 'vue';

    defineProps({
        label: String,
        error: {
            type: Boolean,
            default: false
        }
    })
</script>
<template>
    <div class="form-input">
        <label class="form-input__label" :class="{ 'form-input__label--has-error': error}">{{ label }}</label>
        <div class="form-input__input-wrapper" :class="{ 'form-input__input-wrapper--error': error }">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
    .form-input {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: .9rem;

        &__label {
            @include body-v;
            color: var(--input-label);

            &--has-error {
                color: $red-100;
            }
        }

        &__input-wrapper {
            width: 100%;
            & > * {
                border: 1px solid var(--input-border);
                outline: none;
                width: 100%;
                background: var(--input-bg);
                color: var(--input-text);
                @include body-v;
                padding: 1.5rem 2rem;
                border-radius: 4px;
                
                &:hover, &:focus {
                    border: 1px solid $purple-100;
                }
            }

            &--error {
                & > * {
                    border: 1px solid $red-100;
                }
            }
        }
    }
</style>