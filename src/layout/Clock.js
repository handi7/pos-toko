import { Tag } from "antd";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

export default function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <Tag color="#108ee9" className="fw-bold p-1">
      <span style={{ fontSize: 16 }}>{moment(date).format("h:mm:ss A")}</span>
    </Tag>
  );
}
