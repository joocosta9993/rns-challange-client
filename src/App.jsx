import { useEffect, useState } from "react";
import "./App.css";

import SimpleLineChart from "./SimpleLineChart";
import GasPriceTable from "./GasPriceTable";
import { Alert, Button } from "antd";
import { getAllGasPrices } from "./services/api";

function App() {
  const [gasPrices, setGasPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    allGasPrices();
  }, [pageIndex, pageSize]);

  const allGasPrices = async () => {
    setLoading(true);
    const response = await getAllGasPrices(pageIndex, pageSize);
    if (response?.success) {
      setGasPrices(response?.data.gasPrices);
      setTotal(response?.data.total);
      setLoading(false);
    } else {
      setError(response?.error);
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setPageIndex(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },

    {
      title: "Price In USD",
      dataIndex: "price_usd",
      key: "price_usd",
    },
    {
      title: "Price in NAVAX",
      dataIndex: "price_navax",
      key: "price_navax",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
  ];

  const [viewType, setViewType] = useState("table");
  const toggleViewType = () => {
    setViewType((prevType) => (prevType === "table" ? "graph" : "table"));
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="font-bold text-4xl text-blue-500 p-4">
        Dynamic gas price
      </h1>
      <p className="text-sm font-normal pb-5">
        The result is diplayed from
        <span className="cursor-pointer text-green-500 underline">
          <a href="https://www.snowtrace.io"> snowtrace </a>
        </span>
        and the data will be chaged with in every 30 minutes.
      </p>
      {error && (
        <span className="text-red-200 flex w-1/2 justify-center">{error}</span>
      )}

      <div className="w-3/4 border border-gray-200 flex flex-col pb-10 pr-3">
        <div className="view-toggle flex justify-end my-10">
          <Button onClick={toggleViewType}>
            {viewType === "table"
              ? "Switch to Graph View"
              : "Switch to Table View"}
          </Button>
        </div>
        {viewType === "table" ? (
          <GasPriceTable
            gasPrices={gasPrices}
            columns={columns}
            pageSize={pageSize}
            pageIndex={pageIndex}
            loading={loading}
            handleTableChange={handleTableChange}
            total={total}
          />
        ) : (
          <SimpleLineChart gasPrices={gasPrices}/>
        )}
      </div>
    </div>
  );
}

export default App;
