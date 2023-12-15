import config from '../config/index'
import { showFailToast, showLoadingToast, showSuccessToast } from "vant";
import { UserModule } from "~/types"
import {  getToken, removeToken } from "~/utils/cookies";

// 配置全局前置路由守卫
export const install: UserModule = ({ router }) => {
    router.beforeEach((to, from, next) => {
        // 测试登陆
        // removeToken();
        const token = getToken();
        const user = useUserStore();
        if (token !== '' && token !== null && token !== undefined) {
            next();
        }
        else {
            console.log('登陆中...');
            showLoadingToast({
                message: '登录中...',
                duration: 0,
            })
            if (config.isLoginTest) { //测试环境
                user.testLogin().then((res: any) => {
                    showSuccessToast('登陆成功');
                    next();
                }).catch(() => {
                    showFailToast('登陆失败');
                })
            } else { //生产环境
                const code = to.query.code;
                user.login(code, to.path, to.query).then(() => {
                    showSuccessToast('登陆成功');
                    next();
                }).catch((error) => {
                    showFailToast({
                        message: '登陆失败'
                    })
                })
            }
        }
    })
}