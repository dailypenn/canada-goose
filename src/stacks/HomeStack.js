// // Navigation stack within the Home tab
// // Includes routes to the home and article screens

// import React from 'react'

// import { HomeScreen, ArticleScreen } from '../screens'
// import { ScreenWithDefaultParams, Stack } from '../../NavigationController'

// export const HomeStack = ({ screenProps }) => {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerStyle: { backgroundColor: '#fff' },
//         headerTintColor: '#000',
//         headerTitleStyle: { fontWeight: 'bold' },
//       }}
//     >
//       <Stack.Screen
//         name="Home"
//         component={ScreenWithDefaultParams(HomeScreen, screenProps)}
//         options={{
//           title: 'Home',
//           headerShown: false,
//         }}
//       />
//       <Stack.Screen
//         name="Article"
//         component={ArticleScreen}
//         options={({ route }) => ({
//           title: route.params.article.headline,
//           animationEnabled: true,
//           headerBackTitleVisible: false,
//         })}
//       />
//     </Stack.Navigator>
//   )
// }
