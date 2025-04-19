import React, { useEffect, useState, useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import { Table } from 'antd';
import { AxiosResponse } from 'axios';
import { TableRowSelection } from 'antd/es/table/interface';

export interface ITabelRef {
  update: (search?: any, sort?: string) => void;
  getPage: () => number;
}

interface IProp {
  searchTerm?: { [key: string]: string | number | boolean | null };
  sortColumn?: string;
  columns: any[];
  getData: (
    page: number,
    pageSize: number,
    searchTerm?: { [key: string]: string | number | boolean | null },
    sortColumn?: string,
    sortOrder?: string,
  ) => Promise<AxiosResponse<{ records: any[]; total: number; current: number; size: number }>>;
  rowSelection?: TableRowSelection<any>;
  pageNum?: number;
  onSuccess?: () => void;
}

function CommonTable(props: IProp, ref: ForwardedRef<ITabelRef>) {
  const { pageNum, getData, searchTerm, sortColumn, columns, rowSelection, onSuccess } = props;
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(pageNum ?? 1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(false);

  const fetchData = async (
    page: number,
    pageSize: number,
    searchTerm: { [key: string]: string | number | boolean | null } | undefined,
    sortColumn: string | undefined,
    sortOrder: string,
  ) => {
    setLoading(true);
    const { data } = await getData(page, pageSize, searchTerm, sortColumn, sortOrder);
    setRows(data.records);
    setTotal(data.total);
    setPage(data.current);
    setPageSize(data.size);
    setTimeout(() => {
      onSuccess && onSuccess();
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page, pageSize, searchTerm, sortColumn, sortOrder);
  }, [page, pageSize]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (_: number, size: number) => {
    setPageSize(size);
    setPage(1);
  };

  useImperativeHandle(ref, () => ({
    update: (search?: { [key: string]: string | number | boolean | null }, sort?: string) => {
      fetchData(1, 10, search ?? searchTerm, sort ?? sortColumn, sortOrder);
    },
    getPage: () => {
      return page;
    },
  }));

  return (
    <Table
      style={{ flex: 1 }}
      dataSource={rows}
      columns={columns}
      pagination={{
        pageSize,
        current: page,
        total,
        onChange: handlePageChange,
        onShowSizeChange: handlePageSizeChange,
        showQuickJumper: true,
      }}
      rowSelection={rowSelection}
      rowKey="id"
      loading={loading}
    />
  );
}

export default forwardRef(CommonTable);
