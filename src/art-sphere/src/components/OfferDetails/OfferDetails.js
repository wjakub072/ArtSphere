import React from 'react';
import image from './test.jpg'
import './OfferDetails.css';

function renderButton(message) {
    return (
        <button className='btn btn-primary' mt-3>
            {message}
        </button>
    );
}

function renderImage(source, description) {
    return (
        <img src={source} alt={description} />
    );
}

function renderPrice(price, currency) {
    return (
        <p>Cena: {price} {currency}</p>
    );
}

function renderAvailability(available) {
    if(available)
    {
        return (
            <p>Dostępność: Dostępny</p>
        );
    }
    else
    {
        return (
            <p>Dostępność: Niedostępny</p>
        );
    }
}

function renderAutor(name) {
    return (
        <p>Autor: {name}</p>
    );
}

function renderDimentions(x,y,z) {
    return (
        <p>Wymiary: {x} x {y} x {z}</p>
    );
}

function renderWeight(weight) {
    return (
        <p>Waga: {weight} kg</p>
    );
}

function renderOfferType(type) {
    return (
        <p>Typ: {type}</p>
    );
}

function renderDescription(description) {
    return (
        <p className='text-justify'><h3>Opis</h3>{description}</p>
    );
}

function OfferDetails() {
    return (
        <div className='container bg-dark-subtle rounded-3 mt-5 p-3'>
            <h2 className='text-primary'>Nazwa produktu</h2>
            <div className='row'>
                <div className='col-sm-8'>{renderImage(image, 'obraz')}</div>
                <div className='col-sm-4'>{renderPrice('100,99', 'zł')}
                {renderAvailability(true)}
                {renderButton('Dodaj do koszyka')}</div>
            </div>
            <div className='row mt-3'>
                <div className='col-sm-8'>{renderDescription('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')}</div>
                <div className='col-sm-4'>{renderAutor('Autor')}
                {renderDimentions(5,3,2)}
                {renderWeight(2)}
                {renderOfferType('Obraz')}</div>
            </div>
        </div>
    );
}

export default OfferDetails;