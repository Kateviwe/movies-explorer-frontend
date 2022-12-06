// Содержит описание запросов к нашему Api
import {BASE_URL} from './constants';
import {url} from './constants';

//Класс, который отвечает за создание запросов на сервер и принятие ответов от сервера
class Api {
    constructor(config) {
        this._url = config.url;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return res.json()
            .then((err) => {
                err.statusRes = res.status;
                return Promise.reject(err);
            });
    }

    register(name, email, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                // Данный заголовок говорит серверу, что клиент ожидает получить ответ в JSON формате
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then(this._checkResponse);
    }

    login(email, password) {
        console.log('Я вывел')
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(this._checkResponse);
    }

    getInfoUser() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this._checkResponse);
    }

    changeInfoUser(name, email) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            // Новые данные пользователя
            body: JSON.stringify({
                name,
                email
            })
        }).then(this._checkResponse);
    }

    exitUserProfile() {
        return fetch(`${this._url}/signout`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    getSavedMovies() {
        return fetch(`${this._url}/movies`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }

    saveNewMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: url + movie.image.url,
                trailer: movie.trailerLink,
                thumbnail: url + movie.image.formats.thumbnail.url,
                movieId: movie.id,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        }).then(this._checkResponse);
    }

    deleteSavedMovie(idMovie) {
        return fetch(`${this._url}/movies/${idMovie}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(this._checkResponse);
    }
}

//Создание экземпляра класса Api
export const api = new Api({
    url: BASE_URL
});
