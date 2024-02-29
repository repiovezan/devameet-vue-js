=<script lang="ts">
    import {defineComponent} from 'vue'
    import PublicInput from '../components/general/PublicInput.vue'
    import loginIcon from '../assets/images/mail.svg';
    import passwordIcon from '../assets/images/key.svg';
    import LoginServices from '../services/LoginServices';
    import router from '../router';

    const loginServices = new LoginServices()
    export default defineComponent({
    setup() {
        return {
            loginIcon,
            passwordIcon,
            loginServices
        };
    },
    data() {
        return {
            login: "",
            password: "",
            loading: false,
            error: "",
        };
    },
    props:{
        msg: String,
    },
    methods: {
        async efetuarLogin() {
            try {
                if(!this.login || !this.login.trim() 
                    || !this.password || !this.password.trim()){
                    this.error = "Favor informar usuário e password";
                    return;
                }
                this.loading = true;
                await loginServices.login({
                login: this.login,
                password: this.password
                });
                this.loading = false;
                router.push('/');
            }catch(e : any){
                console.log('Erro ao efetuar login:', e);
                this.loading = false;
                if(e?.response?.data?.erro){
                    return this.error = e?.response?.data?.erro;
                }else{
                    return this.error = "Não foi possível efetuar o login, tente novamente!";
                }
            }
        },
        setLogin(v:any){
            this.login = v;
        },
        setpassword(v:any){
            this.password = v;
        }
    },
    components: { PublicInput },
    computed:{
        buttonText(){
            return this.loading ? "...Carregando" : "Login"
        }
    }
});
</script>

<template>
    <div class="container-public">
        <img src="../assets/images/logo.svg" alt="Logo Devameet" class="logo" />
        <form>
           <p v-if="error" class="error">{{error}}</p>

            <PublicInput :icon="loginIcon" alt="Login" name="Login" placeholder="Login" type="text"
                :modelValue="login" @setInput="setLogin" />

            <PublicInput :icon="passwordIcon" alt="Senha" name="Senha" placeholder="Senha" type="password"
                :modelValue="password" @setInput="setpassword" />

            <button @click.enter.prevent="efetuarLogin" 
                :disabled="loading">{{buttonText}}</button>
            <div class="link">
                <p>Não possui uma conta?</p>
                <router-link to="/register">Faça seu cadastro agora!</router-link>
            </div>
        </form>
    </div>
</template>

<style src="@/assets/styles/public.scss" lang="scss"/>