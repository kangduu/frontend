import React, { Component } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import "./form.css";

import MockJS from "mockjs";
const { MockData } = MockJS.mock({
  "MockData|5-12": [{ "value|+1": 1, "label|+1": 1 }],
});

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
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

const FormList = () => {
  const [form] = Form.useForm();
  const onFinish = () => {};
  return (
    <div style={{ width: 800, margin: "0 auto" }}>
      <h1>Form List</h1>
      <Form
        form={form}
        name="dynamic_form_item"
        {...formItemLayoutWithOutLabel}
        onFinish={onFinish}
        // onValuesChange={(changedValues, allValues) => {
        //   console.log(changedValues, allValues);
        //   try {
        //     const { names: currentValues } = changedValues || {};
        //     const { names: all } = allValues || {};
        //     if (Array.isArray(currentValues) && Array.isArray(all)) {
        //       const current = currentValues[currentValues.length - 1] || {};
        //       let redoIndex = [];
        //       if (current.item !== undefined) {
        //         all.forEach((record, index) => {
        //           if (record && current.item === record.item) {
        //             redoIndex.push(index);
        //           }
        //         });

        //         console.log(redoIndex);

        //         // form.setFields({
        //         //   value: "names-0",
        //         //   errors: [new Error("地址重复")],
        //         // });
        //         // console.log(form.getFieldValue("names")[0].item);
        //         // console.log(form.getFieldsValue(true));

        //         if (redoIndex.length > 1) {
        //           const errorList = redoIndex.map((value) => ({
        //             name: ["names", value, "item"],
        //             errors: ["地址重复"],
        //           }));
        //           console.log(errorList);
        //           form.setFields(errorList);
        //         }else {

        //         }
        //       }
        //     }
        //   } catch (error) {}
        // }}
      >
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => {
            return (
              <>
                {fields.map(({ key, name, ...restFields }) => {
                  // console.log("field", field);
                  return (
                    <Form.Item {...formItemLayoutWithOutLabel} key={key}>
                      <Form.Item
                        {...restFields}
                        name={[name, "item"]}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            validator: (_, value) => {
                              const allData =
                                form.getFieldsValue(true).names || [];
                              let count = allData.reduce((count, { item }) => {
                                if (value === item) return count + 1;
                                return count;
                              }, 0);
                              if (count > 1) return Promise.reject("内容重复");
                              return Promise.resolve();
                            },
                          },
                        ]}
                        noStyle
                      >
                        <Select options={MockData} style={{ width: 200 }} />
                      </Form.Item>
                      {fields.length > 1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(name)}
                        />
                      ) : null}
                    </Form.Item>
                  );
                })}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    // style={{ width: "60%" }}
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            );
          }}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormList;
