
import React, { Component} from "react";
import { Map, GoogleApiWrapper,Marker,Polyline } from "google-maps-react";
import { Button } from "react-bootstrap"
import './Googlemap.css'
class Googlemap extends Component {
    state = {
        currentLocation: { lat: null, lng: null },
      };
    
      componentDidMount() {
        this.getCurrentLocation();
      }
      
      getCurrentLocation = () => {
        console.log("Getting current location...");
        return new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log("Got position:", position);
                const currentLocation = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude,
                };
                this.setState({ currentLocation });
                resolve(currentLocation);
              },
              (error) => {
                console.error("Error getting position:", error);
                reject(error);
              }
            );
          } else {
            console.error("Geolocation is not supported by this browser");
            reject(new Error("Geolocation is not supported by this browser"));
          }
        });
      };
   render() {
    const { currentLocation } = this.state;
    const customSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" fill="#ec0e0e"/>
      </svg>
    `;
    console.log("Current Location:", currentLocation);
      return (
        <>
          <div className="map-container map_cont" >
            {currentLocation.lat && currentLocation.lng&&(
                 <Map
                 google={this.props.google}
                 initialCenter={{
                   lat: currentLocation.lat ,
                   lng: currentLocation.lng ,
                 }}
                 zoom={14}
               >
              <Marker
                position={{ lat: currentLocation.lat, lng: currentLocation.lng }}
                title="Address Location"
                icon={{
                    anchor: new this.props.google.maps.Point(32, 32),
                    scaledSize: new this.props.google.maps.Size(32, 32),
                    url: `data:image/svg+xml;utf-8,${encodeURIComponent(customSvg)}`,
                }}
              />
          </Map>
          )}
        </div>
        </>
      );
    }
  }
  
  export default GoogleApiWrapper({
    apiKey: "AIzaSyAEJKPO1AYMjoiEa7T746tRVtxzf5KhZF8",
  })(Googlemap);
  