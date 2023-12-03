import React from 'react';
import { Line, Column, Pie, G2 } from '@ant-design/charts';
import { Row, Col } from 'antd';
import { useEffect, useState } from 'react';

import './style.scss';
import { CirclePicker } from 'react-color';
export default function Dashboard() {
  const allWidth = 600,
    allHeigh = 400;
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const ChartDataCreateItem = (
    type,
    title,
    setChartName,
    data,
    setData,
    label1,
    label2,
    setLabel1 = null,
    setLabel2 = null,
  ) => {
    const typeF = () => {
      switch (type) {
        case 1:
          return 'Histogram';
        case 2:
          return 'Pie';
        case 3:
          return 'Line';
        default:
          return '';
      }
    };
    return (
      <div className="chart-data-create">
        <h2>{typeF()}</h2>
        <input
          className="main-input dimmed"
          defaultValue={title}
          onBlur={(e) => {
            setChartName(e.target.value);
          }}
        />
        <div className="chart-row">
          <input
            className="main-input dimmed"
            defaultValue={label1}
            onBlur={(e) => {
              setLabel1(e.target.value);
            }}
          />
          <input
            className="main-input dimmed"
            defaultValue={label2}
            onBlur={(e) => {
              setLabel2(e.target.value);
            }}
          />
          <div>Color</div>
          <div></div>
        </div>
        {data.map((el, index) => (
          <div className="chart-row" key={index}>
            <input
              className="main-input"
              defaultValue={el.name}
              onBlur={(e) => {
                let newData = [...data];
                newData[index].name = e.target.value;
                setData(newData);
              }}
            />
            <input
              className="main-input"
              defaultValue={el.value}
              onBlur={(e) => {
                let newData = [...data];
                newData[index].value = +e.target.value;
                setData(newData);
              }}
            />
            <div
              className={`color-picker`}
              style={{
                backgroundColor: el.color,
                display: type === 3 ? 'none' : 'initial',
              }}
            >
              <div className="color-picker-picker">
                <CirclePicker
                  color={el.color}
                  onChange={(color) => {
                    let newData = [...data];
                    newData[index].color = color.hex;
                    setData(newData);
                  }}
                />
              </div>
            </div>
            <div
              className="delete-button"
              onClick={() => {
                let newData = [...data];
                newData.splice(index, 1);
                setData(newData);
              }}
            >
              Delete
            </div>
          </div>
        ))}
        <button
          className="main-button"
          onClick={() => {
            let newData = [...data];
            newData.push({ name: '', value: '', color: randomColor() });
            setData(newData);
          }}
        >
          Add new field
        </button>
      </div>
    );
  };

  const ChartRow = ({ type }) => {
    const [data, setData] = useState([]);
    const [label1, setLabel1] = useState('Name');
    const [label2, setLabel2] = useState('Value');
    const [chartName, setChartName] = useState('Chart');
    const config =
      type === 1
        ? {
            data: data,
            xField: 'name',
            yField: 'value',
            width: allWidth,
            height: allHeigh,
            autoFit: false,
            color: ({ name }) => {
              return data.find((el) => el.name === name).color;
            },
            label: {
              position: 'bottom',
              style: {
                fill: '#FFFFFF',
                opacity: 0.6,
              },
            },
            xAxis: {
              label: {
                autoHide: true,
                autoRotate: false,
              },
            },
            yAxis: {
              min: 0,
            },
            meta: {
              name: {
                alias: label1,
              },
              value: {
                alias: label2,
              },
            },
          }
        : type === 2
        ? {
            appendPadding: 10,
            data: data,
            angleField: 'value',
            colorField: 'name',
            color: ({ name }) => {
              return data.find((el) => el.name === name).color;
            },
            width: allWidth,
            height: allHeigh,
            radius: 0.9,
            label: {
              type: 'inner',
              offset: '-30%',
              content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
              style: {
                fontSize: 14,
                textAlign: 'center',
              },
            },
            interactions: [
              {
                type: 'element-active',
              },
            ],
          }
        : {
            data: data,
            xField: 'name',
            yField: 'value',
            width: allWidth,
            height: allHeigh,
            autoFit: false,
            color: ({ name }) => {
              return randomColor();
            },
            label: {
              position: 'bottom',
              style: {
                fill: '#FFFFFF',
                opacity: 0.6,
              },
            },
            xAxis: {
              label: {
                autoHide: true,
                autoRotate: false,
              },
            },
          };

    return (
      <div className="item-row">
        <div className="item-col">
          {ChartDataCreateItem(
            type,
            chartName,
            setChartName,
            data,
            setData,
            label1,
            label2,
            setLabel1,
            setLabel2,
          )}
        </div>{' '}
        <div className="item-col">
          <div class="chart-wrapper">
            {[1, 3].includes(type) && (
              <React.Fragment>
                <div className="chart-x-axis">{label2}</div>
                <div className="chart-y-axis">{label1}</div>
              </React.Fragment>
            )}
            {type === 1 ? (
              <Column {...config} conf loading={false} />
            ) : type === 2 ? (
              <Pie {...config} conf loading={false} />
            ) : (
              <Line {...config} conf loading={false} />
            )}
            {chartName}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="chart-create-page">
      <Row>
        <h1>Chart overview </h1>
      </Row>
      <ChartRow type={1} />
      <ChartRow type={2} />
      <ChartRow type={3} />
    </div>
  );
}
