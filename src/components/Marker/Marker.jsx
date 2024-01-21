import { Marker as GoogleMarker } from '@react-google-maps/api';
import img from '../../assets/img/sponge-bob.svg';

export const Marker = ({position, label}) => {
  return (
    <GoogleMarker position={position} icon={{
      url: img,
      scaledSize: {
        width: 50,
        height: 50
      }
    }}
    label={label}
    />
  )
}