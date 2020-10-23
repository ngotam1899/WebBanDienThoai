import React from "react";
import { Skeleton } from "antd";

export default function Loading() {
  return (
    <div className="main-content-inner loan-page">
        <Skeleton active />
    </div>
  );
}
