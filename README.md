## 劳务教育系统移动端

## 安装

### 安装

```shell
# 克隆项目
git clone git@github.com:isccya/vitesse.git

# 进入项目目录
cd

# 安装依赖
pnpm install
# If you don't have pnpm installed, run: npm install -g pnpm
# 注：如果卡在安装cypress这里可将`package.json`中的`"cypress": "^12.0.2",`删掉再重新安装
```

### 运行

```shell
pnpm run dev
```

## 大致介绍

项目框架使用https://github.com/antfu/vitesse

- 组件写在`components`文件夹里面会自动读取，可以直接使用
- `composition Api`不用引入直接使用
- `pages`文件夹下的文件路径就是路由路径
- `layouts`文件夹下可以书写布局，可以用来写一些`navbar`、`header`、`footer`等

### 相关开发文档

- 工具类`css`框架：[windi.css](https://cn.windicss.org/guide/)
  注意：项目中使用[unocss](https://github.com/unocss/unocss)，它支持`windi.css`的写法，同时更加灵活
- `vue3`文档：https://cn.vuejs.org/guide/introduction.html
- 组件库：[vant](https://vant-ui.github.io/vant/#/zh-CN)
- 企业微信开发文档：https://developer.work.weixin.qq.com/document/path/90556
- `pinia`状态管理库：https://pinia.vuejs.org/
