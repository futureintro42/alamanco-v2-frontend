// project import
import Switcher from "./routes";
import ThemeCustomization from "./themes";
import RTLLayout from "./components/atoms/RTLLayout";
import ScrollTop from "./components/atoms/ScrollTop";
import Snackbar from "./components/atoms/Snackbar";
import AuthProvider from "./auth";
import "./App.css";

function App() {
  return (
    <ThemeCustomization>
      <RTLLayout>
        <ScrollTop>
          <AuthProvider>
            <>
              <Switcher />
              <Snackbar />
            </>
          </AuthProvider>
        </ScrollTop>
      </RTLLayout>
    </ThemeCustomization>
  );
}

export default App;
