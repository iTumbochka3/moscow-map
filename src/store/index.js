
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
        activeZones: [],
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
        getActiveZones: state => {
            return state.activeZones;
        }
    },
    mutations: {
        setMarkers(state, data) {
            state.markers = data;
        },
        setPolygons(state, data) {
            state.polygons = data;
        },
        addActiveZone(state, data) {
            state.activeZones.push(data);
        },
        removeActiveZone(state, data) {
            state.activeZones = state.activeZones.filter((item) => item !== data);
        },
        clearActiveZones(state) {
            state.activeZones = [];
        },
    },
    actions: {
        generateMarkers({ commit }, markers) {
            commit('setMarkers', markers);
        },
        drawPolygons({ commit }) {
            const polygons = [];
            Object.entries(districtsJsonFile)
                .filter(item => item[0] !== 'default')
                .forEach(district => {
                    const districtCode = district[0];
                    district[1].geometry.coordinates.forEach(item => {
                        item.forEach((districtPath, index) => {
                            polygons.push({
                                code: districtCode,
                                type: districtCode + '_' + index,
                                paths: districtPath.map((coordinate) => { return { lat: coordinate[1], lng: coordinate[0] } }),
                                options: {
                                    fillColor: this.state.districts[districtCode].color,
                                    fillOpacity: 0.65
                                },
                            });
                        });
                    });
                })
            commit('setPolygons', polygons);
        },
        toggleActiveZones({ commit }, code) {
            if (this.state.activeZones.includes(code)) {
                commit('removeActiveZone', code);
            } else {
                commit('addActiveZone', code);
            }
        },
        clearActiveZones({ commit }) {
            commit('clearActiveZones');
        }
    },
});