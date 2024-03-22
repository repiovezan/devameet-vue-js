<script lang="ts">
import { defineComponent } from 'vue';
import NavigationGen from './NavigationGen.vue';

export default defineComponent({
    components: { NavigationGen }
});
</script>

<template>
    <div class="container-footer">
        <NavigationGen />
    </div>
</template>

<style src="@/assets/styles/footer.scss" lang="scss" />