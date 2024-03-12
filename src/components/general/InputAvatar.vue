<script lang="ts">
import AvatarIcon from '../../assets/images/avatar.svg';
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            showModal: false,
            selected: null as string | null,
            avatares: [
                { value: 'avatar_01' },
                { value: 'avatar_02' },
                { value: 'avatar_03' },
                { value: 'avatar_04' },
                { value: 'avatar_05' },
                { value: 'avatar_06' },
                { value: 'avatar_07' },
                { value: 'avatar_08' },
                { value: 'avatar_09' }
            ]
        }
    },
    props: {
        image: String,
        alt: String
    },
    computed: {
        avatarImage() {
            if (this.image && this.image.trim().length > 0) {
                const path = `../../assets/objects/avatar/${this.image}_front.png`;
                const imageUrl = new URL(path, import.meta.url)
                return imageUrl.href;
            }
            return AvatarIcon;
        }
    },
    methods: {
        getAvatarUrl(avatar: string): string {
            const path = `../../assets/objects/avatar/${avatar}_front.png`;
            const imageUrl = new URL(path, import.meta.url)
            return imageUrl.href;
        },
        submitAvatar() {
            if (this.selected) {
                this.$emit('setImagem', this.selected);
            }
            this.showModal = false;
        },
        isSelected(avatar: any) {
            console.log(avatar.value === this.selected)
            return avatar.value === this.selected ? 'selected' : '';
        }
    }
});
</script>

<template>
    <div class="container-upload-image" @click="showModal = true">
        <div class="avatar">
            <img :src="avatarImage" :alt="alt" />
        </div>
        <GDialog v-model="showModal">
            <div class="wrapper">
                <div class="content">
                    <p>Avatar</p>
                    <span>Selecione seu avatar</span>
                    <div class="line"></div>
                    <div class="avatars">
                        <div v-for="avatar in avatares" class="container-avatar" :class="isSelected(avatar)"
                            :key="avatar.value" @click="selected = avatar.value">
                            <img :src="getAvatarUrl(avatar.value)" />
                        </div>
                    </div>
                </div>

                <div class="actions">
                    <span @click="showModal = false">Voltar</span>
                    <button type="button" @click="submitAvatar">Salvar</button>
                </div>
            </div>
        </GDialog>
    </div>
</template>

<style src="@/assets/styles/inputUpload.scss" lang="scss" />