import axios from 'axios';
import React, { useEffect, useState } from 'react';

type Quote = {
  q: string; // quote
  a: string; // author
};

const MotivationalQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
        const response = await axios.get(
        'https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random')
            );
        console.log('Citação recebida:', response.data);
        const data = JSON.parse(response.data.contents);
        setQuote(data[0]);

  } catch (error) {
    console.error('Erro ao buscar citação:', error);
    setQuote(null);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div style={{ padding: '1rem', borderLeft: '4px solid #ccc', marginBottom: '1rem' }}>
      {loading ? (
        <p>Carregando citação motivacional...</p>
      ) : quote ? (
        <blockquote>
          <p style={{ fontStyle: 'italic' }}>"{quote.q}"</p>
          <footer>— {quote.a}</footer>
        </blockquote>
      ) : (
        <p>Não foi possível carregar a citação.</p>
      )}
    </div>
  );
};

export default MotivationalQuote;
