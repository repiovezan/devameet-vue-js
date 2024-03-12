<script lang="ts">
import { defineComponent } from 'vue';
import router from '../../router';
import linkIcon from '../../assets/images/link.svg';
import linkActiveIcon from '../../assets/images/link_active.svg';
import homeIcon from '../../assets/images/home.svg';
import homeActiveIcon from '../../assets/images/home_active.svg';
import AvatarIcon from '../../assets/images/avatar.svg';
export default defineComponent({
    setup() {
        return {
            linkIcon,
            linkActiveIcon,
            homeIcon,
            homeActiveIcon,
            AvatarIcon
        }
    },
    computed: {
        avatarImage() {
            const avatar = localStorage.getItem('avatar');
            if (avatar) {
                const path = `../../assets/objects/avatar/${avatar}_front.png`;
                const imageUrl = new URL(path, import.meta.url)
                return imageUrl.href;
            }
            return AvatarIcon;
        },
        getClassAvatarSelected() {
            if (router.currentRoute.value.name === 'user') {
                return 'selected';
            }
            return '';
        }
    },
    methods: {
        executeNavigation(name: string) {
            router.push({ name });
        },
        getIcon(nome: string) {
            switch (nome) {
                case 'home':
                    if (router.currentRoute.value.name === 'home' ||
                        router.currentRoute.value.path === '/') {
                        return homeActiveIcon;
                    }
                    return homeIcon;
                case 'room':
                    if (router.currentRoute.value.name === 'room' ||
                        router.currentRoute.value.path === '/room') {
                        return linkActiveIcon;
                    }
                    return linkIcon;
                default:
                    return '';
            }
        }
    }
});
</script>
<template>
    <nav class="container-navigation">
        <ul>
            <li v-on:click="executeNavigation('home')">
                <img :src="getIcon('home')" alt='icone home' className="iconeNav" />
            </li>

            <li v-on:click="executeNavigation('room')">
                <img :src="getIcon('room')" alt='icone room' className="iconeNav" />
            </li>

            <li v-on:click="executeNavigation('user')">
                <div class="avatar mini" :class="getClassAvatarSelected">
                    <img :src="avatarImage" alt="Editar usuario" />
                </div>
            </li>
        </ul>
    </nav>
</template>






<style lang="scss" src="@/assets/styles/navigation.scss" />