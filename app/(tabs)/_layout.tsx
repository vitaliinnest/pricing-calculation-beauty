import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { useTranslation } from "react-i18next";

export default function DrawerLayout() {
  const { t } = useTranslation("drawerLayout");
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          drawerActiveTintColor: Colors.tabIconDefault,
          drawerContentStyle: {
            paddingTop: 20,
          }
        }}
      >
        {/* todo: make financial model index */}
        <Drawer.Screen
          name="financial-model"
          options={{
            title: t("financialModel"),
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
            title: t("toolProcessing"),
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
            title: t("equipmentWear"),
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
            title: t("costPrice"),
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
            title: t("expenses"),
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
            title: t("priceFormation"),
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
