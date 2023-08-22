import { Card } from "primereact/card";
import React from "react";

function DataBox({ className, title, count, countColor }) {
  return (
    <Card className={`${className} `}>
      <div className="block text-500 font-medium  mb-3">{title}</div>
      <div className={`${countColor} font-semibold text-5xl`}>{count}</div>
    </Card>
  );
}

export default DataBox;
