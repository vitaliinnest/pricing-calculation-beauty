import React from "react";
import { Tabs } from "expo-router";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.tabIconDefault,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Обробка інструментів",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "hand-left" : "hand-left-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="equipment-wear"
        options={{
          title: "Знос обладнання",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bag-handle" : "bag-handle-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cost-price"
        options={{
          title: "Собівартість",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "hammer" : "hammer-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="financial-model"
        options={{
          title: "Фінансова модель",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "calculator" : "calculator-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
