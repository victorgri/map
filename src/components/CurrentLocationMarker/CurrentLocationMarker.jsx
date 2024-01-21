import sponge from '../../sponge-bob.svg'
import { Marker } from "@react-google-maps/api"

export const CurrentLocationMarker = ({position}) => {
  return (
    <Marker position={position} icon={{
      url: sponge,
      scaledSize: {
        width: 50,
        height: 50
      }
    }} />
  )
}