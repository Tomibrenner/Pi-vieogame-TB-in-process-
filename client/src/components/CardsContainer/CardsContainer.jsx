// import React from "react";
// import Card from "../Card/Card";
// import './CardsContainer.modules.css'
// import { useState, useEffect } from "react";
// import {useSelector, useDispatch} from 'react-redux'
// //Este componente toma un array de usuarios, y por cada usuario, renderiza un componente Card

// const CardsContainer = () => {
//   //estados globales desde reducer
//   const games = useSelector(state => state.allGames)
//   const allGenres = useSelector(state => state.genres)

//   //estados Locales para ordenar
//   const [order, setOrder] = useState('Select Order')
//   const [rating, setRating] = useState('Select Order')

//   return (
//     <div className="container">
//       {games.map((game) => {
//         return <Card 
        
//         name={game.name} 
//         rating={game.rating}
//         released={game.released} 
//         image={game.background_image}
//         genres={game.genres}
        
//         />;
//       })}
//     </div>
//   );
// };

// export default CardsContainer;
