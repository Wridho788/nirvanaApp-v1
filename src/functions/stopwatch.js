import React, {useEffect, useState} from 'react';
import TextTitle from '../layouts/items/title_text';
import color from '../material/color';
import ukuran from '../material/dimen';
import BackgroundTimer from 'react-native-background-timer';

const StopWatchReact = (props) => {
  const [detik, setDetik] = useState(0);
  const [menit, setMenit] = useState(0);
  const [jam, setJam] = useState(0);
  const [silentDetik, setSilentDetik] = useState(0);
  useEffect(() => {
    // maximum time 2 hour
    if (jam > 2) {
      console.log(`finish`);
    } else {
      if (props.start) {
        setTimeout(() => {
          setSilentDetik(silentDetik + 1);
          if (detik > 58) {
            setDetik(0);
            setMenit(menit + 1);
            if (menit > 58) {
              setMenit(0);
              setJam(jam + 1);
            }
          } else {
            setDetik(detik + 1);
          }
        }, 1000);
      }
      props.onTick(silentDetik);
    }
  }, [props.start, detik]);

  return (
    <>
      <TextTitle
        fontSize={40}
        align={'center'}
        tipe={'bold'}
        text={`${jam < 10 ? '0' : ''}${jam} : ${
          menit < 10 ? '0' : ''
        }${menit} : ${detik < 10 ? '0' : ''}${detik}`}
        maxLine={1}
        warna={color.defaultColor}
        top={ukuran.dp_10}
        bottom={ukuran.dp_20}
      />
    </>
  );
};

export default StopWatchReact;
