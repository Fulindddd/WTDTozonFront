import { ReactNode, useMemo, useRef, useState } from 'react';
import {
  Button,
  DatePicker,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  message,
  Upload,
  Descriptions,
  Divider,
  Image,
} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import CommonTable, { ITabelRef } from '@/components/table';
import Img from '@/assets/images/logo.png';
import './index.less';
import { getOrderList } from '@/axiosInstance/api';
// import { delCV, getCVs } from '@/axiosInstance/recruitment';

const { Dragger } = Upload;

enum enumModalType {
  moldCheck = 'moldCheck',
  simulationCheck = 'simulationCheck',
  offer = 'offer',
  upload = 'upload',
}

export default function OrderList() {
  const table = useRef<ITabelRef>(null);

  const [searchTerm, setSearchTerm] = useState({
    name: '',
    type: '',
    status: '',
    userName: '',
    startTime: '',
    endTime: '',
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(enumModalType.moldCheck);
  const [bid, setBid] = useState('');
  const [bidConfirm, setBidConfirm] = useState(false);

  const confirm = async () => {};

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '订单名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '订单提交时间',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
    },
    {
      title: '用户名称',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '订单金额',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <>
          {record.status === '待报价' ? (
            <Button
              type="link"
              onClick={() => {
                setModalOpen(true);
                setModalType(enumModalType.offer);
              }}
            >
              报价
            </Button>
          ) : (
            <Button
              type="link"
              onClick={() => {
                setModalOpen(true);
                setModalType(record.type === '模具设计' ? enumModalType.moldCheck : enumModalType.simulationCheck);
              }}
            >
              查看
            </Button>
          )}

          {record.status === '待付款' && (
            <Popconfirm title="确定确认收款吗?" onConfirm={confirm}>
              <Button type="link">确认收款</Button>
            </Popconfirm>
          )}
          {(record.status === '设计中' || record.status === '已交付') && (
            <Button
              type="link"
              onClick={() => {
                setModalOpen(true);
                setModalType(enumModalType.upload);
              }}
            >
              上传交付材料
            </Button>
          )}
        </>
      ),
    },
  ];

  const modalContent = useMemo(() => {
    let title: string | null = '订单详情';
    let content: ReactNode = null;
    let width = 650;
    if (modalType === enumModalType.upload) {
      title = '交付材料：';
      width = 520;
      content = (
        <Dragger
          maxCount={1}
          beforeUpload={(file) => {
            // 获取文件后缀并转为小写
            const fileName = file.name.toLowerCase();
            const fileExt = fileName.split('.').pop();

            // 允许的扩展名列表
            const allowedExts = ['zip', '7z'];

            const isZip = allowedExts.includes(fileExt!);

            if (!isZip) {
              message.error(`请检查文件类型并重新上传`);
            }
            return isZip || Upload.LIST_IGNORE;
          }}
          accept=".zip,.7z"
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-hint">点击或拖动文件到此区域以上传，支持的文件格式：zip、7z</p>
        </Dragger>
      );
    }
    if (modalType === enumModalType.moldCheck) {
      content = (
        <>
          <Descriptions
            style={{ marginTop: 12 }}
            column={1}
            items={[
              {
                label: '模型',
                children: '',
              },
              {
                label: '材料',
                children: '',
              },
            ]}
          />
          <Divider dashed />
          <Descriptions
            column={2}
            items={[
              {
                label: '压铸机吨位（T）',
                children: '',
              },
              {
                label: '产品最小壁厚',
                children: '',
              },
              {
                label: '滑块总投影面积',
                children: '',
              },
              {
                label: '产品分型类型',
                children: '',
              },
              {
                label: '产品总体积',
                children: '',
              },
              {
                label: '模穴数量',
                children: '',
              },
            ]}
          />
          <Divider dashed />
          <Descriptions
            column={1}
            items={[
              {
                label: '设计需求',
                children: '',
              },
              {
                label: '模流需求',
                children: '',
              },
              {
                label: '补充材料',
                children: '',
              },
            ]}
          />
          <Divider dashed />
          <Descriptions
            column={1}
            items={[
              {
                label: '预估费用',
                children: (
                  <>
                    XXXX <Button type="link">查看报价单</Button>
                  </>
                ),
              },
              {
                label: '交期（工作日）',
                children: '7个工作日内',
              },
              {
                label: '支付凭证',
                children: <Image width={200} src={Img} />,
              },
            ]}
          />
        </>
      );
    }
    if (modalType === enumModalType.offer || modalType === enumModalType.simulationCheck) {
      content = (
        <>
          <Descriptions
            style={{ marginTop: 12 }}
            column={1}
            items={[
              {
                label: '模型',
                children: '',
              },
              {
                label: '材料',
                children: '',
              },
            ]}
          />
          <Divider dashed />
          <Descriptions
            column={1}
            items={[
              {
                label: '模流需求',
                children: '',
              },
              {
                label: '参数设置',
                children: '',
              },
            ]}
          />
          <Divider dashed />
          <Descriptions
            column={1}
            items={
              modalType === enumModalType.simulationCheck
                ? [
                    {
                      label: '预估费用',
                      children: (
                        <>
                          XXXX <Button type="link">查看报价单</Button>
                        </>
                      ),
                    },
                    {
                      label: '交期（工作日）',
                      children: '7个工作日内',
                    },
                    {
                      label: '支付凭证',
                      children: <Image width={200} src={Img} />,
                    },
                  ]
                : [
                    {
                      label: '预估费用',
                      children: (
                        <>
                          <Popconfirm
                            title="请填写报价"
                            icon={null}
                            description={
                              <Input
                                placeholder="请输入报价"
                                value={bid}
                                onChange={(e) => {
                                  setBid(e.target.value);
                                }}
                              />
                            }
                            onConfirm={() => {
                              if (!bid) {
                                message.error('请填写报价');
                                return;
                              }
                              if (isNaN(Number(bid))) {
                                message.error('请输入正确的报价');
                                return;
                              }
                              setBidConfirm(true);
                            }}
                          >
                            {bidConfirm ? (
                              <>
                                {bid}
                                <Button type="link" onClick={() => setBidConfirm(false)}>
                                  修改报价
                                </Button>
                              </>
                            ) : (
                              <Button type="link">填写报价</Button>
                            )}
                          </Popconfirm>
                          <Upload maxCount={1} accept=".pdf">
                            <Button type="link">上传报价单</Button>
                          </Upload>
                        </>
                      ),
                    },
                    {
                      label: '交期（工作日）',
                      children: '7个工作日内',
                    },
                  ]
            }
          />
        </>
      );
    }
    return {
      title,
      width,
      content,
    };
  }, [modalType, bid, setBid, bidConfirm, setBidConfirm]);

  return (
    <div className="orderList">
      <div className="orderList-right-searchBox">
        <div className="orderList-right-searchBox-item time">
          <div className="label" style={{ width: 95 }}>
            订单提交时间
          </div>
          <div className="input">
            <DatePicker.RangePicker
              onChange={(_, days) => {
                setSearchTerm({
                  ...searchTerm,
                  startTime: days[0],
                  endTime: days[1],
                });
              }}
            />
          </div>
        </div>
        <div className="orderList-right-searchBox-item">
          <div className="label">订单名称</div>
          <div className="input">
            <Input
              placeholder="请输入订单名称"
              value={searchTerm.name}
              onChange={(e) => {
                setSearchTerm({
                  ...searchTerm,
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="orderList-right-searchBox-item">
          <div className="label">订单类型</div>
          <div className="input">
            <Select
              placeholder="请选择订单类型"
              value={searchTerm.type}
              onChange={(value) => {
                setSearchTerm({
                  ...searchTerm,
                  type: value,
                });
              }}
            >
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="1">模具设计 </Select.Option>
              <Select.Option value="2">模流分析</Select.Option>
            </Select>
          </div>
        </div>
        <div className="orderList-right-searchBox-item">
          <div className="label">订单状态</div>
          <div className="input">
            <Select
              placeholder="请选择订单状态"
              value={searchTerm.status}
              onChange={(value) => {
                setSearchTerm({
                  ...searchTerm,
                  status: value,
                });
              }}
            >
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="待付款">待付款 </Select.Option>
              <Select.Option value="待报价">待报价</Select.Option>
              <Select.Option value="支付失败">支付失败</Select.Option>
              <Select.Option value="设计中">设计中</Select.Option>
              <Select.Option value="已交付">已交付</Select.Option>
              <Select.Option value="已关闭">已关闭</Select.Option>
            </Select>
          </div>
        </div>
        <div className="orderList-right-searchBox-item">
          <div className="label">用户名称</div>
          <div className="input">
            <Input
              placeholder="请输入用户名称"
              value={searchTerm.userName}
              onChange={(e) => {
                setSearchTerm({
                  ...searchTerm,
                  userName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              table.current?.update();
            }}
          >
            查询
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const search = {
                name: '',
                type: '',
                status: '',
                userName: '',
                startTime: '',
                endTime: '',
              };
              setSearchTerm(search);
              table.current?.update(search, '');
            }}
          >
            重置
          </Button>
        </Space>
      </div>
      <CommonTable ref={table} getData={getOrderList} columns={columns} searchTerm={searchTerm} />
      <Modal
        title={modalContent.title}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setBid('');
          setBidConfirm(false);
        }}
        width={modalContent.width}
        centered
      >
        {modalContent.content}
      </Modal>
    </div>
  );
}
