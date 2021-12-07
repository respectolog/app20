import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux";
import { addDay } from "../../utils/mainAppSlice";
import { selectDaysMassive } from "../../utils/mainAppSlice";
import { useSelector } from "react-redux";

export function ModalForm() {
  let days = useSelector(selectDaysMassive);
  days = days.map((item) => {
    return item["date"].value;
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const [inputs_list, setInputs] = useState({
    date: "",
    nal: 0,
    beznal: 0,
    kreditki: 0,
    udaldo:0,
    udalposle:0,
    gostey: 0,
    chekov: 0,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleSubmit = (event) => {

    if(!days.includes(inputs_list.date)){
      dispatch(
        addDay({
          date: {name:"Дата", value: inputs_list.date},
          viruchka: {name: "Выручка", value: inputs_list.nal+inputs_list.beznal+inputs_list.kreditki },
          nal: {name: "Нал", value: inputs_list.nal},
          beznal: {name:"Безнал", value: inputs_list.beznal},
          kreditki:{name: "Кредитки", value: inputs_list.kreditki},
          udaldo: {name:"Удалено из чека до оплаты", value: inputs_list.udaldo},
          udalposle: {name:"Удалено из чека после оплаты", value: inputs_list.udalposle},
          gostey: {name:"Гостей", value: inputs_list.gostey},
          chekov: {name:"Чеков", value: inputs_list.chekov},
          sredcheck:{name:"Средний чек", value: ((inputs_list.nal+inputs_list.beznal+inputs_list.kreditki)/inputs_list.chekov).toFixed()},
          sredguest:{name: "Средний гость", value:((inputs_list.nal+inputs_list.beznal+inputs_list.kreditki)/inputs_list.gostey).toFixed()},
        })
      );
      event.preventDefault();
    }else{
      alert("Этот день уже есть в списке");
      event.preventDefault();
    }

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Добавить данные за другой день
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить данные</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group as={Row} className="mb-3" controlId="formDate">
              <Form.Label column sm="3">Дата</Form.Label>
              <Col sm="9"><Form.Control type="date" value={inputs_list.date} onChange={(event) => setInputs({...inputs_list, date: event.target.value })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formNal">
              <Form.Label column sm="3">Нал</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="Наличные" onChange={(event) => setInputs({...inputs_list, nal: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formBezNal">
              <Form.Label column sm="3">Безнал</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="По карте" onChange={(event) => setInputs({...inputs_list, beznal: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formKreditki">
              <Form.Label column sm="3">Кредитки</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="По кредитной карте" onChange={(event) => setInputs({...inputs_list, kreditki: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formUlalenoDo">
              <Form.Label column sm="3">Удалено из чека до оплаты</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="Удалено из чека до оплаты" onChange={(event) => setInputs({...inputs_list, udaldo: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formUdalenoPosle">
              <Form.Label column sm="3">Удалено из чека после оплаты</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="Удалено из чека после оплаты" onChange={(event) => setInputs({...inputs_list, udalposle: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formGostey">
              <Form.Label column sm="3">Гостей</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="Количество гостей" onChange={(event) => setInputs({...inputs_list, gostey: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formChekov">
              <Form.Label column sm="3">Чеков</Form.Label>
              <Col sm="9"><Form.Control type="number" placeholder="Количество чеков" onChange={(event) => setInputs({...inputs_list, chekov: Number(event.target.value) })} /></Col>
            </Form.Group>

            <Button variant="primary" type="submit" >
              Submit
            </Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
