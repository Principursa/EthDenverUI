import { useState, useMemo } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import {
  Tooltip,
  TooltipWithBounds,
  useTooltip,
  useTooltipInPortal,
  defaultStyles,
} from "@visx/tooltip";

interface TooltipData {
  title: string;
  amt: number;
}
let collateral = 1000;

let borrowLimit = collateral * .85;
const margindata = [
  { title: "debt", amt: 0, color: "#FF0000" },
  { title: "borrow limit", amt: collateral, color: "#E3E0E0" },
];

const twinedata = [
  { title: "Previous Limit", amt: 800, color: "#2596BE" },
  { title: "Boosted Limit", amt: 50, color: "#6F2083" },
  { title: "Collateral", amt: collateral - (800 + 50), color: "#F3F1EE" },
];

export default function PieChart() {
  const [active, setActive] = useState(null);
  const width = 400;

  const half = width / 2;

  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip();

  console.log(active);
  //TODO: implement tooltips for data when hovering over section

  return (
    <main>
      <svg width={width} height={width}>
        <Group top={half} left={half}>
          <Pie
            data={twinedata}
            pieValue={(data) => data.amt}
            outerRadius={half}
            innerRadius={({ data }) => {
              const size = active && active.title == data.title ? 12 : 8;
              return half - size;
            }}
            padAngle={0.001}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.title}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
          <Pie
            data={margindata}
            pieValue={(data) => data.amt}
            outerRadius={half - 40}
            innerRadius={half - 100}
          >
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g
                    key={arc.data.title}
                    onMouseEnter={() => setActive(arc.data)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                );
              });
            }}
          </Pie>
        </Group>
      </svg>
      <div className="text-black">
        <div>Collateral Factor</div>
        <div>{twinedata[2].amt}</div>
        <div>50%</div>
      </div>
    </main>
  );
}
