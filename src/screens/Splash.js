import { FontAwesome5, Entypo } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0);
  const iconScale = new Animated.Value(1);
  const textRotation = new Animated.Value(0);

  useEffect(() => {
    const animationDuration = 6000;
    const delayDuration = 3000;

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 10,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    animateIcon();
    animateText();
    setTimeout(navigateToHome, delayDuration);
  }, [navigation]);

  const animateIcon = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScale, {
          toValue: 1.2,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(iconScale, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const animateText = () => {
    Animated.loop(
      Animated.timing(textRotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const navigateToHome = () => {
    navigation.navigate('SignInWelcomeScreen');
  };

  const textRotationInterpolation = textRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}>
        <Image source={require('./../../assets/images/logo.png')} style={styles.logo} resizeMode="cover" />
      </Animated.View>
      <View style={styles.content}>
        <Animated.Text style={[styles.welcomeText, { transform: [{ rotate: textRotationInterpolation }] }]}> 
        {/* <FontAwesome5 name="grin-stars" style={styles.icon} /> */}
        {/* <FontAwesome5 name="search-dollar" style={styles.icon} /> */}
        {/* <FontAwesome5 name="user-graduate" style={styles.icon} /> */}
        <Entypo name="rainbow" style={styles.icon} />


        </Animated.Text>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: iconScale }] }]}>
        {/* <Text style={styles.welcomeText}>Quiz</Text> */}
        <Text style={styles.welcomeText}>J-Rex</Text>
        <Entypo name="water" style={styles.icon} />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00A8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
  },
  logo: {
    width: 200,
    height: 200,
    margin:20,
  },
  content: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 58,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    // marginVertical: 5,
  },
  iconContainer: {
    marginTop:10,
  },
  icon: {
    fontSize: 50,
    color: '#FFFFFF',
  },
});

export default SplashScreen;
