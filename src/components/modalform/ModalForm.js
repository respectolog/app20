import React, { useState, useRef } from "react";
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
    return item.date;
  });
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);



  const showModal = () => {
    setIsModalVisible(true);
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
          date: toadd,
          viruchka: values.nal+values.beznal+values.kreditki ,
          nal: values.nal,
          beznal: values.beznal,
          kreditki:values.kreditki,
          udaldo: values.udaldo,
          udalposle: values.udalposle,
          gostey: values.gostey,
          chekov: values.chekov,
          sredcheck:((values.nal+values.beznal+values.kreditki)/values.chekov).toFixed(),
          sredguest:((values.nal+values.beznal+values.kreditki)/values.gostey).toFixed(),
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
        title="Введите данные"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
              Отмена
            </Button>,
          <Button key="submit" type="primary" htmlType="submit" form="form">
            ОК
          </Button>
        ]}
        >

        <Form {...layout} name="nest-messages" onFinish={onFinish} id="form">
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

          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
