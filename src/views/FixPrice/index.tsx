import React, { useEffect, useRef, useState } from 'react';
import { Button, Cascader, Input, InputNumber, Select, Space, Table, TableColumnsType, message } from 'antd';
import { ColumnType } from 'antd/es/table';
import { FeesParams, FeesType } from './type';
import {
  activitySpace,
  commission,
  logisticsTime,
  ozonLogisticsFees,
  priceLevel,
  profitRate,
  stampFees,
} from '@/common/constData';
import './index.less';

interface DataType {
  index: number;
  name: string;
  startPrice: number; // 成本价
  pLevel: number; // 定价的价格区间等级
  weight: number; // 重量（g）
  width: number; // 宽度（cm）
  length: number; // 长度（cm）
  height: number; // 高度（cm）
  fees: any[]; // 适用物流及费用
  feesName: string; // 物流名称
  feesPrice: number; // 物流费用
  // 佣金比例
  commission: number;
  category: string; // 类目
  price: number;
}
const FixPrice = () => {
  const [dataSource, setDataSource] = useState<TableColumnsType<DataType>>([]);
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => {
        return <Input />;
      },
    },
    {
      title: '成本价(￥)',
      dataIndex: 'startPrice',
      key: 'startPrice',
      render: (text: number, record: DataType, index: number) => {
        return <InputNumber value={text} onChange={(value) => onChangeTableData('startPrice', value, index)} />;
      },
    },
    {
      title: '定价区间(卢布)',
      dataIndex: 'pLevel',
      key: 'pLevel',
      render: (text: number, record: DataType, index: number) => {
        return (
          <Select value={text} onChange={(level) => onChangeFeesParam('pLevel', level, index)}>
            <Select.Option value={0}>0-1500</Select.Option>
            <Select.Option value={1}>1501-7000</Select.Option>
            <Select.Option value={2}>7001-250000</Select.Option>
          </Select>
        );
      },
    },
    {
      // 类目
      title: '类目',
      dataIndex: 'category',
      key: 'category',
      render: (text: string, record: DataType, index: number) => {
        return (
          <Select
            style={{ width: 220 }}
            onChange={(value, option) => {
              console.log(value, option);
              onChangeTableData('category', value, index);
            }}
            showSearch
          >
            {commission.map((item) => {
              return (
                <Select.Option
                  key={item.name}
                  value={item.name + '-' + item.rate.rFbs.first + '-' + item.rate.rFbs.second}
                >
                  {item.name}
                </Select.Option>
              );
            })}
          </Select>
        );
      },
    },
    {
      // 重量
      title: '重量(g)',
      dataIndex: 'weight',
      key: 'weight',
      render: (text: number, record: DataType, index: number) => {
        return (
          <InputNumber
            value={text}
            onChange={(value) => {
              onChangeFeesParam('weight', value, index);
            }}
          />
        );
      },
    },
    {
      // 长度
      title: '长度(cm)',
      dataIndex: 'length',
      key: 'length',
      render: (text: number, record: DataType, index: number) => {
        return <InputNumber value={text} onChange={(value) => onChangeFeesParam('length', value, index)} />;
      },
    },
    {
      // 宽度
      title: '宽度(cm)',
      dataIndex: 'width',
      key: 'width',
      render: (text: number, record: DataType, index: number) => {
        return <InputNumber value={text} onChange={(value) => onChangeFeesParam('width', value, index)} />;
      },
    },
    {
      // 高度
      title: '高度(cm)',
      dataIndex: 'height',
      key: 'height',
      render: (text: number, record: DataType, index: number) => {
        return <InputNumber value={text} onChange={(value) => onChangeFeesParam('height', value, index)} />;
      },
    },

    {
      title: '物流',
      dataIndex: 'fees',
      key: 'fees',
      render: (text: string, record: DataType, index: number) => {
        return (
          <Cascader
            options={record.fees}
            expandTrigger="hover"
            style={{ width: 260 }}
            displayRender={(labels) => {
              console.log(labels);
              return labels.join('/') + `(${logisticsTime[labels[1] as keyof typeof logisticsTime]})`;
            }}
            onChange={(value, option) => {
              console.log(value, option);
              const logisticsPrice = option[1].price;
              onChangeTableData('feesName', option[1].label, index);
              onChangeTableData('feesPrice', logisticsPrice, index);
            }}
          />
        );
      },
    },
    {
      title: '物流费用(￥)',
      dataIndex: 'feesPrice',
      key: 'feesPrice',
    },
    {
      title: '定价(￥)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text: string, record: DataType, index: number) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              const price = computePrice(record);
              onChangeTableData('price', price, index);
            }}
          >
            计算
          </Button>
        );
      },
    },
  ];
  const [transaction, setTransaction] = useState<ColumnType<DataType> | null>(null);
  const [rate, setRate] = useState(11);
  const [inPercent, setInPercent] = useState(profitRate);
  const [otherOut, setOtherOut] = useState(stampFees);
  const [activitySpaceRate, setActivitySpaceRate] = useState(activitySpace);

  /**
   * 根据价格、重量、尺寸(最长边、三边之和)计算适用物流及费用
   * @param pLevel 定价的价格区间等级
   * @param weight 重量（g）
   * @param width 宽度（cm）
   * @param length 长度（cm）
   * @param height 高度（cm）
   * @returns 物流及费用(￥)
   */
  const getFees = (param: FeesParams) => {
    const { pLevel, weight, width, length, height } = param;
    console.log(param);

    if (!weight || !width || !length || !height) {
      return [];
    }
    const maxLength = Math.max(width, length, height);
    const totalLength = width + length + height;
    const totalWeight = weight;
    const fees = [];
    for (const key in ozonLogisticsFees) {
      if (Object.prototype.hasOwnProperty.call(ozonLogisticsFees, key)) {
        const item = ozonLogisticsFees[key as FeesType];
        if (
          totalLength <= item.totalLength &&
          maxLength <= item.maxLength &&
          totalWeight <= item.maxWeight &&
          totalWeight >= item.minWeight &&
          priceLevel[pLevel].min <= item.minPrice &&
          priceLevel[pLevel].max >= item.maxPrice
        ) {
          fees.push({
            value: key,
            label: key,
            children: [
              {
                value: 'express',
                label: 'express',
                price: weight * item.express.x + item.express.head,
              },
              {
                value: 'standard',
                label: 'standard',
                price: weight * item.standard.x + item.standard.head,
              },
              {
                value: 'economy',
                label: 'economy',
                price: weight * item.economy.x + item.economy.head,
              },
            ],
          });
        }
      }
    }
    console.log('fees', fees);

    return fees;
  };

  /**
   * 计算佣金
   * @param price 成本价（￥）
   * @param pLevel 定价的价格区间等级
   * @param fees 物流及费用(￥)
   * @returns 佣金
   */
  const getCommissionPrice = (params: DataType) => {
    const { startPrice, pLevel, feesPrice } = params;

    const price = startPrice + feesPrice;
    // const commission = Commission[pLevel].min + (price * Commission[pLevel].x) / 100;
    // return commission;
  };

  const onChangeTableData = (key: string, value: any, index: number) => {
    const newDataSource = [...dataSource];
    // @ts-ignore
    newDataSource[index][key] = value;

    setDataSource(newDataSource);
  };

  const onChangeFeesParam = (key: string, value: any, index: number) => {
    const newDataSource = [...dataSource];
    const record = newDataSource[index] as DataType;
    // @ts-ignore
    record[key] = value;
    const fees = getFees({
      pLevel: record.pLevel,
      weight: record.weight,
      width: record.width,
      length: record.length,
      height: record.height,
    });
    record.fees = fees;
    setDataSource(newDataSource);
  };
  const addRow = () => {
    const newDataSource = [...dataSource];
    newDataSource.push({
      // @ts-ignore
      index: newDataSource.length,
      name: '',
      startPrice: 0, // 成本价
      pLevel: 0, // 定价的价格区间等级
      weight: 0, // 重量（g）
      width: 0, // 宽度（cm）
      length: 0, // 长度（cm）
      height: 0, // 高度（cm）
      fees: [], // 适用物流及费用
      feesName: '', // 物流名称
      feesPrice: 0, // 物流费用
      commission: 0, // 佣金
    });
    setDataSource(newDataSource);
  };

  const computePrice = (params: DataType) => {
    if (!params.feesPrice || !params.feesPrice) {
      return message.warning('参数不完整');
    }
    const basePrice = (params.startPrice + otherOut) * (1 + inPercent) + params.feesPrice;
    // 佣金比例
    const commissionRate =
      params.pLevel > 0 ? Number(params.category.split('-')[2]) : Number(params.category.split('-')[1]);

    const profit = basePrice / (1 - commissionRate);
    return profit;
  };

  useEffect(() => {
    console.log(transaction);

    if (transaction) {
      setDataSource([...dataSource, transaction]);
    }
  }, [transaction]);

  return (
    <div className="fix-price-page">
      <div>
        <Space>
          <div>当前汇率（￥/P）：</div>
          <InputNumber value={rate} onChange={(value) => setRate(value!)} />
          <div>利润率：</div>
          <InputNumber value={inPercent} onChange={(value) => setInPercent(value!)} />
          {/* <div>预留广告、活动比例</div>
          <InputNumber value={activitySpaceRate} onChange={value => setActivitySpaceRate(value!)}></InputNumber> */}
          <div>其他固定费用：</div>
          <Input value={otherOut} onChange={(e) => setOtherOut(Number(e.target.value))} />
        </Space>
      </div>
      <div className="btn-wrap g-flex-end">
        <Button onClick={addRow}>添加</Button>
      </div>
      <Table
        columns={columns}
        // @ts-ignore
        dataSource={dataSource}
        rowKey={'index'}
        pagination={{
          pageSize: 20,
        }}
      ></Table>
    </div>
  );
};

export default FixPrice;
