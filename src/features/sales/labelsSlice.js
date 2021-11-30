import { createSlice } from '@reduxjs/toolkit';
import data from "./data.json";

const datasales = data.days;

// сделал стейт массивами чтобы итерировать можно было
var newmassiv = datasales.map(function (item) {
  return [
    {id: "date", name:"Дата", value: item.date},
    {id: "viruchka", name: "Выручка", value: item.nal+item.beznal+item.kreditki},
    {id: "nal", name: "Нал", value: item.nal},
    {id: "beznal", name:"Безнал", value: item.beznal},
    {id: "kreditki", name: "Кредитки", value: item.kreditki},
    {id: "udaldo", name:"Удалено из чека до оплаты", value: item.udaldo},
    {id: "udalposle", name:"Удалено из чека после оплаты", value: item.udalposle},
    {id: "gostey", name:"Гостей", value: item.gostey},
    {id: "chekov", name:"Чеков", value: item.chekov},
    {id: "sredcheck", name:"Средний чек", value: ((item.nal+item.beznal+item.kreditki)/item.chekov).toFixed()},
    {id: "sredguest", name: "Средний гость", value:((item.nal+item.beznal+item.kreditki)/item.gostey).toFixed()},
  ];
});
// отмеченные строки тоже также
var rowChecked = [
  {id: "viruchka", name:"Выручка", value: true},
  {id: "nal", name:"Нал", value: true},
  {id: "beznal", name:"Безнал", value: true},
  {id: "kreditki", name:"Кредитки", value: true},
  {id: "sredcheck", name:"Средний чек", value: true},
  {id: "sredguest", name:"Средний гость", value: true},
  {id: "udalposle", name:"Удалено после", value: true},
  {id: "udaldo", name:"Удалено до", value: true},
  {id: "chekov", name:"Чеков", value: true},
  {id: "gostey", name:"Гостей", value: true},
]

const initialState = {
  visability: rowChecked,
  sales: newmassiv,
};

export const labelsSlice = createSlice({
  name: "viz",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeVisability: (state, action) => {
      state.visability = state.visability.map( (item) =>
        item.id === action.payload.id ? {...item, value: item.value === true ? false: true} : item
      );
    },

  },
});

export const { changeVisability } = labelsSlice.actions;

export const selectVizMassive = (state) => state.viz.visability;
export const selectSalesMassive = (state) => state.viz.sales;




export default labelsSlice.reducer;
