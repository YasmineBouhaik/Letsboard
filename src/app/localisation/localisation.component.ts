import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import * as Mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})

export class LocalisationComponent implements OnInit {

  mapa: any = Mapboxgl.Map;

  ngOnInit() {
    (Mapboxgl as typeof Mapboxgl).accessToken = environment.mapboxkey;
     this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [3.0615573,50.6413476], // starting position
      zoom: 12 // starting zoom
  });


  const geojson = {
    'type': 'FeatureCollection',
    'features': [
    {
    'type': 'Feature',
    'properties': {
    'message': 'Lets Board, Ouvert 7 jours sur 7 de 15h à 2h',
    'iconSize': [60, 60]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [3.0615573, 50.6413476] as Mapboxgl.LngLatLike
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'PLayers Bar, Ouvert 7 jours sur 7 de 15h à 2h',
    'iconSize': [50, 50]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [3.0562141,50.6334554] as Mapboxgl.LngLatLike
    }
    },
    {
    'type': 'Feature',
    'properties': {
    'message': 'Gamers Bar, Ouvert 7 jours sur 7 de 15h à 2h',

    'iconSize': [40, 40]
    },
    'geometry': {
    'type': 'Point',
    'coordinates': [3.0653833,50.6283585] as Mapboxgl.LngLatLike
    }
    }
    ]
    };

  //Add markers to the map.
  for (const marker of geojson.features) {
  //Create a DOM element for each marker.
    const el = document.createElement('div');
    const width = marker.properties.iconSize[0];
    const height = marker.properties.iconSize[1];
    el.className = 'marker';
    el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = '100%';
    el.style.borderRadius = '50%';

    
    el.addEventListener('click', () => {
    window.alert(marker.properties.message);
    });
    
    //Add markers to the map.
      new Mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(this.mapa);
      }

  }}
