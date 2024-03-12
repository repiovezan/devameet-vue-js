<script lang="ts">
import { defineComponent } from 'vue'
import HeaderComponent from '../components/general/Header.vue';
import FooterComponent from '../components/general/Footer.vue';
import HomeMeetComponent from '../components/meet/HomeMeet.vue';

export default defineComponent({
    components: { HeaderComponent, FooterComponent, HomeMeetComponent },
});
</script>

<template>
    <HeaderComponent />
    <HomeMeetComponent />
    <FooterComponent />
</template>