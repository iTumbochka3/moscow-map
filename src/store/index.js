
import { createStore } from 'vuex';
import * as districtsJsonFile from '../assets/districts.json';

export default createStore({
    state: {
        markers: [],
        polygons: [],
        districts: {
            'CentralAdministrativeOkrug': {
                name: 'Центральный',
                color: '#E9B5A5',
            },
            'NorthernAdministrativeOkrug': {
                name: 'Северный',
                color: '#F0F6CC',
            },
            'North-EasternAdministrativeOkr': {
                name: 'Северо-Восточный',
                color: '#FFFDC2',
            },
            'EasternAdministrativeOkrug': {
                name: 'Восточный',
                color: '#F9DFBE',
            },
            'South-EasternAdministrativeOkr': {
                name: 'Юго-Восточный',
                color: '#AED8EE',
            },
            'SouthernAdministrativeOkrug': {
                name: 'Южный',
                color: '#CEE0BE',
            },
            'South-WesternAdministrativeOkr': {
                name: 'Юго-Западный',
                color: '#ABBDD5',
            },
            'WesternAdministrativeOkrug': {
                name: 'Западный',
                color: '#D1BBD4',
            },
            'North-WesternAdministrativeOkr': {
                name: 'Северо-Западный',
                color: '#F6DDEC',
            },
            'ZelenogradskyAdministrativeOkr': {
                name: 'Зеленоградский',
                color: '#DCF4D2',
            },
        },
    },
    getters: {
        getMarkers: state => {
            return state.markers;
        },
        getPolygons: state => {
            return state.polygons;
        },
        getDistrictsInfo: state => {
            return state.districts;
        },
    },
    mutations: {
        setMarkers(state, data) {
            state.markers = data;
        },
        setPolygons(state, data) {
            state.polygons = data;
        },
    },
    actions: {
        generateMarkers({ commit }, markers) {
            commit('setMarkers', markers);
        },
        drawPolygons({ commit }) {
            const polygons = [];
            Object.entries(districtsJsonFile).filter((item) => item[0] !== 'default').forEach((item) => {
                const paths = [];
                item[1].geometry.coordinates.forEach(el1 => {
                    el1.forEach(el2 => {
                        paths.push(el2.map((c) => { return { lat: c[1], lng: c[0] } }));
                    });
                });
                polygons.push(...paths.map((path, index) => {
                    return {
                        code: item[0],
                        type: item[0] + '_' + index,
                        paths: path,
                        options: { 
                            fillColor: this.state.districts[item[0]].color,
                            fillOpacity: 0.65
                        },
                    }
                }));
            });
            commit('setPolygons', polygons);
        },
    },
});