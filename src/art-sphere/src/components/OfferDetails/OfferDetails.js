import React from 'react';
import image from './test.jpg'
import './OfferDetails.css';

function OfferDetails() {
    return (
        <div className='container bg-dark-subtle rounded-3 mt-5 p-3'>
            <h2 className='text-primary'>Nazwa produktu</h2>
            <div className='row'>
                <div className='col-sm-8'><img src={image} alt='Obraz' /></div>
                <div className='col-sm-4'>
                    <p>Cena: 100,99 zł</p>
                    <p>Dostępność: Dostępny</p>
                    <button className='btn btn-primary' mt-3>
                        Dodaj do koszyka
                    </button>
                </div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-8'>
                    <p className='text-justify'><h3>Opis</h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className='col-sm-4'>
                    <p>Autor: Autor</p>
                    <p>Tematy: Krajobrazy</p>
                    <p>Techniki: Akwarele</p>
                    <p>Wysokość: 40 cm</p>
                    <p>Szerokość: 80 cm</p>
                    <p>Tagi: Obraz</p>
                </div>
            </div>
        </div>
    );
}

export default OfferDetails;