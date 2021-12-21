import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDay } from "../../utils/mainAppSlice";
import { selectDaysMassive } from "../../utils/mainAppSlice";
import { useSelector } from "react-redux";

import { Button,
   DatePicker,
   Modal,
   Form,
   InputNumber
   } from "antd";
import "antd/dist/antd.css";

export function ModalForm() {
  let days = useSelector(selectDaysMassive);
  days = days.map((item) => {
    return item["date"].value;
  });
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };



  const onFinish = (values: any) => {
    let date = new Date(values.date);
    let toadd = ([
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ]).join("-");
    if(!days.includes(toadd)){
      dispatch(
        addDay({
          date: {name:"Дата", value: toadd},
          viruchka: {name: "Выручка", value: values.nal+values.beznal+values.kreditki },
          nal: {name: "Нал", value: values.nal},
          beznal: {name:"Безнал", value: values.beznal},
          kreditki:{name: "Кредитки", value: values.kreditki},
          udaldo: {name:"Удалено из чека до оплаты", value: values.udaldo},
          udalposle: {name:"Удалено из чека после оплаты", value: values.udalposle},
          gostey: {name:"Гостей", value: values.gostey},
          chekov: {name:"Чеков", value: values.chekov},
          sredcheck:{name:"Средний чек", value: ((values.nal+values.beznal+values.kreditki)/values.chekov).toFixed()},
          sredguest:{name: "Средний гость", value:((values.nal+values.beznal+values.kreditki)/values.gostey).toFixed()},
        })
      );
      setTimeout(() => {
      setIsModalVisible(false);
    }, 500);
    }else{
      alert("Этот день уже есть в списке");
    }
  };


  return (
    <>
      <Button variant="primary" onClick={showModal}>
        Добавить данные за другой день
      </Button>

      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        >

        <Form {...layout} name="nest-messages" onFinish={onFinish} >
          <Form.Item
            name={['date']}
            label="Дата"
            rules={[
              {
                required: true,
                message: 'Выберите дату!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name={['nal']}
            label="Нал"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Введите сумму!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={['beznal']}
            label="Безнал"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Введите сумму!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['kreditki']}
            label="Кредитки"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Введите сумму!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['udaldo']}
            label="Удалено из чека до оплаты"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Введите сумму!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['udalposle']}
            label="Удалено из чека после оплаты"
            rules={[
              {
                type: 'number',
                min: 0,
                required: true,
                message: 'Введите сумму!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['gostey']}
            label="Гостей"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 100,
                required: true,
                message: 'Введите количество гостей!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            name={['chekov']}
            label="Чеков"
            rules={[
              {
                type: 'number',
                min: 0,
                max: 100,
                required: true,
                message: 'Введите количество чеков!',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
