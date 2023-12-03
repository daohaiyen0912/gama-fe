import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Modal, Descriptions, Input, Space, Button, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { useSimulationContext } from '../../simulation-context/SimulationContext';
import Multiselect from 'multiselect-react-dropdown';

const paramTypes = ['INT', 'FLOAT', 'BOOLEAN', 'STRING'];
const { Option } = Select;

export const ParameterModal = (props) => {
  const { isShow, onCancel, onSimulate, form, content } = props;
  const { setFramerate, setNumberOfSimulation, setRunners, runners } = useSimulationContext();

  useEffect(() => {
    form.resetFields();
    var experiment = '';
    if (content.length > 0) {
      const parameterList = [];
      const outputList = [];
      content.split('\n').map((item) => {
        const line = item.replace('\t', '').trim();
        if (line.indexOf('parameter') === 0) {
          const texts = line?.split(' ') || [];
          const index = texts?.indexOf('var:');
          if (index && index < texts.length - 1) {
            parameterList.push({ name: texts[index + 1] });
          }
        } else if (line.indexOf('display') === 0) {
          const texts = line?.split(' ');
          if (texts?.length > 1) {
            outputList.push({ name: texts[1] });
          }
        } else if (line.indexOf('experiment') === 0) {
          const texts = line?.split(' ');
          if (texts?.length > 1) {
            experiment = texts[1];
          }
        }
      });
      form.setFieldsValue({ parameterList, outputList, experiment });
    }
    return () => console.log('close');
  }, [content]);

  // Xử lý sự kiện thay đổi của MultiSelect
  const handleMultiSelectChange = (selectedOptions) => {
    console.log(selectedOptions)
    let newRunners = runners;
    if(newRunners) {
    selectedOptions.map((o) => {

      if(!newRunners.some((c) => c == o.key)) {
        newRunners.push(o.key);
      }
    })} else {
      newRunners = selectedOptions.map(o => o.key);
    }
    setRunners(newRunners);
  };

  const onSubmit = () => {
    form.validateFields().then((data) => {
      console.log(data)
      onSimulate(data);
    });
  };
  return (
    <Modal
      visible={isShow}
      title="Input parameters"
      okText="Submit"
      style={{ top: 20 }}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        form={form}
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        labelAlign="left"
        initialValues={{
          width: 1200,
          height: 800,
        }}
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
          <Input
            type="number"
            placeholder="Enter number"
            onChange={(e) => {
              setNumberOfSimulation(e.target.value);
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="Number of runners"
          name="runners"
          rules={[
            {
              required: true,
              message: 'Number of runners is required!',
            }
          ]}
        >
          <Input
            type="number"
            placeholder="Enter number"
            onChange={(e) => {
              setNumberOfRunners(e.target.value);
            }}
            defaultValue={1}
          />
        </Form.Item> */}
        <Form.Item
          label="Number of runners"
          name="runners"
        >
          <Multiselect
          displayValue="key"
            options={[
              {
                key: '192.168.88.128',
                cat: '192.168.88.128'
              },
              {
                key: '192.168.88.129',
                cat: '192.168.88.129'
              },
            ]}
            value={runners}
            onSelect={handleMultiSelectChange}
          />
          {/* <Multiselect
            displayValue="key"
            // onKeyPressFn={function noRefCheck() { }}
            onRemove={function noRefCheck() { }}
            // onSearch={function noRefCheck() { }}
            onChange={(e) => {
              console.log(e.target.selectedValues)
              setRunners(e.target.selectedValues)
            }}
            onSelect={(e) => {
              console.log(e.target.selectedValues)
              
            }}
            options={[
              {
                cat: 'Group 1',
                key: '192.168.88.128'
              },
              {
                cat: 'Group 1',
                key: '192.168.88.129'
              },
            ]}
            selectedValues={[
              {
                cat: 'Group 1',
                key: '192.168.88.128'
              },
              {
                cat: 'Group 1',
                key: '192.168.88.129'
              }
            ]}
          /> */}
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
          <Input
            type="number"
            placeholder="Enter number"
            step={1}
            onChange={(e) => {
              setFramerate(e.target.value);
            }}
          />
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
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[
                        { required: true, message: 'Missing parameter name' },
                      ]}
                    >
                      <Input placeholder="Name" style={{ width: '120px' }} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      rules={[
                        { required: true, message: 'Missing parameter type' },
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
                      <Input placeholder="Value" style={{ width: '120px' }} />
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
                          { required: true, message: 'Missing output name' },
                        ]}
                        style={{ width: '120px' }}
                      >
                        <Input placeholder="Name" style={{ width: '120px' }} />
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
    </Modal>
  );
};
