import { useRef, useState } from 'react';
import { Button, Input, Popconfirm, Select, Space, message } from 'antd';
import { getContactList } from '@/axiosInstance/contact';
import CommonTable, { ITabelRef } from '@/components/table';
import './index.less';
// import { delCV, getCVs } from '@/axiosInstance/recruitment';

export default function Contact() {
  const table = useRef<ITabelRef>(null);

  const [searchTerm, setSearchTerm] = useState({
    name: '',
    companyName: '',
    status: '',
  });

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '职务',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '信息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '操作',
      key: 'action',
      render: (text: string, record: any) => (
        <>
          <Button type="link" onClick={() => window.open(record.path)}>
            {record.status === '已沟通' ? '查看记录' : '填写沟通记录'}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="contact">
      <div className="contact-right-searchBox">
        <div className="contact-right-searchBox-item">
          <div className="label">姓名</div>
          <div className="input">
            <Input
              placeholder="请输入姓名"
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
        <div className="contact-right-searchBox-item">
          <div className="label">公司名称</div>
          <div className="input">
            <Input
              placeholder="请输入公司名称"
              value={searchTerm.companyName}
              onChange={(e) => {
                setSearchTerm({
                  ...searchTerm,
                  companyName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="contact-right-searchBox-item">
          <div className="label">沟通状态</div>
          <div className="input">
            <Select
              placeholder="请选择沟通状态"
              value={searchTerm.status}
              onChange={(value) => {
                setSearchTerm({
                  ...searchTerm,
                  status: value,
                });
              }}
            >
              <Select.Option value="">全部</Select.Option>
              <Select.Option value="已沟通">已沟通 </Select.Option>
              <Select.Option value="未沟通">未沟通</Select.Option>
            </Select>
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
                companyName: '',
                status: '',
              };
              setSearchTerm(search);
              table.current?.update(search, '');
            }}
          >
            重置
          </Button>
        </Space>
      </div>
      <CommonTable ref={table} getData={getContactList} columns={columns} searchTerm={searchTerm} />
    </div>
  );
}
