import { createSlice } from '@reduxjs/toolkit';
import data from "../data/data.json";

const datasales = data.days;

// сделал стейт массивами чтобы итерировать можно было
var daysMassive = datasales.map(function (item) {
  return {
    date: {name:"Дата", value: item.date},
    viruchka: {name: "Выручка", value: item.nal+item.beznal+item.kreditki},
    nal: {name: "Нал", value: item.nal},
    beznal: {name:"Безнал", value: item.beznal},
    kreditki:{name: "Кредитки", value: item.kreditki},
    udaldo: {name:"Удалено из чека до оплаты", value: item.udaldo},
    udalposle: {name:"Удалено из чека после оплаты", value: item.udalposle},
    gostey: {name:"Гостей", value: item.gostey},
    chekov: {name:"Чеков", value: item.chekov},
    sredcheck:{ name:"Средний чек", value: ((item.nal+item.beznal+item.kreditki)/item.chekov).toFixed()},
    sredguest:{name: "Средний гость", value:((item.nal+item.beznal+item.kreditki)/item.gostey).toFixed()},
  };
});


// отмеченные строки тоже также
var rowChecked = {
  viruchka: {id: "viruchka", name:"Выручка", value: true},
  nal: {id: "nal", name:"Нал", value: true},
  beznal: {id: "beznal", name:"Безнал", value: true},
  kreditki: {id: "kreditki", name:"Кредитки", value: true},
  sredcheck: {id: "sredcheck", name:"Средний чек", value: true},
  sredguest: {id: "sredguest", name:"Средний гость", value: true},
  udalposle: {id: "udalposle", name:"Удалено после", value: true},
  udaldo: {id: "udaldo", name:"Удалено до", value: true},
  chekov: {id: "chekov", name:"Чеков", value: true},
  gostey: {id: "gostey", name:"Гостей", value: true},
};

const initialState = {
  visibility: rowChecked,
  days: daysMassive,
  graf: [],
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeVisibility: (state, action) => {
      state.visibility[action.payload].value === true ? state.visibility[action.payload].value = false : state.visibility[action.payload].value = true;
    },

    changeGrafData: (state, action) => {
      let name = action.payload;
      state.graf = state.days.map(function (item) {
        return {date: item['date'].value, value: item[name].value };
      });
    },
    addDay: (state, action) => {
      state.days.push(action.payload);
    },

  },
});

export const { changeVisibility, changeGrafData, addDay } = appSlice.actions;

export const selectVisMassive = (state) => state.appSlice.visibility;
export const selectDaysMassive = (state) => state.appSlice.days;
export const selectGrafMassive = (state) => state.appSlice.graf;



export default appSlice.reducer;
