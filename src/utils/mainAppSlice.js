import { createSlice } from '@reduxjs/toolkit';
import data from "../data/data.json";

const datasales = data.days;

// сделал стейт массивами чтобы итерировать можно было
let daysMassive = datasales.map(function (item) {
  return {
    date: item.date,
    viruchka: item.nal+item.beznal+item.kreditki,
    nal: item.nal,
    beznal: item.beznal,
    kreditki: item.kreditki,
    udaldo: item.udaldo,
    udalposle: item.udalposle,
    gostey: item.gostey,
    chekov: item.chekov,
    sredcheck:((item.nal+item.beznal+item.kreditki)/item.chekov).toFixed(),
    sredguest:((item.nal+item.beznal+item.kreditki)/item.gostey).toFixed(),
  };
});


// Вопрос по объединению
let rowChecked = {
  viruchka: {name:"Выручка", value: true},
  nal: {name:"Нал", value: true},
  beznal: {name:"Безнал", value: true},
  kreditki: {name:"Кредитки", value: true},
  sredcheck: {name:"Средний чек", value: true},
  sredguest: {name:"Средний гость", value: true},
  udalposle: {name:"Удалено после", value: true},
  udaldo: {name:"Удалено до", value: true},
  chekov: {name:"Чеков", value: true},
  gostey: {name:"Гостей", value: true},
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
      state.visibility[action.payload].value = state.visibility[action.payload].value ? false : true;
    },

    changeGrafData: (state, action) => {
      let name = action.payload;
      state.graf = state.days.map(function (item) {
        return {date: item.date, value: item[name] };
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
