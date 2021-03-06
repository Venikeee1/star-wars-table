import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * must have:
 1 использовать typescript
 2 линтер

 1. Сортировка по столбцам
 2. Фильтрация по столбцам
 3. Возможность редактирования ячеек

 nice to have:
 1 Реализовать возможность сохранения данных таблицы в разные типы стореджей (localStorage, indexedDb).
 Если браузер пользователя не поддерживает indexedDb записывать данные в localStorage.
 В дальнейшем брать данные уже со стореджа. Записать данные в любой из типов стореджей можно через один и тот же инстанс.
 2 Покрыть тестами всю логику взаимодействия с разными типами стореджей.
 4. Пагинация
 Инициатива приветствуется.
 Как можно улучшить взаимодействие пользователя с нашим компонентом?
 На какие подкомпоненты можно выделить?
 Желательно чтобы таблица была универсальной и могла работать с разными структурами данных.

 *
 * */
