import { useAccessTokenStore } from '@/stores/accessToken';
import {HttpApiServices} from './HttpApiServices';

export default class LoginService extends HttpApiServices  {
  async login(body:any) {

    const store = useAccessTokenStore();

    const { data } = await this.post('/auth/login', body);

    localStorage.setItem('email', data.email);
    localStorage.setItem('token', data.token);
    store.setStoken(data.token);

    const usuarioResponse = await this.get('/user');
    if(usuarioResponse && usuarioResponse.data){
        const usuario = usuarioResponse.data;

        localStorage.setItem('id', usuario.id);
        localStorage.setItem('name', usuario.nome);

        if (usuario.avatar) {
          localStorage.setItem('avatar', usuario.avatar);
        }
    }

    
  }

  logout() {
    const store = useAccessTokenStore();
    localStorage.removeItem('_id');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    store.setStoken('');
  }
}