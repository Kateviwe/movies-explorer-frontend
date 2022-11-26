// Содержит описание запросов к сервису beatfilm-movies
import {MOVIES_URL} from './constants';

//Класс, который отвечает за создание запросов на сервер и принятие ответов от сервера
class MoviesApi {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Произошла ошибка ${res.status}`);
    }

    getMoviesFromServer() {
        return fetch(this._url, {
            headers: this._headers
        }).then(this._checkResponse);
    }
}

//Создание экземпляра класса MoviesApi
export const moviesApi = new MoviesApi({
    url: MOVIES_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
