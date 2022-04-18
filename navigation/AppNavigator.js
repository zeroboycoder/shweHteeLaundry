import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Color from "../constant/Color";
// Auth Screens
import AuthStart from "../screen/Auth/AuthStart";
import ChooseAuth from "../screen/Auth/ChooseAuth";
import GetUserInfo from "../screen/Auth/GetUserInfo";
// Tab Screens
import Home, { HomeNavOptions } from "../screen/Home/Home";
import Categories, { categoriesNavOptions } from "../screen/Home/Categories";
import Items, { itemsNavOptions } from "../screen/Home/Items";
import Checkout, { checkoutNavOptions } from "../screen/Home/Checkout";
import Payment, { paymentNavOptions } from "../screen/Home/Payment";
import PaymentDetail, {
  paymentDetaileNavOptions,
} from "../screen/Home/PaymentDetail";
// History
import History from "../screen/History/History";
import HistoryForOwner from "../screen/History/HistoryForOwner";
import OrderDetail from "../screen/History/OrderDetail";
// Notification
import Notification from "../screen/Notification/Noti";
// Profile Screen
import Profile, { ProfileNavOptions } from "../screen/Profile/Profile";
// Logout Screen
import Logout from "../screen/Logout/Logout";
// Onboarding
import Onboarding from "../screen/Onboarding/Onboarding";

const Stack = createStackNavigator();

const stackOptions = (admin) => {
  return {
    headerMode: "float",
    headerStyle: {
      backgroundColor: admin ? "#ffc600" : Color.darkBlue,
    },
    headerTintColor: "#fffffa",
  };
};

// Stack Navigator for Auth
export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStart" component={AuthStart} />
      <Stack.Screen name="ChooseAuth" component={ChooseAuth} />
      <Stack.Screen name="GetUserInfo" component={GetUserInfo} />
    </Stack.Navigator>
  );
};

// Stack Navigator for Onboarding
export const OnboardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

// Stack Navigator for User
const HomeNavigator = (props) => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Stack.Navigator screenOptions={() => stackOptions(admin)}>
      <Stack.Screen
        name="Shwe Htee"
        component={Home}
        options={HomeNavOptions}
      />
      <Stack.Screen
        name="categories"
        component={Categories}
        options={{ headerTitle: "Categories" }}
      />
      <Stack.Screen name="items" component={Items} options={itemsNavOptions} />
      <Stack.Screen
        name="checkout"
        component={Checkout}
        options={checkoutNavOptions}
      />
      <Stack.Screen
        name="payment"
        component={Payment}
        options={paymentNavOptions}
      />
      <Stack.Screen
        name="paymentDetail"
        component={PaymentDetail}
        options={paymentDetaileNavOptions}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator for history
const HistoryNavigator = () => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Stack.Navigator screenOptions={() => stackOptions(admin)}>
      <Stack.Screen
        name="history"
        component={admin ? HistoryForOwner : History}
        options={{ headerTitle: "History" }}
      />
      <Stack.Screen
        name="orderDetail"
        component={OrderDetail}
        options={{ headerTitle: "Order Detail" }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator for notification
const NotiNavigator = () => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Stack.Navigator screenOptions={() => stackOptions(admin)}>
      <Stack.Screen
        name="noti"
        component={Notification}
        options={{ headerTitle: "Notification" }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigation for Profile
const ProfileNavigator = () => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Stack.Navigator screenOptions={() => stackOptions(admin)}>
      <Stack.Screen
        name="profile"
        component={Profile}
        options={ProfileNavOptions}
      />
    </Stack.Navigator>
  );
};

// Create a Tab Navigator
const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Tab.Navigator
      screenOptions={(props) => ({
        headerShown: false,
        tabBarActiveTintColor: admin ? "#ffc600" : Color.darkBlue,
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) => (
            <Entypo name="home" size={24} color={props.color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryNavigator}
        options={{
          tabBarLabel: "",
          tabBarIcon: (props) => (
            <FontAwesome5 name="history" size={24} color={props.color} />
          ),
        }}
      />
      {admin ? null : (
        <Tab.Screen
          name="Noti"
          component={NotiNavigator}
          options={{
            tabBarLabel: "",
            tabBarIcon: (props) => (
              <Ionicons name="notifications" size={24} color={props.color} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

// Draw Navigator
const Drawer = createDrawerNavigator();

const drawerScreenOptions = (admin) => ({
  headerShown: false,
  drawerPosition: "right",
  drawerActiveTintColor: "#fff",
  drawerInactiveTintColor: "#ccc",
  drawerStyle: {
    backgroundColor: admin ? "#ffc600" : Color.darkBlue,
  },
});

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <View
      style={{
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 70,
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: 70,
        }}
      >
        <Text
          style={{
            fontFamily: "pyidaungsu-bold",
            fontSize: 24,
            color: "#000",
          }}
        >
          P
        </Text>
      </View>
      <Text
        style={{
          color: "#fff",
          fontFamily: "pyidaungsu-bold",
          fontSize: 18,
          marginTop: 7,
        }}
      >
        Pyae Sone Khant
      </Text>
    </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>
);

export const DrawerNavigator = () => {
  const admin = useSelector((store) => store.auth.admin);
  return (
    <Drawer.Navigator
      screenOptions={() => drawerScreenOptions(admin)}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeDrawer"
        component={TabNavigator}
        options={{ drawerLabel: "Home" }}
      />
      <Drawer.Screen
        name="ProfileDrawer"
        component={ProfileNavigator}
        options={{ drawerLabel: "Profile" }}
      />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};
