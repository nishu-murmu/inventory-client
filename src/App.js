import {
  ChakraProvider,
  VStack,
  theme,
} from '@chakra-ui/react';


//files
import MainHeader from './sections/main-header-section';
// import LiveStock from './sections/livestock-section';
import Footer from './sections/footer-section';
import AllRoutes from './sections/Routes';

function App() {
  // const bg = useColorModeValue('teal.100', 'teal.600')
  // const color = useColorModeValue('white', 'gray.800')
  return (
    <ChakraProvider theme={theme}>
      <VStack
        className="app-main-section"
        margin={0}
        textAlign={'center'}
        fontSize={'xl'}
      >
        <MainHeader/>
        <AllRoutes/>
        <Footer/>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
