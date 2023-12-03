import React, { useEffect, useState } from 'react';
import './style.scss';
import { Button, Form, Input, Select } from 'antd';
import { createResearch, editResearch } from '../../../service/api/index';
import { researchCategory } from '../../../enum';

import { getItem } from '../../../utils';
import addNotification, { NOTIFICATION_TYPE } from '../../notification';

import { CKEditor } from 'ckeditor4-react';

export default function ResearchPost({
  show,
  setShow,
  changeList,
  postFreely,
  editContent,
  setEditContent,
}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [content, setContent] = useState(editContent?.content ?? '');
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setSubmitting(true);
    if (!editContent) {
      createResearch({
        ...values,
        created_by: getItem('user')?.id,
        content: content,
      })
        .then((res) => {
          form.resetFields();
          addNotification(
            'Research have been published',
            NOTIFICATION_TYPE.SUCCESS,
          );
          setShow(false);
          changeList();
        })
        .catch((err) => {
          addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      editResearch(editContent.id, {
        ...values,
        content: content,
      })
        .then((res) => {
          setShow(false);
          changeList();
          addNotification(
            'Selected research have been edited',
            NOTIFICATION_TYPE.SUCCESS,
          );
        })
        .catch((err) => {
          addNotification('Something went wrong', NOTIFICATION_TYPE.ERROR);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  useEffect(() => {
    console.log(editContent);
  }, [editContent]);
  return (
    <div
      className={`${!show && 'hidden'} research-post-modal ${
        editContent && 'yes'
      }`}
    >
      <div
        className="bg"
        onClick={() => {
          setShow(false);
          setEditContent(null);
        }}
      ></div>
      <div className="post-body">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={
            editContent !== null
              ? {
                  name: editContent.name,
                  content: editContent.content,
                  cate_id: editContent.cate_id,
                }
              : {}
          }
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <h2>Title</h2>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Can not be empty!' }]}
          >
            <Input className="main-input" placeholder="Enter your post title" />
          </Form.Item>
          <h2>Content</h2>
          <Form.Item name="content">
            <CKEditor
              style={{ width: '100%' }}
              initData={editContent?.content ?? ''}
              onChange={(e) => {
                setContent(e.editor.getData());
              }}
            />
          </Form.Item>
          <Form.Item
            name="cate_id"
            rules={[{ required: true, message: 'Must select one!' }]}
          >
            <select className="main-input" style={{ width: '25%' }}>
              <option disabled selected value>
                select an option
              </option>
              {researchCategory.map((item, index) => (
                <option
                  style={{
                    color: item.color,
                    width: '50%',
                    borderRadius: 20,
                  }}
                  value={item.id}
                  key={index}
                >
                  {item.name}
                </option>
              ))}
            </select>
          </Form.Item>
          <button
            type="submit"
            htmlType="submit"
            disabled={isSubmitting}
            className="main-button"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
}
