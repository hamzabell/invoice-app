<script setup >
    import { defineProps  } from 'vue';

    defineProps({
        kind: {
            validator(value) {
                return ['primary', 'secondary', 'danger'].includes(value);
            }
        }
    })
</script>

<template>
    <button class="app-button" :class="{ 
        'app-button--primary': kind == 'primary',
        'app-button--secondary': kind == 'secondary',
        'app-button--danger': kind == 'danger'
        }" >
        <slot name="icon"></slot>
        <slot></slot>
    </button>
</template>

<style lang="scss">
    .app-button {
        border-radius: 24px;
        display: flex;
        align-items: center;
        border: none;
        outline: none;
        cursor: pointer;

        &--primary {
            color: $white;
            background: $purple-100;
        }

        &--secondary {
            color: var(--edit-color);
            background: var(--edit);
        }

        &--danger {
            background: $red-100;
            color: $white;
        }


        &:hover {
            opacity: .6;
        }

        &:disabled {
            opacity: .4;
        }

    }

</style>