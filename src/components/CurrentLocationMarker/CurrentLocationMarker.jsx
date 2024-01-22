import { Marker } from "@react-google-maps/api"
import marker from '../../assets/img/pngwing.com.png'

export const CurrentLocationMarker = ({position}) => {
  return (
    <Marker position={position} icon={{
      url: marker,
      scaledSize: {
        width: 40,
        height: 50
      }
    }} />
  )
}