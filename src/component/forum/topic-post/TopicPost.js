import React, { useState } from 'react';
import './style.scss';
import { Button, Form, Input } from 'antd';
import { createTopic, editTopic } from '../../../service/api/index';
import TextArea from 'antd/lib/input/TextArea';
import { topicCategory } from '../../../enum';
import { getItem } from '../../../utils';
import addNotification, { NOTIFICATION_TYPE } from '../../notification';
import { CKEditor } from 'ckeditor4-react';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import { ErrorBoundaries } from '../../ErrorBoundary';

export default function TopicPost({
  show,
  setShow,
  changeList,
  postFreely,
  editContent,
  setEditContent,
}) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();
  const [content, setContent] = useState(editContent?.content ?? '');
  const onFinish = (values) => {
    setSubmitting(true);
    if (!editContent) {
      createTopic({
        ...values,
        content,
        created_by: getItem('user')?.id,
        status: postFreely ? 1 : 0,
      })
        .then((res) => {
          addNotification(
            'Your post have been posted',
            NOTIFICATION_TYPE.SUCCESS,
          );
          form.resetFields();
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
      editTopic(editContent.id, {
        ...values,
        content,
      })
        .then((res) => {
          addNotification(
            'Your post have been edited',
            NOTIFICATION_TYPE.SUCCESS,
          );
        })
        .catch((err) => {
          addNotification('Failed to edit topic', NOTIFICATION_TYPE.ERROR);
          //addNotification('Error when logging in', NOTIFICATION_TYPE.ERROR);
        })
        .finally(() => {
          form.resetFields();
          setSubmitting(false);
          setShow(false);
          changeList();
          setEditContent(null);
        });
    }
  };
  return (
    <div className={`${!show && 'hidden'} topic-post-modal`}>
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
                  title: editContent.title,
                  content: editContent.content,
                  cate_id: editContent.cate_id,
                }
              : { remember: true }
          }
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <h2>Title</h2>
          <Form.Item
            name="title"
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
              {topicCategory.map((item, index) => (
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
