import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import TempratureContextProvider from "./context/TempartureContext";

export default function App() {
  return (
    <TempratureContextProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </TempratureContextProvider>
  );
}
