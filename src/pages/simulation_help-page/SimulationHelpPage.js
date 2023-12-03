import React from 'react';
import './style.scss';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Form, Modal, Descriptions, Input, Space, Button, Select } from 'antd';
const { Option } = Select;
const paramTypes = ['INT', 'FLOAT', 'BOOLEAN', 'STRING'];

export default function SimulationHelpPage({ setChoose }) {
  const history = useHistory();
  return (
    <div className="simulation-edit-page">
      <div className="content">
        <div className="box left">
          <div
            className='list-instruct'
          >
            <span>Number of simulations: The number of simulation you want to run</span>
            <span>Stop condition: Available in the next version</span>
            <span>
              Experiment name: Define your experiment name
            </span>
            <span>Framerate: Framerate of your simulation </span>
            <span>
              Outputs: Customize your display output 
            </span>
            <span>Width: Customize your image width</span>
            <span>Height: Customize your image height</span>

            <span>Note: Step = Number of simulations / Framerate</span>
            

          </div>
          <div style={{ fontWeight: 'bold' }}>
            Here is a short vid introduce the procedure of simulation
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <video controls>
              <source
                src={
                  'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
          <div style={{ margin: 'auto' }}>
            <button onClick={null} className="main-button">
              SIMULATE NOW
            </button>
          </div>
        </div>
        <div className="box right">
          <Form
            form={null}
            layout="horizontal"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Descriptions title="Simulation" />
            <Form.Item
              label="Number of simulation"
              name="finalStep"
              rules={[
                {
                  required: true,
                  message: 'Number of simulation is required!',
                },
                {
                  pattern: /^(?:\d*)$/,
                  message: 'Must be greater than -1',
                },
              ]}
            >
              <Input type="number" placeholder="Enter number" />
            </Form.Item>
            <Form.Item label="Stop condition" name="until">
              <Input placeholder="Enter value" />
            </Form.Item>
            <Form.Item
              label="Experiment name"
              name="experiment"
              rules={[
                {
                  required: true,
                  message: 'Experiment name is required!',
                },
              ]}
            >
              <Input placeholder="Enter experiment name" />
            </Form.Item>
            <Form.Item
              label="Frame rate"
              name="framerate"
              rules={[
                {
                  required: true,
                  message: 'Frame rate is required!',
                },
                {
                  pattern: /^[1-9]\d*$/,
                  message: 'Must be greater than 0',
                },
              ]}
            >
              <Input type="number" placeholder="Enter number" step={1} />
            </Form.Item>
            <div style={{ display: 'flex', gap: '20px' }}>
          <Form.Item label="Width" name="width">
            <Input type="number" placeholder="Enter number" />
          </Form.Item>
          <Form.Item label="Height" name="height">
            <Input type="number" placeholder="Enter number" />
          </Form.Item>
        </div>
            <Descriptions title="Parameters" />
            <div
              className="param-section"
              style={{ height: '20vh', overflowY: 'auto' }}
            >
              <Form.List name="parameterList">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Space
                        key={key}
                        style={{ display: 'flex' }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'name']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing parameter name',
                            },
                          ]}
                        >
                          <Input
                            placeholder="Name"
                            style={{ width: '120px' }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing parameter type',
                            },
                          ]}
                        >
                          <Select placeholder="Type" style={{ width: '120px' }}>
                            {paramTypes.map((item) => (
                              <Option value={item}>{item}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing parameter value',
                            },
                          ]}
                          style={{ width: '120px' }}
                        >
                          <Input
                            placeholder="Value"
                            style={{ width: '120px' }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.ErrorList errors={errors} />
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
            <Descriptions title="Outputs" />
            <div
              className="output-section"
              style={{ height: '20vh', overflowY: 'auto' }}
            >
              <Form.List
                name="outputList"
                rules={[
                  {
                    required: true,
                    message: 'Missing outputs',
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <>
                        <Space
                          key={key}
                          style={{ display: 'flex' }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            rules={[
                              {
                                required: true,
                                message: 'Missing output name',
                              },
                            ]}
                            style={{ width: '120px' }}
                          >
                            <Input
                              placeholder="Name"
                              style={{ width: '120px' }}
                            />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      </>
                    ))}
                    <Form.ErrorList errors={errors} />
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
