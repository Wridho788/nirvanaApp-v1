{
  /* 
  Author: Ridho Wahyu Nugroho
  edited: 14 agustus 2021
  email: wridho246@gmail.com
  */
}
'use strict';
import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  capitalize,
  showSnackBar,
  spacingUpperCase,
} from '../../../../functions/helper';
import color from '../../../../material/color';
import ukuran from '../../../../material/dimen';
import strings from '../../../../material/strings';
import {
  getResponseMat,
  requestAddMatData,
} from '../../../../services/mat_process';
import CustomButton from '../../../button/default_button';
import {CircleProgressBar} from '../../../items/progress_bar';
import TextTitle from '../../../items/title_text';
import FastImage from 'react-native-fast-image';

const PreviewMat = (props) => {
  const navigation = useNavigation();
  const [isProgress, setProgress] = useState(false);
  const [matName, setMatName] = useState('');
  const [matId, setMatId] = useState('');
  const [matOwner, setMatOwner] = useState('');
  const [matColor, setMatColor] = useState('');
  const [gifUrl, setMatGifUrl] = useState('');
  const [isUsed, setUsed] = useState(false);

  var componentHide = false;

  // props metdata
  useEffect(() => {
    fetchData(props.matData);
  }, [props.matData]);

  // fetching data user [array] from json
  function fetchData(matData) {
    if (matData.full_name != null) {
      setUsed(true);
      setMatId(matData.code);
      setMatName(matData.name);
      setMatColor(matData.color);
      setMatOwner(matData.full_name);
      setMatGifUrl(matData.mnm_animation_url);
    } else {
      setUsed(false);
      setMatId(matData.code);
      setMatName(matData.name);
      setMatOwner('');
      setMatColor(matData.color);
      setMatGifUrl(matData.mnm_animation_url);
    }
    // trying to see if fetch data work properly
    console.log(matOwner);
  }

  // process respons user jika sukses add mat
  const addMatProcess = async () => {
    if (matOwner.length > 0) {
      console.log('Ada' + matOwner);
      showSnackBar(strings.something_wrong);
    } else {
      setProgress(true);
      var reqeuestAddMat = await requestAddMatData(matId);
      var matResponse = getResponseMat(reqeuestAddMat);
      if (matResponse == strings.sucess) {
        showSnackBar(strings.matAdded);
      } else {
        showSnackBar(matResponse);
      }
      props.isAdded(true);
      setProgress(false);
    }
  };

  return (
    // <>
    <View style={styleMat.parent}>
      {!isProgress && (
        <View
          style={{
            margin: ukuran.dp_10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            tipe={'bold'}
            text={matOwner}
            maxLine={1}
            warna={color.defaultColor}
            bottom={ukuran.dp_4}
            top={ukuran.dp_10}
          />
          {/* fast image agar bisa touchable maka fast image dimasukkan ke dalam tag touchableopacity */}
          <TouchableOpacity
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
            }}
            onPress={() => navigation.navigate('StartYogaMatMainProcess', {testing:props.matData})}>
            <FastImage
              style={styleMat.image}
              source={gifUrl ? {uri: gifUrl} : null}
            />
          </TouchableOpacity>
          <TextTitle
            fontSize={ukuran.dp_16}
            align={'center'}
            tipe={'bold'}
            text={`${matName} - ${spacingUpperCase(capitalize(matColor))}`}
            maxLine={1}
            warna={color.defaultColor}
            top={ukuran.dp_18}
            bottom={ukuran.dp_20}
          />
          {isUsed && (
            <TextTitle
              fontSize={ukuran.dp_14}
              align={'center'}
              text={''}
              maxLine={1}
              warna={color.defaultColor}
              bottom={ukuran.dp_24}
            />
          )}
        </View>
      )}
      {isProgress && (
        <View style={styleMat.progress}>
          <CircleProgressBar />
        </View>
      )}
    </View>
    // </>
  );
};

const styleMat = StyleSheet.create({
  parent: {
    backgroundColor: color.white,
    height: ukuran._matchparent,
    marginBottom: -250,
  },

  progress: {
    alignSelf: 'center',
    position: 'absolute',
    top: '30%',
  },

  image: {
    width: '100%',
    flex: 1,
    aspectRatio: 1,
    backgroundColor: color.white,
  },
  //   viewbutton: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
});

export default PreviewMat;
