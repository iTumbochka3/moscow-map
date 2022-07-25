
import { createStore } from 'vuex';
import * as districtsJsonFile from '../assets/districts.json';

export default createStore({
    state: {
        markers: [],
        polygons: [],
    },
    getters: {
        getMarkers: state => {
            return state.markers;
        },
        getPolygons: state => {
            return state.polygons;
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
                        name: item[0],
                        type: item[0] + '_' + index,
                        paths: path,
                    }
                }));
            });
            commit('setPolygons', polygons);
        },
    },
});