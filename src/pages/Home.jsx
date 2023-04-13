import { Container, Grid } from "@mui/material"
import NavBar from "../components/NavBar"
import PokemonCard from "../components/PokemonCard"
import { useEffect, useState } from "react"
import axios from "axios"

function Home() {
  const[pokemons, setPokemons] = useState([])
  useEffect(() => {
    getPokemon()
  })

  const[filteredPokemons, setFilteredPokemons] = useState([])

  const getPokemon = () => {
    var endpoints = []
    for( var i = 1; i < 50; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
    }
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)) 
  }

  const pokemonFilter = (name) => {
    const result = pokemons.filter(p => p.data.name.includes(name))
    
    setFilteredPokemons(result)
  }

  return(
    <div>
      <NavBar pokemonFilter={pokemonFilter}/>
      <Container maxWidth="false">
        <Grid container spacing={3}>
          {
            filteredPokemons.length > 0 && filteredPokemons.map((pokemon, key) => 
              <Grid item xs={2} key={key}>
              <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default}/>     
              </Grid>) || pokemons.map((pokemon, key) => 
          <Grid item xs={2} key={key}>
          <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} types={pokemon.data.types}/>     
          </Grid>)
          }
        </Grid>
      </Container>
    </div>
  )
}

export default Home