import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { baseGetRequest } from '../hooks/requestHelper';

const screenWidth = Dimensions.get('window').width;

export default function KPIScreen() {
  const [dataSales, setDataSales] = useState([]);
  const [labelSales, setLabelSales] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [labelRevenue, setLabelRevenue] = useState([]);

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

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false}>
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
});