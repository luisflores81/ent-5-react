import React, { useRef } from 'react';
import { setTrainerName } from '../store/slices/trainerName.slice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setTrainerName(textInput.current.value.trim()));
    navigate('./pokedex');
  };
  
  return (
    <div className="home-page-container">
      <div className="pokedex-image">
        <a href="/">
          <img src="https://s3-alpha-sig.figma.com/img/ca59/d9ce/98042af437fdff212d3259040db2e2db?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kr-HNDP0HsGnQHkkrTEmw0u-2CdfDWeEuF4INIUZTtgNGTRivDxJ0ArcwBzfUipWub8QBR4q0A8pqh90nBVV7jlzIN-8mOJ65hEiLYUz4V0bigac0EbrRLGXLU94ZbNpkK6ODXSegalSxV4i89Ah7VE4RbWBLmVziFEmGtw60tVyoCnOHUmrXwTo2yFT5XsVxkUIa6aQSCBmqFDGxj9AhCXEdE4A9IbLK51S8JlTl9VQV0PqW5kOhscULECBPK5ggTpbMIKRVM6y~JIIMXbJaFl7mu7KNDHNEea5UAcMT8xAIWNBEhzciTpVvUZZT5Hcy2D4a5DQOSXTqSgqoceacw__" alt="Pokedex" />
        </a>
      </div>
      <h1 className="welcome-text">¡Hola entrenador!</h1>
      <h2 className="instructions-text">Para poder comenzar, dame tu nombre </h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="large-rectangle">
          <input type="text" ref={textInput} className="input-field" placeholder="Tu nombre..." />
        </div>
        <div className="small-rectangle">
          <button className="btn-start">Comenzar</button>
        </div>
      </form>
      <div className="footer">
        <div className="large-rectangle-footer"></div>
        <div className="small-rectangle-footer"></div>
        <div className="circle-big"></div>
        <div className="circle-small"></div>
      </div>
    </div> 
  )
}

export default HomePage;
