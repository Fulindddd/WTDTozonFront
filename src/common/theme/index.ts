import { ThemeConfig, theme } from 'antd';
// 定制 antd5 主题

export const colorSuccess = '#CE1D28';
export const colorPrimary = '#CE1D28';

const antdTheme: ThemeConfig = {
  token: {
    colorPrimary,
    colorSuccess,
    // colorPrimaryBg: "#fff",
    colorLink: colorPrimary,
    colorLinkHover: colorPrimary,
    colorLinkActive: colorPrimary,
  },
  components: {
    Menu: {
      itemBorderRadius: 0,
    },
    Descriptions: {
      lineHeight: 2.2857142857,
    },
    Divider: {
      marginLG: 12,
      colorSplit: '#999',
    },
  },
};

export default antdTheme;
