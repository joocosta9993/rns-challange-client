import React from "react";
import { Table, Button } from "antd";

const GasPriceTable = ({
  gasPrices,
  columns,
  pageIndex,
  pageSize,
  handleTableChange,
  total,
  loading
}) => {
  return (
    <Table
      dataSource={gasPrices}
      columns={columns}
      pagination={{
        current: pageIndex,
        pageSize: pageSize,
        total: total,
      }}
      loading={loading}
      onChange={handleTableChange}
    />
  );
};

export default GasPriceTable;
