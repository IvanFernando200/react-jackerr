import React from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import "./App.css";
import Button from "@mui/material/Button";

const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td>
      <Button variant="contained" onClick={() => onSelect(pokemon)}>
        Select!
      </Button>
    </td>
  </tr>
);
PokemonRow.prototypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.shape({
      english: PropTypes.string.isRequired,
    }),
    type: PropTypes.arrayOf(PropTypes.string.isRequired),
    onSelect: PropTypes.func.isRequired,
  }),
};

const PokemonInfo = ({ name, base }) => (
  <div>
    <h1>{name.english}</h1>
    <table>
      {Object.keys(base).map((key) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{base[key]}</td>
        </tr>
      ))}
    </table>
  </div>
);

PokemonInfo.prototypes = {
  name: PropTypes.shape({
    english: PropTypes.string.isRequired,
  }),
  base: PropTypes.shape({
    HP: PropTypes.number.isRequired,
    Attack: PropTypes.number.isRequired,
    Defense: PropTypes.number.isRequired,
    "SP. Attack": PropTypes.number.isRequired,
    "Sp. Defense": PropTypes.number.isRequired,
    Speed: PropTypes.number.isRequired,
  }),
};

// styled-components
const Title = styled.h1`
  text-align: center;
`;

const ToColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 70% 30%;
  column-gap: 1rem;
`;

const Container = styled.div`
  margin: auto;
  width: 800px;
  padding-top: 1rem;
`;
const Input = styled.input`
  width: 100%;
  font-size: x-large;
  padding: 0.3rem;
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      pokemon: [],
      selectedItem: null,
    };
  }
  componentDidMount() {
    fetch("http://localhost:5173/pokemon.json")
      .then((resp) => resp.json())
      .then((pokemon) => this.setState({ ...this.state, pokemon }));
  }
  render() {
    return (
      <Container>
        <Title>Pokemon Search</Title>
        <ToColumnLayout>
          <div>
            <Input
              type="search"
              value={this.state.filter}
              onChange={(evt) =>
                this.setState({ ...this.state, filter: evt.target.value })
              }
            />
            <table width="100%">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                </tr>
              </thead>
              {/* <tr key={[pokemon.id,pokemon.name.english].join(':')}> */}
              <tbody>
                {this.state.pokemon
                  .filter((pokemon) =>
                    pokemon.name.english
                      .toLowerCase()
                      .includes(this.state.filter.toLowerCase())
                  )
                  .slice(0, 20)
                  .map((pokemon) => (
                    <PokemonRow
                      pokemon={pokemon}
                      key={pokemon.id}
                      onSelect={(pokemon) =>
                        this.setState({ ...this.state, selectedItem: pokemon })
                      }
                    />
                  ))}
              </tbody>
            </table>
          </div>
          {this.state.selectedItem && <PokemonInfo {...this.state.selectedItem} />}
        </ToColumnLayout>
      </Container>
    );
  }
}
export default App;
// function App() {
//   const [filter, filterSet] = React.useState("");
//   const [pokemon, pokemonSet] = React.useState([]);
//   const [selectedItem, selectedItemSet] = React.useState(null);

//   React.useEffect(() => {
//     fetch("http://localhost:5173/pokemon.json")
//       .then((resp) => resp.json())
//       .then((data) => pokemonSet(data));
//   }, []);
//   return (
//     <Container>
//       <Title>Pokemon Search</Title>
//       <ToColumnLayout>
//         <div>
//           <Input
//             type="search"
//             value={filter}
//             onChange={(evt) => filterSet(evt.target.value)}
//           />
//           <table width="100%">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Type</th>
//               </tr>
//             </thead>
//             {/* <tr key={[pokemon.id,pokemon.name.english].join(':')}> */}
//             <tbody>
//               {pokemon
//                 .filter((pokemon) =>
//                   pokemon.name.english
//                     .toLowerCase()
//                     .includes(filter.toLowerCase())
//                 )
//                 .slice(0, 20)
//                 .map((pokemon) => (
//                   <PokemonRow
//                     pokemon={pokemon}
//                     key={pokemon.id}
//                     onSelect={(pokemon) => selectedItemSet(pokemon)}
//                   />
//                 ))}
//             </tbody>
//           </table>
//         </div>
//         {selectedItem && <PokemonInfo {...selectedItem} />}
//       </ToColumnLayout>
//     </Container>
//   );
// }
