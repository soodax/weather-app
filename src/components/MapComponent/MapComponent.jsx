import './MapComponent.scss';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import React, { useState, useEffect, useRef } from 'react';
import XYZ from 'ol/source/XYZ'


const MapComponent = ({mapData}) => {

    const [map, setMap] = useState();
    const mapElement = useRef();
      const mapRef = useRef();
      mapRef.current = map;
    // const [currentLayer, setCurrentLayer] = useState(
    //   {
    //     source: new XYZ({
    //       url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`
    //     }),
    //     visible: true
    //   }
    // );
    // const [mapType, setMapType] = useState('temp_new');
    
    // let newLayer;
    // let initialMap
    const api = process.env.REACT_APP_API_KEY

    const onChangeMap = (e) => {
      // alert(e.currentTarget.value)
      // setMapType(e.currentTarget.value)
      const mapType = e.currentTarget.value;
      alert(mapType)
      // newLayer.getSource().clear();
      // initialMap.removeLayer(newLayer)
      if (map) {
        map.getLayers().getArray().map(layer => {
          map.removeLayer(layer);
          console.log('remove layer----')
          console.log(layer)
          console.log('end remove layer----')
          return true;
        });
      }
      console.log(map.getLayers().getArray())
      createMap(mapType)
    }

    const createMap = (mapType) => {
      console.log(`create map ${mapType} start`)
      console.log(map)
      const url = `https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${api}`;
      // console.log(url)    

      let initialMap  = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new XYZ({
              url: url
            }),
          })                  
        ],
        view: new View({
          center: [0, 0],
          zoom: 0
        })
      });


      setMap(initialMap);
      mapRef.current = initialMap;
      console.log(`create map ${mapType} end`)
    }

    useEffect(() => {       
      createMap('temp_new')
    }, [])

    return (
        <div className='map'>
            <div className='map__settings'>
              <h1 className='map__title'>Map</h1>
              <span className='map__list'>
                <select name="" id="" onChange={onChangeMap}>
                    <option value="clouds_new">Clouds</option>
                    <option value="precipitation_new">Precipitation</option>
                    <option value="pressure_new">Sea level pressure</option>
                    <option value="wind_new">Wind speed</option>
                    <option value="temp_new" defaultChecked>Temperature</option>
                </select>
              </span>
              
            </div>
            
            <div className='map__main' ref={mapElement}>
             
            </div>
            
        </div>
    )
}

export default MapComponent;