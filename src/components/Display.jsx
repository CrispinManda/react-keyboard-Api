import { useEffect, useReducer } from 'react';
import axios from 'axios';

const initialState = {
  loading: false,
  error: null,
  data: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Display = ({ searchTerm }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        return;
      }

      dispatch({ type: 'FETCH_REQUEST' });

      try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILURE', payload: 'Failed to fetch data' });
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <>
      {state.loading && <p>Loading...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.data.length > 0 && (
        <div>
          {state.data.map((entry, index) => (
            <div key={index}>
              <h2>{entry.word}</h2>
              {entry.phonetics && (
                <div>
                  <strong>Phonetic:</strong> {entry.phonetics[0].text}
                </div>
              )}
              {entry.meanings && (
                <div>
                  <h3>Meanings:</h3>
                  {entry.meanings.map((meaning, meaningIndex) => (
                    <div key={meaningIndex}>
                      <strong>{meaning.partOfSpeech}</strong>
                      <ul>
                        {meaning.definitions.map((definition, definitionIndex) => (
                          <li key={definitionIndex}>{definition.definition}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
              {entry.sourceUrls && (
                <div>
                  <strong>Source:</strong> <a href={entry.sourceUrls[0]} target="_blank" rel="noopener noreferrer">Link</a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Display;
