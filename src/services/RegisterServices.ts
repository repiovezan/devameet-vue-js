import { HttpApiServices } from './HttpApiServices';

export default class RegisterServices extends HttpApiServices {
    async register(body: any) {
        await this.post('/auth/register', body);
    }
}