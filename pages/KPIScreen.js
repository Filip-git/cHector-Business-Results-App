import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { baseGetRequest } from '../hooks/requestHelper';
import { ActivityIndicator } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';


const screenWidth = Dimensions.get('window').width;

export default function KPIScreen() {
  const [dataSales, setDataSales] = useState([]);
  const [labelSales, setLabelSales] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [labelRevenue, setLabelRevenue] = useState([]);
  const [animate, setAnimate] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchDataSales = async () => {
        const { data } = await baseGetRequest('documents/count-by-year');

        if (isActive) {
          setLabelSales(Object.keys(data));
          setDataSales(Object.values(data));
        }
      };
      const fetchDataRevenue = async () => {
        const { data } = await baseGetRequest('documents/prices-by-year');

        if (isActive) {
          setLabelRevenue(Object.keys(data));
          setDataRevenue(Object.values(data));
        }
      };
      fetchDataSales();
      fetchDataRevenue();
      setAnimate(true);

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false}>
        {dataSales.length === 0 && dataRevenue.length === 0 &&
          (
            <View>
              {setTimeout(() => {
                setAnimate(false);
              }, 7000) &&
                <View style={animate ? { ...styles.emptyWrapper, padding: 5 } : { display: 'none' }}>
                  <ActivityIndicator size={'large'} color='#4A3780' animating={animate} style={animate ? {} : { display: 'none' }} />
                </View>
              }
              {!animate && <View style={{
                ...styles.emptyWrapper, padding: 5, marginTop: 0, marginBottom: 0
              }}>
                <Text style={styles.emptyText}>Sorry, no data to show</Text>
                <Entypo name='emoji-sad' color={'#4A3780'} size={35} />
                <Text style={styles.emptyText}>Try again later... </Text>
              </View>}
            </View>
          )}
        {dataSales.length > 0 &&
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Sales per year</Text>
            <BarChart
              style={styles.barChartStyle}
              data={{
                labels: labelSales,
                datasets: [{ data: dataSales }],
              }}
              width={screenWidth}
              height={215}
              chartConfig={styles.chartConfig}
            />
          </View>
        }

        {dataRevenue.length > 0 &&
          <View style={styles.chartContainer}>
            <Text style={styles.title}>Revenue per year </Text>
            <BarChart
              style={styles.barChartStyle}
              data={{
                labels: labelRevenue,
                datasets: [{ data: dataRevenue }],
              }}
              width={screenWidth}
              height={215}
              chartConfig={styles.chartConfig}
            />
          </View>
        }

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    width: '100%',
    maxWidth: screenWidth,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: screenWidth,
    justifyContent: 'center',
  },
  barChartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    marginHorizontal: 16,
  },
  chartConfig: {
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 15,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0.5,
    fillShadowGradient: '#8670c2',
    fillShadowGradientOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 1,
    decimalPlaces: 0,
  },
  title: {
    textAlign: 'center',
  },
  emptyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyText: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#4A3780'
  }
});