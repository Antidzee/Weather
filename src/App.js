import './App.css';
import React, {useState} from 'react';
import axios from 'axios';


function App() {

const [data,setData] = useState({});
const [location,setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=ce75cc7f5965ad830e2387b715e7e358`;
  function searchLocation(event) {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  }

  return (
    <div className="App relative w-full h-[100vh] text-white bg-[rgba(0,0,0,0.4)]">
      <div className='search text-center p-[1rem]'>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>

        <div className='container max-w-[700px] h-[700px] m-auto p-[0 1rem] relative top-[10%] flex flex-col justify-between'>
          <div className='top'>

            <div className='location'>
              <p>{data.name}</p>
              
              <div className='temp'>
                {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
            </div>

            <div className='description'>
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>

          </div>

          </div>
       
          {data.name !== undefined &&
          
             <div className='bottom'>

                <div className='feels'>
                  {data.main ? <p className="font-bold flex justify-center">{data.main.feels_like.toFixed()} °C</p> : null}
                  <p className='flex justify-center'>Feels like</p>
                </div>

                <div className='humidity'>
                  {data.main ? <p className="font-bold flex justify-center">{data.main.humidity}%</p> : null}
                  
                  <p className='flex justify-center'>Humidity</p>
                </div>

                <div className='wind'>
                  {data.wind ? <p className="font-bold flex justify-center">{data.wind.speed.toFixed()} MPH</p> : null}
                  <p className='flex justify-center'>Wind</p>
                </div>

          </div>

          }

        </div>
    </div>
  );
}

export default App;
