import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;
const labels = ['2018', '2019', '2020', '2021', '2022'];
const data_sales = [24, 34, 37, 71, 88];
const data_traffic = [1200, 1234, 759, 2222, 1756];


export default function KPIScreen() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.naslov}>Sales per year</Text>
            <BarChart
              style={styles.barChartStyle}
              data={{
                labels,
                datasets: [{ data: data_sales }],
              }}
              width={screenWidth}
              height={215}
              // yAxisLabel="$" ako zatrebalo nek imamo  
              chartConfig={styles.chartConfig}
              verticalLabelRotation={25}
            />
          </View>

          <View>
            <Text style={styles.naslov}>Website traffic</Text>
            <BarChart
              style={styles.barChartStyle}
              data={{
                labels,
                datasets: [{ data: data_traffic }],
              }}
              width={screenWidth}
              height={215}
              // yAxisLabel="$" ako zatrebalo nek imamo  
              chartConfig={styles.chartConfig}
              verticalLabelRotation={25}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
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
    color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.55,
  },
  naslov: {
    textAlign: 'center',
  },
}
);