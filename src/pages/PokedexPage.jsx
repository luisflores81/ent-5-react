import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemonName } from '../store/slices/pokemonName.slice';
import useFetch from '../hooks/useFetch';
import PokeCard from '../components/PokedexPage/PokeCard';
import SelectType from '../components/PokedexPage/SelectType';
import './styles/PokedexPage.css';

const PokedexPage = () => {

  const [selectValue, setSelectValue] = useState('allPokemons');
  const trainerName = useSelector(store => store.trainerName);
  const pokemonName = useSelector(store => store.pokemonName);
  const dispatch = useDispatch();
  const [pokemons, getPokemons, getPerType] = useFetch();
  const [loadedPokemons, setLoadedPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (selectValue === 'allPokemons') {
      const url = `https://pokeapi.co/api/v2/pokemon/?limit=300`; 
      getPokemons(url)
    } else {
      getPerType(selectValue);
    }
  }, [selectValue]);

  useEffect(() => {
    if (pokemons) {
      const filteredPokemons = cbFilter();
      setTotalPages(Math.ceil(filteredPokemons.length / 30));
      const startIndex = (currentPage - 1) * 30;
      const endIndex = startIndex + 30;
      setLoadedPokemons(filteredPokemons.slice(startIndex, endIndex));
    }
  }, [pokemons, currentPage, pokemonName]);

  const textInput = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setPokemonName(textInput.current.value.trim().toLowerCase()));
    textInput.current.value = '';
  }
  
  const cbFilter = () => {
    if (pokemonName) {
      return pokemons?.results.filter(element => element.name.includes(pokemonName));
    } else {
      return pokemons?.results;
    }
  }

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  }

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => handlePageChange(i)} className={i === currentPage ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pages;
  }

  return (
    <div className='pokedex'>
      <section className='poke__header'>
        <h3>Bienvenido  <span>{trainerName}</span>, Aquí podrás encontrar tu Pokémon favorito</h3>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" ref={textInput} placeholder='Buscar un Pokemon'/>
            <button>Buscar</button>
          </form>
          <SelectType
            setSelectValue={setSelectValue}
          />
        </div>
      </section>

      <section className='poke__container'>
        {
          loadedPokemons.map(poke => (
            <PokeCard
              key={poke.url}
              url={poke.url}
            />
          ))
        }
      </section>
      <section className="pagination">
      <div className="pagination__buttons">
        <button  className="arrow-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
        🡨
        </button>
          {renderPagination()}
        <button  className="arrow-button" onClick={handleNextPage} disabled={currentPage === totalPages}> 
          🡪 
        </button>
      </div>
      </section>
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
    </div>
    
  );
}

export default PokedexPage;
