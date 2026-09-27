import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router/js-tabs';
import { useNeedsHumanCount } from '../../src/state/PreditContext';
import { colors, fonts } from '../../src/theme';

export default function TabsLayout() {
  const needsHuman = useNeedsHumanCount();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.bg },
        tabBarStyle: { backgroundColor: colors.sidebar, borderTopColor: colors.line },
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.dim,
        tabBarLabelStyle: { fontFamily: fonts.condensed, fontSize: 14 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Clientes',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="acompanhamento"
        options={{
          title: 'Acompanhamento',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={size} color={color} />
          ),
          // Badge vermelho só quando a IA pediu apoio humano (Documentacao.md 5.1)
          tabBarBadge: needsHuman > 0 ? needsHuman : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.red, color: '#fff', fontFamily: fonts.bold },
        }}
      />
    </Tabs>
  );
}
