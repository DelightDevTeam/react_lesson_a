import { useState, useEffect } from 'react';
import './App.css';

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  });

  return (
    <div className='card'>
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  );
};

function App() {
  return (
    <div className='card-container'>
      <Card title='Star Wars' />
      <Card title='Avatars 1' />
      <Card title='The Lion King 1' />
    </div>
  );
}

export default App;
