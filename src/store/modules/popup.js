import axios from "axios"

const url = 'https://data.jsdelivr.com/v1/package/npm/'

const getData = url =>
(axios.get(url).then(res => res.data)
    .catch(e => {
        console.error(e);
        return new Error(e)
    }))

export default {
    namespaced: true,
    state() {
        return {
            popupState: false,
            popupData: {
                crtPackage: null,
                packageVersions: null,
                packageFiles: null
            },
        }
    },
    mutations: {
        closePopup(state) {
            state.popupState = false
        },
        setPopupData(state, { crtPackage, packageFiles, packageVersions }) {
            crtPackage ? state.popupData.crtPackage = crtPackage :
                packageVersions ? state.popupData.packageVersions = packageVersions :
                    packageFiles ? state.popupData.packageFiles = packageFiles : 1
            state.popupState = true
        }
    },
    actions: {
        openPopupData({ commit, rootState }, { name, version }) {
            const crtPackage = rootState.searchList.filter(el => el.package.name === name ? el : null)
            const urlVersions = url + name
            const urlFiles = url + name + '@' + version

            getData(urlFiles).then(res => {
                if (res) {
                    commit('setPopupData', { packageFiles: res })
                }
            })
            getData(urlVersions).then(res => {
                commit('setPopupData', { packageVersions: res })
            })
            commit('setPopupData', { crtPackage: crtPackage[0] })
        },
        getNewFiles({ commit }, { name, version }) {
            const urlFiles = url + name + '@' + version
            getData(urlFiles).then(res => {
                commit('setPopupData', { packageFiles: res })
            })
        }
    }
}