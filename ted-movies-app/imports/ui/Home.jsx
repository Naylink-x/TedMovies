import React, { useState } from 'react';
import { Component } from 'react';
import { http } from 'http';

class Home extends Component {

    render() {
        let ctrl = this
        this.movies = new ReactiveVar();

        const httpCall = () => {
            http.call('GET', 'http://localhost:3000/api/discover/movie', {}, function(error, response) {
            ctrl.movies.set(JSON.parse(response.content).results)
            });

        return(
            <div>
                <p>{httpCall}</p>
            </div>
        );
    }};
}
    
export default Home;