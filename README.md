# 学术个人主页模板

这是一个简洁、易于维护的学术个人主页模板。用户只需修改Markdown文件和配置文件，即可更新网站内容，无需编辑HTML或CSS代码。

## 项目特点

- 使用Markdown文件管理内容，简单易维护
- 通过YAML配置文件控制网站设置
- 响应式设计，适配不同设备
- 简洁、专业的学术风格

## 目录结构

```
├── contents/              # 内容文件夹
│   ├── config.yml         # 网站配置文件
│   ├── home/              # 首页内容
│   ├── group/             # 团队页面内容
│   ├── publications/      # 出版物页面内容
│   └── services/          # 服务页面内容
│
├── static/                # 静态资源文件夹
│   ├── assets/            # 资源文件
│   │   └── img/           # 图片文件
│   ├── css/               # CSS样式文件
│   └── js/                # JavaScript文件
│
├── index.html             # 首页HTML
├── group.html             # 团队页面HTML
├── publications.html      # 出版物页面HTML
└── services.html          # 服务页面HTML
```

## 如何修改内容

### 基本设置

编辑 `contents/config.yml` 文件可以修改网站的基本设置，包括：

- 网站标题
- 导航菜单
- 颜色方案
- 头像图片路径

### 修改页面内容

1. **首页内容**
   - 个人资料: `contents/home/profile.md`
   - 招生信息: `contents/home/recruitment.md`
   - 荣誉奖项: `contents/home/awards.md`

2. **团队页面**
   - 博士生: `contents/group/phd_students.md`
   - 硕士生: `contents/group/master_students.md`
   - 校友: `contents/group/alumni.md`

3. **出版物页面**
   - 文献列表: `contents/publications/publications.md`

4. **服务页面**
   - 编辑委员会: `contents/services/editorial_board.md`
   - 委员会和审稿: `contents/services/committees.md`

### 替换图片

将图片文件放入 `static/assets/img/` 目录中：

- 个人头像: `static/assets/img/profile.jpg`
- 学生照片: `static/assets/img/students/[学生姓名].jpg`

## 本地开发

```bash
# 安装依赖
bun install

# 启动开发服务器
bun run dev
```

## 部署网站

```bash
# 构建生产版本
bun run build

# 预览生产版本
bun run preview
```

构建后的文件将位于 `dist` 目录，可以部署到任何静态网站托管服务。
