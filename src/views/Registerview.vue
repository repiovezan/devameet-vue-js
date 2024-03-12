<script lang="ts">
import { defineComponent } from 'vue'
import PublicInput from '../components/general/CustomInput.vue'
import loginIcon from '../assets/images/mail.svg';
import userIcon from '../assets/images/user.svg';
import passwordIcon from '../assets/images/key.svg';
import router from '../router';
import InputAvatar from '../components/general/InputAvatar.vue';
import RegisterServices from '../services/RegisterServices';

const registerServices = new RegisterServices()

export default defineComponent({
    setup() {
        return {
            loginIcon,
            passwordIcon,
            userIcon,
            registerServices
        };
    },
    data() {
        return {
            email: "",
            name: "",
            password: "",
            confirmacao: "",
            loading: false,
            error: "",
            image: ""
        };
    },
    methods: {
        async cadastrar() {
            console.log('cadastrar')
            try {
                this.error = "";
                if (!this.email || !this.email.trim() ||
                    !this.name || !this.name.trim() ||
                    !this.password || !this.password.trim() ||
                    !this.confirmacao || !this.confirmacao.trim() ||
                    !this.image || !this.image.trim()) {
                    return this.error = "Favor preencher o formulário";
                }

                if (this.password !== this.confirmacao) {
                    return this.error = "Senha e confirmação não são iguais";
                }
                this.loading = true;

                const body = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    avatar: this.image,
                }

                await registerServices.register(body);

                this.loading = false;
                return router.push({ name: 'login', query: { cadastroSucesso: 'true' } });
            } catch (e: any) {
                console.log('Erro ao efetuar cadastro:', e);
                this.loading = false;
                if (e?.response?.data?.message) {
                    return this.error = e?.response?.data?.message;
                } else {
                    return this.error = "Não foi possível efetuar o cadastro, tente novamente!";
                }
            }
        },
        setNome(v: any) {
            this.name = v;
        },
        setEmail(v: any) {
            this.email = v;
        },
        setSenha(v: any) {
            this.password = v;
        },
        setCorfirmarSenha(v: any) {
            this.confirmacao = v;
        },
        setImagem(v: any) {
            this.image = v;
        }
    },
    components: { PublicInput, InputAvatar },
    computed: {
        buttonText() {
            return this.loading ? "...Carregando" : "Cadastrar"
        }
    }
});
</script>

<template>
    <div :class="['container-public', 'register']">
        <img src="../assets/images/logo.svg" alt="Logo Devagram" class="logo" />
        <form>
            <InputAvatar :image="image" @setImagem="setImagem" />

            <p v-if="error" class="error">{{ error }}</p>

            <PublicInput :icon="userIcon" alt="Nome Completo" name="Nome Completo" placeholder="Nome Completo"
                type="text" :modelValue="name" @setInput="setNome" />

            <PublicInput :icon="loginIcon" alt="E-mail" name="Email" placeholder="E-mail" type="text"
                :modelValue="email" @setInput="setEmail" />

            <PublicInput :icon="passwordIcon" alt="Senha" name="Senha" placeholder="Senha" type="password"
                :modelValue="password" @setInput="setSenha" />

            <PublicInput :icon="passwordIcon" alt="Confirmar Senha" name="Confirmar" placeholder="Confirmar Senha"
                type="password" :modelValue="confirmacao" @setInput="setCorfirmarSenha" />

            <button @click.enter.prevent="cadastrar" :disabled="loading">{{ buttonText }}</button>
            <div class="link row">
                <p>Já possui uma conta?</p>
                <router-link :to="{ name: 'login' }">Faça seu login agora!</router-link>
            </div>
        </form>
    </div>
</template>


<style src="@/assets/styles/public.scss" lang="scss" />