export function getMethod(url, data) {
    url = '/api/' + url
    return this.$axios({
        method: 'get',
        headers: {
            Authorization: 'Bearer ',
        },
        url,
        params: data,
    })
    .then((response) => {
        return response.data
    })
}

export function postMethod(url, data) {
    url = '/api/' + url
    return this
    .$axios({
        method: 'post',
        headers: { Authorization: 'Bearer ' },
        url,
        data,
    })
    .then((response) => {
        return response.data
    })
}