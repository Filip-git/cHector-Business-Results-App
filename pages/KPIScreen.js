import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Feather, Entypo } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const labels = ['2018', '2019', '2020', '2021', '2022'];
const data_sales = [24, 34, 37, 71, 88];
const data_traffic = [1200, 1234, 759, 2222, 1756];

export default function KPIScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.searchBar,
          isClicked ? styles.searchBarClicked : styles.searchBarUnclicked,
        ]}
      >
        <Feather name="search" size={20} color="black" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={onChangeSearch}
          onFocus={() => setIsClicked(true)}
          onBlur={() => setIsClicked(false)}
        />
        {isClicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>
      <ScrollView horizontal={false}>
        <View style={styles.chartContainer}>
          <Text style={styles.title}>Sales per year</Text>
          <BarChart
            style={styles.barChartStyle}
            data={{
              labels,
              datasets: [{ data: data_sales }],
            }}
            width={screenWidth}
            height={215}
            chartConfig={styles.chartConfig}
            verticalLabelRotation={25}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.title}>Website traffic</Text>
          <BarChart
            style={styles.barChartStyle}
            data={{
              labels,
              datasets: [{ data: data_traffic }],
            }}
            width={screenWidth}
            height={215}
            chartConfig={styles.chartConfig}
            verticalLabelRotation={25}
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
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  searchBarUnclicked: {
    justifyContent: 'flex-start',
  },
  searchBarClicked: {
    //insert css
  },
  searchInput: {
    fontSize: 20,
    marginLeft: 10,
    width: '80%',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
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
    barPercentage: 0.55,
  },
  title: {
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    width: '75%',
    height: 40,
    paddingLeft: 10,
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});

