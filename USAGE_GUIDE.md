# 学术个人主页模板使用指南

这份指南将帮助您理解如何使用和自定义学术个人主页模板。

## 内容管理基础

所有网站内容都通过修改 `contents` 目录下的Markdown (.md) 和YAML (.yml) 文件来更新。您不需要编辑HTML、CSS或JavaScript文件。

## 配置文件详解 (config.yml)

网站的基本配置都在 `contents/config.yml` 文件中设置：

```yaml
# 网站基本配置
site:
  title: "网站标题"         # 显示在浏览器标签和网站顶部的标题
  language: "zh-CN"        # 网站语言
  author: "您的姓名"        # 网站作者
  email: "您的邮箱"         # 联系邮箱

# 自定义颜色配置
colors:
  primary: "#7c72b6"       # 主色调，用于标题、链接等
  secondary: "#f6f6f6"     # 次要颜色，用于背景
  text: "#4c4b54"          # 文本颜色
  link: "#7c72b6"          # 链接颜色
  link_hover: "#bcb2e4"    # 链接悬停颜色
  border: "#c8c8d0"        # 边框颜色

# 导航菜单配置
navigation:
  - title: "首页"           # 菜单项标题
    url: "index.html"      # 链接地址
    id: "home"             # 唯一标识符
  - title: "团队"
    url: "group.html"
    id: "group"
  # ... 其他菜单项

# 头像图片配置
profile_image: "static/assets/img/profile.jpg"

# SEO相关
meta:
  description: "网站描述"
  keywords: "关键词1, 关键词2"
```

## Markdown文件格式说明

### 首页内容

#### 个人简介 (profile.md)

使用标准Markdown语法编写您的个人简介：

```markdown
## 您的姓名(中文名)

目前是 [学校/机构名称](链接) 的 [职称]。

研究兴趣包括...
```

#### 招生信息 (recruitment.md)

```markdown
我正在招收有以下背景的学生：计算机图形学、计算机视觉等。
如有兴趣，请发送邮件至...
```

#### 荣誉奖项 (awards.md)

```markdown
## 主要荣誉与奖项

- 2023 国家自然科学基金优秀青年科学基金项目
- 2022 某某奖项
- ...其他奖项
```

### 团队页面

团队成员信息使用YAML格式的列表：

#### 博士生 (phd_students.md)

```yaml
- name: "学生姓名"
  image: "static/assets/img/students/studentname.jpg"
  research: "研究方向"
  started: "2023"
  link: "学生个人网页链接"

- name: "另一位学生"
  image: "static/assets/img/students/anotherstudent.jpg"
  research: "研究方向"
  started: "2022"
  link: ""
```

#### 校友 (alumni.md)

```yaml
## Ph.D. Students

- name: "校友姓名"
  period: "2019-2024"
  position: "现就职单位"

## Master Students

- name: "校友姓名"
  period: "2020-2023"
  position: "现就职单位"
```

### 出版物页面 (publications.md)

出版物按年份分组，使用Markdown格式：

```markdown
## 2025

### 论文标题

[作者1](作者1链接), [作者2](作者2链接), **您的姓名**

_**会议/期刊名称**_, **2025**.

[项目页面](链接) | [论文](PDF链接) | [代码](代码仓库链接)
```

### 服务页面

#### 编辑委员会 (editorial_board.md)

```markdown
## 期刊编委

- [期刊名称](期刊链接) 职位: 2023-至今
- [另一期刊](链接) 职位: 2020-2022
```

#### 委员会服务 (committees.md)

```markdown
## 程序委员会主席

- [会议名称 2024](会议链接) 职位
- [另一会议 2023](会议链接) 职位

## 程序委员会成员

- 会议名称: [2024](链接), [2023](链接)
```

## 图片管理

- 个人头像: 放置在 `static/assets/img/profile.jpg`
- 学生照片: 放置在 `static/assets/img/students/` 目录下，文件名应与学生信息中的图片路径一致

图片建议使用以下尺寸：
- 个人头像: 300px x 385px 或相近比例
- 学生照片: 正方形，建议尺寸 300px x 300px

## 高级自定义

如果您需要更深入的自定义：

- CSS样式: `static/css/style.css`
- JavaScript功能: `static/js/config-parser.js`
- HTML结构: 各页面的.html文件

## 常见问题

1. **如何添加新页面?**
   创建新的HTML文件，复制现有页面的结构，并修改`config.yml`中的导航菜单。

2. **如何更改网站颜色方案?**
   修改`config.yml`中的colors部分。

3. **如何查看更改效果?**
   运行`bun run dev`启动本地开发服务器。
