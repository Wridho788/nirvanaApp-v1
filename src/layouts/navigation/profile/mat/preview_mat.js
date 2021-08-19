{
  /* 
  Author: Ridho Wahyu Nugroho
  edited: 14 agustus 2021
  email: wridho246@gmail.com
  */
}
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import color from '../../../../material/color';
import ukuran from '../../../../material/dimen';
import TextTitle from '../../../items/title_text';
import PreviewMat from './preview_mat_popup';
import CustomButton from '../../../button/default_button';

const MatYogaPreStart = (props) => {
  const navigation = useNavigation();

  var {testing} = props.route.params;

  const {matData} = props.route.params;

  console.log(testing);
  console.log(matData);
  return (
    <>
      <View style={{flex: 1, backgroundColor: color.white}}>
        <Text
          style={{
            marginTop: 20,
            marginBottom: ukuran.dp_18,
            textAlign: 'center',
          }}>
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            text={'MY '}
            maxLine={1}
            warna={color.defaultColor}
            bottom={ukuran.dp_14}
            top={40}
          />
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            tipe={'bold'}
            text={'NIRVANA '}
            maxLine={1}
            warna={color.defaultColor}
            bottom={ukuran.dp_14}
            top={40}
          />
          <TextTitle
            fontSize={ukuran.dp_18}
            align={'center'}
            text={'MAT'}
            maxLine={1}
            warna={color.defaultColor}
            bottom={ukuran.dp_14}
            top={40}
          />
        </Text>
        <View
          style={{
            width: ukuran.wpMatchParent,
            height: 1,
            backgroundColor: color.white_300,
          }}
        />
        {/* view start yoga  */}
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View style={styleMain.parent}>
            <PreviewMat
              onBackPressed={() => props.navigation.goBack()}
              // onProgressPress={(e) => {
              //   props.navigation.navigate('PageTraining', {
              //     codeMat: matData.code,
              //     withOur: true,
              //   });
              // }}
              onBackPressed={() => previewRef.current.snapTo(1)}
              matData={testing}
              // onStartPress={(e) => {
              //   props.navigation.navigate('PageTraining', {
              //     codeMat: matData.code,
              //     withOur: false,
              //   });
              // }}
              nav={props.navigation}
              style={styleMain.previewMat}
            />
            {/* view button custom*/}
            <View style={styleMain.custombutton}>
              <CustomButton
                width={'match'}
                onpressed={
                  (e) =>
                    navigation.navigate('StartYogaMatMain', {
                      start: testing,
                    })
                  // e=> {console.log(props)}
                }
                // onpressed={() => navigation.push('StartYogaMatMain')}
                backgroundColor={color.defaultColor}
                text={!props.onStartText ? `Start Yoga` : props.onStartText}
                style={{marginTop: -100}}
              />
              {/* <CustomButton
                  width={'match'}
                  // onpressed={props.onProgressPress}
                  onpressed={() => {
                    props.navigation.navigate('PageTraining', { codeMat: matData.code, withOur: true})
                  }}
                  backgroundColor={color.white}
                  text={
                    !props.onProgressText ? `With our Instructor` : props.onProgressText
  
                  }
                /> */}
              <CustomButton
                width={'match'}
                // onpressed={props.onProgressPress}
                onpressed={(e) =>
                  // navigation.navigate('PageTraining',{withOur: false})
                  console.log('history')
                }
                // console.log(testing);
                // navigation.navigate('PageTraining', { codeMat: matData})
                backgroundColor={color.white}
                text={!props.onProgressText ? `Progress` : props.onProgressText}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styleMain = StyleSheet.create({
  parent: {
    margin: 30,
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

  previewMat: {
    height: '30%',
  },

  custombutton: {
    marginTop: -100,
    alignSelf: 'center',
  },
});

export default MatYogaPreStart;
