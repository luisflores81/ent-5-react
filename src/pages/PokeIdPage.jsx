import React, { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import './styles/PokeIdPage.css'

const PokeIdPage = () => {
  const [pokeData, setPokeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const param = useParams();

  useEffect(() => {
    const getPokeData = async () => {
      setLoading(true);
      const url = `https://pokeapi.co/api/v2/pokemon/${param.id}`;
      const response = await fetch(url);
      const data = await response.json();
      setPokeData(data);
      setLoading(false);
    };
    
    getPokeData();
  }, [param.id]);

  return (
    <article>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='poke__id'>
          <img src={pokeData?.sprites.other['official-artwork'].front_default} alt="pokemon photo" />
          <div className='vector__one'></div>
          <div className='vector___one'></div>
          <h3>{pokeData?.name}</h3>
          <div>
            <p className='number'><strong>#</strong> {pokeData?.id}</p>
            <p className='weight'><strong>Weight:</strong> {pokeData?.weight}</p>
            <p className='height'><strong>Height:</strong> {pokeData?.height}</p>
            <p className='type'><strong>Types:</strong></p>
            <div className='types__two'>
              {pokeData?.types.map((type, index) => (
                <div key={index} className='type__color'>{type.type.name}</div>
              ))}
            </div>
            <p className='abilities'><strong>Abilities:</strong></p>
          <div>
            {pokeData?.abilities.map((ability, index) => (
              <p key={index} className='ability'>{ability.ability.name}</p>
            ))}
          </div>
          </div>
          
      <div>
          <p className='status'><strong>Status:</strong></p>
        <div className="stat-bar">
            <p><strong>HP:</strong> <span className="stat-value" style={{color: 'black'}}>{pokeData?.stats[0].base_stat}</span></p>
          <div className="hp-bar">
            <div className="hp-progress" style={{ width: `${(pokeData?.stats[0].base_stat / 150) * 100}%`, background: 'linear-gradient(to right, #ffe0b2, #ff9800)' }}></div>
          </div>
        </div>
        <div className="stat-bar">
            <p><strong>Attack:</strong> <span className="stat-value" style={{color: 'black'}}>{pokeData?.stats[1].base_stat}</span></p>
          <div className="attack-bar">
            <div className="attack-progress" style={{ width: `${(pokeData?.stats[1].base_stat / 150) * 100}%`, background: 'linear-gradient(to right, #ffe0b2, #ff9800)' }}></div>
          </div>
        </div>
        <div className="stat-bar">
            <p><strong>Defense:</strong> <span className="stat-value" style={{color: 'black'}}>{pokeData?.stats[2].base_stat}</span></p>
          <div className="defense-bar">
            <div className="defense-progress" style={{ width: `${(pokeData?.stats[2].base_stat / 150) * 100}%`, background: 'linear-gradient(to right, #ffe0b2, #ff9800)' }}></div>
          </div>
        </div>
        <div className="stat-bar">
            <p><strong>Speed:</strong> <span className="stat-value" style={{color: 'black'}}>{pokeData?.stats[5].base_stat}</span></p>
          <div className="speed-bar">
            <div className="speed-progress" style={{ width: `${(pokeData?.stats[5].base_stat / 150) * 100}%`, background: 'linear-gradient(to right, #ffe0b2, #ff9800)' }}></div>
          </div>
        </div>
      </div>


          <div className='move-container'>
            <p className='move-txt'><strong>Moves:</strong>{pokeData?.moves.slice(0,24).map(move => <span key={move.move.name} className='move-item'> {move.move.name} </span> )}</p>
          </div>
        </div>
      )}
      <div className="pokedex-image_2">
        <a href="/">
          <img src="https://s3-alpha-sig.figma.com/img/ca59/d9ce/98042af437fdff212d3259040db2e2db?Expires=1715558400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Kr-HNDP0HsGnQHkkrTEmw0u-2CdfDWeEuF4INIUZTtgNGTRivDxJ0ArcwBzfUipWub8QBR4q0A8pqh90nBVV7jlzIN-8mOJ65hEiLYUz4V0bigac0EbrRLGXLU94ZbNpkK6ODXSegalSxV4i89Ah7VE4RbWBLmVziFEmGtw60tVyoCnOHUmrXwTo2yFT5XsVxkUIa6aQSCBmqFDGxj9AhCXEdE4A9IbLK51S8JlTl9VQV0PqW5kOhscULECBPK5ggTpbMIKRVM6y~JIIMXbJaFl7mu7KNDHNEea5UAcMT8xAIWNBEhzciTpVvUZZT5Hcy2D4a5DQOSXTqSgqoceacw__" alt="Pokedex" />
        </a>
      </div>
      <div className="footer_2">
        <div className="large-rectangle-footer_2"></div>
        <div className="small-rectangle-footer_2"></div>
        <div className="circle-big_2"></div>
        <div className="circle-small_2"></div>
      </div>
    </article>
  );
};

export default PokeIdPage;
