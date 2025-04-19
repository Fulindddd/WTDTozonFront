// 各品类佣金
export interface Commission {
  name: string;
  // 佣金比例
  rate: {
    rFbs: {
      // 一级 售价小于1500 P
      first: number;
      // 二级
      second: number;
    };
  };
}
export const commission: Commission[] = [
  {
    name: '内衣和袜类产品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.225,
      },
    },
  },
  {
    name: '季节性内衣和袜类产品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.225,
      },
    },
  },
  {
    name: '美容设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.16,
      },
    },
  },
  {
    name: '美容与健康',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '鞋类',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '季节性鞋类',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '服装和配饰',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.205,
      },
    },
  },
  {
    name: '季节性服装及配饰',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.205,
      },
    },
  },
  {
    name: '专业美容设备',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.075,
      },
    },
  },
  {
    name: '珠宝',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.145,
      },
    },
  },
  {
    name: '戴森配件',
    rate: {
      rFbs: {
        first: 0.06,
        second: 0.06,
      },
    },
  },
  {
    name: '电子产品配饰',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '音频和视频设备配件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.145,
      },
    },
  },
  {
    name: '电子游戏',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.145,
      },
    },
  },
  {
    name: '索尼电子游戏',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '嵌入式大型家用电器',
    rate: {
      rFbs: {
        first: 0.09,
        second: 0.09,
      },
    },
  },
  {
    name: '电脑设备配件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.135,
      },
    },
  },
  {
    name: '游戏主机及配件、摄影器材',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.125,
      },
    },
  },
  {
    name: '空调设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '电脑及笔记本配件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.125,
      },
    },
  },
  {
    name: '办公电脑设备、收银及仓储设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.16,
      },
    },
  },
  {
    name: '小型家用电器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '三星微波炉',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '显示器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.125,
      },
    },
  },
  {
    name: '索尼耳机',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '三星 TWS 耳机',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '不可调的大型家用电器',
    rate: {
      rFbs: {
        first: 0.09,
        second: 0.09,
      },
    },
  },
  {
    name: '笔记本电脑',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '三星笔记本电脑',
    rate: {
      rFbs: {
        first: 0.07,
        second: 0.07,
      },
    },
  },
  {
    name: '电脑外设设备及耗材',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.145,
      },
    },
  },
  {
    name: '软件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.185,
      },
    },
  },
  {
    name: '专业医疗设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '三星吸尘器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '索尼智能手机',
    rate: {
      rFbs: {
        first: 0.09,
        second: 0.09,
      },
    },
  },
  {
    name: '智能手机和平板电脑',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.115,
      },
    },
  },
  {
    name: '三星智能手机和平板电脑',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '智能手表与健身手环',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.115,
      },
    },
  },
  {
    name: '三星智能手表与健身手环',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '台式电脑',
    rate: {
      rFbs: {
        first: 0.09,
        second: 0.09,
      },
    },
  },
  {
    name: '电视机',
    rate: {
      rFbs: {
        first: 0.09,
        second: 0.09,
      },
    },
  },
  {
    name: '苹果设备',
    rate: {
      rFbs: {
        first: 0.07,
        second: 0.07,
      },
    },
  },
  {
    name: '戴森设备',
    rate: {
      rFbs: {
        first: 0.08,
        second: 0.08,
      },
    },
  },
  {
    name: '数码商品',
    rate: {
      rFbs: {
        first: 0.11,
        second: 0.11,
      },
    },
  },
  {
    name: '汽车和摩托车',
    rate: {
      rFbs: {
        first: 0.1,
        second: 0.1,
      },
    },
  },
  {
    name: '汽车用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '游泳池',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.16,
      },
    },
  },
  {
    name: '自行车',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '行车记录仪和雷达探测器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.12,
      },
    },
  },
  {
    name: '装饰、清洁与储物',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '住宅和花园',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '书籍',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.22,
      },
    },
  },
  {
    name: '船只、马达和充气艇',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '家具',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '金属探测器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '装饰材料',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.14,
      },
    },
  },
  {
    name: '新年装饰用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '手动工具和测量仪器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '卫浴设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.14,
      },
    },
  },
  {
    name: '力量和心肺训练器材、蹦床',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.12,
      },
    },
  },
  {
    name: '运动手表',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.12,
      },
    },
  },
  {
    name: '建筑和装修',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '建筑、修缮和园艺设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.16,
      },
    },
  },
  {
    name: '运动和休闲用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.19,
      },
    },
  },
  {
    name: '重型建筑',
    rate: {
      rFbs: {
        first: 0.11,
        second: 0.11,
      },
    },
  },
  {
    name: '水过滤器',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '数字图书',
    rate: {
      rFbs: {
        first: 0.06,
        second: 0.06,
      },
    },
  },
  {
    name: '轮胎',
    rate: {
      rFbs: {
        first: 0.1,
        second: 0.1,
      },
    },
  },
  {
    name: '电动滑板车',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '电子烟及加热系统配件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.24,
      },
    },
  },
  {
    name: '药品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '维生素和膳食补充剂',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '隐形眼镜',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '药用制剂',
    rate: {
      rFbs: {
        first: 0.03,
        second: 0.03,
      },
    },
  },
  {
    name: '矫形用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '辅助药品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '专业口腔护理',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '运动营养',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '康复设备',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.17,
      },
    },
  },
  {
    name: '成人用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.21,
      },
    },
  },
  {
    name: '日化',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '个人卫生用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '食品',
    rate: {
      rFbs: {
        first: 0.11,
        second: 0.11,
      },
    },
  },
  {
    name: '新鲜食品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.135,
      },
    },
  },
  {
    name: '儿童卫生用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '儿童餐具',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.18,
      },
    },
  },
  {
    name: '儿童电子产品、家具、配件',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '玩具',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.175,
      },
    },
  },
  {
    name: '婴儿推车和汽车安全座椅',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '儿童运动用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.2,
      },
    },
  },
  {
    name: '儿童纺织品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.19,
      },
    },
  },
  {
    name: '兴趣、创意与文具',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.16,
      },
    },
  },
  {
    name: '宠物卫生与护理',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '宠物饲料与农场用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.13,
      },
    },
  },
  {
    name: '宠物服饰、运输与遛狗用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '宠物空间整理用品',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.15,
      },
    },
  },
  {
    name: '包装袋',
    rate: {
      rFbs: {
        first: 0.1,
        second: 0.1,
      },
    },
  },
  {
    name: '卖家礼品卡',
    rate: {
      rFbs: {
        first: 0.06,
        second: 0.06,
      },
    },
  },
  {
    name: '旅游',
    rate: {
      rFbs: {
        first: 0.16,
        second: 0.16,
      },
    },
  },
];
// 物流运费
export const logisticsFees = [
  {
    name: 'ozon',
    type: 'ozon',
    rate: {
      rFbs: {
        first: 0.12,
        second: 0.12,
      },
    },
  },
];
// ozon合作物流运费
export const ozonLogisticsFees = {
  /**
   * 轻小件
   * 重量：1-500g
   * 尺寸：三边之和≤90厘米，最长边≤60厘米。
   * 售价：1-1500 p
   */
  extraSmall: {
    minWeight: 1,
    maxWeight: 500,
    totalLength: 90,
    maxLength: 60,
    minPrice: 1,
    maxPrice: 1500,
    express: {
      head: 2.9,
      x: 0.045,
    },
    standard: {
      head: 3,
      x: 0.035,
    },
    economy: {
      head: 3,
      x: 0.025,
    },
  },
  /**
   * 小件
   * 重量：1-2000g
   * 尺寸：三边之和≤150厘米，最长边≤60厘米。
   * 售价：1501-7000 p
   */
  small: {
    minWeight: 1,
    maxWeight: 2000,
    totalLength: 150,
    maxLength: 60,
    minPrice: 1501,
    maxPrice: 7000,
    express: {
      head: 16,
      x: 0.045,
    },
    standard: {
      head: 16,
      x: 0.035,
    },
    economy: {
      head: 16,
      x: 0.025,
    },
  },
  /**
   * 中件
   * 重量：501-25000g
   * 尺寸：三边之和≤150厘米，最长边≤60厘米。
   * 1-1500 p
   */
  budget: {
    minWeight: 501,
    maxWeight: 25000,
    totalLength: 150,
    maxLength: 60,
    minPrice: 1,
    maxPrice: 1500,
    express: {
      head: 23,
      x: 0.033,
    },
    standard: {
      head: 23,
      x: 0.025,
    },
    economy: {
      head: 23,
      x: 0.0217,
    },
  },
  /**
   * 大件
   * 重量：2001-25000g
   * 尺寸：三边之和≤250厘米，最长边≤150厘米。
   * 1501-7000 p
   */
  big: {
    minWeight: 2001,
    maxWeight: 25000,
    totalLength: 250,
    maxLength: 150,
    minPrice: 1501,
    maxPrice: 7000,
    express: {
      head: 36,
      x: 0.033,
    },
    standard: {
      head: 36,
      x: 0.025,
    },
    economy: {
      head: 36,
      x: 0.017,
    },
  },
  /**
   * 轻小贵
   * 重量：1-5000g
   * 尺寸：三边之和≤250厘米，最长边≤150厘米。
   * 7001-250000 p
   * */
  premiumSmall: {
    minWeight: 1,
    maxWeight: 5000,
    totalLength: 250,
    maxLength: 150,
    minPrice: 7001,
    maxPrice: 250000,
    express: {
      head: 22,
      x: 0.045,
    },
    standard: {
      head: 22,
      x: 0.035,
    },
    economy: {
      head: 22,
      x: 0.025,
    },
  },
  /**
   * 重大贵
   * 重量：5001-25000g
   * 尺寸：三边之和≤310厘米，最长边≤150厘米。
   * 7001-250000 p
   * */
  premiumBig: {
    minWeight: 5001,
    maxWeight: 25000,
    totalLength: 310,
    maxLength: 150,
    minPrice: 7001,
    maxPrice: 250000,
    express: {
      head: 62,
      x: 0.033,
    },
    standard: {
      head: 62,
      x: 0.025,
    },
    economy: {
      head: 62,
      x: 0.023,
    },
  },
};
// 代贴单费(￥)
export const stampFees = 2.5;
// 广告、活动预留空间
export const activitySpace = 0.15;
// 价格区间等级（P）
export const priceLevel = [
  { min: 0, max: 1500 },
  { min: 1501, max: 7000 },
  { min: 7001, max: 250000 },
];
// 利润率
export const profitRate = 0.3;
// 物流时效
export const logisticsTime = {
  express: '5-10天',
  standard: '10-15天',
  economy: '20-25天',
};
