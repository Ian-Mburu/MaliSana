
import React, { useEffect, useState } from 'react';
import { Button, Table, Form, Modal, Input, Select, message, Spin } from 'antd';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user && localStorage.getItem('access_token')) {
      fetchCategories();
    }
  }, [authLoading, user]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get('/categories/');
      setCategories(response.data);
    } catch (error) {
      message.error('Failed to fetch categories');
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setActionLoading(true);
      if (editingCategory) {
        await api.patch(`/categories/${editingCategory.id}/`, values);
        message.success('Category updated successfully');
      } else {
        await api.post('/categories/', values);
        message.success('Category created successfully');
      }
      await fetchCategories();
      setIsModalVisible(false);
      form.resetFields();
      setEditingCategory(null);
    } catch (error) {
      message.error(error.response?.data?.message || 'Operation failed');
      console.error('API Error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      await api.delete(`/categories/${id}/`);
      message.success('Category deleted successfully');
      await fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
      console.error('API Error:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => type.charAt(0).toUpperCase() + type.slice(1),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button onClick={() => {
            setEditingCategory(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          }}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        Add Category
      </Button>

      <Table dataSource={categories} columns={columns} rowKey="id" />

      <Modal
        title={editingCategory ? 'Edit Category' : 'Create Category'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingCategory(null);
        }}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input category name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select category type!' }]}
          >
            <Select>
              <Select.Option value="expense">Expense</Select.Option>
              <Select.Option value="income">Income</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;