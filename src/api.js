import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:8085',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    },
});

export default {
    getUpcomingMovies: () =>
        instance({
            'method': 'GET',
            'url': '/api/v1/movies',
            'params': {
                'status': 'PUBLISHED'
            }
        }),
    getReleasedMovies: () =>
        instance({
            'method': 'GET',
            'url': '/api/v1/movies',
            'params': {
                'status': 'RELEASED'
            }
        }),
    getGenres: () =>
        instance({
            'method': 'GET',
            'url': '/api/v1/genres'
        }),
    getArtists: () =>
        instance({
            'method': 'GET',
            'url': '/api/v1/artists'
        }),
    getFilteredMovies: (title, artists, genre, releasedDate, endDate) =>
        instance({
            'method': 'GET',
            'url': '/api/v1/movies',
            'params': {
                'title': title,
                'artists': artists,
                'genre': genre,
                'start_date': releasedDate,
                'end_date': endDate,
                'status': 'RELEASED'
            }
        }),
    userRegister: (newUser) =>
        instance({
            'method': 'POST',
            'url': '/api/v1/signup',
            'data': {
                'first_name': newUser.first_name,
                'last_name': newUser.last_name,
                'email_address': newUser.email_address,
                'password': newUser.password,
                'mobile_number': newUser.mobile_number
            }
        }),
    userLogin: (user_email, user_password) =>
        instance({
            'method': 'POST',
            'url': '/api/v1/auth/login',
            'auth': {
                username: user_email,
                password: user_password
            }
        })
}