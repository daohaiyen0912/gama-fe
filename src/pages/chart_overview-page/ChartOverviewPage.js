import React from 'react';
import { Line, Column, Pie, G2, Area } from '@ant-design/charts';
import { Row, Col, Button, Form, Input, Progress } from 'antd';
import { useEffect, useState } from 'react';
import './style.scss';
export default function Dashboard() {
  const G = G2.getEngine('canvas');

  const allWidth = 500,
    allHeigh = 300;
  const randomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  const [firstChartData, setFirstChartData] = useState([
    {
      name: '1',
      value: 2,
    },
    {
      name: '2',
      value: 4,
    },
    {
      name: '3',
      value: 5,
    },
    {
      name: '4',
      value: 6,
    },
    {
      name: '5',
      value: 3,
    },
  ]);
  const firstChartConfig = {
    data: firstChartData,
    xField: 'name',
    yField: 'value',
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    color: ({ label }) => {
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

  const [secondChartData, setSecondChartData] = useState([
    {
      percentage: 25,
      label: '',
    },
    {
      percentage: 35,
      label: '',
    },
  ]);
  const genderDataGraphConfig = {
    appendPadding: 10,
    data: secondChartData,
    angleField: 'percentage',
    colorField: 'label',
    color: ({ label }) => {
      return randomColor();
    },
    width: allWidth,
    height: allHeigh + 100,
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
  };

  const [thirdChartData, setThirdChartData] = useState([
    {
      name: '1',
      value: 2,
    },
    {
      name: '2',
      value: 5,
    },
    {
      name: '3',
      value: 6,
    },
    {
      name: '4',
      value: 3,
    },
    {
      name: '5',
      value: 4,
    },
  ]);
  const thirdChartConfig = {
    data: thirdChartData,
    xField: 'name',
    yField: 'value',
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    color: ({ label }) => {
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
  const [fourthChartData, setFourthChartData] = useState([
    {
      name: '1',
      value: 23,
    },
    {
      name: '2',
      value: 55,
    },
    {
      name: '3',
      value: 62,
    },
    {
      name: '4',
      value: 34,
    },
  ]);
  const fourthChartConfig = {
    data: fourthChartData,
    xField: 'name',
    yField: 'value',
    width: allWidth,
    height: allHeigh,
    autoFit: false,
    color: ({ label }) => {
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
    <div class="chart-overview-page">
      <div className="chart-overview-header">
        <h1>Chart overview</h1>
      </div>
      <div className="chart-overview-body">
        <Row gutter={10}>
          <Col span={12}>
            <h1>HISTOGRAM</h1>
            <p>
              Histograms are useful for analyzing the distribution of data,
              identifying outliers or unusual patterns, and determining the
              shape of the data's distribution (e.g. normal, skewed, bimodal,
              etc.). They are commonly used in fields such as statistics,
              economics, finance, and quality control.
            </p>
          </Col>{' '}
          <Col span={12}>
            <Column {...firstChartConfig} conf loading={false} />
          </Col>
        </Row>{' '}
        <Row>
          <h1>PIE CHART</h1>
          <p>
            A pie chart is a circular statistical graphic that is divided into
            slices to illustrate numerical proportion or percentage. Pie charts
            are commonly used to show the relative proportions of different
            categories or segments of a data set. They are useful for quickly
            visualizing how much of the whole each category or segment
            represents. For example, a pie chart could be used to show the
            percentage of different types of fruits sold at a grocery store in a
            given week.{' '}
          </p>
        </Row>
        <Row gutter={10}>
          <Col span={5}>
            <Pie {...genderDataGraphConfig} conf loading={false} />
          </Col>
          <Col span={5}>
            <Pie {...genderDataGraphConfig} conf loading={false} />
          </Col>
          <Col span={5}>
            <Pie {...genderDataGraphConfig} conf loading={false} />
          </Col>
        </Row>{' '}
        <Row gutter={10}>
          <Col span={12}>
            {' '}
            <h1>LINE CHART</h1>
            <p>
              ne charts are commonly used to display trends over time or to show
              the relationship between two continuous variables. In a line
              chart, the x-axis represents the independent variable, which is
              typically time, while the y-axis represents the dependent
              variable, which is the variable being measured or observed{' '}
            </p>
          </Col>{' '}
          <Col span={12}>
            <Line {...thirdChartConfig} conf loading={false} />
          </Col>
        </Row>
        <Row>
          <h1>AREA CHART</h1>
          <p>
            An area chart is a type of graph that displays quantitative data
            using a series of points connected by a line, with the space between
            the line and the x-axis filled in with color or shading to create a
            visual representation of the data. The area chart is similar to a
            line chart but with the added element of shading or color to
            emphasize the magnitude of the data.{' '}
          </p>
        </Row>
        <Row gutter={10}>
          <Area {...fourthChartConfig} conf loading={false} />
        </Row>{' '}
        <Row>
          There are various type of charts for simulating, you should
          have knowledge about each of them and creat you an own one.
        </Row>
      </div>
    </div>
  );
}
