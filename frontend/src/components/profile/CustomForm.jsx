import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input,Space } from "antd";
import { useState } from "react";


const formItemLayout = {
  labelCol: {
    xs: {
      span: 0,
    },
    sm: {
      span: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const CustomForm = () => {

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item
      name="remember"
      valuePropName="checked"
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </>
  );
};
export default CustomForm;





import {
  ACCOUNT_DETAIL_SUCCESS,
  ACCOUNT_DETAIL_FAIL,
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_UPDATE_SUCCESS,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE_FAIL,
} from "../constants/types";

export const accountDetailReducer = (
  state = { userInfo: {}, isAuthenticated: false, error: {}},
  action
) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case ACCOUNT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const accountSelfDetailReducer = (
  state = { user: null, isAuthenticated: false, error: {} },
  action
) => {
  switch (action.type) {
    case ACCOUNT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case ACCOUNT_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const accountUpdateReducer = (
  state = { userInfo: { profile: {} } },
  action
) => {
  switch (action.type) {
    case ACCOUNT_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ACCOUNT_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        userInfo: action.payload,
      };

    case ACCOUNT_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
