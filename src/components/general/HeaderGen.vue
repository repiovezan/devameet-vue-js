<script lang="ts">
import { defineComponent } from 'vue';
import NavigationGen from './NavigationGen.vue';

export default defineComponent({
    components: { NavigationGen },
    props: {
        hide: Boolean
    }
});
</script>

<template>
    <div class="container-header" :class="{ hide: hide }">
        <img src="../../assets/images/logo.svg" alt="Logo Devameet" class="logo" />
        <NavigationGen />
    </div>
</template>

<style src="@/assets/styles/header.scss" lang="scss" />