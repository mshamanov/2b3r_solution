<script lang="ts">
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let error: Error | null = null;

    $: {
        if (error) {
            console.error(error.message);
        }
    }
</script>

{#if error}
    <div class="error-container">
        <div class="error-message">
            <p>{error.message}</p>
            <span class="error-close-btn">
                    <button type="button" title="Close error"
                            aria-label="Close error"
                            on:click={() => dispatch("hide-error")}>
                        <i class="bi bi-x-circle"></i>
                    </button>
                </span>
        </div>
    </div>
{/if}

<style>
    .error-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .error-message {
        color: #c24353;
        text-align: center;
        font-size: 0.85rem;
        font-weight: bold;
        margin: -10px;
        display: inline-block;
        position: relative;
    }

    .error-close-btn button {
        color: inherit;
        position: absolute;
        top: -12.5px;
        right: -15px;
        background: none;
        border: none;
    }

    .error-close-btn button:hover {
        transition: all 100ms ease-in-out;
        transform: scale(1.2);
        cursor: pointer;
    }
</style>