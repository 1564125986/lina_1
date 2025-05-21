/**
 * config-parser.js
 * 处理配置文件和Markdown内容
 */

// 加载配置文件并应用到网站
async function loadConfig() {
  try {
    const response = await fetch('../../contents/config.yml');
    const configText = await response.text();
    const config = parseSimpleYAML(configText);

    // 应用配置到网站
    applyConfig(config);

    return config;
  } catch (error) {
    console.error('Error loading config:', error);
    return null;
  }
}

// 简单的配置文件解析器
function parseSimpleYAML(text) {
  const config = {};
  const lines = text.split('\n');

  for (const line of lines) {
    // 跳过空行和注释
    if (!line.trim() || line.trim().startsWith('#')) continue;

    // 处理键值对 (key: value)
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // 如果值被引号包围，去除引号
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.substring(1, value.length - 1);
      }

      config[key] = value;
    }
  }

  return config;
}

// 应用配置到网站
function applyConfig(config) {
  if (!config) return;

  // 设置网站标题
  document.title = config.site_title || 'Academic Website';

  // 设置CSS变量
  const root = document.documentElement;
  root.style.setProperty('--primary-color', config.color_primary || '#7c72b6');
  root.style.setProperty('--secondary-color', config.color_secondary || '#f6f6f6');
  root.style.setProperty('--text-color', config.color_text || '#4c4b54');
  root.style.setProperty('--link-color', config.color_link || '#7c72b6');
  root.style.setProperty('--link-hover-color', config.color_link_hover || '#bcb2e4');
  root.style.setProperty('--border-color', config.color_border || '#c8c8d0');

  // 设置网站标题
  const titleElement = document.getElementById('wsite-title');
  if (titleElement) {
    titleElement.textContent = config.site_title || 'Academic Website';
  }

  // 生成导航菜单
  const navElement = document.querySelector('#navigation ul');
  if (navElement) {
    navElement.innerHTML = '';

    // 查找所有导航项
    const navItems = [];
    for (let i = 1; i <= 10; i++) { // 最多支持10个导航项
      const titleKey = `nav${i}_title`;
      const urlKey = `nav${i}_url`;
      const idKey = `nav${i}_id`;

      if (config[titleKey] && config[urlKey]) {
        navItems.push({
          title: config[titleKey],
          url: config[urlKey],
          id: config[idKey] || `nav${i}`
        });
      }
    }

    // 添加导航项到菜单
    navItems.forEach(item => {
      const li = document.createElement('li');

      // 检查当前页面是否激活
      const currentPath = window.location.pathname;
      const isActive = currentPath.endsWith(item.url) ||
                      (currentPath.endsWith('/') && item.url === 'index.html');

      if (isActive) {
        li.id = 'active';
      } else {
        li.id = `pg_${item.id}`;
      }

      li.innerHTML = `<a href="${item.url}">${item.title}</a>`;
      navElement.appendChild(li);
    });
  }
}

// 加载并解析Markdown内容
async function loadMarkdownContent(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error(`Error loading Markdown from ${filePath}:`, error);
    return '';
  }
}

// 简单的Markdown解析器
function parseMarkdown(markdown) {
  if (!markdown) return '';

  // 替换标题
  let html = markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // 替换链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>');

  // 替换粗体
  html = html.replace(/\*\*([^*]+)\*\*/gim, '<strong>$1</strong>');

  // 替换斜体
  html = html.replace(/\*([^*]+)\*/gim, '<em>$1</em>');

  // 替换列表
  html = html.replace(/^\s*-\s*(.*$)/gim, '<li>$1</li>');
  html = html.replace(/<\/li>\n<li>/gim, '</li><li>');

  // 将连续的列表项包装在<ul>中
  let inList = false;
  const lines = html.split('\n');
  let result = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('<li>')) {
      if (!inList) {
        result += '<ul>';
        inList = true;
      }
      result += line;
    } else {
      if (inList) {
        result += '</ul>';
        inList = false;
      }
      result += line + '\n';
    }
  }

  if (inList) {
    result += '</ul>';
  }

  // 替换段落
  result = result.replace(/^([^<].*)\n$/gim, '<p>$1</p>');

  // 清理空行
  result = result.replace(/^\s*[\r\n]/gm, '');

  return result;
}

// 解析YAML格式的内容列表
function parseYamlList(content) {
  if (!content) return [];

  const items = [];
  const lines = content.split('\n');
  let currentItem = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 跳过注释、空行和标题行
    if (line === '' || line.startsWith('#') || line.startsWith('##')) continue;

    if (line.startsWith('- name:')) {
      // 新项目开始
      if (currentItem) {
        items.push(currentItem);
      }
      currentItem = { name: line.substring(8).trim().replace(/["']/g, '') };
    } else if (currentItem && line.includes(':')) {
      // 项目的属性
      const parts = line.split(':');
      const key = parts[0].trim().replace('- ', '');
      const value = parts.slice(1).join(':').trim().replace(/["']/g, '');
      currentItem[key] = value;
    }
  }

  // 添加最后一个项目
  if (currentItem) {
    items.push(currentItem);
  }

  return items;
}

// 导出函数供页面使用
window.configUtils = {
  loadConfig,
  loadMarkdownContent,
  parseMarkdown,
  parseYamlList
};
