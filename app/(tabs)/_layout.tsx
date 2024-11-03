import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: Colors.tabIconDefault,
        }}
      >
        <Drawer.Screen
          name="financial-model"
          options={{
            title: "Фінансова модель",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "calculator" : "calculator-outline"}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="index"
          options={{
            title: "Обробка інструментів",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "hand-left" : "hand-left-outline"}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="equipment-wear"
          options={{
            title: "Знос обладнання",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "bag-handle" : "bag-handle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="cost-price"
          options={{
            title: "Собівартість",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "hammer" : "hammer-outline"}
                color={color}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="expenses"
          options={{
            title: "Витрати",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "receipt" : "receipt-outline"}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="price-formation"
          options={{
            title: "Ціноутворення",
            drawerIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "cash" : "cash-outline"}
                color={color}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
