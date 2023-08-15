import Cookies from "universal-cookie";

export default function AxiosErrorHelper(error) {
    if (error) {
        if (error.code === 'ERR_NETWORK') {
            return { type: 'Error', code: 'Network Error', description: 'Undefined service unavaliable' }
        }
        if (error.code === 'ERR_BAD_REQUEST') {
            switch (error.response.status) {
                case 401:
                    return handle401Error(error)
                default:
                    let title = (error.response && error.response.data && error.response.data.description) ? error.response.data.description : 'Undefined Error From Server'
                    let notifications = []
                    if (error.response && error.response.data) {
                        if (error.response.data.list) {
                            let listoferror = error.response.data.list
                            listoferror.forEach(err => {
                                notifications.push({ type: 'Error', code: err.code ? err.code : 'Server hatası', description: err.description ? err.description : 'Tanımlanamayan hata' })
                            });
                        } else {
                            notifications.push({ type: 'Error', code: error.response.data.code, description: error.response.data.description })
                        }
                    } else {
                        notifications.push({ type: 'Error', code: title, description: 'Undefines Error From Server' })
                    }
                    return notifications
            }
        }
        if (error.code === 'ERR_BAD_RESPONSE') {
            let title = (error.response && error.response.data && error.response.data.type) ? error.response.data.type : (error.name ? error.name : 'Undefined Error From Server')
            let notifications = []
            if (error.response && error.response.data) {
                if (error.response.data.list) {
                    let listoferror = error.response.data.list
                    listoferror.forEach(err => {
                        notifications.push({ type: 'Error', code: err.code ? err.code : 'Server hatası', description: err.description ? err.description : 'Tanımlanamayan hata' })
                    });
                } else {
                    notifications.push({ type: 'Error', code: error.response.data.type, description: error.response.data.description })
                }
            } else {
                notifications.push({ type: 'Error', code: title, description: 'Undefines Error From Server' })
            }
            return notifications
        }
    }

    return null
}



function handle401Error(error) {
    const localcookies = new Cookies();
    localcookies.remove("patientcare")
    if (window.location.pathname !== "/Login") {
        window.location = `/Login?redirecturl=${window.location.pathname}`
    }
    if (window.location.pathname === "/Login") {
        return { type: 'Error', code: error.code, description: 'Kullanıcı Adı veya şifre Hatalı' }
    } else {
        return { type: 'Error', code: error.code, description: 'Lütfen Tekrardan Giriş Yapınız' }
    }
}



