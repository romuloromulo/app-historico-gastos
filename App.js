import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenses from "./screens/AllExpenses";
import RecentExpenses from "./screens/RecentExpense";
import ManageExpenses from "./screens/ManageExpense";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/iconButton";
import { store } from "./store/store";
import { Provider } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const colors = GlobalStyles.colors;

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: colors.primary500,
        },
        tabBarActiveTintColor: colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
            />
          );
        },
      })}>
      <Tab.Screen
        name="All Expenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Recent Expenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expense",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary500,
              },
              headerTintColor: "white",
            }}>
            <Stack.Screen
              name="ExpensesOverview"
              options={{
                headerShown: false,
              }}
              component={MyTabs}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpenses}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
